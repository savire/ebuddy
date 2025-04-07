"use client"

import React from "react";
import { 
  Button,
  Box 
} from "@mui/material"; // Import MUI components

/**
 * Props for the ActionButtons Component
 * 
 * This interface defines the props for the `ActionButtons` component.
 * - `onInfoClick`: Callback function triggered when the "Info" button is clicked.
 * - `onSaveClick`: Callback function triggered when the "Save" button is clicked.
 * - `onLogoutClick`: Callback function triggered when the "Logout" button is clicked.
 */
interface ActionButtonsProps {
  onInfoClick: () => void;  
  onSaveClick: () => void;  
  onLogoutClick: () => void;  
}

/**
 * ActionButtons Component
 * 
 * This component renders a row of action buttons for the member page.
 * - "Info" button: Fetches user information.
 * - "Save" button: Saves user data.
 * - "Logout" button: Logs the user out.
 * 
 * Features:
 * - Responsive layout using Material-UI's `Box` component.
 * - Customizable button styles for consistent UI.
 * - Callback functions passed as props for handling button actions.
 * 
 * @param onInfoClick - Function to handle the "Info" button click.
 * @param onSaveClick - Function to handle the "Save" button click.
 * @param onLogoutClick - Function to handle the "Logout" button click.
 * @returns A row of action buttons.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onInfoClick,
  onSaveClick,
  onLogoutClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex", // Use flexbox for layout
        flexDirection: "row", // Arrange buttons in a row
        justifyContent: "center", // Center the buttons horizontally
        alignItems: "center", // Align the buttons vertically
        gap: "1rem", // Add spacing between the buttons
        marginTop: "2rem", // Add spacing above the row
      }}
    >
      {/* Info Button */}
      <Button
        variant="contained" // Use Material-UI's contained button style
        color="info" // Set button color to "info"
        onClick={onInfoClick} // Trigger the onInfoClick callback
        sx={{
          marginTop: "1rem", // Add spacing above the button
          padding: "10px 20px", // Add padding for better clickability
          fontSize: "1rem", // Set font size for the button text
        }}
      >
        Info
      </Button>

      {/* Save Button */}
      <Button
        variant="contained" // Use Material-UI's contained button style
        color="success" // Set button color to "success"
        onClick={onSaveClick} // Trigger the onSaveClick callback
        sx={{
          marginTop: "1rem", // Add spacing above the button
          padding: "10px 20px", // Add padding for better clickability
          fontSize: "1rem", // Set font size for the button text
        }}
      >
        Save
      </Button>

      {/* Logout Button */}
      <Button
        variant="contained" // Use Material-UI's contained button style
        color="error" // Set button color to "error"
        onClick={onLogoutClick} // Trigger the onLogoutClick callback
        sx={{
          marginTop: "1rem", // Add spacing above the button
          padding: "10px 20px", // Add padding for better clickability
          fontSize: "1rem", // Set font size for the button text
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ActionButtons;