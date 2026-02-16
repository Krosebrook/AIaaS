import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Loader2 } from 'lucide-react';

export default function DynamicSuggestions({ currentStep, previousResponses }) {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSuggestions();
  }, [currentStep, previousResponses]);

  const generateSuggestions = async () => {
    if (!currentStep || Object.keys(previousResponses).length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const contextSummary = Object.entries(previousResponses)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI strategy expert. Based on the user's previous responses, provide intelligent suggestions for their next choice about "${currentStep.title}".

User Context:
${contextSummary}

Available options:
${currentStep.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

Provide a JSON response with:
1. topRecommendation: the single best option (exact match from list)
2. recommendations: array of top 2 options (ordered by fit)
3. reasoning: brief explanation of why these fit their profile
4. warningNote: (optional) any concerns to consider
5. relatedTip: a practical tip related to this decision`,
        response_json_schema: {
          type: 'object',
          properties: {
            topRecommendation: { type: 'string' },
            recommendations: { type: 'array', items: { type: 'string' } },
            reasoning: { type: 'string' },
            warningNote: { type: 'string' },
            relatedTip: { type: 'string' }
          }
        }
      });

      setSuggestions(result);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !suggestions) {
    return (
      <div className="p-4 bg-int-orange/10 border border-int-orange/30 rounded-lg flex items-center gap-3">
        <Loader2 className="w-4 h-4 text-int-orange animate-spin flex-shrink-0" />
        <span className="text-sm text-slate-400">Analyzing your profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-int-orange/20 to-int-navy/20 border border-int-orange/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-int-orange flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">AI Recommendation</div>
            <div className="text-sm text-slate-300 mb-2">{suggestions.reasoning}</div>
            <div className="p-2 bg-slate-800/50 border border-int-orange/20 rounded text-sm font-medium text-int-orange">
              → {suggestions.topRecommendation}
            </div>
            {suggestions.relatedTip && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                💡 <span className="font-semibold">Tip:</span> {suggestions.relatedTip}
              </div>
            )}
            {suggestions.warningNote && (
              <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-300">
                ⚠️ <span className="font-semibold">Note:</span> {suggestions.warningNote}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}