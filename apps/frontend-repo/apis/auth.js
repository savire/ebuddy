import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

/**
 * Firebase Configuration
 * 
 * The `firebaseConfig` object contains the Firebase project configuration details.
 * These values are typically provided by Firebase when setting up a project.
 * 
 * Note:
 * - Avoid hardcoding sensitive information like API keys in the source code.
 * - Use environment variables to store sensitive information in production.
 * - This intendedly contains hardcoded values for demonstration purposes only.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDbN0XSuXsKBRzDIBTM7CgtE1xTiiT5GRI",
  authDomain: "ebuddy-backend-repo-3dd81.firebaseapp.com",
  projectId: "ebuddy-backend-repo-3dd81",
  storageBucket: "ebuddy-backend-repo-3dd81.firebasestorage.app",
  messagingSenderId: "387288405772",
  appId: "1:387288405772:web:f616ba2719a8a2230e9b29",
};

/**
 * Initialize Firebase App
 * 
 * The `initializeApp` function initializes the Firebase app with the provided configuration.
 * This is required to use Firebase services like Authentication, Firestore, etc.
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firebase Authentication
 * 
 * The `getAuth` function initializes the Firebase Authentication service for the app.
 * This service is used for user authentication (e.g., login, signup, token verification).
 */
export const auth = getAuth(app);

/**
 * API Endpoint Configuration
 * 
 * The `API_ENDPOINT` variable determines the base URL for API requests.
 * - If the app is running in emulator mode (`NEXT_PUBLIC_EMU` is "yes"), it connects to the local Firebase Emulator Suite.
 * - Otherwise, it uses the production or development API endpoint.
 */
let API_ENDPOINT = "";

if (process.env.NEXT_PUBLIC_EMU === "yes") {
  /**
   * Connect to Firebase Authentication Emulator
   * 
   * The `connectAuthEmulator` function connects the Firebase Authentication service
   * to the local emulator for testing purposes. This avoids using production Firebase services
   * during development.
   */
  connectAuthEmulator(auth, "http://localhost:9099");

  // Set the API endpoint to the local emulator's function endpoint
  API_ENDPOINT = "http://127.0.0.1:5000/ebuddy-backend-repo-3dd81/us-central1/api";
} else {
  // Set the API endpoint to the production or development server
  API_ENDPOINT = "http://localhost:3000/api";
}

/**
 * Log the API Endpoint
 * 
 * Logs the selected API endpoint to the console for debugging purposes.
 * This helps verify whether the app is using the correct API endpoint.
 */
console.log("> API_ENDPOINT: ", API_ENDPOINT);

/**
 * Export API Server URL
 * 
 * The `API_SERVER` constant is exported for use in other parts of the application.
 * It provides the base URL for making API requests.
 */
export const API_SERVER = API_ENDPOINT;