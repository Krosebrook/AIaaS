import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Shield, Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-void text-signal-white">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            About INTinc
          </h1>
          <p className="text-xl text-signal-white/90">
            Enterprise AI expertise meets MSP discipline. We build production systems that deliver measurable value.
          </p>
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

      {/* Our Beliefs */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            Our Beliefs
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-6">
                <Shield className="w-12 h-12 text-flash-purple mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-fusion-pink">Security First</h3>
              </div>
              <p className="text-signal-white/80">
                AI without security is liability. Every solution we design includes encryption, access controls, audit trails, and compliance documentation from day one. No shortcuts.
              </p>
            </div>

            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-6">
                <Target className="w-12 h-12 text-flash-purple mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-fusion-pink">Measurable Outcomes</h3>
              </div>
              <p className="text-signal-white/80">
                We commit to specific, measurable results. Time saved, costs reduced, accuracy improved—real metrics tracked and reported. If it can't be measured, we don't promise it.
              </p>
            </div>

            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-6">
                <Users className="w-12 h-12 text-flash-purple mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-fusion-pink">Knowledge Transfer</h3>
              </div>
              <p className="text-signal-white/80">
                Vendor lock-in is a business risk. We provide full documentation, training, and ongoing support to ensure your team owns and can maintain the solution independently.
              </p>
            </div>

            <div className="p-8 bg-carbon-night rounded-2xl border border-flash-purple/30">
              <div className="mb-6">
                <Award className="w-12 h-12 text-flash-purple mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-fusion-pink">Production Ready</h3>
              </div>
              <p className="text-signal-white/80">
                We deploy systems designed for production—monitored, maintained, and backed by SLAs. Proof-of-concept is a starting point, not the destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            Our Approach
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">1. Discover</h3>
              <p className="text-lg text-signal-white/90">
                We start with a security-first assessment of your environment, identifying AI opportunities that align with your compliance requirements and operational constraints. No theoretical recommendations—just practical opportunities mapped to measurable outcomes.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">2. Harden</h3>
              <p className="text-lg text-signal-white/90">
                Before full deployment, we validate concepts with rapid prototyping and establish governance frameworks. Security architecture, access controls, and compliance documentation are built in parallel—not bolted on afterward.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-fusion-pink">3. Ship</h3>
              <p className="text-lg text-signal-white/90">
                We deploy production-ready systems with monitoring, documentation, and knowledge transfer. Your team receives full training and support to operate, maintain, and extend the solution independently. We're available for ongoing support, but you're never locked in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-12 text-signal-white/90">
            Let's discuss how we can help you implement AI with security, discipline, and measurable results.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-10 py-5 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
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