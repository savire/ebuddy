import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

/**
 * Middleware: Authenticate Requests
 * 
 * This middleware verifies the Firebase ID token provided in the `Authorization` header.
 * If the token is valid, the decoded user information is attached to the `req.user` object,
 * and the request proceeds to the next middleware or route handler.
 * 
 * If the token is missing, invalid, or expired, the middleware responds with an appropriate
 * HTTP status code and error message.
 * 
 * Expected Request Headers:
 * - Authorization: Bearer <idToken>
 * 
 * Response:
 * - 401: { error: "Unauthorized" } (if the token is missing or invalid)
 * - 500: { message: "Internal Server Error" } (if an unexpected error occurs)
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and valid
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' }); // Respond with 401 if no valid token is provided
      return;
    }

    // Extract the ID token from the Authorization header
    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Attach the decoded user info to the request object for downstream use
      req.user = decodedToken;
      console.log("Token verified successfully:", decodedToken);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Respond with 401 if token verification fails
      console.error("Error verifying token:", error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    // Log unexpected errors and respond with 500
    console.error("Unexpected error in authentication middleware:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};