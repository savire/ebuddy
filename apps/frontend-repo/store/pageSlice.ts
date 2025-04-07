import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

/**
 * PageState Interface
 * 
 * This interface defines the shape of the state managed by the `pageSlice`.
 * - `success`: A string or null, representing a success message.
 * - `loading`: A boolean indicating whether a loading operation is in progress.
 * - `error`: A string or null, representing an error message.
 */
interface PageState {
  success: string | null; // Success message or null
  loading: boolean; // Loading state
  error: string | null; // Error message or null
}

/**
 * Initial State
 * 
 * The `initialState` object defines the default values for the `PageState`.
 * - `success`: Initially set to `null` (no success message).
 * - `loading`: Initially set to `true` (indicating the app is loading).
 * - `error`: Initially set to `null` (no error message).
 */
const initialState: PageState = {
  success: null,
  loading: true,
  error: null,
};

/**
 * Page Slice
 * 
 * The `pageSlice` manages the state for page-level operations such as loading, success, and error messages.
 * - `name`: The name of the slice, used as a namespace in the Redux store.
 * - `initialState`: The default state for the slice.
 * - `reducers`: Functions to update the state based on dispatched actions.
 */
const pageSlice = createSlice({
  name: 'page', // Namespace for the slice
  initialState, // Default state
  reducers: {
    /**
     * Set Success
     * 
     * Updates the `success` state with the provided message.
     * 
     * @param state - The current state of the slice.
     * @param action - The action containing the success message payload.
     */
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },

    /**
     * Set Loading
     * 
     * Updates the `loading` state with the provided boolean value.
     * 
     * @param state - The current state of the slice.
     * @param action - The action containing the loading state payload.
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Set Error
     * 
     * Updates the `error` state with the provided error message.
     * 
     * @param state - The current state of the slice.
     * @param action - The action containing the error message payload.
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

/**
 * Exported Actions
 * 
 * These actions are used to update the state managed by the `pageSlice`.
 * - `setSuccess`: Updates the success message.
 * - `setLoading`: Updates the loading state.
 * - `setError`: Updates the error message.
 */
export const { setSuccess, setLoading, setError } = pageSlice.actions;

/**
 * Selectors
 * 
 * These selectors are used to access specific parts of the `page` state from the Redux store.
 * - `selectSuccess`: Retrieves the success message.
 * - `selectLoading`: Retrieves the loading state.
 * - `selectError`: Retrieves the error message.
 */
export const selectSuccess = (state: RootState) => state.page.success;
export const selectLoading = (state: RootState) => state.page.loading;
export const selectError = (state: RootState) => state.page.error;

/**
 * Reducer
 * 
 * The `pageReducer` is exported for use in the Redux store configuration.
 */
export const pageReducer = pageSlice.reducer;

export default pageSlice;