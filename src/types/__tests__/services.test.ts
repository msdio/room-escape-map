/**
 * Tests for service interfaces to ensure proper typing
 */

import { describe, it, expect } from 'vitest';
import { DataService, ImageService, StorageService } from '../services';
import { Visit, Review, SavedRoom } from '../models';

describe('Service Interfaces', () => {
  it('should define DataService interface correctly', () => {
    // This test ensures the interface is properly typed by creating a mock implementation
    const mockDataService: DataService = {
      getVisits: async () => [],
      createVisit: async (visit) => ({
        ...visit,
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      updateVisit: async (id, updates) => ({
        id,
        storeName: 'Test Store',
        themeName: 'Test Theme',
        visitDate: new Date(),
        cleared: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updates,
      }),
      deleteVisit: async () => {},
      createReview: async (review) => ({
        ...review,
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      updateReview: async (id, updates) => ({
        id,
        visitId: 'visit-1',
        rating: 5,
        comment: 'Test',
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updates,
      }),
      deleteReview: async () => {},
      getSavedRooms: async () => [],
      createSavedRoom: async (room) => ({
        ...room,
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      updateSavedRoom: async (id, updates) => ({
        id,
        storeName: 'Test Store',
        themeName: 'Test Theme',
        memo: 'Test memo',
        priority: 'medium' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updates,
      }),
      deleteSavedRoom: async () => {},
    };

    expect(mockDataService).toBeDefined();
    expect(typeof mockDataService.getVisits).toBe('function');
    expect(typeof mockDataService.createVisit).toBe('function');
  });

  it('should define ImageService interface correctly', () => {
    const mockImageService: ImageService = {
      saveImage: async () => 'path/to/image.jpg',
      getImage: async () => 'base64-image-data',
      deleteImage: async () => {},
      generateThumbnail: async () => 'path/to/thumbnail.jpg',
      compressImage: async () => 'compressed-image-data',
    };

    expect(mockImageService).toBeDefined();
    expect(typeof mockImageService.saveImage).toBe('function');
    expect(typeof mockImageService.generateThumbnail).toBe('function');
  });

  it('should define StorageService interface correctly', () => {
    const mockStorageService: StorageService = {
      get: async () => null,
      set: async () => {},
      remove: async () => {},
      clear: async () => {},
    };

    expect(mockStorageService).toBeDefined();
    expect(typeof mockStorageService.get).toBe('function');
    expect(typeof mockStorageService.set).toBe('function');
  });

  it('should ensure proper type constraints for service methods', async () => {
    // Test that the service interfaces enforce correct types
    const mockDataService: DataService = {
      getVisits: async () => [],
      createVisit: async (visit) => {
        // Ensure visit parameter doesn't include generated fields
        const visitData: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'> = visit;
        expect(visitData.storeName).toBeDefined();
        expect(visitData.themeName).toBeDefined();
        expect(visitData.visitDate).toBeDefined();
        expect(visitData.cleared).toBeDefined();
        
        return {
          ...visit,
          id: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
      updateVisit: async () => ({} as Visit),
      deleteVisit: async () => {},
      createReview: async () => ({} as Review),
      updateReview: async () => ({} as Review),
      deleteReview: async () => {},
      getSavedRooms: async () => [],
      createSavedRoom: async () => ({} as SavedRoom),
      updateSavedRoom: async () => ({} as SavedRoom),
      deleteSavedRoom: async () => {},
    };

    const visitData = {
      storeName: 'Test Store',
      themeName: 'Test Theme',
      visitDate: new Date(),
      cleared: true,
    };

    const result = await mockDataService.createVisit(visitData);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});