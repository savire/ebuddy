// Importing the Next.js configuration type for type safety and IntelliSense support
import type { NextConfig } from "next";

// Defining the Next.js configuration object
const nextConfig: NextConfig = {

  // Configuring the Next.js Image Optimization feature
  images: {
    // Allowing remote images from specific domains and paths
    remotePatterns: [
      {
        protocol: "https", // Ensures secure image loading over HTTPS
        hostname: "doze.ninja", // Domain name for remote images
        pathname: "/public/**", // Allow all images under the /public/ path
      },
      {
        protocol: "https", // Ensures secure image loading over HTTPS
        hostname: "www.ebuddy.gg", // Domain name for remote images
        pathname: "/assets/logo/**", // Allow all images under the /assets/logo/ path
      },
    ],
  },
};

// Exporting the configuration object for use by Next.js
export default nextConfig;