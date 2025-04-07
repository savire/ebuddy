import e, { Request, Response } from 'express';
import { 
  addUser, 
  getUserByEmail, 
  updateUser, 
  groupedUser, 
  verifyUser
} from '../repository/userCollection';

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
export const postVerifyUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userToken = userData.tokenId;

    // Call helper function to verify the user
    const isLoggedIn = await verifyUser(userToken);

    // Respond with success
    res.status(201).json({ isLoggedIn });
  } catch (error) {
    // Log the error for debugging
    console.log("Error in postVerifyUser:", error);

    // Respond with a generic error message
    res.status(500).json({ error: error });
  }
};

/**
 * GET /current-user
 * Fetches the current user's data based on the email attached to the request object.
 * 
 * Expected Request Object:
 * - req.user.email: The email of the authenticated user (set by middleware).
 * 
 * Response:
 * - 200: User data (JSON)
 * - 404: { error: "User not found" }
 * - 500: { error: "Internal Server Error" }
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const email = String(req.user.email); // Extract email from the request object

    // Fetch user data from the database
    const user = await getUserByEmail(email);

    if (user) {
      res.json(user); // Respond with user data
    } else {
      res.status(404).json({ error: 'User not found' }); // User not found
    }
  } catch (error) {
    // Log and respond with a generic server error
    res.status(500).json({ error: error });
  }
};

/**
 * PUT /update-user
 * Updates the current user's data based on the email attached to the request object.
 * 
 * Expected Request Object:
 * - req.user.email: The email of the authenticated user (set by middleware).
 * - req.body: The updated user data.
 * 
 * Response:
 * - 200: { message: "User updated successfully" }
 * - 404: { error: "User not found" }
 * - 500: { error: "Internal Server Error" }
 */
export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const email = String(req.user.email); // Extract email from the request object

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
    // Log and respond with a generic server error
    res.status(500).json({ error: error });
  }
};

/* NOT REQUIRED BUT USEFUL */

/**
 * POST /create-user
 * Creates a new user in the database.
 * 
 * Expected Request Body:
 * {
 *   "name": "string",
 *   "email": "string",
 *   "age": number
 * }
 * 
 * Response:
 * - 201: { userId: string }
 * - 500: { error: "Internal Server Error" }
 */
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Add the user to the database
    const userId = await addUser(userData);

    // Respond with the created user's ID
    res.status(201).json({ userId });
  } catch (error) {
    // Log and respond with a generic server error
    res.status(500).json({ error: error });
  }
};

/**
 * GET /grouped-user
 * Fetches paginated and grouped user data.
 * 
 * Expected Query Parameters:
 * - lastVisibleId (optional): The ID of the last visible user for pagination.
 * - pageSize: The number of users to fetch per page (must be a positive integer).
 * 
 * Response:
 * - 200: Array of grouped user data
 * - 400: { error: "Invalid pageSize. It must be a positive number." }
 * - 500: { error: "Internal Server Error" }
 */
const getGroupedUser = async (req: Request, res: Response) => {
  try {
    const lastVisibleId = req.query.lastVisibleId; // Use query parameters for pagination
    const pageSize = parseInt(req.query.pageSize as string, 10); // Parse pageSize as an integer

    // Validate pageSize
    if (isNaN(pageSize) || pageSize <= 0) {
      res.status(400).json({ error: 'Invalid pageSize. It must be a positive number.' });
      return;
    }

    // Call the groupedUser function to fetch paginated and ordered user data
    const result = await groupedUser(lastVisibleId as string | null, pageSize);

    // Respond with the result
    res.status(200).json(result);
  } catch (error) {
    // Log and respond with a generic server error
    res.status(500).json({ error: error });
  }
};