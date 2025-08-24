/**
 * API response types and error handling
 */

import { Visit, SavedRoom } from './models';

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Operation result types
export interface OperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// Image upload types
export interface ImageUploadResult {
  path: string;
  thumbnailPath?: string;
  originalSize: number;
  compressedSize?: number;
}

// Bulk operation types
export interface BulkOperationResult<T> {
  successful: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
  totalProcessed: number;
}

// Export/Import types
export interface ExportData {
  visits: Visit[];
  savedRooms: SavedRoom[];
  exportDate: Date;
  version: string;
}

export interface ImportResult {
  visitsImported: number;
  savedRoomsImported: number;
  errors: string[];
}

// App state types
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  defaultRating: number;
  imageQuality: 'low' | 'medium' | 'high';
  enableHaptics: boolean;
  autoBackup: boolean;
}

// Toast notification types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}