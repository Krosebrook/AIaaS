import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Sparkles, BookOpen, Zap, TrendingUp } from 'lucide-react';

export function useRecommendations(userProfile) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    if (!userProfile || !userProfile.visitedPages || userProfile.visitedPages.length === 0) {
      return null;
    }

    setLoading(true);
    try {
      const exploredSolutionsSummary = userProfile.exploredSolutions?.length > 0 
        ? userProfile.exploredSolutions.map(s => s.name).join(', ')
        : 'none';

      const assessmentSummary = userProfile.assessmentResults 
        ? `Industry: ${userProfile.industry}, Readiness: ${userProfile.readinessLevel}`
        : 'no assessment taken';

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI solution recommendation expert. Generate personalized recommendations for a prospective customer based on their engagement.

User Behavior:
- Pages visited: ${userProfile.visitedPages.join(', ')}
- Solutions explored: ${exploredSolutionsSummary}
- Assessment results: ${assessmentSummary}
- Tracked interests: ${userProfile.interests.join(', ') || 'general interest in AI'}

Based on this profile, provide JSON with:
1. recommendedSolutions: array of 3 solution names most relevant to them
2. caseStudiesToRead: array of 3 case study titles aligned to their industry/interests
3. resourcesAndWhitepapers: array of 3 resource recommendations (titles and brief descriptions)
4. nextSteps: array of 3 actionable next steps
5. personalizationSummary: brief explanation of why these recommendations fit their profile

Focus on practical, high-value recommendations. Ensure case studies and resources align with the user's industry and readiness level.`,
        response_json_schema: {
          type: 'object',
          properties: {
            recommendedSolutions: { type: 'array', items: { type: 'string' } },
            caseStudiesToRead: { type: 'array', items: { type: 'string' } },
            resourcesAndWhitepapers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  type: { type: 'string', enum: ['whitepaper', 'blog', 'guide', 'report'] }
                }
              }
            },
            nextSteps: { type: 'array', items: { type: 'string' } },
            personalizationSummary: { type: 'string' }
          }
        }
      });

      setRecommendations(result);
      localStorage.setItem('recommendations', JSON.stringify(result));
      return result;
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { 
    recommendations, 
    loading, 
    generateRecommendations 
  };
}

export default function RecommendationWidget({ recommendations, onExplore, loading }) {
  if (!recommendations) {
    return null;
  }

  const icons = {
    solution: Zap,
    caseStudy: TrendingUp,
    resource: BookOpen
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-int-orange" />
        <h3 className="text-xl font-bold text-white">Personalized for You</h3>
      </div>

      <p className="text-slate-400 mb-6 text-sm">{recommendations.personalizationSummary}</p>

      {/* Recommended Solutions */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-int-orange mb-3">SUGGESTED SOLUTIONS</h4>
        <div className="space-y-2">
          {recommendations.recommendedSolutions.map((solution, i) => (
            <div key={i} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="text-sm font-medium text-white">{solution}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-int-orange mb-3">RELEVANT CASE STUDIES</h4>
        <div className="space-y-2">
          {recommendations.caseStudiesToRead.map((study, i) => (
            <button
              key={i}
              onClick={() => onExplore?.('caseStudy', study)}
              className="w-full text-left p-3 bg-slate-800/50 border border-slate-700 hover:border-int-orange rounded-lg transition-all text-sm font-medium text-white hover:text-int-orange"
            >
              {study}
            </button>
          ))}
        </div>
      </div>

      {/* Resources & Whitepapers */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-int-orange mb-3">WHITEPAPERS & RESOURCES</h4>
        <div className="space-y-2">
          {recommendations.resourcesAndWhitepapers.map((resource, i) => (
            <div
              key={i}
              className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg"
            >
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-int-orange flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{resource.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{resource.description}</div>
                  <div className="text-xs text-int-orange/60 mt-2 uppercase font-semibold">{resource.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-int-navy/20 border border-int-navy/30 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-3">RECOMMENDED NEXT STEPS</h4>
        <ol className="space-y-2">
          {recommendations.nextSteps.map((step, i) => (
            <li key={i} className="text-sm text-slate-300 flex gap-3">
              <span className="text-int-orange font-bold flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}