import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { usePersonalization } from '../PersonalizationEngine';
import { CheckCircle, AlertCircle, TrendingUp, Loader2, Download, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import jsPDF from 'jspdf';

export default function AIReadinessAssessment() {
  const navigate = useNavigate();
  const { trackAssessmentResult } = usePersonalization();
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const questions = [
    {
      id: 'current_ai',
      title: 'Current AI Usage',
      description: 'Does your organization currently use AI?',
      options: ['No AI yet', 'Exploring AI', 'Piloting AI', 'AI in production']
    },
    {
      id: 'data_infrastructure',
      title: 'Data Infrastructure',
      description: 'How is your data currently organized?',
      options: ['Scattered/No structure', 'Partially organized', 'Well-organized', 'Enterprise data warehouse']
    },
    {
      id: 'team_expertise',
      title: 'Technical Team',
      description: 'Does your team have AI/ML expertise?',
      options: ['No', 'Basic understanding', 'Experienced', 'Highly specialized']
    },
    {
      id: 'budget_allocation',
      title: 'Budget Readiness',
      description: 'Do you have budget allocated for AI?',
      options: ['No budget yet', 'Limited budget', 'Moderate budget', 'Significant budget']
    },
    {
      id: 'executive_support',
      title: 'Executive Support',
      description: 'Is there executive commitment to AI transformation?',
      options: ['Not aligned', 'Initial interest', 'Strong commitment', 'Full strategic alignment']
    },
    {
      id: 'security_compliance',
      title: 'Security & Compliance',
      description: 'How important is data security and compliance?',
      options: ['Standard requirements', 'Industry specific', 'Highly regulated', 'Critical/Top priority']
    },
    {
      id: 'organizational_change',
      title: 'Organizational Change Readiness',
      description: 'How does your organization handle change management?',
      options: ['Resistant to change', 'Cautious adopters', 'Adaptable culture', 'Innovation-driven']
    },
    {
      id: 'integration_complexity',
      title: 'System Integration Complexity',
      description: 'How complex is your current IT landscape?',
      options: ['Legacy systems only', 'Mixed legacy and modern', 'Mostly modern tech stack', 'Cloud-native architecture']
    },
    {
      id: 'roi_expectations',
      title: 'ROI & Business Metrics',
      description: 'How mature are your business metrics and KPIs?',
      options: ['Undefined or unclear', 'Partially defined', 'Well-defined metrics', 'Advanced analytics program']
    }
  ];

  const scoreMap = {
    'No AI yet': 1, 'No': 1, 'Not aligned': 1, 'Scattered/No structure': 1, 'Resistant to change': 1, 'Legacy systems only': 1, 'Undefined or unclear': 1,
    'Exploring AI': 2, 'Basic understanding': 2, 'Initial interest': 2, 'Partially organized': 2, 'Limited budget': 2, 'Standard requirements': 2, 'Cautious adopters': 2, 'Mixed legacy and modern': 2, 'Partially defined': 2,
    'Piloting AI': 3, 'Experienced': 3, 'Strong commitment': 3, 'Well-organized': 3, 'Moderate budget': 3, 'Industry specific': 3, 'Adaptable culture': 3, 'Mostly modern tech stack': 3, 'Well-defined metrics': 3,
    'AI in production': 4, 'Highly specialized': 4, 'Full strategic alignment': 4, 'Enterprise data warehouse': 4, 'Significant budget': 4, 'Highly regulated': 4, 'Critical/Top priority': 4, 'Innovation-driven': 4, 'Cloud-native architecture': 4, 'Advanced analytics program': 4
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleAssessment = async () => {
    setLoading(true);
    try {
      const totalScore = Object.values(answers).reduce((sum, ans) => sum + (scoreMap[ans] || 0), 0);
      const maxScore = questions.length * 4;
      const readinessPercent = Math.round((totalScore / maxScore) * 100);

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI readiness assessment expert. Based on these organizational responses, provide a detailed assessment:
        
${questions.map(q => `${q.title}: ${answers[q.id]}`).join('\n')}

Readiness Score: ${readinessPercent}%

Provide a JSON response with:
1. overallReadiness: one of 'Early Stage', 'Developing', 'Advanced', 'Leading'
2. readinessSummary: brief overall assessment (2-3 sentences)
3. strengths: array of 3-4 key organizational strengths
4. gaps: array of 3-4 areas needing improvement
5. recommendations: array of 3-4 specific actionable recommendations
6. implementationTimeline: estimated timeline (e.g., "6-12 months")
7. suggestedSolutions: array of 2-3 AI solution types that would be most beneficial`,
        response_json_schema: {
          type: 'object',
          properties: {
            overallReadiness: { type: 'string' },
            readinessSummary: { type: 'string' },
            strengths: { type: 'array', items: { type: 'string' } },
            gaps: { type: 'array', items: { type: 'string' } },
            recommendations: { type: 'array', items: { type: 'string' } },
            implementationTimeline: { type: 'string' },
            suggestedSolutions: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      const assessmentData = {
        ...result,
        readinessScore: readinessPercent,
        industry: extractIndustryFromAnswers(answers)
      };
      setAssessment(assessmentData);
      trackAssessmentResult(assessmentData);
      setStep('results');
    } catch (error) {
      console.error('Assessment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadinessColor = (score) => {
    if (score >= 75) return 'from-green-500 to-emerald-600';
    if (score >= 50) return 'from-blue-500 to-cyan-600';
    if (score >= 25) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-orange-600';
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const lineHeight = 7;
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    const addText = (text, fontSize, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * lineHeight;
    };

    // Title
    doc.setFont(undefined, 'bold');
    doc.setFontSize(18);
    doc.text('AI Readiness Assessment Report', margin, yPosition);
    yPosition += 12;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 8;

    // Score
    addText(`Overall Readiness Score: ${assessment.readinessScore}% - ${assessment.overallReadiness}`, 14, true);
    yPosition += 5;
    addText(assessment.readinessSummary, 10);
    yPosition += 5;

    // Strengths
    if (yPosition > pageHeight - 80) doc.addPage(), yPosition = 20;
    addText('ORGANIZATIONAL STRENGTHS', 12, true);
    yPosition += 3;
    assessment.strengths.forEach(s => {
      addText(`✓ ${s}`, 9);
      yPosition += 3;
    });

    // Gaps
    yPosition += 2;
    if (yPosition > pageHeight - 80) doc.addPage(), yPosition = 20;
    addText('AREAS FOR IMPROVEMENT', 12, true);
    yPosition += 3;
    assessment.gaps.forEach(g => {
      addText(`• ${g}`, 9);
      yPosition += 3;
    });

    // Recommendations
    yPosition += 2;
    if (yPosition > pageHeight - 80) doc.addPage(), yPosition = 20;
    addText('RECOMMENDED ACTIONS', 12, true);
    yPosition += 3;
    assessment.recommendations.forEach((rec, i) => {
      addText(`${i + 1}. ${rec}`, 9);
      yPosition += 3;
    });

    // Solutions
    yPosition += 2;
    if (yPosition > pageHeight - 60) doc.addPage(), yPosition = 20;
    addText('SUGGESTED AI SOLUTIONS', 12, true);
    yPosition += 3;
    assessment.suggestedSolutions.forEach(sol => {
      addText(`→ ${sol}`, 10);
      yPosition += 4;
    });

    addText(`\nEstimated Timeline: ${assessment.implementationTimeline}`, 10);

    // Footer
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('INTinc.com - Enterprise AI Implementation Solutions', margin, pageHeight - 10);

    doc.save('AI_Readiness_Assessment_Report.pdf');
    base44.analytics.track({ eventName: 'readiness_assessment_pdf_downloaded' });
  };

  const extractIndustryFromAnswers = (answers) => {
    const industryMap = {
      'technology': 'Technology',
      'healthcare': 'Healthcare',
      'finance': 'Financial Services',
      'manufacturing': 'Manufacturing',
      'retail': 'Retail',
      'energy': 'Energy'
    };
    // Default to generic industry for now
    return 'Enterprise';
  };

  const handleContactSales = () => {
    const assessmentSummary = `
I completed the INTinc.com AI Readiness Assessment and scored ${assessment.readinessScore}% (${assessment.overallReadiness}).

Key Results:
- Recommended Focus: ${assessment.suggestedSolutions[0]}
- Implementation Timeline: ${assessment.implementationTimeline}
- Priority Areas: ${assessment.recommendations.slice(0, 2).join(', ')}

I'd like to discuss how INTinc.com can help with our AI transformation.
    `;

    navigate(createPageUrl('Contact'), {
      state: {
        prefilled: {
          message: assessmentSummary
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {step === 'intro' && (
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-white">AI Readiness Assessment</h2>
          <p className="text-slate-300 mb-6 text-lg">
            Discover your organization's AI implementation readiness in just 2 minutes. Our assessment evaluates your current capabilities and provides personalized recommendations.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
              <div className="font-semibold text-white">Honest Assessment</div>
              <div className="text-sm text-slate-400">No marketing fluff</div>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-400 mb-2" />
              <div className="font-semibold text-white">AI-Powered Analysis</div>
              <div className="text-sm text-slate-400">Intelligent recommendations</div>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-green-400 mb-2" />
              <div className="font-semibold text-white">Actionable Insights</div>
              <div className="text-sm text-slate-400">Clear next steps</div>
            </div>
          </div>
          <button
            onClick={() => setStep('questions')}
            className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all text-white"
          >
            Start Assessment
          </button>
        </div>
      )}

      {step === 'questions' && (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{q.title}</h3>
                  <p className="text-slate-400">{q.description}</p>
                </div>
                <span className="text-sm font-semibold text-slate-500 bg-slate-800 px-3 py-1 rounded">
                  {idx + 1}/{questions.length}
                </span>
              </div>
              <div className="space-y-2">
                {q.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(q.id, option)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      answers[q.id] === option
                        ? 'bg-int-orange/20 border-int-orange'
                        : 'bg-slate-800/50 border-slate-700 hover:border-int-orange/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('intro')}
              className="flex-1 px-6 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleAssessment}
              disabled={Object.keys(answers).length !== questions.length || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Assessment'
              )}
            </button>
          </div>
        </div>
      )}

      {step === 'results' && assessment && (
        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Your AI Readiness Score</h2>
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Full Report
              </button>
            </div>

            <div className="mb-8">
              <div className="relative w-full bg-slate-800 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getReadinessColor(assessment.readinessScore)} transition-all`}
                  style={{ width: `${assessment.readinessScore}%` }}
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-4xl font-bold text-int-orange">{assessment.readinessScore}%</span>
                <span className="text-xl text-slate-400 ml-2">- {assessment.overallReadiness}</span>
              </div>
            </div>

            <p className="text-slate-300 mb-8 text-lg">{assessment.readinessSummary}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="font-semibold text-green-400 mb-3">Strengths</h3>
                <ul className="space-y-2">
                  {assessment.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h3 className="font-semibold text-orange-400 mb-3">Gaps to Address</h3>
                <ul className="space-y-2">
                  {assessment.gaps.map((g, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Recommended Solutions</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {assessment.suggestedSolutions.map((solution, i) => (
                <div key={i} className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                  <div className="text-lg font-semibold text-int-orange">{solution}</div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-int-navy/20 border border-int-navy/30 rounded-lg">
              <div className="text-sm text-slate-400 mb-2">Estimated Implementation Timeline</div>
              <div className="text-lg font-semibold text-white">{assessment.implementationTimeline}</div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
            <ul className="space-y-3">
              {assessment.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-int-orange font-bold flex-shrink-0">{i + 1}.</span>
                  <span className="text-slate-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Transform Your Organization with AI?</h3>
            <p className="text-slate-300 mb-4">
              Our AI strategy experts can help you address these gaps and accelerate your AI journey. Let's discuss a personalized implementation plan.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleContactSales}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
              >
                <Mail className="w-4 h-4" />
                Contact Sales (Pre-filled)
              </button>
              <button
                onClick={() => {
                  setStep('intro');
                  setAnswers({});
                  setAssessment(null);
                }}
                className="px-6 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all"
              >
                Restart Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}