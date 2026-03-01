# Tailwind CSS

Utility-first CSS framework patterns for React applications.

---

## cn() Utility Function

The `cn()` function merges Tailwind classes and handles conditional classes:

```typescript
// shared/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:**

```tsx
import { cn } from '@/shared/lib/utils';

// Basic usage
<div className={cn('p-4 bg-white', className)} />

// Conditional classes
<button
  className={cn(
    'px-4 py-2 rounded-md font-medium',
    isActive && 'bg-primary text-white',
    isDisabled && 'opacity-50 cursor-not-allowed',
    variant === 'outline' && 'border border-gray-300 bg-transparent',
  )}
/>

// With props
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'md', className }) => (
  <button
    className={cn(
      'rounded-md font-medium transition-colors',
      // Variants
      variant === 'default' && 'bg-primary text-white hover:bg-primary/90',
      variant === 'outline' && 'border border-input bg-background hover:bg-accent',
      variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
      // Sizes
      size === 'sm' && 'h-8 px-3 text-sm',
      size === 'md' && 'h-10 px-4',
      size === 'lg' && 'h-12 px-6 text-lg',
      className,
    )}
  />
);
```

---

## Class Variance Authority (cva)

For complex component variants, use `cva`:

```typescript
// shared/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => (
  <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
);
```

---

## Responsive Design

```tsx
// Mobile-first breakpoints
<div className="
  p-2          // Mobile (default)
  sm:p-4       // >= 640px
  md:p-6       // >= 768px
  lg:p-8       // >= 1024px
  xl:p-10      // >= 1280px
  2xl:p-12     // >= 1536px
">

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4">

// Hide/show at breakpoints
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
```

---

## Common Patterns

### Flexbox Layout

```tsx
// Center content
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Column layout
<div className="flex flex-col gap-4">

// Wrap
<div className="flex flex-wrap gap-2">
```

### Grid Layout

```tsx
// Basic grid
<div className="grid grid-cols-3 gap-4">

// Auto-fit responsive grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">

// Named areas (with arbitrary values)
<div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr_auto]">
```

### Spacing

```tsx
// Padding
<div className="p-4">        // all sides
<div className="px-4 py-2">  // horizontal, vertical
<div className="pt-4 pb-2">  // top, bottom

// Margin
<div className="m-4">
<div className="mx-auto">    // center horizontally
<div className="mt-4 mb-2">

// Gap (in flex/grid)
<div className="gap-4">
<div className="gap-x-4 gap-y-2">

// Space between children (alternative to gap)
<div className="space-y-4">  // vertical space
<div className="space-x-4">  // horizontal space
```

### Typography

```tsx
// Font size
<p className="text-sm">      // 14px
<p className="text-base">    // 16px
<p className="text-lg">      // 18px
<p className="text-xl">      // 20px
<p className="text-2xl">     // 24px

// Font weight
<p className="font-normal">  // 400
<p className="font-medium">  // 500
<p className="font-semibold"> // 600
<p className="font-bold">    // 700

// Text color
<p className="text-gray-500">
<p className="text-primary">
<p className="text-muted-foreground">

// Text alignment
<p className="text-left">
<p className="text-center">
<p className="text-right">

// Truncate
<p className="truncate">     // single line with ellipsis
<p className="line-clamp-2"> // 2 lines with ellipsis
```

### Colors (shadcn/ui convention)

```tsx
// Background
<div className="bg-background">       // main background
<div className="bg-card">             // card background
<div className="bg-muted">            // muted background
<div className="bg-primary">          // primary color
<div className="bg-secondary">        // secondary color
<div className="bg-destructive">      // error/danger

// Text
<p className="text-foreground">       // main text
<p className="text-muted-foreground"> // secondary text
<p className="text-primary">          // primary color text

// Border
<div className="border border-border">
<div className="border border-input">
```

---

## Dark Mode

```tsx
// Automatic with class strategy
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-gray-100">

// Using CSS variables (shadcn/ui approach)
<div className="bg-background text-foreground">
// Variables switch automatically in dark mode
```

**tailwind.config.js:**

```js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
};
```

---

## Animations

```tsx
// Built-in transitions
<button className="transition-colors duration-200 hover:bg-primary">

// Transform
<div className="transition-transform hover:scale-105">

// Multiple properties
<div className="transition-all duration-300 ease-in-out">

// Animate utilities
<div className="animate-spin">       // spinner
<div className="animate-pulse">      // loading skeleton
<div className="animate-bounce">     // attention
<div className="animate-ping">       // notification dot
```

---

## Custom Configuration

**tailwind.config.js:**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

---

## Best Practices

### DO

```tsx
// ✅ Use cn() for conditional classes
<div className={cn('base-classes', condition && 'conditional-class')}>

// ✅ Extract repeated patterns to components
const Card = ({ className, ...props }) => (
  <div className={cn('rounded-lg border bg-card p-4', className)} {...props} />
);

// ✅ Use semantic color names
<div className="bg-primary text-primary-foreground">

// ✅ Mobile-first responsive
<div className="p-2 md:p-4 lg:p-6">
```

### DON'T

```tsx
// ❌ Don't use inline styles
<div style={{ padding: '16px' }}>

// ❌ Don't concatenate strings without cn()
<div className={`base ${condition ? 'active' : ''}`}>

// ❌ Don't use arbitrary values when utilities exist
<div className="p-[16px]">  // use p-4 instead

// ❌ Don't fight specificity
<div className="!important-class">  // avoid !important
```

---

## Tailwind Checklist

- [ ] cn() utility configured
- [ ] cva() for component variants
- [ ] Mobile-first responsive design
- [ ] Dark mode support
- [ ] CSS variables for theming
- [ ] Prettier plugin for class sorting
- [ ] No inline styles

