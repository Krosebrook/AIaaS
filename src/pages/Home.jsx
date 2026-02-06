import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { usePersonalization } from '../components/PersonalizationEngine';
import DynamicFAQ from '../components/DynamicFAQ';
import { 
  ChevronDown, 
  Sparkles, 
  Shield, 
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Award
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userProfile, trackPageVisit, trackInterest, getRecommendations } = usePersonalization();
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    trackPageVisit('Home');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-flash-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fusion-pink/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent animate-gradient">
            HELLO, AI.
          </h1>
          <p className="text-2xl md:text-4xl mb-12 text-signal-white/90">
            Yep, we <span className="text-fusion-pink font-semibold">get it</span>.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            GET IN TOUCH
          </Link>
        </div>

        <button 
          onClick={() => scrollToSection('process')}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Scroll down to process section"
        >
          <ChevronDown className="w-8 h-8 text-flash-purple" aria-hidden="true" />
        </button>
      </section>

      {/* Process Overview */}
      <section id="process" className="py-24 px-6 bg-carbon-night" aria-labelledby="process-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="process-heading" className="sr-only">Our Three-Step Process</h2>
          <div className="flex justify-center items-center gap-8 mb-16 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-flash-purple/20 border-2 border-flash-purple flex items-center justify-center" aria-hidden="true">
                <span className="text-2xl font-bold text-flash-purple">1</span>
              </div>
              <span className="text-xl font-semibold">Discover.</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-flash-purple/20 border-2 border-flash-purple flex items-center justify-center">
                <span className="text-2xl font-bold text-flash-purple">2</span>
              </div>
              <span className="text-xl font-semibold">Harden.</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-flash-purple/20 border-2 border-flash-purple flex items-center justify-center">
                <span className="text-2xl font-bold text-flash-purple">3</span>
              </div>
              <span className="text-xl font-semibold">Ship.</span>
            </div>
          </div>
          
          <p className="text-xl mb-4">
            <em className="text-fusion-pink">AI is complex.</em> At <strong>INTinc Technology</strong>, we make it simple.
          </p>
          <p className="text-lg text-signal-white/80 max-w-4xl mx-auto">
            We deliver practical AI solutions with enterprise-grade security and measurable outcomes. Whether you're exploring AI's potential or scaling deployment, we bring technical expertise and operational discipline to transform vision into production-ready systems.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            WHO WE ARE
          </h2>
          <p className="text-xl text-center mb-16 max-w-4xl mx-auto text-signal-white/90">
            Your MSP partner for secure, measurable AI implementation—empowering you to <strong>discover</strong> opportunities, <strong>harden</strong> your infrastructure, and <strong>ship</strong> production solutions.
          </p>

          {/* Three Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Discover */}
            <div className="relative group">
              <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-flash-purple/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-flash-purple">1</span>
                  </div>
                  <Sparkles className="w-8 h-8 text-flash-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Discover.</h3>
                <p className="text-signal-white/80 mb-6">
                  We assess your environment and identify AI opportunities. Through structured workshops and risk assessments, your team gains clarity on where AI delivers measurable value without compromising security.
                </p>
                <button 
                  onClick={() => toggleSection('discover')}
                  className="text-flash-purple hover:text-fusion-pink transition-colors font-semibold flex items-center gap-2"
                >
                  LEARN MORE <ChevronDown className={`w-4 h-4 transition-transform ${activeSection === 'discover' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSection === 'discover' && (
                  <div className="mt-6 pt-6 border-t border-flash-purple/30">
                    <h4 className="font-semibold mb-3 text-fusion-pink">DISCOVER Details</h4>
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
              <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-flash-purple/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-flash-purple">2</span>
                  </div>
                  <Shield className="w-8 h-8 text-flash-purple" />
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
              <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-flash-purple/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-flash-purple">3</span>
                  </div>
                  <Rocket className="w-8 h-8 text-flash-purple" />
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

      {/* Reality Check */}
      <section className="py-24 px-6 bg-gradient-to-br from-carbon-night to-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            REALITY CHECK
          </h2>
          <p className="text-xl mb-8 text-signal-white/90">
            The competitive advantages in AI belong to those who act with <span className="text-fusion-pink font-semibold">discipline</span>. Are you <span className="text-flash-purple font-semibold">building capability</span>, or will you be <span className="text-signal-white/50">left behind</span>?
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            START TODAY
          </Link>
        </div>
      </section>

      {/* Key Trends */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            KEY TRENDS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-4">
                <TrendingUp className="w-12 h-12 text-flash-purple mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">SPENDING</h3>
              <div className="text-5xl font-bold text-fusion-pink mb-2">92%</div>
              <p className="text-sm text-signal-white/80">of companies plan to invest more in GenAI over the next 3 years.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-4">
                <Users className="w-12 h-12 text-flash-purple mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">USAGE</h3>
              <div className="text-5xl font-bold text-fusion-pink mb-2">3x</div>
              <p className="text-sm text-signal-white/80">more employees are using GenAI than their leaders realize.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-4">
                <Award className="w-12 h-12 text-flash-purple mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">ADOPTION</h3>
              <div className="text-5xl font-bold text-fusion-pink mb-2">48%</div>
              <p className="text-sm text-signal-white/80">of employees rank training as the most important factor for GenAI adoption.</p>
            </div>

            <div className="text-center p-6 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-flash-purple mx-auto" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-signal-white/60 mb-2">SPEED</h3>
              <div className="text-5xl font-bold text-fusion-pink mb-2">47%</div>
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

      {/* Personalized Recommendations */}
      {recommendations && (
        <section className="py-16 px-6 bg-gradient-to-r from-flash-purple/10 to-fusion-pink/10 border-y border-flash-purple/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-sm font-semibold text-flash-purple mb-4">
              Recommended for You
            </div>
            <h2 className="text-3xl font-bold mb-4">{recommendations.headline}</h2>
            <p className="text-lg text-signal-white/80 mb-6">
              Based on your interests in <strong className="text-fusion-pink">{recommendations.contentEmphasis}</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to={createPageUrl(`CaseStudy${recommendations.recommendedCaseStudy}`)}
                className="px-6 py-3 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold hover:shadow-glow transition-all"
              >
                View Relevant Case Study
              </Link>
              <Link
                to={createPageUrl('Services')}
                onClick={() => trackInterest(recommendations.servicesFocus)}
                className="px-6 py-3 bg-void border-2 border-flash-purple rounded-full font-semibold hover:bg-flash-purple/10 transition-all"
              >
                Explore {recommendations.servicesFocus}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic FAQ */}
      <DynamicFAQ />

      {/* Services Teaser */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            OUR SERVICES
          </h2>
          <p className="text-xl mb-8 text-signal-white/90">
            Experience <strong>enterprise-grade</strong> AI implementation without enterprise overhead—our flexible engagement model and lean teams deliver Fortune 500 expertise at MSP efficiency.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8 text-lg">
            <div className="text-fusion-pink font-semibold">TIRED OF VENDORS?</div>
            <div className="text-fusion-pink font-semibold">READY FOR RESULTS?</div>
            <div className="text-fusion-pink font-semibold">NEED SECURITY?</div>
          </div>
          <Link 
            to={createPageUrl('Services')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            SEE SERVICES
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
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            OUR BELIEFS
          </h2>
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">OUR PURPOSE</h3>
              <p className="text-lg text-signal-white/90">
                To be your leading AI implementation partner—helping organizations <strong>discover</strong> opportunities, <strong>harden</strong> infrastructure, and <strong>ship</strong> production systems with confidence.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">OUR APPROACH</h3>
              <p className="text-lg text-signal-white/90">
                We combine MSP discipline with AI expertise. Every engagement starts with security, compliance, and measurable outcomes—no hype, just engineered solutions.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">OUR COMMITMENT</h3>
              <p className="text-lg text-signal-white/90">
                We don't just deliver projects—we build capability. Full documentation, knowledge transfer, and ongoing support ensure your team owns the solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-carbon-night to-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Ship AI?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's build production systems that deliver measurable value.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            GET STARTED
          </Link>
        </div>
      </section>

      <style jsx>{`
        .hero-gradient {
          background: radial-gradient(circle at 30% 20%, rgba(168,85,247,0.35), transparent 60%),
                      radial-gradient(circle at 70% 80%, rgba(244,114,182,0.35), transparent 60%);
        }
        
        .shadow-glow {
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(244,114,182,0.4);
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