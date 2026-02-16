import React, { useState, useEffect } from 'react';
import { useClientHealthScore, useOutreachRecommendations, ClientHealthIndicator } from '../components/ClientOutreachEngine';
import { Activity, Mail, MessageSquare, TrendingDown, Target, Copy, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientHealth() {
  const { healthData, calculateHealthScore, loading: healthLoading } = useClientHealthScore();
  const { recommendations, generateOutreach, loading: outreachLoading } = useOutreachRecommendations();
  const [copied, setCopied] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    // Load cached health score if available
    const cached = localStorage.getItem('clientHealthScore');
    if (cached) {
      // Auto-calculate on mount if no cached data or stale
      const lastCalculated = localStorage.getItem('healthScoreTimestamp');
      const isStale = !lastCalculated || Date.now() - parseInt(lastCalculated) > 3600000; // 1 hour
      
      if (isStale) {
        runAnalysis();
      }
    } else {
      runAnalysis();
    }
  }, []);

  const runAnalysis = async () => {
    setAnalyzing(true);
    const health = await calculateHealthScore();
    if (health) {
      localStorage.setItem('healthScoreTimestamp', Date.now().toString());
      
      // Auto-generate outreach if health is concerning
      if (health.overallScore < 60 || health.outreachTriggers.recommended) {
        await generateOutreach(health, { source: 'auto-trigger' });
      }
    }
    setAnalyzing(false);
  };

  const handleGenerateOutreach = () => {
    if (healthData) {
      generateOutreach(healthData, { source: 'manual' });
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
                Client Health & Outreach
              </h1>
              <p className="text-signal-white/70">AI-powered engagement analysis and proactive outreach recommendations</p>
            </div>
            <Button
              onClick={runAnalysis}
              disabled={analyzing}
              className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy hover:shadow-glow"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {(healthLoading || analyzing) && !healthData ? (
          <div className="p-12 bg-carbon-night rounded-xl border border-int-teal/30 text-center">
            <Activity className="w-12 h-12 text-int-teal mx-auto mb-4 animate-pulse" />
            <p className="text-signal-white/70">Analyzing client engagement patterns...</p>
          </div>
        ) : healthData ? (
          <div className="space-y-6">
            {/* Health Score Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ClientHealthIndicator score={healthData.overallScore} />
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                  <div className="text-sm text-signal-white/60 mb-1">Churn Risk</div>
                  <div className={`text-3xl font-bold ${
                    healthData.predictiveInsights.churnRisk > 50 ? 'text-red-400' :
                    healthData.predictiveInsights.churnRisk > 30 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {healthData.predictiveInsights.churnRisk}%
                  </div>
                </div>

                <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                  <div className="text-sm text-signal-white/60 mb-1">Upsell Potential</div>
                  <div className="text-xl font-bold text-int-teal">{healthData.predictiveInsights.upsellLikelihood}</div>
                </div>

                <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                  <div className="text-sm text-signal-white/60 mb-1">Predicted Need</div>
                  <div className="text-sm font-semibold">{healthData.predictiveInsights.nextInterest}</div>
                </div>

                <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                  <div className="text-sm text-signal-white/60 mb-1">Conversion Window</div>
                  <div className="text-sm font-semibold">{healthData.predictiveInsights.conversionTimeframe}</div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-int-teal" />
                Engagement Breakdown
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(healthData.engagementMetrics).map(([key, value]) => (
                  <div key={key} className="p-4 bg-void rounded-lg">
                    <div className="text-sm text-signal-white/60 mb-2 capitalize">{key}</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-carbon-night rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            value >= 80 ? 'bg-green-400' :
                            value >= 60 ? 'bg-blue-400' :
                            value >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="font-bold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Indicators */}
            {healthData.riskIndicators.length > 0 && (
              <div className="p-6 bg-carbon-night rounded-xl border border-red-400/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                  <TrendingDown className="w-6 h-6" />
                  Risk Indicators
                </h3>
                <ul className="space-y-2">
                  {healthData.riskIndicators.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-signal-white/80">
                      <span className="text-red-400 mt-0.5">⚠</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outreach Recommendations */}
            {healthData.outreachTriggers.recommended && (
              <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Target className="w-6 h-6 text-int-orange" />
                    Outreach Recommended
                  </h3>
                  <Button
                    onClick={handleGenerateOutreach}
                    disabled={outreachLoading}
                    className="px-6 py-2 bg-int-orange hover:bg-int-orange/90"
                  >
                    {outreachLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Outreach Plan'
                    )}
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-void rounded-lg">
                    <div className="text-xs text-signal-white/60 mb-1">Channel</div>
                    <div className="font-semibold capitalize">{healthData.outreachTriggers.channel}</div>
                  </div>
                  <div className="p-4 bg-void rounded-lg">
                    <div className="text-xs text-signal-white/60 mb-1">Timing</div>
                    <div className="font-semibold capitalize">{healthData.outreachTriggers.timing}</div>
                  </div>
                  <div className="p-4 bg-void rounded-lg">
                    <div className="text-xs text-signal-white/60 mb-1">Message Angle</div>
                    <div className="font-semibold text-sm">{healthData.outreachTriggers.messageAngle}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Outreach Templates */}
            {recommendations && (
              <div className="space-y-6">
                {/* Strategy Overview */}
                <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                  <h3 className="text-2xl font-bold mb-4">Outreach Strategy</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-void rounded-lg">
                      <div className="text-sm text-signal-white/60 mb-1">Objective</div>
                      <div className="font-semibold capitalize">{recommendations.strategy.objective}</div>
                    </div>
                    <div className="p-4 bg-void rounded-lg">
                      <div className="text-sm text-signal-white/60 mb-1">Touchpoints</div>
                      <div className="font-semibold">{recommendations.strategy.touchpoints}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-void rounded-lg">
                    <div className="text-sm text-signal-white/60 mb-2">Content Strategy</div>
                    <p className="text-sm">{recommendations.strategy.contentStrategy}</p>
                  </div>
                </div>

                {/* Email Templates */}
                <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-int-teal" />
                    Email Templates
                  </h3>
                  <div className="space-y-4">
                    {recommendations.emailTemplates.map((template, i) => (
                      <div key={i} className="p-4 bg-void rounded-lg border border-int-navy/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-int-teal">Template {i + 1} - {template.tone}</div>
                          <button
                            onClick={() => copyToClipboard(`Subject: ${template.subject}\n\n${template.body}\n\n${template.cta}`, `email-${i}`)}
                            className="px-3 py-1 bg-int-navy/20 border border-int-navy/30 rounded text-xs hover:bg-int-navy/30 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            {copied === `email-${i}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-signal-white/60">Subject:</span>
                            <div className="font-semibold mt-1">{template.subject}</div>
                          </div>
                          <div>
                            <span className="text-signal-white/60">Body:</span>
                            <div className="mt-1 text-signal-white/90 whitespace-pre-wrap">{template.body}</div>
                          </div>
                          <div>
                            <span className="text-signal-white/60">CTA:</span>
                            <div className="mt-1 font-semibold text-int-orange">{template.cta}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In-App Messages */}
                <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-int-orange" />
                    In-App Messages
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendations.inAppMessages.map((msg, i) => (
                      <div key={i} className="p-4 bg-void rounded-lg border border-int-orange/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-signal-white/60">{msg.context}</div>
                          <button
                            onClick={() => copyToClipboard(msg.message, `app-${i}`)}
                            className="px-2 py-1 bg-int-orange/20 rounded text-xs hover:bg-int-orange/30"
                          >
                            {copied === `app-${i}` ? '✓' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Content */}
                <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                  <h3 className="text-xl font-bold mb-4">Recommended Content & Offers</h3>
                  <div className="space-y-3">
                    {recommendations.recommendedContent.map((content, i) => (
                      <div key={i} className="p-4 bg-void rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold mb-1">{content.title}</div>
                            <div className="text-sm text-signal-white/60 mb-2">{content.type}</div>
                            <div className="text-sm text-signal-white/80">{content.reason}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow-up Sequence */}
                <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                  <h3 className="text-xl font-bold mb-4">Follow-Up Sequence</h3>
                  <div className="space-y-3">
                    {recommendations.followUpSequence.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-16 text-center">
                          <div className="w-12 h-12 rounded-full bg-int-teal/20 border border-int-teal/30 flex items-center justify-center font-bold text-int-teal">
                            {step.day}
                          </div>
                        </div>
                        <div className="flex-1 p-4 bg-void rounded-lg">
                          <div className="font-semibold mb-1">{step.action}</div>
                          <p className="text-sm text-signal-white/80">{step.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 bg-carbon-night rounded-xl border border-int-navy/30 text-center">
            <p className="text-signal-white/60">Click "Refresh Analysis" to calculate client health score</p>
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