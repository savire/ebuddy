/**
 * Shared Module Entry Point
 * 
 * This file serves as the entry point for the `shared` package.
 * - Re-exports modules and entities to simplify imports in other parts of the application.
 * - Provides a centralized location for accessing shared resources.
 * 
 * Features:
 * - Improves maintainability by consolidating exports.
 * - Simplifies import paths for shared entities.
 * 
 * Example Usage:
 * ```typescript
 * import { User } from '@repo/shared';
 * ```
 */

// Re-export the `User` entity from the `entities/user` module
export * from './entities/user';