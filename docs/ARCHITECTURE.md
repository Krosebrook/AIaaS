# Architecture Overview

This document provides a comprehensive overview of the AIaaS platform architecture, design patterns, and technical decisions.

## Table of Contents
- [High-Level Architecture](#high-level-architecture)
- [Technology Stack](#technology-stack)
- [Application Structure](#application-structure)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Routing & Navigation](#routing--navigation)
- [API Integration](#api-integration)
- [Component Architecture](#component-architecture)
- [Design Patterns](#design-patterns)
- [Performance Optimizations](#performance-optimizations)
- [Security](#security)

## High-Level Architecture

AIaaS follows a modern **Single Page Application (SPA)** architecture with a clear separation between frontend and backend.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
├─────────────────────────────────────────────────────────────┤
│  React Application (Vite)                                    │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  UI Components │  │ State Mgmt   │  │  Routing        │ │
│  │  (Radix UI)    │  │ (React Query)│  │  (React Router) │ │
│  └────────────────┘  └──────────────┘  └─────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Base44 SDK Client                           │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Base44 Platform                           │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Entities     │  │ Integrations │  │   LLM Engine    │ │
│  │   (Database)   │  │  (Core APIs) │  │   (AI Models)   │ │
│  └────────────────┘  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Core
- **React 18.2** - UI library with concurrent features
- **Vite 6.1** - Build tool optimized for speed
- **React Router 6** - Declarative routing
- **JavaScript (ES6+)** - Primary language

### State & Data Management
- **TanStack React Query 5** - Server state management
  - Automatic caching
  - Background refetching
  - Optimistic updates
  - Stale-while-revalidate pattern
- **React Context API** - Global auth state
- **LocalStorage** - Client-side persistence
- **React Hook Form** - Form state management

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Radix UI** - Headless accessible components
- **Framer Motion 11** - Animation library
- **CSS Variables** - Theme customization

### Backend Integration
- **Base44 SDK 0.8** - Backend client library
- **Base44 Vite Plugin 0.2** - Vite integration
- **RESTful APIs** - HTTP communication

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript 5.8** - Type checking (JSDoc)
- **Vite HMR** - Hot module replacement

## Application Structure

### Directory Organization

```
src/
├── api/                      # API client initialization
│   └── base44Client.js       # Base44 SDK setup
│
├── components/               # React components (70+)
│   ├── ui/                  # Generic UI components (50+)
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── dialog.jsx
│   │   └── ...
│   ├── shell/               # Layout components
│   │   ├── AppShell.jsx     # Dashboard layout
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   └── TopBar.jsx       # Header bar
│   ├── onboarding/          # Onboarding flows
│   ├── content/             # Content generation
│   ├── strategy/            # Strategy tools
│   └── ...                  # Feature-specific components
│
├── pages/                   # Page components (27)
│   ├── Home.jsx
│   ├── ContentGenerator.jsx
│   ├── SEODashboard.jsx
│   └── ...
│
├── hooks/                   # Custom React hooks
│   ├── usePersonalization.js
│   ├── useBehaviorAnalytics.js
│   ├── useOnboarding.js
│   └── useMobile.js
│
├── lib/                     # Core utilities
│   ├── AuthContext.jsx      # Authentication context
│   ├── query-client.js      # React Query setup
│   └── app-params.js        # App configuration
│
├── utils/                   # Helper functions
│   └── (various utilities)
│
├── App.jsx                  # Main app component
├── Layout.jsx               # Global layout wrapper
├── main.jsx                 # Entry point
├── pages.config.js          # Route configuration
└── index.css                # Global styles
```

### Layered Architecture

```
┌─────────────────────────────────────────────┐
│          Presentation Layer                  │
│  (Pages, Components, UI)                     │
└───────────────────┬─────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│          Business Logic Layer                │
│  (Hooks, Context, Utilities)                 │
└───────────────────┬─────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│          Data Access Layer                   │
│  (React Query, Base44 SDK, LocalStorage)     │
└───────────────────┬─────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│          Backend (Base44 Platform)           │
│  (APIs, Database, LLM)                       │
└─────────────────────────────────────────────┘
```

## Data Flow

### Request Flow

```
User Interaction
      ↓
Component Event Handler
      ↓
Custom Hook (e.g., usePersonalization)
      ↓
React Query (useMutation/useQuery)
      ↓
Base44 SDK Client
      ↓
HTTP Request → Base44 Platform
      ↓
Response ← Base44 Platform
      ↓
React Query Cache Update
      ↓
Component Re-render
      ↓
UI Update
```

### Example: Content Generation Flow

```javascript
// 1. User submits form
<Button onClick={handleGenerate}>Generate</Button>

// 2. Component calls mutation
const { mutate } = useGenerateContent();
mutate({ prompt, type: 'blog' });

// 3. Custom hook calls Base44
const useGenerateContent = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await base44.integrations.Core.InvokeLLM({
        prompt: data.prompt,
        // ... config
      });
    },
    onSuccess: (result) => {
      // Update cache, show toast, etc.
    }
  });
};

// 4. Base44 SDK makes HTTP request
// 5. Response cached by React Query
// 6. Component receives data and re-renders
```

## State Management

### Multi-Layer State Architecture

1. **Server State (React Query)**
   - API responses
   - Cached data
   - Background refetching
   - Automatic invalidation

2. **Global State (Context API)**
   - Authentication (user, token, registration)
   - App configuration
   - Theme preferences

3. **Local State (useState)**
   - Component-specific state
   - Form inputs
   - UI toggles

4. **Persistent State (LocalStorage)**
   - User preferences
   - Session data
   - Offline data

### State Flow Diagram

```
┌──────────────────┐
│  Server State    │ ◄── React Query ◄── API Calls
│  (React Query)   │
└──────────────────┘
         │
         ├─────────────┐
         │             │
         ▼             ▼
┌──────────────┐  ┌──────────────┐
│ Global State │  │ Local State  │
│  (Context)   │  │  (useState)  │
└──────────────┘  └──────────────┘
         │             │
         └─────┬───────┘
               ▼
       ┌──────────────┐
       │  LocalStorage│
       │  (Persistent)│
       └──────────────┘
```

## Routing & Navigation

### Route Configuration

Routes are defined in `src/pages.config.js` and consumed by `src/App.jsx`:

```javascript
// pages.config.js (auto-generated)
export const pages = [
  { path: '/', component: Home },
  { path: '/content-generator', component: ContentGenerator },
  // ... 27 total routes
];

// App.jsx
<Routes>
  {pages.map(page => (
    <Route
      key={page.path}
      path={page.path}
      element={<page.component />}
    />
  ))}
</Routes>
```

### Layout System

**Dual-mode layout:**
- **Public Layout** - Marketing pages (Home, About, Services)
- **AppShell Layout** - Tool pages (Dashboard, Content Generator)

```javascript
// Layout.jsx
const Layout = () => {
  const location = useLocation();
  const isToolPage = toolPages.includes(location.pathname);

  return isToolPage ? (
    <AppShell>{children}</AppShell>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
};
```

### Navigation Tracking

```javascript
// Tracks page views and navigation
useEffect(() => {
  trackPageView(location.pathname);
}, [location]);
```

## API Integration

### Base44 SDK Architecture

```javascript
// api/base44Client.js
import { Base44 } from '@base44/sdk';
import { appParams } from '../lib/app-params';

export const base44 = new Base44({
  appId: appParams.appId,
  baseUrl: appParams.baseUrl,
  token: appParams.token
});
```

### API Patterns

**Entity Operations (CRUD):**
```javascript
// List entities
const projects = await base44.entities.Project.list();

// Create entity
const project = await base44.entities.Project.create({ name: 'New Project' });

// Update entity
await base44.entities.Project.update(id, { status: 'active' });

// Delete entity
await base44.entities.Project.delete(id);

// Filter entities
const filtered = await base44.entities.CustomEntity.filter({
  where: { status: 'active' }
});
```

**LLM Integration:**
```javascript
// Invoke LLM with structured output
const response = await base44.integrations.Core.InvokeLLM({
  prompt: 'Generate a blog post about AI',
  response_json_schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } }
    }
  }
});
```

### React Query Integration

```javascript
// Query (GET)
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: () => base44.entities.Project.list(),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutation (POST/PUT/DELETE)
const { mutate } = useMutation({
  mutationFn: (data) => base44.entities.Project.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries(['projects']);
  }
});
```

## Component Architecture

### Component Hierarchy

```
App (Router + Providers)
  └── Layout (Header + Footer)
      └── Page Components
          └── Feature Components
              └── UI Components (Radix)
```

### Component Patterns

**1. Compound Components (Radix UI)**
```javascript
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <DialogDescription>Description</DialogDescription>
  </DialogContent>
</Dialog>
```

**2. Render Props**
```javascript
<DataTable
  data={projects}
  render={(row) => <ProjectRow project={row} />}
/>
```

**3. Custom Hooks**
```javascript
const usePersonalization = () => {
  const [profile, setProfile] = useState(getProfile);
  const trackEvent = (event) => { /* ... */ };
  return { profile, trackEvent };
};
```

**4. Higher-Order Components (HOC)**
```javascript
const withAuth = (Component) => {
  return (props) => {
    const { user } = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
};
```

### Component Structure

```javascript
// Typical component structure
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export const MyComponent = ({ id }) => {
  // 1. Hooks
  const [localState, setLocalState] = useState(null);
  const { data, isLoading } = useQuery({...});

  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 3. Event handlers
  const handleClick = () => {
    // Handle event
  };

  // 4. Render logic
  if (isLoading) return <Skeleton />;

  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## Design Patterns

### 1. Provider Pattern
```javascript
// AuthContext provides auth state globally
<AuthProvider>
  <App />
</AuthProvider>
```

### 2. Container/Presentational Pattern
```javascript
// Container (logic)
const ProjectsContainer = () => {
  const { data } = useQuery({...});
  return <ProjectsList projects={data} />;
};

// Presentational (UI)
const ProjectsList = ({ projects }) => {
  return <ul>{projects.map(...)}</ul>;
};
```

### 3. Custom Hooks Pattern
```javascript
// Encapsulate logic in reusable hooks
const useProjects = () => {
  const query = useQuery({...});
  const mutation = useMutation({...});
  return { ...query, createProject: mutation.mutate };
};
```

### 4. Composition Pattern
```javascript
// Compose smaller components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Performance Optimizations

### 1. Code Splitting
```javascript
// Lazy loading pages
const ContentGenerator = lazy(() =>
  import('./pages/ContentGenerator')
);

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/content" element={<ContentGenerator />} />
  </Routes>
</Suspense>
```

### 2. React Query Caching
```javascript
// Automatic caching and deduplication
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 10 * 60 * 1000,     // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

### 3. Memoization
```javascript
// Prevent unnecessary re-renders
const MemoizedComponent = memo(Component);

// Memoize expensive computations
const expensiveValue = useMemo(() =>
  computeExpensiveValue(a, b), [a, b]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 4. Virtual Scrolling
```javascript
// For large lists (using react-window)
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{items[index]}</div>
  )}
</FixedSizeList>
```

### 5. Image Optimization
```javascript
// Lazy loading images
<img loading="lazy" src={url} alt={alt} />
```

## Security

### Authentication Flow

```
1. User visits app
2. App checks for token in URL params or localStorage
3. If no token, redirect to Base44 login
4. After login, Base44 redirects back with token
5. Token stored in localStorage and AuthContext
6. All API calls include token in headers
```

### Security Best Practices

1. **Token Management**
   - Tokens stored in localStorage (XSS risk mitigated by CSP)
   - Tokens included in all API requests
   - Token validation on each request

2. **Input Sanitization**
   - All user inputs validated with Zod schemas
   - HTML sanitization for rich text
   - SQL injection prevented by Base44 SDK

3. **HTTPS Only**
   - All API calls over HTTPS
   - Secure cookies for session management

4. **Content Security Policy (CSP)**
   - Restrict inline scripts
   - Whitelist external resources

5. **CORS Configuration**
   - Base44 platform handles CORS
   - Whitelist allowed origins

### Authorization Patterns

```javascript
// Protected routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Role-based access
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user?.isAdmin) return <Navigate to="/" />;
  return children;
};
```

## Deployment Architecture

### Build Process

```bash
npm run build
```

1. Vite bundles and optimizes code
2. Static assets hashed for cache busting
3. CSS extracted and minified
4. JavaScript minified and tree-shaken
5. Output to `dist/` directory

### Production Deployment

```
Development → GitHub → Base44 Platform → Production
```

1. Push code to GitHub
2. Base44 detects changes
3. Auto-build and deploy
4. CDN distribution

---

For more details on specific topics:
- **Getting Started**: See [GETTING_STARTED.md](GETTING_STARTED.md)
- **Features**: See [FEATURES.md](FEATURES.md)
- **Components**: See [COMPONENTS.md](COMPONENTS.md)
- **API**: See [API.md](API.md)
