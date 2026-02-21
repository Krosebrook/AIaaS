# Deployment Guide

Complete guide for deploying the AIaaS platform to production.

## Table of Contents
- [Overview](#overview)
- [Base44 Platform Deployment](#base44-platform-deployment)
- [Build Process](#build-process)
- [Environment Configuration](#environment-configuration)
- [CDN & Hosting](#cdn--hosting)
- [Domain Setup](#domain-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Logging](#monitoring--logging)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

AIaaS uses the **Base44 Platform** for deployment, which provides:
- Automatic builds from GitHub
- CDN distribution
- SSL certificates
- Environment management
- Zero-downtime deployments

**Deployment Flow:**
```
GitHub Push → Base44 Detects Change → Build → Deploy → CDN
```

## Base44 Platform Deployment

### Prerequisites

1. **Base44 Account** - Sign up at [base44.com](https://base44.com)
2. **GitHub Repository** - Code must be in GitHub
3. **Base44 App** - Create an app in Base44 dashboard

### Connect GitHub Repository

1. **Log in to Base44**
   - Go to [app.base44.com](https://app.base44.com)
   - Navigate to your app

2. **Connect GitHub**
   - Go to Settings → Integrations → GitHub
   - Click "Connect GitHub Repository"
   - Authorize Base44 to access your repository
   - Select the `Krosebrook/AIaaS` repository

3. **Configure Branch**
   - Set production branch (usually `main` or `master`)
   - Set staging branch (optional, e.g., `develop`)
   - Enable auto-deploy on push

### Deployment Triggers

**Automatic Deployment:**
- Push to production branch
- Merge pull request to production branch
- GitHub Actions workflow (if configured)

**Manual Deployment:**
- Base44 Dashboard → Click "Deploy"
- Base44 CLI: `base44 deploy`

## Build Process

### Build Configuration

Base44 automatically detects Vite configuration and builds the app.

**Build Steps:**
1. Install dependencies (`npm install`)
2. Run build command (`npm run build`)
3. Optimize assets
4. Upload to CDN
5. Update routing

### Build Settings

**In Base44 Dashboard:**
```
Build Command: npm run build
Output Directory: dist
Node Version: 18.x or higher
Install Command: npm install
```

### Custom Build Scripts

**package.json:**
```json
{
  "scripts": {
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production"
  }
}
```

## Environment Configuration

### Environment Variables

**Base44 Dashboard → Settings → Environment Variables:**

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BASE44_APP_ID` | Yes | Your Base44 app ID |
| `VITE_BASE44_APP_BASE_URL` | Yes | Base44 backend URL |
| `VITE_API_TIMEOUT` | No | API request timeout (ms) |
| `VITE_DEBUG_MODE` | No | Enable debug logs |

**Setting Variables:**
1. Navigate to Base44 Dashboard
2. Go to Settings → Environment
3. Click "Add Variable"
4. Enter key and value
5. Select environment (production/staging)
6. Save and redeploy

### Environment-Specific Configuration

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    // Base URL depends on environment
    base: mode === 'production' ? '/' : '/',

    // Environment-specific plugins
    plugins: [
      // ...plugins
    ],

    build: {
      // Production optimizations
      minify: mode === 'production' ? 'esbuild' : false,
      sourcemap: mode !== 'production',
    },
  };
});
```

### Multiple Environments

**Setup staging environment:**
1. Create `.env.staging` file
2. Configure staging variables
3. Deploy to staging branch

**.env.staging:**
```env
VITE_BASE44_APP_ID=staging_app_id
VITE_BASE44_APP_BASE_URL=https://staging-app.base44.app
VITE_DEBUG_MODE=true
```

## CDN & Hosting

### CDN Configuration

Base44 automatically configures CDN for optimal performance:

**Features:**
- Global edge locations
- Automatic SSL
- HTTP/2 and HTTP/3
- Brotli and Gzip compression
- Image optimization
- Cache headers

### Cache Strategy

**Static Assets (JS, CSS, Images):**
```
Cache-Control: public, max-age=31536000, immutable
```

**HTML Files:**
```
Cache-Control: public, max-age=0, must-revalidate
```

**API Responses:**
```
Cache-Control: private, no-cache
```

### Custom Headers

**Configure in Base44 Dashboard:**
```json
{
  "headers": [
    {
      "source": "/**/*",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Domain Setup

### Custom Domain Configuration

1. **Add Domain in Base44**
   - Dashboard → Settings → Domains
   - Click "Add Custom Domain"
   - Enter your domain (e.g., `aiaas.example.com`)

2. **Configure DNS**
   - Add CNAME record pointing to Base44
   - Or add A record with provided IP

3. **SSL Certificate**
   - Base44 automatically provisions SSL via Let's Encrypt
   - Certificate auto-renews every 90 days

### DNS Configuration

**Option 1: CNAME (Recommended)**
```
Type: CNAME
Name: aiaas (or @ for root domain)
Value: your-app.base44.app
TTL: 3600
```

**Option 2: A Record**
```
Type: A
Name: @ (or subdomain)
Value: [IP provided by Base44]
TTL: 3600
```

### Domain Verification

1. Base44 provides verification token
2. Add TXT record to DNS:
   ```
   Type: TXT
   Name: _base44-verification
   Value: [verification token]
   ```
3. Click "Verify" in Base44 Dashboard
4. Remove TXT record after verification

## CI/CD Pipeline

### GitHub Actions Integration

**Create `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to Base44

on:
  push:
    branches:
      - main
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_BASE44_APP_ID: ${{ secrets.BASE44_APP_ID }}
          VITE_BASE44_APP_BASE_URL: ${{ secrets.BASE44_BASE_URL }}

      - name: Deploy to Base44
        uses: base44/deploy-action@v1
        with:
          token: ${{ secrets.BASE44_DEPLOY_TOKEN }}
          app-id: ${{ secrets.BASE44_APP_ID }}
```

### Deployment Checks

**Pre-deployment checks:**
- Lint code (`npm run lint`)
- Type check (`npm run typecheck`)
- Run tests (`npm test`)
- Build successfully (`npm run build`)

**Post-deployment checks:**
- Verify app loads
- Check API connectivity
- Test critical user flows
- Monitor error rates

### Rollback Strategy

**If deployment fails:**

1. **Automatic Rollback** (Base44)
   - Base44 automatically rolls back on build failures

2. **Manual Rollback**
   - Dashboard → Deployments → Select previous version → Deploy

3. **Git Revert**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Monitoring & Logging

### Application Monitoring

**Base44 provides:**
- Request logs
- Error tracking
- Performance metrics
- Uptime monitoring

**Access logs:**
1. Dashboard → Logs
2. Filter by:
   - Time range
   - Log level (info, warning, error)
   - Source (app, API, CDN)

### Error Tracking

**Integrate Sentry (optional):**

```bash
npm install @sentry/react
```

**src/main.jsx:**
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Analytics

**Integrate analytics (optional):**

**Google Analytics:**
```javascript
// src/lib/analytics.js
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID');
  }
};

export const trackPageView = (url) => {
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: url,
  });
};
```

### Performance Monitoring

**Web Vitals:**
```bash
npm install web-vitals
```

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  console.log(metric);
  // Send to analytics service
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Performance Optimization

### Build Optimizations

**vite.config.js:**
```javascript
export default defineConfig({
  build: {
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },

    // Minification
    minify: 'esbuild',
    target: 'es2015',

    // Source maps (disable in production)
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // CSS optimization
  css: {
    devSourcemap: false,
  },
});
```

### Asset Optimization

**Images:**
- Use WebP format
- Compress images
- Use responsive images
- Implement lazy loading

**Fonts:**
- Use system fonts when possible
- Subset custom fonts
- Preload critical fonts

**JavaScript:**
- Code splitting
- Tree shaking
- Minification
- Compression

### Caching Strategy

**Service Worker (optional):**
```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.css',
        '/assets/index.js',
      ]);
    })
  );
});
```

## Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variables Not Loading:**
- Verify variables are set in Base44 Dashboard
- Ensure variable names start with `VITE_`
- Redeploy after changing variables

**404 Errors on Routes:**
- Configure Base44 to serve `index.html` for all routes
- Add `_redirects` file:
  ```
  /*    /index.html   200
  ```

**Slow Load Times:**
- Enable CDN
- Optimize images
- Code split large bundles
- Enable compression

**API Connection Issues:**
- Verify `VITE_BASE44_APP_BASE_URL` is correct
- Check CORS settings in Base44
- Verify API token is valid

### Debug Mode

**Enable debug logging:**
```env
VITE_DEBUG_MODE=true
```

**Check logs:**
1. Base44 Dashboard → Logs
2. Browser DevTools → Console
3. Network tab for API calls

### Support

**If you need help:**
1. Check [Base44 Documentation](https://docs.base44.com)
2. Contact Base44 Support: [app.base44.com/support](https://app.base44.com/support)
3. Create GitHub Issue
4. Check community forums

---

For more information:
- [Getting Started](GETTING_STARTED.md)
- [Architecture](ARCHITECTURE.md)
- [API Documentation](API.md)
