import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Search, AlertCircle, CheckCircle, Loader2, Download } from 'lucide-react';

export default function SEOAuditSystem() {
  const [auditResults, setAuditResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState('all');

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

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            SEO Audit Dashboard
          </h1>
          <p className="text-signal-white/70">AI-powered SEO analysis and recommendations</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={runAudit}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Audit...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Run SEO Audit
              </>
            )}
          </button>
          {auditResults && (
            <button
              onClick={exportReport}
              className="px-6 py-3 bg-void border-2 border-int-navy rounded-lg font-semibold hover:bg-int-navy/10 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          )}
        </div>

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
      </div>
    </div>
  );
}