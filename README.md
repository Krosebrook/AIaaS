# AIaaS - Enterprise AI Consulting & Implementation Platform

[![Built with React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)](https://vitejs.dev/)
[![Base44](https://img.shields.io/badge/Base44-SDK-orange.svg)](https://base44.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **AIaaS** is a comprehensive SaaS platform that helps businesses evaluate, implement, and optimize AI solutions tailored to their specific needs. Built by **INTinc**, it combines AI-powered content generation, strategic consulting, and personalized recommendations to accelerate AI adoption.

## 🚀 Features

### AI-Powered Capabilities
- **Content Generation** - Multi-format AI content creation (blog posts, social media, email campaigns, landing pages)
- **SEO Optimization** - Automated SEO audits, keyword research, and competitor analysis
- **AI Readiness Assessment** - Interactive questionnaire with AI-powered analysis and recommendations
- **Strategy Generation** - Personalized AI implementation roadmaps
- **Live Chat AI** - Intelligent chatbot for customer support and lead qualification

### Personalization Engine
- **User Profile Tracking** - Interests, visited pages, and assessment results
- **Behavior Analytics** - Page views, time-on-page, and interaction tracking
- **Smart Recommendations** - AI-powered content suggestions based on user journey
- **User Segmentation** - Cohort analysis for targeted messaging
- **Engagement Scoring** - Automated scoring with proactive CRM triggers

### Business Operations
- **Project Management** - Create and manage projects with tasks
- **CRM Integration** - Automated follow-up sequences for high-engagement users
- **Workshop Management** - Event registration and scheduling
- **Client Health Monitoring** - Customer success tracking
- **Resource Library** - Educational content repository

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - Modern UI library with hooks
- **Vite 6.1** - Lightning-fast build tool and dev server
- **React Router 6** - Client-side routing
- **TanStack React Query** - Server state management
- **React Hook Form + Zod** - Form management and validation

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library (20+ components)
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Dark Mode** - Next-themes support

### Backend & APIs
- **Base44 SDK** - Custom backend platform integration
- **LLM Integration** - AI capabilities via Base44 integrations
- **Stripe** - Payment processing
- **LocalStorage** - Client-side data persistence

### Advanced Features
- **React Quill** - Rich text editor
- **React Markdown** - Markdown rendering
- **html2canvas + jspdf** - PDF export
- **React Leaflet** - Map integration
- **Three.js** - 3D graphics

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Krosebrook/AIaaS.git
cd AIaaS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create an `.env.local` file in the root directory:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

# Example:
# VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
# VITE_BASE44_APP_BASE_URL=https://your-app.base44.app
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run typecheck` | Run TypeScript type checking |

## 📚 Documentation

- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Detailed setup and configuration
- **[Architecture Overview](docs/ARCHITECTURE.md)** - Technical architecture and design patterns
- **[Features Documentation](docs/FEATURES.md)** - Complete feature reference
- **[Component Library](docs/COMPONENTS.md)** - UI component reference
- **[API Integration](docs/API.md)** - Base44 SDK and API usage
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project

## 🏗️ Project Structure

```
AIaaS/
├── src/
│   ├── api/                 # API client initialization
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (70+)
│   │   ├── shell/          # Layout components
│   │   ├── onboarding/     # Onboarding flows
│   │   └── ...             # Feature-specific components
│   ├── pages/              # Page components (27 routes)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main application component
│   ├── Layout.jsx          # Global layout wrapper
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── docs/                   # Documentation
├── .env.local              # Environment variables (create this)
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Pull request process
- Coding standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links & Resources

- **Base44 Platform**: [https://base44.com](https://base44.com)
- **Base44 Documentation**: [https://docs.base44.com](https://docs.base44.com)
- **Base44 GitHub Integration**: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)
- **Support**: [https://app.base44.com/support](https://app.base44.com/support)

## 👥 About INTinc

**INTinc** - "Our Purpose is YOUR Business"

AIaaS is developed and maintained by INTinc, a technology consulting firm specializing in AI implementation and digital transformation.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [documentation](docs/)
2. Search existing [GitHub Issues](https://github.com/Krosebrook/AIaaS/issues)
3. Create a new issue with detailed information
4. Contact Base44 support at [https://app.base44.com/support](https://app.base44.com/support)

---

**Built with ❤️ by INTinc**
