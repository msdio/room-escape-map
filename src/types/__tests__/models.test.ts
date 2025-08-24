/**
 * Tests for core data models to ensure type safety
 */

import { describe, it, expect } from 'vitest';
import { EscapeRoom, Visit, Review, SavedRoom } from '../models';

describe('Core Data Models', () => {
  it('should create a valid EscapeRoom object', () => {
    const escapeRoom: EscapeRoom = {
      id: '1',
      storeName: 'Mystery Rooms',
      themeName: 'Haunted House',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(escapeRoom.id).toBe('1');
    expect(escapeRoom.storeName).toBe('Mystery Rooms');
    expect(escapeRoom.themeName).toBe('Haunted House');
    expect(escapeRoom.createdAt).toBeInstanceOf(Date);
    expect(escapeRoom.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a valid Visit object', () => {
    const visit: Visit = {
      id: '1',
      storeName: 'Mystery Rooms',
      themeName: 'Haunted House',
      visitDate: new Date(),
      cleared: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(visit.visitDate).toBeInstanceOf(Date);
    expect(visit.cleared).toBe(true);
    expect(visit.review).toBeUndefined();
  });

  it('should create a valid Review object', () => {
    const review: Review = {
      id: '1',
      visitId: 'visit-1',
      rating: 5,
      comment: 'Amazing experience!',
      images: ['image1.jpg', 'image2.jpg'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(review.rating).toBe(5);
    expect(review.comment).toBe('Amazing experience!');
    expect(review.images).toHaveLength(2);
    expect(review.images[0]).toBe('image1.jpg');
  });

  it('should create a valid SavedRoom object', () => {
    const savedRoom: SavedRoom = {
      id: '1',
      storeName: 'Mystery Rooms',
      themeName: 'Space Station',
      memo: 'Want to try this with friends',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(savedRoom.memo).toBe('Want to try this with friends');
    expect(savedRoom.priority).toBe('high');
  });

  it('should enforce priority type constraints', () => {
    // This test ensures TypeScript compilation catches invalid priority values
    const validPriorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    
    validPriorities.forEach(priority => {
      const savedRoom: SavedRoom = {
        id: '1',
        storeName: 'Test Store',
        themeName: 'Test Theme',
        memo: 'Test memo',
        priority,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      expect(['low', 'medium', 'high']).toContain(savedRoom.priority);
    });
  });

  it('should allow Visit with optional review', () => {
    const visitWithoutReview: Visit = {
      id: '1',
      storeName: 'Mystery Rooms',
      themeName: 'Haunted House',
      visitDate: new Date(),
      cleared: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const review: Review = {
      id: '1',
      visitId: '1',
      rating: 4,
      comment: 'Good room',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const visitWithReview: Visit = {
      ...visitWithoutReview,
      review,
    };

    expect(visitWithoutReview.review).toBeUndefined();
    expect(visitWithReview.review).toBeDefined();
    expect(visitWithReview.review?.rating).toBe(4);
  });
});