/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express, { Request, Response } from 'express';
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { 
  getUserByEmail, 
  updateUser, 
  verifyUser
} from '../../repository/userCollection';
import admin from '../../config/firebaseAdmin';

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json()); // Ensures incoming requests with JSON payloads are parsed

/**
 * POST /verify-user
 * Verifies a user using a token provided in the request body.
 * 
 * Expected Request Body:
 * {
 *   "tokenId": "string"
 * }
 * 
 * Response:
 * - 201: { isLoggedIn: boolean }
 * - 500: { error: "Internal Server Error" }
 */
app.post("/verify-user", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userToken = userData.tokenId;

    // Call helper function to verify the user
    const isLoggedIn = await verifyUser(userToken);

    // Respond with success
    res.status(201).json({ isLoggedIn });
  } catch (error) {
    // Log the error for debugging
    logger.error("Error in /verify-user:", error);

    // Respond with a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /fetch-user-data
 * Fetches user data based on the Bearer token provided in the Authorization header.
 * 
 * Expected Headers:
 * - Authorization: Bearer <idToken>
 * 
 * Response:
 * - 200: User data (JSON)
 * - 401: { error: "Unauthorized" }
 * - 404: { error: "User not found" }
 * - 500: { error: "Exception" }
 */
app.get("/fetch-user-data", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and valid
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const email = String(decodedToken.email);

      // Fetch user data from the database
      const user = await getUserByEmail(email);
      if (user) {
        res.json(user); // Respond with user data
      } else {
        res.status(404).json({ error: 'User not found' }); // User not found
      }
    } catch (error) {
      // Log and respond with unauthorized error
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    // Log and respond with a generic server error
    res.status(500).json({ error: "Exception" });
  }
});

/**
 * PUT /update-user-data
 * Updates user data based on the Bearer token provided in the Authorization header.
 * 
 * Expected Headers:
 * - Authorization: Bearer <idToken>
 * 
 * Expected Request Body:
 * {
 *   "name": "string",
 *   "age": number,
 *   "numberOfRents": number,
 *   "email": "string"
 * }
 * 
 * Validation Rules:
 * - `name`: Must not be an empty string if provided.
 * - `age`: Must be a positive number if provided.
 * - `numberOfRents`: Must be a number between 0 and 999 if provided.
 * - `email`: Must match a valid email format if provided.
 * 
 * Response:
 * - 200: { message: "User updated successfully" }
 * - 401: { error: "Unauthorized" }
 * - 404: { error: "User not found" }
 * - 400: { error: "Validation failed: <reason>" }
 * - 500: { error: "Exception" }
 */
app.put("/update-user-data", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and valid
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const email = String(decodedToken.email);
      const userData = req.body;

      // Validate the userData fields
      if (userData.name !== undefined && userData.name.trim() === "") {
        res.status(400).json({ error: "Validation failed: Name cannot be empty." });
        return;
      }

      if (userData.age !== undefined && (typeof userData.age !== "number" || userData.age <= 0)) {
        res.status(400).json({ error: "Validation failed: Age must be a positive number." });
        return;
      }

      if (
        userData.numberOfRents !== undefined &&
        (typeof userData.numberOfRents !== "number" || userData.numberOfRents < 0 || userData.numberOfRents > 999)
      ) {
        res.status(400).json({ error: "Validation failed: Number of rents must be a number between 0 and 999." });
        return;
      }

      if (userData.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        res.status(400).json({ error: "Validation failed: Invalid email format." });
        return;
      }

      // Fetch user data from the database
      const user = await getUserByEmail(email);
      if (user) {
        // Update user data in the database
        await updateUser(email, userData);
        res.json({ message: 'User updated successfully' }); // Respond with success
      } else {
        res.status(404).json({ error: 'User not found' }); // User not found
      }
    } catch (error) {
      // Log and respond with unauthorized error
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    // Log and respond with a generic server error
    res.status(500).json({ error: "Exception" });
  }
});

// Export the Express app as a Firebase Function
export const api = onRequest(app); // Exposes all routes under the "api" function