---
title: Web Performance Optimization
description: React performance patterns for efficient rendering and optimal user experience.
date: '2025-01-28'
categories:
  - React
  - Performance
  - Optimization
published: true
---

# Performance Optimization

React performance patterns for efficient rendering and optimal user experience.

---

## useMemo - Expensive Computations

Memoize values that are expensive to compute:

```typescript
import { useMemo } from 'react';

export const DataDisplay: React.FC<{ items: Item[]; searchTerm: string }> = ({
  items,
  searchTerm,
}) => {
  // ✅ Memoize filtering and sorting
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm]);

  return (
    <div className="space-y-2">
      {filteredItems.map((item) => (
        <div key={item.id} className="p-2 border rounded">
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

**When to Use:**
- Filtering/sorting arrays
- Complex calculations
- Derived state from props
- Object/array references for child props

---

## React.memo - Component Memoization

Prevent unnecessary re-renders of child components:

```typescript
import { memo } from 'react';

interface Props {
  data: ComplexData;
  onSelect: (id: string) => void;
}

// ✅ Component only re-renders if props change
export const ExpensiveComponent = memo(({ data, onSelect }: Props) => {
  console.log('Rendering ExpensiveComponent');
  return <div onClick={() => onSelect(data.id)}>{data.name}</div>;
});

// Optional comparison function
export const StrictComponent = memo(
  Component,
  (prevProps, nextProps) => prevProps.id === nextProps.id
);
```
