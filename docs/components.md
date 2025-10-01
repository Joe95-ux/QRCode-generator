# Component Documentation

This document provides detailed information about all components in the QR Code Generator application.

## 🧩 Core Components

### QRDesignStep

**Location**: `components/QRDesignStep.tsx`

**Purpose**: Handles QR code design customization including size, colors, and error correction settings.

**Props**:
```typescript
interface QRDesignStepProps {
  settings: {
    size: number;
    color: string;
    backgroundColor: string;
    errorCorrection: "L" | "M" | "Q" | "H";
  };
  onSettingsChange: (settings: Partial<QRSettings>) => void;
  qrCodePreview?: string;
}
```

**Features**:
- Size slider (64px - 1024px)
- Color picker for QR code color
- Background color picker
- Error correction level selection
- Real-time preview
- Preset color schemes

**Usage**:
```tsx
<QRDesignStep
  settings={qrSettings}
  onSettingsChange={setQrSettings}
  qrCodePreview={generatedQRCode}
/>
```

### Navbar

**Location**: `components/Navbar.tsx`

**Purpose**: Main navigation component with user authentication and theme toggle.

**Features**:
- Responsive navigation menu
- User authentication status
- Theme mode toggle
- Mobile hamburger menu
- Logo and branding

### Logo

**Location**: `components/Logo.tsx`

**Purpose**: Application logo component with theme support.

**Features**:
- SVG-based logo
- Dark/light mode variants
- Responsive sizing
- Accessibility support

### ThemeModeToggle

**Location**: `components/ThemeModeToggle.tsx`

**Purpose**: Toggle between dark and light themes.

**Features**:
- Smooth theme transitions
- Icon indicators
- Keyboard navigation
- Persistent theme storage

## 🎨 UI Components

### Button

**Location**: `components/ui/button.tsx`

**Purpose**: Reusable button component with multiple variants.

**Variants**:
- `default`: Primary button
- `destructive`: Delete/danger actions
- `outline`: Secondary actions
- `secondary`: Alternative styling
- `ghost`: Minimal styling
- `link`: Link-like appearance

**Sizes**:
- `sm`: Small buttons
- `default`: Standard size
- `lg`: Large buttons
- `icon`: Icon-only buttons

### Card

**Location**: `components/ui/card.tsx`

**Purpose**: Container component for content grouping.

**Components**:
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

### Input

**Location**: `components/ui/input.tsx`

**Purpose**: Form input component with consistent styling.

**Features**:
- Type safety
- Error states
- Disabled states
- Placeholder support
- Focus management

### Badge

**Location**: `components/ui/badge.tsx`

**Purpose**: Small status indicators and labels.

**Variants**:
- `default`: Standard badge
- `secondary`: Alternative styling
- `destructive`: Error/warning states
- `outline`: Bordered style

### Table

**Location**: `components/ui/table.tsx`

**Purpose**: Data table component for displaying structured data.

**Components**:
- `Table`: Main table container
- `TableHeader`: Header row container
- `TableBody`: Body rows container
- `TableRow`: Individual row
- `TableHead`: Header cell
- `TableCell`: Data cell

## 🔧 Form Components

### Label

**Location**: `components/ui/label.tsx`

**Purpose**: Form label component with accessibility support.

**Features**:
- Associated with form controls
- Screen reader support
- Consistent styling
- Required field indicators

### Textarea

**Location**: `components/ui/textarea.tsx`

**Purpose**: Multi-line text input component.

**Features**:
- Resizable (optional)
- Character counting
- Placeholder support
- Error state styling

### Select

**Location**: `components/ui/select.tsx`

**Purpose**: Dropdown selection component.

**Features**:
- Keyboard navigation
- Search functionality
- Multi-select support
- Custom option rendering

## 📊 Data Display Components

### Skeleton

**Location**: `components/ui/skeleton.tsx`

**Purpose**: Loading state placeholder component.

**Usage**:
```tsx
<Skeleton className="h-4 w-32" />
<Skeleton className="h-8 w-8 rounded" />
```

### Progress

**Location**: `components/ui/progress.tsx`

**Purpose**: Progress indicator component.

**Features**:
- Animated progress bar
- Customizable colors
- Accessibility support
- Smooth transitions

## 🎭 Interactive Components

### Dialog

**Location**: `components/ui/dialog.tsx`

**Purpose**: Modal dialog component for overlays.

**Components**:
- `Dialog`: Main container
- `DialogTrigger`: Trigger element
- `DialogContent`: Modal content
- `DialogHeader`: Header section
- `DialogTitle`: Title text
- `DialogDescription`: Description text
- `DialogFooter`: Footer section

### DropdownMenu

**Location**: `components/ui/dropdown-menu.tsx`

**Purpose**: Context menu component for actions.

**Components**:
- `DropdownMenu`: Main container
- `DropdownMenuTrigger`: Trigger button
- `DropdownMenuContent`: Menu content
- `DropdownMenuItem`: Menu items
- `DropdownMenuSeparator`: Visual separators

### Tabs

