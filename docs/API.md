# API Integration Documentation

Complete guide to integrating with the Base44 platform and using the AIaaS APIs.

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Base44 SDK](#base44-sdk)
- [Entity Operations](#entity-operations)
- [LLM Integration](#llm-integration)
- [React Query Integration](#react-query-integration)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Overview

AIaaS integrates with the **Base44 Platform** for backend services. Base44 provides:
- **Entity Management** - CRUD operations for data models
- **LLM Integration** - AI capabilities through language models
- **Authentication** - User authentication and authorization
- **File Storage** - Document and media storage
- **Real-time Updates** - WebSocket support (future)

**Architecture:**
```
React App → Base44 SDK → Base44 Platform → Database/LLM/Storage
```

## Authentication

### Setup

Authentication is handled through the Base44 SDK using tokens.

**Configuration (`src/lib/app-params.js`):**
```javascript
export const appParams = {
  appId: import.meta.env.VITE_BASE44_APP_ID,
  baseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL,
  token: null, // Set dynamically
};
```

**Environment Variables (`.env.local`):**
```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app.base44.app
```

### Authentication Flow

1. **User visits app**
2. **Check for token** in URL params or localStorage
3. **If no token**, redirect to Base44 login
4. **After login**, Base44 redirects back with token
5. **Store token** in localStorage and AuthContext
6. **Include token** in all API requests

**Implementation (`src/lib/AuthContext.jsx`):**
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { appParams } from './app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check URL params for token
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      // Store token
      localStorage.setItem('base44_token', tokenFromUrl);
      setToken(tokenFromUrl);
      appParams.token = tokenFromUrl;

      // Remove token from URL
      window.history.replaceState({}, '', window.location.pathname);
    } else {
      // Check localStorage
      const storedToken = localStorage.getItem('base44_token');
      if (storedToken) {
        setToken(storedToken);
        appParams.token = storedToken;
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('base44_token');
    setToken(null);
    setUser(null);
    appParams.token = null;
  };

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### Protected Routes

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to Base44 login
    const loginUrl = `${appParams.baseUrl}/auth/login?redirect=${window.location.href}`;
    window.location.href = loginUrl;
    return null;
  }

  return children;
};
```

## Base44 SDK

### Initialization

**Setup (`src/api/base44Client.js`):**
```javascript
import { Base44 } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Initialize Base44 client
export const base44 = new Base44({
  appId: appParams.appId,
  baseUrl: appParams.baseUrl,
  token: appParams.token,
});

// Update token dynamically
export const updateToken = (newToken) => {
  appParams.token = newToken;
  base44.setToken(newToken);
};
```

### SDK Structure

```javascript
base44
├── entities          // Data models (CRUD operations)
│   ├── Project
│   ├── Task
│   ├── CustomEntity
│   └── ...
├── integrations      // External integrations
│   └── Core
│       ├── InvokeLLM
│       └── ...
├── auth              // Authentication
├── storage           // File storage
└── settings          // App configuration
```

## Entity Operations

Entities are data models defined in your Base44 app. They provide CRUD operations.

### List Entities

**Fetch all entities:**
```javascript
const projects = await base44.entities.Project.list();
// Returns: Array of project objects
```

**With pagination:**
```javascript
const projects = await base44.entities.Project.list({
  page: 1,
  perPage: 20,
});
```

**With sorting:**
```javascript
const projects = await base44.entities.Project.list({
  sort: { field: 'createdAt', order: 'desc' },
});
```

### Filter Entities

**Filter by conditions:**
```javascript
const activeProjects = await base44.entities.Project.filter({
  where: {
    status: { $eq: 'active' },
    priority: { $in: ['high', 'critical'] },
  },
});
```

**Filter operators:**
- `$eq` - Equals
- `$ne` - Not equals
- `$gt` - Greater than
- `$gte` - Greater than or equal
- `$lt` - Less than
- `$lte` - Less than or equal
- `$in` - In array
- `$nin` - Not in array
- `$contains` - String contains
- `$startsWith` - String starts with
- `$endsWith` - String ends with

**Complex filters:**
```javascript
const projects = await base44.entities.Project.filter({
  where: {
    $and: [
      { status: { $eq: 'active' } },
      {
        $or: [
          { priority: { $eq: 'high' } },
          { dueDate: { $lt: new Date().toISOString() } },
        ],
      },
    ],
  },
  sort: { field: 'updatedAt', order: 'desc' },
  limit: 10,
});
```

### Get Single Entity

**By ID:**
```javascript
const project = await base44.entities.Project.get(projectId);
```

**By unique field:**
```javascript
const project = await base44.entities.Project.findOne({
  where: { slug: 'my-project' },
});
```

### Create Entity

```javascript
const newProject = await base44.entities.Project.create({
  name: 'New Project',
  description: 'Project description',
  status: 'active',
  priority: 'high',
  startDate: new Date().toISOString(),
});
// Returns: Created project object with ID
```

### Update Entity

**Update by ID:**
```javascript
const updatedProject = await base44.entities.Project.update(projectId, {
  status: 'completed',
  completedAt: new Date().toISOString(),
});
```

**Partial update:**
```javascript
// Only updates specified fields
await base44.entities.Project.update(projectId, {
  status: 'in-progress',
});
```

### Delete Entity

```javascript
await base44.entities.Project.delete(projectId);
```

**Soft delete (if supported):**
```javascript
await base44.entities.Project.update(projectId, {
  deleted: true,
  deletedAt: new Date().toISOString(),
});
```

### Batch Operations

**Create multiple:**
```javascript
const tasks = await base44.entities.Task.createMany([
  { name: 'Task 1', projectId: project.id },
  { name: 'Task 2', projectId: project.id },
  { name: 'Task 3', projectId: project.id },
]);
```

**Update multiple:**
```javascript
await base44.entities.Task.updateMany(
  { where: { projectId: project.id } },
  { status: 'completed' }
);
```

**Delete multiple:**
```javascript
await base44.entities.Task.deleteMany({
  where: { projectId: project.id },
});
```

## LLM Integration

Base44 provides LLM integration for AI capabilities.

### Basic Usage

```javascript
const response = await base44.integrations.Core.InvokeLLM({
  prompt: 'Write a blog post about AI implementation in healthcare',
  max_tokens: 2000,
  temperature: 0.7,
});

console.log(response.text);
```

### Structured Output with JSON Schema

**Define schema:**
```javascript
const schema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Blog post title',
    },
    content: {
      type: 'string',
      description: 'Main content of the blog post',
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: 'Relevant tags',
    },
    seoKeywords: {
      type: 'array',
      items: { type: 'string' },
      description: 'SEO keywords',
    },
    estimatedReadTime: {
      type: 'number',
      description: 'Estimated read time in minutes',
    },
  },
  required: ['title', 'content', 'tags'],
};
```

**Make request:**
```javascript
const response = await base44.integrations.Core.InvokeLLM({
  prompt: 'Generate a blog post about AI in healthcare',
  response_json_schema: schema,
});

