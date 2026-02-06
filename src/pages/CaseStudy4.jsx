import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Users, ArrowLeft, Clock, TrendingUp, FileText } from 'lucide-react';

export default function CaseStudy4() {
  const study = {
    icon: Users,
    title: 'Voice-to-Documentation Pipeline',
    industry: 'Nonprofit & Associations',
    category: 'Operations',
    client: 'National Trade Association',
    challenge: 'Critical operational knowledge trapped in meetings with no systematic documentation process. Years of institutional knowledge existed only in people\'s heads, creating risk and inefficiency as staff turnover increased.',
    solution: 'Implemented voice AI for meeting transcription, analysis, and automated SOP generation. Deployed system that records meetings, identifies key processes and decisions, and generates structured documentation in the organization\'s standard format.',
    results: [
      '700+ SOPs created in first year',
      'Under 1 hour per document including review',
      'Consistent formatting and structure',
      'Searchable knowledge base deployed',
      'Reduced onboarding time by 60%',
      'Eliminated knowledge loss from turnover'
    ],
    metrics: {
      timeSaved: '1,000+ hours saved',
      roi: '380%',
      implementation: '5 weeks',
      documents: '700+ SOPs'
    },
    testimonial: {
      quote: "We finally captured decades of institutional knowledge. New hires can now find answers in minutes instead of spending weeks learning from senior staff.",
      author: "COO"
    }
  };

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <section className="relative py-12 px-6 bg-carbon-night border-b border-flash-purple/30">
        <div className="max-w-6xl mx-auto">
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
            <div className="text-sm text-signal-white/60">Implementation</div>
          </div>
          <div className="text-center">
            <FileText className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.documents}</div>
            <div className="text-sm text-signal-white/60">Documents</div>
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
                    <div className="text-6xl mb-4">🗣️</div>
                    <div className="text-sm text-signal-white/60">Knowledge trapped in meetings</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>No systematic documentation</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Knowledge in people's heads</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>High turnover risk</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Long onboarding times</span></li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-neon-mint rounded-full text-sm font-semibold">AFTER</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-neon-mint/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-mint/20 to-void rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-sm text-signal-white/60">Automated documentation</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>700+ SOPs created</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Searchable knowledge base</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Zero knowledge loss</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>60% faster onboarding</span></li>
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