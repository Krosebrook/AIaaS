import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export default function StrategyWizard() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [strategy, setStrategy] = useState(null);

  const steps = [
    {
      id: 'intro',
      title: 'Welcome to the AI Strategy Wizard',
      description: 'Let\'s define your AI transformation roadmap',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">In the next 5-10 minutes, we\'ll analyze your business challenges and create a customized AI implementation strategy tailored to your goals.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-white text-sm">Understand Your Needs</div>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold text-white text-sm">AI Analysis</div>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold text-white text-sm">Project Brief</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'business_challenge',
      title: 'What\'s Your Primary Business Challenge?',
      description: 'Help us understand the main pain point you\'re trying to solve',
      options: [
        'Increasing operational efficiency',
        'Improving customer experience',
        'Accelerating decision-making',
        'Reducing costs',
        'Creating new revenue streams',
        'Enhancing risk management'
      ]
    },
    {
      id: 'current_state',
      title: 'Where Are You in Your AI Journey?',
      description: 'Select your current stage of AI adoption',
      options: [
        'Just exploring AI (no implementations)',
        'Piloting with one department',
        'Running multiple pilots',
        'Some production AI in place',
        'Scaled AI across operations'
      ]
    },
    {
      id: 'timeline',
      title: 'What\'s Your Desired Timeline?',
      description: 'When do you want to see results?',
      options: [
        'Quick win (0-3 months)',
        'Short-term (3-6 months)',
        'Medium-term (6-12 months)',
        'Long-term strategy (12+ months)',
        'Flexible - depends on solution'
      ]
    },
    {
      id: 'team_readiness',
      title: 'How\'s Your Team\'s Technical Readiness?',
      description: 'Assess your internal capabilities',
      options: [
        'No AI/ML expertise - need full support',
        'Some data expertise, building ML skills',
        'Experienced data science team',
        'Full AI operations team',
        'Looking to build hybrid (internal + external)'
      ]
    },
    {
      id: 'success_metric',
      title: 'What Does Success Look Like?',
      description: 'Define your primary success metric',
      options: [
        'Revenue increase (ROI)',
        'Cost reduction',
        'Speed/efficiency gains',
        'Better decision-making',
        'Customer satisfaction',
        'Risk mitigation'
      ]
    },
    {
      id: 'budget',
      title: 'What\'s Your Budget Range?',
      description: 'Help us scope the right solution',
      options: [
        'Exploratory (<$100K)',
        'Pilot project ($100K-$500K)',
        'Strategic initiative ($500K-$2M)',
        'Enterprise transformation ($2M+)',
        'To be determined'
      ]
    }
  ];

  const handleResponse = (value) => {
    setResponses(prev => ({
      ...prev,
      [steps[step].id]: value
    }));
  };

  const handleNext = async () => {
    if (step === steps.length - 1) {
      await generateStrategy();
    } else {
      setStep(step + 1);
    }
  };

  const generateStrategy = async () => {
    setAnalyzing(true);
    try {
      const strategyResult = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an enterprise AI strategy consultant. Based on this client profile, create a detailed AI implementation strategy:

Business Challenge: ${responses.business_challenge}
Current AI Stage: ${responses.current_state}
Desired Timeline: ${responses.timeline}
Team Readiness: ${responses.team_readiness}
Success Metric: ${responses.success_metric}
Budget: ${responses.budget}

Generate a JSON response with:
1. recommendedSolution: the top AI solution to implement (one sentence)
2. businessImpact: expected business outcomes (2-3 specific metrics)
3. implementationRoadmap: array of 4-5 phases with names and durations
4. requiredCapabilities: array of 3-4 key team/technology needs
5. estimatedInvestment: realistic cost estimate range
6. riskFactors: array of 2-3 key risks and mitigations
7. successFactors: array of 3-4 critical success factors
8. nextSteps: array of 2-3 immediate actions`,
        response_json_schema: {
          type: 'object',
          properties: {
            recommendedSolution: { type: 'string' },
            businessImpact: { type: 'array', items: { type: 'string' } },
            implementationRoadmap: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  phase: { type: 'string' },
                  duration: { type: 'string' },
                  deliverables: { type: 'array', items: { type: 'string' } }
                }
              }
            },
            requiredCapabilities: { type: 'array', items: { type: 'string' } },
            estimatedInvestment: { type: 'string' },
            riskFactors: { type: 'array', items: { type: 'string' } },
            successFactors: { type: 'array', items: { type: 'string' } },
            nextSteps: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      setStrategy(strategyResult);
      setStep(steps.length);
    } catch (error) {
      console.error('Strategy generation failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const currentStep = steps[step];
  const isAnswered = responses[currentStep?.id];

  if (strategy) {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
          <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            Your AI Strategy is Ready
          </h1>
          <p className="text-slate-300">Here's your customized implementation roadmap</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h2 className="text-2xl font-bold text-int-orange mb-4">Recommended Solution</h2>
            <p className="text-slate-300 text-lg">{strategy.recommendedSolution}</p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Expected Impact</h2>
            <ul className="space-y-2">
              {strategy.businessImpact.map((impact, i) => (
                <li key={i} className="text-slate-300 flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {impact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-6">Implementation Roadmap</h2>
          <div className="space-y-6">
            {strategy.implementationRoadmap.map((phase, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-2 w-4 h-4 bg-int-orange rounded-full border-4 border-slate-900" />
                {i < strategy.implementationRoadmap.length - 1 && (
                  <div className="absolute left-1.5 top-6 w-0.5 h-16 bg-int-orange/30" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{phase.phase}</h3>
                  <p className="text-sm text-slate-400 mb-2">Duration: {phase.duration}</p>
                  <ul className="space-y-1">
                    {phase.deliverables.map((d, j) => (
                      <li key={j} className="text-slate-300 text-sm">• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Required Capabilities</h3>
            <ul className="space-y-2">
              {strategy.requiredCapabilities.map((cap, i) => (
                <li key={i} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-blue-400">→</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Success Factors</h3>
            <ul className="space-y-2">
              {strategy.successFactors.map((factor, i) => (
                <li key={i} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-purple-400">→</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Investment & Risks</h3>
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-1">Estimated Investment Range</p>
            <p className="text-xl font-semibold text-white">{strategy.estimatedInvestment}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Key Risk Factors</p>
            <ul className="space-y-1">
              {strategy.riskFactors.map((risk, i) => (
                <li key={i} className="text-slate-300 text-sm">• {risk}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
          <h3 className="text-lg font-semibold text-green-400 mb-4">Immediate Next Steps</h3>
          <ol className="space-y-2">
            {strategy.nextSteps.map((step, i) => (
              <li key={i} className="text-slate-300 text-sm flex gap-3">
                <span className="text-green-400 font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="p-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-3">Ready to Get Started?</h3>
          <p className="text-slate-300 mb-4">Let's schedule a consultation with our AI strategy team to discuss your implementation roadmap in detail.</p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">{currentStep.title}</h1>
          <span className="text-sm font-semibold text-slate-400">
            {step + 1} / {steps.length}
          </span>
        </div>
        <p className="text-slate-400 mb-6">{currentStep.description}</p>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-int-orange to-int-navy h-full rounded-full transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl">
        {currentStep.content || (
          <div className="space-y-3">
            {currentStep.options.map(option => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  responses[currentStep.id] === option
                    ? 'bg-int-orange/20 border-int-orange text-white font-semibold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-int-orange/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isAnswered || analyzing}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : step === steps.length - 1 ? (
            <>
              Generate Strategy
              <CheckCircle className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}