// Response is automatically parsed JSON
const { title, content, tags, seoKeywords, estimatedReadTime } = response;
```

### Advanced LLM Options

```javascript
const response = await base44.integrations.Core.InvokeLLM({
  prompt: 'Your prompt here',

  // Model selection (if multiple models available)
  model: 'gpt-4',

  // Sampling parameters
  temperature: 0.7,        // 0.0 = deterministic, 1.0 = creative
  max_tokens: 2000,        // Maximum response length
  top_p: 0.9,              // Nucleus sampling
  frequency_penalty: 0.0,  // Penalize repeated tokens
  presence_penalty: 0.0,   // Penalize existing tokens

  // System message
  system: 'You are a helpful AI assistant.',

  // Stop sequences
  stop: ['\n\n', 'END'],

  // Structured output
  response_json_schema: schema,
});
```

### Streaming Responses

**For real-time content generation:**
```javascript
const stream = await base44.integrations.Core.InvokeLLMStream({
  prompt: 'Write a long article about AI',
  max_tokens: 5000,
});

// Process stream
for await (const chunk of stream) {
  console.log(chunk.text);
  // Update UI with partial content
  setContent((prev) => prev + chunk.text);
}
```

### Use Cases

**Content Generation:**
```javascript
const generateBlogPost = async (topic, keywords) => {
  return await base44.integrations.Core.InvokeLLM({
    prompt: `Write a comprehensive blog post about ${topic}. Include these keywords: ${keywords.join(', ')}`,
    response_json_schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        introduction: { type: 'string' },
        sections: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              heading: { type: 'string' },
              content: { type: 'string' },
            },
          },
        },
        conclusion: { type: 'string' },
      },
    },
    temperature: 0.7,
    max_tokens: 3000,
  });
};
```

**SEO Analysis:**
```javascript
const analyzeSEO = async (url, content) => {
  return await base44.integrations.Core.InvokeLLM({
    prompt: `Analyze the SEO of this content and provide recommendations:\n\nURL: ${url}\n\nContent: ${content}`,
    response_json_schema: {
      type: 'object',
      properties: {
        score: { type: 'number', minimum: 0, maximum: 100 },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              severity: { type: 'string', enum: ['high', 'medium', 'low'] },
              description: { type: 'string' },
              recommendation: { type: 'string' },
            },
          },
        },
        keywords: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  });
};
```

**Strategy Recommendations:**
```javascript
const generateStrategy = async (assessment) => {
  return await base44.integrations.Core.InvokeLLM({
    prompt: `Based on this AI readiness assessment, create a detailed implementation strategy:\n\n${JSON.stringify(assessment)}`,
    response_json_schema: {
      type: 'object',
      properties: {
        phases: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              duration: { type: 'string' },
              goals: { type: 'array', items: { type: 'string' } },
              deliverables: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        estimatedCost: { type: 'string' },
        roi: { type: 'string' },
        risks: { type: 'array', items: { type: 'string' } },
      },
    },
  });
};
```

## React Query Integration

React Query provides powerful caching and state management for API calls.

### Query Setup

**Configuration (`src/lib/query-client.js`):**
```javascript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // Data stays fresh for 5 minutes
      cacheTime: 10 * 60 * 1000,     // Cache retained for 10 minutes
      refetchOnWindowFocus: false,    // Don't refetch on window focus
      retry: 1,                       // Retry failed requests once
    },
  },
});
```

### useQuery Hook

**Basic query:**
```javascript
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
  });
};

