import { base44 } from '@/api/base44Client';

/**
 * AI-Powered Client Onboarding Workflow Engine
 * Triggers personalized email sequences based on user interactions
 */

export const OnboardingWorkflow = {
  /**
   * Trigger onboarding after contact form submission
   */
  async triggerFromContact(formData, inquiryCategory) {
    try {
      // Generate personalized follow-up sequence
      const sequence = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI sales assistant for INTinc.com. A potential client just submitted a contact form.

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not provided'}
- Message: ${formData.message}
- Category: ${inquiryCategory?.category || 'General Inquiry'}

Generate a personalized onboarding email sequence (3 emails over 1 week):

Email 1 (Immediate): Welcome and acknowledgment
Email 2 (Day 3): Educational content relevant to their inquiry
Email 3 (Day 7): Call to action - schedule consultation

For each email, provide:
- Subject line
- Body (professional, helpful, not pushy)
- Call to action
- Resources to attach (case studies, whitepapers, etc.)

Return JSON format.`,
        response_json_schema: {
          type: 'object',
          properties: {
            email1: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email2: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email3: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            suggestedCallTime: { type: 'string' }
          }
        }
      });

      // Send immediate welcome email
      await base44.integrations.Core.SendEmail({
        from_name: 'INTinc Team',
        to: formData.email,
        subject: sequence.email1.subject,
        body: `Hi ${formData.name},

${sequence.email1.body}

${sequence.email1.cta}

---
${sequence.email1.resources.map(r => `• ${r}`).join('\n')}

Best regards,
The INTinc Team
https://intinc.com`
      });

      // Store onboarding state for follow-up emails
      localStorage.setItem(`onboarding_${formData.email}`, JSON.stringify({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        category: inquiryCategory?.category,
        sequence,
        startDate: new Date().toISOString(),
        status: 'active'
      }));

      // Track analytics
      base44.analytics.track({
        eventName: 'onboarding_workflow_started',
        properties: {
          source: 'contact_form',
          category: inquiryCategory?.category,
          email: formData.email
        }
      });

      return { success: true, sequence };
    } catch (error) {
      console.error('Onboarding workflow failed:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Trigger onboarding after workshop booking
   */
  async triggerFromWorkshop(bookingData, workshopDetails) {
    try {
      const sequence = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI sales assistant for INTinc.com. A client just booked a workshop.

Booking Details:
- Name: ${bookingData.name}
- Email: ${bookingData.email}
- Company: ${bookingData.company}
- Workshop: ${workshopDetails.title}
- Date: ${bookingData.preferredDate}
- Attendees: ${bookingData.attendees}

Generate a personalized onboarding email sequence:

Email 1 (Immediate): Booking confirmation + pre-workshop preparation
Email 2 (1 week before): Pre-work materials and expectations
Email 3 (1 day after workshop): Follow-up and next steps

Return JSON with subject, body, cta, resources for each email.`,
        response_json_schema: {
          type: 'object',
          properties: {
            email1: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email2: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email3: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        }
      });

      // Send immediate confirmation email
      await base44.integrations.Core.SendEmail({
        from_name: 'INTinc Workshops',
        to: bookingData.email,
        subject: sequence.email1.subject,
        body: `Hi ${bookingData.name},

${sequence.email1.body}

Workshop Details:
• Title: ${workshopDetails.title}
• Date: ${bookingData.preferredDate}
• Attendees: ${bookingData.attendees}
• Duration: ${workshopDetails.duration}

${sequence.email1.cta}

Pre-Workshop Resources:
${sequence.email1.resources.map(r => `• ${r}`).join('\n')}

Best regards,
The INTinc Team
https://intinc.com`
      });

      // Store onboarding state
      localStorage.setItem(`onboarding_workshop_${bookingData.email}`, JSON.stringify({
        email: bookingData.email,
        name: bookingData.name,
        workshop: workshopDetails.title,
        date: bookingData.preferredDate,
        sequence,
        startDate: new Date().toISOString(),
        status: 'active'
      }));

      base44.analytics.track({
        eventName: 'onboarding_workflow_started',
        properties: {
          source: 'workshop_booking',
          workshop: workshopDetails.title,
          email: bookingData.email
        }
      });

      return { success: true, sequence };
    } catch (error) {
      console.error('Workshop onboarding failed:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Trigger onboarding after AI assessment completion
   */
  async triggerFromAssessment(results, userEmail) {
    try {
      const sequence = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI sales assistant for INTinc.com. A prospect just completed an AI Readiness Assessment.

Assessment Results:
- Readiness Score: ${results.readinessScore}/100
- Level: ${results.readinessLevel}
- Recommended Services: ${results.recommendedServices?.join(', ')}
- Recommended Workshops: ${results.recommendedWorkshops?.map(w => w.name || w).join(', ')}
- Budget: ${results.estimatedInvestment}
- Timeline: ${results.suggestedTimeline}

Generate a personalized onboarding email sequence:

Email 1 (Immediate): Assessment results summary + next steps
Email 2 (Day 2): Deep dive into recommended services
Email 3 (Day 5): Schedule discovery call

Each email should reference their specific assessment results and be highly relevant.

Return JSON with subject, body, cta, resources for each email.`,
        response_json_schema: {
          type: 'object',
          properties: {
            email1: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email2: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            },
            email3: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
                cta: { type: 'string' },
                resources: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        }
      });

      // Send immediate assessment summary email
      await base44.integrations.Core.SendEmail({
        from_name: 'INTinc AI Solutions',
        to: userEmail,
        subject: sequence.email1.subject,
        body: `${sequence.email1.body}

Your Assessment Snapshot:
• Readiness Score: ${results.readinessScore}/100 (${results.readinessLevel})
• Recommended Services: ${results.recommendedServices?.slice(0, 2).join(', ')}
• Estimated Timeline: ${results.suggestedTimeline}
• Investment Range: ${results.estimatedInvestment}

${sequence.email1.cta}

Relevant Resources:
${sequence.email1.resources.map(r => `• ${r}`).join('\n')}

Best regards,
The INTinc Team
https://intinc.com/contact`
      });

      // Store onboarding state
      localStorage.setItem(`onboarding_assessment_${userEmail}`, JSON.stringify({
        email: userEmail,
        score: results.readinessScore,
        level: results.readinessLevel,
        services: results.recommendedServices,
        sequence,
        startDate: new Date().toISOString(),
        status: 'active'
      }));

      base44.analytics.track({
        eventName: 'onboarding_workflow_started',
        properties: {
          source: 'assessment',
          score: results.readinessScore,
          email: userEmail
        }
      });

      return { success: true, sequence };
    } catch (error) {
      console.error('Assessment onboarding failed:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get onboarding status for a user
   */
  getOnboardingStatus(email) {
    const keys = ['onboarding_', 'onboarding_workshop_', 'onboarding_assessment_'];
    for (const key of keys) {
      const data = localStorage.getItem(`${key}${email}`);
      if (data) {
        return JSON.parse(data);
      }
    }
    return null;
  },

  /**
   * Mark onboarding as complete
   */
  completeOnboarding(email) {
    const keys = ['onboarding_', 'onboarding_workshop_', 'onboarding_assessment_'];
    for (const key of keys) {
      const fullKey = `${key}${email}`;
      const data = localStorage.getItem(fullKey);
      if (data) {
        const parsed = JSON.parse(data);
        parsed.status = 'completed';
        parsed.completedDate = new Date().toISOString();
        localStorage.setItem(fullKey, JSON.stringify(parsed));
        
        base44.analytics.track({
          eventName: 'onboarding_workflow_completed',
          properties: { email }
        });
      }
    }
  }
};