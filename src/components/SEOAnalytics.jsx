import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, TrendingDown, Target, AlertCircle, Lightbulb, Calendar, Users, Zap, Activity } from 'lucide-react';

export default function SEOAnalytics({ auditResults }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auditResults) {
      generateAnalytics();
    }
  }, [auditResults]);

  const generateAnalytics = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Perform advanced SEO analytics and provide strategic insights.

Current SEO Audit Data:
- Overall Score: ${auditResults.technicalScore.overall}
- Content Score: ${auditResults.technicalScore.content}
- Technical Score: ${auditResults.technicalScore.technical}
- Structure Score: ${auditResults.technicalScore.structure}
- Keyword Gaps: ${auditResults.keywordGaps.length} identified
- Schema Issues: ${auditResults.schemaRecommendations.length} recommendations

Website: INTinc.com - Enterprise AI implementation firm
Industry: B2B Technology Consulting, AI Services
Current Content: AI security, workshops, case studies, custom engineering

Using web search for competitive intelligence, provide:

1. TREND ANALYSIS:
   - Current SEO trends in enterprise AI consulting
   - Emerging keywords gaining traction (2026)
   - Content types performing well in our industry
   - Search behavior changes in B2B tech

2. COMPETITOR INSIGHTS:
   - Top 3 competitor strategies we should adopt
   - Their content gaps we can exploit
   - Backlink opportunities from competitor analysis
   - Traffic estimation vs competitors

3. PERFORMANCE FORECASTING:
   - Projected traffic growth if recommendations implemented
   - Timeline to see results (quick wins vs long-term)
   - ROI estimation for SEO investments
   - Risk factors that could impact performance

4. ACTIONABLE RECOMMENDATIONS:
   - Top 5 immediate actions (0-30 days)
   - Medium-term initiatives (1-3 months)
   - Long-term strategic moves (3-6 months)
   - Resource allocation suggestions

5. USER BEHAVIOR INSIGHTS:
   - Expected user journey improvements
   - Conversion rate impact predictions
   - Content engagement forecasts
   - Personalization opportunities

