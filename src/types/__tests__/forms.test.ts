/**
 * Tests for form types and utility types
 */

import { describe, it, expect } from 'vitest';
import { 
  VisitFormData, 
  ReviewFormData, 
  SavedRoomFormData,
  FormState,
  SearchFilters,
  SortOptions,
  PaginatedResult
} from '../forms';

describe('Form Types', () => {
  it('should create valid form data types', () => {
    const visitFormData: VisitFormData = {
      storeName: 'Mystery Rooms',
      themeName: 'Haunted House',
      visitDate: new Date(),
      cleared: true,
    };

    const reviewFormData: ReviewFormData = {
      visitId: 'visit-1',
      rating: 5,
      comment: 'Amazing experience!',
      images: ['image1.jpg'],
    };

    const savedRoomFormData: SavedRoomFormData = {
      storeName: 'Escape Quest',
      themeName: 'Space Station',
      memo: 'Want to try this next',
      priority: 'high',
    };

    expect(visitFormData.storeName).toBe('Mystery Rooms');
    expect(reviewFormData.rating).toBe(5);
    expect(savedRoomFormData.priority).toBe('high');
  });

  it('should create valid form state', () => {
    const formState: FormState<VisitFormData> = {
      data: {
        storeName: 'Test Store',
        themeName: 'Test Theme',
        visitDate: new Date(),
        cleared: false,
      },
      errors: [],
      isSubmitting: false,
      isDirty: true,
      isValid: true,
    };

    expect(formState.data.storeName).toBe('Test Store');
    expect(formState.errors).toHaveLength(0);
    expect(formState.isValid).toBe(true);
  });

  it('should create valid search filters', () => {
    const filters: SearchFilters = {
      searchText: 'haunted',
      storeName: 'Mystery Rooms',
      rating: 5,
      cleared: true,
      priority: 'high',
      dateFrom: new Date('2024-01-01'),
      dateTo: new Date('2024-12-31'),
    };

    expect(filters.searchText).toBe('haunted');
    expect(filters.rating).toBe(5);
    expect(filters.priority).toBe('high');
  });

  it('should create valid sort options', () => {
    const sortOptions: SortOptions = {
      field: 'rating',
      direction: 'desc',
    };

    expect(sortOptions.field).toBe('rating');
    expect(sortOptions.direction).toBe('desc');
  });

  it('should create valid paginated result', () => {
    const paginatedResult: PaginatedResult<string> = {
      items: ['item1', 'item2', 'item3'],
      totalCount: 10,
      currentPage: 1,
      totalPages: 4,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    expect(paginatedResult.items).toHaveLength(3);
    expect(paginatedResult.totalCount).toBe(10);
    expect(paginatedResult.hasNextPage).toBe(true);
    expect(paginatedResult.hasPreviousPage).toBe(false);
  });

  it('should enforce type constraints', () => {
    // Test that form data types exclude generated fields
    const visitFormData: VisitFormData = {
      storeName: 'Test',
      themeName: 'Test',
      visitDate: new Date(),
      cleared: true,
      // These should not be allowed in form data:
      // id: '1', // Should cause TypeScript error
      // createdAt: new Date(), // Should cause TypeScript error
      // updatedAt: new Date(), // Should cause TypeScript error
      // review: {} // Should cause TypeScript error
    };

    expect(visitFormData).toBeDefined();
  });
});