/**
 * Image service implementation using Capacitor Filesystem API
 */

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ImageService } from '../types';

export class CapacitorImageService implements ImageService {
  private readonly imageDirectory = 'escape-room-tracker/images';

  constructor() {
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await Filesystem.mkdir({
        path: this.imageDirectory,
        directory: Directory.Documents,
        recursive: true
      });
    } catch (error) {
      // Directory might already exist, which is fine
      console.log('Image directory already exists or created');
    }
  }

  async saveImage(imageData: string): Promise<string> {
    try {
      const timestamp = Date.now();
      const uuid = this.generateUUID();
      const fileName = `${timestamp}_${uuid}.jpg`;
      const filePath = `${this.imageDirectory}/${fileName}`;

      // Remove data URL prefix if present
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');

      await Filesystem.writeFile({
        path: filePath,
        data: base64Data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      return filePath;
    } catch (error) {
      console.error('Error saving image:', error);
      throw new Error('Failed to save image');
    }
  }

  async getImage(path: string): Promise<string> {
    try {
      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      // Return as data URL for display
      return `data:image/jpeg;base64,${result.data}`;
    } catch (error) {
      console.error(`Error reading image at path ${path}:`, error);
      throw new Error(`Failed to read image: ${path}`);
    }
  }

  async deleteImage(path: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path,
        directory: Directory.Documents
      });
    } catch (error) {
      console.error(`Error deleting image at path ${path}:`, error);
      throw new Error(`Failed to delete image: ${path}`);
    }
  }

  async generateThumbnail(imagePath: string): Promise<string> {
    try {
      // For now, return the original image path
      // In a full implementation, you would resize the image
      const originalImage = await this.getImage(imagePath);
      
      // Generate thumbnail filename
      const thumbnailPath = imagePath.replace('.jpg', '_thumb.jpg');
      
      // For simplicity, we'll just save a copy as thumbnail
      // In production, you'd want to actually resize the image
      const base64Data = originalImage.replace(/^data:image\/[a-z]+;base64,/, '');
      
      await Filesystem.writeFile({
        path: thumbnailPath,
        data: base64Data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      return thumbnailPath;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      throw new Error('Failed to generate thumbnail');
    }
  }

  async compressImage(imageData: string, quality: number = 0.8): Promise<string> {
    try {
      // For now, return the original image data
      // In a full implementation, you would use a compression library
      // or native compression capabilities
      return imageData;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Failed to compress image');
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}