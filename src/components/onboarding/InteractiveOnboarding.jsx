import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { X, ChevronRight, ChevronLeft, CheckCircle, Play, Sparkles, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * Interactive Onboarding Flow
 * Guides users through key platform features with tooltips, videos, and progress tracking
 */
export default function InteractiveOnboarding({ onComplete }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [personalizedSteps, setPersonalizedSteps] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultSteps = [
    {
      id: 'welcome',
      title: 'Welcome to InVelo 🎉',
      description: 'Mission-Complete AI Services by INT Inc. We build custom AI tools for specific business missions, then hand you the keys. Let\'s show you how.',
      action: 'Start Tour',
      videoUrl: null,
      position: 'center'
    },
    {
      id: 'catalyst_builds',
      title: 'Explore Our Catalyst Builds',
      description: 'See real use cases: SOC 2 audit sprints, onboarding accelerators, crisis response toolkits, and more—all built in 4 weeks.',
      action: 'View Catalyst Builds',
      targetPage: 'Services',
      position: 'center',
      highlights: ['Purpose-built tools', 'Fixed timelines and pricing', 'You own everything']
    },
    {
      id: 'delivery_model',
      title: 'See How We Work',
      description: 'Our 4-week delivery model: Scope → Build → Operate → Retire. You own everything we create.',
      action: 'Learn Our Approach',
      targetPage: 'About',
      position: 'center',
      highlights: ['4-week build cycle', 'SOC 2 compliance built-in', 'Zero vendor lock-in']
    },
    {
      id: 'assessment',
      title: 'Try the AI Readiness Assessment',
      description: 'Answer 7 questions to find out where AI can drive immediate ROI for your business.',
      action: 'Take Assessment',
      targetPage: 'AIReadinessAssessment',
      position: 'center',
      highlights: ['7 questions, 5 minutes', 'Personalized recommendations', '12-month AI roadmap']
    },
    {
      id: 'complete',
      title: 'Ready to Start a Mission? 🚀',
      description: 'Schedule a discovery call. No pitch deck. No 6-month engagement. Just a plan.',
      action: 'Get Started',
      position: 'center'
    }
  ];

  useEffect(() => {
    const initializeOnboarding = async () => {
      const onboardingComplete = localStorage.getItem('onboarding_completed');
      const onboardingDismissed = localStorage.getItem('onboarding_dismissed');
      
      // Only show if user explicitly hasn't completed or dismissed
      if (!onboardingComplete && !onboardingDismissed) {
        setShowOnboarding(false);
      }

      // Load completed steps
      const saved = localStorage.getItem('onboarding_progress');
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }

      // Personalize steps based on user data
      await personalizeSteps();
    };

    initializeOnboarding();
  }, []);

  const personalizeSteps = async () => {
    try {
      // Get user context from assessment or profile
      const assessmentData = localStorage.getItem('ai_assessment_results');
      const userProfile = localStorage.getItem('user_profile');
      
      let context = {};
      if (assessmentData) {
        const data = JSON.parse(assessmentData);
        context.readinessLevel = data.readinessLevel;
        context.challenges = data.gaps;
        context.services = data.recommendedServices;
      }
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        context.industry = profile.industry;
        context.role = profile.role;
        context.interests = profile.interests;
      }

      // If no context, use default steps
      if (Object.keys(context).length === 0) {
        setPersonalizedSteps(defaultSteps);
        setLoading(false);
        return;
      }

      // Generate personalized onboarding with AI
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Create a personalized onboarding flow for an InVelo user based on their profile.

User Context:
${JSON.stringify(context, null, 2)}

Available pages/features to highlight:
- Services: Catalyst Builds and pricing
- About: Delivery model and approach
- Workshops: Training programs
- CaseStudies: SOC 2 audit sprint and success stories
- AIReadinessAssessment: AI readiness evaluation
- AIUseCaseExplorer: Discover use cases
- RoadmapGenerator: Implementation planning

Create 3-4 onboarding steps that:
1. Are relevant to their industry/role/readiness level
2. Focus on mission-complete AI services and catalyst builds
3. Emphasize 4-week delivery, SOC 2 compliance, and zero lock-in
4. Include personalized descriptions that speak to their needs

Each step should have: id, title (personalized to user), description (explain why it matters to THEM), targetPage, and 2-3 highlights.`,
        response_json_schema: {
          type: 'object',
          properties: {
            steps: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  targetPage: { type: 'string' },
                  highlights: { type: 'array', items: { type: 'string' } }
                }
              }
            }
          }
        }
      });

      // Add welcome and completion steps
      const fullSteps = [
        defaultSteps[0], // Welcome
        ...result.steps.map(s => ({ ...s, action: `Explore ${s.targetPage}`, position: 'center' })),
        defaultSteps[defaultSteps.length - 1] // Complete
      ];

      setPersonalizedSteps(fullSteps);
      
      base44.analytics.track({
        eventName: 'onboarding_personalized',
        properties: { stepCount: result.steps.length }
      });
    } catch (error) {
      console.error('Personalization failed:', error);
      setPersonalizedSteps(defaultSteps);
    } finally {
      setLoading(false);
    }
  };

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      const updated = [...completedSteps, stepId];
      setCompletedSteps(updated);
      localStorage.setItem('onboarding_progress', JSON.stringify(updated));
    }
  };

  const handleNext = () => {
    const currentStepData = steps[currentStep];
    markStepComplete(currentStepData.id);

    if (currentStep === steps.length - 1) {
      localStorage.setItem('onboarding_completed', 'true');
      setShowOnboarding(false);
      if (onComplete) onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAction = () => {
    const step = steps[currentStep];
    markStepComplete(step.id);
    
    if (step.targetPage) {
      navigate(createPageUrl(step.targetPage));
      setShowOnboarding(false);
    } else {
      handleNext();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_dismissed', 'true');
    setShowOnboarding(false);
    if (onComplete) onComplete();
  };

  // Add floating button to re-open onboarding
  if (!showOnboarding) {
    const onboardingComplete = localStorage.getItem('onboarding_completed');
    const onboardingDismissed = localStorage.getItem('onboarding_dismissed');
    
    // Don't show button if completed
    if (onboardingComplete) return null;
    
    return (
      <button
        onClick={() => setShowOnboarding(true)}
        className="fixed bottom-24 right-6 w-12 h-12 bg-gradient-to-r from-int-orange to-int-navy rounded-full shadow-lg hover:shadow-glow transition-all flex items-center justify-center z-40 group"
        title="Start guided tour"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </button>
    );
  }

  const steps = personalizedSteps || defaultSteps;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (loading) {
    return (
      <div className="fixed bottom-24 right-6 w-12 h-12 bg-gradient-to-r from-int-orange to-int-navy rounded-full shadow-lg flex items-center justify-center z-40">
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-int-orange to-int-navy transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-int-orange" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
                  <div className="text-sm text-slate-400 mt-1">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Skip tour"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Highlights */}
            {currentStepData.highlights && (
              <div className="mb-6 space-y-2">
                {currentStepData.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Video Preview */}
            {currentStepData.videoUrl && (
              <div className="mb-6 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                {playingVideo === currentStepData.id ? (
                  <div className="aspect-video flex items-center justify-center">
                    <iframe
                      src={currentStepData.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${currentStepData.title} tutorial`}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setPlayingVideo(currentStepData.id)}
                    className="w-full aspect-video flex flex-col items-center justify-center gap-3 hover:bg-slate-700 transition-all group"
                  >
                    <div className="w-16 h-16 bg-int-orange/20 rounded-full flex items-center justify-center group-hover:bg-int-orange/30 transition-all">
                      <Play className="w-8 h-8 text-int-orange ml-1" />
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                      Watch 30s demo video
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Completion Badge for Final Step */}
            {currentStep === steps.length - 1 && (
              <div className="mb-6 p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                <div className="text-lg font-semibold text-green-400 mb-2">Onboarding Complete!</div>
                <div className="text-sm text-slate-300">
                  You've unlocked all core features. Check your dashboard for personalized recommendations.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentStep
                        ? 'bg-int-orange w-6'
                        : i < currentStep
                        ? 'bg-green-400'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {currentStep < steps.length - 1 && (
                  <button
                    onClick={handleSkip}
                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                  >
                    Skip Tour
                  </button>
                )}
                <button
                  onClick={handleAction}
                  className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold text-white hover:shadow-glow transition-all flex items-center gap-2"
                >
                  {currentStepData.action}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </>
  );
}