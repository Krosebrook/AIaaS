import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { FileText, Download, Loader2, TrendingUp, BarChart3, Calendar, Clock, Play } from 'lucide-react';

export default function AIReportGenerator({ contentData, seoData, strategyData }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('comprehensive');
  const [reportHistory, setReportHistory] = useState([]);
  const [autoReportSchedule, setAutoReportSchedule] = useState('off');
  const [lastReportDate, setLastReportDate] = useState(null);
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('reportHistory');
    if (savedHistory) {
      setReportHistory(JSON.parse(savedHistory));
    }
    
    const savedSchedule = localStorage.getItem('autoReportSchedule');
    if (savedSchedule) {
      setAutoReportSchedule(savedSchedule);
    }
    
    const savedLastReport = localStorage.getItem('lastReportDate');
    if (savedLastReport) {
      setLastReportDate(new Date(savedLastReport));
    }
  }, []);

  useEffect(() => {
    if (autoReportSchedule !== 'off' && shouldGenerateAutoReport()) {
      generateAutomatedReport();
    }
  }, [autoReportSchedule]);

  const shouldGenerateAutoReport = () => {
    if (!lastReportDate) return true;
    
    const now = new Date();
    const daysSinceLastReport = (now - lastReportDate) / (1000 * 60 * 60 * 24);
    
    switch (autoReportSchedule) {
      case 'daily':
        return daysSinceLastReport >= 1;
      case 'weekly':
        return daysSinceLastReport >= 7;
      case 'monthly':
        return daysSinceLastReport >= 30;
      default:
        return false;
    }
  };

  const generateAutomatedReport = async () => {
    await generateReport(true);
  };

  const generateReport = async (isAutomated = false) => {
    setLoading(true);
    try {
      const historicalData = reportHistory.slice(-3).map(r => ({
        date: r.date,
        metrics: r.report?.contentPerformance?.metrics
      }));

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a comprehensive AI-powered content performance report for ${new Date().toLocaleDateString()}.

Content Data:
${JSON.stringify(contentData || {}, null, 2)}

SEO Data:
${JSON.stringify(seoData || {}, null, 2)}

Strategy Data:
${JSON.stringify(strategyData || {}, null, 2)}

Historical Performance (last 3 reports):
${JSON.stringify(historicalData, null, 2)}

Report Type: ${reportType}
Is Automated: ${isAutomated}

Create a detailed report including:
1. Executive Summary (key insights and wins)
2. Content Performance Analysis
   - Generated content volume and types
   - Engagement metrics and trends over time
   - Top performing content pieces
   - Comparison with historical data (if available)
3. SEO Performance
   - Keyword rankings improvement
   - Organic traffic trends and patterns
   - Content optimization opportunities
   - Competitive analysis insights
4. User Engagement Analysis
   - Time on page, bounce rate trends
   - Content consumption patterns
   - Audience behavior insights
5. Trend Analysis
   - Emerging topics and themes
   - Seasonal patterns detected
   - Predicted content opportunities
6. Strategic Recommendations
   - What's working and why
   - Areas for improvement with data backing
   - Quick wins for next period
   - Long-term strategic adjustments
7. Action Items (prioritized list with deadlines)
8. Forecast and Predictions (next 30 days with confidence levels)

Make it data-driven, actionable, and executive-friendly. Include comparisons to previous periods where applicable.`,
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
                      insight: { type: "string" },
                      changeFromPrevious: { type: "string" }
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
            engagementAnalysis: {
              type: "object",
              properties: {
                summary: { type: "string" },
                patterns: { type: "array", items: { type: "string" } }
              }
            },
            trendAnalysis: {
              type: "object",
              properties: {
                emergingTopics: { type: "array", items: { type: "string" } },
                seasonalPatterns: { type: "array", items: { type: "string" } },
                opportunities: { type: "array", items: { type: "string" } }
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
            actionItems: { 
              type: "array", 
              items: {
                type: "object",
                properties: {
                  action: { type: "string" },
                  deadline: { type: "string" },
                  owner: { type: "string" }
                }
              }
            },
            forecast: { type: "string" }
          }
        }
      });

      const reportWithMetadata = {
        report: result,
        date: new Date().toISOString(),
        type: reportType,
        isAutomated
      };

      setReport(result);
      
      const updatedHistory = [...reportHistory, reportWithMetadata].slice(-10);
      setReportHistory(updatedHistory);
      localStorage.setItem('reportHistory', JSON.stringify(updatedHistory));
      
      const now = new Date();
      setLastReportDate(now);
      localStorage.setItem('lastReportDate', now.toISOString());

      if (isAutomated) {
        autoExportReport(result, now);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const autoExportReport = (reportData, date) => {
    const reportText = formatReportForExport(reportData, date);
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `automated-report-${date.toISOString().split('T')[0]}.md`;
    a.click();
  };

  const formatReportForExport = (reportData, date = new Date()) => {
    return `
# AI Content Performance Report
Date: ${date.toLocaleDateString()}
Generated: ${date.toLocaleString()}

## Executive Summary
${reportData.executiveSummary}

## Content Performance
${reportData.contentPerformance.overview}

### Key Metrics
${reportData.contentPerformance.metrics.map(m => `
- **${m.metric}**: ${m.value} (${m.trend})
  - Change: ${m.changeFromPrevious || 'N/A'}
  - Insight: ${m.insight}
`).join('\n')}

## SEO Performance
${reportData.seoPerformance.overview}

### Key Findings
${reportData.seoPerformance.keyFindings.map(f => `- ${f}`).join('\n')}

## User Engagement Analysis
${reportData.engagementAnalysis?.summary || 'N/A'}

### Engagement Patterns
${reportData.engagementAnalysis?.patterns?.map(p => `- ${p}`).join('\n') || 'N/A'}

## Trend Analysis

### Emerging Topics
${reportData.trendAnalysis?.emergingTopics?.map(t => `- ${t}`).join('\n') || 'N/A'}

### Seasonal Patterns
${reportData.trendAnalysis?.seasonalPatterns?.map(p => `- ${p}`).join('\n') || 'N/A'}

### Content Opportunities
${reportData.trendAnalysis?.opportunities?.map(o => `- ${o}`).join('\n') || 'N/A'}

## Strategic Recommendations
${reportData.recommendations.map(r => `
### ${r.title}
**Priority**: ${r.priority} | **Impact**: ${r.impact} | **Effort**: ${r.effort}

${r.description}
`).join('\n')}

## Action Items
${reportData.actionItems.map((item, i) => `${i + 1}. ${item.action || item}${item.deadline ? ` (Due: ${item.deadline})` : ''}${item.owner ? ` [Owner: ${item.owner}]` : ''}`).join('\n')}

## 30-Day Forecast
${reportData.forecast}

---
*Report generated automatically by AI Content Intelligence System*
    `;
  };

  const exportReport = (format = 'markdown') => {
    if (!report) return;
    
    const reportText = formatReportForExport(report);

    if (format === 'markdown') {
      const blob = new Blob([reportText], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-content-report-${new Date().toISOString().split('T')[0]}.md`;
      a.click();
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-content-report-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };

  const loadHistoricalReport = (historicalReport) => {
    setReport(historicalReport.report);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-int-orange" />
              AI Performance Reporting
            </h3>
            <p className="text-signal-white/70">Automated insights with trend analysis and recommendations</p>
          </div>
          {lastReportDate && (
            <div className="text-right text-sm">
              <div className="text-signal-white/60">Last Report</div>
              <div className="text-signal-white font-semibold">{lastReportDate.toLocaleDateString()}</div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-signal-white/70 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:border-int-orange focus:outline-none"
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="executive">Executive Summary</option>
              <option value="technical">Technical Deep Dive</option>
              <option value="strategic">Strategic Overview</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-signal-white/70 mb-2">Auto-Report Schedule</label>
            <div className="flex gap-2">
              <select
                value={autoReportSchedule}
                onChange={(e) => {
                  setAutoReportSchedule(e.target.value);
                  localStorage.setItem('autoReportSchedule', e.target.value);
                }}
                className="flex-1 px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:border-int-teal focus:outline-none"
              >
                <option value="off">Off</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <button
                onClick={() => setShowScheduleOptions(!showScheduleOptions)}
                className="px-3 py-2 bg-int-teal/20 border border-int-teal/30 rounded-lg hover:bg-int-teal/30 transition-all"
                title="Schedule info"
              >
                <Calendar className="w-5 h-5 text-int-teal" />
              </button>
            </div>
          </div>
        </div>

        {showScheduleOptions && autoReportSchedule !== 'off' && (
          <div className="p-4 bg-int-teal/10 rounded-lg border border-int-teal/30 mb-6">
            <div className="flex items-start gap-2 text-sm">
              <Clock className="w-4 h-4 text-int-teal mt-0.5 flex-shrink-0" />
              <div className="text-signal-white/80">
                <strong>Automated Reporting:</strong> Reports will be automatically generated {autoReportSchedule} and exported to your downloads folder. 
                {shouldGenerateAutoReport() && <span className="text-int-teal font-semibold"> Next report due now!</span>}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => generateReport(false)}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate Report Now
              </>
            )}
          </button>

          {autoReportSchedule !== 'off' && (
            <button
              onClick={generateAutomatedReport}
              disabled={loading}
              className="px-6 py-3 bg-int-teal/30 border border-int-teal/50 rounded-lg font-semibold hover:bg-int-teal/40 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run Auto-Report
            </button>
          )}
        </div>
      </div>

      {reportHistory.length > 0 && (
        <div className="p-6 bg-void rounded-xl border border-slate-700">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-int-teal" />
            Report History
          </h4>
          <div className="space-y-2">
            {reportHistory.slice().reverse().slice(0, 5).map((histReport, i) => (
              <button
                key={i}
                onClick={() => loadHistoricalReport(histReport)}
                className="w-full p-3 bg-carbon-night rounded-lg border border-slate-700 hover:border-int-orange transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-signal-white">
                      {histReport.type.charAt(0).toUpperCase() + histReport.type.slice(1)} Report
                    </div>
                    <div className="text-xs text-signal-white/60">
                      {new Date(histReport.date).toLocaleString()}
                      {histReport.isAutomated && <span className="ml-2 text-int-teal">• Automated</span>}
                    </div>
                  </div>
                  <FileText className="w-5 h-5 text-signal-white/40" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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

          {/* Engagement Analysis */}
          {report.engagementAnalysis && (
            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h4 className="text-xl font-bold mb-4 text-int-navy">User Engagement Analysis</h4>
              <p className="text-signal-white/80 mb-4">{report.engagementAnalysis.summary}</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {report.engagementAnalysis.patterns?.map((pattern, i) => (
                  <div key={i} className="p-3 bg-void rounded-lg border border-int-navy/30">
                    <span className="text-sm text-signal-white/80">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trend Analysis */}
          {report.trendAnalysis && (
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
              <h4 className="text-xl font-bold mb-4 text-purple-400">Trend Analysis</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-signal-white/70 mb-2">Emerging Topics</h5>
                  <div className="flex flex-wrap gap-2">
                    {report.trendAnalysis.emergingTopics?.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        🔥 {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-signal-white/70 mb-2">Seasonal Patterns</h5>
                  <div className="space-y-1">
                    {report.trendAnalysis.seasonalPatterns?.map((pattern, i) => (
                      <div key={i} className="text-sm text-signal-white/80">📊 {pattern}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-signal-white/70 mb-2">Content Opportunities</h5>
                  <div className="space-y-1">
                    {report.trendAnalysis.opportunities?.map((opp, i) => (
                      <div key={i} className="text-sm text-signal-white/80">💡 {opp}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <div className="flex-1">
                    <span className="text-signal-white/80">{item.action || item}</span>
                    {item.deadline && (
                      <div className="text-xs text-int-orange mt-1">Due: {item.deadline}</div>
                    )}
                    {item.owner && (
                      <div className="text-xs text-signal-white/60 mt-1">Owner: {item.owner}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Forecast */}
          <div className="p-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20 rounded-xl border border-int-teal/30">
            <h4 className="text-xl font-bold mb-4 text-int-teal">30-Day Forecast</h4>
            <p className="text-signal-white/90 leading-relaxed">{report.forecast}</p>
          </div>

          {/* Export Options */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => exportReport('markdown')}
              className="px-6 py-3 bg-int-teal/30 border border-int-teal/50 rounded-lg font-semibold hover:bg-int-teal/40 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export as Markdown
            </button>
            <button
              onClick={() => exportReport('json')}
              className="px-6 py-3 bg-int-navy/30 border border-int-navy/50 rounded-lg font-semibold hover:bg-int-navy/40 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export as JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}