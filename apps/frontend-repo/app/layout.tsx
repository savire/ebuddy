// Import necessary types and fonts
import type { Metadata } from "next"; // Type for metadata
import { Geist, Geist_Mono } from "next/font/google"; // Import Google fonts
import "./globals.css"; // Global CSS for consistent styling across the app

// UI
import { 
  CssBaseline // Component to reset CSS for consistent styling across browsers
} from '@mui/material';
import ThemeWrapper from "@/theme/ThemeWrapper"; // Custom theme wrapper for Material-UI and Redux

// Load custom fonts with subsets for performance optimization
const geistSans = Geist({
  variable: "--font-geist-sans", // Define a CSS variable for the font
  subsets: ["latin"], // Load only the required subset for better performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // Define a CSS variable for the font
  subsets: ["latin"], // Load only the required subset for better performance
});

/**
 * Metadata for the Application
 * 
 * The `metadata` object defines SEO-related metadata for the application.
 * - `title`: The title of the page, displayed in the browser tab and search engines.
 * - `description`: A brief description of the page for search engines.
 */
export const metadata: Metadata = {
  title: "eBuddy Technical Test", // Page title for SEO
  description: "eBuddy Technical Test", // Meta description for SEO
};

/**
 * Root Layout Component
 * 
 * This component serves as the root layout for the application.
 * It wraps all pages and components with global styles, fonts, and providers.
 * 
 * Features:
 * - Sets the HTML language attribute for accessibility and SEO.
 * - Applies custom Google fonts using CSS variables.
 * - Wraps the application with the `ThemeWrapper` to provide Material-UI theming and Redux store.
 * - Includes `CssBaseline` to reset CSS for consistent styling across browsers.
 * 
 * @param children - The child components to be rendered inside the layout.
 * @returns The root layout with global styles and providers.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type for React children
}>) {
  return (
    <html lang="en">{/* Set the language for accessibility and SEO */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}> {/* Apply custom fonts */}
        <ThemeWrapper> {/* Wrap the app with the theme provider and provide Redux store */}
          <CssBaseline /> {/* Reset CSS for consistent styling across browsers */}
          {children} {/* Render the child components */}
        </ThemeWrapper>
      </body>
    </html>
  );
}