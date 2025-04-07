"use client"

// Base
import * as React from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { 
  Box, 
  Button,
  Typography
} from '@mui/material';

/**
 * Home Component
 * 
 * This component serves as the landing page for the eBuddy application.
 * It provides a simple interface with a welcome message, logo, and a button
 * to navigate to the login page.
 * 
 * Features:
 * - Fullscreen layout with a centered design.
 * - Responsive UI using Material-UI components.
 * - Navigation to the login page using Next.js router.
 */
export default function Home() {
  const router = useRouter(); // Initialize Next.js router

  /**
   * Handle Login Redirect
   * 
   * This function navigates the user to the `/login` page when the "Login" button is clicked.
   */
  const handleLoginRedirect = () => {
    router.push("/login"); // Navigate to the login page
  };

  /**
   * Render Home Page
   * 
   * The home page includes:
   * - A welcome message displayed as a large heading.
   * - The eBuddy logo displayed using the Next.js `Image` component.
   * - A "Login" button that redirects the user to the login page.
   */
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex', // Use flexbox for layout
          justifyContent: 'center', // Center content horizontally
          flexDirection: 'column', // Stack content vertically
          alignItems: 'center', // Center content vertically
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          backgroundColor: 'black', // Set background color to black
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant='h2'
          sx={{
            color: 'white', // Set text color to white
            fontSize: '4rem', // Large font size for the heading
            fontWeight: 'bold', // Bold font weight
            textAlign: 'center', // Center-align the text
            marginBottom: '20px', // Add spacing below the heading
          }}
        >
          eBuddy App
        </Typography>  

        {/* Logo */}
        <Image 
          src="https://www.ebuddy.gg/assets/logo/ebuddy.svg" 
          alt="logo" // Alt text for accessibility
          width={300} // Set logo width
          height={300} // Set logo height
        />

        {/* Login Button */}
        <Button 
          variant="contained" // Use Material-UI's contained button style
          color="primary" // Set button color to primary
          onClick={handleLoginRedirect} // Redirect to login page on click
          sx={{
            marginTop: "10px", // Add spacing above the button
            fontSize: "1rem", // Set font size for the button text
          }}
        >
          Login
        </Button>
      </Box>
    </React.Fragment>
  );
}