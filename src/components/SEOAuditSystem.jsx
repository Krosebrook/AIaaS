import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Search, AlertCircle, CheckCircle, Loader2, Download, Users, Lightbulb, Link2 } from 'lucide-react';
import ConfirmationDialog from './shell/ConfirmationDialog';
import SEOAnalytics from './SEOAnalytics';

export default function SEOAuditSystem() {
  const [auditResults, setAuditResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState('all');
  const [showAuditConfirm, setShowAuditConfirm] = useState(false);
  
  const [competitorAnalysis, setCompetitorAnalysis] = useState(null);
  const [keywordResearch, setKeywordResearch] = useState(null);
  const [backlinkSuggestions, setBacklinkSuggestions] = useState(null);
  
  const [loadingCompetitor, setLoadingCompetitor] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [loadingBacklinks, setLoadingBacklinks] = useState(false);
  
  const [showCompetitorConfirm, setShowCompetitorConfirm] = useState(false);
  const [showKeywordConfirm, setShowKeywordConfirm] = useState(false);
  const [showBacklinkConfirm, setShowBacklinkConfirm] = useState(false);
  
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');

  const pages = ['Home', 'Services', 'CaseStudies', 'About', 'Contact', 'Workshops'];

  const handleAuditClick = () => {
    setShowAuditConfirm(true);
  };

  const runAudit = async () => {
    setShowAuditConfirm(false);
    setLoading(true);
    try {
      const pageContent = {
        Home: 'AI for YOUR Business, enterprise AI implementation, INTinc.com services',
        Services: 'AI security, rapid prototyping, custom engineering, training workshops',
        CaseStudies: 'Knowledge management, prospecting automation, marketing intelligence',
        About: 'MSP discipline, AI expertise, production-ready systems',
        Contact: 'Contact INTinc.com, AI consultation, free security assessment',
        Workshops: 'AI Demystification, Implementation Bootcamp, Ideation Workshop'
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Perform comprehensive SEO audit for INTinc.com website.

Page Content Summary:
${Object.entries(pageContent).map(([page, content]) => `${page}: ${content}`).join('\n')}

Target Keywords: enterprise AI implementation, AI security, business AI solutions, AI consulting, AI workshops

Analyze and provide:
1. Keyword Gaps: Missing high-value keywords for AI implementation services
2. Semantic HTML Issues: Pages needing better heading structure, alt text, ARIA labels
3. Schema Markup Recommendations: Specific schema types for each page (Organization, Service, Article)
4. Internal Linking Strategy: Suggest 5 key internal links to improve crawlability
5. Content Optimization: Pages needing more focused keyword usage
6. Technical SEO Score: Overall score (1-100) with breakdown

Be specific and actionable.`,
        response_json_schema: {
          type: "object",
          properties: {
            keywordGaps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  priority: { type: "string" },
                  suggestedPage: { type: "string" }
                }
              }
            },
            semanticIssues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  page: { type: "string" },
                  issue: { type: "string" },
                  fix: { type: "string" }
                }
              }
            },
            schemaRecommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  page: { type: "string" },
                  schemaType: { type: "string" },
                  implementation: { type: "string" }
                }
              }
            },
            internalLinkingStrategy: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  fromPage: { type: "string" },
                  toPage: { type: "string" },
                  anchorText: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            contentOptimization: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  page: { type: "string" },
                  recommendation: { type: "string" }
                }
              }
            },
            technicalScore: {
              type: "object",
              properties: {
                overall: { type: "number" },
                content: { type: "number" },
                technical: { type: "number" },
                structure: { type: "number" }
              }
            }
          }
        }
      });

      setAuditResults(result);
    } catch (error) {
      console.error('SEO audit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const report = JSON.stringify(auditResults, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intinc-seo-audit-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const runCompetitorAnalysis = async () => {
    setShowCompetitorConfirm(false);
    setLoadingCompetitor(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze competitor SEO strategy and identify content gaps for INTinc.com.

Competitor URL: ${competitorUrl || 'Top 3 enterprise AI consulting firms'}
Our Niche: Enterprise AI implementation, AI security, custom AI engineering
Our Target Keywords: enterprise AI, AI consulting, AI workshops, business AI solutions

Using web search, analyze competitor strategies and provide:
1. Competitor Content Strategy: Topics they cover, content types, publishing frequency
2. Keyword Opportunities: Keywords they rank for that we don't target
3. Content Gaps: Topics/angles they're missing that we can exploit
4. Link Building Strategy: Types of backlinks they have (directories, partnerships, guest posts)
5. Technical Advantages: Site speed, mobile optimization, schema usage
6. Recommended Actions: 5 specific actions we should take to compete

Be specific and actionable.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            competitorName: { type: "string" },
            contentStrategy: {
              type: "object",
              properties: {
                topTopics: { type: "array", items: { type: "string" } },
                contentTypes: { type: "array", items: { type: "string" } },
                publishingFrequency: { type: "string" }
              }
            },
            keywordOpportunities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  difficulty: { type: "string" },
                  searchVolume: { type: "string" },
                  competitorRank: { type: "string" }
                }
              }
            },
            contentGaps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  topic: { type: "string" },
                  angle: { type: "string" },
                  opportunity: { type: "string" }
                }
              }
            },
            linkBuildingStrategy: {
              type: "object",
              properties: {
                directories: { type: "array", items: { type: "string" } },
                partnerships: { type: "array", items: { type: "string" } },
                guestPosts: { type: "array", items: { type: "string" } }
              }
            },
            technicalAdvantages: { type: "array", items: { type: "string" } },
            recommendedActions: { type: "array", items: { type: "string" } }
          }
        }
      });

      setCompetitorAnalysis(result);
    } catch (error) {
      console.error('Competitor analysis failed:', error);
    } finally {
      setLoadingCompetitor(false);
    }
  };

  const runKeywordResearch = async () => {
    setShowKeywordConfirm(false);
    setLoadingKeywords(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Perform AI-driven keyword research for enterprise AI consulting.

Seed Keyword: ${targetKeyword || 'enterprise AI implementation'}
Industry: B2B AI Consulting, Technology Services
Target Audience: CTOs, IT Directors, Business Leaders

Using web search and semantic understanding, provide:
1. Long-tail Keywords: 15 specific long-tail variations with search intent (informational, commercial, transactional)
2. Semantic Variations: Related terms and concepts users search for
3. Question-based Keywords: "How to", "What is", "Best practices" queries
4. User Intent Analysis: Map keywords to buyer journey stage (awareness, consideration, decision)
5. Competition Analysis: Difficulty level for each keyword (low, medium, high)
6. Content Recommendations: What content type works best for each keyword (blog, case study, landing page)

Focus on actionable keywords we can rank for.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            longTailKeywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  searchIntent: { type: "string" },
                  volume: { type: "string" },
                  difficulty: { type: "string" }
                }
              }
            },
            semanticVariations: { type: "array", items: { type: "string" } },
            questionKeywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  buyerStage: { type: "string" }
                }
              }
            },
            intentMapping: {
              type: "object",
              properties: {
                awareness: { type: "array", items: { type: "string" } },
                consideration: { type: "array", items: { type: "string" } },
                decision: { type: "array", items: { type: "string" } }
              }
            },
            contentRecommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  contentType: { type: "string" },
                  priority: { type: "string" }
                }
              }
            }
          }
        }
      });

      setKeywordResearch(result);
    } catch (error) {
      console.error('Keyword research failed:', error);
    } finally {
      setLoadingKeywords(false);
    }
  };

  const runBacklinkAnalysis = async () => {
    setShowBacklinkConfirm(false);
    setLoadingBacklinks(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Identify backlink opportunities and outreach strategies for INTinc.com.

Industry: Enterprise AI Consulting, Technology Services
Target Audience: B2B, Enterprise clients
Our Content: AI implementation guides, case studies, workshops, technical documentation

Using web search, identify and provide:
1. High-Authority Opportunities: 10 websites/platforms where we should pursue backlinks
2. Content Partnership Ideas: Guest post topics that would appeal to target sites
3. Resource Page Opportunities: Industry resource pages that should link to us
4. Broken Link Opportunities: Sites with broken links we can replace
5. HARO/PR Opportunities: Topics where we can provide expert commentary
6. Outreach Templates: 3 email templates for different outreach scenarios
7. Priority Actions: Top 5 immediate backlink opportunities with specific contacts

Focus on realistic, achievable opportunities.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            highAuthorityTargets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  website: { type: "string" },
                  domainAuthority: { type: "string" },
                  linkType: { type: "string" },
                  difficulty: { type: "string" }
                }
              }
            },
            guestPostIdeas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  topic: { type: "string" },
                  targetSite: { type: "string" },
                  angle: { type: "string" }
                }
              }
            },
            resourcePageOpportunities: { type: "array", items: { type: "string" } },
            brokenLinkOpportunities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  targetSite: { type: "string" },
                  brokenUrl: { type: "string" },
                  ourReplacement: { type: "string" }
                }
              }
            },
            outreachTemplates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  scenario: { type: "string" },
                  subject: { type: "string" },
                  template: { type: "string" }
                }
              }
            },
            priorityActions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  opportunity: { type: "string" },
                  contact: { type: "string" },
                  nextStep: { type: "string" }
                }
              }
            }
          }
        }
      });

      setBacklinkSuggestions(result);
    } catch (error) {
      console.error('Backlink analysis failed:', error);
    } finally {
      setLoadingBacklinks(false);
    }
  };

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            SEO Audit Dashboard
          </h1>
          <p className="text-signal-white/70">AI-powered SEO analysis and recommendations</p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handleAuditClick}
            disabled={loading}
            className="p-6 bg-gradient-to-br from-int-orange/20 to-int-navy/20 border-2 border-int-orange/30 rounded-xl font-semibold hover:border-int-orange transition-all disabled:opacity-50"
          >
            <Search className="w-8 h-8 text-int-orange mb-3" />
            <div className="text-left">
              <div className="font-bold mb-1">SEO Audit</div>
              <div className="text-xs text-signal-white/60">Full site analysis</div>
            </div>
          </button>

          <button
            onClick={() => setShowCompetitorConfirm(true)}
            disabled={loadingCompetitor}
            className="p-6 bg-gradient-to-br from-int-navy/20 to-int-teal/20 border-2 border-int-navy/30 rounded-xl font-semibold hover:border-int-navy transition-all disabled:opacity-50"
          >
            <Users className="w-8 h-8 text-int-navy mb-3" />
            <div className="text-left">
              <div className="font-bold mb-1">Competitor Analysis</div>
              <div className="text-xs text-signal-white/60">Strategy & gaps</div>
            </div>
          </button>

          <button
            onClick={() => setShowKeywordConfirm(true)}
            disabled={loadingKeywords}
            className="p-6 bg-gradient-to-br from-int-teal/20 to-int-orange/20 border-2 border-int-teal/30 rounded-xl font-semibold hover:border-int-teal transition-all disabled:opacity-50"
          >
            <Lightbulb className="w-8 h-8 text-int-teal mb-3" />
            <div className="text-left">
              <div className="font-bold mb-1">Keyword Research</div>
              <div className="text-xs text-signal-white/60">Long-tail & intent</div>
            </div>
          </button>

          <button
            onClick={() => setShowBacklinkConfirm(true)}
            disabled={loadingBacklinks}
            className="p-6 bg-gradient-to-br from-int-orange/20 to-int-teal/20 border-2 border-int-orange/30 rounded-xl font-semibold hover:border-int-orange transition-all disabled:opacity-50"
          >
            <Link2 className="w-8 h-8 text-int-orange mb-3" />
            <div className="text-left">
              <div className="font-bold mb-1">Backlink Strategy</div>
              <div className="text-xs text-signal-white/60">Opportunities & outreach</div>
            </div>
          </button>
        </div>

        {auditResults && (
          <div className="mb-8">
            <button
              onClick={exportReport}
              className="px-6 py-3 bg-void border-2 border-int-navy rounded-lg font-semibold hover:bg-int-navy/10 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        )}
        
        <ConfirmationDialog
          isOpen={showAuditConfirm}
          onClose={() => setShowAuditConfirm(false)}
          onConfirm={runAudit}
          title="Start SEO Audit"
          description="This will perform a comprehensive SEO analysis of your website using AI. The audit will analyze all major pages, identify keyword gaps, and provide recommendations."
          actionType="play"
          actionLabel="Start Audit"
          previewData={{
            scope: 'Full website analysis',
            estimatedTime: '2-3 minutes',
            aiCredits: 'Moderate usage',
            output: 'Detailed SEO report with actionable insights'
          }}
        >
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">What will be analyzed:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keyword density and optimization</li>
              <li>• Meta tags and structured data</li>
              <li>• Internal linking strategy</li>
              <li>• Content gaps and opportunities</li>
              <li>• Technical SEO issues</li>
            </ul>
          </div>
        </ConfirmationDialog>

        <ConfirmationDialog
          isOpen={showCompetitorConfirm}
          onClose={() => setShowCompetitorConfirm(false)}
          onConfirm={runCompetitorAnalysis}
          title="Analyze Competitor SEO Strategy"
          description="AI will research competitor strategies using live web data, identifying content gaps and keyword opportunities."
          actionType="play"
          actionLabel="Analyze Competitors"
          previewData={{
            analysis: 'Top enterprise AI consulting competitors',
            dataSource: 'Live web search',
            estimatedTime: '3-4 minutes',
            output: 'Competitor insights & action plan'
          }}
        >
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Competitor URL (optional)
            </label>
            <input
              type="text"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="https://competitor.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-2">Leave blank to analyze top competitors in your niche</p>
          </div>
        </ConfirmationDialog>

        <ConfirmationDialog
          isOpen={showKeywordConfirm}
          onClose={() => setShowKeywordConfirm(false)}
          onConfirm={runKeywordResearch}
          title="AI-Powered Keyword Research"
          description="Generate long-tail keywords, semantic variations, and map them to user intent using advanced AI analysis."
          actionType="play"
          actionLabel="Research Keywords"
          previewData={{
            scope: 'Comprehensive keyword discovery',
            dataSource: 'Live search data',
            estimatedTime: '2-3 minutes',
            output: 'Actionable keyword strategy'
          }}
        >
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Seed Keyword (optional)
            </label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="enterprise AI implementation"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-2">AI will expand this into dozens of related keywords</p>
          </div>
        </ConfirmationDialog>

        <ConfirmationDialog
          isOpen={showBacklinkConfirm}
          onClose={() => setShowBacklinkConfirm(false)}
          onConfirm={runBacklinkAnalysis}
          title="Discover Backlink Opportunities"
          description="AI will identify high-authority sites, outreach opportunities, and create personalized outreach templates."
          actionType="play"
          actionLabel="Find Backlinks"
          previewData={{
            analysis: 'Industry-specific link opportunities',
            dataSource: 'Live web research',
            estimatedTime: '3-5 minutes',
            output: 'Outreach plan with templates'
          }}
        />

        {auditResults && (
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                <div className="text-sm text-signal-white/60 mb-2">Overall Score</div>
                <div className="text-4xl font-bold text-int-orange">{auditResults.technicalScore.overall}</div>
              </div>
              <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                <div className="text-sm text-signal-white/60 mb-2">Content</div>
                <div className="text-4xl font-bold text-int-navy">{auditResults.technicalScore.content}</div>
              </div>
              <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                <div className="text-sm text-signal-white/60 mb-2">Technical</div>
                <div className="text-4xl font-bold text-int-teal">{auditResults.technicalScore.technical}</div>
              </div>
              <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                <div className="text-sm text-signal-white/60 mb-2">Structure</div>
                <div className="text-4xl font-bold text-int-orange">{auditResults.technicalScore.structure}</div>
              </div>
            </div>

            {/* Keyword Gaps */}
            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-int-orange" />
                Keyword Gaps
              </h3>
              <div className="space-y-3">
                {auditResults.keywordGaps.map((gap, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-int-orange">{gap.keyword}</span>
                      <span className="text-xs px-2 py-1 bg-int-orange/20 rounded-full">{gap.priority}</span>
                    </div>
                    <div className="text-sm text-signal-white/60">Suggested page: {gap.suggestedPage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schema Recommendations */}
            <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-int-teal" />
                Schema Markup Recommendations
              </h3>
              <div className="space-y-3">
                {auditResults.schemaRecommendations.map((rec, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="font-semibold text-int-teal mb-2">{rec.page} → {rec.schemaType}</div>
                    <div className="text-sm text-signal-white/70">{rec.implementation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Linking */}
            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h3 className="text-xl font-bold mb-4">Internal Linking Strategy</h3>
              <div className="space-y-3">
                {auditResults.internalLinkingStrategy.map((link, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-int-navy font-semibold">{link.fromPage}</span>
                      <span className="text-signal-white/40">→</span>
                      <span className="text-int-orange font-semibold">{link.toPage}</span>
                    </div>
                    <div className="text-sm text-signal-white/70 mb-1">Anchor: "{link.anchorText}"</div>
                    <div className="text-xs text-signal-white/50">{link.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Competitor Analysis Results */}
        {competitorAnalysis && (
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Competitor Analysis</h2>
            
            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-int-navy" />
                Keyword Opportunities
              </h3>
              <div className="space-y-3">
                {competitorAnalysis.keywordOpportunities.map((kw, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-int-navy">{kw.keyword}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-int-navy/20 rounded-full">{kw.difficulty}</span>
                        <span className="text-xs px-2 py-1 bg-int-teal/20 rounded-full">{kw.searchVolume}</span>
                      </div>
                    </div>
                    <div className="text-sm text-signal-white/60">Competitor ranks: {kw.competitorRank}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
              <h3 className="text-xl font-bold mb-4">Content Gaps to Exploit</h3>
              <div className="space-y-3">
                {competitorAnalysis.contentGaps.map((gap, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="font-semibold text-int-orange mb-2">{gap.topic}</div>
                    <div className="text-sm text-signal-white/70 mb-1">Angle: {gap.angle}</div>
                    <div className="text-sm text-signal-white/60">{gap.opportunity}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
              <h3 className="text-xl font-bold mb-4">Recommended Actions</h3>
              <div className="space-y-2">
                {competitorAnalysis.recommendedActions.map((action, i) => (
                  <div key={i} className="p-3 bg-void rounded-lg flex items-start gap-3">
                    <span className="text-int-teal font-bold">{i + 1}.</span>
                    <span className="text-signal-white/80">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Keyword Research Results */}
        {keywordResearch && (
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Keyword Research</h2>
            
            <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-int-teal" />
                Long-tail Keywords
              </h3>
              <div className="space-y-3">
                {keywordResearch.longTailKeywords.map((kw, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-int-teal">{kw.keyword}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-int-teal/20 rounded-full">{kw.searchIntent}</span>
                        <span className="text-xs px-2 py-1 bg-int-orange/20 rounded-full">{kw.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-sm text-signal-white/60">Volume: {kw.volume}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                <h4 className="font-semibold mb-3 text-int-navy">Awareness Stage</h4>
                <ul className="space-y-2 text-sm">
                  {keywordResearch.intentMapping.awareness.map((kw, i) => (
                    <li key={i} className="text-signal-white/70">• {kw}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                <h4 className="font-semibold mb-3 text-int-teal">Consideration Stage</h4>
                <ul className="space-y-2 text-sm">
                  {keywordResearch.intentMapping.consideration.map((kw, i) => (
                    <li key={i} className="text-signal-white/70">• {kw}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                <h4 className="font-semibold mb-3 text-int-orange">Decision Stage</h4>
                <ul className="space-y-2 text-sm">
                  {keywordResearch.intentMapping.decision.map((kw, i) => (
                    <li key={i} className="text-signal-white/70">• {kw}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
              <h3 className="text-xl font-bold mb-4">Content Recommendations</h3>
              <div className="space-y-3">
                {keywordResearch.contentRecommendations.map((rec, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-int-orange mb-1">{rec.keyword}</div>
                      <div className="text-sm text-signal-white/60">Recommended: {rec.contentType}</div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-int-orange/20 rounded-full font-semibold">{rec.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Backlink Suggestions Results */}
        {backlinkSuggestions && (
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Backlink Opportunities</h2>
            
            <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-int-orange" />
                High-Authority Targets
              </h3>
              <div className="space-y-3">
                {backlinkSuggestions.highAuthorityTargets.map((target, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-int-orange">{target.website}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-int-orange/20 rounded-full">DA: {target.domainAuthority}</span>
                        <span className="text-xs px-2 py-1 bg-int-navy/20 rounded-full">{target.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-sm text-signal-white/60">Type: {target.linkType}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h3 className="text-xl font-bold mb-4">Guest Post Ideas</h3>
              <div className="space-y-3">
                {backlinkSuggestions.guestPostIdeas.map((idea, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="font-semibold text-int-navy mb-2">{idea.topic}</div>
                    <div className="text-sm text-signal-white/70 mb-1">Target: {idea.targetSite}</div>
                    <div className="text-sm text-signal-white/60">Angle: {idea.angle}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
              <h3 className="text-xl font-bold mb-4">Outreach Templates</h3>
              <div className="space-y-4">
                {backlinkSuggestions.outreachTemplates.map((template, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="font-semibold text-int-teal mb-2">{template.scenario}</div>
                    <div className="text-sm text-signal-white/70 mb-2">Subject: {template.subject}</div>
                    <div className="text-sm text-signal-white/60 bg-carbon-night p-3 rounded border border-int-teal/20 font-mono">
                      {template.template}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
              <h3 className="text-xl font-bold mb-4">Priority Actions</h3>
              <div className="space-y-3">
                {backlinkSuggestions.priorityActions.map((action, i) => (
                  <div key={i} className="p-4 bg-void rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-int-orange font-bold text-lg">{i + 1}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-int-orange mb-1">{action.opportunity}</div>
                        <div className="text-sm text-signal-white/70 mb-1">Contact: {action.contact}</div>
                        <div className="text-sm text-signal-white/60">Next Step: {action.nextStep}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Analytics */}
        {auditResults && (
          <SEOAnalytics auditResults={auditResults} />
        )}
        </div>
        </div>
        );
        }