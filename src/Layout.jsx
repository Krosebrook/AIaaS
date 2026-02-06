import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Menu, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', page: 'Home' },
    { name: 'SERVICES', page: 'Services' },
    { name: 'CASE STUDIES', page: 'CaseStudies' },
    { name: 'WORKSHOPS', page: 'Workshops' },
    { name: 'ABOUT', page: 'About' },
    { name: 'CONTACT', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white font-inter">
      <style>{`
        :root {
          /* FlashFusion Brand Colors */
          --flash-purple: #A855F7;
          --fusion-pink: #F472B6;
          --void-black: #0F0618;
          --carbon-night: #120A1F;
          --signal-white: #F8F7FF;
          
          /* Accent Colors */
          --electric-blue: #38BDF8;
          --neon-mint: #2DD4BF;
          --ember-red: #FB7185;
          --solar-amber: #FBBF24;
          
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
          
          /* Transitions */
          --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
          --transition-base: 300ms cubic-bezier(0.16, 1, 0.3, 1);
          --transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background-color: var(--void-black);
          color: var(--signal-white);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .bg-void { background-color: var(--void-black); }
        .bg-carbon-night { background-color: var(--carbon-night); }
        .text-signal-white { color: var(--signal-white); }
        .text-flash-purple { color: var(--flash-purple); }
        .text-fusion-pink { color: var(--fusion-pink); }
        .border-flash-purple { border-color: var(--flash-purple); }
        .border-fusion-pink { border-color: var(--fusion-pink); }
        
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* Button Styles */
        .btn-primary {
          background: linear-gradient(135deg, var(--flash-purple) 0%, var(--fusion-pink) 100%);
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
          box-shadow: 0 0 30px rgba(168,85,247,0.6);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--flash-purple);
          border: 2px solid var(--flash-purple);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-base);
          cursor: pointer;
        }
        
        .btn-secondary:hover {
          background: var(--flash-purple);
          color: var(--signal-white);
        }
        
        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, var(--flash-purple) 0%, var(--fusion-pink) 50%, #7C3AED 100%);
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
          outline: 2px solid var(--flash-purple);
          outline-offset: 2px;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        a:hover {
          color: var(--fusion-pink);
        }
      `}</style>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-void/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center font-bold text-xl">
                INT
              </div>
              <span className="text-xl font-bold">INTinc Technology</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium transition-colors hover:text-fusion-pink ${
                    currentPageName === link.page ? 'text-flash-purple' : 'text-signal-white/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Attribution Badge */}
              <div className="flex flex-col items-end text-xs ml-4 pl-4 border-l border-flash-purple/30">
                <div className="text-signal-white/60">Made by INTinc Technology</div>
                <a 
                  href="https://flashfusion.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                >
                  Powered by FlashFusion
                </a>
              </div>
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
                    className={`text-sm font-medium transition-colors hover:text-fusion-pink ${
                      currentPageName === link.page ? 'text-flash-purple' : 'text-signal-white/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Attribution */}
                <div className="flex flex-col gap-1 text-xs pt-4 border-t border-flash-purple/30">
                  <div className="text-signal-white/60">Made by INTinc Technology</div>
                  <a 
                    href="https://flashfusion.co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                  >
                    Powered by FlashFusion
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-carbon-night border-t border-flash-purple/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center font-bold">
                  INT
                </div>
                <span className="font-bold">INTinc Technology</span>
              </div>
              <p className="text-sm text-signal-white/60">
                Enterprise AI implementation with MSP discipline. Secure, measurable, production-ready.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-flash-purple">Quick Links</h4>
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
              <h4 className="font-semibold mb-4 text-flash-purple">Get in Touch</h4>
              <p className="text-sm text-signal-white/60 mb-4">
                Ready to build production AI systems? Let's talk.
              </p>
              <Link
                to={createPageUrl('Contact')}
                className="inline-block px-6 py-2 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full text-sm font-semibold hover:shadow-glow transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-flash-purple/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-signal-white/60">
              <div>
                © {new Date().getFullYear()} INTinc Technology. All rights reserved.
              </div>
              <div className="flex items-center gap-2">
                <span>Made by INTinc Technology</span>
                <span className="text-signal-white/40">|</span>
                <a 
                  href="https://flashfusion.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                >
                  Powered by FlashFusion
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}