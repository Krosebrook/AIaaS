import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { usePersonalization } from '../components/PersonalizationEngine';
import DynamicFAQ from '../components/DynamicFAQ';
import { BehaviorOutreachTrigger, useBehaviorAnalytics } from '../components/BehaviorAnalytics';
import { CRMFollowUpQueue, usePersonalizedContent } from '../components/CRMIntegration';
import { AdaptiveHero, PersonalizedCTA, DynamicContentAdapter } from '../components/DynamicContent';
import GuidedTour from '../components/GuidedTour';
import { useScrollRestoration } from '../components/utils/useScrollRestoration';
import OnboardingChecklist from '../components/onboarding/OnboardingChecklist';
import InteractiveTour from '../components/onboarding/InteractiveTour';
import SmartRecommendations from '../components/SmartRecommendations';
import ProactiveContentSuggestions from '../components/content/ProactiveContentSuggestions';
import PersonalizedSummary from '../components/content/PersonalizedSummary';
import { 
  ChevronDown, 
  Sparkles, 
  Shield, 
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Award,
  Brain,
  CheckCircle,
  Play
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userProfile, trackPageVisit, trackInterest, getRecommendations } = usePersonalization();
  const { trackPageView, trackInteraction, getUserJourney } = useBehaviorAnalytics();
  const { journey, recommendations: contentRecs, shouldShowPersonalization } = usePersonalizedContent();
  const [recommendations, setRecommendations] = useState(null);
  const [pageStartTime] = useState(Date.now());
  const adaptiveHero = AdaptiveHero();
  useScrollRestoration('home');

  useEffect(() => {
    trackPageVisit('Home');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      trackPageView('Home', Date.now() - pageStartTime);
    };
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (userProfile.visitedPages.length > 1) {
        const recs = await getRecommendations();
        setRecommendations(recs);
      }
    };
    loadRecommendations();
  }, [userProfile.visitedPages.length]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Home" 
        content="Enterprise AI implementation with MSP discipline. Discover opportunities, harden infrastructure, ship production systems. Workshops, consulting, and custom AI solutions."
      />
      <GuidedTour />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-int-navy/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-int-orange/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <DynamicContentAdapter
              defaultContent={
                <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent animate-gradient">
                  AI for YOUR Business
                </h1>
              }
              variants={[
                {
                  stage: 'consideration',
                  content: (
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent animate-gradient">
                      {adaptiveHero.headline}
                    </h1>
                  )
                },
                {
                  stage: 'decision',
                  content: (
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent animate-gradient">
                      {adaptiveHero.headline}
                    </h1>
                  )
                }
              ]}
            />

            <p className="text-2xl md:text-4xl mb-12 text-signal-white/90">
              {adaptiveHero.subheadline || 'Our Purpose is YOUR Success.'}
            </p>

            <PersonalizedCTA
              defaultCTA={
                <Link 
                  to={createPageUrl('Contact')}
                  onClick={() => trackInteraction('click', 'hero-cta', { source: 'hero', stage: journey.currentStage })}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                >
                  GET STARTED
                </Link>
              }
              variants={{
                soft: (
                  <Link 
                    to={createPageUrl('Services')}
                    onClick={() => trackInteraction('click', 'hero-cta-soft', { stage: 'awareness' })}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                  >
                    EXPLORE SOLUTIONS
                  </Link>
                ),
                educational: (
                  <Link 
                    to={createPageUrl('CaseStudies')}
                    onClick={() => trackInteraction('click', 'hero-cta-edu', { stage: 'consideration' })}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                  >
                    SEE SUCCESS STORIES
                  </Link>
                ),
                direct: (
                  <Link 
                    to={createPageUrl('Contact')}
                    onClick={() => trackInteraction('click', 'hero-cta-direct', { stage: 'decision' })}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                  >
                    SCHEDULE CONSULTATION
                  </Link>
                )
              }}
            />

            <BehaviorOutreachTrigger />
            <CRMFollowUpQueue />
          </div>

        <button 
          onClick={() => scrollToSection('process')}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Scroll down to process section"
        >
          <ChevronDown className="w-8 h-8 text-int-orange" aria-hidden="true" />
        </button>
      </section>

      {/* Process Overview */}
      <section id="process" className="py-24 px-6 bg-carbon-night" aria-labelledby="process-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="process-heading" className="sr-only">Our Three-Step Process</h2>
          <div className="flex justify-center items-center gap-8 mb-16 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-int-orange/20 border-2 border-int-orange flex items-center justify-center" aria-hidden="true">
                <span className="text-2xl font-bold text-int-orange">1</span>
              </div>
              <span className="text-xl font-semibold">Discover.</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-int-navy/20 border-2 border-int-navy flex items-center justify-center">
                <span className="text-2xl font-bold text-int-navy">2</span>
              </div>
              <span className="text-xl font-semibold">Harden.</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-int-teal/20 border-2 border-int-teal flex items-center justify-center">
                <span className="text-2xl font-bold text-int-teal">3</span>
              </div>
              <span className="text-xl font-semibold">Ship.</span>
            </div>
          </div>
          
          <p className="text-xl mb-4">
            <em className="text-int-orange">AI transforms businesses.</em> At <strong>INTinc.com</strong>, we deliver results.
          </p>
          <p className="text-lg text-signal-white/80 max-w-4xl mx-auto">
            We implement AI solutions tailored to YOUR business needs with enterprise-grade security and measurable ROI. From discovery to deployment, we bring technical expertise and proven methodology to transform your operations with production-ready AI systems.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            WHO WE ARE
          </h2>
          <p className="text-xl text-center mb-16 max-w-4xl mx-auto text-signal-white/90">
            INTinc.com specializes in enterprise AI implementation—empowering you to <strong>discover</strong> opportunities, <strong>harden</strong> your infrastructure, and <strong>ship</strong> production solutions that drive YOUR business forward.
          </p>

          {/* Three Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Discover */}
            <div className="relative group">
              <div className="p-8 bg-carbon-night rounded-2xl border border-int-orange/30 hover:border-int-orange transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-int-orange/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-int-orange">1</span>
                  </div>
                  <Sparkles className="w-8 h-8 text-int-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Discover.</h3>
                <p className="text-signal-white/80 mb-6">
                  We assess your environment and identify AI opportunities. Through structured workshops and risk assessments, your team gains clarity on where AI delivers measurable value without compromising security.
                </p>
                <button 
                  onClick={() => toggleSection('discover')}
                  className="text-int-navy hover:text-int-orange transition-colors font-semibold flex items-center gap-2"
                >
                  LEARN MORE <ChevronDown className={`w-4 h-4 transition-transform ${activeSection === 'discover' ? 'rotate-180' : ''}`} />
                </button>

                {activeSection === 'discover' && (
                  <div className="mt-6 pt-6 border-t border-int-navy/30">
                    <h4 className="font-semibold mb-3 text-int-orange">DISCOVER Details</h4>
                    <ul className="space-y-3 text-sm text-signal-white/80">
                      <li><strong>Risk-First Assessment:</strong> Map AI opportunities against your compliance, security, and operational requirements.</li>
                      <li><strong>Hands-On Workshops:</strong> Structured sessions that build technical literacy and identify high-impact use cases.</li>
                      <li><strong>Readiness Audit:</strong> Evaluate infrastructure, data governance, and team capability before commitment.</li>
                    </ul>
                    <button 
                      onClick={() => toggleSection(null)}
                      className="mt-4 text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                    >
                      BACK
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Harden */}
            <div className="relative group">
              <div className="p-8 bg-carbon-night rounded-2xl border border-int-navy/30 hover:border-int-navy transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-int-navy/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-int-navy">2</span>
                  </div>
                  <Shield className="w-8 h-8 text-int-navy" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Harden.</h3>
                <p className="text-signal-white/80 mb-6">
                  We architect secure, scalable AI systems. Using rapid prototyping and proof-of-concept testing, we validate technical feasibility and establish governance frameworks before full deployment.
                </p>
                <button 
                  onClick={() => toggleSection('harden')}
                  className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold flex items-center gap-2"
                >
                  LEARN MORE <ChevronDown className={`w-4 h-4 transition-transform ${activeSection === 'harden' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSection === 'harden' && (
                  <div className="mt-6 pt-6 border-t border-flash-purple/30">
                    <h4 className="font-semibold mb-3 text-fusion-pink">HARDEN Details</h4>
                    <ul className="space-y-3 text-sm text-signal-white/80">
                      <li><strong>Security-First Architecture:</strong> Design AI systems with encryption, access controls, and audit trails from day one.</li>
                      <li><strong>Rapid Prototyping:</strong> Validate concepts with minimal investment before scaling infrastructure.</li>
                      <li><strong>Governance Framework:</strong> Establish policies, change management, and compliance protocols for sustainable AI operations.</li>
                    </ul>
                    <button 
                      onClick={() => toggleSection(null)}
                      className="mt-4 text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                    >
                      BACK
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Ship */}
            <div className="relative group">
              <div className="p-8 bg-carbon-night rounded-2xl border border-int-teal/30 hover:border-int-teal transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-int-teal/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-int-teal">3</span>
                  </div>
                  <Rocket className="w-8 h-8 text-int-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ship.</h3>
                <p className="text-signal-white/80 mb-6">
                  We deploy production-ready AI solutions. Our engineering team builds automated workflows, intelligent agents, and data pipelines that deliver measurable ROI—with full documentation and knowledge transfer.
                </p>
                <button 
                  onClick={() => toggleSection('ship')}
                  className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold flex items-center gap-2"
                >
                  LEARN MORE <ChevronDown className={`w-4 h-4 transition-transform ${activeSection === 'ship' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSection === 'ship' && (
                  <div className="mt-6 pt-6 border-t border-flash-purple/30">
                    <h4 className="font-semibold mb-3 text-fusion-pink">SHIP Details</h4>
                    <ul className="space-y-3 text-sm text-signal-white/80">
                      <li><strong>Production Engineering:</strong> Deploy monitored, maintained AI systems with SLA commitments and incident response.</li>
                      <li><strong>Custom Solutions:</strong> From data pipelines to intelligent automation—built to your specifications.</li>
                      <li><strong>Knowledge Transfer:</strong> Full documentation and training ensure your team can maintain and extend solutions independently.</li>
                    </ul>
                    <button 
                      onClick={() => toggleSection(null)}
                      className="mt-4 text-flash-purple hover:text-fusion-pink transition-colors font-semibold"
                    >
                      BACK
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-int-navy/20 via-void to-int-orange/20 border-y border-int-orange/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-semibold text-int-orange mb-6">
              EXPERIENCE AI IN ACTION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See What We Build For YOUR Business
            </h2>
            <p className="text-xl text-signal-white/90 max-w-3xl mx-auto">
              Try our live AI business analyzer or watch a step-by-step walkthrough of a successful AI implementation—no sales pitch, just real technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-8 bg-slate-900/50 border border-int-orange/30 rounded-xl hover:border-int-orange transition-all group">
              <div className="w-16 h-16 bg-int-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-int-orange" />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-center">Live AI Demo</h3>
              <p className="text-signal-white/70 text-center mb-6">
                Describe your business challenge and get instant AI-powered recommendations using the same technology we deploy for clients
              </p>
              <Link
                to={createPageUrl('InteractiveDemo')}
                onClick={() => trackInteraction('click', 'demo-cta', { type: 'analyzer' })}
                className="w-full block text-center px-6 py-3 bg-int-orange hover:bg-int-orange/80 rounded-lg font-semibold transition-all"
              >
                Try It Now →
              </Link>
            </div>
            <div className="p-8 bg-slate-900/50 border border-int-navy/30 rounded-xl hover:border-int-navy transition-all group">
              <div className="w-16 h-16 bg-int-navy/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-int-navy" />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-center">Success Story</h3>
              <p className="text-signal-white/70 text-center mb-6">
                Watch an interactive walkthrough of a real client project from discovery to deployment with measurable results
              </p>
              <Link
                to={createPageUrl('InteractiveDemo')}
                onClick={() => trackInteraction('click', 'demo-cta', { type: 'walkthrough' })}
                className="w-full block text-center px-6 py-3 bg-int-navy hover:bg-int-navy/80 rounded-lg font-semibold transition-all"
              >
                See How It Works →
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to={createPageUrl('AIReadinessAssessment')}
              onClick={() => trackInteraction('click', 'assessment-cta', { source: 'home-page' })}
              className="inline-block px-10 py-5 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Or Take Your Free AI Readiness Assessment
            </Link>
            <p className="text-sm text-signal-white/60 mt-4">
              6 questions • 5 minutes • Personalized recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Reality Check */}
      <section className="py-24 px-6 bg-gradient-to-br from-carbon-night to-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            YOUR BUSINESS DESERVES MORE
          </h2>
          <p className="text-xl mb-8 text-signal-white/90">
            AI implementation shouldn't be complicated. At <span className="text-int-orange font-semibold">INTinc.com</span>, we focus on <span className="text-int-navy font-semibold">YOUR results</span>—delivering solutions that <span className="text-int-teal font-semibold">transform operations</span> and drive measurable ROI.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            START TODAY
          </Link>
        </div>
      </section>

      {/* Key Trends */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            AI INSIGHTS FOR YOUR BUSINESS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-int-orange/30">
              <div className="mb-4">
                <TrendingUp className="w-12 h-12 text-int-orange mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">SPENDING</h3>
              <div className="text-5xl font-bold text-int-orange mb-2">92%</div>
              <p className="text-sm text-signal-white/80">of companies plan to invest more in GenAI over the next 3 years.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-int-navy/30">
              <div className="mb-4">
                <Users className="w-12 h-12 text-int-navy mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">USAGE</h3>
              <div className="text-5xl font-bold text-int-navy mb-2">3x</div>
              <p className="text-sm text-signal-white/80">more employees are using GenAI than their leaders realize.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-int-teal/30">
              <div className="mb-4">
                <Award className="w-12 h-12 text-int-teal mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">ADOPTION</h3>
              <div className="text-5xl font-bold text-int-teal mb-2">48%</div>
              <p className="text-sm text-signal-white/80">of employees rank training as the most important factor for GenAI adoption.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-int-orange/30">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-int-orange mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">SPEED</h3>
              <div className="text-5xl font-bold text-int-orange mb-2">47%</div>
              <p className="text-sm text-signal-white/80">of the C-suite say their companies are developing GenAI tools too slowly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 px-6 bg-carbon-night overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            OUR PARTNERS
          </h2>
          <div className="relative">
            <div className="flex gap-8 animate-scroll">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-48 h-24 bg-void rounded-lg flex items-center justify-center border border-flash-purple/20"
                >
                  <span className="text-signal-white/40 text-sm font-medium">Partner Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart AI Recommendations */}
      <section className="py-16 px-6 bg-gradient-to-r from-int-navy/10 to-int-orange/10 border-y border-int-navy/30">
        <div className="max-w-5xl mx-auto">
          <SmartRecommendations limit={4} />
          
          <div className="mt-12">
            <PersonalizedSummary 
              content="INTinc.com helps enterprises implement AI solutions through a proven three-step methodology: Discover opportunities through assessments and workshops, Harden infrastructure with security-first architecture, and Ship production-ready AI systems with full training and support. Our services include AI strategy development, custom solution engineering, governance frameworks, and team enablement programs."
              segment="auto"
            />
          </div>
        </div>
      </section>

      {/* Proactive Content Suggestions Widget */}
      <ProactiveContentSuggestions />

      {/* Dynamic FAQ */}
      <DynamicFAQ />

      {/* Services Teaser */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            SERVICES FOR YOUR BUSINESS
          </h2>
          <p className="text-xl mb-8 text-signal-white/90">
            Enterprise AI implementation tailored to <strong>YOUR needs</strong>. We deliver proven solutions with flexible engagement models that fit your budget and timeline.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8 text-lg">
            <div className="text-int-orange font-semibold">YOUR GOALS</div>
            <div className="text-int-navy font-semibold">YOUR TIMELINE</div>
            <div className="text-int-teal font-semibold">YOUR SUCCESS</div>
          </div>
          <Link 
            to={createPageUrl('Services')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            EXPLORE SERVICES
          </Link>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            CLIENT FEEDBACK
          </h2>
          <p className="text-xl text-center mb-16 text-signal-white/90">
            Real feedback from real deployments
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "INTinc helped us cut through the noise, making AI approachable and impactful. Their workshops and expert support leveled up our AI capabilities, adding value for us and our clients.",
                author: "Sarah Johnson",
                title: "CTO, TechVentures Inc.",
                company: "TechVentures"
              },
              {
                quote: "Their engineering team developed AI tools that produced instant ROI and saved us hours. On top of that, they taught us how to maintain and build our own AI solutions.",
                author: "Michael Chen",
                title: "VP Operations, DataFlow Systems",
                company: "DataFlow"
              },
              {
                quote: "Within months of their AI enablement program, most of our team is using AI regularly and reporting an average time savings of 10 hours per week.",
                author: "Jennifer Martinez",
                title: "Director of Innovation, HealthTech Solutions",
                company: "HealthTech"
              }
            ].map((testimonial, i) => (
              <div 
                key={i}
                className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30 flex flex-col"
              >
                <div className="mb-6 flex-grow">
                  <div className="text-fusion-pink text-5xl mb-4 leading-none">"</div>
                  <p className="text-signal-white/90 italic">{testimonial.quote}</p>
                  <div className="text-fusion-pink text-5xl text-right leading-none">"</div>
                </div>
                <div className="border-t border-flash-purple/30 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center font-bold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-signal-white/60">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            CASE STUDIES
          </h2>
          <p className="text-xl text-center mb-16 text-signal-white/90">
            Real results from real deployments—see how we transform AI from concept to <strong>competitive advantage</strong>.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Knowledge at Your Fingertips', category: 'Product Enablement', saved: '80% faster access' },
              { title: 'Automated Prospecting', category: 'Business Development', saved: '$300K annually' },
              { title: 'Instant Marketing Intelligence', category: 'Performance Reporting', saved: '150 hours weekly' },
              { title: 'Voice-to-Documentation Pipeline', category: 'Operations', saved: '700 SOPs created' },
              { title: 'Smart AR Collections', category: 'Accounts Receivable', saved: '75% time reduction' },
              { title: 'Enterprise AI Training', category: 'Org-Wide Enablement', saved: '10 hours per person weekly' },
            ].map((study, i) => (
              <Link
                key={i}
                to={createPageUrl(`CaseStudy${i + 1}`)}
                className="p-6 bg-void rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 group cursor-pointer"
              >
                <div className="text-sm text-fusion-pink mb-2">{study.category}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-flash-purple transition-colors">
                  {study.title}
                </h3>
                <div className="text-sm text-signal-white/60 mb-4">{study.saved}</div>
                <div className="text-flash-purple font-semibold text-sm">LEARN MORE →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            OUR COMMITMENT TO YOUR BUSINESS
          </h2>
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-int-orange">OUR PURPOSE</h3>
              <p className="text-lg text-signal-white/90">
                Our purpose is <strong>YOUR business</strong>. We implement AI solutions that align with your goals, delivering measurable results that transform operations and drive growth.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-int-navy">OUR APPROACH</h3>
              <p className="text-lg text-signal-white/90">
                We focus on YOUR success. Every engagement is tailored to your specific needs, timeline, and budget—delivering practical solutions that work for YOUR business.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-int-teal">OUR PROMISE</h3>
              <p className="text-lg text-signal-white/90">
                We partner with you for the long term. Full training, ongoing support, and knowledge transfer ensure your team is empowered to maintain and grow your AI capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-carbon-night to-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform YOUR Business?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's implement AI solutions that deliver real results for YOUR operations.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-10 py-5 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            GET STARTED TODAY
          </Link>
        </div>
      </section>

      <style jsx>{`
        .hero-gradient {
          background: radial-gradient(circle at 30% 20%, rgba(30,58,95,0.35), transparent 60%),
                      radial-gradient(circle at 70% 80%, rgba(242,101,34,0.35), transparent 60%);
        }

        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6), 0 0 60px rgba(30,58,95,0.4);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll,
          .animate-pulse,
          .animate-bounce,
          .animate-gradient {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}