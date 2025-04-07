import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

/**
 * Custom Redux Hooks
 * 
 * These hooks are type-safe wrappers around the base Redux hooks (`useDispatch` and `useSelector`).
 * They provide better TypeScript integration by including the correct types for your store.
 */

/**
 * Use App Dispatch Hook
 * 
 * This hook is a typed version of `useDispatch` that knows about your store's dispatch function.
 * It provides type safety when dispatching actions in your components.
 * 
 * Example usage:
 * ```tsx
 * const dispatch = useAppDispatch();
 * dispatch(someAction());
 * ```
 * 
 * @returns A typed dispatch function that can be used to dispatch Redux actions
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Use App Selector Hook
 * 
 * This hook is a typed version of `useSelector` that knows about your store's state shape.
 * It provides type safety when selecting state in your components.
 * 
 * Example usage:
 * ```tsx
 * const value = useAppSelector((state) => state.some.value);
 * ```
 * 
 * @returns The selected state from your Redux store with proper typing
 */
export const useAppSelector = useSelector.withTypes<RootState>();