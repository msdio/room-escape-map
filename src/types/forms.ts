/**
 * Utility types for form handling and API responses
 */

import { Visit, Review, SavedRoom } from './models';

// Form data types (without generated fields)
export type VisitFormData = Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'review'>;

export type ReviewFormData = Omit<Review, 'id' | 'createdAt' | 'updatedAt'>;

export type SavedRoomFormData = Omit<SavedRoom, 'id' | 'createdAt' | 'updatedAt'>;

// Form validation types
export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

// Form state management
export interface FormState<T> {
  data: T;
  errors: FormValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

// Search and filter types
export interface SearchFilters {
  searchText?: string;
  storeName?: string;
  themeName?: string;
  rating?: number;
  cleared?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dateFrom?: Date;
  dateTo?: Date;
}

export interface SortOptions {
  field: 'date' | 'rating' | 'storeName' | 'themeName';
  direction: 'asc' | 'desc';
}

// Pagination types
export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}