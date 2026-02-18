import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { CheckCircle, Circle, ChevronRight, Trophy, X, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * Onboarding Progress Checklist
 * Sticky widget showing user progress through key features
 */
export default function OnboardingProgressChecklist() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState({
    completedSteps: [],
    onboardingComplete: false
  });
  const [personalizedTasks, setPersonalizedTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultTasks = [
    {
      id: 'view_home',
      title: 'Explore the Homepage',
      description: 'Learn about our AI services',
      page: 'Home',
      auto: true
    },
    {
      id: 'try_content_generator',
      title: 'Try Content Generator',
      description: 'Create AI-powered content',
      page: 'ContentGenerator'
    },
    {
      id: 'run_gap_analysis',
      title: 'Run Gap Analysis',
      description: 'Discover content opportunities',
      page: 'ContentStrategy'
    },
    {
      id: 'view_workshops',
      title: 'Explore Workshops',
      description: 'See our training programs',
      page: 'Workshops'
    },
    {
      id: 'check_dashboard',
      title: 'Visit Your Dashboard',
      description: 'View personalized recommendations',
      page: 'PersonalizedDashboard'
    },
    {
      id: 'take_assessment',
      title: 'Take AI Readiness Assessment',
      description: 'Get personalized insights',
      page: 'AIReadinessAssessment'
    }
  ];

  useEffect(() => {
    const initialize = async () => {
      // Load progress
      const completed = JSON.parse(localStorage.getItem('onboarding_progress') || '[]');
      const onboardingComplete = localStorage.getItem('onboarding_completed') === 'true';
      const checklistDismissed = localStorage.getItem('checklist_dismissed') === 'true';
      
      setProgress({
        completedSteps: completed,
        onboardingComplete
      });

      // Start minimized by default
      if (checklistDismissed || onboardingComplete) {
        setIsOpen(false);
      } else {
        setIsMinimized(true);
      }

      // Personalize tasks
      await personalizeTasks();
    };

    initialize();

    // Auto-track page visits
    const visitedPages = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!visitedPages.includes(currentPage)) {
      visitedPages.push(currentPage);
      localStorage.setItem('visited_pages', JSON.stringify(visitedPages));
    }

    // Mark auto-tracked tasks
    const completed = JSON.parse(localStorage.getItem('onboarding_progress') || '[]');
    tasks.forEach(task => {
      if (task.auto && visitedPages.includes(task.page) && !completed.includes(task.id)) {
        completed.push(task.id);
        localStorage.setItem('onboarding_progress', JSON.stringify(completed));
      }
    });

    // Listen for storage changes
    window.addEventListener('storage', initialize);
    return () => window.removeEventListener('storage', initialize);
  }, []);

  const personalizeTasks = async () => {
    try {
      const assessmentData = localStorage.getItem('ai_assessment_results');
      const userProfile = localStorage.getItem('user_profile');
      
      if (!assessmentData && !userProfile) {
        setPersonalizedTasks(defaultTasks);
        setLoading(false);
        return;
      }

      let context = {};
      if (assessmentData) {
        const data = JSON.parse(assessmentData);
        context.readinessLevel = data.readinessLevel;
        context.recommendedServices = data.recommendedServices;
      }
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        context.role = profile.role;
        context.interests = profile.interests;
      }

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Create 5-6 personalized onboarding tasks for an INTinc.com user.

User Context: ${JSON.stringify(context)}

Available pages: Home, ContentGenerator, ContentStrategy, Workshops, PersonalizedDashboard, AIReadinessAssessment, AIUseCaseExplorer, RoadmapGenerator

Create tasks that:
1. Match their readiness level and role
2. Build progressively from basic to advanced
3. Focus on their recommended services/interests
4. Have clear value propositions

Each task needs: id, title (action-oriented), description (why it matters to them), page`,
        response_json_schema: {
          type: 'object',
          properties: {
            tasks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  page: { type: 'string' }
                }
              }
            }
          }
        }
      });

      setPersonalizedTasks(result.tasks);
      
      base44.analytics.track({
        eventName: 'checklist_personalized',
        properties: { taskCount: result.tasks.length }
      });
    } catch (error) {
      console.error('Task personalization failed:', error);
      setPersonalizedTasks(defaultTasks);
    } finally {
      setLoading(false);
    }
  };

  const tasks = personalizedTasks || defaultTasks;
  const completedCount = progress.completedSteps.length;
  const totalCount = tasks.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);
  const isComplete = completedCount === totalCount;

  const handleTaskClick = (task) => {
    navigate(createPageUrl(task.page));
    setIsMinimized(true);
  };

  const handleDismiss = () => {
    localStorage.setItem('checklist_dismissed', 'true');
    setIsOpen(false);
  };

  const handleReset = () => {
    localStorage.removeItem('onboarding_progress');
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('checklist_dismissed');
    setProgress({ completedSteps: [], onboardingComplete: false });
    setIsOpen(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-int-orange to-int-navy rounded-full shadow-lg flex items-center justify-center z-50">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-int-orange to-int-navy rounded-full shadow-lg hover:shadow-glow transition-all flex items-center justify-center z-50 group"
        style={{
          width: `${Math.max(56, 56 + percentComplete * 0.3)}px`,
          height: `${Math.max(56, 56 + percentComplete * 0.3)}px`
        }}
        title="Show onboarding checklist"
      >
        <div className="relative">
          <Trophy className="w-6 h-6 text-white" />
          {completedCount > 0 && completedCount < totalCount && (
            <span className="absolute -top-2 -right-2 bg-green-400 rounded-full text-xs font-bold flex items-center justify-center text-black animate-pulse"
              style={{
                width: `${16 + percentComplete * 0.1}px`,
                height: `${16 + percentComplete * 0.1}px`,
                fontSize: `${10 + percentComplete * 0.05}px`
              }}
            >
              {completedCount}
            </span>
          )}
          {isComplete && (
            <span className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
          )}
        </div>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-lg px-4 py-3 shadow-xl hover:shadow-glow transition-all flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-int-orange" />
            <div className="text-white font-semibold text-sm">
              {completedCount}/{totalCount} Complete
            </div>
          </div>
          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-int-orange/20 rounded-full flex items-center justify-center">
            {isComplete ? (
              <Trophy className="w-5 h-5 text-green-400" />
            ) : (
              <Trophy className="w-5 h-5 text-int-orange" />
            )}
          </div>
          <div>
            <div className="font-bold text-white">Getting Started</div>
            <div className="text-xs text-slate-400">
              {completedCount} of {totalCount} completed
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Minimize"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-slate-800/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">Your Progress</span>
          <span className="text-xs font-bold text-int-orange">{percentComplete}%</span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-int-orange to-green-400 transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task) => {
          const isCompleted = progress.completedSteps.includes(task.id);
          return (
            <button
              key={task.id}
              onClick={() => !isCompleted && handleTaskClick(task)}
              className={`w-full p-3 rounded-lg border transition-all text-left ${
                isCompleted
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-slate-800/50 border-slate-700 hover:border-int-orange/50 hover:bg-slate-800'
              }`}
              disabled={isCompleted}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm mb-1 ${
                    isCompleted ? 'text-green-400 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    {task.description}
                  </div>
                </div>
                {!isCompleted && (
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-t border-green-500/30">
          <div className="text-center">
            <div className="text-green-400 font-bold mb-1">🎉 Congratulations!</div>
            <div className="text-xs text-slate-300 mb-3">
              You've completed all onboarding tasks
            </div>
            <button
              onClick={handleDismiss}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-semibold transition-all"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}

      {/* Reset Option (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-2 border-t border-slate-700">
          <button
            onClick={handleReset}
            className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Reset Progress (Dev Only)
          </button>
        </div>
      )}

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}