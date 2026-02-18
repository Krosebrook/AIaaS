import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * AI-Powered User Segmentation Engine
 * Analyzes engagement patterns and behavior to automatically segment users
 */
export function useUserSegmentation() {
  const [segment, setSegment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    analyzeSegment();
  }, []);

  const analyzeSegment = async () => {
    // Check cache first
    const cached = localStorage.getItem('user_segment');
    const cacheTime = localStorage.getItem('user_segment_time');
    
    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 24 * 60 * 60 * 1000) {
      setSegment(JSON.parse(cached));
      return;
    }

    setLoading(true);
    try {
      // Gather behavioral data
      const visitedPages = JSON.parse(localStorage.getItem('visited_pages') || '[]');
      const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
      const assessmentResults = JSON.parse(localStorage.getItem('ai_assessment_results') || 'null');
      const downloadedResources = JSON.parse(localStorage.getItem('downloaded_resources') || '[]');
      const exploredSolutions = JSON.parse(localStorage.getItem('explored_solutions') || '[]');
      const timeOnSite = JSON.parse(localStorage.getItem('time_on_pages') || '{}');

      // AI segmentation
      const segmentAnalysis = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a user segmentation specialist. Analyze this user's behavior and assign them to the MOST appropriate segment.

Behavioral Data:
- Pages visited: ${visitedPages.join(', ')}
- Interests: ${userProfile.interests?.join(', ') || 'None'}
- Assessment completed: ${assessmentResults ? 'Yes' : 'No'}
- Assessment readiness: ${assessmentResults?.readinessLevel || 'Unknown'}
- Resources downloaded: ${downloadedResources.length}
- Solutions explored: ${exploredSolutions.join(', ')}
- Time on site: ${Object.values(timeOnSite).reduce((a, b) => a + b, 0)} seconds
- Engagement level: ${visitedPages.length > 10 ? 'High' : visitedPages.length > 5 ? 'Medium' : 'Low'}

Segment this user into ONE of these categories:
1. "AI Explorer" - Just learning about AI, early stage, needs education
2. "Active Evaluator" - Researching solutions, comparing options, high engagement
3. "Decision Maker" - Ready to buy, looking for specific services, downloaded resources
4. "Technical Implementer" - Deep technical interest, exploring implementation details
5. "Workshop Seeker" - Interested in training and enablement
6. "Content Consumer" - Primarily consuming thought leadership content

Provide:
- Primary segment
- Confidence (0-100)
- Key behaviors that led to this classification
- Recommended content types
- Suggested CTAs (3 specific calls-to-action)
- Pain points this segment likely has
- Best next actions for this user`,
        response_json_schema: {
          type: 'object',
          properties: {
            segment: { type: 'string' },
            confidence: { type: 'number' },
            keyBehaviors: { type: 'array', items: { type: 'string' } },
            recommendedContentTypes: { type: 'array', items: { type: 'string' } },
            suggestedCTAs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  action: { type: 'string' },
                  priority: { type: 'string' }
                }
              }
            },
            painPoints: { type: 'array', items: { type: 'string' } },
            nextActions: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      // Cache result
      localStorage.setItem('user_segment', JSON.stringify(segmentAnalysis));
      localStorage.setItem('user_segment_time', Date.now().toString());
      
      setSegment(segmentAnalysis);

      // Track segmentation
      base44.analytics.track({
        eventName: 'user_segmented',
        properties: {
          segment: segmentAnalysis.segment,
          confidence: segmentAnalysis.confidence
        }
      });
    } catch (error) {
      console.error('Segmentation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSegment = () => {
    localStorage.removeItem('user_segment');
    localStorage.removeItem('user_segment_time');
    analyzeSegment();
  };

  return { segment, loading, refreshSegment };
}

export default useUserSegmentation;