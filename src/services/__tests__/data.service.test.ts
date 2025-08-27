/**
 * Unit tests for EscapeRoomDataService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EscapeRoomDataService } from '../data.service';
import { Visit, Review, SavedRoom } from '../../types';

// Mock the storage service
const mockStorageService = {
  get: vi.fn(),
  set: vi.fn(),
  remove: vi.fn(),
  clear: vi.fn()
};

vi.mock('../storage.service', () => ({
  CapacitorStorageService: vi.fn(() => mockStorageService)
}));

describe('EscapeRoomDataService', () => {
  let dataService: EscapeRoomDataService;

  beforeEach(() => {
    dataService = new EscapeRoomDataService();
    vi.clearAllMocks();
  });

  describe('Visit operations', () => {
    const mockVisit: Visit = {
      id: 'visit-1',
      storeName: 'Escape Room Central',
      themeName: 'The Haunted Mansion',
      visitDate: new Date('2024-01-15'),
      cleared: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    };

    describe('getVisits', () => {
      it('should return visits from storage', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);

        const visits = await dataService.getVisits();

        expect(visits).toEqual([mockVisit]);
        expect(mockStorageService.get).toHaveBeenCalledWith('visits');
      });

      it('should return empty array when no visits exist', async () => {
        mockStorageService.get.mockResolvedValue(null);

        const visits = await dataService.getVisits();

        expect(visits).toEqual([]);
      });

      it('should throw error when storage fails', async () => {
        mockStorageService.get.mockRejectedValue(new Error('Storage error'));

        await expect(dataService.getVisits()).rejects.toThrow('Failed to retrieve visits');
      });
    });

    describe('createVisit', () => {
      it('should create a new visit', async () => {
        mockStorageService.get.mockResolvedValue([]);
        mockStorageService.set.mockResolvedValue(undefined);

        const visitData = {
          storeName: 'New Escape Room',
          themeName: 'Mystery Theme',
          visitDate: new Date('2024-01-20'),
          cleared: false
        };

        const newVisit = await dataService.createVisit(visitData);

        expect(newVisit).toMatchObject(visitData);
        expect(newVisit.id).toBeDefined();
        expect(newVisit.createdAt).toBeDefined();
        expect(newVisit.updatedAt).toBeDefined();
        expect(mockStorageService.set).toHaveBeenCalledWith('visits', [newVisit]);
      });

      it('should add visit to existing visits', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);
        mockStorageService.set.mockResolvedValue(undefined);

        const visitData = {
          storeName: 'Another Escape Room',
          themeName: 'Space Theme',
          visitDate: new Date('2024-01-25'),
          cleared: true
        };

        const newVisit = await dataService.createVisit(visitData);

        expect(mockStorageService.set).toHaveBeenCalledWith('visits', [mockVisit, newVisit]);
      });
    });

    describe('updateVisit', () => {
      it('should update an existing visit', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);
        mockStorageService.set.mockResolvedValue(undefined);

        const updates = { cleared: false, themeName: 'Updated Theme' };
        const updatedVisit = await dataService.updateVisit('visit-1', updates);

        expect(updatedVisit.cleared).toBe(false);
        expect(updatedVisit.themeName).toBe('Updated Theme');
        expect(updatedVisit.updatedAt).not.toEqual(mockVisit.updatedAt);
      });

      it('should throw error when visit not found', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);

        await expect(dataService.updateVisit('non-existent', {})).rejects.toThrow('Failed to update visit');
      });
    });

    describe('deleteVisit', () => {
      it('should delete an existing visit', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);
        mockStorageService.set.mockResolvedValue(undefined);

        await dataService.deleteVisit('visit-1');

        expect(mockStorageService.set).toHaveBeenCalledWith('visits', []);
      });

      it('should throw error when visit not found', async () => {
        mockStorageService.get.mockResolvedValue([mockVisit]);

        await expect(dataService.deleteVisit('non-existent')).rejects.toThrow('Failed to delete visit');
      });
    });
  });

  describe('Review operations', () => {
    const mockReview: Review = {
      id: 'review-1',
      visitId: 'visit-1',
      rating: 4,
      comment: 'Great experience!',
      images: ['image1.jpg'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    };

    const mockVisitWithReview: Visit = {
      id: 'visit-1',
      storeName: 'Escape Room Central',
      themeName: 'The Haunted Mansion',
      visitDate: new Date('2024-01-15'),
      cleared: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      review: mockReview
    };

    describe('createReview', () => {
      it('should create a review for an existing visit', async () => {
        const visitWithoutReview = { ...mockVisitWithReview };
        delete visitWithoutReview.review;
        
        mockStorageService.get.mockResolvedValue([visitWithoutReview]);
        mockStorageService.set.mockResolvedValue(undefined);

        const reviewData = {
          visitId: 'visit-1',
          rating: 5,
          comment: 'Amazing escape room!',
          images: ['photo1.jpg', 'photo2.jpg']
        };

        const newReview = await dataService.createReview(reviewData);

        expect(newReview).toMatchObject(reviewData);
        expect(newReview.id).toBeDefined();
        expect(newReview.createdAt).toBeDefined();
        expect(newReview.updatedAt).toBeDefined();
      });

      it('should throw error when visit not found', async () => {
        mockStorageService.get.mockResolvedValue([]);

        const reviewData = {
          visitId: 'non-existent',
          rating: 5,
          comment: 'Great!',
          images: []
        };

        await expect(dataService.createReview(reviewData)).rejects.toThrow('Failed to create review');
      });
    });

    describe('updateReview', () => {
      it('should update an existing review', async () => {
        mockStorageService.get.mockResolvedValue([mockVisitWithReview]);
        mockStorageService.set.mockResolvedValue(undefined);

        const updates = { rating: 5, comment: 'Updated comment' };
        const updatedReview = await dataService.updateReview('review-1', updates);

        expect(updatedReview.rating).toBe(5);
        expect(updatedReview.comment).toBe('Updated comment');
        expect(updatedReview.updatedAt).not.toEqual(mockReview.updatedAt);
      });

      it('should throw error when review not found', async () => {
        mockStorageService.get.mockResolvedValue([mockVisitWithReview]);

        await expect(dataService.updateReview('non-existent', {})).rejects.toThrow('Failed to update review');
      });
    });

    describe('deleteReview', () => {
      it('should delete an existing review', async () => {
        mockStorageService.get.mockResolvedValue([mockVisitWithReview]);
        mockStorageService.set.mockResolvedValue(undefined);

        await dataService.deleteReview('review-1');

        // Verify the review was removed from the visit
        const expectedVisit = { ...mockVisitWithReview };
        delete expectedVisit.review;
        expect(mockStorageService.set).toHaveBeenCalledWith('visits', [expectedVisit]);
      });
    });
  });

  describe('SavedRoom operations', () => {
    const mockSavedRoom: SavedRoom = {
      id: 'room-1',
      storeName: 'Future Escape',
      themeName: 'Time Travel',
      memo: 'Want to try this one next!',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    };

    describe('getSavedRooms', () => {
      it('should return saved rooms from storage', async () => {
        mockStorageService.get.mockResolvedValue([mockSavedRoom]);

        const savedRooms = await dataService.getSavedRooms();

        expect(savedRooms).toEqual([mockSavedRoom]);
        expect(mockStorageService.get).toHaveBeenCalledWith('savedRooms');
      });

      it('should return empty array when no saved rooms exist', async () => {
        mockStorageService.get.mockResolvedValue(null);

        const savedRooms = await dataService.getSavedRooms();

        expect(savedRooms).toEqual([]);
      });
    });

    describe('createSavedRoom', () => {
      it('should create a new saved room', async () => {
        mockStorageService.get.mockResolvedValue([]);
        mockStorageService.set.mockResolvedValue(undefined);

        const roomData = {
          storeName: 'New Escape Venue',
          themeName: 'Pirate Adventure',
          memo: 'Heard great things about this one',
          priority: 'medium' as const
        };

        const newRoom = await dataService.createSavedRoom(roomData);

        expect(newRoom).toMatchObject(roomData);
        expect(newRoom.id).toBeDefined();
        expect(newRoom.createdAt).toBeDefined();
        expect(newRoom.updatedAt).toBeDefined();
        expect(mockStorageService.set).toHaveBeenCalledWith('savedRooms', [newRoom]);
      });
    });

    describe('updateSavedRoom', () => {
      it('should update an existing saved room', async () => {
        mockStorageService.get.mockResolvedValue([mockSavedRoom]);
        mockStorageService.set.mockResolvedValue(undefined);

        const updates = { priority: 'low' as const, memo: 'Updated memo' };
        const updatedRoom = await dataService.updateSavedRoom('room-1', updates);

        expect(updatedRoom.priority).toBe('low');
        expect(updatedRoom.memo).toBe('Updated memo');
        expect(updatedRoom.updatedAt).not.toEqual(mockSavedRoom.updatedAt);
      });

      it('should throw error when saved room not found', async () => {
        mockStorageService.get.mockResolvedValue([mockSavedRoom]);

        await expect(dataService.updateSavedRoom('non-existent', {})).rejects.toThrow('Failed to update saved room');
      });
    });

    describe('deleteSavedRoom', () => {
      it('should delete an existing saved room', async () => {
        mockStorageService.get.mockResolvedValue([mockSavedRoom]);
        mockStorageService.set.mockResolvedValue(undefined);

        await dataService.deleteSavedRoom('room-1');

        expect(mockStorageService.set).toHaveBeenCalledWith('savedRooms', []);
      });

      it('should throw error when saved room not found', async () => {
        mockStorageService.get.mockResolvedValue([mockSavedRoom]);

        await expect(dataService.deleteSavedRoom('non-existent')).rejects.toThrow('Failed to delete saved room');
      });
    });
  });
});