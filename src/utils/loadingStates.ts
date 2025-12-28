/**
 * Utilities for managing loading and empty states consistently
 */

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
}

/**
 * Creates an initial loading state
 */
export function createInitialLoadingState(): LoadingState {
  return {
    isLoading: true,
    error: null,
    isEmpty: false,
  };
}

/**
 * Creates a success loading state
 */
export function createSuccessState(isEmpty: boolean = false): LoadingState {
  return {
    isLoading: false,
    error: null,
    isEmpty,
  };
}

/**
 * Creates an error loading state
 */
export function createErrorState(error: Error | string): LoadingState {
  return {
    isLoading: false,
    error: error instanceof Error ? error : new Error(error),
    isEmpty: false,
  };
}

/**
 * Type guard to check if state has an error
 */
export function hasError(state: LoadingState): state is LoadingState & { error: Error } {
  return state.error !== null;
}

/**
 * Type guard to check if state is loading
 */
export function isLoading(state: LoadingState): boolean {
  return state.isLoading;
}

/**
 * Type guard to check if state is empty
 */
export function isEmpty(state: LoadingState): boolean {
  return state.isEmpty && !state.isLoading && !hasError(state);
}

