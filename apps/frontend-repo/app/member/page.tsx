"use client"

// Base
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, API_SERVER } from '../../apis/auth';
import { User } from '@repo/shared';

// UI
import Image from "next/image";
import { 
  Container,
  Box, 
  Typography, 
  TextField
} from "@mui/material"; // Import MUI components

// Custom Components
import Toast from '@/components/Toast';
import ErrorDialog from '@/components/ErrorDialog';
import LoadingDialog from '@/components/LoadingDialog';
import ActionButtons from '@/components/member/ActionButtons';

// Redux
import { useAppSelector, useAppDispatch } from '../hook';
import { 
  setLoading, 
  setError, 
  setSuccess,
  selectSuccess,
  selectError,
  selectLoading 
} from '@/store/pageSlice';

/**
 * MemberPage Component
 * 
 * This component renders the member page, which includes:
 * - User authentication and session management using Firebase.
 * - Fetching and updating user data via API calls.
 * - Managing loading, error, and success states using Redux.
 * - Responsive UI design using Material-UI components.
 */
const MemberPage = () => {
  // Redux state variables
  const dispatch = useAppDispatch(); // Initialize Redux dispatch
  const loading = useAppSelector(selectLoading); // Get loading state from Redux store
  const error = useAppSelector(selectError); // Get error state from Redux store
  const success = useAppSelector(selectSuccess); // Get success state from Redux store

  // Local state variables
  const [email, setEmail] = useState<string>(''); // Email of the authenticated user
  const [result, setResult] = useState<User | null>(null); // User data fetched from the API

  const router = useRouter(); // Initialize Next.js router

  /**
   * Handle Authentication State
   * 
   * This effect listens for changes in the user's authentication state using Firebase's `onAuthStateChanged`.
   * - If the user is authenticated, their email and token are retrieved.
   * - If the user is not authenticated, they are redirected to the login page.
   */
  useEffect(() => {
    dispatch(setLoading(true)); // Set loading state to true
    dispatch(setError("")); // Reset error state
    dispatch(setSuccess("")); // Reset success state

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenId = await user.getIdToken(); // Get the ID token
          console.log("Token ID:", tokenId); // Log the token ID for debugging

          // Create a JSON object with the tokenId
          const payload = {
            tokenId: tokenId,
          };

          // Post the JSON object to the API server and verify if the token is legit
          const response = await fetch(`${API_SERVER}/verify-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(payload), // Convert the payload to a JSON string
          });
    
          if (!response.ok) {
            // Force sign out and redirect to login page if user is not authenticated
            signOut(auth); // Sign out the user
            dispatch(setError(`Failed to verify user`)); // Set error if the response is not OK
            router.push('/login');
          }
    
          const result = await response.json();
    
          if (result.isLoggedIn) {
            console.log("User is logged in");
            setEmail(user.email || ''); // Set the email state
            dispatch(setLoading(false)); // Set loading state to false
          } else {
            signOut(auth); // Sign out the user
            router.push('/login');
          }
         
        } catch (err: unknown) {
          if (err instanceof Error) {
            dispatch(setError("Failed to fetch token ID. " + err.message)); // Set error state
            signOut(auth); // Sign out the user
            router.push('/login');
          }
        }
      } else {
        // Redirect to login page if user is not authenticated
        router.push('/login');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  /**
   * Handle Logout
   * 
   * Logs out the user using Firebase's `signOut` method.
   * - If successful, the user is redirected to the login page via `onAuthStateChanged`.
   * - If an error occurs, it is logged and displayed to the user.
   */
  const handleLogout = () => {
    dispatch(setLoading(true)); // Set loading state to true
    try {
      signOut(auth); // Sign out the user
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during logout:", err.message); // Log the error
        dispatch(setError("Failed to log out.")); // Set error state
      } else {
        dispatch(setError("An unknown error occurred during logout.")); // Set error state
      }
      dispatch(setLoading(false)); // Set loading state to false
    }
  };

  /**
   * Handle Fetch User Data
   * 
   * Fetches the user's data from the API using their Firebase token.
   * - If successful, the data is stored in the `result` state.
   * - If an error occurs, it is logged and displayed to the user.
   */
  const handleInfo = async () => {
    dispatch(setLoading(true)); // Set loading state to true
    try {
      const tokenId = await auth.currentUser?.getIdToken(); // Get the ID token

      if (!tokenId) {
        throw new Error("Failed to retrieve token ID.");
      }

      const response = await fetch(`${API_SERVER}/fetch-user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          "Authorization": `Bearer ${tokenId}`, // Add the Bearer token
        }
      });

      if (!response.ok) {
        dispatch(setError(`Failed to fetch user data`)); // Set error state
      }

      const data = await response.json();
      console.log("Fetch result:", data); // Log the fetched data
      setResult(data); // Save the fetched data to state

      dispatch(setLoading(false)); // Set loading state to false
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching data:", err.message); // Log the error
        dispatch(setError("Failed to fetch user data.")); // Set error state
      } else {
        dispatch(setError("An unknown error occurred during logout.")); // Set error state
      }
      dispatch(setLoading(false)); // Set loading state to false
    }
  };

  /**
   * Handle Save User Data
   * 
   * Updates the user's data via the API using their Firebase token.
   * - If successful, a success message is displayed.
   * - If an error occurs, it is logged and displayed to the user.
   */
  const handleSave = async () => {
    if (!result) {
      dispatch(setError("No user data to save. Please click INFO button first.")); // Set error state
      return;
    }

    dispatch(setLoading(true)); // Set loading state to true
    try {
      const tokenId = await auth.currentUser?.getIdToken(); // Get the ID token

      if (!tokenId) {
        throw new Error("Failed to retrieve token ID.");
      }

      const response = await fetch(`${API_SERVER}/update-user-data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          "Authorization": `Bearer ${tokenId}`, // Add the Bearer token
        },
        body: JSON.stringify(result), // Convert the result to a JSON string
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(setError(`Failed to update user \n ${data.error} `)); // Set error state
      }

      setResult(null); // Clear the result state
      dispatch(setLoading(false)); // Set loading state to false

      dispatch(setSuccess(data.message || "User data updated successfully!")); // Set success state
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating data:", err.message); // Log the error
        dispatch(setError("Failed to update user data.")); // Set error state
      } else {
        dispatch(setError("An unknown error occurred during logout.")); // Set error state
      }
      dispatch(setLoading(false)); // Set loading state to false
    }
  };

  /**
   * Render Loading State
   * 
   * If the `loading` state is true, render the `LoadingDialog` component.
   */
  if (loading) {
    return (
      <LoadingDialog />
    );
  }

  /**
   * Render Error State
   * 
   * If the `error` state is not empty, render the `ErrorDialog` component.
   */
  if (error) {
    return (
      <ErrorDialog 
        message= {error}
        onClose={() => dispatch(setError(""))} // Reset the error message on close
      />
    );
  }

  /**
   * Render Member Page
   * 
   * The member page includes:
   * - A welcome message with the user's email.
   * - A form to display and edit user details.
   * - Action buttons for fetching, saving, and logging out.
   */
  return (
    <React.Fragment>
      <Container
        maxWidth="sm" // Responsive container with a max width
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100vh", // Full viewport height
          padding: "1rem",
        }}
      >
        <Image 
          src="https://www.ebuddy.gg/assets/logo/ebuddy.svg" 
          alt="logo"
          width={100} 
          height={100} 
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Member Page
        </Typography>
        
        {email && (
          <Typography
            variant="body1"
            sx={{
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Welcome, <strong>{email}</strong>!
          </Typography>
        )}

        {/* Responsive form to display user details */}
        {result && (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column", // Stack form fields vertically
              gap: "1rem", // Add spacing between form fields
              width: "100%", // Full width of the container
              maxWidth: "400px", // Limit the max width for responsiveness
              margin: "0 auto", // Center the form horizontally
              padding: "1rem", // Add padding for better spacing
              backgroundColor: "#f9f9f9", // Light background for contrast
              borderRadius: "8px", // Rounded corners
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              User Details
            </Typography>

            {/* Name field */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Name:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={result.name}
                onChange={(e) =>
                  setResult((prev) => (prev ? { ...prev, name: e.target.value } : null))
                }
              />
            </Box>

            {/* Age field */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Age:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                value={result.age}
                onChange={(e) =>
                  setResult((prev) =>
                    prev ? { ...prev, age: parseInt(e.target.value, 10) || 0 } : null
                  )
                }
              />
            </Box>

            {/* Number of Rents field */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Number of Rents:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                value={result.numberOfRents}
                onChange={(e) =>
                  setResult((prev) =>
                    prev
                      ? { ...prev, numberOfRents: parseInt(e.target.value, 10) || 0 }
                      : null
                  )
                }
              />
            </Box>
            
          </Box>
        )}

        <ActionButtons 
          onInfoClick={handleInfo} // Fetch user data
          onSaveClick={handleSave} // Save user data
          onLogoutClick={handleLogout} // Logout user
        />

      </Container>

      <Toast 
        open={!!success} 
        onClose={() => dispatch(setSuccess(""))} // Reset the message on close
        message={success} // Display the message
      />      
    </React.Fragment>  
  );
};

export default MemberPage;