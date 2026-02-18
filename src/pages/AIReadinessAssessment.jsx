import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  Brain, 
  CheckCircle, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  Download,
  Calendar,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Target,
  Settings
} from 'lucide-react';

export default function AIReadinessAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [systemLinks, setSystemLinks] = useState('');

  const questions = [
    {
      id: 'primary_challenge',
      title: 'What\'s your primary business challenge?',
      description: 'Select the challenge that best describes your current situation',
      type: 'single',
      options: [
        'Reduce operational costs',
        'Improve decision-making speed',
        'Enhance customer experience',
        'Strengthen security and compliance',
        'Increase revenue or market share',
        'Scale operations efficiently'
      ]
    },
    {
      id: 'current_ai_state',
      title: 'Where are you in your AI journey?',
      description: 'Be honest about your current state',
      type: 'single',
      options: [
        'No AI experience - just exploring',
        'Using basic AI tools (ChatGPT, etc.)',
        'Piloting AI in one department',
        'Multiple AI pilots running',
        'Production AI systems deployed'
      ]
    },
    {
      id: 'team_technical_capability',
      title: 'How would you describe your team\'s technical capability?',
      description: 'This helps us recommend the right level of support',
      type: 'single',
      options: [
        'No technical team - need full support',
        'Basic IT but no AI expertise',
        'Strong IT with some data/ML knowledge',
        'Dedicated data science or ML team',
        'Advanced AI/ML engineering team'
      ]
    },
    {
      id: 'security_requirements',
      title: 'What are your security and compliance needs?',
      description: 'Select your regulatory environment',
      type: 'single',
      options: [
        'Standard business security',
        'Industry-specific compliance (HIPAA, SOC2, etc.)',
        'Highly regulated environment',
        'Government or defense sector',
        'Not sure - need guidance'
      ]
    },
    {
      id: 'timeline',
      title: 'What\'s your ideal timeline to see results?',
      description: 'When do you need to demonstrate value?',
      type: 'single',
      options: [
        'Quick win (1-3 months)',
        'This fiscal year (3-6 months)',
        'Strategic initiative (6-12 months)',
        'Long-term transformation (12+ months)',
        'Flexible - quality over speed'
      ]
    },
    {
      id: 'budget_range',
      title: 'What\'s your approximate budget?',
      description: 'This helps us recommend the right engagement model',
      type: 'single',
      options: [
        'Exploratory (<$25K)',
        'Pilot project ($25K-$100K)',
        'Significant initiative ($100K-$500K)',
        'Enterprise program ($500K+)',
        'Not yet determined'
      ]
    },
    {
      id: 'data_upload',
      title: 'Upload Sample Data or Provide System Links (Optional)',
      description: 'Help us provide more specific recommendations by sharing data or system information',
      type: 'upload',
      optional: true
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return { name: file.name, url: file_url };
    });
    const uploaded = await Promise.all(uploadPromises);
    setUploadedFiles([...uploadedFiles, ...uploaded]);
  };

  const analyzeResults = async () => {
    setAnalyzing(true);
    try {
      // Analyze uploaded files if any
      let fileAnalysis = '';
      if (uploadedFiles.length > 0) {
        const fileAnalysisResult = await base44.integrations.Core.InvokeLLM({
          prompt: `Analyze these uploaded files and extract key insights about the organization's data, systems, and AI readiness. Focus on:
- Data quality and structure
- System complexity and integration points
- Potential automation opportunities
- Technical debt or infrastructure gaps

Files: ${uploadedFiles.map(f => f.name).join(', ')}`,
          file_urls: uploadedFiles.map(f => f.url),
          add_context_from_internet: false
        });
        fileAnalysis = fileAnalysisResult;
      }

      // Analyze system links if provided
      let systemAnalysis = '';
      if (systemLinks.trim()) {
        systemAnalysis = await base44.integrations.Core.InvokeLLM({
          prompt: `Analyze information about these systems/tools to understand the organization's tech stack and AI integration opportunities:
${systemLinks}

Provide insights on integration complexity, data availability, and automation potential.`,
          add_context_from_internet: true
        });
      }

      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI implementation consultant. Based on these assessment responses AND additional context, provide deeply personalized recommendations:

Primary Challenge: ${answers.primary_challenge}
Current AI State: ${answers.current_ai_state}
Team Capability: ${answers.team_technical_capability}
Security Needs: ${answers.security_requirements}
Timeline: ${answers.timeline}
Budget: ${answers.budget_range}

${fileAnalysis ? `File Analysis: ${fileAnalysis}` : ''}
${systemAnalysis ? `System Analysis: ${systemAnalysis}` : ''}

Provide a DEEPLY SPECIFIC JSON response with:
1. readinessScore: number 0-100 (overall readiness for AI implementation)
2. readinessLevel: "Beginner" | "Developing" | "Advanced" | "Leading"
3. summary: brief assessment (2-3 sentences)
4. strengths: array of 2-3 organizational strengths based on answers
5. gaps: array of 2-3 areas to address before implementation
6. recommendedServices: array of 2-3 INTinc services that best fit their profile:
   - "Security-First AI Architecture"
   - "Rapid AI Prototyping"
   - "Custom AI Engineering"
   - "AI Enablement & Training"
   - "Infrastructure & Operations"
   - "AI Governance & Compliance"
7. recommendedWorkshops: array of 1-2 workshops from:
   - "AI Discovery Workshop" ($5,000, 4 hours)
   - "Technical Bootcamp Series" ($15,000, 3 days)
   - "Use Case Ideation Workshop" ($7,500, 6 hours)
8. suggestedTimeline: realistic timeline for their first AI initiative
9. nextSteps: array of 3-4 specific actionable recommendations
10. estimatedInvestment: suggested budget range for their first project`,
        response_json_schema: {
          type: 'object',
          properties: {
            readinessScore: { type: 'number' },
            readinessLevel: { type: 'string' },
            summary: { type: 'string' },
            strengths: { type: 'array', items: { type: 'string' } },
            gaps: { type: 'array', items: { type: 'string' } },
            recommendedServices: { type: 'array', items: { type: 'string' } },
            recommendedWorkshops: { type: 'array', items: { type: 'string' } },
            suggestedTimeline: { type: 'string' },
            nextSteps: { type: 'array', items: { type: 'string' } },
            estimatedInvestment: { type: 'string' },
            specificUseCases: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  impact: { type: 'string' }
                }
              }
            },
            roiProjections: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  useCase: { type: 'string' },
                  timeToValue: { type: 'string' },
                  estimatedAnnualSavings: { type: 'string' },
                  implementationCost: { type: 'string' },
                  threeYearROI: { type: 'string' }
                }
              }
            },
            technicalRequirements: { type: 'string' },
            prioritizedWorkshops: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  reasoning: { type: 'string' }
                }
              }
            }
          }
        }
      });

      setResults(analysis);
      base44.analytics.track({
        eventName: 'ai_readiness_assessment_completed',
        properties: {
          score: analysis.readinessScore,
          level: analysis.readinessLevel
        }
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadReport = () => {
    const reportText = `AI READINESS ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}

READINESS SCORE: ${results.readinessScore}/100 (${results.readinessLevel})

SUMMARY
${results.summary}

ORGANIZATIONAL STRENGTHS
${results.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

AREAS TO ADDRESS
${results.gaps.map((g, i) => `${i + 1}. ${g}`).join('\n')}

RECOMMENDED SERVICES
${results.recommendedServices.map(s => `• ${s}`).join('\n')}

RECOMMENDED WORKSHOPS
${results.recommendedWorkshops.map(w => `• ${w}`).join('\n')}

SUGGESTED TIMELINE
${results.suggestedTimeline}

ESTIMATED INVESTMENT
${results.estimatedInvestment}

NEXT STEPS
${results.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---
Assessment conducted by INTinc.com AI Readiness Tool
Visit intinc.com to schedule a consultation`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Readiness_Report.txt';
    link.click();
    URL.revokeObjectURL(url);

    base44.analytics.track({ eventName: 'assessment_report_downloaded' });
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-blue-400';
    if (score >= 25) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 75) return 'from-green-500 to-emerald-600';
    if (score >= 50) return 'from-blue-500 to-cyan-600';
    if (score >= 25) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = answers[currentQuestion?.id];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (results) {
    return (
      <div className="min-h-screen bg-void text-signal-white py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Results Header */}
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-int-orange/20 to-int-navy/20 rounded-full mb-6">
              <Brain className="w-16 h-16 text-int-orange" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your AI Readiness Assessment</h1>
            <p className="text-xl text-slate-400">Personalized analysis and recommendations</p>
          </div>

          {/* Score Display */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl text-center">
            <div className="mb-4">
              <div className={`text-7xl font-bold ${getScoreColor(results.readinessScore)}`}>
                {results.readinessScore}
              </div>
              <div className="text-2xl text-slate-400 mt-2">{results.readinessLevel}</div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden mt-6">
              <div
                className={`h-full bg-gradient-to-r ${getScoreGradient(results.readinessScore)} transition-all duration-1000`}
                style={{ width: `${results.readinessScore}%` }}
              />
            </div>
            <p className="text-slate-300 mt-6 text-lg">{results.summary}</p>
          </div>

          {/* Strengths & Gaps */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-green-400">Your Strengths</h2>
              </div>
              <ul className="space-y-3">
                {results.strengths.map((strength, i) => (
                  <li key={i} className="text-slate-300 flex gap-2">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-bold text-orange-400">Areas to Address</h2>
              </div>
              <ul className="space-y-3">
                {results.gaps.map((gap, i) => (
                  <li key={i} className="text-slate-300 flex gap-2">
                    <span className="text-orange-400 flex-shrink-0">→</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Services */}
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-int-orange" />
              <h2 className="text-2xl font-bold text-white">Recommended Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {results.recommendedServices.map((service, i) => (
                <div key={i} className="p-4 bg-slate-800/50 border border-int-orange/30 rounded-lg">
                  <div className="font-semibold text-int-orange mb-2">{service}</div>
                  <button
                    onClick={() => navigate(createPageUrl('Services'))}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Learn more →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Specific Use Cases with ROI */}
          {results.specificUseCases && results.specificUseCases.length > 0 && (
            <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-int-orange" />
                <h2 className="text-2xl font-bold text-white">Specific Use Cases for Your Organization</h2>
              </div>
              <div className="space-y-4">
                {results.specificUseCases.map((useCase, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 border border-int-orange/30 rounded-lg">
                    <h3 className="font-bold text-lg text-int-orange mb-2">{useCase.title}</h3>
                    <p className="text-signal-white/80 mb-2">{useCase.description}</p>
                    <div className="text-sm text-int-teal">Expected Impact: {useCase.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROI Projections */}
          {results.roiProjections && results.roiProjections.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">ROI Projections</h2>
              </div>
              <div className="space-y-4">
                {results.roiProjections.map((roi, i) => (
                  <div key={i} className="p-5 bg-slate-800/50 border border-green-500/30 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-white">{roi.useCase}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-signal-white/60 mb-1">Time to Value</div>
                        <div className="text-lg font-semibold text-green-400">{roi.timeToValue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-signal-white/60 mb-1">Annual Savings</div>
                        <div className="text-lg font-semibold text-green-400">{roi.estimatedAnnualSavings}</div>
                      </div>
                      <div>
                        <div className="text-xs text-signal-white/60 mb-1">Implementation Cost</div>
                        <div className="text-lg font-semibold text-white">{roi.implementationCost}</div>
                      </div>
                      <div>
                        <div className="text-xs text-signal-white/60 mb-1">3-Year ROI</div>
                        <div className="text-2xl font-bold text-green-400">{roi.threeYearROI}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Requirements */}
          {results.technicalRequirements && (
            <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-int-navy" />
                <h3 className="text-lg font-bold text-white">Technical Requirements</h3>
              </div>
              <p className="text-signal-white/80">{results.technicalRequirements}</p>
            </div>
          )}

          {/* Recommended Workshops */}
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-int-navy" />
              <h2 className="text-2xl font-bold text-white">Recommended Workshops</h2>
            </div>
            <div className="space-y-4">
              {results.recommendedWorkshops.map((workshop, i) => (
                <div key={i} className="p-4 bg-slate-800/50 border border-int-navy/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">{workshop.name || workshop.split(' (')[0]}</div>
                    {workshop.includes('$') && (
                      <div className="text-sm text-slate-400">
                        {workshop.match(/\$[\d,]+/)?.[0]}
                      </div>
                    )}
                  </div>
                  {workshop.reasoning && (
                    <p className="text-sm text-signal-white/70 mt-2">{workshop.reasoning}</p>
                  )}
                  <div>
                  <button
                    onClick={() => navigate(createPageUrl('Workshops'))}
                    className="px-4 py-2 bg-int-navy hover:bg-int-navy/80 rounded-lg font-semibold text-sm transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Investment */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Suggested Timeline</h3>
              </div>
              <p className="text-slate-300 text-lg">{results.suggestedTimeline}</p>
            </div>

            <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Estimated Investment</h3>
              </div>
              <p className="text-slate-300 text-lg">{results.estimatedInvestment}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Your Next Steps</h2>
            <ol className="space-y-4">
              {results.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-int-orange rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-300 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="p-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Ready to Move Forward?</h3>
            <p className="text-slate-300 mb-6">
              Schedule a technical assessment with our team to discuss your specific needs and create a custom implementation plan.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(createPageUrl('Contact'))}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button
                onClick={() => {
                  setResults(null);
                  setCurrentStep(0);
                  setAnswers({});
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .shadow-glow {
            box-shadow: 0 0 30px rgba(242,101,34,0.6);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-signal-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-int-orange/20 to-int-navy/20 rounded-full mb-6">
            <Brain className="w-12 h-12 text-int-orange" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Readiness Assessment</h1>
          <p className="text-xl text-slate-400">
            Answer {questions.length} questions to get personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-slate-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-int-orange to-int-navy h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-3">{currentQuestion.title}</h2>
          <p className="text-slate-400 mb-6">{currentQuestion.description}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'bg-int-orange/20 border-int-orange text-white font-semibold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-int-orange/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === option
                      ? 'border-int-orange bg-int-orange'
                      : 'border-slate-500'
                  }`}>
                    {answers[currentQuestion.id] === option && (
                      <CheckCircle className="w-4 h-4 text-void" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered || analyzing}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Your Readiness...
              </>
            ) : currentStep === questions.length - 1 ? (
              <>
                Generate Assessment
                <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}