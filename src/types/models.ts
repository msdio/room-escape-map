/**
 * Core data models for the escape room tracker application
 */

export interface EscapeRoom {
  id: string;
  storeName: string;
  themeName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit extends EscapeRoom {
  visitDate: Date;
  cleared: boolean;
  review?: Review;
}

export interface Review {
  id: string;
  visitId: string;
  rating: number; // 1-5 scale
  comment: string;
  images: string[]; // file paths
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedRoom extends EscapeRoom {
  memo: string;
  priority: 'low' | 'medium' | 'high';
}