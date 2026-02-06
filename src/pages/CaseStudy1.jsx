import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Database, ArrowLeft, TrendingUp, Clock, DollarSign } from 'lucide-react';

export default function CaseStudy1() {
  const study = {
    icon: Database,
    title: 'Knowledge at Your Fingertips',
    industry: 'Consumer Goods',
    category: 'Product Enablement',
    client: 'Leading Consumer Goods Brand',
    challenge: 'Scattered product expertise across multiple teams and documents led to hours of manual searching and inconsistent customer support. Critical product information was trapped in emails, PDFs, and various systems, causing delays in customer response times and increasing support costs.',
    solution: 'Deployed AI-powered knowledge base with natural language search and automated documentation extraction. Built custom semantic search engine that indexes product data across all sources and provides instant, contextual answers to customer support queries.',
    results: [
      '80% reduction in information retrieval time',
      'Zero additional licensing costs',
      'Improved customer support consistency',
      'Automated documentation updates',
      'Eliminated need for manual document searches',
      'Real-time synchronization across all product data sources'
    ],
    metrics: {
      timeSaved: '15 hours/week per team member',
      roi: '300%',
      implementation: '4 weeks',
      teamSize: '12 support staff'
    },
    testimonial: {
      quote: "This system transformed how we handle customer inquiries. What used to take hours now happens in seconds, and our support quality has never been higher.",
      author: "VP of Customer Success"
    }
  };

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-void text-signal-white">
      {/* Header */}
      <section className="relative py-12 px-6 bg-carbon-night border-b border-flash-purple/30">
        <div className="max-w-6xl mx-auto">
          <Link 
            to={createPageUrl('CaseStudies')}
            className="inline-flex items-center gap-2 text-flash-purple hover:text-fusion-pink transition-colors mb-6"
            aria-label="Back to case studies overview"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
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

      {/* Metrics Bar */}
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
            <Database className="w-8 h-8 text-flash-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-fusion-pink mb-1">{study.metrics.teamSize}</div>
            <div className="text-sm text-signal-white/60">Team Size</div>
          </div>
        </div>
      </section>

      {/* Before/After Visualization */}
      <section className="py-24 px-6 bg-void" aria-labelledby="transformation-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="transformation-heading" className="text-3xl font-bold text-center mb-12 text-flash-purple">The Transformation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-ember-red rounded-full text-sm font-semibold">BEFORE</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-ember-red/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-ember-red/20 to-void rounded-lg mb-6 flex items-center justify-center overflow-hidden" role="img" aria-label="Before state: Knowledge scattered across systems">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4" aria-hidden="true">📚</div>
                    <div className="text-sm text-signal-white/60">Knowledge scattered across systems</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-ember-red">
                    <span className="mt-1">✗</span>
                    <span>Hours searching for product info</span>
                  </li>
                  <li className="flex items-start gap-2 text-ember-red">
                    <span className="mt-1">✗</span>
                    <span>Inconsistent customer responses</span>
                  </li>
                  <li className="flex items-start gap-2 text-ember-red">
                    <span className="mt-1">✗</span>
                    <span>Manual document searches</span>
                  </li>
                  <li className="flex items-start gap-2 text-ember-red">
                    <span className="mt-1">✗</span>
                    <span>Delayed support responses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className="absolute -top-4 left-6 px-4 py-1 bg-neon-mint rounded-full text-sm font-semibold">AFTER</div>
              <div className="p-8 bg-carbon-night rounded-2xl border-2 border-neon-mint/50 h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-mint/20 to-void rounded-lg mb-6 flex items-center justify-center overflow-hidden" role="img" aria-label="After state: AI-powered instant access">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4" aria-hidden="true">🎯</div>
                    <div className="text-sm text-signal-white/60">AI-powered instant access</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-neon-mint">
                    <span className="mt-1">✓</span>
                    <span>Instant information retrieval</span>
                  </li>
                  <li className="flex items-start gap-2 text-neon-mint">
                    <span className="mt-1">✓</span>
                    <span>Consistent, accurate answers</span>
                  </li>
                  <li className="flex items-start gap-2 text-neon-mint">
                    <span className="mt-1">✓</span>
                    <span>Automated documentation sync</span>
                  </li>
                  <li className="flex items-start gap-2 text-neon-mint">
                    <span className="mt-1">✓</span>
                    <span>Real-time support responses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Challenge */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">The Challenge</h2>
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <p className="text-lg text-signal-white/90 leading-relaxed">
                {study.challenge}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">Our Solution</h2>
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <p className="text-lg text-signal-white/90 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fusion-pink">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {study.results.map((result, i) => (
                <div 
                  key={i}
                  className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30 flex items-start gap-3"
                >
                  <span className="text-flash-purple text-xl font-bold mt-1">✓</span>
                  <span className="text-signal-white/90">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="p-8 bg-gradient-to-br from-flash-purple/10 to-fusion-pink/10 rounded-2xl border border-flash-purple/30">
            <div className="text-fusion-pink text-6xl mb-4 leading-none">"</div>
            <p className="text-xl text-signal-white/90 italic mb-6">
              {study.testimonial.quote}
            </p>
            <div className="text-signal-white/60">— {study.testimonial.author}, {study.client}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready for Similar Results?</h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's discuss how we can help you achieve comparable outcomes.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
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