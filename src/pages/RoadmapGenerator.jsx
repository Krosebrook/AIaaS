import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import SEOMetadata from '../components/SEOMetadata';
import {
  Layers,
  Calendar,
  Target,
  CheckCircle,
  Loader2,
  ArrowRight,
  Download,
  Zap,
  TrendingUp,
  Users,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function RoadmapGenerator() {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);

  useEffect(() => {
    const savedAssessment = localStorage.getItem('assessment_for_roadmap');
    if (savedAssessment) {
      setAssessmentData(JSON.parse(savedAssessment));
    }
  }, []);

  const generateRoadmap = async () => {
    if (!assessmentData) return;

    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an enterprise AI implementation strategist. Based on this AI readiness assessment, create a detailed, phased implementation roadmap.

Assessment Data:
- Readiness Score: ${assessmentData.readinessScore}/100
- Readiness Level: ${assessmentData.readinessLevel}
- Strengths: ${assessmentData.strengths.join(', ')}
- Gaps: ${assessmentData.gaps.join(', ')}
- Recommended Services: ${assessmentData.recommendedServices.join(', ')}
- Timeline: ${assessmentData.suggestedTimeline}
- Budget: ${assessmentData.estimatedInvestment}

Create a PRACTICAL, SEQUENTIAL roadmap with 3-5 phases. Each phase should:
- Have a clear objective and deliverables
- Include specific milestones with realistic timelines
- List required resources (team, tools, budget)
- Identify key success metrics
- Note dependencies on previous phases
- Include risk mitigation strategies

Make it actionable and specific to their readiness level.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            phases: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  duration: { type: 'string' },
                  objective: { type: 'string' },
                  deliverables: { type: 'array', items: { type: 'string' } },
                  milestones: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        timeline: { type: 'string' },
                        description: { type: 'string' }
                      }
                    }
                  },
                  resources: {
                    type: 'object',
                    properties: {
                      team: { type: 'string' },
                      tools: { type: 'array', items: { type: 'string' } },
                      estimatedCost: { type: 'string' }
                    }
                  },
                  successMetrics: { type: 'array', items: { type: 'string' } },
                  risks: { type: 'array', items: { type: 'string' } },
                  dependencies: { type: 'string' }
                }
              }
            },
            totalTimeline: { type: 'string' },
            totalInvestment: { type: 'string' },
            criticalSuccessFactors: { type: 'array', items: { type: 'string' } },
            quickWins: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      setRoadmap(result);

      base44.analytics.track({
        eventName: 'roadmap_generated',
        properties: {
          readinessScore: assessmentData.readinessScore,
          phaseCount: result.phases.length
        }
      });
    } catch (err) {
      console.error('Roadmap generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadRoadmap = () => {
    if (!roadmap) return;

    let text = `AI IMPLEMENTATION ROADMAP\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    text += `TOTAL TIMELINE: ${roadmap.totalTimeline}\n`;
    text += `TOTAL INVESTMENT: ${roadmap.totalInvestment}\n\n`;

    roadmap.phases.forEach((phase, i) => {
      text += `\n${'='.repeat(60)}\n`;
      text += `PHASE ${i + 1}: ${phase.name} (${phase.duration})\n`;
      text += `${'='.repeat(60)}\n\n`;
      text += `OBJECTIVE: ${phase.objective}\n\n`;
      text += `DELIVERABLES:\n${phase.deliverables.map(d => `• ${d}`).join('\n')}\n\n`;
      text += `MILESTONES:\n${phase.milestones.map(m => `• ${m.name} (${m.timeline}): ${m.description}`).join('\n')}\n\n`;
      text += `RESOURCES:\n`;
      text += `  Team: ${phase.resources.team}\n`;
      text += `  Tools: ${phase.resources.tools.join(', ')}\n`;
      text += `  Cost: ${phase.resources.estimatedCost}\n\n`;
      text += `SUCCESS METRICS:\n${phase.successMetrics.map(m => `• ${m}`).join('\n')}\n\n`;
      text += `RISKS:\n${phase.risks.map(r => `• ${r}`).join('\n')}\n\n`;
      text += `DEPENDENCIES: ${phase.dependencies}\n`;
    });

    text += `\n${'='.repeat(60)}\n`;
    text += `CRITICAL SUCCESS FACTORS\n`;
    text += `${'='.repeat(60)}\n`;
    text += roadmap.criticalSuccessFactors.map(f => `• ${f}`).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Implementation_Roadmap.txt';
    link.click();
    URL.revokeObjectURL(url);

    base44.analytics.track({ eventName: 'roadmap_downloaded' });
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-void text-signal-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Assessment Data Found</h2>
          <p className="text-signal-white/70 mb-6">
            Please complete the AI Readiness Assessment first to generate your implementation roadmap.
          </p>
          <button
            onClick={() => navigate(createPageUrl('AIReadinessAssessment'))}
            className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="AI Implementation Roadmap Generator" 
        content="Generate a phased AI implementation roadmap based on your readiness assessment. Get a strategic, actionable plan tailored to your organization."
      />

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/10 via-transparent to-int-orange/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-int-orange/20 to-int-navy/20 rounded-full mb-6">
            <Layers className="w-12 h-12 text-int-orange" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            AI Implementation Roadmap
          </h1>
          <p className="text-xl text-signal-white/90 mb-4">
            Your personalized, phased approach to AI transformation
          </p>
        </div>
      </section>

      {/* Assessment Summary */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4">Based on Your Assessment</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-signal-white/60 mb-1">Readiness Score</div>
                <div className="text-2xl font-bold text-int-orange">{assessmentData.readinessScore}/100</div>
                <div className="text-sm text-signal-white/80">{assessmentData.readinessLevel}</div>
              </div>
              <div>
                <div className="text-sm text-signal-white/60 mb-1">Timeline</div>
                <div className="text-lg font-semibold text-white">{assessmentData.suggestedTimeline}</div>
              </div>
              <div>
                <div className="text-sm text-signal-white/60 mb-1">Investment</div>
                <div className="text-lg font-semibold text-white">{assessmentData.estimatedInvestment}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generate Button */}
      {!roadmap && (
        <section className="py-8 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="px-10 py-5 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold text-xl hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-3 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  <Layers className="w-6 h-6" />
                  Generate Implementation Roadmap
                </>
              )}
            </button>
            <p className="text-sm text-signal-white/60 mt-4">
              AI will analyze your assessment and create a detailed, phased plan
            </p>
          </div>
        </section>
      )}

      {/* Roadmap Results */}
      {roadmap && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900 border border-int-teal/30 rounded-xl text-center">
                <Clock className="w-8 h-8 text-int-teal mx-auto mb-3" />
                <div className="text-sm text-signal-white/60 mb-1">Total Timeline</div>
                <div className="text-2xl font-bold text-white">{roadmap.totalTimeline}</div>
              </div>
              <div className="p-6 bg-slate-900 border border-green-500/30 rounded-xl text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-sm text-signal-white/60 mb-1">Total Investment</div>
                <div className="text-2xl font-bold text-white">{roadmap.totalInvestment}</div>
              </div>
              <div className="p-6 bg-slate-900 border border-int-orange/30 rounded-xl text-center">
                <Layers className="w-8 h-8 text-int-orange mx-auto mb-3" />
                <div className="text-sm text-signal-white/60 mb-1">Implementation Phases</div>
                <div className="text-2xl font-bold text-white">{roadmap.phases.length}</div>
              </div>
            </div>

            {/* Quick Wins */}
            {roadmap.quickWins && roadmap.quickWins.length > 0 && (
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Quick Wins</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {roadmap.quickWins.map((win, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-signal-white/80 text-sm">{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phases */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
                  Implementation Phases
                </span>
              </h2>
              <div className="space-y-6">
                {roadmap.phases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl hover:border-int-orange/60 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-int-orange">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-white">{phase.name}</h3>
                          <div className="px-3 py-1 bg-int-teal/20 border border-int-teal/30 rounded-full text-sm font-semibold text-int-teal">
                            {phase.duration}
                          </div>
                        </div>
                        <p className="text-signal-white/80">{phase.objective}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPhase(selectedPhase === idx ? null : idx)}
                      className="text-int-orange text-sm font-semibold hover:text-int-orange/80 transition-colors mb-4"
                    >
                      {selectedPhase === idx ? 'Hide Details' : 'View Details →'}
                    </button>

                    {selectedPhase === idx && (
                      <div className="space-y-4 pt-4 border-t border-slate-700">
                        {/* Deliverables */}
                        <div>
                          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-int-orange" />
                            Deliverables
                          </h4>
                          <ul className="space-y-1">
                            {phase.deliverables.map((d, i) => (
                              <li key={i} className="flex items-start gap-2 text-signal-white/80 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Milestones */}
                        <div>
                          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-int-teal" />
                            Milestones
                          </h4>
                          <div className="space-y-2">
                            {phase.milestones.map((m, i) => (
                              <div key={i} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-white text-sm">{m.name}</span>
                                  <span className="text-xs text-int-teal">{m.timeline}</span>
                                </div>
                                <p className="text-xs text-signal-white/70">{m.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4 text-int-navy" />
                              Resources
                            </h4>
                            <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                              <div className="text-xs text-signal-white/60 mb-1">Team</div>
                              <div className="text-sm text-white mb-2">{phase.resources.team}</div>
                              <div className="text-xs text-signal-white/60 mb-1">Tools</div>
                              <div className="text-sm text-white">{phase.resources.tools.join(', ')}</div>
                              <div className="text-xs text-signal-white/60 mt-2 mb-1">Estimated Cost</div>
                              <div className="text-sm font-semibold text-green-400">{phase.resources.estimatedCost}</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              Success Metrics
                            </h4>
                            <ul className="space-y-1">
                              {phase.successMetrics.map((m, i) => (
                                <li key={i} className="flex items-start gap-2 text-signal-white/80 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                  {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Risks */}
                        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Risk Mitigation
                          </h4>
                          <ul className="space-y-1">
                            {phase.risks.map((r, i) => (
                              <li key={i} className="text-signal-white/80 text-sm">• {r}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Dependencies */}
                        {phase.dependencies && (
                          <div className="text-sm text-signal-white/70">
                            <span className="font-semibold">Dependencies:</span> {phase.dependencies}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Success Factors */}
            <div className="p-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20 border border-int-navy/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Critical Success Factors</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {roadmap.criticalSuccessFactors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-int-orange flex-shrink-0 mt-0.5" />
                    <span className="text-signal-white/90">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={downloadRoadmap}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
              >
                <Download className="w-5 h-5" />
                Download Roadmap
              </button>
              <button
                onClick={() => navigate(createPageUrl('Contact'))}
                className="flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}