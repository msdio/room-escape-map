/**
 * Utility types for common patterns and type transformations
 */

// Make all properties optional except specified ones
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Make all properties required except specified ones
export type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

// Extract keys of a type that are of a specific type
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Create a type with only the specified keys
export type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;

// Omit properties that are functions
export type OmitFunctions<T> = Omit<T, KeysOfType<T, Function>>;

// Create a deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Create a type that represents the keys of an object as a union
export type ValueOf<T> = T[keyof T];

// Create a type for event handlers
export type EventHandler<T = void> = (event: T) => void;

// Create a type for async event handlers
export type AsyncEventHandler<T = void> = (event: T) => Promise<void>;

// Create a type for component props with children
export type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

// Create a type for component props with optional className
export type WithClassName<T = {}> = T & {
  className?: string;
};

// Create a type for component props with testId
export type WithTestId<T = {}> = T & {
  testId?: string;
};

// Combine common component prop types
export type BaseComponentProps<T = {}> = WithChildren<WithClassName<WithTestId<T>>>;

// Create a type for loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Create a type for async data with loading state
export interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Create a type for debounced values
export interface DebouncedValue<T> {
  value: T;
  debouncedValue: T;
  isDebouncing: boolean;
}