import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronRight } from 'lucide-react';

export default function ProjectWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      phase: 'Discovery',
      title: 'Initial Assessment & Planning',
      duration: 'Week 1-2',
      activities: [
        'Security and compliance audit',
        'Infrastructure assessment',
        'Use case identification workshop',
        'Risk analysis and mitigation planning'
      ],
      deliverable: 'AI Readiness Report with prioritized opportunities',
      metric: 'Identified 12 high-value automation opportunities'
    },
    {
      phase: 'Harden',
      title: 'Proof of Concept & Architecture',
      duration: 'Week 3-6',
      activities: [
        'Rapid prototype development',
        'Security architecture design',
        'Governance framework establishment',
        'Technical validation testing'
      ],
      deliverable: 'Working POC with security documentation',
      metric: '87% accuracy on test data, SOC2 compliance verified'
    },
    {
      phase: 'Ship',
      title: 'Production Deployment',
      duration: 'Week 7-10',
      activities: [
        'Full system implementation',
        'Integration with existing tools',
        'Team training and documentation',
        'Monitoring and support setup'
      ],
      deliverable: 'Production AI system with full support',
      metric: '15 hours/week saved, $180K annual cost reduction'
    },
    {
      phase: 'Optimize',
      title: 'Performance Monitoring & Scale',
      duration: 'Ongoing',
      activities: [
        'Performance metrics tracking',
        'Continuous improvement cycles',
        'Feature expansion planning',
        'Team enablement workshops'
      ],
      deliverable: 'Optimization roadmap and ongoing support',
      metric: '300% ROI achieved within 6 months'
    }
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveStep(0);
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Control */}
      <div className="text-center">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="inline-flex items-center gap-2 px-6 py-3 bg-int-orange hover:bg-int-orange/80 rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          {isPlaying ? 'Playing Walkthrough...' : 'Play Success Story'}
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isComplete = index < activeStep;
            
            return (
              <div
                key={index}
                className={`relative pl-20 transition-all duration-500 ${
                  isActive ? 'opacity-100' : isComplete ? 'opacity-70' : 'opacity-40'
                }`}
              >
                {/* Step Indicator */}
                <div className={`absolute left-0 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-int-orange border-int-orange shadow-glow scale-110' 
                    : isComplete 
                    ? 'bg-int-teal border-int-teal' 
                    : 'bg-void border-slate-700'
                }`}>
                  {isComplete ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : isActive ? (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <Circle className="w-8 h-8 text-slate-500" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`p-6 rounded-xl border transition-all ${
                  isActive 
                    ? 'bg-gradient-to-br from-int-orange/10 to-int-navy/10 border-int-orange/50' 
                    : 'bg-carbon-night border-slate-700'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm font-semibold text-int-orange mb-1">{step.phase}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <div className="text-sm text-signal-white/60">{step.duration}</div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-semibold text-signal-white/80 mb-2">Key Activities:</h4>
                        <ul className="space-y-1">
                          {step.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-signal-white/70">
                              <ChevronRight className="w-4 h-4 text-int-teal flex-shrink-0 mt-0.5" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-int-teal/10 border border-int-teal/30 rounded-lg">
                        <div className="text-xs font-semibold text-int-teal mb-1">DELIVERABLE</div>
                        <div className="text-sm text-white">{step.deliverable}</div>
                      </div>

                      <div className="p-4 bg-int-navy/10 border border-int-navy/30 rounded-lg">
                        <div className="text-xs font-semibold text-int-navy mb-1">OUTCOME</div>
                        <div className="text-sm font-bold text-white">{step.metric}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 20px rgba(242,101,34,0.6);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}