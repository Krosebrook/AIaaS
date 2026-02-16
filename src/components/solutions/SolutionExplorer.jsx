import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Brain, BarChart3, Lock, ChevronRight } from 'lucide-react';

export default function SolutionExplorer() {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState(null);

  const industries = [
    'All Industries',
    'Financial Services',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Technology',
    'Energy'
  ];

  const solutionTypes = [
    'All Types',
    'Predictive Analytics',
    'Process Automation',
    'Customer Intelligence',
    'Risk Management'
  ];

  const solutions = [
    {
      id: 1,
      name: 'Predictive Risk Scoring',
      type: 'Predictive Analytics',
      industry: 'Financial Services',
      icon: BarChart3,
      description: 'AI-powered risk assessment for loan approvals and credit decisions',
      benefits: ['40% faster decisions', '25% reduction in defaults', 'Real-time scoring'],
      caseStudy: 'Fortune 500 bank increased approval rate by 15% while reducing defaults'
    },
    {
      id: 2,
      name: 'Patient Outcome Prediction',
      type: 'Predictive Analytics',
      industry: 'Healthcare',
      icon: Brain,
      description: 'Machine learning models to predict patient outcomes and optimize care',
      benefits: ['30% readmission reduction', 'Better resource allocation', 'Early intervention'],
      caseStudy: 'Major hospital network improved patient outcomes by 28% in 6 months'
    },
    {
      id: 3,
      name: 'Inventory Optimization',
      type: 'Process Automation',
      industry: 'Retail',
      icon: Zap,
      description: 'Dynamic inventory management powered by demand forecasting',
      benefits: ['35% inventory reduction', '20% sales increase', 'Lower stockouts'],
      caseStudy: 'Retail chain reduced excess inventory while increasing availability'
    },
    {
      id: 4,
      name: 'Fraud Detection Engine',
      type: 'Risk Management',
      industry: 'Financial Services',
      icon: Lock,
      description: 'Real-time fraud detection across transactions and accounts',
      benefits: ['99.2% detection rate', 'Sub-second response', 'Adaptive learning'],
      caseStudy: 'Payment processor stopped $50M+ in fraudulent transactions annually'
    },
    {
      id: 5,
      name: 'Production Quality Control',
      type: 'Process Automation',
      industry: 'Manufacturing',
      icon: Zap,
      description: 'Computer vision-based defect detection on production lines',
      benefits: ['98% defect detection', '50% quality cost reduction', 'Zero-downtime deployment'],
      caseStudy: 'Automotive supplier reduced defects by 45% while maintaining throughput'
    },
    {
      id: 6,
      name: 'Customer Churn Prediction',
      type: 'Customer Intelligence',
      industry: 'Technology',
      icon: Brain,
      description: 'Identify at-risk customers and optimize retention strategies',
      benefits: ['20% churn reduction', 'Targeted interventions', 'LTV improvement'],
      caseStudy: 'SaaS company increased customer lifetime value by 35%'
    },
    {
      id: 7,
      name: 'Energy Demand Forecasting',
      type: 'Predictive Analytics',
      industry: 'Energy',
      icon: BarChart3,
      description: 'Accurate demand forecasting for grid optimization and pricing',
      benefits: ['92% forecast accuracy', 'Cost reduction', 'Emissions optimization'],
      caseStudy: 'Utility provider reduced peak demand costs by $8M annually'
    },
    {
      id: 8,
      name: 'Supply Chain Optimization',
      type: 'Process Automation',
      industry: 'Manufacturing',
      icon: Zap,
      description: 'End-to-end supply chain visibility and predictive adjustments',
      benefits: ['25% logistics cost reduction', 'On-time delivery +18%', 'Better forecasting'],
      caseStudy: 'Global manufacturer improved delivery times and reduced costs'
    }
  ];

  const filteredSolutions = useMemo(() => {
    return solutions.filter(solution => {
      const industryMatch = selectedIndustry === 'all' || 
        solution.industry === selectedIndustry || 
        selectedIndustry === 'All Industries';
      const typeMatch = selectedType === 'all' || 
        solution.type === selectedType || 
        selectedType === 'All Types';
      return industryMatch && typeMatch;
    });
  }, [selectedIndustry, selectedType]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
        <h2 className="text-3xl font-bold mb-2 text-white">Solution Explorer</h2>
        <p className="text-slate-400">Browse proven AI solutions tailored to your industry and use case</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
          <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Industry
          </label>
          <div className="space-y-2">
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry === 'All Industries' ? 'all' : industry)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  (selectedIndustry === 'all' && industry === 'All Industries') ||
                  selectedIndustry === industry
                    ? 'bg-int-orange text-void font-semibold'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
          <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Solution Type
          </label>
          <div className="space-y-2">
            {solutionTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type === 'All Types' ? 'all' : type)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  (selectedType === 'all' && type === 'All Types') ||
                  selectedType === type
                    ? 'bg-int-orange text-void font-semibold'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredSolutions.map(solution => {
          const Icon = solution.icon;
          return (
            <div
              key={solution.id}
              onClick={() => setSelectedSolution(solution)}
              className="p-6 bg-slate-900/50 border border-slate-700 hover:border-int-orange rounded-xl cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-int-orange/20 rounded-lg">
                  <Icon className="w-6 h-6 text-int-orange" />
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                  {solution.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{solution.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{solution.description}</p>
              <div className="flex items-center text-int-orange font-semibold text-sm hover:translate-x-1 transition-transform">
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl p-8 max-h-96 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {(() => {
                  const Icon = selectedSolution.icon;
                  return <Icon className="w-8 h-8 text-int-orange mt-1" />;
                })()}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedSolution.name}</h2>
                  <p className="text-slate-400">{selectedSolution.industry}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSolution(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-slate-300 mb-6">{selectedSolution.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Benefits</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedSolution.benefits.map((benefit, i) => (
                  <div key={i} className="p-3 bg-int-orange/10 border border-int-orange/30 rounded-lg">
                    <div className="text-int-orange font-semibold text-sm">{benefit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg mb-6">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Real-World Impact</h3>
              <p className="text-slate-300">{selectedSolution.caseStudy}</p>
            </div>

            <button
              onClick={() => setSelectedSolution(null)}
              className="w-full px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {filteredSolutions.length === 0 && (
        <div className="p-12 text-center text-slate-400 bg-slate-900/30 rounded-lg">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No solutions found matching your criteria. Try different filters.</p>
        </div>
      )}
    </div>
  );
}