/**
 * Unit tests for CapacitorStorageService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CapacitorStorageService } from '../storage.service';

// Mock Capacitor Preferences
vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn()
  }
}));

import { Preferences } from '@capacitor/preferences';

describe('CapacitorStorageService', () => {
  let storageService: CapacitorStorageService;

  beforeEach(() => {
    storageService = new CapacitorStorageService();
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should return parsed JSON data when key exists', async () => {
      const testData = { id: '1', name: 'Test' };
      vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(testData) });

      const result = await storageService.get('test-key');

      expect(result).toEqual(testData);
      expect(Preferences.get).toHaveBeenCalledWith({ key: 'test-key' });
    });

    it('should return null when key does not exist', async () => {
      vi.mocked(Preferences.get).mockResolvedValue({ value: null });

      const result = await storageService.get('non-existent-key');

      expect(result).toBeNull();
    });

    it('should throw error when get operation fails', async () => {
      vi.mocked(Preferences.get).mockRejectedValue(new Error('Storage error'));

      await expect(storageService.get('test-key')).rejects.toThrow('Failed to retrieve data for key: test-key');
    });
  });

  describe('set', () => {
    it('should store JSON stringified data', async () => {
      const testData = { id: '1', name: 'Test' };
      vi.mocked(Preferences.set).mockResolvedValue(undefined);

      await storageService.set('test-key', testData);

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'test-key',
        value: JSON.stringify(testData)
      });
    });

    it('should throw error when set operation fails', async () => {
      vi.mocked(Preferences.set).mockRejectedValue(new Error('Storage error'));

      await expect(storageService.set('test-key', { data: 'test' })).rejects.toThrow('Failed to store data for key: test-key');
    });
  });

  describe('remove', () => {
    it('should remove key from storage', async () => {
      vi.mocked(Preferences.remove).mockResolvedValue(undefined);

      await storageService.remove('test-key');

      expect(Preferences.remove).toHaveBeenCalledWith({ key: 'test-key' });
    });

    it('should throw error when remove operation fails', async () => {
      vi.mocked(Preferences.remove).mockRejectedValue(new Error('Storage error'));

      await expect(storageService.remove('test-key')).rejects.toThrow('Failed to remove data for key: test-key');
    });
  });

  describe('clear', () => {
    it('should clear all storage', async () => {
      vi.mocked(Preferences.clear).mockResolvedValue(undefined);

      await storageService.clear();

      expect(Preferences.clear).toHaveBeenCalled();
    });

    it('should throw error when clear operation fails', async () => {
      vi.mocked(Preferences.clear).mockRejectedValue(new Error('Storage error'));

      await expect(storageService.clear()).rejects.toThrow('Failed to clear storage');
    });
  });
});