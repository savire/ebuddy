"use client"

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material"; // Import Material-UI components

/**
 * Props for the LoadingDialog Component
 * 
 * This interface defines the props for the `LoadingDialog` component.
 * - `message`: An optional message to display below the loading spinner.
 */
interface LoadingDialogProps {
  message?: string; // Optional message prop with a default value
}

/**
 * LoadingDialog Component
 * 
 * This component renders a fullscreen loading dialog with a spinner and an optional message.
 * - Displays a centered loading spinner to indicate ongoing activity.
 * - Shows a customizable message below the spinner.
 * 
 * Features:
 * - Responsive design using Material-UI's `Box` component.
 * - Customizable styles for the spinner and message.
 * - Accessibility-friendly with clear loading indicators.
 * 
 * @param message - The loading message to display below the spinner.
 * @returns A fullscreen loading dialog with a spinner and message.
 */
const LoadingDialog: React.FC<LoadingDialogProps> = ({ message = "Loading please wait..." }) => {
  return (
    <Box
      sx={{
        display: "flex", // Use flexbox for layout
        flexDirection: "column", // Stack spinner and message vertically
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        gap: "10px", // Add spacing between the spinner and message
        height: "100vh", // Full viewport height
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress
        sx={{
          color: "black", // Set spinner color to black
        }}
      />

      {/* Loading Message */}
      <Typography
        variant="h6" // Use h6 typography variant for the message
        sx={{
          fontSize: "1rem", // Set font size for the message
          textAlign: "center", // Center-align the text
        }}
      >
        {message} {/* Display the loading message */}
      </Typography>
    </Box>
  );
};

export default LoadingDialog;