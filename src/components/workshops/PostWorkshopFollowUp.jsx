import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Book, TrendingUp, Users, Loader2 } from 'lucide-react';

/**
 * Post-Workshop AI-Powered Follow-Up System
 * Generates personalized next steps and resources after workshop completion
 */
export default function PostWorkshopFollowUp({ workshopData, attendeeData }) {
  const [followUp, setFollowUp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    generateFollowUp();
  }, []);

  const generateFollowUp = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a workshop follow-up specialist. Generate personalized post-workshop content and next steps.

Workshop: ${workshopData.title}
Attendees: ${attendeeData.count}
Roles: ${attendeeData.roles?.join(', ') || 'Various'}
Experience Level: ${attendeeData.aiExperience || 'Mixed'}

Generate comprehensive follow-up content:
1. Key Takeaways Summary (3-4 main points from workshop)
2. Quick Wins (2-3 actions they can take immediately)
3. 30-Day Implementation Plan (week-by-week breakdown)
4. Recommended Resources (specific to their needs)
5. Office Hours Schedule (when they can get help)
6. Success Metrics (how to measure impact)

Make it actionable and specific to their context.`,
        response_json_schema: {
          type: 'object',
          properties: {
            keyTakeaways: {
              type: 'array',
              items: { type: 'string' }
            },
            quickWins: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  action: { type: 'string' },
                  timeframe: { type: 'string' },
                  impact: { type: 'string' }
                }
              }
            },
            implementationPlan: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  week: { type: 'number' },
                  focus: { type: 'string' },
                  activities: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            },
            resources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  type: { type: 'string' },
                  description: { type: 'string' }
                }
              }
            },
            officeHours: { type: 'string' },
            successMetrics: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      });

      setFollowUp(result);

      // Send follow-up email
      await base44.integrations.Core.SendEmail({
        from_name: 'INTinc Workshops',
        to: attendeeData.email,
        subject: `Your ${workshopData.title} - Next Steps & Resources`,
        body: `Thank you for attending ${workshopData.title}!

KEY TAKEAWAYS:
${result.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

QUICK WINS (Start Today):
${result.quickWins.map(w => `• ${w.action} (${w.timeframe}) - ${w.impact}`).join('\n')}

RESOURCES:
${result.resources.map(r => `• ${r.title} (${r.type}): ${r.description}`).join('\n')}

${result.officeHours}

View your full implementation plan at: [dashboard link]

Best regards,
The INTinc Team`
      });

      base44.analytics.track({
        eventName: 'post_workshop_followup_generated',
        properties: { workshop: workshopData.title }
      });
    } catch (error) {
      console.error('Failed to generate follow-up:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    
    setSubmitted(true);
    base44.analytics.track({
      eventName: 'workshop_feedback_submitted',
      properties: {
        workshop: workshopData.title,
        hasContent: feedback.length > 0
      }
    });

    // Thank user
    setTimeout(() => {
      setFeedback('');
      setSubmitted(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-void text-signal-white py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-int-orange animate-spin mx-auto mb-4" />
          <p className="text-xl">Generating your personalized follow-up plan...</p>
        </div>
      </div>
    );
  }

  if (!followUp) return null;

  return (
    <div className="min-h-screen bg-void text-signal-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Workshop Complete!</h1>
          <p className="text-xl text-signal-white/80">
            Here's your personalized action plan for {workshopData.title}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="p-8 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-6 h-6 text-int-orange" />
            <h2 className="text-2xl font-bold">Key Takeaways</h2>
          </div>
          <ul className="space-y-3">
            {followUp.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex gap-3 text-signal-white/90">
                <span className="text-int-orange font-bold flex-shrink-0">{i + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Wins */}
        <div className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Quick Wins - Start Today</h2>
          </div>
          <div className="space-y-4">
            {followUp.quickWins.map((win, i) => (
              <div key={i} className="p-4 bg-void rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-lg">{win.action}</div>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-semibold text-green-400">
                    {win.timeframe}
                  </span>
                </div>
                <div className="text-sm text-signal-white/70">
                  <span className="text-green-400">Impact:</span> {win.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Plan */}
        <div className="p-8 bg-gradient-to-br from-int-navy/10 to-int-teal/10 border border-int-navy/30 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-int-navy" />
            <h2 className="text-2xl font-bold">30-Day Implementation Plan</h2>
          </div>
          <div className="space-y-6">
            {followUp.implementationPlan.map((week, i) => (
              <div key={i} className="border-l-4 border-int-orange pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-sm font-bold text-int-orange">
                    Week {week.week}
                  </span>
                  <h3 className="font-bold text-lg">{week.focus}</h3>
                </div>
                <ul className="space-y-2">
                  {week.activities.map((activity, j) => (
                    <li key={j} className="text-signal-white/80 flex gap-2">
                      <span className="text-int-teal flex-shrink-0">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="p-8 bg-carbon-night border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Recommended Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {followUp.resources.map((resource, i) => (
              <div key={i} className="p-4 bg-void rounded-lg border border-slate-700 hover:border-int-orange transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{resource.title}</div>
                  <span className="px-2 py-1 bg-int-orange/20 border border-int-orange/30 rounded text-xs font-semibold text-int-orange">
                    {resource.type}
                  </span>
                </div>
                <div className="text-sm text-signal-white/70">{resource.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl text-center">
          <h3 className="font-bold text-lg mb-2">Need Help?</h3>
          <p className="text-signal-white/80">{followUp.officeHours}</p>
        </div>

        {/* Success Metrics */}
        <div className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Measure Your Success</h2>
          <div className="space-y-3">
            {followUp.successMetrics.map((metric, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-void rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-signal-white/80">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="p-8 bg-carbon-night border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">How Was Your Experience?</h2>
          <p className="text-signal-white/70 mb-4">Your feedback helps us improve future workshops</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 bg-void border border-slate-700 rounded-lg text-signal-white resize-none focus:outline-none focus:border-int-orange mb-4"
            placeholder="Share your thoughts, suggestions, or questions..."
          />
          <button
            onClick={submitFeedback}
            disabled={submitted}
            className="w-full px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
          >
            {submitted ? 'Thank You! 🎉' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}