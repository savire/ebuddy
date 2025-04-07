"use client"

// Base
import React, { useState, useEffect, FormEvent } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, API_SERVER } from '../../apis/auth';
import { useRouter } from 'next/navigation';

// UI
import Image from "next/image";
import Link from "next/link";

import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";

// Custom Components
import ErrorDialog from '@/components/ErrorDialog';
import LoadingDialog from '@/components/LoadingDialog';

// Redux
import { useAppSelector, useAppDispatch } from '../hook';
import { 
  setLoading, 
  setError, 
  selectError,
  selectLoading 
} from '@/store/pageSlice';

/**
 * LoginPage Component
 * 
 * This component renders a login form that allows users to log in using their email and password.
 * It integrates Firebase Authentication for user login and Redux for managing loading and error states.
 * 
 * Features:
 * - Email and password input fields with validation.
 * - Integration with Firebase Authentication for login.
 * - API call to verify the user after login.
 * - Error and loading state management using Redux.
 * - Responsive design using Material-UI components.
 */
const LoginPage = () => {
  // Redux state variables
  const dispatch = useAppDispatch(); // Initialize Redux dispatch
  const loading = useAppSelector(selectLoading); // Get loading state from Redux store
  const error = useAppSelector(selectError); // Get error state from Redux store

  // Local state variables
  const [email, setEmail] = useState<string>('david.innamorata@gmail.com'); // Default email for testing
  const [password, setPassword] = useState<string>('12345678'); // Default password for testing

  const router = useRouter(); // Initialize Next.js router

  /**
   * Reset loading and error states
   * 
   * This effect runs when the component mounts or when the router changes.
   * It resets the loading and error states in Redux to ensure a clean state.
   */
  useEffect(() => {
    dispatch(setLoading(false)); // Reset loading state
    dispatch(setError("")); // Reset error state
  }, [router]);

  /**
   * Handle Login Form Submission
   * 
   * This function handles the form submission for user login.
   * - Prevents the default form submission behavior.
   * - Attempts to log in the user using Firebase Authentication.
   * - Verifies the user by sending a POST request to the `/verify-user` API endpoint.
   * - Updates the Redux state based on the result of the login and verification process.
   * 
   * @param e - The form submission event.
   */
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(setError("")); // Reset error state
    dispatch(setLoading(true)); // Set loading to true

    try {
      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the signed-in user
      const tokenId = await user.getIdToken(); // Get the ID token

      // Create a JSON object with the tokenId
      const payload = {
        tokenId: tokenId,
      };

      // Post the JSON object to the API server
      const response = await fetch(`${API_SERVER}/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      });

      if (!response.ok) {
        dispatch(setError(`Failed to verify user`)); // Set error if the response is not OK
      }

      const result = await response.json();
      console.log("Verification result:", result);

      if (result.isLoggedIn) {
        console.log("User is logged in!");
        
        // Redirect user to the member page
        router.push("/member");
      } else {
        dispatch(setError("User verification failed.")); // Set error if verification fails
      }

    } catch (error: any) {
      console.error("Error during login:", error); // Log the error
      // Handle errors and set the error message
      dispatch(setLoading(false)); // Set loading to false
      dispatch(setError(error.message)); // Set error message
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
        message={error} 
        onClose={() => dispatch(setError(""))} // Clear the error state on close
      />
    );
  }

  /**
   * Render Login Form
   * 
   * The login form includes:
   * - Email and password input fields.
   * - A submit button to trigger the login process.
   * - Material-UI components for styling and responsiveness.
   */
  return (
    <React.Fragment> 
      <Dialog
        open={true}
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            maxWidth: "500px",
            width: "100%",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 1)",
            },
          },
        }}
      >
        <DialogTitle>
          <Link href="/" passHref>
            <Image 
              src="https://www.ebuddy.gg/assets/logo/ebuddy.svg" 
              alt="logo"
              width={150} 
              height={150} 
            />
          </Link>
        </DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <form onSubmit={handleLogin} >
            <Box 
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                width: "100%", // Ensure the Box takes full width
              }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                sx={{
                  marginTop: "10px",
                }}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default LoginPage;