/**
 * Unit tests for CapacitorImageService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CapacitorImageService } from '../image.service';

// Mock Capacitor Filesystem
vi.mock('@capacitor/filesystem', () => ({
  Filesystem: {
    mkdir: vi.fn(),
    writeFile: vi.fn(),
    readFile: vi.fn(),
    deleteFile: vi.fn()
  },
  Directory: {
    Documents: 'DOCUMENTS'
  },
  Encoding: {
    UTF8: 'utf8'
  }
}));

import { Filesystem } from '@capacitor/filesystem';

describe('CapacitorImageService', () => {
  let imageService: CapacitorImageService;

  beforeEach(() => {
    imageService = new CapacitorImageService();
    vi.clearAllMocks();
  });

  describe('saveImage', () => {
    it('should save image and return file path', async () => {
      const imageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';
      vi.mocked(Filesystem.writeFile).mockResolvedValue(undefined);

      const filePath = await imageService.saveImage(imageData);

      expect(filePath).toMatch(/escape-room-tracker\/images\/\d+_[a-f0-9-]+\.jpg/);
      expect(Filesystem.writeFile).toHaveBeenCalledWith({
        path: filePath,
        data: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
        directory: 'DOCUMENTS',
        encoding: 'utf8'
      });
    });

    it('should handle image data without data URL prefix', async () => {
      const base64Data = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';
      vi.mocked(Filesystem.writeFile).mockResolvedValue(undefined);

      const filePath = await imageService.saveImage(base64Data);

      expect(Filesystem.writeFile).toHaveBeenCalledWith(
        expect.objectContaining({
          data: base64Data
        })
      );
    });
  });
});