Be specific, data-driven, and actionable.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            trendAnalysis: {
              type: "object",
              properties: {
                emergingKeywords: { type: "array", items: { type: "string" } },
                contentTrends: { type: "array", items: { type: "string" } },
                searchBehavior: { type: "string" },
                industryShifts: { type: "array", items: { type: "string" } }
              }
            },
            competitorInsights: {
              type: "object",
              properties: {
                strategiesToAdopt: { type: "array", items: { type: "string" } },
                contentGaps: { type: "array", items: { type: "string" } },
                backlinkOpportunities: { type: "array", items: { type: "string" } },
                trafficEstimate: { type: "string" }
              }
            },
            performanceForecast: {
              type: "object",
              properties: {
                trafficGrowth: { type: "string" },
                timeToResults: {
                  type: "object",
                  properties: {
                    quickWins: { type: "string" },
                    mediumTerm: { type: "string" },
                    longTerm: { type: "string" }
                  }
                },
                roiEstimate: { type: "string" },
                riskFactors: { type: "array", items: { type: "string" } }
              }
            },
            actionableRecommendations: {
              type: "object",
              properties: {
                immediate: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      action: { type: "string" },
                      impact: { type: "string" },
                      effort: { type: "string" }
                    }
                  }
                },
                mediumTerm: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      action: { type: "string" },
                      impact: { type: "string" },
                      effort: { type: "string" }
                    }
                  }
                },
                longTerm: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      action: { type: "string" },
                      impact: { type: "string" },
                      effort: { type: "string" }
                    }
                  }
                }
              }
            },
            userBehaviorInsights: {
              type: "object",
              properties: {
                journeyImprovements: { type: "array", items: { type: "string" } },
                conversionImpact: { type: "string" },
                engagementForecast: { type: "string" },
                personalizationOps: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      });

      setAnalytics(result);
    } catch (error) {
      console.error('Analytics generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 bg-carbon-night rounded-xl border border-int-teal/30 text-center">
        <Activity className="w-12 h-12 text-int-teal mx-auto mb-4 animate-pulse" />
        <p className="text-signal-white/70">Generating advanced analytics and insights...</p>
        <p className="text-sm text-signal-white/50 mt-2">Using AI and web data to analyze trends</p>
      </div>
    );
  }

  if (!analytics) return null;

  const getImpactColor = (impact) => {
    if (impact.toLowerCase().includes('high')) return 'text-green-400';
    if (impact.toLowerCase().includes('medium')) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getEffortColor = (effort) => {
    if (effort.toLowerCase().includes('low')) return 'bg-green-500/20 border-green-500/30';
    if (effort.toLowerCase().includes('medium')) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-int-teal to-int-orange bg-clip-text text-transparent">
        AI-Powered Analytics & Insights
      </h2>

      {/* Trend Analysis */}
      <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-int-teal" />
          <h3 className="text-2xl font-bold">Trend Analysis</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-int-teal mb-3">Emerging Keywords (2026)</h4>
            <div className="space-y-2">
              {analytics.trendAnalysis.emergingKeywords.map((kw, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-void rounded">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{kw}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-int-teal mb-3">Content Trends</h4>
            <div className="space-y-2">
              {analytics.trendAnalysis.contentTrends.map((trend, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-void rounded">
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span className="text-sm flex-1">{trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-void rounded-lg">
          <h4 className="font-semibold text-signal-white/80 mb-2 text-sm">Search Behavior Insights</h4>
          <p className="text-sm text-signal-white/70">{analytics.trendAnalysis.searchBehavior}</p>
        </div>
      </div>

      {/* Performance Forecast */}
      <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-int-orange" />
          <h3 className="text-2xl font-bold">Performance Forecast</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-void rounded-lg border border-int-orange/30">
            <div className="text-sm text-signal-white/60 mb-2">Projected Growth</div>
            <div className="text-2xl font-bold text-int-orange">{analytics.performanceForecast.trafficGrowth}</div>
          </div>
          <div className="p-4 bg-void rounded-lg border border-int-teal/30">
            <div className="text-sm text-signal-white/60 mb-2">ROI Estimate</div>
            <div className="text-2xl font-bold text-int-teal">{analytics.performanceForecast.roiEstimate}</div>
          </div>
          <div className="p-4 bg-void rounded-lg border border-int-navy/30">
            <div className="text-sm text-signal-white/60 mb-2">Quick Wins Timeline</div>
            <div className="text-2xl font-bold text-int-navy">{analytics.performanceForecast.timeToResults.quickWins}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-void rounded-lg">
            <h4 className="font-semibold text-signal-white/80 mb-2 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline to Results
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-signal-white/60">Quick Wins:</span>
                <span className="font-semibold">{analytics.performanceForecast.timeToResults.quickWins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-signal-white/60">Medium-term:</span>
                <span className="font-semibold">{analytics.performanceForecast.timeToResults.mediumTerm}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-signal-white/60">Long-term:</span>
                <span className="font-semibold">{analytics.performanceForecast.timeToResults.longTerm}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-void rounded-lg">
            <h4 className="font-semibold text-signal-white/80 mb-2 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Risk Factors
            </h4>
            <ul className="space-y-1 text-sm">
              {analytics.performanceForecast.riskFactors.map((risk, i) => (
                <li key={i} className="text-signal-white/70 flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-int-navy" />
          <h3 className="text-2xl font-bold">Actionable Recommendations</h3>
        </div>

        <div className="space-y-6">
          {/* Immediate Actions */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                0-30 DAYS
              </span>
              Immediate Actions
            </h4>
            <div className="space-y-3">
              {analytics.actionableRecommendations.immediate.map((rec, i) => (
                <div key={i} className="p-4 bg-void rounded-lg border border-int-navy/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{rec.action}</div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`flex items-center gap-1 ${getImpactColor(rec.impact)}`}>
                          <Target className="w-3 h-3" />
                          Impact: {rec.impact}
                        </span>
                        <span className={`px-2 py-0.5 ${getEffortColor(rec.effort)} border rounded`}>
                          Effort: {rec.effort}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medium-term Actions */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                1-3 MONTHS
              </span>
              Medium-term Initiatives
            </h4>
            <div className="space-y-3">
              {analytics.actionableRecommendations.mediumTerm.map((rec, i) => (
                <div key={i} className="p-4 bg-void rounded-lg border border-int-navy/30">
                  <div className="font-semibold mb-1">{rec.action}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`flex items-center gap-1 ${getImpactColor(rec.impact)}`}>
                      <Target className="w-3 h-3" />
                      Impact: {rec.impact}
                    </span>
                    <span className={`px-2 py-0.5 ${getEffortColor(rec.effort)} border rounded`}>
                      Effort: {rec.effort}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long-term Actions */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">
                3-6 MONTHS
              </span>
              Long-term Strategic Moves
            </h4>
            <div className="space-y-3">
              {analytics.actionableRecommendations.longTerm.map((rec, i) => (
                <div key={i} className="p-4 bg-void rounded-lg border border-int-navy/30">
                  <div className="font-semibold mb-1">{rec.action}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`flex items-center gap-1 ${getImpactColor(rec.impact)}`}>
                      <Target className="w-3 h-3" />
                      Impact: {rec.impact}
                    </span>
                    <span className={`px-2 py-0.5 ${getEffortColor(rec.effort)} border rounded`}>
                      Effort: {rec.effort}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Insights */}
      <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-int-orange" />
          <h3 className="text-2xl font-bold">Competitive Intelligence</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-int-orange mb-3">Strategies to Adopt</h4>
            <div className="space-y-2">
              {analytics.competitorInsights.strategiesToAdopt.map((strategy, i) => (
                <div key={i} className="p-3 bg-void rounded-lg text-sm">
                  <span className="text-int-orange font-bold mr-2">{i + 1}.</span>
                  {strategy}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-int-orange mb-3">Content Gaps to Exploit</h4>
            <div className="space-y-2">
              {analytics.competitorInsights.contentGaps.map((gap, i) => (
                <div key={i} className="p-3 bg-void rounded-lg text-sm">
                  <Lightbulb className="w-4 h-4 text-yellow-400 inline mr-2" />
                  {gap}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-void rounded-lg">
          <h4 className="font-semibold text-signal-white/80 mb-2 text-sm">Traffic Benchmark</h4>
          <p className="text-sm text-signal-white/70">{analytics.competitorInsights.trafficEstimate}</p>
        </div>
      </div>

      {/* User Behavior Insights */}
      <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-int-teal" />
          <h3 className="text-2xl font-bold">User Behavior Insights</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-void rounded-lg">
            <h4 className="font-semibold text-int-teal mb-3 text-sm">Journey Improvements</h4>
            <ul className="space-y-2 text-sm">
              {analytics.userBehaviorInsights.journeyImprovements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-int-teal mt-0.5">✓</span>
                  <span className="text-signal-white/80">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-void rounded-lg">
            <h4 className="font-semibold text-int-teal mb-3 text-sm">Personalization Opportunities</h4>
            <ul className="space-y-2 text-sm">
              {analytics.userBehaviorInsights.personalizationOps.map((opp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span className="text-signal-white/80">{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-void rounded-lg">
            <div className="text-xs text-signal-white/60 mb-1">Conversion Impact</div>
            <div className="font-semibold text-green-400">{analytics.userBehaviorInsights.conversionImpact}</div>
          </div>
          <div className="p-3 bg-void rounded-lg">
            <div className="text-xs text-signal-white/60 mb-1">Engagement Forecast</div>
            <div className="font-semibold text-blue-400">{analytics.userBehaviorInsights.engagementForecast}</div>
          </div>
        </div>
      </div>
    </div>
  );
}