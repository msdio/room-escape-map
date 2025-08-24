# TypeScript Types Documentation

This directory contains all TypeScript interfaces and types for the escape room tracker application.

## File Structure

### `models.ts`
Core data models representing the main entities in the application:
- `EscapeRoom`: Base interface for escape room information
- `Visit`: Extends EscapeRoom with visit-specific data (date, completion status, optional review)
- `Review`: Review data with rating, comments, and images
- `SavedRoom`: Extends EscapeRoom with memo and priority for wishlist functionality

### `services.ts`
Service interfaces defining contracts for data operations:
- `DataService`: CRUD operations for visits, reviews, and saved rooms
- `ImageService`: Image handling operations (save, retrieve, compress, thumbnails)
- `StorageService`: Generic storage operations using Capacitor Preferences API

### `forms.ts`
Form-related types for UI components:
- `VisitFormData`, `ReviewFormData`, `SavedRoomFormData`: Form data types without generated fields
- `FormState<T>`: Generic form state management
- `SearchFilters`: Search and filtering options
- `SortOptions`: Sorting configuration
- `PaginatedResult<T>`: Pagination wrapper for lists

### `api.ts`
API response types and error handling:
- `ApiResponse<T>`: Generic API response wrapper
- `OperationResult<T>`: Simple operation result type
- `ImageUploadResult`: Image upload response data
- `ExportData` / `ImportResult`: Data export/import types
- `AppSettings`: Application configuration
- `ToastMessage`: Toast notification data

### `utils.ts`
Utility types for common patterns:
- `PartialExcept<T, K>`: Make all properties optional except specified ones
- `RequiredExcept<T, K>`: Make all properties required except specified ones
- `BaseComponentProps<T>`: Common component prop types
- `AsyncData<T>`: Async data with loading state
- Various other utility types for type transformations

## Usage Examples

### Creating a new visit
```typescript
import { VisitFormData, Visit } from '@/types';

const formData: VisitFormData = {
  storeName: 'Mystery Rooms',
  themeName: 'Haunted House',
  visitDate: new Date(),
  cleared: true,
};

// Service will add id, createdAt, updatedAt
const visit: Visit = await dataService.createVisit(formData);
```

### Working with reviews
```typescript
import { ReviewFormData, Review } from '@/types';

const reviewData: ReviewFormData = {
  visitId: 'visit-123',
  rating: 5,
  comment: 'Amazing experience!',
  images: ['path/to/image1.jpg', 'path/to/image2.jpg'],
};

const review: Review = await dataService.createReview(reviewData);
```

### Form state management
```typescript
import { FormState, VisitFormData } from '@/types';

const [formState, setFormState] = useState<FormState<VisitFormData>>({
  data: {
    storeName: '',
    themeName: '',
    visitDate: new Date(),
    cleared: false,
  },
  errors: [],
  isSubmitting: false,
  isDirty: false,
  isValid: false,
});
```

## Type Safety Features

- All generated fields (id, createdAt, updatedAt) are excluded from form data types
- Service interfaces enforce proper parameter types
- Utility types provide common patterns for type transformations
- Comprehensive test coverage ensures type safety

## Testing

All types are tested in the `__tests__` directory:
- `models.test.ts`: Tests for core data models
- `services.test.ts`: Tests for service interfaces
- `forms.test.ts`: Tests for form and utility types

Run tests with:
```bash
pnpm run test.unit -- --run src/types/__tests__/
```