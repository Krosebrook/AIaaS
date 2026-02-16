import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, X, Sparkles } from 'lucide-react';
import { useOnboarding } from './useOnboarding';

export default function OnboardingChecklist() {
  const { checklist, completeTask, isChecklistComplete, dismissChecklist, showChecklist } = useOnboarding();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!showChecklist || isChecklistComplete()) return null;

  const completedCount = checklist.filter(task => task.completed).length;
  const progressPercent = (completedCount / checklist.length) * 100;

  return (
    <div className={`fixed bottom-6 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-96'
    }`}>
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center relative"
          aria-label="Expand onboarding checklist"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-int-orange to-int-navy rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-int-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
            {completedCount}
          </div>
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-int-orange to-int-navy rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Get Started</h3>
                  <p className="text-sm text-slate-600">{completedCount} of {checklist.length} completed</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Minimize checklist"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={dismissChecklist}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Dismiss checklist"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-int-orange to-int-navy transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Tasks */}
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {checklist.map((task) => (
              <button
                key={task.id}
                onClick={() => !task.completed && completeTask(task.id)}
                disabled={task.completed}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  task.completed
                    ? 'border-green-200 bg-green-50 opacity-75'
                    : 'border-slate-200 hover:border-int-orange hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      task.completed ? 'text-green-900 line-through' : 'text-slate-900'
                    }`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-slate-600">{task.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          {isChecklistComplete() && (
            <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="text-center">
                <h4 className="font-bold text-green-900 mb-1">🎉 All Done!</h4>
                <p className="text-sm text-green-800">You're all set to use the platform.</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}