import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useBehaviorAnalytics } from './BehaviorAnalytics';

export function CRMFollowUpQueue() {
  const { behavior, analyzeBehavior, getUserJourney } = useBehaviorAnalytics();
  const [queuedSequences, setQueuedSequences] = useState([]);

  useEffect(() => {
    const checkAndQueueFollowUp = async () => {
      // Only trigger for high-engagement users
      if (behavior.engagementScore < 300) return;

      const analysis = await analyzeBehavior();
      const journey = getUserJourney();

      // Determine follow-up sequence based on behavior
      const sequence = await generateFollowUpSequence(analysis, journey, behavior);
      
      if (sequence && !queuedSequences.find(s => s.id === sequence.id)) {
        setQueuedSequences(prev => [...prev, sequence]);
        
        // Trigger first touchpoint
        if (sequence.touchpoints.length > 0) {
          await executeTouchpoint(sequence.touchpoints[0], behavior);
        }
      }
    };

    // Check every 2 minutes of engagement
    const interval = setInterval(checkAndQueueFollowUp, 120000);
    return () => clearInterval(interval);
  }, [behavior.engagementScore]);

  const generateFollowUpSequence = async (analysis, journey, behaviorData) => {
    const sequencePrompt = await base44.integrations.Core.InvokeLLM({
      prompt: `Design a personalized follow-up sequence for a prospect.

User Profile:
- Intent: ${analysis.intent}
- Primary Interest: ${analysis.primaryInterest}
- Engagement Level: ${analysis.engagementLevel}
- Journey Stage: ${journey.currentStage}
- Top Interests: ${journey.topInterests.join(', ')}
- Visit Count: ${behaviorData.visitCount}

Create a 3-touchpoint follow-up sequence:
1. Immediate: In-app or email (timing, content focus)
2. Day 2: Educational content (case study, workshop info)
3. Day 5: Direct offer (consultation, assessment)

For each touchpoint specify:
- Channel (email, in-app, phone)
- Timing (now, +2 days, +5 days)
- Subject/title
- Key message
- CTA`,
      response_json_schema: {
        type: "object",
        properties: {
          sequenceId: { type: "string" },
          sequenceName: { type: "string" },
          touchpoints: {
            type: "array",
            items: {
              type: "object",
              properties: {
                step: { type: "number" },
                channel: { type: "string" },
                delayDays: { type: "number" },
                subject: { type: "string" },
                message: { type: "string" },
                cta: { type: "string" }
              }
            }
          }
        }
      }
    });

    return {
      id: `seq_${Date.now()}`,
      ...sequencePrompt,
      createdAt: Date.now(),
      status: 'active'
    };
  };

  const executeTouchpoint = async (touchpoint, behaviorData) => {
    if (touchpoint.channel === 'email') {
      // Queue email for manual review or auto-send
      console.log('Email queued:', {
        to: 'prospect@example.com', // Would come from form submission
        subject: touchpoint.subject,
        body: touchpoint.message
      });
    } else if (touchpoint.channel === 'in-app') {
      // Show in-app notification
      return {
        type: 'notification',
        content: touchpoint.message,
        cta: touchpoint.cta
      };
    }
  };

  return null; // Invisible component, works in background
}

export function usePersonalizedContent() {
  const { behavior, getUserJourney } = useBehaviorAnalytics();
  
  const getContentRecommendations = () => {
    const journey = getUserJourney();
    const recommendations = [];

    // Recommend based on journey stage
    if (journey.currentStage === 'awareness') {
      recommendations.push({
        type: 'blog',
        title: 'Introduction to Enterprise AI',
        priority: 'high'
      });
    } else if (journey.currentStage === 'consideration') {
      recommendations.push({
        type: 'case-study',
        title: `${journey.topInterests[0]} Success Story`,
        priority: 'high'
      });
    } else {
      recommendations.push({
        type: 'consultation',
        title: 'Schedule Your AI Assessment',
        priority: 'critical'
      });
    }

    return recommendations;
  };

  return {
    journey: getUserJourney(),
    recommendations: getContentRecommendations(),
    shouldShowPersonalization: behavior.engagementScore > 150
  };
}