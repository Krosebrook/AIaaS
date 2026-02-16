import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { FileText, Download, Loader2, TrendingUp, BarChart3 } from 'lucide-react';

export default function AIReportGenerator({ contentData, seoData, strategyData }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('comprehensive');

  const generateReport = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a comprehensive AI-powered content performance report for ${new Date().toLocaleDateString()}.

Content Data:
${JSON.stringify(contentData || {}, null, 2)}

SEO Data:
${JSON.stringify(seoData || {}, null, 2)}

Strategy Data:
${JSON.stringify(strategyData || {}, null, 2)}

Report Type: ${reportType}

Create a detailed report including:
1. Executive Summary (key insights and wins)
2. Content Performance Analysis
   - Generated content volume and types
   - Engagement metrics
   - Top performing content pieces
3. SEO Performance
   - Keyword rankings improvement
   - Organic traffic trends
   - Content optimization opportunities
4. Strategic Recommendations
   - What's working and why
   - Areas for improvement
   - Quick wins for next period
5. Action Items (prioritized list)
6. Forecast and Predictions (next 30 days)

Make it data-driven, actionable, and executive-friendly.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            executiveSummary: { type: "string" },
            contentPerformance: {
              type: "object",
              properties: {
                overview: { type: "string" },
                metrics: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      metric: { type: "string" },
                      value: { type: "string" },
                      trend: { type: "string" },
                      insight: { type: "string" }
                    }
                  }
                }
              }
            },
            seoPerformance: {
              type: "object",
              properties: {
                overview: { type: "string" },
                keyFindings: { type: "array", items: { type: "string" } }
              }
            },
            recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  priority: { type: "string" },
                  impact: { type: "string" },
                  effort: { type: "string" },
                  description: { type: "string" }
                }
              }
            },
            actionItems: { type: "array", items: { type: "string" } },
            forecast: { type: "string" }
          }
        }
      });

      setReport(result);
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!report) return;
    
    const reportText = `
# AI Content Performance Report
Date: ${new Date().toLocaleDateString()}

## Executive Summary
${report.executiveSummary}

## Content Performance
${report.contentPerformance.overview}

### Key Metrics
${report.contentPerformance.metrics.map(m => `- ${m.metric}: ${m.value} (${m.trend})\n  ${m.insight}`).join('\n')}

## SEO Performance
${report.seoPerformance.overview}

### Key Findings
${report.seoPerformance.keyFindings.map(f => `- ${f}`).join('\n')}

## Strategic Recommendations
${report.recommendations.map(r => `
### ${r.title}
Priority: ${r.priority} | Impact: ${r.impact} | Effort: ${r.effort}
${r.description}
`).join('\n')}

## Action Items
${report.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

## 30-Day Forecast
${report.forecast}
    `;

    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-content-report-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">AI Performance Report</h3>
            <p className="text-signal-white/70">Automated insights and recommendations based on your content data</p>
          </div>
          <BarChart3 className="w-12 h-12 text-int-orange" />
        </div>

        <div className="flex gap-4 mb-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white"
          >
            <option value="comprehensive">Comprehensive Report</option>
            <option value="executive">Executive Summary</option>
            <option value="technical">Technical Deep Dive</option>
            <option value="strategic">Strategic Overview</option>
          </select>

          <button
            onClick={generateReport}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {report && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="p-6 bg-void rounded-xl border-2 border-int-orange">
            <h4 className="text-xl font-bold mb-4 text-int-orange">Executive Summary</h4>
            <p className="text-signal-white/90 leading-relaxed">{report.executiveSummary}</p>
          </div>

          {/* Content Performance */}
          <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
            <h4 className="text-xl font-bold mb-4 text-int-navy">Content Performance</h4>
            <p className="text-signal-white/80 mb-6">{report.contentPerformance.overview}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {report.contentPerformance.metrics.map((metric, i) => (
                <div key={i} className="p-4 bg-void rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{metric.metric}</span>
                    <span className={`text-sm font-bold ${
                      metric.trend.includes('↑') || metric.trend.includes('up') ? 'text-green-500' : 
                      metric.trend.includes('↓') || metric.trend.includes('down') ? 'text-red-500' : 
                      'text-yellow-500'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-int-orange mb-2">{metric.value}</div>
                  <p className="text-xs text-signal-white/60">{metric.insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Performance */}
          <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
            <h4 className="text-xl font-bold mb-4 text-int-teal">SEO Performance</h4>
            <p className="text-signal-white/80 mb-4">{report.seoPerformance.overview}</p>
            
            <div className="space-y-2">
              {report.seoPerformance.keyFindings.map((finding, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-void rounded-lg">
                  <TrendingUp className="w-4 h-4 text-int-teal mt-1 flex-shrink-0" />
                  <span className="text-sm text-signal-white/80">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
            <h4 className="text-xl font-bold mb-4">Strategic Recommendations</h4>
            
            <div className="space-y-4">
              {report.recommendations.map((rec, i) => (
                <div key={i} className="p-4 bg-void rounded-lg border border-slate-700">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-bold text-lg">{rec.title}</h5>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  
                  <div className="flex gap-4 mb-3 text-xs text-signal-white/60">
                    <span>Impact: <strong>{rec.impact}</strong></span>
                    <span>Effort: <strong>{rec.effort}</strong></span>
                  </div>
                  
                  <p className="text-sm text-signal-white/80">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="p-6 bg-void rounded-xl border border-int-navy/30">
            <h4 className="text-xl font-bold mb-4">Action Items</h4>
            <ul className="space-y-2">
              {report.actionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-carbon-night rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-int-orange/20 flex items-center justify-center text-sm font-bold text-int-orange flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-signal-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Forecast */}
          <div className="p-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20 rounded-xl border border-int-teal/30">
            <h4 className="text-xl font-bold mb-4 text-int-teal">30-Day Forecast</h4>
            <p className="text-signal-white/90 leading-relaxed">{report.forecast}</p>
          </div>

          {/* Export Button */}
          <div className="flex justify-center">
            <button
              onClick={exportReport}
              className="px-6 py-3 bg-int-teal/30 border border-int-teal/50 rounded-lg font-semibold hover:bg-int-teal/40 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}