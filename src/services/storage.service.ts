/**
 * Storage service implementation using Capacitor Preferences API
 */

import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../types';

export class CapacitorStorageService implements StorageService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const result = await Preferences.get({ key });
      if (result.value === null) {
        return null;
      }
      return JSON.parse(result.value) as T;
    } catch (error) {
      console.error(`Error getting value for key ${key}:`, error);
      throw new Error(`Failed to retrieve data for key: ${key}`);
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(value)
      });
    } catch (error) {
      console.error(`Error setting value for key ${key}:`, error);
      throw new Error(`Failed to store data for key: ${key}`);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error(`Error removing key ${key}:`, error);
      throw new Error(`Failed to remove data for key: ${key}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }
}