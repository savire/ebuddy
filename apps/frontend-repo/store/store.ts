import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./pageSlice"; // Import the reducer from the page slice

/**
 * Redux Store Configuration
 * 
 * This file sets up the Redux store for the application using Redux Toolkit's `configureStore`.
 * - Combines all reducers into a single store.
 * - Provides type definitions for the store's state and dispatch function.
 * 
 * Features:
 * - Centralized state management for the application.
 * - Easy integration with Redux Toolkit slices.
 * - Type-safe access to the store's state and dispatch.
 */

/**
 * Configure the Redux Store
 * 
 * The `configureStore` function creates the Redux store with the provided reducers.
 * - `reducer`: An object containing all slice reducers combined into a single root reducer.
 * - `page`: The namespace for the `pageReducer`, managing page-level state (e.g., loading, success, error).
 */
const store = configureStore({
  reducer: {
    page: pageReducer, // Add the page slice reducer under the `page` namespace
  },
});

/**
 * RootState Type
 * 
 * The `RootState` type represents the shape of the entire Redux store's state.
 * - Automatically inferred from the store's configuration.
 * - Used for type-safe access to the state in selectors and components.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch Type
 * 
 * The `AppDispatch` type represents the dispatch function for the Redux store.
 * - Automatically inferred from the store's configuration.
 * - Used for type-safe dispatching of actions in components and hooks.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Export the Store
 * 
 * The `store` is exported for use in the application.
 * - Passed to the Redux `Provider` to make the store available to all components.
 */
export default store;