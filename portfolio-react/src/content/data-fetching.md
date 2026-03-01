# Data Fetching

TanStack Query patterns for React applications with Suspense.

---

## PRIMARY PATTERN: useSuspenseQuery

```tsx
import { useSuspenseQuery } from '@tanstack/react-query';
import { postApi } from '../api/postApi';

export const PostDetail: React.FC<{ id: number }> = ({ id }) => {
  // No isLoading check needed - Suspense handles it!
  const { data } = useSuspenseQuery({
    queryKey: ['post', id],
    queryFn: () => postApi.getPost(id),
    staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-muted-foreground">{data.content}</p>
    </div>
  );
};

// Parent wraps with SuspenseLoader
<SuspenseLoader>
  <PostDetail id={123} />
</SuspenseLoader>
```

**Benefits:**
- No loading state management
- No `if (isLoading)` checks
- Cleaner component code
- Suspense boundaries handle loading UI

---

## ⚠️ CRITICAL: No Early Returns for Loading

```tsx
// ❌ NEVER DO THIS - Causes layout shift
export const MyComponent: React.FC = () => {
  const { data, isLoading } = useQuery({...});

  if (isLoading) return <Spinner />; // BAD!

  return <div>{data.name}</div>;
};

// ✅ ALWAYS USE THIS
export const MyComponent: React.FC = () => {
  const { data } = useSuspenseQuery({...});
  return <div>{data.name}</div>;
};

// Parent handles loading
<SuspenseLoader>
  <MyComponent />
</SuspenseLoader>
```

---

## Cache-First Strategy

Reuse cached data from list queries for detail views:

```tsx
// features/posts/model/useSuspensePost.ts
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import type { Post } from '../model/types';

export function useSuspensePost(postId: number) {
  const queryClient = useQueryClient();

  return useSuspenseQuery<Post>({
    queryKey: ['post', postId],
    queryFn: async () => {
      // Check list cache first
      const listCache = queryClient.getQueryData<Post[]>(['posts']);
      if (listCache) {
        const cached = listCache.find((post) => post.id === postId);
        if (cached) return cached; // No API call!
      }

      // Fall back to API
      return postApi.getPost(postId);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
```

---

## Parallel Data Fetching

Fetch multiple queries simultaneously:

```tsx
import { useSuspenseQueries } from '@tanstack/react-query';

export const Dashboard: React.FC = () => {
  const [statsQuery, usersQuery, activityQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['stats'],
        queryFn: () => statsApi.getStats(),
      },
      {
        queryKey: ['users', 'active'],
        queryFn: () => userApi.getActiveUsers(),
      },
      {
        queryKey: ['activity', 'recent'],
        queryFn: () => activityApi.getRecent(),
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard data={statsQuery.data} />
      <UsersCard data={usersQuery.data} />
      <ActivityCard data={activityQuery.data} />
    </div>
  );
};
```

---

## API Service Layer

```tsx
// entities/post/api/postApi.ts
import { apiClient } from '@/shared/api';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../model/types';

export const postApi = {
  // GET single
  getPost: async (id: number): Promise<Post> => {
    const { data } = await apiClient.get(`/posts/${id}`);
    return data;
  },

  // GET list
  getPosts: async (params?: { page?: number; limit?: number }): Promise<Post[]> => {
    const { data } = await apiClient.get('/posts', { params });
    return data;
  },

  // POST
  createPost: async (payload: CreatePostPayload): Promise<Post> => {
    const { data } = await apiClient.post('/posts', payload);
    return data;
  },

  // PUT
  updatePost: async (id: number, payload: UpdatePostPayload): Promise<Post> => {
    const { data } = await apiClient.put(`/posts/${id}`, payload);
    return data;
  },

  // DELETE
  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
```

---

## Mutations with Cache Invalidation

```tsx
// features/posts/model/usePostMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; // or your toast library
import { postApi } from '@/entities/post';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostPayload }) =>
      postApi.updatePost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      toast.success('Post updated successfully');
    },
    onError: () => {
      toast.error('Failed to update post');
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete post');
    },
  });
}
```

---

## Optimistic Updates

```tsx
export function useTogglePostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postApi.toggleStatus(postId),

    // Optimistic update
    onMutate: async (postId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically update
      queryClient.setQueryData<Post[]>(['posts'], (old) =>
        old?.map((post) =>
          post.id === postId ? { ...post, active: !post.active } : post
        ) ?? []
      );

      return { previousPosts };
    },

    // Rollback on error
    onError: (_, __, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
      toast.error('Failed to update status');
    },

    // Refetch after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

---

## Query Key Patterns

```tsx
// Consistent query key structure
export const queryKeys = {
  // Lists
  posts: ['posts'] as const,
  postsByUser: (userId: number) => ['posts', 'user', userId] as const,
  postsByCategory: (category: string) => ['posts', 'category', category] as const,

  // Details
  post: (id: number) => ['post', id] as const,

  // Related
  postComments: (postId: number) => ['post', postId, 'comments'] as const,
};

// Usage
const { data } = useSuspenseQuery({
  queryKey: queryKeys.post(123),
  queryFn: () => postApi.getPost(123),
});

// Invalidation - specific
queryClient.invalidateQueries({ queryKey: queryKeys.post(123) });

// Invalidation - all posts
queryClient.invalidateQueries({ queryKey: queryKeys.posts });
```

---

## Configuration Options

```tsx
const { data } = useSuspenseQuery({
  queryKey: ['posts'],
  queryFn: postApi.getPosts,

  // Cache timing
  staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
  gcTime: 10 * 60 * 1000, // Cache for 10 minutes

  // Refetch behavior
  refetchOnWindowFocus: false, // Don't refetch on tab focus
  refetchOnMount: true, // Refetch when component mounts
  refetchOnReconnect: true, // Refetch on reconnect

  // Retry
  retry: 3, // Retry 3 times
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
});
```

---

## Error Handling

```tsx
// Use Error Boundary for query errors
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

export const PostsSection: React.FC = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallback={
          <div className="p-8 text-center">
            <p className="text-destructive">Failed to load posts</p>
            <Button variant="outline" onClick={reset} className="mt-4">
              Try again
            </Button>
          </div>
        }
      >
        <SuspenseLoader>
          <PostsList />
        </SuspenseLoader>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
```

---

## QueryClient Setup

```tsx
// app/providers/query-provider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

---

## Data Fetching Checklist

- [ ] Use useSuspenseQuery (not useQuery)
- [ ] Wrap components with SuspenseLoader
- [ ] Implement cache-first strategy
- [ ] Set up query key factory
- [ ] Add proper error handling
- [ ] Configure staleTime and gcTime
- [ ] Use mutations for data changes
- [ ] Invalidate related queries on mutation
