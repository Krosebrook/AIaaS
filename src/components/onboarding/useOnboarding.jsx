import { useState, useEffect } from 'react';

export function useOnboarding() {
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChecklist, setShowChecklist] = useState(true);
  const [checklist, setChecklist] = useState([
    {
      id: 'tour',
      title: 'Take the guided tour',
      description: 'Learn about key features in 2 minutes',
      completed: false,
      action: 'startTour'
    },
    {
      id: 'explore_services',
      title: 'Explore our services',
      description: 'Check out what we offer',
      completed: false,
      pageToVisit: 'Services'
    },
    {
      id: 'view_case_study',
      title: 'Read a case study',
      description: 'See real results from our clients',
      completed: false,
      pageToVisit: 'CaseStudies'
    },
    {
      id: 'contact_us',
      title: 'Get in touch',
      description: 'Schedule a consultation or ask questions',
      completed: false,
      pageToVisit: 'Contact'
    }
  ]);

  useEffect(() => {
    const savedChecklist = localStorage.getItem('onboarding_checklist');
    const dismissed = localStorage.getItem('onboarding_dismissed');
    const tourCompleted = localStorage.getItem('tour_completed');

    if (dismissed === 'true') {
      setShowChecklist(false);
    } else if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    }

    if (tourCompleted !== 'true') {
      // Show tour on first visit after a short delay
      const timer = setTimeout(() => {
        const hasSeenTour = localStorage.getItem('tour_seen');
        if (!hasSeenTour) {
          setTourActive(true);
          localStorage.setItem('tour_seen', 'true');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTask = (taskId) => {
    const updated = checklist.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setChecklist(updated);
    localStorage.setItem('onboarding_checklist', JSON.stringify(updated));
  };

  const isChecklistComplete = () => {
    return checklist.every(task => task.completed);
  };

  const dismissChecklist = () => {
    setShowChecklist(false);
    localStorage.setItem('onboarding_dismissed', 'true');
  };

  const resetOnboarding = () => {
    const reset = checklist.map(task => ({ ...task, completed: false }));
    setChecklist(reset);
    setShowChecklist(true);
    setCurrentStep(0);
    localStorage.removeItem('onboarding_checklist');
    localStorage.removeItem('onboarding_dismissed');
    localStorage.removeItem('tour_completed');
    localStorage.removeItem('tour_seen');
  };

  const startTour = () => {
    setTourActive(true);
    setCurrentStep(0);
  };

  const completeTour = () => {
    setTourActive(false);
    completeTask('tour');
    localStorage.setItem('tour_completed', 'true');
  };

  return {
    tourActive,
    setTourActive,
    currentStep,
    setCurrentStep,
    checklist,
    completeTask,
    isChecklistComplete,
    showChecklist,
    dismissChecklist,
    resetOnboarding,
    startTour,
    completeTour
  };
}