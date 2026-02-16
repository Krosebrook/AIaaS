import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { usePersonalization } from '../components/PersonalizationEngine';
import { useScrollRestoration } from '../components/utils/useScrollRestoration';
import { Database, TrendingUp, FileText, Users, DollarSign, Zap } from 'lucide-react';

export default function CaseStudies() {
  const { trackPageVisit, trackInterest } = usePersonalization();
  useScrollRestoration('case-studies');

  useEffect(() => {
    trackPageVisit('CaseStudies');
  }, []);
  const caseStudies = [
    {
      icon: Database,
      title: 'Knowledge at Your Fingertips',
      industry: 'Consumer Goods',
      category: 'Product Enablement',
      challenge: 'Scattered product expertise across multiple teams and documents led to hours of manual searching and inconsistent customer support.',
      solution: 'Deployed AI-powered knowledge base with natural language search and automated documentation extraction.',
      results: [
        '80% reduction in information retrieval time',
        'Zero additional licensing costs',
        'Improved customer support consistency',
        'Automated documentation updates'
      ],
      metrics: {
        timeSaved: '15 hours/week per team member',
        roi: '300%',
        implementation: '4 weeks'
      }
    },
    {
      icon: TrendingUp,
      title: 'Automated Prospecting Engine',
      industry: 'Professional Services',
      category: 'Business Development',
      challenge: 'Manual research of 30,000+ potential clients quarterly consumed significant BD resources and delivered stale data.',
      solution: 'Built AI agent for automated prospect research, qualification, and enrichment with real-time data validation.',
      results: [
        '$300K annual savings',
        '95% research automation',
        'Real-time lead intelligence',
        'Improved lead quality scores'
      ],
      metrics: {
        timeSaved: '2,000 hours annually',
        roi: '450%',
        implementation: '6 weeks'
      }
    },
    {
      icon: FileText,
      title: 'Instant Marketing Intelligence',
      industry: 'Marketing & Advertising',
      category: 'Performance Reporting',
      challenge: 'Managing 80 brands with manual spreadsheet reporting consumed 150 hours weekly and delayed decision-making.',
      solution: 'Engineered automated reporting pipeline with AI-powered analysis and anomaly detection.',
      results: [
        '150 hours saved weekly',
        'Real-time performance dashboards',
        'Automated anomaly alerts',
        '99.9% data accuracy'
      ],
      metrics: {
        timeSaved: '7,800 hours annually',
        roi: '520%',
        implementation: '8 weeks'
      }
    },
    {
      icon: Users,
      title: 'Voice-to-Documentation Pipeline',
      industry: 'Nonprofit & Associations',
      category: 'Operations',
      challenge: 'Critical operational knowledge trapped in meetings with no systematic documentation process.',
      solution: 'Implemented voice AI for meeting transcription, analysis, and automated SOP generation.',
      results: [
        '700+ SOPs created',
        'Under 1 hour per document',
        'Consistent formatting',
        'Searchable knowledge base'
      ],
      metrics: {
        timeSaved: '1,000+ hours saved',
        roi: '380%',
        implementation: '5 weeks'
      }
    },
    {
      icon: DollarSign,
      title: 'Smart AR Collections',
      industry: 'B2B SaaS',
      category: 'Accounts Receivable',
      challenge: 'AR team overwhelmed with manual follow-ups, inconsistent messaging, and poor collection rates.',
      solution: 'Deployed AI-powered AR automation with personalized messaging and payment prediction.',
      results: [
        '75% reduction in manual tasks',
        '40% faster payment cycles',
        'Professional, personalized comms',
        'Improved customer relationships'
      ],
      metrics: {
        timeSaved: '30 hours/week',
        roi: '410%',
        implementation: '6 weeks'
      }
    },
    {
      icon: Zap,
      title: 'Enterprise AI Training Program',
      industry: 'Nonprofit',
      category: 'Org-Wide Enablement',
      challenge: 'Organization of 30 staff members anxious about AI with no structured training or adoption strategy.',
      solution: 'Delivered comprehensive AI enablement program with hands-on workshops, use case development, and ongoing support.',
      results: [
        '10 hours saved per person weekly',
        '85% active AI adoption',
        'From anxiety to mastery in 90 days',
        'Measurable productivity gains'
      ],
      metrics: {
        timeSaved: '300 hours/week org-wide',
        roi: '280%',
        implementation: '12 weeks'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Case Studies" 
        content="Real AI deployments with measurable ROI: knowledge management, prospecting automation, marketing intelligence, documentation, AR collections, and enterprise training programs."
      />
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            Case Studies
          </h1>
          <p className="text-xl text-signal-white/90">
            Real deployments, real results. See how we transform AI concepts into competitive advantages.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {caseStudies.map((study, i) => {
              const Icon = study.icon;
              return (
                <Link
                  key={i}
                  to={createPageUrl(`CaseStudy${i + 1}`)}
                  onClick={() => trackInterest(study.category)}
                  className="block p-8 md:p-12 bg-void rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 cursor-pointer"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center">
                          <Icon className="w-7 h-7 text-signal-white" />
                        </div>
                        <div>
                          <div className="text-sm text-fusion-pink mb-1">{study.industry}</div>
                          <h3 className="text-2xl md:text-3xl font-bold">{study.title}</h3>
                        </div>
                      </div>

                      <div className="inline-block px-3 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-xs font-semibold text-flash-purple mb-6">
                        {study.category}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-fusion-pink mb-2">Challenge</h4>
                          <p className="text-signal-white/80">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-fusion-pink mb-2">Solution</h4>
                          <p className="text-signal-white/80">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-fusion-pink mb-2">Results</h4>
                          <ul className="space-y-2">
                            {study.results.map((result, j) => (
                              <li key={j} className="flex items-start gap-2 text-signal-white/80">
                                <span className="text-flash-purple mt-1">✓</span>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="space-y-4">
                      <div className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30">
                        <div className="text-sm text-signal-white/60 mb-2">Time Saved</div>
                        <div className="text-2xl font-bold text-flash-purple">{study.metrics.timeSaved}</div>
                      </div>

                      <div className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30">
                        <div className="text-sm text-signal-white/60 mb-2">ROI</div>
                        <div className="text-2xl font-bold text-fusion-pink">{study.metrics.roi}</div>
                      </div>

                      <div className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30">
                        <div className="text-sm text-signal-white/60 mb-2">Implementation</div>
                        <div className="text-2xl font-bold text-signal-white">{study.metrics.implementation}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready for Your Own Success Story?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's discuss how AI can transform your operations with measurable results.
          </p>
          <a 
            href={`mailto:info@intinc.tech`}
            className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
          </a>
        </div>
      </section>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(244,114,182,0.4);
        }
      `}</style>
    </div>
  );
}