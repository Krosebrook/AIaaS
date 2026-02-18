import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import SmartRecommendations from '../components/SmartRecommendations';
import WorkshopBooking from '../components/workshops/WorkshopBooking';
import { Users, Clock, DollarSign, Target, CheckCircle, Filter, X, Lightbulb, Rocket } from 'lucide-react';

export default function Workshops() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingWorkshop, setBookingWorkshop] = useState(null);

  const workshops = [
    {
      icon: Lightbulb,
      title: 'AI Discovery Workshop',
      category: 'AI Strategy',
      duration: '4 hours',
      price: 5000,
      description: 'Hands-on workshop to identify AI opportunities within your organization, assess readiness, and build a prioritized roadmap.',
      learningObjectives: [
        'Identify 5-10 high-value AI use cases for your organization',
        'Understand security and compliance requirements for AI',
        'Build a phased implementation roadmap',
        'Assess organizational readiness and gaps'
      ],
      included: [
        'Current state assessment',
        'Use case identification workshop',
        'Technical feasibility analysis',
        'Risk assessment framework',
        'Prioritized implementation roadmap',
        'Executive summary presentation'
      ],
      targetAudience: 'C-suite executives, business leaders, and decision-makers exploring AI adoption',
      idealFor: 'Leadership teams exploring AI adoption',
      instructor: {
        name: 'Dr. Sarah Chen',
        title: 'Chief AI Strategist',
        bio: '15+ years leading AI transformations for Fortune 500 companies',
        expertise: 'AI Strategy, Change Management, Enterprise Architecture'
      }
    },
    {
      icon: Target,
      title: 'Technical Bootcamp Series',
      category: 'Custom AI',
      duration: '3 days',
      price: 15000,
      description: 'Intensive technical training for your team on AI implementation, security best practices, and production deployment.',
      learningObjectives: [
        'Deploy production-ready AI systems with security best practices',
        'Implement AI governance and monitoring frameworks',
        'Build custom AI solutions using modern tools and frameworks',
        'Troubleshoot and optimize AI systems in production'
      ],
      included: [
        'AI fundamentals and architecture',
        'Security-first implementation',
        'Hands-on tool training',
        'Real-world use case development',
        'Production deployment strategies',
        'Ongoing support resources'
      ],
      targetAudience: 'Software engineers, data scientists, DevOps teams, and technical leads',
      idealFor: 'Technical teams implementing AI systems',
      instructor: {
        name: 'Marcus Thompson',
        title: 'Lead AI Engineer',
        bio: 'Former ML Engineer at Google, 50+ production AI deployments',
        expertise: 'MLOps, System Architecture, Security Engineering'
      }
    },
    {
      icon: Rocket,
      title: 'Use Case Ideation Workshop',
      category: 'AI Strategy',
      duration: '6 hours',
      price: 7500,
      description: 'Collaborative session to generate, evaluate, and prioritize AI use cases specific to your business operations.',
      learningObjectives: [
        'Generate 20+ potential AI use cases across departments',
        'Evaluate use cases using ROI and feasibility matrices',
        'Prioritize initiatives based on impact and complexity',
        'Create actionable implementation plan for top 3 use cases'
      ],
      included: [
        'Structured ideation sessions',
        'Cross-functional collaboration',
        'ROI modeling for each use case',
        'Technical feasibility scoring',
        'Implementation roadmap',
        'Resource planning guidance'
      ],
      targetAudience: 'Cross-functional teams including operations, product, sales, and IT',
      idealFor: 'Cross-functional teams building AI strategy',
      instructor: {
        name: 'Jennifer Martinez',
        title: 'Innovation Consultant',
        bio: '20+ years facilitating digital transformation for enterprises',
        expertise: 'Design Thinking, Innovation Management, Agile Strategy'
      }
    },
    {
      icon: Target,
      title: 'MLOps Fundamentals',
      category: 'MLOps',
      duration: '2 days',
      price: 12000,
      description: 'Learn to operationalize and scale AI systems with production-grade infrastructure, monitoring, and continuous improvement.',
      learningObjectives: [
        'Set up CI/CD pipelines for ML models',
        'Implement model monitoring and alerting',
        'Build automated retraining workflows',
        'Optimize infrastructure costs and performance'
      ],
      included: [
        'MLOps architecture patterns',
        'Model versioning and deployment',
        'Monitoring and observability',
        'Infrastructure as code for ML',
        'Cost optimization strategies',
        'Incident response playbooks'
      ],
      targetAudience: 'ML engineers, DevOps engineers, and platform teams',
      idealFor: 'Teams managing AI systems in production',
      instructor: {
        name: 'Dr. Alex Kumar',
        title: 'MLOps Architect',
        bio: 'Built MLOps platforms serving 1M+ predictions/day',
        expertise: 'Distributed Systems, ML Infrastructure, Cloud Architecture'
      }
    },
    {
      icon: Users,
      title: 'AI Governance & Ethics',
      category: 'AI Strategy',
      duration: '4 hours',
      price: 6000,
      description: 'Establish policies, controls, and procedures for responsible, compliant, and secure AI usage across your organization.',
      learningObjectives: [
        'Design comprehensive AI governance frameworks',
        'Implement risk assessment and mitigation strategies',
        'Ensure regulatory compliance (GDPR, SOC2, etc.)',
        'Build ethical AI guidelines for your organization'
      ],
      included: [
        'Governance framework templates',
        'Risk assessment workshops',
        'Compliance checklist and documentation',
        'Policy development guidance',
        'Third-party AI evaluation criteria',
        'Audit and monitoring systems'
      ],
      targetAudience: 'Legal, compliance, risk management, and security teams',
      idealFor: 'Organizations in regulated industries',
      instructor: {
        name: 'Rachel Patterson',
        title: 'AI Ethics & Compliance Lead',
        bio: 'Former regulatory advisor, 100+ AI audits completed',
        expertise: 'AI Governance, Regulatory Compliance, Risk Management'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Workshops" 
        content="AI workshops: Discovery, Technical Bootcamp, Use Case Ideation, MLOps, Governance. Expert-led training with hands-on learning."
      />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            AI Workshops
          </h1>
          <p className="text-xl text-signal-white/90">
            Expert-led training to build AI capabilities, from strategy to implementation
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-6 bg-void border-b border-int-orange/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-int-orange" />
            <h2 className="text-xl font-semibold">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['all', 'AI Strategy', 'Custom AI', 'MLOps'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-int-orange text-white'
                    : 'bg-carbon-night border border-slate-700 hover:border-int-orange text-signal-white/80'
                }`}
              >
                {cat === 'all' ? 'All Workshops' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops
              .filter(w => selectedCategory === 'all' || w.category === selectedCategory)
              .map((workshop, i) => {
              const Icon = workshop.icon;
              return (
                <div 
                  key={i}
                  className="p-8 bg-void rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center">
                      <Icon className="w-7 h-7 text-signal-white" />
                    </div>
                    <span className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-xs font-semibold text-int-orange">
                      {workshop.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{workshop.title}</h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-signal-white/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${workshop.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-signal-white/80 mb-6">{workshop.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-fusion-pink">LEARNING OBJECTIVES</h4>
                    <ul className="space-y-2">
                      {workshop.learningObjectives.map((obj, j) => (
                        <li key={j} className="text-sm text-signal-white/70 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-int-teal flex-shrink-0 mt-0.5" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-carbon-night rounded-lg mb-6">
                    <div className="text-xs text-signal-white/60 mb-1">TARGET AUDIENCE</div>
                    <div className="text-sm font-medium mb-3">{workshop.targetAudience}</div>
                    <div className="pt-3 border-t border-slate-700">
                      <div className="text-xs text-signal-white/60 mb-1">INSTRUCTOR</div>
                      <div className="text-sm font-semibold text-int-orange">{workshop.instructor.name}</div>
                      <div className="text-xs text-signal-white/60">{workshop.instructor.title}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setBookingWorkshop(workshop)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-lg font-semibold text-center hover:shadow-glow transition-all mt-auto"
                  >
                    Book Workshop
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16 px-6 bg-void border-y border-int-orange/30">
        <div className="max-w-5xl mx-auto">
          <SmartRecommendations limit={3} />
        </div>
      </section>

      {/* Custom Workshop CTA */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Workshop?</h2>
          <p className="text-xl text-signal-white/90 mb-8">
            We can design training tailored to your specific challenges, team size, and technical environment
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
          >
            Discuss Custom Workshop
          </Link>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingWorkshop && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-carbon-night border border-int-orange/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-carbon-night border-b border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Book Workshop</h2>
              <button
                onClick={() => setBookingWorkshop(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <WorkshopBooking 
                workshop={bookingWorkshop} 
                onClose={() => setBookingWorkshop(null)}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(244,114,182,0.4);
        }
      `}</style>
    </div>
  );
}