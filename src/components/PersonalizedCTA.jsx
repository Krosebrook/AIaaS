import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useUserSegmentation } from './segmentation/UserSegmentationEngine';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Personalized Call-to-Action Component
 * Displays segment-specific CTAs based on user behavior
 */
export default function PersonalizedCTA({ context = 'general', compact = false }) {
  const navigate = useNavigate();
  const { segment, loading } = useUserSegmentation();

  if (loading || !segment) return null;

  // Get highest priority CTA
  const primaryCTA = segment.suggestedCTAs?.find(cta => cta.priority === 'high') || segment.suggestedCTAs?.[0];
  
  if (!primaryCTA) return null;

  const handleClick = () => {
    base44.analytics.track({
      eventName: 'personalized_cta_clicked',
      properties: {
        segment: segment.segment,
        cta: primaryCTA.text,
        context
      }
    });

    // Navigate based on action
    const actionMap = {
      'Schedule Consultation': 'Contact',
      'Take Assessment': 'AIReadinessAssessment',
      'Explore Workshops': 'Workshops',
      'View Services': 'Services',
      'Browse Resources': 'Resources',
      'Book Workshop': 'Workshops',
      'View Case Studies': 'CaseStudies',
      'Try Content Generator': 'ContentGenerator',
      'View Dashboard': 'PersonalizedDashboard'
    };

    const page = actionMap[primaryCTA.action] || 'Contact';
    navigate(createPageUrl(page));
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="w-full px-4 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold text-white hover:shadow-glow transition-all flex items-center justify-between group"
      >
        <span>{primaryCTA.text}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-int-orange" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-int-orange font-semibold mb-2">
            Recommended for {segment.segment}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{primaryCTA.text}</h3>
          <p className="text-sm text-signal-white/80 mb-4">
            Based on your journey, this is the best next step to accelerate your AI implementation.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-2 bg-int-orange hover:bg-int-orange/80 rounded-lg font-semibold text-white transition-all flex items-center gap-2"
          >
            {primaryCTA.action}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}