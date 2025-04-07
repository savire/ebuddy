"use client"

import React from "react";
import { Snackbar } from "@mui/material"; // Import Material-UI Snackbar component

/**
 * Props for the Toast Component
 * 
 * This interface defines the props for the `Toast` component.
 * - `message`: The message to display in the Snackbar.
 * - `open`: Whether the Snackbar is open.
 * - `onClose`: Function to handle closing the Snackbar.
 * - `autoHideDuration`: Optional duration (in milliseconds) before the Snackbar auto-hides.
 */
interface ToastProps {
  message: string | null; // The message to display in the Snackbar
  open: boolean; // Whether the Snackbar is open
  onClose: () => void; // Function to handle closing the Snackbar
  autoHideDuration?: number; // Optional: Duration before the Snackbar auto-hides
}

/**
 * Toast Component
 * 
 * This component renders a Material-UI `Snackbar` to display temporary messages.
 * - Displays a message passed via the `message` prop.
 * - Automatically hides after a specified duration (`autoHideDuration`).
 * - Provides a callback (`onClose`) to handle manual dismissal.
 * 
 * Features:
 * - Responsive design with customizable positioning.
 * - Default auto-hide duration of 3 seconds for convenience.
 * - Accessibility-friendly with clear messaging.
 * 
 * @param message - The message to display in the Snackbar.
 * @param open - Whether the Snackbar is open.
 * @param onClose - Function to handle closing the Snackbar.
 * @param autoHideDuration - Optional duration before the Snackbar auto-hides (default: 3000ms).
 * @returns A Material-UI `Snackbar` component for displaying temporary messages.
 */
const Toast: React.FC<ToastProps> = ({
  message,
  open,
  onClose,
  autoHideDuration = 3000, // Default auto-hide duration is 3 seconds
}) => {
  return (
    <Snackbar
      open={open} // Show when `open` is true
      autoHideDuration={autoHideDuration} // Automatically hide after the specified duration
      onClose={onClose} // Call the `onClose` function when the Snackbar is dismissed
      message={message} // Display the message
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position the Snackbar
    />
  );
};

export default Toast;