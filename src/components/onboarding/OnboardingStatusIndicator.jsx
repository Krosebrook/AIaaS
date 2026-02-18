import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';

/**
 * Subtle onboarding status indicator
 * Grows and becomes more prominent as user progresses
 */
export default function OnboardingStatusIndicator() {
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(6);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const completed = JSON.parse(localStorage.getItem('onboarding_progress') || '[]');
      const onboardingComplete = localStorage.getItem('onboarding_completed') === 'true';
      
      setCompletedCount(completed.length);
      setProgress(Math.round((completed.length / totalCount) * 100));
      setIsComplete(onboardingComplete);
    };

    updateProgress();
    window.addEventListener('storage', updateProgress);
    
    // Poll every 2 seconds for updates
    const interval = setInterval(updateProgress, 2000);

    return () => {
      window.removeEventListener('storage', updateProgress);
      clearInterval(interval);
    };
  }, []);

  // Don't show if complete or dismissed
  if (isComplete || localStorage.getItem('checklist_dismissed') === 'true') {
    return null;
  }

  // Don't show until user has made some progress
  if (completedCount === 0) {
    return null;
  }

  const size = Math.max(4, 4 + progress * 0.05); // Grows from 4px to ~9px
  const opacity = Math.min(1, 0.4 + progress * 0.006); // Grows from 40% to 100%

  return (
    <div 
      className="fixed top-20 right-6 z-30 transition-all duration-500"
      style={{
        transform: `scale(${1 + progress * 0.01})` // Subtle scale
      }}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-int-orange/10 to-int-navy/10 backdrop-blur-sm border border-int-orange/30 rounded-full px-3 py-2 shadow-lg"
        style={{ opacity }}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-int-orange to-int-navy p-0.5">
            <div className="w-full h-full rounded-full bg-void flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-int-orange" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: 'var(--int-orange)',
              borderRightColor: progress > 25 ? 'var(--int-orange)' : 'transparent',
              borderBottomColor: progress > 50 ? 'var(--int-orange)' : 'transparent',
              borderLeftColor: progress > 75 ? 'var(--int-orange)' : 'transparent',
              transform: 'rotate(-90deg)'
            }}
          />
        </div>
        
        <div className="text-xs font-semibold text-white">
          <span className="text-int-orange">{progress}%</span> Complete
        </div>
        
        {progress > 70 && (
          <div className="ml-1 animate-bounce">
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
        )}
      </div>
    </div>
  );
}