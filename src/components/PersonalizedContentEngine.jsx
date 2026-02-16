import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { usePersonalization } from './PersonalizationEngine';
import { useBehaviorAnalytics } from './BehaviorAnalytics';
import { Sparkles } from 'lucide-react';

export function usePersonalizedContent(pageName) {
  const { userProfile, getUserPreferences } = usePersonalization();
  const { getUserJourney } = useBehaviorAnalytics();
  const [personalizedContent, setPersonalizedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generatePersonalization = async () => {
      if (!userProfile || userProfile.visitedPages.length < 2) return;

      setLoading(true);
      try {
        const journey = getUserJourney();
        const preferences = getUserPreferences();

        const result = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate personalized content for a user viewing the ${pageName} page.

User Profile:
- Journey Stage: ${journey.currentStage}
- Top Interests: ${journey.topInterests.join(', ') || 'General'}
- Engagement Score: ${journey.engagementScore}
- Visited Pages: ${userProfile.visitedPages.join(', ')}
- Explicit Preferences: ${JSON.stringify(preferences)}

Based on their behavior, provide:
1. Personalized headline (engaging, relevant to their interests)
2. Personalized subheadline (addresses their stage in journey)
3. Recommended next action (what they should do next)
4. Content emphasis (which topics to highlight)
5. Tone adjustment (formal/casual based on their engagement)

Make it feel tailored specifically to this user's needs and journey.`,
          response_json_schema: {
            type: "object",
            properties: {
              headline: { type: "string" },
              subheadline: { type: "string" },
              nextAction: { type: "string" },
              contentEmphasis: { type: "array", items: { type: "string" } },
              tone: { type: "string" }
            }
          }
        });

        setPersonalizedContent(result);
      } catch (error) {
        console.error('Personalization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    generatePersonalization();
  }, [pageName, userProfile.visitedPages.length]);

  return { personalizedContent, loading };
}

export function PersonalizedContentBanner({ pageName }) {
  const { personalizedContent, loading } = usePersonalizedContent(pageName);

  if (loading || !personalizedContent) return null;

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-int-navy/20 to-int-orange/20 rounded-xl border border-int-orange/30">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-int-orange flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold mb-2 text-int-orange">{personalizedContent.headline}</h3>
          <p className="text-signal-white/80 mb-3">{personalizedContent.subheadline}</p>
          <div className="inline-block px-4 py-2 bg-int-orange/20 border border-int-orange/30 rounded-lg text-sm font-semibold">
            {personalizedContent.nextAction}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonalizedContentHighlights({ pageName }) {
  const { personalizedContent } = usePersonalizedContent(pageName);

  if (!personalizedContent || !personalizedContent.contentEmphasis) return null;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-int-navy mb-3">Recommended for You</h4>
      <div className="flex flex-wrap gap-2">
        {personalizedContent.contentEmphasis.map((topic, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-int-teal/20 border border-int-teal/30 rounded-full text-sm font-medium text-int-teal"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}