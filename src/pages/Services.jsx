import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { usePersonalization } from '../components/PersonalizationEngine';
import { Shield, Zap, Users, Lock, Server, Code } from 'lucide-react';

export default function Services() {
  const { trackPageVisit, trackInterest } = usePersonalization();

  useEffect(() => {
    trackPageVisit('Services');
  }, []);
  const services = [
    {
      icon: Shield,
      title: 'Security-First AI Architecture',
      description: 'Design and implement AI systems with enterprise-grade security, compliance, and governance from day one.',
      features: [
        'Zero-trust AI integration',
        'Data encryption & access control',
        'Compliance framework setup (SOC2, HIPAA, GDPR)',
        'Audit trail & monitoring'
      ]
    },
    {
      icon: Zap,
      title: 'Rapid AI Prototyping',
      description: 'Validate AI concepts quickly with minimal investment before committing to full-scale deployment.',
      features: [
        'Proof-of-concept development',
        'Technical feasibility testing',
        'ROI modeling & validation',
        'Risk assessment & mitigation'
      ]
    },
    {
      icon: Code,
      title: 'Custom AI Engineering',
      description: 'Build production-ready AI solutions tailored to your specific requirements and infrastructure.',
      features: [
        'Intelligent automation workflows',
        'AI agent development',
        'Data pipeline engineering',
        'API integration & orchestration'
      ]
    },
    {
      icon: Users,
      title: 'AI Enablement & Training',
      description: 'Equip your team with the knowledge and tools to leverage AI effectively and securely.',
      features: [
        'Hands-on technical workshops',
        'Security & governance training',
        'Best practices & use case ideation',
        'Ongoing support & consultation'
      ]
    },
    {
      icon: Server,
      title: 'Infrastructure & Operations',
      description: 'Maintain and optimize your AI systems with SLA commitments and proactive monitoring.',
      features: [
        ' 24/7 monitoring & incident response',
        'Performance optimization',
        'Scalability planning',
        'Cost management & optimization'
      ]
    },
    {
      icon: Lock,
      title: 'AI Governance & Compliance',
      description: 'Establish policies, controls, and procedures for responsible and compliant AI usage.',
      features: [
        'Policy framework development',
        'Risk management programs',
        'Third-party AI assessment',
        'Compliance documentation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Services" 
        content="Security-first AI architecture, rapid prototyping, custom engineering, enablement training, infrastructure management, and governance. Flexible engagement models from $15K."
      />
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-signal-white/90">
            Enterprise AI expertise without the enterprise overhead. Flexible engagement models designed for security, speed, and measurable outcomes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div 
                  key={i}
                  className="p-8 bg-void rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 group"
                  onClick={() => trackInterest(service.title)}
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-signal-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-flash-purple transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-signal-white/80 mb-6">
                      {service.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-signal-white/70">
                        <span className="text-fusion-pink mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Model */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            Flexible Engagement Models
          </h2>
          <p className="text-xl text-signal-white/90 mb-12">
            Choose the model that fits your pace and budget. No long-term contracts. No vendor lock-in.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <h3 className="text-2xl font-bold mb-4">Project-Based</h3>
              <p className="text-signal-white/80 mb-6">
                Fixed scope, fixed timeline, fixed price. Perfect for proof-of-concepts and defined deliverables.
              </p>
              <div className="text-fusion-pink font-semibold">From $15K</div>
            </div>

            <div className="p-8 bg-carbon-night rounded-2xl border-2 border-flash-purple relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full text-xs font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Retainer</h3>
              <p className="text-signal-white/80 mb-6">
                Ongoing support and development. Predictable monthly costs with priority access to our team.
              </p>
              <div className="text-fusion-pink font-semibold">From $10K/mo</div>
            </div>

            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <h3 className="text-2xl font-bold mb-4">Managed Services</h3>
              <p className="text-signal-white/80 mb-6">
                Full infrastructure management with SLAs. We operate, monitor, and optimize your AI systems 24/7.
              </p>
              <div className="text-fusion-pink font-semibold">Custom Quote</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-carbon-night to-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's discuss your AI challenges and build a custom solution.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
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