import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { TrendingUp, BookOpen, Users, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

export function useSmartRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      // Gather user behavior data
      const visitedPages = JSON.parse(localStorage.getItem('visited_pages') || '[]');
      const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
      const assessmentResults = JSON.parse(localStorage.getItem('ai_assessment_results') || 'null');
      const downloadedResources = JSON.parse(localStorage.getItem('downloaded_resources') || '[]');
      const exploreHistory = JSON.parse(localStorage.getItem('explored_solutions') || '[]');

      // Call AI to generate recommendations
      const recs = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI content recommendation engine for INTinc.com, an AI consulting company.

User Behavior Data:
- Visited Pages: ${visitedPages.slice(-10).join(', ')}
- Interests: ${userProfile.interests?.join(', ') || 'None'}
- Assessment Results: ${assessmentResults ? JSON.stringify(assessmentResults) : 'Not completed'}
- Downloaded Resources: ${downloadedResources.join(', ')}
- Explored Solutions: ${exploreHistory.join(', ')}

Available Content Types:
1. Resources: "AI Strategy Whitepaper", "Security Best Practices Guide", "ROI Calculator Guide", "Compliance Checklist"
2. Workshops: "AI Discovery Workshop", "Technical Bootcamp", "Use Case Ideation"
3. Consulting Services: "AI Strategy Development", "Custom AI Solution Design", "AI Governance Frameworks", "ML Operations"
4. Case Studies: Filter by industry or service type

Based on this user's behavior, recommend 3-4 pieces of content that would be most valuable to them RIGHT NOW.

Return JSON with:
- recommendations: array of objects with:
  - type: "resource" | "workshop" | "service" | "case_study"
  - title: string
  - reason: brief explanation why this is relevant
  - priority: "high" | "medium" | "low"
  - cta: call to action text`,
        response_json_schema: {
          type: 'object',
          properties: {
            recommendations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  title: { type: 'string' },
                  reason: { type: 'string' },
                  priority: { type: 'string' },
                  cta: { type: 'string' }
                }
              }
            }
          }
        }
      });

      setRecommendations(recs.recommendations);
      
      // Track that recommendations were generated
      base44.analytics.track({
        eventName: 'recommendations_generated',
        properties: { count: recs.recommendations.length }
      });
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, refresh: generateRecommendations };
}

export default function SmartRecommendations({ compact = false, limit = 4 }) {
  const { recommendations, loading } = useSmartRecommendations();

  const getIcon = (type) => {
    switch (type) {
      case 'resource': return BookOpen;
      case 'workshop': return Users;
      case 'service': return Briefcase;
      case 'case_study': return TrendingUp;
      default: return Sparkles;
    }
  };

  const getLink = (rec) => {
    switch (rec.type) {
      case 'resource': return createPageUrl('Resources');
      case 'workshop': return createPageUrl('Workshops');
      case 'service': return createPageUrl('AIConsultingServices');
      case 'case_study': return createPageUrl('CaseStudies');
      default: return createPageUrl('Home');
    }
  };

  const handleClick = (rec) => {
    base44.analytics.track({
      eventName: 'recommendation_clicked',
      properties: {
        type: rec.type,
        title: rec.title,
        priority: rec.priority
      }
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(compact ? 2 : 3)].map((_, i) => (
          <div key={i} className="h-24 bg-carbon-night rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const displayRecs = recommendations.slice(0, limit);

  if (compact) {
    return (
      <div className="space-y-3">
        {displayRecs.map((rec, i) => {
          const Icon = getIcon(rec.type);
          return (
            <Link
              key={i}
              to={getLink(rec)}
              onClick={() => handleClick(rec)}
              className="block p-4 bg-carbon-night hover:bg-carbon-night/80 border border-int-orange/20 hover:border-int-orange/50 rounded-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-int-orange flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1 group-hover:text-int-orange transition-colors">
                    {rec.title}
                  </div>
                  <div className="text-xs text-signal-white/60 line-clamp-2">
                    {rec.reason}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-int-orange/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-int-orange" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Recommended For You</h3>
          <p className="text-sm text-signal-white/60">Based on your activity</p>
        </div>
      </div>

      <div className="grid gap-4">
        {displayRecs.map((rec, i) => {
          const Icon = getIcon(rec.type);
          const isPriority = rec.priority === 'high';

          return (
            <Link
              key={i}
              to={getLink(rec)}
              onClick={() => handleClick(rec)}
              className={`block p-6 rounded-xl border transition-all group ${
                isPriority
                  ? 'bg-gradient-to-br from-int-orange/10 to-int-navy/10 border-int-orange/50 hover:border-int-orange'
                  : 'bg-carbon-night border-slate-700 hover:border-int-navy'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isPriority ? 'bg-int-orange/20' : 'bg-slate-800'
                }`}>
                  <Icon className={`w-6 h-6 ${isPriority ? 'text-int-orange' : 'text-slate-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold group-hover:text-int-orange transition-colors">
                      {rec.title}
                    </h4>
                    {isPriority && (
                      <span className="px-2 py-1 bg-int-orange/20 border border-int-orange/30 rounded text-xs font-semibold text-int-orange flex-shrink-0">
                        Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-signal-white/80 mb-3">{rec.reason}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-int-orange">
                    {rec.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}