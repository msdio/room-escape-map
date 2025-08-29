/**
 * Data service implementation for escape room tracker
 */

import { DataService, Visit, Review, SavedRoom } from '../types';
import { CapacitorStorageService } from './storage.service';

export class EscapeRoomDataService implements DataService {
  private storageService: CapacitorStorageService;
  
  private readonly VISITS_KEY = 'visits';
  private readonly SAVED_ROOMS_KEY = 'savedRooms';

  constructor() {
    this.storageService = new CapacitorStorageService();
  }

  // Visit operations
  async getVisits(): Promise<Visit[]> {
    try {
      const visits = await this.storageService.get<Visit[]>(this.VISITS_KEY);
      return visits || [];
    } catch (error) {
      console.error('Error getting visits:', error);
      throw new Error('Failed to retrieve visits');
    }
  }

  async createVisit(visitData: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Visit> {
    try {
      const visits = await this.getVisits();
      const now = new Date();
      
      const newVisit: Visit = {
        ...visitData,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now
      };

      visits.push(newVisit);
      await this.storageService.set(this.VISITS_KEY, visits);
      
      return newVisit;
    } catch (error) {
      console.error('Error creating visit:', error);
      throw new Error('Failed to create visit');
    }
  }

  async updateVisit(id: string, updates: Partial<Omit<Visit, 'id'>>): Promise<Visit> {
    try {
      const visits = await this.getVisits();
      const visitIndex = visits.findIndex(visit => visit.id === id);
      
      if (visitIndex === -1) {
        throw new Error(`Visit with id ${id} not found`);
      }

      const updatedVisit: Visit = {
        ...visits[visitIndex],
        ...updates,
        updatedAt: new Date()
      };

      visits[visitIndex] = updatedVisit;
      await this.storageService.set(this.VISITS_KEY, visits);
      
      return updatedVisit;
    } catch (error) {
      console.error('Error updating visit:', error);
      throw new Error('Failed to update visit');
    }
  }

  async deleteVisit(id: string): Promise<void> {
    try {
      const visits = await this.getVisits();
      const filteredVisits = visits.filter(visit => visit.id !== id);
      
      if (filteredVisits.length === visits.length) {
        throw new Error(`Visit with id ${id} not found`);
      }

      await this.storageService.set(this.VISITS_KEY, filteredVisits);
    } catch (error) {
      console.error('Error deleting visit:', error);
      throw new Error('Failed to delete visit');
    }
  }

  // Review operations
  async createReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    try {
      const visits = await this.getVisits();
      const visitIndex = visits.findIndex(visit => visit.id === reviewData.visitId);
      
      if (visitIndex === -1) {
        throw new Error(`Visit with id ${reviewData.visitId} not found`);
      }

      const now = new Date();
      const newReview: Review = {
        ...reviewData,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now
      };

      // Add review to the visit
      visits[visitIndex].review = newReview;
      await this.storageService.set(this.VISITS_KEY, visits);
      
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      throw new Error('Failed to create review');
    }
  }

  async updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'visitId'>>): Promise<Review> {
    try {
      const visits = await this.getVisits();
      let reviewFound = false;
      let updatedReview: Review | null = null;

      for (const visit of visits) {
        if (visit.review && visit.review.id === id) {
          updatedReview = {
            ...visit.review,
            ...updates,
            updatedAt: new Date()
          };
          visit.review = updatedReview;
          reviewFound = true;
          break;
        }
      }

      if (!reviewFound || !updatedReview) {
        throw new Error(`Review with id ${id} not found`);
      }

      await this.storageService.set(this.VISITS_KEY, visits);
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw new Error('Failed to update review');
    }
  }

  async deleteReview(id: string): Promise<void> {
    try {
      const visits = await this.getVisits();
      let reviewFound = false;

      for (const visit of visits) {
        if (visit.review && visit.review.id === id) {
          delete visit.review;
          reviewFound = true;
          break;
        }
      }

      if (!reviewFound) {
        throw new Error(`Review with id ${id} not found`);
      }

      await this.storageService.set(this.VISITS_KEY, visits);
    } catch (error) {
      console.error('Error deleting review:', error);
      throw new Error('Failed to delete review');
    }
  }

  // Saved rooms operations
  async getSavedRooms(): Promise<SavedRoom[]> {
    try {
      const savedRooms = await this.storageService.get<SavedRoom[]>(this.SAVED_ROOMS_KEY);
      return savedRooms || [];
    } catch (error) {
      console.error('Error getting saved rooms:', error);
      throw new Error('Failed to retrieve saved rooms');
    }
  }

  async createSavedRoom(roomData: Omit<SavedRoom, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedRoom> {
    try {
      const savedRooms = await this.getSavedRooms();
      const now = new Date();
      
      const newSavedRoom: SavedRoom = {
        ...roomData,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now
      };

      savedRooms.push(newSavedRoom);
      await this.storageService.set(this.SAVED_ROOMS_KEY, savedRooms);
      
      return newSavedRoom;
    } catch (error) {
      console.error('Error creating saved room:', error);
      throw new Error('Failed to create saved room');
    }
  }

  async updateSavedRoom(id: string, updates: Partial<Omit<SavedRoom, 'id'>>): Promise<SavedRoom> {
    try {
      const savedRooms = await this.getSavedRooms();
      const roomIndex = savedRooms.findIndex(room => room.id === id);
      
      if (roomIndex === -1) {
        throw new Error(`Saved room with id ${id} not found`);
      }

      const updatedRoom: SavedRoom = {
        ...savedRooms[roomIndex],
        ...updates,
        updatedAt: new Date()
      };

      savedRooms[roomIndex] = updatedRoom;
      await this.storageService.set(this.SAVED_ROOMS_KEY, savedRooms);
      
      return updatedRoom;
    } catch (error) {
      console.error('Error updating saved room:', error);
      throw new Error('Failed to update saved room');
    }
  }

  async deleteSavedRoom(id: string): Promise<void> {
    try {
      const savedRooms = await this.getSavedRooms();
      const filteredRooms = savedRooms.filter(room => room.id !== id);
      
      if (filteredRooms.length === savedRooms.length) {
        throw new Error(`Saved room with id ${id} not found`);
      }

      await this.storageService.set(this.SAVED_ROOMS_KEY, filteredRooms);
    } catch (error) {
      console.error('Error deleting saved room:', error);
      throw new Error('Failed to delete saved room');
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}