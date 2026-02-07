import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export function useBehaviorAnalytics() {
  const [userBehavior, setUserBehavior] = useState({
    sessionStart: Date.now(),
    pageViews: [],
    timeOnPages: {},
    interactions: [],
    interests: new Set(),
    visitCount: 0
  });

  useEffect(() => {
    // Load existing behavior data
    const saved = localStorage.getItem('behaviorData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserBehavior({
        ...parsed,
        interests: new Set(parsed.interests),
        sessionStart: Date.now()
      });
    }

    // Track visit count
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());
    setUserBehavior(prev => ({ ...prev, visitCount }));
  }, []);

  const trackPageView = (pageName, duration) => {
    setUserBehavior(prev => {
      const updated = {
        ...prev,
        pageViews: [...prev.pageViews, { page: pageName, timestamp: Date.now(), duration }],
        timeOnPages: {
          ...prev.timeOnPages,
          [pageName]: (prev.timeOnPages[pageName] || 0) + duration
        }
      };
      saveBehavior(updated);
      return updated;
    });
  };

  const trackInteraction = (type, target, metadata = {}) => {
    setUserBehavior(prev => {
      const updated = {
        ...prev,
        interactions: [...prev.interactions, { type, target, metadata, timestamp: Date.now() }]
      };
      saveBehavior(updated);
      return updated;
    });
  };

  const trackInterest = (interest) => {
    setUserBehavior(prev => {
      const interests = new Set(prev.interests);
      interests.add(interest);
      const updated = { ...prev, interests };
      saveBehavior(updated);
      return updated;
    });
  };

  const saveBehavior = (data) => {
    localStorage.setItem('behaviorData', JSON.stringify({
      ...data,
      interests: Array.from(data.interests)
    }));
  };

  const analyzeBehavior = async () => {
    const data = {
      ...userBehavior,
      interests: Array.from(userBehavior.interests),
      sessionDuration: Date.now() - userBehavior.sessionStart
    };

    try {
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze user behavior and recommend personalized outreach.

Behavior Data:
- Visit Count: ${data.visitCount}
- Session Duration: ${Math.round(data.sessionDuration / 1000)}s
- Page Views: ${data.pageViews.map(pv => pv.page).join(', ')}
- Time on Pages: ${JSON.stringify(data.timeOnPages)}
- Interests: ${data.interests.join(', ')}
- Interactions: ${data.interactions.length} actions

Determine:
1. User Intent: browsing, researching, ready-to-buy, hot-lead
2. Primary Interest Area: security, ROI, training, technical, workshops
3. Engagement Level: low (1-3), medium (4-6), high (7-10)
4. Recommended Outreach: email, in-app-message, none
5. Optimal Timing: immediate, 1-day, 3-days, 1-week
6. Message Focus: what specific value prop to emphasize
7. Suggested CTA: consultation, workshop, case-study, demo

Provide actionable recommendations.`,
        response_json_schema: {
          type: "object",
          properties: {
            userIntent: { type: "string" },
            primaryInterest: { type: "string" },
            engagementLevel: { type: "number" },
            recommendedOutreach: { type: "string" },
            optimalTiming: { type: "string" },
            messageFocus: { type: "string" },
            suggestedCTA: { type: "string" },
            personalizedMessage: { type: "string" }
          }
        }
      });

      return analysis;
    } catch (error) {
      console.error('Behavior analysis failed:', error);
      return null;
    }
  };

  return { userBehavior, trackPageView, trackInteraction, trackInterest, analyzeBehavior };
}

export function BehaviorOutreachTrigger() {
  const { userBehavior, analyzeBehavior } = useBehaviorAnalytics();
  const [outreachRecommendation, setOutreachRecommendation] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const checkOutreach = async () => {
      // Trigger analysis after significant engagement
      if (userBehavior.pageViews.length >= 3 || userBehavior.visitCount >= 2) {
        const analysis = await analyzeBehavior();
        if (analysis && analysis.engagementLevel >= 7 && analysis.recommendedOutreach !== 'none') {
          setOutreachRecommendation(analysis);
          
          // Show in-app message if recommended
          if (analysis.recommendedOutreach === 'in-app-message' && analysis.optimalTiming === 'immediate') {
            setTimeout(() => setShowMessage(true), 2000);
          }
        }
      }
    };

    checkOutreach();
  }, [userBehavior.pageViews.length, userBehavior.visitCount]);

  if (!showMessage || !outreachRecommendation) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 max-w-md bg-gradient-to-br from-int-navy to-int-teal p-6 rounded-2xl shadow-2xl border-2 border-int-orange animate-slide-in">
      <button
        onClick={() => setShowMessage(false)}
        className="absolute top-2 right-2 text-signal-white/60 hover:text-signal-white"
      >
        ×
      </button>
      <div className="mb-3">
        <div className="text-sm text-int-orange font-semibold mb-1">Personalized for You</div>
        <p className="text-signal-white font-medium">{outreachRecommendation.personalizedMessage}</p>
      </div>
      <button className="w-full px-4 py-2 bg-int-orange rounded-lg font-semibold hover:bg-int-orange/90 transition-all">
        {outreachRecommendation.suggestedCTA === 'consultation' && 'Schedule Consultation'}
        {outreachRecommendation.suggestedCTA === 'workshop' && 'Explore Workshops'}
        {outreachRecommendation.suggestedCTA === 'case-study' && 'View Case Studies'}
        {outreachRecommendation.suggestedCTA === 'demo' && 'Request Demo'}
      </button>
    </div>
  );
}