import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Lightbulb, Target, Rocket } from 'lucide-react';

export default function Workshops() {
  const workshops = [
    {
      icon: Lightbulb,
      title: 'AI Discovery Workshop',
      subtitle: 'Fixed Pricing',
      duration: '4 hours',
      price: '$5,000',
      description: 'Lay the foundation for understanding AI technologies and their potential impact on your organization. Perfect for teams new to AI or looking to align on security-first adoption.',
      includes: [
        'AI fundamentals & technology landscape',
        'Security & compliance considerations',
        'Industry-specific use case examples',
        'Risk assessment framework',
        'Q&A with technical experts',
        'Written summary & recommendations'
      ],
      ideal: 'Leadership teams, IT departments, decision-makers exploring AI opportunities'
    },
    {
      icon: Target,
      title: 'Technical Bootcamp Series',
      subtitle: 'Fixed Pricing',
      duration: '3 days',
      price: '$15,000',
      description: 'Equip your team with hands-on technical skills and security best practices through our comprehensive bootcamp series, tailored to your organization\'s infrastructure and goals.',
      includes: [
        'Hands-on AI tool implementation',
        'Security configuration & hardening',
        'Data governance & access control',
        'Integration with existing systems',
        'Prompt engineering & optimization',
        '30 days post-training support'
      ],
      ideal: 'Technical teams, engineers, IT managers responsible for AI implementation'
    },
    {
      icon: Rocket,
      title: 'Use Case Ideation Workshop',
      subtitle: 'Fixed Pricing',
      duration: '6 hours',
      price: '$7,500',
      description: 'Identify and prioritize high-impact AI use cases specific to your business needs with our structured ideation workshop, setting the stage for practical application and measurable value.',
      includes: [
        'Facilitated brainstorming sessions',
        'Impact vs. effort matrix analysis',
        'Technical feasibility assessment',
        'ROI modeling for top use cases',
        'Implementation roadmap',
        'Security & compliance validation'
      ],
      ideal: 'Cross-functional teams ready to move from exploration to implementation'
    }
  ];

  return (
    <div className="min-h-screen bg-void text-signal-white">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            AI Workshops
          </h1>
          <p className="text-xl text-signal-white/90">
            Not sure where to start? Our workshops build technical literacy, identify opportunities, and establish security-first AI practices.
          </p>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {workshops.map((workshop, i) => {
              const Icon = workshop.icon;
              return (
                <div 
                  key={i}
                  className="p-8 md:p-12 bg-void rounded-2xl border border-flash-purple/30 hover:border-flash-purple transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center flex-shrink-0">
                          <Icon className="w-8 h-8 text-signal-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{workshop.title}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="px-3 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-flash-purple font-semibold">
                              {workshop.subtitle}
                            </span>
                            <span className="text-signal-white/60">{workshop.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-signal-white/90 mb-6">
                        {workshop.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-fusion-pink mb-3">What's Included:</h4>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {workshop.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-signal-white/80">
                              <span className="text-flash-purple mt-1">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-carbon-night rounded-lg border border-flash-purple/20">
                        <div className="text-sm text-signal-white/60 mb-1">Ideal For:</div>
                        <div className="text-signal-white/90">{workshop.ideal}</div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <div className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30 text-center">
                        <div className="text-sm text-signal-white/60 mb-2">Starting at</div>
                        <div className="text-4xl font-bold text-flash-purple mb-4">{workshop.price}</div>
                        <Link
                          to={createPageUrl('Contact')}
                          className="block px-6 py-3 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold hover:shadow-glow transition-all duration-300"
                        >
                          Book Workshop
                        </Link>
                      </div>

                      <div className="p-6 bg-carbon-night rounded-xl border border-flash-purple/30">
                        <h4 className="font-semibold mb-3 text-fusion-pink">Workshop Format</h4>
                        <ul className="space-y-2 text-sm text-signal-white/80">
                          <li>• On-site or remote delivery</li>
                          <li>• Interactive exercises</li>
                          <li>• Custom to your industry</li>
                          <li>• Materials included</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Workshop */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
            Need Something Custom?
          </h2>
          <p className="text-xl text-signal-white/90 mb-8">
            We can design a workshop tailored to your specific challenges, team size, and technical environment.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Discuss Custom Workshop
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