import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, Target, Lightbulb, Search, Loader2, BookOpen, FileText, Briefcase } from 'lucide-react';

/**
 * AI-Powered Content Gap Analyzer
 * Analyzes competitor strategies, market gaps, and suggests thought leadership content
 */
export default function ContentGapAnalyzer() {
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [competitors, setCompetitors] = useState('');

  const analyzeMarket = async () => {
    setAnalyzing(true);
    try {
      // Get user segment data for targeted analysis
      const userSegment = JSON.parse(localStorage.getItem('user_segment') || 'null');
      const allVisitors = JSON.parse(localStorage.getItem('visitor_segments') || '[]');
      
      // Step 1: Analyze competitor content strategies
      const competitorAnalysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze current AI consulting and implementation market content landscape.

Competitors to analyze: ${competitors || 'Major AI consulting firms, McKinsey AI, Accenture AI, Deloitte AI, IBM Consulting'}

Research and analyze:
1. What topics are competitors covering extensively?
2. What content formats are they using (blogs, whitepapers, case studies)?
3. What emerging AI topics are UNDER-covered in the market?
4. What unique angles or perspectives are missing?
5. What client pain points are not being addressed?

Focus on: Enterprise AI implementation, AI security, AI governance, practical AI adoption.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            competitorTopics: {
              type: 'array',
              items: { type: 'string' }
            },
            overCoveredTopics: {
              type: 'array',
              items: { type: 'string' }
            },
            underCoveredTopics: {
              type: 'array',
              items: { type: 'string' }
            },
            contentGaps: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  gap: { type: 'string' },
                  opportunity: { type: 'string' },
                  difficulty: { type: 'string' }
                }
              }
            },
            emergingTrends: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      });

      // Step 2: Get client engagement patterns
      const resources = await base44.entities.Resource.list('-created_date', 20);
      const engagementData = {
        topCategories: resources.reduce((acc, r) => {
          acc[r.category] = (acc[r.category] || 0) + 1;
          return acc;
        }, {}),
        topTopics: resources.flatMap(r => r.topics || []).reduce((acc, t) => {
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {})
      };

      // Step 3: Generate strategic content recommendations with segment insights
      const recommendations = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a content strategy consultant for INTinc.com, an enterprise AI consulting firm.

USER SEGMENT INSIGHTS:
Current User Segment: ${userSegment?.segment || 'Unknown'}
Segment Pain Points: ${userSegment?.painPoints?.join('; ') || 'Unknown'}
All Visitor Segments Detected: ${allVisitors.map(s => s.segment).join(', ') || 'Building data...'}

Competitor Analysis:
- Over-covered topics: ${competitorAnalysis.overCoveredTopics.join(', ')}
- Under-covered topics: ${competitorAnalysis.underCoveredTopics.join(', ')}
- Market gaps: ${competitorAnalysis.contentGaps.map(g => g.gap).join(', ')}
- Emerging trends: ${competitorAnalysis.emergingTrends.join(', ')}

Current Content Performance:
- Top categories: ${Object.entries(engagementData.topCategories).map(([k, v]) => `${k}(${v})`).join(', ')}
- Popular topics: ${Object.entries(engagementData.topTopics).slice(0, 5).map(([k, v]) => `${k}(${v})`).join(', ')}

Generate 12 strategic content recommendations (4 blog posts, 4 whitepapers, 4 case study ideas) that:
1. Fill identified market gaps
2. Position INTinc as a thought leader in emerging AI fields
3. Address under-covered topics competitors are missing
4. Leverage emerging trends before they become saturated
5. Build on existing engagement patterns

For each recommendation provide:
- Title (compelling, SEO-friendly)
- Content type (Blog Post, Whitepaper, or Case Study)
- Target audience (CTO, CEO, AI Team Lead, etc.)
- Unique angle (what makes this different/valuable)
- SEO keywords (3-5)
- Estimated impact (High/Medium)
- Difficulty to produce (Low/Medium/High)
- Time to produce (days)
- Why now (why this content is timely)`,
        response_json_schema: {
          type: 'object',
          properties: {
            blogPosts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  targetAudience: { type: 'string' },
                  uniqueAngle: { type: 'string' },
                  keywords: { type: 'array', items: { type: 'string' } },
                  estimatedImpact: { type: 'string' },
                  difficulty: { type: 'string' },
                  timeToProduce: { type: 'number' },
                  whyNow: { type: 'string' }
                }
              }
            },
            whitepapers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  targetAudience: { type: 'string' },
                  uniqueAngle: { type: 'string' },
                  keywords: { type: 'array', items: { type: 'string' } },
                  estimatedImpact: { type: 'string' },
                  difficulty: { type: 'string' },
                  timeToProduce: { type: 'number' },
                  whyNow: { type: 'string' }
                }
              }
            },
            caseStudies: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  targetAudience: { type: 'string' },
                  uniqueAngle: { type: 'string' },
                  keywords: { type: 'array', items: { type: 'string' } },
                  estimatedImpact: { type: 'string' },
                  difficulty: { type: 'string' },
                  timeToProduce: { type: 'number' },
                  whyNow: { type: 'string' }
                }
              }
            },
            strategicInsights: {
              type: 'array',
              items: { type: 'string' }
            },
            segmentInsights: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  segment: { type: 'string' },
                  contentNeeds: { type: 'string' },
                  priority: { type: 'string' }
                }
              }
            }
            }
            }
            });

            setAnalysis({
            competitorAnalysis,
            recommendations,
            userSegment,
            timestamp: new Date().toISOString()
            });

      base44.analytics.track({
        eventName: 'content_gap_analysis_completed'
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getImpactColor = (impact) => {
    return impact === 'High' ? 'text-green-400 bg-green-500/20 border-green-500/30' : 'text-blue-400 bg-blue-500/20 border-blue-500/30';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Low') return 'text-green-400 bg-green-500/20';
    if (difficulty === 'Medium') return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Blog Post': return BookOpen;
      case 'Whitepaper': return FileText;
      case 'Case Study': return Briefcase;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-void text-signal-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-int-orange/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-int-orange" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Content Gap Analyzer</h1>
              <p className="text-signal-white/70 text-lg">AI-powered competitive intelligence & thought leadership strategy</p>
            </div>
          </div>

          <div className="p-6 bg-carbon-night border border-slate-700 rounded-xl mb-6">
            <label className="block text-sm font-medium mb-3">
              Competitors to Analyze (optional - defaults to major AI consulting firms)
            </label>
            <input
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="e.g., McKinsey AI, Accenture AI, Deloitte AI..."
              className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
            />
          </div>

          <button
            onClick={analyzeMarket}
            disabled={analyzing}
            className="w-full px-6 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Market & Competitors...
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                Run Market Analysis
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Current User Segment */}
            {analysis.userSegment && (
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Your User Segment</h3>
                <div className="flex items-start gap-4">
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg font-bold text-blue-400">
                    {analysis.userSegment.segment}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-signal-white/80 mb-2">
                      Confidence: {analysis.userSegment.confidence}%
                    </div>
                    <div className="text-xs text-signal-white/60">
                      Content tailored for: {analysis.userSegment.recommendedContentTypes?.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Strategic Insights */}
            <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-400" />
                Strategic Insights
              </h2>
              <div className="space-y-3">
                {analysis.recommendations.strategicInsights.map((insight, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg flex gap-3">
                    <span className="text-purple-400 flex-shrink-0 font-bold">{i + 1}.</span>
                    <span className="text-signal-white/90">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Segment-Specific Insights */}
            {analysis.recommendations.segmentInsights && analysis.recommendations.segmentInsights.length > 0 && (
              <div className="p-8 bg-gradient-to-br from-int-orange/10 to-int-teal/10 border border-int-orange/30 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Segment-Specific Content Strategy</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.recommendations.segmentInsights.map((insight, i) => (
                    <div key={i} className="p-5 bg-void rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-lg">{insight.segment}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          insight.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {insight.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-signal-white/80">{insight.contentNeeds}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Market Gaps */}
            <div className="p-8 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-int-orange" />
                Identified Market Gaps
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.competitorAnalysis.contentGaps.map((gap, i) => (
                  <div key={i} className="p-5 bg-void rounded-lg border border-int-orange/30">
                    <div className="font-semibold text-lg mb-2 text-int-orange">{gap.gap}</div>
                    <div className="text-sm text-signal-white/80 mb-3">{gap.opportunity}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(gap.difficulty)}`}>
                      {gap.difficulty} Difficulty
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Trends */}
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-green-400">Emerging Trends to Capitalize On</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.competitorAnalysis.emergingTrends.map((trend, i) => (
                  <span key={i} className="px-4 py-2 bg-void border border-green-500/30 rounded-lg text-sm font-medium">
                    🔥 {trend}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Recommendations */}
            {['blogPosts', 'whitepapers', 'caseStudies'].map((type) => {
              const items = analysis.recommendations[type];
              const typeName = type === 'blogPosts' ? 'Blog Posts' : type === 'whitepapers' ? 'Whitepapers' : 'Case Studies';
              const Icon = getIcon(typeName.slice(0, -1));

              return (
                <div key={type} className="p-8 bg-carbon-night border border-slate-700 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Icon className="w-6 h-6 text-int-teal" />
                    Recommended {typeName}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((item, i) => (
                      <div key={i} className="p-6 bg-void rounded-lg border border-slate-700 hover:border-int-orange transition-all">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${getImpactColor(item.estimatedImpact)}`}>
                            {item.estimatedImpact} Impact
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="text-xs text-signal-white/60 mb-1">Target Audience</div>
                            <div className="text-sm font-medium">{item.targetAudience}</div>
                          </div>

                          <div>
                            <div className="text-xs text-signal-white/60 mb-1">Unique Angle</div>
                            <div className="text-sm text-signal-white/80">{item.uniqueAngle}</div>
                          </div>

                          <div>
                            <div className="text-xs text-signal-white/60 mb-1">Why Now</div>
                            <div className="text-sm text-int-orange italic">{item.whyNow}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.keywords.map((keyword, j) => (
                            <span key={j} className="px-2 py-1 bg-int-navy/20 border border-int-navy/30 rounded text-xs text-int-teal">
                              {keyword}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}>
                              {item.difficulty}
                            </span>
                            <span className="text-xs text-signal-white/60">
                              {item.timeToProduce} days
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-int-orange hover:bg-int-orange/80 rounded-lg text-sm font-semibold transition-all">
                            Create
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Competitor Intelligence */}
            <div className="p-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Competitive Intelligence</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4 text-red-400">Over-Saturated Topics (Avoid)</h3>
                  <ul className="space-y-2">
                    {analysis.competitorAnalysis.overCoveredTopics.map((topic, i) => (
                      <li key={i} className="text-sm text-signal-white/80 flex gap-2">
                        <span className="text-red-400">✗</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-green-400">Under-Covered Topics (Opportunity)</h3>
                  <ul className="space-y-2">
                    {analysis.competitorAnalysis.underCoveredTopics.map((topic, i) => (
                      <li key={i} className="text-sm text-signal-white/80 flex gap-2">
                        <span className="text-green-400">✓</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}