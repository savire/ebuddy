/**
 * User Interface
 * 
 * This interface defines the structure of a `User` entity in the eBuddy application.
 * It includes basic user details and additional fields specific to the application's requirements.
 * 
 * Features:
 * - Represents a user with personal details and activity metrics.
 * - Used across the application for type safety and consistency.
 */
export interface User {
  // Basic Fields

  /**
   * Unique identifier for the user.
   * - Example: "12345abcde"
   */
  id: string;

  /**
   * Full name of the user.
   * - Example: "John Doe"
   */
  name: string;

  /**
   * Email address of the user.
   * - Example: "johndoe@example.com"
   */
  email: string;

  /**
   * Age of the user.
   * - Example: 30
   */
  age: number;

  /**
   * List of achievements earned by the user.
   * - Example: ["Top Renter", "5-Star Rating"]
   */
  achievements: string[];

  // Fields from the eBuddy document

  /**
   * The total average weight of ratings received by the user.
   * - Represents the average of all ratings weighted by their importance.
   * - Example: 4.5
   */
  totalAverageWeightRatings: number;

  /**
   * The total number of rentals completed by the user.
   * - Example: 15
   */
  numberOfRents: number;

  /**
   * Timestamp of the user's most recent activity.
   * - Represented as a Unix timestamp (number of seconds since January 1, 1970).
   * - Example: 1672531200 (equivalent to "2023-01-01T00:00:00Z")
   */
  recentlyActive: number;
}