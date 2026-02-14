import React, { useEffect, useState } from 'react';
import { useBehaviorAnalytics } from './BehaviorAnalytics';

export function DynamicContentAdapter({ children, defaultContent, variants }) {
  const { behavior, getUserJourney } = useBehaviorAnalytics();
  const [activeVariant, setActiveVariant] = useState(defaultContent);

  useEffect(() => {
    const journey = getUserJourney();
    const { currentStage, topInterests } = journey;

    // Match content variant based on user journey stage and interests
    const bestMatch = variants.find(v => 
      v.stage === currentStage || topInterests.some(i => v.interests?.includes(i))
    );

    if (bestMatch) {
      setActiveVariant(bestMatch.content);
    }
  }, [behavior.engagementScore, behavior.interests]);

  return <>{activeVariant}</>;
}

export function PersonalizedCTA({ defaultCTA, variants }) {
  const { behavior, getUserJourney } = useBehaviorAnalytics();
  const [activeCTA, setActiveCTA] = useState(defaultCTA);

  useEffect(() => {
    const journey = getUserJourney();
    const { currentStage } = journey;

    const ctaMap = {
      awareness: variants.soft || defaultCTA,
      consideration: variants.educational || defaultCTA,
      decision: variants.direct || defaultCTA
    };

    setActiveCTA(ctaMap[currentStage]);
  }, [behavior.engagementScore]);

  return (
    <div className="transition-all duration-500">
      {activeCTA}
    </div>
  );
}

export function AdaptiveHero({ visitor }) {
  const { behavior, getUserJourney } = useBehaviorAnalytics();
  const journey = getUserJourney();

  const headlines = {
    awareness: "Transform Your Business with AI",
    consideration: `Proven AI Solutions for ${behavior.interests[0] || 'Enterprise'}`,
    decision: "Ready to Deploy? Let's Build Your AI Solution"
  };

  const subheadlines = {
    awareness: "Discover how enterprise AI can serve YOUR business needs",
    consideration: `See how companies like yours achieved measurable ROI with our ${behavior.interests[0] || 'AI'} solutions`,
    decision: "Schedule your consultation today and start transforming operations"
  };

  return {
    headline: headlines[journey.currentStage],
    subheadline: subheadlines[journey.currentStage],
    journeyStage: journey.currentStage
  };
}