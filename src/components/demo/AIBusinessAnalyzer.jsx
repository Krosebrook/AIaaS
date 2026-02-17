import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

export default function AIBusinessAnalyzer() {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setAnalyzing(true);
    try {
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI business consultant. Analyze this business challenge and provide actionable recommendations:

Challenge: "${input}"

Provide a JSON response with:
1. challengeType: categorize the challenge (e.g., "Operational Efficiency", "Cost Reduction", "Revenue Growth")
2. keyIssues: array of 2-3 root problems identified
3. aiOpportunities: array of 2-3 specific AI solutions that could address this
4. expectedImpact: brief description of potential outcomes
5. implementationComplexity: "Low" | "Medium" | "High"
6. estimatedTimeline: realistic timeline (e.g., "2-3 months")
7. nextSteps: array of 2-3 immediate actions to take`,
        response_json_schema: {
          type: 'object',
          properties: {
            challengeType: { type: 'string' },
            keyIssues: { type: 'array', items: { type: 'string' } },
            aiOpportunities: { type: 'array', items: { type: 'string' } },
            expectedImpact: { type: 'string' },
            implementationComplexity: { type: 'string' },
            estimatedTimeline: { type: 'string' },
            nextSteps: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      setResults(analysis);
      base44.analytics.track({
        eventName: 'demo_ai_analyzer_used',
        properties: { challenge_type: analysis.challengeType }
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-3 text-signal-white">
          Describe Your Business Challenge
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: Our customer support team spends 15 hours per week answering repetitive questions about product features and pricing..."
          rows="4"
          className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white placeholder-signal-white/40 focus:outline-none focus:border-int-orange transition-colors resize-none"
        />
        <p className="text-xs text-signal-white/50 mt-2">
          Powered by live AI - your input is analyzed in real-time
        </p>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!input.trim() || analyzing}
        className="w-full px-6 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {analyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            AI is analyzing your challenge...
          </>
        ) : (
          <>
            <Lightbulb className="w-5 h-5" />
            Analyze with AI
          </>
        )}
      </button>

      {results && (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-int-orange mb-2">{results.challengeType}</h3>
                <p className="text-signal-white/80">{results.expectedImpact}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getComplexityColor(results.implementationComplexity)}`}>
                {results.implementationComplexity} Complexity
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-signal-white/60">
              <TrendingUp className="w-4 h-4" />
              Estimated Timeline: {results.estimatedTimeline}
            </div>
          </div>

          {/* Key Issues */}
          <div className="p-6 bg-carbon-night rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <h4 className="font-bold text-white">Key Issues Identified</h4>
            </div>
            <ul className="space-y-2">
              {results.keyIssues.map((issue, i) => (
                <li key={i} className="flex gap-2 text-signal-white/80">
                  <span className="text-orange-400 flex-shrink-0">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* AI Opportunities */}
          <div className="p-6 bg-carbon-night rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-int-teal" />
              <h4 className="font-bold text-white">AI Solutions Recommended</h4>
            </div>
            <ul className="space-y-3">
              {results.aiOpportunities.map((opportunity, i) => (
                <li key={i} className="p-3 bg-int-teal/10 border border-int-teal/30 rounded-lg">
                  <div className="flex gap-2">
                    <span className="text-int-teal font-bold flex-shrink-0">{i + 1}.</span>
                    <span className="text-signal-white/90">{opportunity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="p-6 bg-carbon-night rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-int-orange" />
              <h4 className="font-bold text-white">Your Next Steps</h4>
            </div>
            <ol className="space-y-3">
              {results.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-int-orange/20 rounded-full flex items-center justify-center text-sm font-bold text-int-orange">
                    {i + 1}
                  </span>
                  <span className="text-signal-white/80 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4 bg-int-navy/10 border border-int-navy/30 rounded-lg text-center">
            <p className="text-sm text-signal-white/80">
              This analysis was generated by AI in real-time. Ready to explore custom solutions for your business?
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}