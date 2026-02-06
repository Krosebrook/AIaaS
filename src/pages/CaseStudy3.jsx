import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { FileText, ArrowLeft, Clock, TrendingUp, BarChart } from 'lucide-react';

export default function CaseStudy3() {
  const study = {
    icon: FileText,
    title: 'Instant Marketing Intelligence',
    industry: 'Marketing & Advertising',
    category: 'Performance Reporting',
    client: 'Multi-Brand Marketing Agency',
    challenge: 'Managing 80 brands with manual spreadsheet reporting consumed 150 hours weekly and delayed decision-making. Marketing teams struggled with outdated data, inconsistent reporting formats, and hours spent copying data between systems instead of analyzing performance.',
    solution: 'Engineered automated reporting pipeline with AI-powered analysis and anomaly detection. Built unified dashboard that aggregates data from multiple advertising platforms, performs trend analysis, and alerts teams to performance anomalies in real-time.',
    results: [
      '150 hours saved weekly across teams',
      'Real-time performance dashboards',
      'Automated anomaly detection and alerts',
      '99.9% data accuracy maintained',
      'Reduced reporting delays from days to minutes',
      'Enabled proactive campaign optimization'
    ],
    metrics: {
      timeSaved: '7,800 hours annually',
      roi: '520%',
      implementation: '8 weeks',
      brands: '80 brands managed'
    },
    testimonial: {
      quote: "We went from spending all our time on reports to actually using the data. The AI catches issues before we even see them, and our clients love the real-time insights.",
      author: "Director of Analytics"
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
            <BarChart className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.implementation}</div>
            <div className="text-sm text-signal-white/60">Implementation</div>
          </div>
          <div className="text-center">
            <FileText className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.brands}</div>
            <div className="text-sm text-signal-white/60">Brands</div>
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
                    <div className="text-6xl mb-4">📈</div>
                    <div className="text-sm text-signal-white/60">Manual spreadsheet chaos</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>150 hours weekly on reports</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Days-old performance data</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>Inconsistent reporting formats</span></li>
                  <li className="flex items-start gap-2 text-ember-red"><span className="mt-1">✗</span><span>No time for analysis</span></li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-neon-mint rounded-full text-sm font-semibold">AFTER</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-neon-mint/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-mint/20 to-void rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">⚡</div>
                    <div className="text-sm text-signal-white/60">Automated intelligence</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>7,800 hours saved annually</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Real-time dashboards</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Automated anomaly detection</span></li>
                  <li className="flex items-start gap-2 text-neon-mint"><span className="mt-1">✓</span><span>Proactive optimization</span></li>
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