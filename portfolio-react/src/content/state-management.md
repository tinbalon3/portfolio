# State Management

Zustand and React Context patterns for React applications.

---

## Zustand

Minimal, fast state management with hooks-based API.

### Installation

```bash
npm install zustand
```

### Basic Store

```typescript
// shared/store/counter-store.ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Usage
const Counter: React.FC = () => {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};
```

### Async Actions

```typescript
// features/auth/model/auth-store.ts
import { create } from 'zustand';
import { authApi } from '../api/authApi';
import type { User, LoginCredentials } from './types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authApi.login(credentials);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Invalid credentials', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
```

### Selectors (Performance)

```typescript
// Select specific state to avoid unnecessary re-renders
const user = useAuthStore((state) => state.user);
const isLoading = useAuthStore((state) => state.isLoading);

// Multiple selectors
const { user, isLoading } = useAuthStore((state) => ({
  user: state.user,
  isLoading: state.isLoading,
}));

// Shallow comparison for objects
import { shallow } from 'zustand/shallow';

const { user, isLoading } = useAuthStore(
  (state) => ({ user: state.user, isLoading: state.isLoading }),
  shallow
);
```

### Computed Values

```typescript
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  // Computed-like getters
  get totalItems(): number;
  get totalPrice(): number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  // Computed using get()
  get totalItems() {
    return get().items.length;
  },

  get totalPrice() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));

// Usage
const totalPrice = useCartStore((state) => state.totalPrice);
```

### Persist Middleware

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'settings-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme, language: state.language }),
    }
  )
);
```

### Slices Pattern

```typescript
// shared/store/slices/user-slice.ts
import type { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

// shared/store/slices/settings-slice.ts
export interface SettingsSlice {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
});

// shared/store/index.ts
import { create } from 'zustand';
import { createUserSlice, UserSlice } from './slices/user-slice';
import { createSettingsSlice, SettingsSlice } from './slices/settings-slice';

type AppStore = UserSlice & SettingsSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUserSlice(...args),
  ...createSettingsSlice(...args),
}));
```

### DevTools

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create<State>()(
  devtools(
    (set) => ({
      // ... state and actions
    }),
    { name: 'AppStore' }
  )
);
```

---

## React Context

Built-in React feature for sharing state without prop drilling.

### Basic Context

```tsx
// features/theme/context/theme-context.tsx
import { createContext, useContext, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Context with Reducer

```tsx
// features/cart/context/cart-context.tsx
import { createContext, useContext, useReducer, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};

interface CartContextValue extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### Provider Composition

```tsx
// app/providers/index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/features/theme';
import { AuthProvider } from '@/features/auth';
import { CartProvider } from '@/features/cart';

const queryClient = new QueryClient();

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
```

---

## When to Use Each

### Zustand
- Global state needed across many components
- Complex state logic with many actions
- Need persistence (localStorage)
- Performance-critical applications
- State shared between features

### React Context
- Theme/locale settings
- Auth state (user, permissions)
- Feature-specific shared state
- Simple state without complex actions
- Avoiding prop drilling in component tree

### TanStack Query
- Server state (API data)
- Caching and synchronization
- Background refetching
- Optimistic updates

### useState
- Local component state
- Form inputs
- UI toggles (modals, dropdowns)
- Temporary state

---

## FSD Organization

```
src/
├── shared/
│   └── store/
│       ├── index.ts           # Combined store (if using slices)
│       └── slices/
│           ├── user-slice.ts
│           └── settings-slice.ts
├── features/
│   ├── auth/
│   │   └── model/
│   │       └── auth-store.ts  # Feature-specific Zustand store
│   └── cart/
│       └── context/
│           └── cart-context.tsx  # Feature-specific Context
└── app/
    └── providers/
        └── index.tsx          # All providers composed
```

---

## State Management Checklist

- [ ] Identify state type (server, global client, local)
- [ ] Choose appropriate solution
- [ ] Implement with TypeScript
- [ ] Add selectors for performance
- [ ] Set up persistence if needed
- [ ] Configure DevTools for debugging
- [ ] Document state shape and actions

