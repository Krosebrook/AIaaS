import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Calendar, Download, User, Share2, CheckCircle, Loader2 } from 'lucide-react';

export default function ResourceView() {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadResource();
  }, []);

  const loadResource = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const resources = await base44.entities.Resource.filter({ id, status: 'Published' });
      if (resources.length > 0) {
        const res = resources[0];
        setResource(res);
        
        // Show lead form for gated content
        if (res.isGated) {
          const hasAccess = localStorage.getItem(`resource_access_${id}`);
          if (!hasAccess) {
            setShowLeadForm(true);
          }
        }

        base44.analytics.track({
          eventName: 'resource_viewed',
          properties: {
            resource_id: id,
            title: res.title,
            category: res.category,
            is_gated: res.isGated
          }
        });
      }
    } catch (error) {
      console.error('Failed to load resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Track lead submission
      base44.analytics.track({
        eventName: 'lead_form_submitted',
        properties: {
          resource_id: resource.id,
          resource_title: resource.title,
          source: 'gated_content'
        }
      });

      // Store access locally
      localStorage.setItem(`resource_access_${resource.id}`, 'true');
      
      setFormSubmitted(true);
      setShowLeadForm(false);

      // Trigger download if available
      if (resource.downloadUrl) {
        window.open(resource.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-void text-signal-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-int-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-signal-white/60">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-void text-signal-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
          <Link
            to={createPageUrl('Resources')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-int-orange rounded-lg font-semibold hover:bg-int-orange/80 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-signal-white">
      {/* Lead Generation Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-carbon-night border border-int-orange/30 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-int-orange">Access Premium Content</h2>
            <p className="text-signal-white/80 mb-6">
              Enter your details to download <strong>{resource.title}</strong> and receive exclusive AI implementation insights.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange transition-colors"
                  placeholder="Your Company Inc."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Now
                  </>
                )}
              </button>
              <p className="text-xs text-signal-white/50 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="py-12 px-6 bg-carbon-night border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <Link
            to={createPageUrl('Resources')}
            className="inline-flex items-center gap-2 text-int-orange hover:text-int-orange/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          
          <div className="mb-6">
            <span className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-semibold text-int-orange">
              {resource.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{resource.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-signal-white/60">
            {resource.authorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <div>
                  <div className="text-signal-white font-semibold">{resource.authorName}</div>
                  {resource.authorRole && <div className="text-xs">{resource.authorRole}</div>}
                </div>
              </div>
            )}
            {resource.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(resource.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            )}
            {resource.readTimeMinutes && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {resource.readTimeMinutes} min read
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {resource.coverImageUrl && (
        <section className="py-8 px-6 bg-void">
          <div className="max-w-4xl mx-auto">
            <img 
              src={resource.coverImageUrl} 
              alt={resource.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{resource.content}</ReactMarkdown>
          </div>

          {/* Topics */}
          {resource.topics && resource.topics.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-700">
              <h3 className="text-sm font-semibold text-signal-white/60 mb-4">TOPICS</h3>
              <div className="flex flex-wrap gap-2">
                {resource.topics.map((topic, i) => (
                  <span key={i} className="px-4 py-2 bg-carbon-night border border-slate-700 rounded-lg text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Download CTA for Gated Content */}
          {resource.isGated && resource.downloadUrl && !showLeadForm && (
            <div className="mt-12 p-6 bg-gradient-to-r from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">Download Full Report</h3>
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Related CTA */}
      <section className="py-12 px-6 bg-carbon-night">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement AI in Your Business?</h2>
          <p className="text-signal-white/80 mb-6">
            Get personalized recommendations and a custom implementation roadmap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('AIReadinessAssessment')}
              className="px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all"
            >
              Take Free Assessment
            </Link>
            <Link
              to={createPageUrl('Contact')}
              className="px-6 py-3 bg-void border-2 border-int-navy hover:bg-int-navy/20 rounded-lg font-semibold transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6);
        }
        .prose h2 {
          color: var(--int-orange);
          margin-top: 2em;
          margin-bottom: 1em;
        }
        .prose h3 {
          color: var(--int-teal);
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        .prose a {
          color: var(--int-orange);
          text-decoration: underline;
        }
        .prose a:hover {
          color: var(--int-teal);
        }
        .prose code {
          background: var(--carbon-night);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}