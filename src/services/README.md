# Services Layer

This directory contains the data service layer for the escape room tracker application, providing local storage capabilities using Capacitor APIs.

## Services Overview

### DataService (`data.service.ts`)
Main service for managing escape room data including visits, reviews, and saved rooms.

**Key Features:**
- CRUD operations for visits, reviews, and saved rooms
- Automatic ID generation and timestamp management
- Error handling with descriptive messages
- Data validation integration

**Usage:**
```typescript
import { dataService } from '../services';

// Create a new visit
const visit = await dataService.createVisit({
  storeName: 'Escape Room Central',
  themeName: 'The Haunted Mansion',
  visitDate: new Date(),
  cleared: true
});

// Get all visits
const visits = await dataService.getVisits();
```

### StorageService (`storage.service.ts`)
Generic storage service using Capacitor Preferences API for structured data persistence.

**Key Features:**
- JSON serialization/deserialization
- Error handling for storage operations
- Type-safe get/set operations

### ImageService (`image.service.ts`)
Service for handling image storage using Capacitor Filesystem API.

**Key Features:**
- Image saving with automatic filename generation
- Base64 data handling
- Directory management
- Thumbnail generation (placeholder implementation)

### ValidationService (`validation.service.ts`)
Utility service for data validation with comprehensive error reporting.

**Key Features:**
- Validation for all data models (Visit, Review, SavedRoom)
- Detailed error messages with field-specific feedback
- Input sanitization utilities
- Image path validation

## Installation

The required Capacitor plugins are already installed:
- `@capacitor/preferences` - For structured data storage
- `@capacitor/filesystem` - For image file storage
- `@capacitor/camera` - For photo capture (used by ImageService)

## Testing

All services include comprehensive unit tests located in the `__tests__` directory.

Run tests with:
```bash
pnpm test.unit src/services
```

## Error Handling

All services implement consistent error handling:
- Specific error messages for different failure scenarios
- Graceful degradation when storage is unavailable
- Proper error propagation to calling code

## Data Storage Structure

**Preferences Keys:**
- `visits` - Array of Visit objects
- `savedRooms` - Array of SavedRoom objects

**File System:**
- Images stored in `Documents/escape-room-tracker/images/`
- Filename format: `{timestamp}_{uuid}.jpg`