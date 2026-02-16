import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function GuidedTour({ onComplete }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user has completed tour
    const tourCompleted = localStorage.getItem('guidedTourCompleted');
    const tourDismissed = localStorage.getItem('guidedTourDismissed');
    
    if (!tourCompleted && !tourDismissed) {
      // Wait a bit before showing tour
      const timer = setTimeout(() => {
        generateTour();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const generateTour = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a personalized guided tour for INTinc.com's AI-powered web application.

The app is an enterprise AI implementation platform with these key features:
1. Content Generator - AI-powered content creation for blogs, marketing, social media
2. SEO Dashboard - Advanced SEO analysis, competitor insights, trend forecasting
3. User Settings - Personalization preferences for AI recommendations

Create an engaging, concise guided tour with 5 steps:
- Welcome/Introduction
- Content Generator feature
- SEO Dashboard feature  
- User Settings feature
- Completion/Next steps

For each step provide:
1. Title (engaging, benefit-focused)
2. Description (2-3 sentences, highlight value)
3. Tip (actionable insight or best practice)
4. Target feature (which page/feature it relates to)

Make it friendly, professional, and focused on accelerating user value.`,
        response_json_schema: {
          type: "object",
          properties: {
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  tip: { type: "string" },
                  target: { type: "string" },
                  ctaLabel: { type: "string" },
                  ctaPage: { type: "string" }
                }
              }
            }
          }
        }
      });

      setTourData(result);
      setIsActive(true);
    } catch (error) {
      console.error('Tour generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < tourData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem('guidedTourCompleted', 'true');
    setIsActive(false);
    if (onComplete) onComplete();
  };

  const dismissTour = () => {
    localStorage.setItem('guidedTourDismissed', 'true');
    setIsActive(false);
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  if (!isActive || !tourData) return null;

  const currentStepData = tourData.steps[currentStep];
  const progress = ((currentStep + 1) / tourData.steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 bg-carbon-night rounded-2xl border-2 border-int-orange shadow-2xl overflow-hidden animate-slide-in">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-void">
          <div 
            className="h-full bg-gradient-to-r from-int-orange to-int-teal transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-int-navy/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-int-orange/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-int-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentStepData.title}</h3>
                <p className="text-xs text-signal-white/60">
                  Step {currentStep + 1} of {tourData.steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={dismissTour}
              className="text-signal-white/60 hover:text-signal-white transition-colors"
              aria-label="Close tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-signal-white/90 leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Tip Box */}
          <div className="p-4 bg-int-teal/10 border border-int-teal/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-int-teal/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-int-teal" />
              </div>
              <div>
                <h4 className="font-semibold text-int-teal mb-1 text-sm">Pro Tip</h4>
                <p className="text-sm text-signal-white/80">{currentStepData.tip}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {currentStepData.ctaPage && currentStep < tourData.steps.length - 1 && (
            <Link
              to={createPageUrl(currentStepData.ctaPage)}
              onClick={dismissTour}
              className="inline-block px-4 py-2 bg-int-navy/20 border border-int-navy/30 rounded-lg text-sm hover:bg-int-navy/30 transition-all"
            >
              {currentStepData.ctaLabel || `Go to ${currentStepData.target}`}
            </Link>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-int-navy/30 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-signal-white/60 hover:text-signal-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-1">
            {tourData.steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-int-orange w-6'
                    : idx < currentStep
                    ? 'bg-int-teal'
                    : 'bg-void'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
          >
            {currentStep === tourData.steps.length - 1 ? (
              <>
                <Check className="w-4 h-4" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}

// Tour restart button component for settings/help menu
export function TourRestartButton() {
  const [showTour, setShowTour] = useState(false);

  const handleRestart = () => {
    localStorage.removeItem('guidedTourCompleted');
    localStorage.removeItem('guidedTourDismissed');
    setShowTour(true);
  };

  return (
    <>
      <button
        onClick={handleRestart}
        className="flex items-center gap-2 px-4 py-2 bg-int-orange/20 border border-int-orange/30 rounded-lg hover:bg-int-orange/30 transition-all text-sm"
      >
        <Sparkles className="w-4 h-4" />
        Restart Guided Tour
      </button>
      {showTour && <GuidedTour onComplete={() => setShowTour(false)} />}
    </>
  );
}