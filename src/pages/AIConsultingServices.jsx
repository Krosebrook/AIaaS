import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { base44 } from '@/api/base44Client';
import { 
  Target, 
  Wrench, 
  Shield, 
  Settings, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function AIConsultingServices() {
  const [recommendedService, setRecommendedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for assessment results and provide recommendations
    const assessmentResults = localStorage.getItem('ai_assessment_results');
    if (assessmentResults) {
      const results = JSON.parse(assessmentResults);
      determineRecommendation(results);
    } else {
      setLoading(false);
    }
  }, []);

  const determineRecommendation = async (assessment) => {
    try {
      const recommendation = await base44.integrations.Core.InvokeLLM({
        prompt: `Based on this AI readiness assessment, recommend ONE primary consulting service:

Assessment: ${JSON.stringify(assessment)}

Services available:
1. AI Strategy Development - For organizations starting their AI journey
2. Custom AI Solution Design - For specific use case implementation
3. AI Governance Frameworks - For compliance and risk management
4. ML Operations - For production deployment and scaling

Respond with the service name and a personalized reason why it's recommended.`,
        response_json_schema: {
          type: 'object',
          properties: {
            service: { type: 'string' },
            reason: { type: 'string' }
          }
        }
      });
      setRecommendedService(recommendation);
    } catch (error) {
      console.error('Failed to get recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 'strategy',
      icon: Target,
      title: 'AI Strategy Development',
      tagline: 'Build Your AI Roadmap',
      description: 'Comprehensive strategic planning to align AI initiatives with business objectives, identify high-value opportunities, and create a phased implementation roadmap.',
      offerings: [
        'Current state assessment and gap analysis',
        'Use case identification and prioritization',
        'Technology stack recommendations',
        'ROI modeling and business case development',
        'Risk assessment and mitigation planning',
        'Executive stakeholder alignment workshops'
      ],
      caseStudy: {
        client: 'Mid-market Healthcare Provider',
        challenge: 'Wanted to explore AI but lacked clear direction and internal expertise',
        outcome: 'Identified 8 high-value use cases, prioritized 3 for initial implementation, secured board approval with projected $2.4M annual savings'
      },
      metrics: [
        { label: 'Average Engagement', value: '4-6 weeks' },
        { label: 'Typical ROI', value: '300-500%' },
        { label: 'Success Rate', value: '94%' }
      ],
      pricing: 'From $25K',
      bestFor: 'Organizations beginning their AI journey or needing strategic direction'
    },
    {
      id: 'solution-design',
      icon: Wrench,
      title: 'Custom AI Solution Design',
      tagline: 'Build Production-Ready AI',
      description: 'End-to-end design and implementation of custom AI solutions tailored to your specific business requirements, infrastructure, and compliance needs.',
      offerings: [
        'Requirements gathering and technical scoping',
        'Proof-of-concept development and validation',
        'System architecture and integration design',
        'Security and compliance implementation',
        'Custom model development and fine-tuning',
        'Full documentation and knowledge transfer'
      ],
      caseStudy: {
        client: 'Enterprise Manufacturing Company',
        challenge: 'Manual quality control process causing bottlenecks and inconsistent results',
        outcome: 'Deployed computer vision AI system reducing inspection time by 78%, improving defect detection accuracy to 99.2%'
      },
      metrics: [
        { label: 'Average Timeline', value: '8-16 weeks' },
        { label: 'Typical Cost Savings', value: '$180K annually' },
        { label: 'Client Satisfaction', value: '98%' }
      ],
      pricing: 'From $50K',
      bestFor: 'Companies with specific AI use cases ready for implementation'
    },
    {
      id: 'governance',
      icon: Shield,
      title: 'AI Governance Frameworks',
      tagline: 'Secure & Compliant AI',
      description: 'Establish policies, controls, and procedures to ensure responsible, compliant, and secure AI usage across your organization.',
      offerings: [
        'AI governance policy development',
        'Risk management and compliance frameworks',
        'Data privacy and security controls',
        'Third-party AI vendor assessment',
        'AI ethics guidelines and training',
        'Audit trail and monitoring systems'
      ],
      caseStudy: {
        client: 'Financial Services Firm',
        challenge: 'Employees using unapproved AI tools, creating compliance risks and data exposure',
        outcome: 'Implemented governance framework, achieved SOC2 compliance, reduced shadow AI usage by 92% while enabling approved tools'
      },
      metrics: [
        { label: 'Compliance Achievement', value: '100%' },
        { label: 'Risk Reduction', value: '85%' },
        { label: 'Time to Compliance', value: '6-8 weeks' }
      ],
      pricing: 'From $30K',
      bestFor: 'Regulated industries or organizations with security/compliance requirements'
    },
    {
      id: 'mlops',
      icon: Settings,
      title: 'ML Operations (MLOps)',
      tagline: 'Scale AI in Production',
      description: 'Operationalize and scale your AI systems with production-grade infrastructure, monitoring, and continuous improvement processes.',
      offerings: [
        'Production deployment and CI/CD pipelines',
        'Model performance monitoring',
        'Automated retraining and versioning',
        'Infrastructure optimization',
        'Incident response and support',
        'Cost management and scaling strategies'
      ],
      caseStudy: {
        client: 'SaaS Platform Provider',
        challenge: 'AI prototype working well but deployment and maintenance becoming unmanageable',
        outcome: 'Implemented MLOps pipeline reducing deployment time from weeks to hours, achieving 99.9% uptime, cutting infrastructure costs by 40%'
      },
      metrics: [
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Cost Reduction', value: '30-50%' },
        { label: 'Deployment Speed', value: '10x faster' }
      ],
      pricing: 'From $15K/month',
      bestFor: 'Organizations with existing AI systems needing production support'
    }
  ];

  const handleServiceContact = (serviceName) => {
    base44.analytics.track({
      eventName: 'service_inquiry_started',
      properties: {
        service: serviceName,
        from_recommendation: !!recommendedService
      }
    });
  };

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="AI Consulting Services" 
        content="Comprehensive AI consulting: strategy development, custom solution design, governance frameworks, ML operations. Security-first approach with proven ROI."
      />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/20 via-transparent to-int-orange/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            AI Consulting Services
          </h1>
          <p className="text-xl text-signal-white/90 max-w-3xl mx-auto">
            Enterprise AI expertise delivered with MSP discipline—secure, measurable, production-ready
          </p>
        </div>
      </section>

      {/* Personalized Recommendation */}
      {!loading && recommendedService && (
        <section className="py-12 px-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border-y border-int-orange/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-void/50 backdrop-blur-sm rounded-xl border border-int-orange/30">
              <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-int-orange" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2 text-int-orange">Recommended For Your Business</h2>
                <p className="text-lg font-semibold mb-2">{recommendedService.service}</p>
                <p className="text-signal-white/80 mb-4">{recommendedService.reason}</p>
                <a
                  href={`#${recommendedService.service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-int-orange hover:text-int-orange/80 font-semibold transition-colors"
                >
                  View Service Details
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isRecommended = recommendedService?.service === service.title;
            
            return (
              <div 
                key={service.id}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                className={`scroll-mt-24 ${isRecommended ? 'ring-2 ring-int-orange/50 rounded-3xl p-8' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-int-orange to-int-navy rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {isRecommended && (
                        <span className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-semibold text-int-orange">
                          Recommended For You
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-4xl font-bold mb-3">{service.title}</h2>
                    <p className="text-xl text-int-orange mb-6">{service.tagline}</p>
                    <p className="text-lg text-signal-white/90 mb-8">{service.description}</p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-signal-white/60 mb-4 uppercase tracking-wide">What's Included</h3>
                      <ul className="space-y-3">
                        {service.offerings.map((offering, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-int-teal flex-shrink-0 mt-0.5" />
                            <span className="text-signal-white/80">{offering}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {service.metrics.map((metric, i) => (
                        <div key={i} className="p-4 bg-carbon-night rounded-lg border border-slate-700 text-center">
                          <div className="text-2xl font-bold text-int-orange mb-1">{metric.value}</div>
                          <div className="text-xs text-signal-white/60">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={createPageUrl(`Contact?service=${encodeURIComponent(service.title)}`)}
                        onClick={() => handleServiceContact(service.title)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Discovery Call
                      </Link>
                      <Link
                        to={createPageUrl('Contact')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-void border-2 border-int-navy hover:bg-int-navy/20 rounded-lg font-semibold transition-all"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Contact Sales
                      </Link>
                    </div>
                  </div>

                  {/* Case Study Card */}
                  <div className="lg:sticky lg:top-24">
                    <div className="p-8 bg-gradient-to-br from-carbon-night to-void border border-int-orange/30 rounded-2xl">
                      <div className="inline-block px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-xs font-semibold text-int-orange mb-6">
                        SUCCESS STORY
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">{service.caseStudy.client}</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="text-sm font-semibold text-signal-white/60 mb-2">Challenge</div>
                          <p className="text-signal-white/90">{service.caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <div className="text-sm font-semibold text-int-teal mb-2">Outcome</div>
                          <p className="text-signal-white/90">{service.caseStudy.outcome}</p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-signal-white/60 mb-1">Investment</div>
                            <div className="text-xl font-bold text-int-orange">{service.pricing}</div>
                          </div>
                          <Link
                            to={createPageUrl('CaseStudies')}
                            className="text-sm text-int-teal hover:text-int-teal/80 font-semibold transition-colors"
                          >
                            View More Cases →
                          </Link>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-int-navy/10 border border-int-navy/30 rounded-lg">
                        <div className="text-xs font-semibold text-signal-white/60 mb-2">BEST FOR</div>
                        <p className="text-sm text-signal-white/80">{service.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Our Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 font-semibold">Service</th>
                  <th className="text-left p-4 font-semibold">Timeline</th>
                  <th className="text-left p-4 font-semibold">Investment</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-slate-700/50 hover:bg-void/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold">{service.title}</div>
                      <div className="text-sm text-signal-white/60">{service.tagline}</div>
                    </td>
                    <td className="p-4 text-signal-white/80">
                      {service.metrics.find(m => m.label.includes('Timeline') || m.label.includes('Engagement'))?.value}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-int-orange">{service.pricing}</span>
                    </td>
                    <td className="p-4 text-sm text-signal-white/70">{service.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Not Sure Which Service You Need?</h2>
          <p className="text-xl text-signal-white/90 mb-8">
            Take our free AI readiness assessment and get personalized service recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('AIReadinessAssessment')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold hover:shadow-glow transition-all"
            >
              Take Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-void border-2 border-int-navy hover:bg-int-navy/20 rounded-full font-semibold transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
      `}</style>
    </div>
  );
}