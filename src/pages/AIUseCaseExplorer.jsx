import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import SEOMetadata from '../components/SEOMetadata';
import {
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
  Loader2,
  Lightbulb,
  DollarSign,
  Clock,
  Users,
  Calendar
} from 'lucide-react';

export default function AIUseCaseExplorer() {
  const [formData, setFormData] = useState({
    industry: '',
    challenge: '',
    outcome: ''
  });
  const [useCases, setUseCases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const industries = [
    'Healthcare',
    'Financial Services',
    'Manufacturing',
    'Retail & E-commerce',
    'Technology',
    'Professional Services',
    'Education',
    'Logistics & Supply Chain',
    'Real Estate',
    'Hospitality',
    'Media & Entertainment',
    'Other'
  ];

  const challenges = [
    'Reduce operational costs',
    'Improve decision-making speed',
    'Enhance customer experience',
    'Automate manual processes',
    'Improve data accuracy',
    'Scale operations efficiently',
    'Strengthen security & compliance',
    'Increase revenue',
    'Reduce time-to-market',
    'Improve employee productivity'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const exploreUseCases = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI implementation consultant specializing in practical, production-ready AI solutions. Analyze the following business context and generate 3-5 SPECIFIC, ACTIONABLE AI use cases.

Industry: ${formData.industry}
Primary Challenge: ${formData.challenge}
Desired Outcome: ${formData.outcome}

Use web search to find:
1. Current AI trends and successful implementations in this industry
2. Proven AI solutions addressing similar challenges
3. Real-world case studies and ROI data
4. Emerging technologies relevant to this use case

For each use case, provide:
- A specific, descriptive title
- A detailed description (2-3 sentences) of how it works
- Quantified benefits with realistic estimates (e.g., "Reduce processing time by 40%")
- Implementation complexity (Low/Medium/High)
- Time to value (weeks/months)
- Recommended INTinc services from: "Security-First AI Architecture", "Rapid AI Prototyping", "Custom AI Engineering", "AI Enablement & Training", "Infrastructure & Operations", "AI Governance & Compliance"
- Recommended workshops from: "AI Discovery Workshop", "Technical Bootcamp Series", "Use Case Ideation Workshop"

Base recommendations on current industry best practices and proven ROI.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            useCases: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  benefits: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  complexity: { type: 'string' },
                  timeToValue: { type: 'string' },
                  estimatedROI: { type: 'string' },
                  suggestedServices: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  suggestedWorkshops: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            },
            industryInsights: { type: 'string' },
            nextSteps: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      });

      setUseCases(result);

      base44.analytics.track({
        eventName: 'use_case_explorer_completed',
        properties: {
          industry: formData.industry,
          challenge: formData.challenge,
          useCaseCount: result.useCases.length
        }
      });
    } catch (err) {
      setError('Failed to generate use cases. Please try again.');
      console.error('Use case generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getComplexityColor = (complexity) => {
    if (complexity === 'Low') return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (complexity === 'Medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
  };

  const isFormValid = formData.industry && formData.challenge && formData.outcome;

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="AI Use Case Explorer" 
        content="Discover personalized AI use cases for your industry and business challenges. Get actionable recommendations with ROI estimates and implementation guidance."
      />

      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-orange/10 via-transparent to-int-navy/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-int-orange/20 to-int-navy/20 rounded-full mb-6">
            <Lightbulb className="w-12 h-12 text-int-orange" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            AI Use Case Explorer
          </h1>
          <p className="text-xl text-signal-white/90 mb-4">
            Discover practical AI applications tailored to YOUR business
          </p>
          <p className="text-lg text-signal-white/70">
            Answer 3 quick questions and our AI will generate personalized use cases with ROI estimates and implementation guidance
          </p>
        </div>
      </section>

      {/* Input Form */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={exploreUseCases} className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl space-y-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold mb-3">
                What industry are you in? *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="challenge" className="block text-sm font-semibold mb-3">
                What's your primary business challenge? *
              </label>
              <select
                id="challenge"
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
              >
                <option value="">Select your challenge</option>
                {challenges.map(challenge => (
                  <option key={challenge} value={challenge}>{challenge}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="outcome" className="block text-sm font-semibold mb-3">
                What's your desired outcome? *
              </label>
              <textarea
                id="outcome"
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors resize-none"
                placeholder="e.g., Reduce manual data entry by 50%, improve customer satisfaction scores, cut operational costs..."
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold text-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Your Business...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Explore AI Use Cases
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {useCases && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Industry Insights */}
            {useCases.industryInsights && (
              <div className="p-6 bg-gradient-to-r from-int-navy/20 to-int-teal/20 border border-int-navy/30 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <Target className="w-6 h-6 text-int-teal flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Industry Insights</h3>
                    <p className="text-signal-white/80">{useCases.industryInsights}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Use Cases */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
                  AI Use Cases for Your Business
                </span>
              </h2>
              <div className="space-y-6">
                {useCases.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl hover:border-int-orange/60 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl font-bold text-int-orange">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{useCase.title}</h3>
                          <p className="text-signal-white/80 mb-4">{useCase.description}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getComplexityColor(useCase.complexity)}`}>
                        {useCase.complexity}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <h4 className="font-semibold text-green-400">Expected Benefits</h4>
                      </div>
                      <ul className="space-y-2">
                        {useCase.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-signal-white/80">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-int-teal" />
                          <span className="text-sm text-signal-white/60">Time to Value</span>
                        </div>
                        <div className="text-lg font-semibold text-white">{useCase.timeToValue}</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-signal-white/60">Estimated ROI</span>
                        </div>
                        <div className="text-lg font-semibold text-green-400">{useCase.estimatedROI}</div>
                      </div>
                    </div>

                    {/* Recommended Services */}
                    {useCase.suggestedServices && useCase.suggestedServices.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-5 h-5 text-int-orange" />
                          <h4 className="font-semibold text-white">Recommended Services</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {useCase.suggestedServices.map((service, i) => (
                            <Link
                              key={i}
                              to={createPageUrl('Services')}
                              className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm text-int-orange hover:bg-int-orange/30 transition-colors"
                            >
                              {service}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Workshops */}
                    {useCase.suggestedWorkshops && useCase.suggestedWorkshops.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 text-int-navy" />
                          <h4 className="font-semibold text-white">Recommended Workshops</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {useCase.suggestedWorkshops.map((workshop, i) => (
                            <Link
                              key={i}
                              to={createPageUrl('Workshops')}
                              className="px-3 py-1 bg-int-navy/20 border border-int-navy/30 rounded-full text-sm text-int-navy hover:bg-int-navy/30 transition-colors"
                            >
                              {workshop}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            {useCases.nextSteps && useCases.nextSteps.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Your Next Steps</h3>
                <ol className="space-y-3">
                  {useCases.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-int-orange rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <p className="text-signal-white/80 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* CTA */}
            <div className="p-8 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Implement These Use Cases?</h3>
              <p className="text-signal-white/80 mb-6">
                Schedule a consultation with our team to discuss your specific needs and create a custom implementation roadmap.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to={createPageUrl('AIReadinessAssessment')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Take Readiness Assessment
                </Link>
              </div>
            </div>

            {/* Explore Again */}
            <div className="text-center">
              <button
                onClick={() => {
                  setUseCases(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all"
              >
                Explore Different Use Cases
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