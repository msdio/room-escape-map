/**
 * Data validation utilities for escape room tracker
 */

import { Visit, Review, SavedRoom } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class ValidationService {
  static validateVisit(visit: Partial<Visit>): ValidationResult {
    const errors: ValidationError[] = [];

    if (!visit.storeName || visit.storeName.trim().length === 0) {
      errors.push({ field: 'storeName', message: 'Store name is required' });
    } else if (visit.storeName.trim().length > 100) {
      errors.push({ field: 'storeName', message: 'Store name must be less than 100 characters' });
    }

    if (!visit.themeName || visit.themeName.trim().length === 0) {
      errors.push({ field: 'themeName', message: 'Theme name is required' });
    } else if (visit.themeName.trim().length > 100) {
      errors.push({ field: 'themeName', message: 'Theme name must be less than 100 characters' });
    }

    if (!visit.visitDate) {
      errors.push({ field: 'visitDate', message: 'Visit date is required' });
    } else if (visit.visitDate > new Date()) {
      errors.push({ field: 'visitDate', message: 'Visit date cannot be in the future' });
    }

    if (visit.cleared === null) {
      errors.push({ field: 'cleared', message: 'Completion status is required' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateReview(review: Partial<Review>): ValidationResult {
    const errors: ValidationError[] = [];

    if (!review.visitId || review.visitId.trim().length === 0) {
      errors.push({ field: 'visitId', message: 'Visit ID is required' });
    }

    if (!review.rating) {
      errors.push({ field: 'rating', message: 'Rating is required' });
    } else if (review.rating < 1 || review.rating > 5) {
      errors.push({ field: 'rating', message: 'Rating must be between 1 and 5' });
    } else if (!Number.isInteger(review.rating)) {
      errors.push({ field: 'rating', message: 'Rating must be a whole number' });
    }

    if (!review.comment || review.comment.trim().length === 0) {
      errors.push({ field: 'comment', message: 'Comment is required' });
    } else if (review.comment.trim().length > 2000) {
      errors.push({ field: 'comment', message: 'Comment must be less than 2000 characters' });
    }

    if (review.images && review.images.length > 10) {
      errors.push({ field: 'images', message: 'Maximum 10 images allowed per review' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateSavedRoom(savedRoom: Partial<SavedRoom>): ValidationResult {
    const errors: ValidationError[] = [];

    if (!savedRoom.storeName || savedRoom.storeName.trim().length === 0) {
      errors.push({ field: 'storeName', message: 'Store name is required' });
    } else if (savedRoom.storeName.trim().length > 100) {
      errors.push({ field: 'storeName', message: 'Store name must be less than 100 characters' });
    }

    if (!savedRoom.themeName || savedRoom.themeName.trim().length === 0) {
      errors.push({ field: 'themeName', message: 'Theme name is required' });
    } else if (savedRoom.themeName.trim().length > 100) {
      errors.push({ field: 'themeName', message: 'Theme name must be less than 100 characters' });
    }

    if (!savedRoom.memo || savedRoom.memo.trim().length === 0) {
      errors.push({ field: 'memo', message: 'Memo is required' });
    } else if (savedRoom.memo.trim().length > 1000) {
      errors.push({ field: 'memo', message: 'Memo must be less than 1000 characters' });
    }

    if (!savedRoom.priority || !['low', 'medium', 'high'].includes(savedRoom.priority)) {
      errors.push({ field: 'priority', message: 'Priority must be low, medium, or high' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizeString(input: string): string {
    return input.trim().replace(/\s+/g, ' ');
  }

  static isValidImagePath(path: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
  }

  static validateImagePaths(paths: string[]): ValidationResult {
    const errors: ValidationError[] = [];

    paths.forEach((path, index) => {
      if (!this.isValidImagePath(path)) {
        errors.push({ 
          field: `images[${index}]`, 
          message: 'Invalid image file format. Supported formats: jpg, jpeg, png, gif, webp' 
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}