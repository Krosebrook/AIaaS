import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { AlertTriangle, TrendingUp, Mail, MessageSquare, CheckCircle, Clock, Users } from 'lucide-react';

export function useClientHealthScore() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateHealthScore = async () => {
    setLoading(true);
    try {
      // Gather behavioral data
      const behaviorData = localStorage.getItem('behaviorData');
      const userProfile = localStorage.getItem('userProfile');
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0');

      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze client engagement and calculate a comprehensive health score.

Client Data:
- Visit Count: ${visitCount}
- Behavior Data: ${behaviorData || 'Limited data'}
- Profile: ${userProfile || 'New user'}

Calculate a detailed client health score (0-100) and provide:

1. OVERALL HEALTH SCORE (0-100)
   - 80-100: Excellent (highly engaged, ready for upsell)
   - 60-79: Good (engaged, maintain relationship)
   - 40-59: At Risk (declining engagement, needs attention)
   - 0-39: Critical (churn risk, immediate action needed)

2. ENGAGEMENT METRICS
   - Frequency score (how often they visit)
   - Depth score (how deeply they explore content)
   - Recency score (when was last visit)
   - Action score (meaningful interactions taken)

3. PREDICTIVE INSIGHTS
   - Likely next interest/need
   - Predicted timeframe for conversion
   - Churn risk probability (%)
   - Upsell opportunity likelihood

4. OUTREACH TRIGGERS
   - Is immediate outreach recommended? (yes/no)
   - Best outreach channel (email/in-app/call)
   - Optimal timing (immediate/1-day/3-days/1-week)
   - Key message angle (what to emphasize)

5. RISK INDICATORS
   - List specific behaviors indicating risk
   - Early warning signs detected
   - Engagement drop-off points

Be data-driven and actionable.`,
        response_json_schema: {
          type: "object",
          properties: {
            overallScore: { type: "number" },
            healthStatus: { type: "string" },
            engagementMetrics: {
              type: "object",
              properties: {
                frequency: { type: "number" },
                depth: { type: "number" },
                recency: { type: "number" },
                action: { type: "number" }
              }
            },
            predictiveInsights: {
              type: "object",
              properties: {
                nextInterest: { type: "string" },
                conversionTimeframe: { type: "string" },
                churnRisk: { type: "number" },
                upsellLikelihood: { type: "string" }
              }
            },
            outreachTriggers: {
              type: "object",
              properties: {
                recommended: { type: "boolean" },
                channel: { type: "string" },
                timing: { type: "string" },
                messageAngle: { type: "string" }
              }
            },
            riskIndicators: { type: "array", items: { type: "string" } }
          }
        }
      });

      setHealthData(analysis);
      localStorage.setItem('clientHealthScore', JSON.stringify(analysis));
      return analysis;
    } catch (error) {
      console.error('Health score calculation failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { healthData, calculateHealthScore, loading };
}

export function useOutreachRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateOutreach = async (healthData, userContext) => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate personalized outreach strategy and message templates for a client.

Client Health Profile:
- Overall Score: ${healthData.overallScore}/100
- Status: ${healthData.healthStatus}
- Churn Risk: ${healthData.predictiveInsights.churnRisk}%
- Next Interest: ${healthData.predictiveInsights.nextInterest}
- Conversion Timeframe: ${healthData.predictiveInsights.conversionTimeframe}

User Context: ${JSON.stringify(userContext)}

Generate comprehensive outreach recommendations:

1. OUTREACH STRATEGY
   - Primary objective (retain/engage/convert/upsell)
   - Recommended touchpoints (number and timing)
   - Content strategy (what to send/share)
   - Success metrics to track

2. EMAIL TEMPLATES (3 variations)
   - Subject lines (compelling, personalized)
   - Body copy (value-focused, action-oriented)
   - CTA (specific next step)
   - Tone (professional/consultative/urgent)

3. IN-APP MESSAGE TEMPLATES (2 variations)
   - Short, attention-grabbing messages
   - Contextual to their current activity
   - Clear value proposition

4. RECOMMENDED CONTENT/OFFERS
   - Specific case studies to share
   - Workshop recommendations
   - Service offers most relevant
   - Resources that address their needs

5. FOLLOW-UP SEQUENCE
   - Day 1, Day 3, Day 7 touchpoints
   - Escalation path if no response
   - Re-engagement tactics

Make all templates ready-to-use with [PERSONALIZATION] tags for customization.`,
        response_json_schema: {
          type: "object",
          properties: {
            strategy: {
              type: "object",
              properties: {
                objective: { type: "string" },
                touchpoints: { type: "string" },
                contentStrategy: { type: "string" },
                successMetrics: { type: "array", items: { type: "string" } }
              }
            },
            emailTemplates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  subject: { type: "string" },
                  body: { type: "string" },
                  cta: { type: "string" },
                  tone: { type: "string" }
                }
              }
            },
            inAppMessages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  context: { type: "string" }
                }
              }
            },
            recommendedContent: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  title: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            followUpSequence: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "string" },
                  action: { type: "string" },
                  message: { type: "string" }
                }
              }
            }
          }
        }
      });

      setRecommendations(result);
      return result;
    } catch (error) {
      console.error('Outreach generation failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, generateOutreach, loading };
}

export function ClientHealthIndicator({ score, compact = false }) {
  const getStatusColor = (score) => {
    if (score >= 80) return 'text-green-400 border-green-400/30 bg-green-400/10';
    if (score >= 60) return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    if (score >= 40) return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    return 'text-red-400 border-red-400/30 bg-red-400/10';
  };

  const getStatusLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'At Risk';
    return 'Critical';
  };

  const getStatusIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5" />;
    if (score >= 60) return <TrendingUp className="w-5 h-5" />;
    if (score >= 40) return <Clock className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(score)}`}>
        {getStatusIcon(score)}
        <span className="font-semibold text-sm">{score}/100</span>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl border ${getStatusColor(score)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon(score)}
          <div>
            <div className="text-sm text-signal-white/60">Client Health</div>
            <div className="text-2xl font-bold">{score}/100</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{getStatusLabel(score)}</div>
        </div>
      </div>
      <div className="h-2 bg-void rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            score >= 80 ? 'bg-green-400' :
            score >= 60 ? 'bg-blue-400' :
            score >= 40 ? 'bg-yellow-400' : 'bg-red-400'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}