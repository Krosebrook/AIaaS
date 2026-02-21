# Getting Started with AIaaS

This guide will help you set up and run the AIaaS platform on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js** v18 or higher
- **npm** v9 or higher
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Optional Tools
- **VS Code** (recommended IDE)
- **ESLint extension** for code quality
- **Tailwind CSS IntelliSense** extension

### Verify Installation
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
git --version   # Any recent version
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Krosebrook/AIaaS.git
cd AIaaS
```

### 2. Install Dependencies
```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React and React Router
- Base44 SDK
- Radix UI components
- Tailwind CSS
- And many more...

The installation may take 2-5 minutes depending on your internet connection.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Base44 Configuration (Required)
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

# Example values:
# VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
# VITE_BASE44_APP_BASE_URL=https://your-app-name.base44.app
```

### Getting Your Base44 Credentials

1. Go to [Base44.com](https://base44.com)
2. Log in to your account
3. Navigate to your app settings
4. Copy your App ID and Backend URL
5. Paste them into your `.env.local` file

### Optional Configuration

You can also configure other aspects of the application:

```env
# Optional: Custom API timeouts
VITE_API_TIMEOUT=30000

# Optional: Enable debug mode
VITE_DEBUG_MODE=true
```

## Running the Application

### Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (default Vite port).

You should see output similar to:
```
  VITE v6.1.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Default Routes

- `/` - Home page
- `/services` - Services overview
- `/content-generator` - AI content generation tool
- `/seo-dashboard` - SEO optimization dashboard
- `/ai-readiness` - AI readiness assessment
- `/strategy-wizard` - Strategy generation tool

See [FEATURES.md](FEATURES.md) for a complete list of routes.

## Development Workflow

### Hot Module Replacement (HMR)

Vite provides instant HMR. Any changes you make to the code will be reflected in the browser immediately without a full page reload.

### Code Quality Checks

Before committing code, run:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Type check (TypeScript)
npm run typecheck
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Project Structure Overview

```
AIaaS/
├── src/
│   ├── main.jsx           # Application entry point
│   ├── App.jsx            # Main app component with routing
│   ├── Layout.jsx         # Global layout wrapper
│   ├── api/               # API client setup
│   ├── components/        # Reusable React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── utils/             # Helper functions
├── public/                # Static assets
├── docs/                  # Documentation
└── package.json           # Project dependencies
```

## Understanding the Codebase

### Key Files

- **`src/main.jsx`** - Application entry point, mounts React app
- **`src/App.jsx`** - Main router, authentication provider, query client setup
- **`src/Layout.jsx`** - Global header/footer layout
- **`src/api/base44Client.js`** - Base44 SDK initialization
- **`src/lib/AuthContext.jsx`** - Authentication context and state
- **`src/pages.config.js`** - Auto-generated route configuration

### Component Organization

Components are organized by feature:
- **`components/ui/`** - Generic UI components (buttons, inputs, dialogs)
- **`components/shell/`** - Layout components (sidebar, topbar)
- **`components/onboarding/`** - Onboarding flows
- **`components/content/`** - Content generation tools
- **`components/strategy/`** - Strategy planning tools

### State Management

The app uses multiple state management strategies:
- **React Query** - Server state (API calls, caching)
- **Context API** - Global auth state
- **Local State** - Component-specific state with `useState`
- **LocalStorage** - Client-side persistence

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

1. Ensure `.env.local` is in the root directory
2. Variable names must start with `VITE_`
3. Restart the dev server after changing `.env.local`
4. Check for typos in variable names

### Base44 Connection Issues

1. Verify your App ID and Backend URL are correct
2. Check that you have an active internet connection
3. Ensure your Base44 app is published and running
4. Check Base44 service status at [status.base44.com](https://status.base44.com)

### Build Errors

If you encounter build errors:

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### ESLint Errors

To see all linting issues:

```bash
npm run lint
```

Many issues can be auto-fixed:

```bash
npm run lint:fix
```

## Next Steps

Now that you have the application running:

1. **Explore the Features** - Check out [FEATURES.md](FEATURES.md) for a complete feature guide
2. **Understand the Architecture** - Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
3. **Browse Components** - See [COMPONENTS.md](COMPONENTS.md) for component documentation
4. **Learn the API** - Review [API.md](API.md) for Base44 SDK usage
5. **Start Contributing** - Read [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines

## Getting Help

If you're stuck:
1. Check the [documentation](./README.md)
2. Search [GitHub Issues](https://github.com/Krosebrook/AIaaS/issues)
3. Create a new issue with details about your problem
4. Contact Base44 support at [app.base44.com/support](https://app.base44.com/support)

---

**Happy coding! 🚀**
