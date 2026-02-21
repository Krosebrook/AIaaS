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
    { name: 'CATALYST BUILDS', page: 'AIConsultingServices' },
    { name: 'CASE STUDIES', page: 'CaseStudies' },
    { name: 'WORKSHOPS', page: 'Workshops' },
    { name: 'ABOUT', page: 'About' },
    { name: 'CONTACT', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-cream text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;600;700&display=swap');

        :root {
          /* InVelo Brand Colors (INT Sunrise Palette) */
          --charcoal: #36454F;
          --orange: #E87722;
          --cream: #F5F0EB;
          --white: #FFFFFF;
          --black: #000000;

          /* Typography */
          --font-body: 'Calibri', Arial, sans-serif;
          --font-heading: Georgia, serif;

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

          /* Motion */
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
          font-family: var(--font-body);
          background-color: var(--cream);
          color: var(--black);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Headings use Georgia */
        h1, h2, h3, .font-heading {
          font-family: var(--font-heading);
        }

        .bg-charcoal { background-color: var(--charcoal); }
        .bg-cream { background-color: var(--cream); }
        .bg-white { background-color: var(--white); }
        .text-white { color: var(--white); }
        .text-black { color: var(--black); }
        .text-orange { color: var(--orange); }
        .text-charcoal { color: var(--charcoal); }
        .border-orange { border-color: var(--orange); }
        .border-charcoal { border-color: var(--charcoal); }

        /* Button Styles */
        .btn-primary {
          background: var(--orange);
          color: var(--white);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all var(--transition-base);
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #D06519;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(232,119,34,0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--charcoal);
          border: 2px solid var(--charcoal);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: var(--charcoal);
          color: var(--white);
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
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
                  <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={createPageUrl('Home')} className="flex items-center gap-3" aria-label="InVelo by INT Inc.">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'Georgia, serif' }}>InVelo</span>
                        <div className="border-l-2 border-charcoal/30 pl-3">
                          <div className="text-xs font-semibold text-charcoal leading-tight">by INT Inc.</div>
                          <div className="text-xs text-orange leading-tight">Build it. Use it. Retire it.</div>
                        </div>
                      </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.page}
                          to={createPageUrl(link.page)}
                          className={`text-sm font-medium transition-colors hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1 ${
                            currentPageName === link.page ? 'text-orange font-bold' : 'text-charcoal'
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
      <footer className="bg-charcoal border-t border-white/10 py-12 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-orange mb-2" style={{ fontFamily: 'Georgia, serif' }}>InVelo</h3>
            <p className="text-white text-lg mb-4">Mission-Complete AI Services</p>
            <p className="text-orange font-semibold mb-6">"Build it. Use it. Retire it."</p>

            <div className="text-white/80 text-sm space-y-1">
              <p>A service line of INT Inc.</p>
              <p>175 Olde Half Day Rd, Suite 240 | Lincolnshire, IL 60069</p>
              <p>(847) 215-4900 | <a href="https://intinc.com" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">intinc.com</a></p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <div>
                © 2026 INT Inc. All rights reserved.
              </div>
              <div className="flex gap-4">
                <span>SOC 2 Type II Certified</span>
                <span>•</span>
                <span>Women-Owned Business</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}