/**
 * Central export file for all services
 */

import { CapacitorStorageService } from './storage.service';
import { CapacitorImageService } from './image.service';
import { EscapeRoomDataService } from './data.service';

export { ValidationService, type ValidationError, type ValidationResult } from './validation.service';
// Create singleton instances for easy use throughout the app
export const storageService = new CapacitorStorageService();
export const imageService = new CapacitorImageService();
export const dataService = new EscapeRoomDataService();