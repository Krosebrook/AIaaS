import React, { useState, useEffect } from 'react';
import { usePersonalization } from '../components/PersonalizationEngine';
import { useRecommendations } from '../components/RecommendationEngine';
import RecommendationWidget from '../components/RecommendationEngine';
import SEOMetadata from '../components/SEOMetadata';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Sparkles, TrendingUp, CheckCircle, ArrowRight, Zap, BookOpen } from 'lucide-react';

export default function PersonalizedDashboard() {
  const navigate = useNavigate();
  const { userProfile, trackPageVisit } = usePersonalization();
  const { recommendations, loading, generateRecommendations } = useRecommendations(userProfile);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    trackPageVisit('PersonalizedDashboard');
  }, []);

  useEffect(() => {
    if (userProfile.visitedPages.length > 0 && !hasLoaded) {
      generateRecommendations();
      setHasLoaded(true);
    }
  }, [userProfile.visitedPages.length]);

  const engagementScore = (() => {
    let score = 0;
    if (userProfile.visitedPages.length > 0) score += Math.min(30, userProfile.visitedPages.length * 5);
    if (userProfile.assessmentResults) score += 25;
    if (userProfile.exploredSolutions.length > 0) score += Math.min(25, userProfile.exploredSolutions.length * 8);
    if (userProfile.interests.length > 0) score += 20;
    return Math.min(100, score);
  })();

  const readinessStageColor = {
    'Early Stage': 'from-red-500 to-orange-600',
    'Developing': 'from-yellow-500 to-orange-600',
    'Advanced': 'from-blue-500 to-cyan-600',
    'Leading': 'from-green-500 to-emerald-600'
  };

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Personalized Dashboard" 
        content="Your personalized AI journey dashboard with tailored recommendations, assessment results, and suggested next steps."
      />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-orange/20 via-transparent to-int-navy/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-int-orange" />
            <div className="inline-block px-4 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-semibold text-int-orange">
              Your AI Journey
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Personalized AI Recommendations
          </h1>
          <p className="text-xl text-slate-300">
            Based on your exploration and assessment results, here's your tailored path to AI implementation.
          </p>
        </div>
      </section>

      {/* Engagement & Readiness */}
      <section className="py-12 px-6 bg-carbon-night">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Engagement Score */}
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">ENGAGEMENT SCORE</h3>
            <div className="mb-4">
              <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-int-orange to-int-navy transition-all"
                  style={{ width: `${engagementScore}%` }}
                />
              </div>
            </div>
            <div className="text-3xl font-bold text-int-orange mb-2">{engagementScore}%</div>
            <p className="text-sm text-slate-400">
              {engagementScore >= 70
                ? 'Highly engaged - Ready for consultation'
                : engagementScore >= 40
                ? 'Good progress - Continue exploring'
                : 'Getting started - Explore more options'}
            </p>
          </div>

          {/* Pages Visited */}
          <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">PAGES EXPLORED</h3>
            <div className="text-3xl font-bold text-int-navy mb-2">{userProfile.visitedPages.length}</div>
            <div className="space-y-2">
              {userProfile.visitedPages.slice(0, 3).map((page, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-int-orange flex-shrink-0" />
                  {page}
                </div>
              ))}
            </div>
          </div>

          {/* Readiness Level */}
          {userProfile.assessmentResults && (
            <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-400 mb-4">AI READINESS</h3>
              <div className={`inline-block px-4 py-2 rounded-lg font-bold text-white mb-2 bg-gradient-to-r ${readinessStageColor[userProfile.readinessLevel] || 'from-slate-600 to-slate-700'}`}>
                {userProfile.readinessLevel}
              </div>
              <p className="text-sm text-slate-400 mt-4">
                {userProfile.industry && `Industry: ${userProfile.industry}`}
              </p>
              <p className="text-sm text-slate-400">
                Score: {userProfile.assessmentResults.readinessScore}%
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block">
                <Zap className="w-8 h-8 text-int-orange animate-spin mb-4 mx-auto" />
              </div>
              <p className="text-slate-400">Generating personalized recommendations...</p>
            </div>
          ) : recommendations ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recommendations Widget */}
              <div className="lg:col-span-3">
                <RecommendationWidget 
                  recommendations={recommendations} 
                  onExplore={(type, item) => {
                    if (type === 'caseStudy') {
                      // Navigate to case studies section
                      navigate(createPageUrl('CaseStudies'));
                    }
                  }}
                />
              </div>

              {/* Solutions Summary */}
              <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-int-orange" />
                  Solutions
                </h3>
                <div className="space-y-3">
                  {recommendations.recommendedSolutions.map((sol, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(createPageUrl('Solutions'))}
                      className="w-full text-left p-3 bg-int-orange/10 border border-int-orange/30 hover:border-int-orange rounded-lg transition-all text-sm font-medium text-white hover:bg-int-orange/20"
                    >
                      {sol}
                      <ArrowRight className="w-4 h-4 inline-block ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Explored Solutions */}
              {userProfile.exploredSolutions.length > 0 && (
                <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-int-teal" />
                    Explored
                  </h3>
                  <div className="space-y-2">
                    {userProfile.exploredSolutions.slice(0, 5).map((sol, i) => (
                      <div key={i} className="p-2 bg-slate-800/50 rounded-lg text-sm text-slate-300">
                        {sol.name}
                        <div className="text-xs text-slate-500 mt-1">{sol.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="p-6 bg-gradient-to-br from-int-orange/20 to-int-navy/20 border border-int-orange/30 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Ready to Move Forward?</h3>
                  <p className="text-sm text-slate-300 mb-6">
                    Schedule a consultation with our AI experts to discuss your personalized roadmap.
                  </p>
                </div>
                <button
                  onClick={() => navigate(createPageUrl('Contact'))}
                  className="w-full px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all text-white"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-900/30 border border-slate-700 rounded-xl">
              <p className="text-slate-400 mb-6">
                Explore more solutions and take the AI Readiness Assessment to get personalized recommendations.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate(createPageUrl('Solutions'))}
                  className="px-6 py-3 bg-int-orange hover:bg-int-orange/90 rounded-lg font-semibold text-void transition-all"
                >
                  Explore Solutions
                </button>
                <button
                  onClick={() => navigate(createPageUrl('Solutions'), { state: { tab: 'assessment' } })}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
                >
                  Take Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 px-6 bg-carbon-night border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">How to Get the Most from Your Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: 1,
                title: 'Complete Your Assessment',
                desc: 'Take the AI Readiness Assessment to unlock personalized solutions matching your organization.'
              },
              {
                num: 2,
                title: 'Explore Solutions',
                desc: 'Browse and interact with solutions to refine recommendations based on your interest.'
              },
              {
                num: 3,
                title: 'Connect with Experts',
                desc: 'Schedule a consultation to discuss your strategy and implementation roadmap.'
              }
            ].map((tip, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-int-orange/20 flex items-center justify-center mb-4">
                  <span className="text-int-orange font-bold">{tip.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}