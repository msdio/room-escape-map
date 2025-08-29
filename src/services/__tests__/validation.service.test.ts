/**
 * Unit tests for ValidationService
 */

import { describe, it, expect } from 'vitest';
import { ValidationService } from '../validation.service';
import { Visit, Review, SavedRoom } from '../../types';

describe('ValidationService', () => {
  describe('validateVisit', () => {
    it('should validate a correct visit', () => {
      const visit: Partial<Visit> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        visitDate: new Date('2024-01-15'),
        cleared: true
      };

      const result = ValidationService.validateVisit(visit);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject visit with missing store name', () => {
      const visit: Partial<Visit> = {
        themeName: 'The Haunted Mansion',
        visitDate: new Date('2024-01-15'),
        cleared: true
      };

      const result = ValidationService.validateVisit(visit);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'storeName',
        message: 'Store name is required'
      });
    });

    it('should reject visit with empty store name', () => {
      const visit: Partial<Visit> = {
        storeName: '   ',
        themeName: 'The Haunted Mansion',
        visitDate: new Date('2024-01-15'),
        cleared: true
      };

      const result = ValidationService.validateVisit(visit);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'storeName',
        message: 'Store name is required'
      });
    });

    it('should reject visit with future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const visit: Partial<Visit> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        visitDate: futureDate,
        cleared: true
      };

      const result = ValidationService.validateVisit(visit);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'visitDate',
        message: 'Visit date cannot be in the future'
      });
    });

    it('should reject visit with missing completion status', () => {
      const visit: Partial<Visit> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        visitDate: new Date('2024-01-15')
      };

      const result = ValidationService.validateVisit(visit);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'cleared',
        message: 'Completion status is required'
      });
    });
  });

  describe('validateReview', () => {
    it('should validate a correct review', () => {
      const review: Partial<Review> = {
        visitId: 'visit-123',
        rating: 4,
        comment: 'Great escape room with challenging puzzles!',
        images: ['image1.jpg', 'image2.png']
      };

      const result = ValidationService.validateReview(review);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject review with invalid rating', () => {
      const review: Partial<Review> = {
        visitId: 'visit-123',
        rating: 6,
        comment: 'Great escape room!',
        images: []
      };

      const result = ValidationService.validateReview(review);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'rating',
        message: 'Rating must be between 1 and 5'
      });
    });

    it('should reject review with non-integer rating', () => {
      const review: Partial<Review> = {
        visitId: 'visit-123',
        rating: 3.5,
        comment: 'Great escape room!',
        images: []
      };

      const result = ValidationService.validateReview(review);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'rating',
        message: 'Rating must be a whole number'
      });
    });

    it('should reject review with too many images', () => {
      const review: Partial<Review> = {
        visitId: 'visit-123',
        rating: 4,
        comment: 'Great escape room!',
        images: Array(11).fill('image.jpg')
      };

      const result = ValidationService.validateReview(review);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'images',
        message: 'Maximum 10 images allowed per review'
      });
    });

    it('should reject review with empty comment', () => {
      const review: Partial<Review> = {
        visitId: 'visit-123',
        rating: 4,
        comment: '   ',
        images: []
      };

      const result = ValidationService.validateReview(review);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'comment',
        message: 'Comment is required'
      });
    });
  });

  describe('validateSavedRoom', () => {
    it('should validate a correct saved room', () => {
      const savedRoom: Partial<SavedRoom> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        memo: 'Looks really spooky and challenging!',
        priority: 'high'
      };

      const result = ValidationService.validateSavedRoom(savedRoom);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject saved room with invalid priority', () => {
      const savedRoom: Partial<SavedRoom> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        memo: 'Looks interesting!',
        priority: 'urgent' as any
      };

      const result = ValidationService.validateSavedRoom(savedRoom);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'priority',
        message: 'Priority must be low, medium, or high'
      });
    });

    it('should reject saved room with missing memo', () => {
      const savedRoom: Partial<SavedRoom> = {
        storeName: 'Escape Room Central',
        themeName: 'The Haunted Mansion',
        priority: 'medium'
      };

      const result = ValidationService.validateSavedRoom(savedRoom);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'memo',
        message: 'Memo is required'
      });
    });
  });

  describe('utility methods', () => {
    it('should sanitize strings correctly', () => {
      expect(ValidationService.sanitizeString('  hello   world  ')).toBe('hello world');
      expect(ValidationService.sanitizeString('test\n\nstring')).toBe('test string');
    });

    it('should validate image paths correctly', () => {
      expect(ValidationService.isValidImagePath('image.jpg')).toBe(true);
      expect(ValidationService.isValidImagePath('image.PNG')).toBe(true);
      expect(ValidationService.isValidImagePath('image.gif')).toBe(true);
      expect(ValidationService.isValidImagePath('image.txt')).toBe(false);
      expect(ValidationService.isValidImagePath('image')).toBe(false);
    });

    it('should validate array of image paths', () => {
      const validPaths = ['image1.jpg', 'image2.png'];
      const invalidPaths = ['image1.jpg', 'document.txt'];

      const validResult = ValidationService.validateImagePaths(validPaths);
      const invalidResult = ValidationService.validateImagePaths(invalidPaths);

      expect(validResult.isValid).toBe(true);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toHaveLength(1);
    });
  });
});