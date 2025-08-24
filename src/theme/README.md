# Cozy Design System

This directory contains the cozy design system implementation for the Escape Room Tracker app.

## Files

- `variables.css` - CSS custom properties and design tokens
- `global.css` - Global component styles and utility classes
- `mixins.scss` - SCSS mixins for consistent styling
- `cozy.scss` - Main SCSS entry point for importing mixins
- `__tests__/cozy-design.test.ts` - Tests for design system functionality

## Color Palette

### Primary Colors
- **Primary (Warm Amber)**: `#F59E0B` - Used for main actions and highlights
- **Secondary (Soft Sage Green)**: `#10B981` - Used for success states and secondary actions
- **Tertiary (Gentle Coral)**: `#F87171` - Used for accents and highlights

### Background Colors
- **Main Background**: `#FFFBEB` (Cream white)
- **Card Background**: `#ffffff` (Pure white)
- **Step Colors**: Warm grays from `#F9F7F4` to `#111827`

## Design Tokens

### Spacing
- `--cozy-spacing-xs`: 4px
- `--cozy-spacing-sm`: 8px
- `--cozy-spacing-md`: 16px
- `--cozy-spacing-lg`: 24px
- `--cozy-spacing-xl`: 32px
- `--cozy-spacing-2xl`: 48px

### Border Radius
- `--cozy-border-radius-sm`: 8px
- `--cozy-border-radius-md`: 12px
- `--cozy-border-radius-lg`: 16px
- `--cozy-border-radius-xl`: 20px

### Shadows
- `--cozy-shadow-sm`: Subtle shadow for small elements
- `--cozy-shadow-md`: Medium shadow for cards and buttons
- `--cozy-shadow-lg`: Large shadow for elevated elements
- `--cozy-shadow-xl`: Extra large shadow for modals and overlays

### Transitions
- `--cozy-transition-fast`: 150ms ease-in-out
- `--cozy-transition-normal`: 250ms ease-in-out
- `--cozy-transition-slow`: 350ms ease-in-out

## SCSS Mixins

### Spacing Mixins
```scss
@include cozy-padding('md');
@include cozy-margin('lg');
```

### Styling Mixins
```scss
@include cozy-rounded('lg');
@include cozy-shadow('md');
@include cozy-transition('all', 'normal');
```

### Component Mixins
```scss
@include cozy-card('lg', 'md', 'lg');
@include cozy-button-primary;
@include cozy-input;
```

### Layout Mixins
```scss
@include cozy-container('1200px');
@include cozy-flex-center;
@include cozy-flex-between;
```

### Typography Mixins
```scss
@include cozy-heading('lg');
@include cozy-body('md');
```

## CSS Utility Classes

### Layout
- `.cozy-container` - Responsive container with max-width
- `.cozy-card` - Card styling with hover effects

### Buttons
- `.cozy-button-primary` - Primary button styling

### Form Elements
- `.cozy-input` - Input field styling

### Typography
- `.cozy-heading-xl`, `.cozy-heading-lg`, `.cozy-heading-md`, `.cozy-heading-sm`
- `.cozy-body-lg`, `.cozy-body-md`, `.cozy-body-sm`

### Spacing
- `.cozy-p-{size}` - Padding utilities (xs, sm, md, lg, xl, 2xl)
- `.cozy-m-{size}` - Margin utilities (xs, sm, md, lg, xl, 2xl)

## Usage

### In Components (TypeScript/React)
```tsx
// Variables and global styles are imported in App.tsx

const MyComponent = () => (
  <div className="cozy-container">
    <div className="cozy-card">
      <h2 className="cozy-heading-md">Title</h2>
      <p className="cozy-body-md">Content</p>
      <button className="cozy-button-primary">Action</button>
    </div>
  </div>
);
```

### In SCSS Files
```scss
@import '../theme/cozy.scss';

.my-component {
  @include cozy-card('lg', 'md', 'lg');
  
  .title {
    @include cozy-heading('md');
    @include cozy-margin('sm');
  }
  
  .button {
    @include cozy-button-primary;
  }
}
```

### With Ionic Components
Ionic components are automatically styled with cozy design tokens through CSS variable overrides in `variables.css`. No additional classes needed:

```tsx
<IonCard> {/* Automatically has cozy styling */}
  <IonCardHeader>
    <IonCardTitle>Title</IonCardTitle>
  </IonCardHeader>
  <IonCardContent>
    <IonButton color="primary">Button</IonButton> {/* Cozy primary color */}
  </IonCardContent>
</IonCard>
```

## Responsive Design

The design system includes responsive utilities:
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly minimum sizes (44px for interactive elements)
- Safe area handling for modern devices

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run unit tests
pnpm test.unit

# Run e2e tests
pnpm test.e2e

# Lint code
pnpm lint
```

## Testing

Run tests for the design system:
```bash
pnpm test.unit -- --run src/theme/__tests__/cozy-design.test.ts
```

Or run all tests:
```bash
pnpm test.unit -- --run
```

## Design Principles

1. **Warm and Cozy**: Use warm colors and soft edges
2. **Touch-Friendly**: Minimum 44px touch targets
3. **Consistent Spacing**: Use design tokens for all spacing
4. **Smooth Interactions**: Gentle transitions and hover effects
5. **Accessible**: Proper contrast ratios and focus states
6. **Mobile-First**: Optimized for mobile with tablet/desktop enhancements