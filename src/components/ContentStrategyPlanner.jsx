import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Target, TrendingUp, Users, Map, Lightbulb, Download, Loader2 } from 'lucide-react';
import ConfirmationDialog from './shell/ConfirmationDialog';

export default function ContentStrategyPlanner() {
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [businessContext, setBusinessContext] = useState('');
  const [currentGoals, setCurrentGoals] = useState('');

  const generateStrategy = async () => {
    setShowConfirm(false);
    setLoading(true);
    
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a comprehensive content strategy for an enterprise AI consulting business (INTinc.com).

Business Context: ${businessContext || 'Enterprise AI implementation, security-first approach, workshops and training'}
Current Goals: ${currentGoals || 'Increase qualified leads, establish thought leadership, improve SEO rankings'}

Using industry trends and SEO best practices, provide:

1. Target Audience Segments (3-5 detailed personas):
   - Job titles, pain points, goals, content preferences
   - Decision-making authority and buying journey stage
   - Preferred content formats and channels

2. Content Pillars (4-6 main themes):
   - Core topic areas that align with business goals
   - Keywords and subtopics for each pillar
   - Why each pillar matters to the target audience

3. Content Topic Recommendations (10-15 specific topics):
   - Mapped to audience segments and buyer journey stages
   - SEO opportunity score (high/medium/low)
   - Recommended content format (blog, case study, video, guide)
   - Estimated effort and impact

4. User Journey Content Mapping:
   - Awareness Stage: Content to attract and educate
   - Consideration Stage: Content to build trust and demonstrate value
   - Decision Stage: Content to drive conversion
   - Retention Stage: Content to maintain engagement

5. Content Calendar Framework:
   - Publishing frequency recommendations
   - Content mix (educational vs promotional)
   - Seasonal opportunities and industry events

6. Performance Metrics:
   - Key metrics to track for each content type
   - Success criteria and benchmarks

Be specific, actionable, and data-driven.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            audienceSegments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  persona: { type: "string" },
                  jobTitle: { type: "string" },
                  painPoints: { type: "array", items: { type: "string" } },
                  goals: { type: "array", items: { type: "string" } },
                  contentPreferences: { type: "array", items: { type: "string" } },
                  buyerStage: { type: "string" }
                }
              }
            },
            contentPillars: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  pillar: { type: "string" },
                  description: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                  subtopics: { type: "array", items: { type: "string" } },
                  audienceRelevance: { type: "string" }
                }
              }
            },
            topicRecommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  topic: { type: "string" },
                  targetAudience: { type: "string" },
                  buyerStage: { type: "string" },
                  seoOpportunity: { type: "string" },
                  contentFormat: { type: "string" },
                  effort: { type: "string" },
                  impact: { type: "string" },
                  keyTakeaway: { type: "string" }
                }
              }
            },
            userJourneyMapping: {
              type: "object",
              properties: {
                awareness: { type: "array", items: { type: "string" } },
                consideration: { type: "array", items: { type: "string" } },
                decision: { type: "array", items: { type: "string" } },
                retention: { type: "array", items: { type: "string" } }
              }
            },
            calendarFramework: {
              type: "object",
              properties: {
                publishingFrequency: { type: "string" },
                contentMix: { type: "string" },
                seasonalOpportunities: { type: "array", items: { type: "string" } }
              }
            },
            performanceMetrics: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  contentType: { type: "string" },
                  keyMetrics: { type: "array", items: { type: "string" } },
                  successCriteria: { type: "string" }
                }
              }
            }
          }
        }
      });

      setStrategy(result);
    } catch (error) {
      console.error('Strategy generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportStrategy = () => {
    const content = JSON.stringify(strategy, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-strategy-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const getImpactColor = (impact) => {
    if (impact === 'high') return 'text-green-400 bg-green-400/20';
    if (impact === 'medium') return 'text-yellow-400 bg-yellow-400/20';
    return 'text-blue-400 bg-blue-400/20';
  };

  const getEffortColor = (effort) => {
    if (effort === 'low') return 'text-green-400 bg-green-400/20';
    if (effort === 'medium') return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
        <div className="flex items-start gap-4 mb-6">
          <Map className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Content Strategy Planner</h2>
            <p className="text-slate-300 mb-4">
              Generate a comprehensive content strategy with audience insights, content pillars, and user journey mapping.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Business Context (optional)
                </label>
                <textarea
                  value={businessContext}
                  onChange={(e) => setBusinessContext(e.target.value)}
                  placeholder="Describe your business focus, unique value proposition, target market..."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Goals (optional)
                </label>
                <textarea
                  value={currentGoals}
                  onChange={(e) => setCurrentGoals(e.target.value)}
                  placeholder="What are your main content marketing goals? Lead generation, brand awareness, SEO..."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  rows="2"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Strategy...
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5" />
              Generate Content Strategy
            </>
          )}
        </button>
      </div>

      <ConfirmationDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={generateStrategy}
        title="Generate Content Strategy"
        description="AI will analyze industry trends, SEO opportunities, and best practices to create a comprehensive content strategy tailored to your business."
        actionType="play"
        actionLabel="Generate Strategy"
        previewData={{
          analysis: 'Industry trends, SEO insights, competitor analysis',
          dataSource: 'Live web research + AI analysis',
          estimatedTime: '3-4 minutes',
          output: 'Complete content strategy with actionable recommendations'
        }}
      />

      {strategy && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={exportStrategy}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Strategy
            </button>
          </div>

          {/* Audience Segments */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              Target Audience Segments
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {strategy.audienceSegments.map((segment, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="font-semibold text-blue-400 mb-2">{segment.persona}</div>
                  <div className="text-sm text-slate-400 mb-3">{segment.jobTitle}</div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Pain Points:</span>
                      <ul className="mt-1 space-y-1 text-slate-300">
                        {segment.painPoints.map((p, j) => (
                          <li key={j}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-slate-500">Goals:</span>
                      <ul className="mt-1 space-y-1 text-slate-300">
                        {segment.goals.map((g, j) => (
                          <li key={j}>• {g}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                        {segment.buyerStage}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Pillars */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Content Pillars
            </h3>
            <div className="space-y-4">
              {strategy.contentPillars.map((pillar, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-purple-400 mb-2">{pillar.pillar}</h4>
                  <p className="text-sm text-slate-300 mb-3">{pillar.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-slate-500">Keywords:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pillar.keywords.map((kw, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Subtopics:</span>
                      <div className="text-sm text-slate-400 mt-1">
                        {pillar.subtopics.join(' • ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Recommendations */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Content Topic Recommendations
            </h3>
            <div className="space-y-3">
              {strategy.topicRecommendations.map((topic, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold text-white flex-1">{topic.topic}</h4>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${getImpactColor(topic.impact)}`}>
                        {topic.impact} impact
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${getEffortColor(topic.effort)}`}>
                        {topic.effort} effort
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-2">
                    <div>
                      <span className="text-slate-500 text-xs">Audience:</span>
                      <div className="text-slate-300">{topic.targetAudience}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">Stage:</span>
                      <div className="text-slate-300">{topic.buyerStage}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">Format:</span>
                      <div className="text-slate-300">{topic.contentFormat}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">SEO:</span>
                      <div className="text-slate-300">{topic.seoOpportunity}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 italic">{topic.keyTakeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User Journey Mapping */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Map className="w-6 h-6 text-orange-400" />
              User Journey Content Mapping
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(strategy.userJourneyMapping).map(([stage, content]) => (
                <div key={stage} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-orange-400 mb-3 capitalize">{stage}</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {content.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Framework */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Content Calendar Framework</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <span className="text-sm text-slate-500">Publishing Frequency:</span>
                <div className="text-slate-300 mt-1">{strategy.calendarFramework.publishingFrequency}</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <span className="text-sm text-slate-500">Content Mix:</span>
                <div className="text-slate-300 mt-1">{strategy.calendarFramework.contentMix}</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <span className="text-sm text-slate-500">Seasonal Opportunities:</span>
                <ul className="text-slate-300 mt-1 space-y-1">
                  {strategy.calendarFramework.seasonalOpportunities.map((opp, i) => (
                    <li key={i}>• {opp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              {strategy.performanceMetrics.map((metric, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-blue-400 mb-2">{metric.contentType}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Key Metrics:</span>
                      <div className="text-slate-300 mt-1">{metric.keyMetrics.join(', ')}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Success Criteria:</span>
                      <div className="text-slate-300 mt-1">{metric.successCriteria}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}