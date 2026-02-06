import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import SEOMetadata from '../components/SEOMetadata';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const workshop = urlParams.get('workshop');
    const price = urlParams.get('price');
    
    if (workshop) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the ${workshop} workshop (${price || 'pricing inquiry'}). Please provide more information about availability and next steps.`
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      // AI categorizes the inquiry
      const categorization = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this contact form inquiry and categorize it. Also generate a personalized auto-response.

Message: "${formData.message}"
Name: ${formData.name}

Categorize as ONE of:
- "Workshop Interest" (wants training/workshops)
- "General Inquiry" (questions, information requests)
- "Partnership" (business collaboration, partnerships)
- "Technical Consultation" (needs AI implementation help)
- "Case Study Request" (wants to learn about specific projects)

Also provide a brief, friendly auto-response message acknowledging their specific inquiry type.`,
        response_json_schema: {
          type: "object",
          properties: {
            category: { type: "string" },
            response: { type: "string" }
          }
        }
      });

      setInquiryCategory(categorization);
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
        setSubmitted(false);
        setInquiryCategory(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error categorizing inquiry:', error);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-void text-signal-white">
      <SEOMetadata 
        pageName="Contact" 
        content="Get in touch with INTinc Technology for AI implementation, workshops, consulting. Free security assessment. Quick response within 24 hours."
      />
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flash-purple/20 via-transparent to-fusion-pink/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-flash-purple via-fusion-pink to-flash-purple bg-clip-text text-transparent">
            Let's Talk AI
          </h1>
          <p className="text-xl text-signal-white/90">
            Ready to build production AI systems? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-flash-purple">Get in Touch</h2>
              <p className="text-signal-white/80 mb-8">
                Whether you're exploring AI opportunities or ready to deploy, we're here to guide you through the process with security and expertise.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-flash-purple/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-flash-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-signal-white/60 text-sm">info@intinc.tech</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-flash-purple/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-flash-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quick Response</h3>
                    <p className="text-signal-white/60 text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-void rounded-xl border border-flash-purple/30">
                <h3 className="font-semibold mb-3 text-fusion-pink">What to Expect</h3>
                <ul className="space-y-2 text-sm text-signal-white/70">
                  <li>• Initial consultation call within 48 hours</li>
                  <li>• Free security & readiness assessment</li>
                  <li>• Custom proposal with clear pricing</li>
                  <li>• No long-term commitments required</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address <span aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white"
                    placeholder="john@company.com"
                    aria-describedby="email-hint"
                  />
                  <span id="email-hint" className="sr-only">Enter a valid email address</span>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white resize-none"
                    placeholder="Tell us about your AI challenges and goals..."
                    aria-describedby="message-hint"
                  ></textarea>
                  <span id="message-hint" className="sr-only">Describe your inquiry in detail</span>
                </div>

                {submitted && inquiryCategory && (
                  <div 
                    className="p-4 bg-neon-mint/10 border border-neon-mint/30 rounded-lg mb-4" 
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-neon-mint text-lg" aria-hidden="true">✓</div>
                      <div>
                        <div className="font-semibold text-neon-mint mb-1">
                          {inquiryCategory.category}
                        </div>
                        <div className="text-sm text-signal-white/80">
                          {inquiryCategory.response}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitted || isAnalyzing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-lg font-semibold hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={isAnalyzing ? 'Analyzing your message' : submitted ? 'Message sent successfully' : 'Send your message'}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Analyzing...
                    </>
                  ) : submitted ? (
                    'Message Sent!'
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
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