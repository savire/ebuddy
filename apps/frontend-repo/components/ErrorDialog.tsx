"use client"

import React from "react";
import { 
  Typography, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogActions,
} from "@mui/material"; // Import Material-UI components
import ErrorOutline from '@mui/icons-material/ErrorOutline'; // Import Material-UI error icon

/**
 * Props for the ErrorDialog Component
 * 
 * This interface defines the props for the `ErrorDialog` component.
 * - `message`: An optional error message to display in the dialog.
 * - `onClose`: A callback function triggered when the "OK" button is clicked to close the dialog.
 */
interface ErrorDialogProps {
  message?: string; // Optional message prop
  onClose: () => void; // Function to handle closing the Dialog
}

/**
 * ErrorDialog Component
 * 
 * This component renders a modal dialog to display error messages.
 * - Displays an error icon and a title to indicate an error has occurred.
 * - Shows a customizable error message passed via the `message` prop.
 * - Includes an "OK" button to close the dialog, triggering the `onClose` callback.
 * 
 * Features:
 * - Responsive design using Material-UI components.
 * - Customizable styles for the dialog and its content.
 * - Accessibility-friendly with clear error messaging.
 * 
 * @param message - The error message to display in the dialog.
 * @param onClose - Function to handle closing the dialog.
 * @returns A modal dialog displaying the error message.
 */
const ErrorDialog: React.FC<ErrorDialogProps> = ({
  message,
  onClose,
}) => {
  return (
    <Dialog
      open={true} // Always open when there's an error
      sx={{
        "& .MuiDialog-paper": {
          display: "flex", // Use flexbox for layout
          flexDirection: "column", // Stack content vertically
          justifyContent: "center", // Center content vertically
          alignItems: "center", // Center content horizontally
          padding: "20px", // Add padding around the dialog
          gap: "10px", // Add spacing between elements
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          display: "flex", // Use flexbox for layout
          alignItems: "center", // Center icon and text vertically
          gap: "10px", // Add spacing between the icon and text
          color: "red", // Set title color to red for emphasis
          fontWeight: "bold", // Make the title bold
        }}
      >
        <ErrorOutline sx={{ fontSize: "2rem" }} /> {/* Error icon */}
        An Error has occurred
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <Typography
          variant="body1" // Use body1 typography variant
          sx={{
            fontSize: "1rem", // Set font size
            color: "red", // Set text color to red
            textAlign: "center", // Center-align the text
            whiteSpace: "pre-line", // Preserve line breaks in the message
          }}
        >
          {message} {/* Display the error message */}
        </Typography>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <button
          onClick={onClose} // Trigger the onClose callback when clicked
          style={{
            padding: "10px 20px", // Add padding for better clickability
            backgroundColor: "red", // Set button background color to red
            color: "white", // Set button text color to white
            border: "none", // Remove border
            borderRadius: "5px", // Add rounded corners
            cursor: "pointer", // Change cursor to pointer on hover
          }}
        >
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;