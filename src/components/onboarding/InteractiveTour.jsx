import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useOnboarding } from './useOnboarding';

export default function InteractiveTour({ steps = [] }) {
  const { tourActive, currentStep, setCurrentStep, setTourActive, completeTour } = useOnboarding();
  const highlightRef = useRef(null);

  const defaultSteps = [
    {
      target: 'nav',
      title: 'Welcome to INTinc! 👋',
      content: 'Let\'s take a quick tour to help you get started. This will only take 2 minutes.',
      position: 'bottom'
    },
    {
      target: '[href*="Services"]',
      title: 'Explore Our Services',
      content: 'Check out our AI implementation services, from security-first architecture to custom engineering.',
      position: 'bottom'
    },
    {
      target: '[href*="CaseStudies"]',
      title: 'See Real Results',
      content: 'Browse case studies showing measurable ROI and real deployments from our clients.',
      position: 'bottom'
    },
    {
      target: '[href*="Workshops"]',
      title: 'Learn AI Skills',
      content: 'Join our hands-on workshops to master AI tools and implementation strategies.',
      position: 'bottom'
    },
    {
      target: '[href*="Contact"]',
      title: 'Get Started',
      content: 'Ready to transform your business with AI? Let\'s connect and discuss your needs.',
      position: 'bottom'
    }
  ];

  const tourSteps = steps.length > 0 ? steps : defaultSteps;
  const currentTourStep = tourSteps[currentStep];

  useEffect(() => {
    if (!tourActive) return;

    const targetElement = document.querySelector(currentTourStep?.target);
    if (!targetElement) return;

    // Scroll element into view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight element
    const rect = targetElement.getBoundingClientRect();
    if (highlightRef.current) {
      highlightRef.current.style.top = `${rect.top + window.scrollY - 8}px`;
      highlightRef.current.style.left = `${rect.left - 8}px`;
      highlightRef.current.style.width = `${rect.width + 16}px`;
      highlightRef.current.style.height = `${rect.height + 16}px`;
    }
  }, [currentStep, tourActive, currentTourStep]);

  if (!tourActive || !currentTourStep) return null;

  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeTour();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setTourActive(false);
    localStorage.setItem('tour_completed', 'true');
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" />

      {/* Highlight */}
      <div
        ref={highlightRef}
        className="fixed z-[101] pointer-events-none transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-lg ring-4 ring-int-orange shadow-2xl animate-pulse" />
      </div>

      {/* Tour Card */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[102] w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-int-orange overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-int-orange to-int-navy p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {currentTourStep.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Skip tour"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed">
              {currentTourStep.content}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tourSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStep
                      ? 'bg-int-orange w-8'
                      : idx < currentStep
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleSkip}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Skip tour
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-int-orange to-int-navy text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}