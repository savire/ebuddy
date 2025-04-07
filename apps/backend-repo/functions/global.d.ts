import 'express'; // Import the Express module to extend its types
import admin from '../config/firebaseAdmin'; // Import Firebase Admin SDK for type definitions

// Ensure that the file is treated as a module by TypeScript, rather than a global script. 
export {};

/**
 * Extend Express Request Interface
 * 
 * This file extends the `Express.Request` interface to include a `user` property.
 * The `user` property represents the decoded Firebase ID token, which is attached
 * to the request object by the `authenticate` middleware.
 * 
 * Why Extend the Request Interface?
 * - By default, the `Express.Request` interface does not include a `user` property.
 * - Adding the `user` property ensures type safety when accessing `req.user` in
 *   route handlers and middleware.
 * 
 * Type of `req.user`:
 * - The `user` property is of type `admin.auth.DecodedIdToken`, which is provided
 *   by the Firebase Admin SDK. This type includes information such as the user's
 *   email, UID, and other claims.
 */
declare global {
  namespace Express {
    export interface Request {
      /**
       * The `user` property contains the decoded Firebase ID token.
       * 
       * This property is populated by the `authenticate` middleware after verifying
       * the token. It provides information about the authenticated user, such as:
       * - `uid`: The user's unique identifier.
       * - `email`: The user's email address.
       * - Custom claims (if any are set in Firebase Authentication).
       */
      user: admin.auth.DecodedIdToken;
    }
  }
}