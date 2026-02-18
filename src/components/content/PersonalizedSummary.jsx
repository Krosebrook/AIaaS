import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Briefcase, Building2, GraduationCap, Loader2 } from 'lucide-react';

/**
 * AI-Generated Personalized Content Summaries
 * Generates different summaries based on client segment
 */
export default function PersonalizedSummary({ content, segment = 'auto' }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectedSegment, setDetectedSegment] = useState(segment);

  useEffect(() => {
    generateSummary();
  }, [content, segment]);

  const detectSegment = async () => {
    if (segment !== 'auto') return segment;

    // Analyze user profile to detect segment
    const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    const visitedPages = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    const assessmentResults = JSON.parse(localStorage.getItem('ai_assessment_results') || 'null');

    const segmentAnalysis = await base44.integrations.Core.InvokeLLM({
      prompt: `Based on user behavior, determine their client segment:

User Data:
- Interests: ${userProfile.interests?.join(', ')}
- Visited Pages: ${visitedPages.slice(-10).join(', ')}
- Assessment Level: ${assessmentResults?.readinessLevel || 'Unknown'}

Client Segments:
1. "executive" - C-suite, strategic decision makers, focus on ROI and business outcomes
2. "technical" - CTOs, engineers, developers, focus on implementation and architecture
3. "enterprise" - Large organizations, focus on governance, compliance, scale
4. "startup" - Small companies, focus on cost-effectiveness, quick wins, agility

Return ONE segment that best fits this user.`,
      response_json_schema: {
        type: 'object',
        properties: {
          segment: { type: 'string' },
          confidence: { type: 'string' }
        }
      }
    });

    return segmentAnalysis.segment;
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const targetSegment = await detectSegment();
      setDetectedSegment(targetSegment);

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a content strategist creating personalized summaries for different client segments.

Content to Summarize:
${content}

Target Segment: ${targetSegment}

Segment-Specific Guidelines:
- Executive: Focus on business outcomes, ROI, strategic value. Use business language, avoid technical jargon. 2-3 sentences.
- Technical: Focus on implementation details, architecture, tech stack. Use technical language. 3-4 sentences.
- Enterprise: Focus on governance, compliance, scalability, security. Emphasize risk mitigation. 3-4 sentences.
- Startup: Focus on quick wins, cost-effectiveness, time-to-value. Emphasize agility. 2-3 sentences.

Generate:
1. Personalized summary (tailored to segment)
2. Key takeaway (one sentence)
3. Recommended action (one specific next step for this segment)`,
        response_json_schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            keyTakeaway: { type: 'string' },
            recommendedAction: { type: 'string' }
          }
        }
      });

      setSummary(result);

      base44.analytics.track({
        eventName: 'personalized_summary_generated',
        properties: { segment: targetSegment }
      });
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSegmentIcon = () => {
    switch (detectedSegment) {
      case 'executive': return Briefcase;
      case 'technical': return GraduationCap;
      case 'enterprise': return Building2;
      case 'startup': return Sparkles;
      default: return Sparkles;
    }
  };

  const getSegmentColor = () => {
    switch (detectedSegment) {
      case 'executive': return 'from-purple-500 to-pink-600';
      case 'technical': return 'from-blue-500 to-cyan-600';
      case 'enterprise': return 'from-green-500 to-emerald-600';
      case 'startup': return 'from-orange-500 to-red-600';
      default: return 'from-int-orange to-int-navy';
    }
  };

  const getSegmentLabel = () => {
    switch (detectedSegment) {
      case 'executive': return 'Executive Summary';
      case 'technical': return 'Technical Overview';
      case 'enterprise': return 'Enterprise Perspective';
      case 'startup': return 'Startup Focus';
      default: return 'Summary';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-int-orange animate-spin" />
          <span className="text-signal-white/60">Generating personalized summary...</span>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const Icon = getSegmentIcon();

  return (
    <div className={`p-6 bg-gradient-to-br ${getSegmentColor()}/10 border border-slate-700 rounded-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${getSegmentColor()} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white">{getSegmentLabel()}</div>
          <div className="text-xs text-signal-white/60">Tailored for your role</div>
        </div>
        <button
          onClick={generateSummary}
          className="ml-auto p-2 hover:bg-slate-800 rounded-lg transition-colors"
          title="Regenerate summary"
        >
          <Sparkles className="w-4 h-4 text-int-orange" />
        </button>
      </div>

      <p className="text-signal-white/90 mb-4">{summary.summary}</p>

      <div className="p-3 bg-slate-900/50 rounded-lg mb-4">
        <div className="text-xs text-signal-white/60 mb-1">Key Takeaway</div>
        <div className="text-sm font-semibold text-int-orange">{summary.keyTakeaway}</div>
      </div>

      <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
        <div className="text-2xl">→</div>
        <div>
          <div className="text-xs text-signal-white/60 mb-1">Recommended Next Step</div>
          <div className="text-sm text-signal-white/90">{summary.recommendedAction}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for accessing personalized summaries
 */
export function usePersonalizedSummary(content) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async (segment = 'auto') => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a brief, personalized summary for ${segment} segment: ${content}`,
        response_json_schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' }
          }
        }
      });
      setSummary(result.summary);
    } catch (error) {
      console.error('Summary generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, generate };
}