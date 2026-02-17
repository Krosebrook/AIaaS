import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SEOMetadata from '../components/SEOMetadata';
import { Shield, Target, Users, Award, Lightbulb, Zap, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="About" 
        content="MSP discipline meets AI expertise. Security-first approach, measurable outcomes, knowledge transfer, production-ready solutions. Discover, harden, ship methodology."
      />
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/20 via-transparent to-int-orange/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-int-navy via-int-teal to-int-orange bg-clip-text text-transparent">
            About INTinc
          </h1>
          <p className="text-xl text-signal-white/90">
            Enterprise AI expertise meets MSP discipline. We build production systems that deliver measurable value.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-int-orange/20 rounded-full mb-6">
              <Lightbulb className="w-12 h-12 text-int-orange" />
            </div>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
              Our Mission
            </h2>
          </div>
          <div className="text-center space-y-6">
            <p className="text-2xl font-semibold text-signal-white/95">
              Our purpose is <span className="text-int-orange">YOUR business</span>.
            </p>
            <p className="text-xl text-signal-white/90 max-w-3xl mx-auto leading-relaxed">
              We exist to make enterprise-grade AI implementation accessible, secure, and measurable for organizations that demand results without the enterprise overhead. We transform AI from hype into <span className="text-int-teal font-semibold">competitive advantage</span>.
            </p>
          </div>
          
          {/* What Makes Us Different */}
          <div className="mt-16 p-8 bg-gradient-to-br from-int-navy/10 to-int-orange/10 border border-int-orange/30 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-int-orange">What Makes INTinc Different</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-int-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">MSP Discipline, Not Consulting Theater</h4>
                  <p className="text-signal-white/80 text-sm">We operate with infrastructure management rigor—SLAs, incident response, and operational excellence, not just strategic recommendations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-int-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Production Engineering, Not Proof-of-Concepts</h4>
                  <p className="text-signal-white/80 text-sm">We ship monitored, maintained systems with documentation and support—not demos that die on the vine.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-int-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Security-First Architecture, Not Bolt-On Compliance</h4>
                  <p className="text-signal-white/80 text-sm">Every solution is designed with encryption, access controls, and audit trails from day one—security is the foundation, not an afterthought.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-int-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Knowledge Transfer, Not Vendor Lock-In</h4>
                  <p className="text-signal-white/80 text-sm">Full documentation, training, and team enablement ensure you own the solution—we're partners, not dependencies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="prose prose-invert max-w-none space-y-6 text-lg text-signal-white/90">
            <p>
              INTinc Technology was founded on a simple observation: organizations need AI expertise, but traditional consulting models are broken. Expensive engagements, theoretical recommendations, and minimal knowledge transfer leave teams dependent on vendors.
            </p>
            <p>
              We took a different approach. By combining MSP discipline with AI engineering expertise, we deliver production-ready systems with enterprise-grade security—without enterprise overhead.
            </p>
            <p>
              Our team brings decades of experience in infrastructure management, security architecture, and software engineering. We understand compliance requirements, operational constraints, and the importance of measurable outcomes.
            </p>
            <p>
              Every engagement starts with security, ends with documentation, and prioritizes knowledge transfer. We don't just deliver projects—we build capability.
            </p>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            Our Principles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-void rounded-2xl border border-int-orange/30 hover:border-int-orange/50 transition-all">
              <div className="mb-6">
                <Shield className="w-12 h-12 text-int-orange mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-int-orange">Security First</h3>
              </div>
              <p className="text-signal-white/80">
                AI without security is liability. Every solution we design includes encryption, access controls, audit trails, and compliance documentation from day one. No shortcuts.
              </p>
            </div>

            <div className="p-8 bg-void rounded-2xl border border-int-navy/30 hover:border-int-navy/50 transition-all">
              <div className="mb-6">
                <Target className="w-12 h-12 text-int-navy mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-int-navy">Measurable Outcomes</h3>
              </div>
              <p className="text-signal-white/80">
                We commit to specific, measurable results. Time saved, costs reduced, accuracy improved—real metrics tracked and reported. If it can't be measured, we don't promise it.
              </p>
            </div>

            <div className="p-8 bg-void rounded-2xl border border-int-teal/30 hover:border-int-teal/50 transition-all">
              <div className="mb-6">
                <Users className="w-12 h-12 text-int-teal mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-int-teal">Knowledge Transfer</h3>
              </div>
              <p className="text-signal-white/80">
                Vendor lock-in is a business risk. We provide full documentation, training, and ongoing support to ensure your team owns and can maintain the solution independently.
              </p>
            </div>

            <div className="p-8 bg-void rounded-2xl border border-int-orange/30 hover:border-int-orange/50 transition-all">
              <div className="mb-6">
                <Award className="w-12 h-12 text-int-orange mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-int-orange">Production Ready</h3>
              </div>
              <p className="text-signal-white/80">
                We deploy systems designed for production—monitored, maintained, and backed by SLAs. Proof-of-concept is a starting point, not the destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            Our Team
          </h2>
          <p className="text-xl text-center text-signal-white/80 mb-16 max-w-3xl mx-auto">
            A multidisciplinary team combining infrastructure management, security architecture, AI engineering, and enterprise consulting expertise.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="p-6 bg-carbon-night rounded-2xl border border-int-orange/30 hover:border-int-orange transition-all">
              <div className="w-32 h-32 bg-gradient-to-br from-int-orange to-int-navy rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">John Doe</h3>
              <p className="text-sm text-int-orange text-center mb-4">Founder & Chief AI Architect</p>
              <p className="text-sm text-signal-white/80 text-center">
                15+ years in enterprise architecture, specializing in secure AI implementation and infrastructure automation. Former security architect at Fortune 500 technology companies.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="p-6 bg-carbon-night rounded-2xl border border-int-navy/30 hover:border-int-navy transition-all">
              <div className="w-32 h-32 bg-gradient-to-br from-int-navy to-int-teal rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold">SM</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Sarah Miller</h3>
              <p className="text-sm text-int-navy text-center mb-4">VP of Engineering</p>
              <p className="text-sm text-signal-white/80 text-center">
                ML engineering leader with expertise in production AI systems. Led AI implementation programs for healthcare, financial services, and manufacturing sectors.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="p-6 bg-carbon-night rounded-2xl border border-int-teal/30 hover:border-int-teal transition-all">
              <div className="w-32 h-32 bg-gradient-to-br from-int-teal to-int-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold">RK</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Robert Kumar</h3>
              <p className="text-sm text-int-teal text-center mb-4">Director of Security & Compliance</p>
              <p className="text-sm text-signal-white/80 text-center">
                Cybersecurity veteran specializing in AI governance, compliance frameworks, and risk management. CISSP, CISM certified with deep expertise in regulatory environments.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/20 rounded-xl text-center">
            <p className="text-lg text-signal-white/90">
              <strong className="text-int-orange">Join our team.</strong> We're always looking for talented engineers, architects, and consultants who share our commitment to excellence. <Link to={createPageUrl('Contact')} className="text-int-teal hover:text-int-orange transition-colors underline">Get in touch</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            Our Approach
          </h2>
          
          <div className="space-y-12">
            <div className="p-6 bg-void rounded-xl border border-int-orange/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-int-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-int-orange">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-int-orange">Discover</h3>
                  <p className="text-lg text-signal-white/90">
                    We start with a security-first assessment of your environment, identifying AI opportunities that align with your compliance requirements and operational constraints. No theoretical recommendations—just practical opportunities mapped to measurable outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-void rounded-xl border border-int-navy/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-int-navy/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-int-navy">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-int-navy">Harden</h3>
                  <p className="text-lg text-signal-white/90">
                    Before full deployment, we validate concepts with rapid prototyping and establish governance frameworks. Security architecture, access controls, and compliance documentation are built in parallel—not bolted on afterward.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-void rounded-xl border border-int-teal/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-int-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-int-teal">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-int-teal">Ship</h3>
                  <p className="text-lg text-signal-white/90">
                    We deploy production-ready systems with monitoring, documentation, and knowledge transfer. Your team receives full training and support to operate, maintain, and extend the solution independently. We're available for ongoing support, but you're never locked in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-int-navy/20 to-int-orange/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform YOUR Business with AI?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90 max-w-3xl mx-auto">
            Let's discuss how we can help you implement AI with security, discipline, and measurable results. Our purpose is YOUR success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={createPageUrl('Contact')}
              className="inline-block px-10 py-5 bg-gradient-to-r from-int-orange to-int-navy rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link 
              to={createPageUrl('Services')}
              className="inline-block px-10 py-5 bg-void border-2 border-int-navy hover:bg-int-navy/20 rounded-full font-semibold text-xl transition-all duration-300"
            >
              Explore Our Services
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-signal-white/70">
            <Link to={createPageUrl('AIReadinessAssessment')} className="hover:text-int-orange transition-colors">
              → Take Free AI Readiness Assessment
            </Link>
            <Link to={createPageUrl('CaseStudies')} className="hover:text-int-teal transition-colors">
              → View Success Stories
            </Link>
            <Link to={createPageUrl('Workshops')} className="hover:text-int-navy transition-colors">
              → Browse Workshops
            </Link>
          </div>
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