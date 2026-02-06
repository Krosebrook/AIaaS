import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export function usePersonalization() {
  const [userProfile, setUserProfile] = useState({
    interests: [],
    visitedPages: [],
    recommendations: null
  });

  useEffect(() => {
    // Load existing profile from localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  const trackPageVisit = (pageName) => {
    setUserProfile(prev => {
      const visitedPages = [...new Set([...prev.visitedPages, pageName])];
      const updated = { ...prev, visitedPages };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const trackInterest = (interest) => {
    setUserProfile(prev => {
      const interests = [...new Set([...prev.interests, interest])];
      const updated = { ...prev, interests };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const getRecommendations = async () => {
    if (userProfile.visitedPages.length === 0) return null;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze user behavior and recommend personalized content.

User Profile:
- Visited pages: ${userProfile.visitedPages.join(', ')}
- Interests: ${userProfile.interests.join(', ') || 'none yet'}

Based on this behavior, identify the user's primary interest area and recommend:
1. Most relevant case study (1-6)
2. Most relevant service focus (Security, Speed, Training, Custom Engineering)
3. Content emphasis (security, roi, training, technical)

Provide specific, actionable recommendations.`,
        response_json_schema: {
          type: "object",
          properties: {
            primaryInterest: { type: "string" },
            recommendedCaseStudy: { type: "number" },
            servicesFocus: { type: "string" },
            contentEmphasis: { type: "string" },
            headline: { type: "string" }
          }
        }
      });

      setUserProfile(prev => {
        const updated = { ...prev, recommendations: result };
        localStorage.setItem('userProfile', JSON.stringify(updated));
        return updated;
      });

      return result;
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      return null;
    }
  };

  return { userProfile, trackPageVisit, trackInterest, getRecommendations };
}