import { Router } from 'express';
import { 
  getCurrentUser, 
  updateCurrentUser, 
  postVerifyUser 
} from '../controller/api';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * POST /verify-user
 * 
 * Route to verify a user using a token provided in the request body.
 * 
 * Controller: `postVerifyUser`
 * - Validates the token and returns whether the user is logged in.
 * 
 * No authentication middleware is required for this route since it is used
 * to verify the token itself.
 */
router.post('/verify-user', postVerifyUser);

/**
 * GET /fetch-user-data
 * 
 * Route to fetch the current user's data based on the Bearer token provided
 * in the `Authorization` header.
 * 
 * Middleware: `authenticate`
 * - Verifies the Firebase ID token and attaches the user information to the request object.
 * 
 * Controller: `getCurrentUser`
 * - Retrieves the user's data from the database and returns it as a JSON response.
 */
router.get('/fetch-user-data', authenticate, getCurrentUser);

/**
 * PUT /update-user-data
 * 
 * Route to update the current user's data based on the Bearer token provided
 * in the `Authorization` header and the data provided in the request body.
 * 
 * Middleware: `authenticate`
 * - Verifies the Firebase ID token and attaches the user information to the request object.
 * 
 * Controller: `updateCurrentUser`
 * - Validates the request body and updates the user's data in the database.
 */
router.put('/update-user-data', authenticate, updateCurrentUser);

export default router;