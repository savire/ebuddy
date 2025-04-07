"use client"; // Mark this as a Client Component

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material"; // Import Material-UI components
import { Geist, Geist_Mono } from "next/font/google"; // Import Google fonts

import store from "@/store/store"; // Import Redux store
import { Provider } from "react-redux"; // Redux provider for state management

/**
 * Load Custom Fonts
 * 
 * The `Geist` and `Geist_Mono` fonts are loaded using Next.js's font optimization.
 * - `variable`: Defines a CSS variable for the font to be used in the theme.
 * - `subsets`: Specifies the font subsets to load for performance optimization.
 */
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for the font
  subsets: ["latin"], // Load only the Latin subset
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable for the font
  subsets: ["latin"], // Load only the Latin subset
});

/**
 * Create Custom Material-UI Theme
 * 
 * The `createTheme` function is used to define a custom Material-UI theme.
 * - `palette`: Defines the color scheme for the application.
 * - `typography`: Defines font styles and sizes for the application.
 * 
 * Features:
 * - Light mode theme with custom primary, error, info, and success colors.
 * - Custom typography using the loaded Google fonts.
 */
const theme = createTheme({
  palette: {
    mode: "light", // Set the theme to light mode
    primary: {
      main: "#bd4568", // Custom primary color
    },
    error: {
      main: "#607D8B", // Custom error color
    },
    info: {
      main: "#ffdc9c", // Custom info color
    },
    success: {
      main: "#ff9718", // Custom success color
    },
    text: {
      primary: "#000000", // Primary text color
      secondary: "#757575", // Secondary text color
    },
  },
  typography: {
    fontFamily: `${geistSans.variable}, ${geistMono.variable}, Arial, sans-serif`, // Use custom fonts with fallbacks
    h1: {
      fontSize: "2.5rem", // Font size for H1 headings
      fontWeight: 700, // Bold font weight
    },
    h2: {
      fontSize: "2rem", // Font size for H2 headings
      fontWeight: 600, // Semi-bold font weight
    },
    body1: {
      fontSize: "1rem", // Font size for body text
    },
  },
});

/**
 * ThemeWrapper Component
 * 
 * This component wraps the application with the Redux store and Material-UI theme provider.
 * - `Provider`: Makes the Redux store available to all components in the app.
 * - `ThemeProvider`: Applies the custom Material-UI theme to all child components.
 * 
 * Features:
 * - Centralized state management using Redux.
 * - Consistent theming across the application using Material-UI.
 * 
 * @param children - The child components to be rendered inside the wrapper.
 * @returns A wrapper component that provides the Redux store and Material-UI theme.
 */
export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode; // Type for React children
}) {
  return (
    <Provider store={store}> {/* Provide the Redux store to the app */}
      <ThemeProvider theme={theme}> {/* Apply the custom Material-UI theme */}
        {children} {/* Render child components */}
      </ThemeProvider>
    </Provider>
  );
}