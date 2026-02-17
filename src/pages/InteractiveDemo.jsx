import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import AIBusinessAnalyzer from '../components/demo/AIBusinessAnalyzer';
import ProjectWalkthrough from '../components/demo/ProjectWalkthrough';
import { Brain, Zap, ArrowRight, Play } from 'lucide-react';

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Interactive Demo" 
        content="Experience INTinc's AI capabilities firsthand. Try our live AI business analyzer and explore step-by-step walkthrough of successful AI implementations."
      />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/20 via-transparent to-int-orange/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-int-orange/20 rounded-full mb-6">
            <Brain className="w-12 h-12 text-int-orange" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            Experience AI in Action
          </h1>
          <p className="text-xl text-signal-white/90 max-w-3xl mx-auto">
            Try our live AI tools and see how we transform business challenges into measurable results
          </p>
        </div>
      </section>

      {/* Demo Selector */}
      <section className="py-12 px-6 bg-carbon-night">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex-1 p-6 rounded-xl border-2 transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-gradient-to-br from-int-orange/20 to-int-navy/20 border-int-orange'
                  : 'bg-void border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activeTab === 'analyzer' ? 'bg-int-orange/20' : 'bg-slate-800'
                }`}>
                  <Zap className={`w-6 h-6 ${activeTab === 'analyzer' ? 'text-int-orange' : 'text-slate-400'}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">Live AI Analyzer</h3>
                  <p className="text-sm text-signal-white/60">Try it now</p>
                </div>
              </div>
              <p className="text-sm text-signal-white/70 text-left">
                Describe your business challenge and get instant AI-powered recommendations
              </p>
            </button>

            <button
              onClick={() => setActiveTab('walkthrough')}
              className={`flex-1 p-6 rounded-xl border-2 transition-all ${
                activeTab === 'walkthrough'
                  ? 'bg-gradient-to-br from-int-orange/20 to-int-navy/20 border-int-orange'
                  : 'bg-void border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activeTab === 'walkthrough' ? 'bg-int-navy/20' : 'bg-slate-800'
                }`}>
                  <Play className={`w-6 h-6 ${activeTab === 'walkthrough' ? 'text-int-navy' : 'text-slate-400'}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">Success Story Walkthrough</h3>
                  <p className="text-sm text-signal-white/60">Step-by-step</p>
                </div>
              </div>
              <p className="text-sm text-signal-white/70 text-left">
                See how we implement AI from discovery to production deployment
              </p>
            </button>
          </div>

          {/* Demo Content */}
          <div className="p-8 bg-void border border-slate-700 rounded-2xl">
            {activeTab === 'analyzer' && (
              <div>
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-3">AI Business Analyzer</h2>
                  <p className="text-signal-white/80 max-w-2xl mx-auto">
                    This is a live demonstration of our AI consultation process. Describe any business challenge, 
                    and our AI will analyze it and provide tailored recommendations in real-time.
                  </p>
                  <div className="inline-block mt-4 px-4 py-2 bg-int-teal/20 border border-int-teal/30 rounded-full">
                    <span className="text-sm font-semibold text-int-teal">
                      🤖 Powered by Live AI • Real Analysis • No Mock Data
                    </span>
                  </div>
                </div>
                <AIBusinessAnalyzer />
              </div>
            )}

            {activeTab === 'walkthrough' && (
              <div>
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-3">Project Success Story</h2>
                  <p className="text-signal-white/80 max-w-2xl mx-auto">
                    Follow a real AI implementation project from initial discovery through production deployment. 
                    See the activities, deliverables, and measurable outcomes at each phase.
                  </p>
                  <div className="inline-block mt-4 px-4 py-2 bg-int-navy/20 border border-int-navy/30 rounded-full">
                    <span className="text-sm font-semibold text-int-navy">
                      📊 Based on Actual Client Project • 10-Week Timeline • $180K Annual Savings
                    </span>
                  </div>
                </div>
                <ProjectWalkthrough />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What Makes This Real */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why This Demo Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-carbon-night border border-int-orange/30 rounded-xl">
              <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-int-orange" />
              </div>
              <h3 className="font-bold mb-2">Real AI, Real Time</h3>
              <p className="text-sm text-signal-white/80">
                The analyzer uses production AI models—the same technology we deploy for clients. No smoke and mirrors.
              </p>
            </div>
            <div className="p-6 bg-carbon-night border border-int-navy/30 rounded-xl">
              <div className="w-12 h-12 bg-int-navy/20 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-int-navy" />
              </div>
              <h3 className="font-bold mb-2">Proven Methodology</h3>
              <p className="text-sm text-signal-white/80">
                The walkthrough mirrors our actual implementation process—security-first, measurable, production-ready.
              </p>
            </div>
            <div className="p-6 bg-carbon-night border border-int-teal/30 rounded-xl">
              <div className="w-12 h-12 bg-int-teal/20 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-int-teal" />
              </div>
              <h3 className="font-bold mb-2">Your Challenge Next</h3>
              <p className="text-sm text-signal-white/80">
                See how this applies to your business. Every analysis is unique, every implementation is custom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Implement This in YOUR Business?</h2>
          <p className="text-xl text-signal-white/90 mb-8 max-w-2xl mx-auto">
            Get a personalized AI readiness assessment and custom implementation roadmap
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