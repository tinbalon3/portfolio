---
title: React Patterns & Best Practices
description: Modern React 18+ patterns with TypeScript, Tailwind CSS, and best practices.
date: '2025-01-29'
categories:
  - React
  - TypeScript
  - Frontend
published: true
---

# React Patterns

Modern React 18+ patterns with TypeScript, Tailwind CSS, and best practices.

---

## React.FC Pattern (ALWAYS USE)

```typescript
import { cn } from '@/shared/lib/utils';

interface MyComponentProps {
  /** User ID to display */
  userId: number;
  /** Optional callback when action occurs */
  onAction?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  userId,
  onAction,
  className,
}) => {
  return (
    <div className={cn('p-4 bg-card rounded-lg', className)}>
      User: {userId}
    </div>
  );
};

export default MyComponent;
```

**Benefits:**
- Explicit return type
- Props are typed
- JSDoc support for intellisense
- Consistent across codebase

---

## Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

// Named export pattern
const HeavyComponent = lazy(() =>
  import('./HeavyComponent').then((module) => ({
    default: module.HeavyComponent
  }))
);

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <HeavyComponent />
  </Suspense>
);
```

---

## Custom Hooks Pattern

Always prefix with `use`.

```typescript
export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);
  
  // Use useCallback to prevent unnecessary re-renders in consumers
  const toggle = useCallback(() => setState((prev) => !prev), []);
  
  return [state, toggle] as const;
};
```

---

## Error Boundary

Using `react-error-boundary`:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```
