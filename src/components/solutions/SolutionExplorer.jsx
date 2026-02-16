import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Brain, BarChart3, Lock, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { usePersonalization } from '../PersonalizationEngine';

export default function SolutionExplorer() {
  const navigate = useNavigate();
  const { trackSolutionExplored } = usePersonalization();
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTechStack, setSelectedTechStack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
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

  const techStacks = [
    'All Technologies',
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Predictive Modeling',
    'Deep Learning'
  ];

  const solutions = [
    {
      id: 1,
      name: 'Predictive Risk Scoring',
      type: 'Predictive Analytics',
      industry: 'Financial Services',
      icon: BarChart3,
      tech: 'Predictive Modeling',
      popularity: 95,
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
      tech: 'Machine Learning',
      popularity: 88,
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
      tech: 'Predictive Modeling',
      popularity: 82,
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
      tech: 'Deep Learning',
      popularity: 93,
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
      tech: 'Computer Vision',
      popularity: 79,
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
      tech: 'Machine Learning',
      popularity: 85,
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
      tech: 'Deep Learning',
      popularity: 76,
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
      tech: 'Machine Learning',
      popularity: 81,
      description: 'End-to-end supply chain visibility and predictive adjustments',
      benefits: ['25% logistics cost reduction', 'On-time delivery +18%', 'Better forecasting'],
      caseStudy: 'Global manufacturer improved delivery times and reduced costs'
    }
  ];

  const filteredSolutions = useMemo(() => {
    let filtered = solutions.filter(solution => {
      const industryMatch = selectedIndustry === 'all' || 
        solution.industry === selectedIndustry || 
        selectedIndustry === 'All Industries';
      const typeMatch = selectedType === 'all' || 
        solution.type === selectedType || 
        selectedType === 'All Types';
      const techMatch = selectedTechStack === 'all' || 
        solution.tech === selectedTechStack || 
        selectedTechStack === 'All Technologies';
      const searchMatch = !searchQuery || 
        solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return industryMatch && typeMatch && techMatch && searchMatch;
    });

    // Sort
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'relevance' && searchQuery) {
      filtered.sort((a, b) => {
        const aMatch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 0 : 1;
        const bMatch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    return filtered;
  }, [selectedIndustry, selectedType, selectedTechStack, searchQuery, sortBy]);

  const handleGetDemo = (solution) => {
    navigate(createPageUrl('Contact'), {
      state: {
        prefilled: {
          message: `I'm interested in scheduling a demo for the "${solution.name}" solution. This solution is perfect for our ${selectedIndustry !== 'all' ? selectedIndustry : 'organization'}. Please provide available demo times.`
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-int-orange/30 rounded-xl">
        <h2 className="text-3xl font-bold mb-2 text-white">Solution Explorer</h2>
        <p className="text-slate-400">Browse proven AI solutions tailored to your industry and use case</p>
      </div>

      <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search solutions by name, keyword, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none placeholder-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-300 font-medium">Sort by:</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('relevance')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'relevance'
                ? 'bg-int-orange text-void font-semibold'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Relevance
          </button>
          <button
            onClick={() => setSortBy('popularity')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'popularity'
                ? 'bg-int-orange text-void font-semibold'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Popularity
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
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
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
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
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
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

        <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
          <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Tech Stack
          </label>
          <div className="space-y-2">
            {techStacks.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTechStack(tech === 'All Technologies' ? 'all' : tech)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                  (selectedTechStack === 'all' && tech === 'All Technologies') ||
                  selectedTechStack === tech
                    ? 'bg-int-orange text-void font-semibold'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredSolutions.map(solution => {
          const Icon = solution.icon;
          return (
            <div
              key={solution.id}
              className="p-6 bg-slate-900/50 border border-slate-700 hover:border-int-orange rounded-xl transition-all hover:shadow-lg flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-int-orange/20 rounded-lg">
                  <Icon className="w-6 h-6 text-int-orange" />
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {solution.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {solution.tech}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{solution.name}</h3>
              <p className="text-slate-400 text-sm mb-4 flex-1">{solution.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    trackSolutionExplored(solution.id, solution.name, solution.type);
                    setSelectedSolution(solution);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 text-int-orange font-semibold text-sm hover:text-int-orange/80 transition-colors"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleGetDemo(solution)}
                  className="flex-1 px-4 py-2 bg-int-orange hover:bg-int-orange/90 text-void font-semibold text-sm rounded-lg transition-all"
                >
                  Get a Demo
                </button>
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

            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg mb-6">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Technology</h3>
              <p className="text-slate-300">{selectedSolution.tech}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedSolution(null)}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleGetDemo(selectedSolution);
                  setSelectedSolution(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all text-white"
              >
                Get a Demo
              </button>
            </div>
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