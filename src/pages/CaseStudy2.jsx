import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { TrendingUp, ArrowLeft, Clock, DollarSign, Users } from 'lucide-react';

export default function CaseStudy2() {
  const study = {
    icon: TrendingUp,
    title: 'Automated Prospecting Engine',
    industry: 'Professional Services',
    category: 'Business Development',
    client: 'Mid-Market Consulting Firm',
    challenge: 'Manual research of 30,000+ potential clients quarterly consumed significant BD resources and delivered stale data. The team spent weeks gathering basic information about prospects, leaving little time for actual relationship building and strategic outreach.',
    solution: 'Built AI agent for automated prospect research, qualification, and enrichment with real-time data validation. Deployed intelligent scraping system that monitors company updates, funding events, leadership changes, and technology adoption signals across multiple data sources.',
    results: [
      '$300K annual savings in research costs',
      '95% research automation rate',
      'Real-time lead intelligence updates',
      'Improved lead quality scores by 40%',
      'Reduced time-to-outreach by 80%',
      'Automated CRM enrichment and updates'
    ],
    metrics: {
      timeSaved: '2,000 hours annually',
      roi: '450%',
      implementation: '6 weeks',
      prospects: '30,000 quarterly'
    },
    testimonial: {
      quote: "Our BD team now focuses on relationships instead of research. The AI handles the grunt work, and we get better data than we ever collected manually.",
      author: "Head of Business Development"
    }
  };

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <section className="relative py-12 px-6 bg-carbon-night border-b border-flash-purple/30">
        <div className="max-w-6xl mx-auto">
          <Link 
            to={createPageUrl('CaseStudies')}
            className="inline-flex items-center gap-2 text-flash-purple hover:text-fusion-pink transition-colors mb-6"
          >
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
          <div className="inline-block px-3 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-xs font-semibold text-flash-purple">
            {study.category}
          </div>
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
            <DollarSign className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.implementation}</div>
            <div className="text-sm text-signal-white/60">Implementation</div>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.prospects}</div>
            <div className="text-sm text-signal-white/60">Prospects</div>
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
                    <div className="text-6xl mb-4">📊</div>
                    <div className="text-sm text-signal-white/60">Manual prospect research</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Weeks researching 30K prospects</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Stale, outdated data</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>No time for relationship building</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Poor lead quality</span></li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-neon-mint rounded-full text-sm font-semibold">AFTER</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-neon-mint/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-mint/20 to-void rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🤖</div>
                    <div className="text-sm text-signal-white/60">AI-powered intelligence</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>95% automated research</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Real-time data updates</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Focus on strategic outreach</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>40% better lead quality</span></li>
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
          <Link to={createPageUrl('Contact')} className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105">
            Start Your Project
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