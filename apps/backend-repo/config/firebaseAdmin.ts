import path from 'path';
import admin from 'firebase-admin';

// Log the current environment mode for debugging
console.log("EMU = ", process.env.EMU);

/**
 * Handle Firebase Emulator Configuration
 * 
 * If the application is running in emulator mode (determined by the `EMU` environment variable),
 * set the appropriate environment variables for Firebase Authentication and Firestore.
 */
if (process.env.EMU === "yes") {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'; // Set Firebase Auth Emulator host
}

/**
 * Resolve the path to the Firebase service account key file.
 * This file contains credentials for accessing Firebase services in production.
 * 
 * Note: Ensure that the `serviceAccountKey.json` file is excluded from version control
 * (e.g., by adding it to `.gitignore`) to prevent sensitive information from being exposed.
 */
const serviceAccountKeyPath: string = path.resolve(__dirname, '../serviceAccountKey.json');
const serviceAccount = require(serviceAccountKeyPath);
console.log("> Using service account key path:", serviceAccountKeyPath);

/**
 * Initialize Firebase Admin SDK
 * 
 * The Admin SDK is initialized with the service account credentials. This allows the application
 * to interact with Firebase services such as Firestore, Authentication, and Storage.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

/**
 * Initialize Firestore Database
 * 
 * The Firestore database instance is created using the Admin SDK. If the application is running
 * in emulator mode, the Firestore emulator settings are applied.
 */
const db = admin.firestore();

// Configure Firestore Emulator if running in emulator mode
if (process.env.EMU === "yes") {
  db.settings({
    host: 'localhost:8080', // Firestore emulator host
    ssl: false, // Disable SSL for local emulator
  });
}

/**
 * Test Firestore Connection
 * 
 * This function tests the connection to Firestore by:
 * - Listing all collections in the database.
 * - Querying the `USERS` collection and applying sorting and limiting.
 * 
 * This is useful for verifying that the Firestore connection is properly configured.
 */
export const testFirestoreConnection = async () => {
  try {
    // Attempt to list collections in Firestore
    const collections = await db.listCollections();
    console.log("> Firestore connected successfully. Collections:", collections.map((col) => col.id));

    // Query the USERS collection and apply sorting and limiting
    const usersSnapshot = await db.collection('USERS')
      .orderBy("totalAverageWeightRatings", "desc")
      .orderBy("numberOfRents", "desc")
      .orderBy("recentlyActive", "desc")
      .limit(1)
      .get();

    // Check if the USERS collection is empty
    if (usersSnapshot.empty) {
      console.log("> USERS collection is empty.");
    } else {
      console.log("> USERS collection documents:");
      usersSnapshot.forEach((doc) => {
        console.log(`- ${doc.id}:`, doc.data());
      });
    }
  } catch (error) {
    // Log any errors that occur during the Firestore connection test
    console.error("> Firestore connection failed:", error);
  }
};

// Call the test function immediately to verify the connection
testFirestoreConnection();