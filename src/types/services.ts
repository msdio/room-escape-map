/**
 * Service interfaces for data operations and image handling
 */

import { Visit, Review, SavedRoom } from './models';

export interface DataService {
  // Visit operations
  getVisits(): Promise<Visit[]>;
  createVisit(visit: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Visit>;
  updateVisit(id: string, updates: Partial<Omit<Visit, 'id'>>): Promise<Visit>;
  deleteVisit(id: string): Promise<void>;
  
  // Review operations
  createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review>;
  updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'visitId'>>): Promise<Review>;
  deleteReview(id: string): Promise<void>;
  
  // Saved rooms operations
  getSavedRooms(): Promise<SavedRoom[]>;
  createSavedRoom(room: Omit<SavedRoom, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedRoom>;
  updateSavedRoom(id: string, updates: Partial<Omit<SavedRoom, 'id'>>): Promise<SavedRoom>;
  deleteSavedRoom(id: string): Promise<void>;
}

export interface ImageService {
  // Image operations
  saveImage(imageData: string): Promise<string>;
  getImage(path: string): Promise<string>;
  deleteImage(path: string): Promise<void>;
  generateThumbnail(imagePath: string): Promise<string>;
  compressImage(imageData: string, quality?: number): Promise<string>;
}

export interface StorageService {
  // Generic storage operations
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}