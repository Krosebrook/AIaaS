# Contributing to AIaaS

Thank you for your interest in contributing to AIaaS! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful of differing viewpoints and experiences.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Any conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated.

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- A GitHub account
- Basic knowledge of React, JavaScript, and Tailwind CSS

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AIaaS.git
   cd AIaaS
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/Krosebrook/AIaaS.git
   ```

### Set Up Development Environment

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   ```env
   VITE_BASE44_APP_ID=your_app_id
   VITE_BASE44_APP_BASE_URL=your_backend_url
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Verify setup:**
   - Open `http://localhost:5173`
   - Ensure the app loads without errors

## Development Workflow

### Branching Strategy

We follow a feature branch workflow:

```
main (production)
  ↓
develop (integration)
  ↓
feature/your-feature-name (your work)
```

### Creating a Feature Branch

1. **Sync with upstream:**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

   **Branch naming conventions:**
   - `feature/` - New features (e.g., `feature/seo-analyzer`)
   - `fix/` - Bug fixes (e.g., `fix/login-redirect`)
   - `docs/` - Documentation updates (e.g., `docs/api-guide`)
   - `refactor/` - Code refactoring (e.g., `refactor/auth-context`)
   - `test/` - Test additions (e.g., `test/content-generator`)

### Making Changes

1. **Make your changes** in small, logical commits
2. **Test your changes** thoroughly
3. **Follow coding standards** (see below)
4. **Write/update tests** if applicable
5. **Update documentation** if needed

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(content): add blog post generation"
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "docs(api): add LLM integration examples"
```

### Syncing with Upstream

Keep your fork up to date:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Coding Standards

### JavaScript/React

**Style Guidelines:**
- Use functional components with hooks
- Use arrow functions for components
- Destructure props
- Use meaningful variable names
- Keep components small and focused (< 200 lines)

**Good Example:**
```javascript
export const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (data) => {
    await onEdit(project.id, data);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      {/* ... */}
    </Card>
  );
};
```

**Avoid:**
```javascript
// Too generic names
const data = fetchData();
const thing = getThing();

// Deeply nested logic
if (a) {
  if (b) {
    if (c) {
      // Too deep
    }
  }
}

// Large components (split into smaller ones)
const HugeComponent = () => {
  // 500+ lines of code
};
```

### File Organization

**Component structure:**
```
components/
├── ui/                  # Generic UI components
│   ├── button.jsx
│   └── input.jsx
├── feature-name/        # Feature-specific components
│   ├── FeatureMain.jsx
│   └── FeatureDetail.jsx
└── utils/               # Utility components
```

**File naming:**
- Components: PascalCase (`ProjectCard.jsx`)
- Utilities: camelCase (`formatDate.js`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)

### CSS/Tailwind

**Prefer Tailwind utilities:**
```jsx
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Avoid custom CSS unless necessary
```

**Component-specific styles:**
```jsx
// When Tailwind is insufficient, use CSS modules or styled components
import styles from './Component.module.css';

<div className={styles.customElement}>
```

### State Management

**Local state:**
```javascript
const [state, setState] = useState(initialValue);
```

**Server state (React Query):**
```javascript
const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData,
});
```

**Global state (Context):**
```javascript
const { user, token } = useAuth();
```

### Error Handling

**Always handle errors:**
```javascript
try {
  const result = await api.call();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  toast.error('An error occurred');
  throw error;
}
```

**In components:**
```javascript
const { data, error, isLoading } = useQuery({...});

if (isLoading) return <Skeleton />;
if (error) return <Alert variant="destructive">{error.message}</Alert>;
```

### Accessibility

**Follow WCAG 2.1 Level AA:**
- Use semantic HTML elements
- Include ARIA labels for icon-only buttons
- Ensure keyboard navigation works
- Maintain color contrast ratios (4.5:1 for text)
- Test with screen readers

**Example:**
```jsx
<button
  aria-label="Delete project"
  onClick={handleDelete}
>
  <TrashIcon />
</button>
```

### Performance

**Optimize re-renders:**
```javascript
// Memoize expensive computations
const expensiveValue = useMemo(() => compute(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Memoize components
const MemoizedComponent = memo(Component);
```

**Lazy load routes:**
```javascript
const ContentGenerator = lazy(() => import('./pages/ContentGenerator'));
```

## Pull Request Process

### Before Submitting

1. **Run linter:**
   ```bash
   npm run lint
   ```

2. **Fix linting issues:**
   ```bash
   npm run lint:fix
   ```

3. **Type check:**
   ```bash
   npm run typecheck
   ```

4. **Build successfully:**
   ```bash
   npm run build
   ```

5. **Test your changes:**
   - Manually test all affected features
   - Verify on different screen sizes
   - Check browser console for errors

### Submitting Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Title:** Use conventional commit format
   ```
   feat(content): add blog post generation
   ```

4. **PR Description:** Include:
   - What changes were made
   - Why they were needed
   - How to test
   - Screenshots (for UI changes)
   - Related issues

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** run (linting, type checking, build)
2. **Maintainer review** - may request changes
3. **Address feedback** - make requested changes
4. **Re-review** - maintainer reviews again
5. **Merge** - PR merged when approved

### After Merge

1. **Delete branch:**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Sync main:**
   ```bash
   git checkout main
   git pull upstream main
   ```

## Reporting Issues

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Try latest version** to see if issue is fixed
3. **Gather information:**
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/videos
   - Browser/OS information
   - Console errors

### Issue Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.17.0]
- App Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

## Feature Requests

### Suggesting Features

1. **Check existing feature requests** first
2. **Use feature request template:**

```markdown
## Feature Description
Clear description of the feature

## Problem it Solves
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Mockups, examples, etc.
```

### Feature Discussion

- Features are discussed in GitHub Issues
- Community feedback is encouraged
- Maintainers make final decisions on scope

## Questions?

If you have questions:
1. Check [documentation](docs/)
2. Search [GitHub Issues](https://github.com/Krosebrook/AIaaS/issues)
3. Create a new issue with the "question" label
4. Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to AIaaS! 🎉**
