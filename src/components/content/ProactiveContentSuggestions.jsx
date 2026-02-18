import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, Lightbulb, Bell, X } from 'lucide-react';

/**
 * Proactive Content Suggestions Widget
 * Suggests new content ideas based on industry trends and engagement patterns
 */
export default function ProactiveContentSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState([]);
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    const lastCheck = localStorage.getItem('last_content_suggestions_check');
    const now = Date.now();
    const hoursSinceLastCheck = lastCheck ? (now - parseInt(lastCheck)) / (1000 * 60 * 60) : 24;

    // Check for new suggestions every 6 hours
    if (hoursSinceLastCheck >= 6) {
      generateSuggestions();
    } else {
      loadCachedSuggestions();
    }
  }, []);

  const loadCachedSuggestions = () => {
    try {
      const cached = localStorage.getItem('content_suggestions');
      if (cached && cached !== 'undefined' && cached !== 'null') {
        setSuggestions(JSON.parse(cached));
      }
    } catch (error) {
      console.error('Failed to load cached suggestions:', error);
      localStorage.removeItem('content_suggestions');
    }
  };

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      // Analyze engagement patterns
      const engagementData = {
        visitedPages: JSON.parse(localStorage.getItem('visited_pages') || '[]'),
        downloadedResources: JSON.parse(localStorage.getItem('downloaded_resources') || '[]'),
        completedAssessments: localStorage.getItem('ai_assessment_results') !== null,
        bookedWorkshops: JSON.parse(localStorage.getItem('booked_workshops') || '[]')
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a content strategist for INTinc.com. Analyze current AI industry trends and user engagement to proactively suggest NEW content that should be created.

Current Date: February 2026

User Engagement Patterns:
- Pages Visited: ${engagementData.visitedPages.slice(-20).join(', ')}
- Resources Downloaded: ${engagementData.downloadedResources.length} items
- Completed Assessment: ${engagementData.completedAssessments}
- Booked Workshops: ${engagementData.bookedWorkshops.length}

Using web search, analyze:
1. Latest AI trends, regulations, and technologies
2. Common questions enterprises are asking about AI
3. Gaps in current AI consulting content
4. Emerging use cases and success stories

Suggest 3-4 NEW pieces of content INTinc should create:
- Blog posts addressing current challenges
- Whitepapers on emerging topics
- Case studies from trending industries
- Guides for new AI regulations/tools

Each suggestion should:
- Address a current market need
- Be timely and relevant
- Have clear business value`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            suggestions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  title: { type: 'string' },
                  reason: { type: 'string' },
                  trending: { type: 'boolean' },
                  estimatedInterest: { type: 'string' }
                }
              }
            }
          }
        }
      });

      setSuggestions(result.suggestions);
      localStorage.setItem('content_suggestions', JSON.stringify(result.suggestions));
      localStorage.setItem('last_content_suggestions_check', Date.now().toString());

      base44.analytics.track({
        eventName: 'proactive_content_suggestions_generated',
        properties: { count: result.suggestions.length }
      });
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissSuggestion = (index) => {
    setDismissed([...dismissed, index]);
    base44.analytics.track({
      eventName: 'content_suggestion_dismissed',
      properties: { suggestion: suggestions[index]?.title }
    });
  };

  const activeSuggestions = suggestions.filter((_, i) => !dismissed.includes(i));

  if (!showWidget || activeSuggestions.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] z-40">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl shadow-2xl">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-int-orange/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-int-orange" />
            </div>
            <div>
              <div className="font-bold text-white">Content Insights</div>
              <div className="text-xs text-signal-white/60">Based on industry trends</div>
            </div>
          </div>
          <button
            onClick={() => setShowWidget(false)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-signal-white/60" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8 text-signal-white/60">
              Analyzing trends...
            </div>
          ) : (
            activeSuggestions.map((suggestion, i) => (
              <div
                key={i}
                className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-int-orange/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {suggestion.trending ? (
                      <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-int-orange flex-shrink-0" />
                    )}
                    <div className="text-xs px-2 py-1 bg-int-orange/20 border border-int-orange/30 rounded text-int-orange font-semibold">
                      {suggestion.type}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissSuggestion(i)}
                    className="p-1 hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-signal-white/60" />
                  </button>
                </div>
                
                <div className="font-semibold text-white text-sm mb-2">{suggestion.title}</div>
                <div className="text-xs text-signal-white/70 mb-2">{suggestion.reason}</div>
                
                {suggestion.estimatedInterest && (
                  <div className="text-xs text-int-teal">
                    Interest Level: {suggestion.estimatedInterest}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-slate-700 flex gap-2">
          <button
            onClick={generateSuggestions}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-int-orange hover:bg-int-orange/80 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
          >
            Refresh Insights
          </button>
        </div>
      </div>
    </div>
  );
}