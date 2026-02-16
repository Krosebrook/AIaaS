import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Zap, ArrowLeft, Clock, TrendingUp, Users } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { useScrollRestoration } from '../components/utils/useScrollRestoration';

export default function CaseStudy6() {
  const study = {
    icon: Zap,
    title: 'Enterprise AI Training Program',
    industry: 'Nonprofit',
    category: 'Org-Wide Enablement',
    client: 'Regional Education Foundation',
    challenge: 'Organization of 30 staff members anxious about AI with no structured training or adoption strategy. Leadership wanted to leverage AI but faced resistance, fear of job displacement, and lack of technical knowledge across the team.',
    solution: 'Delivered comprehensive AI enablement program with hands-on workshops, use case development, and ongoing support. Created custom training curriculum that addressed team concerns, demonstrated practical applications, and provided tools for immediate productivity gains.',
    results: [
      '10 hours saved per person weekly',
      '85% active AI adoption rate',
      'From anxiety to mastery in 90 days',
      'Measurable productivity gains across all departments',
      'Zero resistance after Week 3',
      'Team now evangelizes AI to peer organizations'
    ],
    metrics: {
      timeSaved: '300 hours/week org-wide',
      roi: '280%',
      implementation: '12 weeks',
      adoption: '85% active users'
    },
    testimonial: {
      quote: "We went from AI skeptics to AI champions. The training demystified the technology, and now our team can't imagine working without these tools. It's transformed our culture.",
      author: "Executive Director"
    }
  };

  const Icon = study.icon;
  useScrollRestoration('case-study-6');

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <section className="relative py-12 px-6 bg-carbon-night border-b border-flash-purple/30">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: 'Case Studies', href: createPageUrl('CaseStudies') },
            { label: study.title }
          ]} />
          <Link to={createPageUrl('CaseStudies')} className="inline-flex items-center gap-2 text-flash-purple hover:text-fusion-pink transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Case Studies
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center">
              <Icon className="w-8 h-8 text-signal-white" />
            </div>
            <div>
              <div className="text-sm text-fusion-pink mb-1">{study.industry}</div>
              <h1 className="text-4xl md:text-5xl font-bold">{study.title}</h1>
            </div>
          </div>
          <div className="inline-block px-3 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-xs font-semibold text-flash-purple">{study.category}</div>
        </div>
      </section>

      <section className="py-8 px-6 bg-gradient-to-r from-flash-purple/10 to-fusion-pink/10 border-b border-flash-purple/30">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <Clock className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.timeSaved}</div>
            <div className="text-sm text-signal-white/60">Time Saved</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.roi}</div>
            <div className="text-sm text-signal-white/60">ROI</div>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.implementation}</div>
            <div className="text-sm text-signal-white/60">Program Duration</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.adoption}</div>
            <div className="text-sm text-signal-white/60">Adoption Rate</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-flash-purple">The Transformation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-ember-red rounded-full text-sm font-semibold">BEFORE</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-ember-red/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-ember-red/20 to-void rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">😰</div>
                    <div className="text-sm text-signal-white/60">AI anxiety and resistance</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Fear of job displacement</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>No technical knowledge</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Zero AI adoption</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Missed opportunities</span></li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-neon-mint rounded-full text-sm font-semibold">AFTER</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-neon-mint/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-mint/20 to-void rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🚀</div>
                    <div className="text-sm text-signal-white/60">AI champions</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>85% active adoption</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>10 hours saved weekly/person</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>From anxiety to mastery</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Team evangelizes AI</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">The Challenge</h2>
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <p className="text-lg text-signal-white/90 leading-relaxed">{study.challenge}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">Our Solution</h2>
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <p className="text-lg text-signal-white/90 leading-relaxed">{study.solution}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {study.results.map((result, i) => (
                <div key={i} className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30 flex items-start gap-3">
                  <span className="text-flash-purple text-xl font-bold mt-1">✓</span>
                  <span className="text-signal-white/90">{result}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-flash-purple/10 to-fusion-pink/10 rounded-2xl border border-flash-purple/30">
            <div className="text-fusion-pink text-6xl mb-4 leading-none">"</div>
            <p className="text-xl text-signal-white/90 italic mb-6">{study.testimonial.quote}</p>
            <div className="text-signal-white/60">— {study.testimonial.author}, {study.client}</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready for Similar Results?</h2>
          <p className="text-xl mb-12 text-signal-white/90">Let's discuss how we can help you achieve comparable outcomes.</p>
          <Link to={createPageUrl('Contact')} className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105">Start Your Project</Link>
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