**Location**: `components/ui/tabs.tsx`

**Purpose**: Tabbed interface component.

**Components**:
- `Tabs`: Main container
- `TabsList`: Tab navigation
- `TabsTrigger`: Individual tab
- `TabsContent`: Tab content

## 🎨 Layout Components

### Separator

**Location**: `components/ui/separator.tsx`

**Purpose**: Visual separator between content sections.

**Orientations**:
- `horizontal`: Left-to-right line
- `vertical`: Top-to-bottom line

### ScrollArea

**Location**: `components/ui/scroll-area.tsx`

**Purpose**: Custom scrollable container.

**Features**:
- Custom scrollbar styling
- Smooth scrolling
- Cross-browser compatibility
- Touch support

## 🔍 Navigation Components

### Breadcrumb

**Location**: `components/ui/breadcrumb.tsx`

**Purpose**: Navigation breadcrumb component.

**Components**:
- `Breadcrumb`: Main container
- `BreadcrumbList`: List container
- `BreadcrumbItem`: Individual item
- `BreadcrumbLink`: Clickable link
- `BreadcrumbSeparator`: Separator between items

### NavigationMenu

**Location**: `components/ui/navigation-menu.tsx`

**Purpose**: Main navigation menu component.

**Features**:
- Responsive design
- Keyboard navigation
- Active state management
- Dropdown support

## 📱 Mobile Components

### Sheet

**Location**: `components/ui/sheet.tsx`

**Purpose**: Slide-out panel component for mobile.

**Components**:
- `Sheet`: Main container
- `SheetTrigger`: Trigger element
- `SheetContent`: Panel content
- `SheetHeader`: Header section
- `SheetTitle`: Title text
- `SheetDescription`: Description text
- `SheetFooter`: Footer section

### Drawer

**Location**: `components/ui/drawer.tsx`

**Purpose**: Mobile drawer component.

**Features**:
- Touch gestures
- Backdrop support
- Accessibility
- Smooth animations

## 🎛️ Form Controls

### Checkbox

**Location**: `components/ui/checkbox.tsx`

**Purpose**: Checkbox input component.

**Features**:
- Indeterminate state
- Custom styling
- Accessibility support
- Form integration

### RadioGroup

**Location**: `components/ui/radio-group.tsx`

**Purpose**: Radio button group component.

**Features**:
- Single selection
- Keyboard navigation
- Custom styling
- Form validation

### Switch

**Location**: `components/ui/switch.tsx`

**Purpose**: Toggle switch component.

**Features**:
- On/off states
- Smooth animations
- Accessibility
- Custom styling

### Slider

**Location**: `components/ui/slider.tsx`

**Purpose**: Range slider component.

**Features**:
- Single or range values
- Custom steps
- Keyboard support
- Visual feedback

## 🎨 Feedback Components

### Alert

**Location**: `components/ui/alert.tsx`

**Purpose**: Alert message component.

**Variants**:
- `default`: Standard alert
- `destructive`: Error messages
- `warning`: Warning messages
- `success`: Success messages

### Toast

**Location**: `components/ui/sonner.tsx`

**Purpose**: Toast notification component.

**Features**:
- Multiple toast support
- Auto-dismiss
- Action buttons
- Custom positioning

## 🔧 Utility Components

### AspectRatio

**Location**: `components/ui/aspect-ratio.tsx`

**Purpose**: Maintain aspect ratio for content.

**Usage**:
```tsx
<AspectRatio ratio={16/9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Resizable

**Location**: `components/ui/resizable.tsx`

**Purpose**: Resizable panel component.

**Features**:
- Drag handles
- Size constraints
- Collapsible panels
- Persistent sizing

## 🎨 Styling Guidelines

### Color System

The application uses a consistent color system:

- **Primary**: Emerald (600, 500, 400)
- **Secondary**: Slate (900, 800, 700, 600, 500, 400, 300, 200, 100, 50)
- **Success**: Green variants
- **Warning**: Yellow/Orange variants
- **Error**: Red variants
- **Info**: Blue variants

### Spacing

Consistent spacing using Tailwind's spacing scale:

- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Typography

- **Headings**: Font weights 600-700
- **Body**: Font weight 400
- **Captions**: Font weight 500
- **Line heights**: 1.2-1.6 depending on size

### Responsive Design

All components are mobile-first:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing Components

### Component Testing

Each component should be tested for:

- **Rendering**: Correct DOM structure
- **Props**: All prop variations
- **Interactions**: Click, hover, focus states
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsive**: Different screen sizes

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 📝 Component Guidelines

### Creating New Components

1. **Location**: Place in appropriate directory
2. **Naming**: Use PascalCase for component names
3. **Props**: Define TypeScript interfaces
4. **Styling**: Use Tailwind classes
5. **Accessibility**: Include ARIA attributes
6. **Documentation**: Add JSDoc comments

### Component Structure

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component = ({ className, children, ...props }: ComponentProps) => {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
};
```

---

*This component documentation is maintained alongside the codebase. For the most up-to-date information, refer to the actual component files.*
