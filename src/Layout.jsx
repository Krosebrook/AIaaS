import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import LiveChat from './components/LiveChat';
import AppShell from './components/shell/AppShell';
import InteractiveOnboarding from './components/onboarding/InteractiveOnboarding';
import OnboardingProgressChecklist from './components/onboarding/OnboardingProgressChecklist';
import OnboardingStatusIndicator from './components/onboarding/OnboardingStatusIndicator';
import { Menu, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  // Check if current page should use AppShell (admin/tool pages)
  const useAppShell = ['ContentGenerator', 'SEODashboard', 'ClientHealth', 'UserSettings', 'Projects', 'Solutions', 'StrategyWizard'].includes(currentPageName);

  if (useAppShell) {
    return (
      <AppShell currentPage={currentPageName}>
        {children}
      </AppShell>
    );
  }

  // Original layout for public pages
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPageName]);

  const navLinks = [
    { name: 'HOME', page: 'Home' },
    { name: 'SERVICES', page: 'Services' },
    { name: 'CONSULTING', page: 'AIConsultingServices' },
    { name: 'RESOURCES', page: 'Resources' },
    { name: 'CASE STUDIES', page: 'CaseStudies' },
    { name: 'WORKSHOPS', page: 'Workshops' },
    { name: 'ABOUT', page: 'About' },
    { name: 'CONTACT', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white font-inter">
      <style>{`
        /* No custom fonts needed - using system fonts */
        
        :root {
          /* InVelo Brand Colors (INT Sunrise Palette) */
          --int-charcoal: #36454F;
          --int-orange: #E87722;
          --int-cream: #F5F0EB;
          --int-white: #FFFFFF;
          --int-black: #000000;
          --void-black: #36454F;
          --carbon-night: #36454F;
          --signal-white: #FFFFFF;

          /* Legacy compat */
          --int-navy: #36454F;
          --int-teal: #E87722;
          --flash-purple: #E87722;
          --fusion-pink: #E87722;
          
          /* Neutral Colors */
          --slate-200: #E5E7EB;
          --slate-400: #9CA3AF;
          --slate-700: #374151;
          
          /* Typography */
          --font-primary: 'Calibri', Arial, sans-serif;
          --font-display: 'Georgia', serif;
          
          /* Spacing Scale */
          --spacing-xs: 0.25rem;
          --spacing-sm: 0.5rem;
          --spacing-md: 1rem;
          --spacing-lg: 1.5rem;
          --spacing-xl: 2rem;
          --spacing-2xl: 3rem;
          --spacing-3xl: 4rem;
          
          /* Border Radius */
          --radius-sm: 0.375rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --radius-xl: 1rem;
          --radius-2xl: 1.5rem;
          --radius-full: 9999px;
          
          /* Motion (Official FlashFusion Spec) */
          --duration-fast: 180ms;
          --easing: cubic-bezier(0.16, 1, 0.3, 1);
          --transition-fast: var(--duration-fast) var(--easing);
          --transition-base: 300ms var(--easing);
          --transition-slow: 500ms var(--easing);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: var(--font-primary);
          background-color: var(--void-black);
          color: var(--signal-white);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Display Font for Heroes and Section Headers */
        h1, h2, .font-display {
          font-family: var(--font-display);
        }
        
        .bg-void { background-color: var(--void-black); }
        .bg-carbon-night { background-color: var(--carbon-night); }
        .text-signal-white { color: var(--signal-white); }
        .text-flash-purple { color: var(--int-navy); }
        .text-fusion-pink { color: var(--int-orange); }
        .text-int-orange { color: var(--int-orange); }
        .text-int-navy { color: var(--int-navy); }
        .text-int-teal { color: var(--int-teal); }
        .border-flash-purple { border-color: var(--int-navy); }
        .border-fusion-pink { border-color: var(--int-orange); }
        
        .font-inter { font-family: var(--font-primary); }
        .font-display { font-family: var(--font-display); }
        
        /* Button Styles */
        .btn-primary {
          background: linear-gradient(135deg, var(--int-orange) 0%, var(--int-navy) 100%);
          color: var(--signal-white);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-base);
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }

        .btn-secondary {
          background: transparent;
          color: var(--int-navy);
          border: 2px solid var(--int-navy);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: var(--int-navy);
          color: var(--signal-white);
        }

        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, var(--int-navy) 0%, var(--int-teal) 50%, var(--int-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Focus Styles for Accessibility */
        *:focus-visible {
          outline: 2px solid var(--int-orange);
          outline-offset: 2px;
        }

        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        [role="button"]:focus-visible {
          outline: 2px solid var(--int-orange);
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(242, 101, 34, 0.2);
        }

        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .sr-only.focus\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        a:hover {
          color: var(--fusion-pink);
        }
      `}</style>

      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-int-orange focus:text-signal-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-void/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
                  <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={createPageUrl('Home')} className="flex items-center gap-3" aria-label="InVelo home">
                      <div className="flex flex-col">
                        <div className="text-2xl font-bold text-int-orange" style={{fontFamily: 'Georgia, serif'}}>InVelo</div>
                        <div className="text-xs text-int-charcoal/70" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>by INT Inc.</div>
                      </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.page}
                          to={createPageUrl(link.page)}
                          className={`text-sm font-medium transition-colors hover:text-fusion-pink focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-void rounded px-2 py-1 ${
                            currentPageName === link.page ? 'text-int-orange font-bold' : 'text-signal-white/80'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <Link
                        to={createPageUrl('PersonalizedDashboard')}
                        className={`text-sm font-medium transition-colors hover:text-fusion-pink focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-void rounded px-3 py-1 ${
                          currentPageName === 'PersonalizedDashboard' 
                            ? 'text-int-orange font-bold bg-int-orange/10' 
                            : 'text-signal-white/80'
                        }`}
                      >
                        Your Dashboard
                      </Link>
                    </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-signal-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-flash-purple/30">
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-fusion-pink focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-carbon-night rounded px-3 py-2 ${
                      currentPageName === link.page 
                        ? 'text-int-orange font-bold bg-int-orange/10 border-l-4 border-int-orange' 
                        : 'text-signal-white/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to={createPageUrl('PersonalizedDashboard')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-fusion-pink focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-carbon-night rounded px-3 py-2 ${
                    currentPageName === 'PersonalizedDashboard' 
                      ? 'text-int-orange font-bold bg-int-orange/10 border-l-4 border-int-orange' 
                      : 'text-signal-white/80'
                  }`}
                >
                  Your Dashboard
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="pt-16" role="main">
        {children}
      </main>

      {/* Live Chat */}
      <LiveChat />

      {/* Interactive Onboarding */}
      <InteractiveOnboarding />

      {/* Progress Checklist */}
      <OnboardingProgressChecklist />

      {/* Subtle Status Indicator */}
      <OnboardingStatusIndicator />

      {/* Footer */}
      <footer className="bg-int-charcoal border-t border-int-orange/30 py-12 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-int-orange mb-2" style={{fontFamily: 'Georgia, serif'}}>InVelo</div>
              <p className="text-sm text-signal-white mb-2" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
                Mission-Complete AI Services
              </p>
              <p className="text-sm font-semibold text-int-orange mb-4">"Build it. Use it. Retire it."</p>
              <p className="text-xs text-signal-white/80">
                A service line of INT Inc.
              </p>
              <p className="text-xs text-signal-white/60 mt-2">
                175 Olde Half Day Rd, Suite 240<br/>
                Lincolnshire, IL 60069<br/>
                (847) 215-4900 | intinc.com
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-int-navy">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="text-signal-white/60 hover:text-fusion-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-int-navy">Get in Touch</h4>
              <p className="text-sm text-signal-white/60 mb-4">
                Ready to transform YOUR business with AI? Let's connect.
              </p>
              <Link
                to={createPageUrl('Contact')}
                className="inline-block px-6 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-full text-sm font-semibold hover:shadow-glow transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-int-orange/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-signal-white/60">
              <div>
                © 2026 INT Inc. All rights reserved.
              </div>
              <div className="flex gap-4">
                <span>SOC 2 Type II Certified</span>
                <span>Women-Owned Business</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}