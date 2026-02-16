import React, { useState } from 'react';
import { createPageUrl } from '../utils';
import { Zap, Brain, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import AIReadinessAssessment from '../components/solutions/AIReadinessAssessment';
import SolutionExplorer from '../components/solutions/SolutionExplorer';
import { Link } from 'react-router-dom';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-orange/20 via-transparent to-int-navy/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-int-orange via-int-teal to-int-orange bg-clip-text text-transparent">
            Enterprise AI Solutions
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Proven AI implementations tailored to your industry and business goals. From strategy to deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-8 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
            >
              Take Assessment
            </button>
            <Link
              to={createPageUrl('StrategyWizard')}
              className="px-8 py-3 bg-slate-700 border border-slate-600 rounded-lg font-semibold hover:border-int-orange transition-all flex items-center gap-2"
            >
              Strategy Wizard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 px-6 max-w-6xl mx-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'assessment', label: 'Readiness Assessment' },
          { id: 'explorer', label: 'Solution Explorer' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-int-orange text-void'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 max-w-6xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Solution Types */}
            <section className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">AI Solution Categories</h2>
                <p className="text-slate-400">Explore our core AI capabilities</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: 'Predictive Intelligence',
                    description: 'Forecast outcomes, identify trends, and make data-driven decisions with advanced analytics models',
                    features: ['Demand forecasting', 'Risk prediction', 'Customer behavior analysis', 'Pattern recognition']
                  },
                  {
                    icon: Zap,
                    title: 'Process Automation',
                    description: 'Automate complex workflows and eliminate manual processes with intelligent RPA and AI',
                    features: ['Document processing', 'Workflow automation', 'Quality control', 'Resource optimization']
                  },
                  {
                    icon: BarChart3,
                    title: 'Business Intelligence',
                    description: 'Transform raw data into actionable insights with AI-powered analytics and visualization',
                    features: ['Real-time dashboards', 'Anomaly detection', 'Recommendation engines', 'Competitive analysis']
                  }
                ].map((solution, i) => {
                  const Icon = solution.icon;
                  return (
                    <div key={i} className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-int-orange transition-all">
                      <div className="p-3 bg-int-orange/20 rounded-lg w-fit mb-4">
                        <Icon className="w-6 h-6 text-int-orange" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                      <p className="text-slate-400 mb-4">{solution.description}</p>
                      <div className="space-y-2">
                        {solution.features.map((feature, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-int-orange flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Why Choose INTinc */}
            <section className="space-y-6 py-12 border-t border-slate-700">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Why Choose INTinc for AI</h2>
                <p className="text-slate-400">What sets our approach apart</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Security-First', desc: 'Enterprise-grade security built into every solution from day one' },
                  { title: 'Production-Ready', desc: 'Solutions that scale from proof-of-concept to enterprise deployment' },
                  { title: 'Industry Expertise', desc: 'Deep experience across finance, healthcare, retail, manufacturing, and more' },
                  { title: 'Rapid Implementation', desc: 'Get to business value in weeks, not months' },
                  { title: 'Measurable ROI', desc: 'Clear metrics and accountability for every AI initiative' },
                  { title: 'Your Success is Ours', desc: 'Dedicated support through implementation and beyond' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-int-navy/20 border border-int-navy/30 rounded-lg">
                    <div className="text-lg font-bold text-int-orange mb-2">{item.title}</div>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="py-12 px-8 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform with AI?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Start by understanding your AI readiness, explore solutions for your industry, or dive straight into strategy planning.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="px-8 py-3 bg-int-orange rounded-lg font-semibold hover:shadow-glow transition-all text-void"
                >
                  Assessment
                </button>
                <button
                  onClick={() => setActiveTab('explorer')}
                  className="px-8 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  Explore Solutions
                </button>
                <Link
                  to={createPageUrl('StrategyWizard')}
                  className="px-8 py-3 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  Build Strategy
                </Link>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'assessment' && <AIReadinessAssessment />}

        {activeTab === 'explorer' && <SolutionExplorer />}
      </div>
    </div>
  );
}