// Usage in component
const ProjectsList = () => {
  const { data, isLoading, error, refetch } = useProjects();

  if (isLoading) return <Skeleton />;
  if (error) return <Alert>Error: {error.message}</Alert>;

  return (
    <div>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <Button onClick={refetch}>Refresh</Button>
    </div>
  );
};
```

**Query with parameters:**
```javascript
const useProject = (projectId) => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => base44.entities.Project.get(projectId),
    enabled: !!projectId, // Only run if projectId exists
  });
};
```

**Filtered query:**
```javascript
const useActiveProjects = () => {
  return useQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => base44.entities.Project.filter({
      where: { status: { $eq: 'active' } },
    }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
```

### useMutation Hook

**Create mutation:**
```javascript
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { queryClient } from '@/lib/query-client';

const useCreateProject = () => {
  return useMutation({
    mutationFn: (data) => base44.entities.Project.create(data),
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries(['projects']);
    },
    onError: (error) => {
      console.error('Failed to create project:', error);
    },
  });
};

// Usage
const CreateProjectForm = () => {
  const { mutate, isLoading } = useCreateProject();

  const handleSubmit = (formData) => {
    mutate(formData);
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

**Update mutation:**
```javascript
const useUpdateProject = () => {
  return useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: (data, variables) => {
      // Update cache immediately
      queryClient.setQueryData(['projects', variables.id], data);
      // Invalidate list
      queryClient.invalidateQueries(['projects']);
    },
  });
};
```

**Delete mutation:**
```javascript
const useDeleteProject = () => {
  return useMutation({
    mutationFn: (id) => base44.entities.Project.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries(['projects', id]);
      // Invalidate list
      queryClient.invalidateQueries(['projects']);
    },
  });
};
```

### Optimistic Updates

**Update UI before server response:**
```javascript
const useUpdateProjectOptimistic = () => {
  return useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['projects', id]);

      // Snapshot previous value
      const previous = queryClient.getQueryData(['projects', id]);

      // Optimistically update cache
      queryClient.setQueryData(['projects', id], (old) => ({
        ...old,
        ...data,
      }));

      // Return snapshot for rollback
      return { previous, id };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['projects', context.id],
        context.previous
      );
    },
    onSettled: (data, error, variables) => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries(['projects', variables.id]);
    },
  });
};
```

## Error Handling

### API Error Types

```javascript
try {
  const project = await base44.entities.Project.get(id);
} catch (error) {
  if (error.status === 404) {
    // Entity not found
  } else if (error.status === 401) {
    // Unauthorized - redirect to login
  } else if (error.status === 403) {
    // Forbidden - insufficient permissions
  } else if (error.status === 422) {
    // Validation error
    console.log(error.errors); // Field-specific errors
  } else if (error.status >= 500) {
    // Server error
  } else {
    // Network error or other
  }
}
```

### Global Error Handler

```javascript
// src/lib/error-handler.js
export const handleApiError = (error) => {
  if (error.status === 401) {
    // Clear auth and redirect
    localStorage.removeItem('base44_token');
    window.location.href = '/login';
  } else if (error.status === 403) {
    toast.error('You don\'t have permission to perform this action');
  } else if (error.status === 422) {
    // Show validation errors
    Object.entries(error.errors).forEach(([field, messages]) => {
      toast.error(`${field}: ${messages.join(', ')}`);
    });
  } else if (error.status >= 500) {
    toast.error('Server error. Please try again later.');
  } else {
    toast.error(error.message || 'An error occurred');
  }
};
```

### React Query Error Boundary

```javascript
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

const App = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <YourApp />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
```

## Best Practices

### 1. Query Key Structure

Use descriptive, hierarchical query keys:
```javascript
// Good
['projects']                          // All projects
['projects', 'active']                // Filtered projects
['projects', projectId]               // Single project
['projects', projectId, 'tasks']      // Project's tasks

// Avoid
['data']                              // Too generic
['projectsList']                      // Redundant
```

### 2. Caching Strategy

```javascript
// Frequently changing data - short stale time
useQuery({
  queryKey: ['messages'],
  queryFn: fetchMessages,
  staleTime: 30 * 1000, // 30 seconds
});

// Rarely changing data - long stale time
useQuery({
  queryKey: ['settings'],
  queryFn: fetchSettings,
  staleTime: 30 * 60 * 1000, // 30 minutes
});

// Static data - infinite stale time
useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: Infinity,
});
```

### 3. Pagination

```javascript
const useProjectsPaginated = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ['projects', 'paginated', page, perPage],
    queryFn: () => base44.entities.Project.list({ page, perPage }),
    keepPreviousData: true, // Keep showing old data while fetching new
  });
};
```

### 4. Prefetching

```javascript
// Prefetch on hover for faster navigation
const prefetchProject = (projectId) => {
  queryClient.prefetchQuery({
    queryKey: ['projects', projectId],
    queryFn: () => base44.entities.Project.get(projectId),
  });
};

<Link
  to={`/projects/${id}`}
  onMouseEnter={() => prefetchProject(id)}
>
  View Project
</Link>
```

### 5. Request Deduplication

React Query automatically deduplicates identical requests:
```javascript
// Only one API call made, even with multiple components
const Component1 = () => {
  const { data } = useQuery(['projects'], fetchProjects);
  // ...
};

const Component2 = () => {
  const { data } = useQuery(['projects'], fetchProjects);
  // ...
};
```

### 6. Error Retry Logic

```javascript
useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  retry: (failureCount, error) => {
    // Don't retry on 404
    if (error.status === 404) return false;
    // Retry up to 3 times for other errors
    return failureCount < 3;
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

---

For more information:
- [Base44 Documentation](https://docs.base44.com)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Getting Started Guide](GETTING_STARTED.md)
- [Architecture Overview](ARCHITECTURE.md)
