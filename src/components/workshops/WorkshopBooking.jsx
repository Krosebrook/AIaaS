import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { OnboardingWorkflow } from '../onboarding/OnboardingWorkflow';
import { Calendar, Users, Clock, DollarSign, CheckCircle, Loader2 } from 'lucide-react';

export default function WorkshopBooking({ workshop, onClose }) {
  const [step, setStep] = useState('details'); // details, survey, confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    attendees: 1,
    selectedDates: [],
    specialRequirements: '',
    attendeeDetails: []
  });
  const [surveyData, setSurveyData] = useState({
    currentRole: '',
    aiExperience: '',
    learningGoals: [],
    specificChallenges: ''
  });
  const [processing, setProcessing] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState(null);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep('survey');
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Generate personalized workshop content
      const personalization = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a workshop content strategist. Based on attendee information, personalize the workshop experience.

Workshop: ${workshop.title}
Attendees: ${formData.attendees}

Attendee Survey Data:
- Roles: ${formData.attendeeDetails.map(a => a.role).join(', ')}
- AI Experience: ${surveyData.aiExperience}
- Learning Goals: ${surveyData.learningGoals.join(', ')}
- Challenges: ${surveyData.specificChallenges}

Generate:
1. Personalized pre-workshop materials (3-4 specific resources)
2. Custom workshop agenda adjustments (what to emphasize)
3. Post-workshop follow-up plan (specific next steps for this group)`,
        response_json_schema: {
          type: 'object',
          properties: {
            preMaterials: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  estimatedTime: { type: 'string' }
                }
              }
            },
            agendaAdjustments: { type: 'string' },
            followUpPlan: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      });

      setPersonalizedContent(personalization);

      // Track booking
      base44.analytics.track({
        eventName: 'workshop_booking_completed',
        properties: {
          workshop: workshop.title,
          attendees: formData.attendees,
          dates: formData.selectedDates.length
        }
      });

      // Trigger onboarding workflow
      await OnboardingWorkflow.triggerFromWorkshop({
        ...formData,
        preferredDate: formData.selectedDates[0],
        surveyData,
        personalization
      }, workshop);

      setStep('confirmation');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const addAttendee = () => {
    setFormData({
      ...formData,
      attendees: formData.attendees + 1,
      attendeeDetails: [...formData.attendeeDetails, { name: '', role: '', email: '' }]
    });
  };

  const updateAttendee = (index, field, value) => {
    const updated = [...formData.attendeeDetails];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, attendeeDetails: updated });
  };

  const toggleDate = (date) => {
    const dates = formData.selectedDates.includes(date)
      ? formData.selectedDates.filter(d => d !== date)
      : [...formData.selectedDates, date];
    setFormData({ ...formData, selectedDates: dates });
  };

  const totalPrice = workshop.price * formData.attendees;

  if (step === 'confirmation') {
    return (
      <div className="py-8 max-h-[80vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
          <p className="text-signal-white/80 mb-6">
            Your spot in <span className="font-semibold text-int-orange">{workshop.title}</span> has been reserved.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-carbon-night rounded-lg">
            <div className="text-sm text-signal-white/60 mb-2">Confirmation sent to:</div>
            <div className="font-semibold">{formData.email}</div>
            <div className="text-sm text-signal-white/60 mt-4 mb-2">Workshop Dates:</div>
            <div className="space-y-1">
              {formData.selectedDates.map((date, i) => (
                <div key={i} className="font-semibold">{date}</div>
              ))}
            </div>
          </div>

          {personalizedContent && (
            <>
              <div className="p-6 bg-gradient-to-br from-int-orange/10 to-int-navy/10 border border-int-orange/30 rounded-lg">
                <h4 className="font-bold text-lg mb-4 text-int-orange">Your Pre-Workshop Materials</h4>
                <div className="space-y-3">
                  {personalizedContent.preMaterials.map((material, i) => (
                    <div key={i} className="p-3 bg-carbon-night rounded-lg">
                      <div className="font-semibold mb-1">{material.title}</div>
                      <div className="text-sm text-signal-white/70 mb-2">{material.description}</div>
                      <div className="text-xs text-int-teal">⏱ {material.estimatedTime}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-int-navy/10 to-int-teal/10 border border-int-navy/30 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-int-navy">Personalized Workshop Focus</h4>
                <p className="text-signal-white/80">{personalizedContent.agendaAdjustments}</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-green-400">Your Post-Workshop Plan</h4>
                <ul className="space-y-2">
                  {personalizedContent.followUpPlan.map((step, i) => (
                    <li key={i} className="text-signal-white/80 flex gap-2">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 bg-int-orange hover:bg-int-orange/80 rounded-lg font-semibold transition-all"
        >
          Close
        </button>
      </div>
    );
  }

  if (step === 'survey') {
    return (
      <form onSubmit={handleSurveySubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Personalize Your Experience</h3>
          <p className="text-signal-white/70">Help us tailor the workshop to your team's needs</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Primary Learning Goals (select all that apply)</label>
          <div className="space-y-2">
            {['Understanding AI fundamentals', 'Identifying use cases', 'Implementation best practices', 'Security & compliance', 'Team enablement'].map(goal => (
              <label key={goal} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={surveyData.learningGoals.includes(goal)}
                  onChange={(e) => {
                    const goals = e.target.checked
                      ? [...surveyData.learningGoals, goal]
                      : surveyData.learningGoals.filter(g => g !== goal);
                    setSurveyData({ ...surveyData, learningGoals: goals });
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm text-signal-white/80">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team's AI Experience Level</label>
          <select
            required
            value={surveyData.aiExperience}
            onChange={(e) => setSurveyData({ ...surveyData, aiExperience: e.target.value })}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          >
            <option value="">Select level...</option>
            <option value="No experience">No experience - just exploring</option>
            <option value="Basic">Basic - using tools like ChatGPT</option>
            <option value="Intermediate">Intermediate - running pilots</option>
            <option value="Advanced">Advanced - production systems</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Specific Challenges or Questions</label>
          <textarea
            value={surveyData.specificChallenges}
            onChange={(e) => setSurveyData({ ...surveyData, specificChallenges: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange resize-none"
            placeholder="What specific challenges are you hoping to solve?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Attendee Details (helps us personalize content)</label>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {formData.attendeeDetails.map((attendee, i) => (
              <div key={i} className="p-3 bg-void border border-slate-700 rounded-lg">
                <div className="text-xs text-signal-white/60 mb-2">Attendee {i + 1}</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={attendee.name}
                    onChange={(e) => updateAttendee(i, 'name', e.target.value)}
                    className="px-3 py-2 bg-carbon-night border border-slate-700 rounded text-sm text-signal-white focus:outline-none focus:border-int-orange"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g., CTO, Engineer)"
                    value={attendee.role}
                    onChange={(e) => updateAttendee(i, 'role', e.target.value)}
                    className="px-3 py-2 bg-carbon-night border border-slate-700 rounded text-sm text-signal-white focus:outline-none focus:border-int-orange"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setStep('details')}
            className="flex-1 px-6 py-3 bg-void border-2 border-slate-700 hover:bg-slate-800 rounded-lg font-semibold transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={processing || !surveyData.aiExperience}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Personalizing...
              </>
            ) : (
              'Complete Booking'
            )}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleDetailsSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">{workshop.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-signal-white/80">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {workshop.duration}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            ${workshop.price.toLocaleString()} per person
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Attendees *</label>
        <div className="flex items-center gap-4">
          <select
            value={formData.attendees}
            onChange={(e) => {
              const count = parseInt(e.target.value);
              setFormData({
                ...formData,
                attendees: count,
                attendeeDetails: Array(count).fill(0).map((_, i) => formData.attendeeDetails[i] || { name: '', role: '', email: '' })
              });
            }}
            className="flex-1 px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
          <div className="text-sm text-signal-white/60">
            ${(workshop.price * formData.attendees).toLocaleString()} total
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Select Workshop Dates (choose 1-3)</label>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + 7 + (i * 7));
            const dateStr = date.toISOString().split('T')[0];
            const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const isSelected = formData.selectedDates.includes(dateStr);
            
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleDate(dateStr)}
                disabled={!isSelected && formData.selectedDates.length >= 3}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  isSelected
                    ? 'bg-int-orange/20 border-int-orange text-white'
                    : 'bg-void border-slate-700 text-signal-white/80 hover:border-int-orange/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {formatted}
              </button>
            );
          })}
        </div>
        {formData.selectedDates.length === 0 && (
          <div className="text-xs text-red-400 mt-2">Please select at least one date</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Special Requirements</label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
          rows="3"
          className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange resize-none"
          placeholder="Dietary restrictions, accessibility needs, etc."
        />
      </div>

      <div className="p-4 bg-int-orange/10 border border-int-orange/30 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-signal-white/80">Subtotal ({formData.attendees} attendees × {formData.selectedDates.length} {formData.selectedDates.length === 1 ? 'date' : 'dates'})</span>
          <span className="font-bold">${(totalPrice * formData.selectedDates.length).toLocaleString()}</span>
        </div>
        <div className="text-xs text-signal-white/60 mt-2">
          * Pre-workshop materials and calendar invites will be sent after booking
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 bg-void border-2 border-slate-700 hover:bg-slate-800 rounded-lg font-semibold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formData.selectedDates.length === 0}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          Continue to Survey →
        </button>
      </div>
    </form>
  );
}