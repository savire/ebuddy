import admin from '../config/firebaseAdmin'; // Import Firebase Admin SDK instance
import { User } from '@repo/shared'; // Import the User type from the shared package

// Initialize Firestore
const db = admin.firestore();

/**
 * Verify userToken
 * @param userToken - The user token to verify.
 * @returns A boolean indicating whether the token is valid.
 */
export const verifyUser = async (userToken: string): Promise<boolean> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(userToken); // Verify the token
    const uid = decodedToken.uid; // Extract the user ID
    const uemail = decodedToken.email; // Extract the user email
    console.log('> User ID: ', uid);
    console.log('> User Email: ', uemail);
    return true; // Return true if the token is valid
  } catch (error) {
    console.error('Error verifying token:', userToken); // Log the error
    return false; // Return false if the token is invalid
  }
};

/**
 * Retrieves a user by their email from the USERS collection.
 * @param email - The email of the user to retrieve.
 * @returns The user data including the document ID.
 * @throws An error if the user does not exist.
 */
export const getUserByEmail = async (email: string): Promise<User> => {
  // Query the USERS collection where the email field matches the provided email
  const querySnapshot = await db.collection('USERS').where('email', '==', email).limit(1).get();
  
  // Check if any documents were found
  if (querySnapshot.empty) {
    throw new Error(`User with Email ${email} does not exist.`); // Handle non-existent document
  }

  // Extract the first document from the query results
  const userDoc = querySnapshot.docs[0];

  // Return the user data with the document ID
  return { id: userDoc.id, ...userDoc.data() } as User;
};

/**
 * Updates an existing user in the USERS collection.
 * @param email - The email of the user to retrieve.
 * @param userData - The partial user data to update.
 * @throws An error if the user does not exist or invalid validation occured
 */
export const updateUser = async (email: string, userData: Partial<User>): Promise<void> => {
  /**
   * Validate the email parameter
   * 
   * The email must be a non-empty string and match a valid email format.
   * If the email is invalid, an error is thrown to prevent further execution.
   */
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address provided.");
  }

  /**
   * Validate the userData fields
   * 
   * Each field in the `userData` object is validated to ensure it meets the required criteria:
   * - `name`: Must not be an empty string if provided.
   * - `age`: Must be a positive number if provided.
   * - `numberOfRents`: Must be a number between 0 and 999 if provided.
   * - `email`: Must match a valid email format if provided.
   * 
   * If any validation fails, an error is thrown with a descriptive message.
   */
  if (userData.name !== undefined && userData.name.trim() === "") {
    throw new Error("Name cannot be empty.");
  }

  if (userData.age !== undefined && (typeof userData.age !== "number" || userData.age <= 0)) {
    throw new Error("Age must be a positive number.");
  }

  if (userData.numberOfRents !== undefined && (typeof userData.numberOfRents !== "number" || userData.numberOfRents < 0 || userData.numberOfRents > 99)) {
    throw new Error("Number of rents must be a number between 0 and 999.");
  }

  if (userData.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    throw new Error("Invalid email address in userData.");
  }

  /**
   * Query the USERS collection
   * 
   * This query searches the Firestore `USERS` collection for a document where the `email` field
   * matches the provided email. The query is limited to 1 result for efficiency.
   */
  const querySnapshot = await db.collection('USERS').where('email', '==', email).limit(1).get();

  /**
   * Handle non-existent documents
   * 
   * If no documents are found in the query, an error is thrown indicating that the user does not exist.
   */
  if (querySnapshot.empty) {
    throw new Error(`User with Email ${email} does not exist.`);
  }

  /**
   * Extract the document reference
   * 
   * The first document from the query results is extracted, and its reference is used to perform
   * the update operation.
   */
  const userDoc = querySnapshot.docs[0];
  const userRef = userDoc.ref;

  /**
   * Update the user document
   * 
   * The `update` method is called on the document reference with the validated `userData` object.
   * This updates the specified fields in the document while leaving other fields unchanged.
   */
  await userRef.update(userData);
};

/* NOT REQUIRED BUT USEFUL */

/**
 * Adds a new user to the USERS collection in Firestore.
 * @param userData - The user data to add (excluding the ID).
 * @returns The ID of the newly created user document.
 */
export const addUser = async (userData: Omit<User, 'id'>): Promise<string> => {
  const userRef = await db.collection('USERS').add(userData); // Add user data to Firestore
  return userRef.id; // Return the generated document ID
};

/**
 * Retrieves a paginated list of users from the USERS collection, ordered by specific fields.
 * @param lastVisibleId - The document ID of the last visible user for pagination.
 * @param pageSize - The number of documents to fetch per page.
 * @returns An object containing the list of users and the last visible document ID for pagination.
 */
export const groupedUser = async (
  lastVisibleId: string | null, // Use the document ID for pagination
  pageSize: number // Number of documents to fetch per page
): Promise<{ users: User[]; lastVisibleId: string | null }> => {
  const userCollection = db.collection('USERS'); // Reference the USERS collection

  // Build the query with ordering and pagination
  let userQuery = userCollection
    .orderBy('totalAverageWeightRatings', 'desc') // Order by total average weight ratings (descending)
    .orderBy('numberOfRents', 'desc') // Order by number of rents (descending)
    .orderBy('recentlyActive', 'desc') // Order by recently active (descending)
    .limit(pageSize); // Limit the number of documents fetched

  // If a lastVisibleId is provided, start the query after the last visible document
  if (lastVisibleId) {
    const lastVisibleDoc = await userCollection.doc(lastVisibleId).get(); // Fetch the last visible document
    if (lastVisibleDoc.exists) {
      userQuery = userQuery.startAfter(lastVisibleDoc); // Start the query after the last visible document
    } else {
      throw new Error(`Document with ID ${lastVisibleId} does not exist.`); // Handle non-existent document
    }
  }

  // Execute the query and fetch the documents
  const querySnapshot = await userQuery.get();

  // Map the query results to an array of User objects
  const users: User[] = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as User), // Spread the document data
  }));

  // Return the users and the last document ID for pagination
  return {
    users,
    lastVisibleId: querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1].id // Get the last document ID
      : null, // Return null if no documents are fetched
  };
};