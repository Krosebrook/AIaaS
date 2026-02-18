import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { OnboardingWorkflow } from '../onboarding/OnboardingWorkflow';
import { Calendar, Users, Clock, DollarSign, CheckCircle, Loader2 } from 'lucide-react';

export default function WorkshopBooking({ workshop, onClose }) {
  const [step, setStep] = useState('details'); // details, payment, confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    attendees: 1,
    selectedDate: '',
    specialRequirements: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Track booking initiation
      base44.analytics.track({
        eventName: 'workshop_booking_initiated',
        properties: {
          workshop: workshop.title,
          attendees: formData.attendees,
          selectedDate: formData.selectedDate
        }
      });

      // In production, this would integrate with Stripe/payment processor
      // For now, we'll simulate the booking
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStep('confirmation');
      
      base44.analytics.track({
        eventName: 'workshop_booking_completed',
        properties: {
          workshop: workshop.title,
          attendees: formData.attendees
        }
      });

      // Trigger onboarding workflow
      await OnboardingWorkflow.triggerFromWorkshop({
        ...formData,
        preferredDate: formData.selectedDate
      }, workshop);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const totalPrice = workshop.price * formData.attendees;

  if (step === 'confirmation') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
        <p className="text-signal-white/80 mb-6">
          Your spot in <span className="font-semibold text-int-orange">{workshop.title}</span> has been reserved.
        </p>
        <div className="p-4 bg-carbon-night rounded-lg mb-6 text-left">
          <div className="text-sm text-signal-white/60 mb-2">Confirmation sent to:</div>
          <div className="font-semibold">{formData.email}</div>
          <div className="text-sm text-signal-white/60 mt-4 mb-2">Workshop Date:</div>
          <div className="font-semibold">{formData.selectedDate}</div>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-int-orange hover:bg-int-orange/80 rounded-lg font-semibold transition-all"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Number of Attendees *</label>
          <select
            value={formData.attendees}
            onChange={(e) => setFormData({...formData, attendees: parseInt(e.target.value)})}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date *</label>
          <input
            type="date"
            required
            value={formData.selectedDate}
            onChange={(e) => setFormData({...formData, selectedDate: e.target.value})}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>
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
          <span className="text-signal-white/80">Subtotal ({formData.attendees} attendees)</span>
          <span className="font-bold">${totalPrice.toLocaleString()}</span>
        </div>
        <div className="text-xs text-signal-white/60 mt-2">
          * A calendar invite will be sent upon confirmation
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
          disabled={processing}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>Reserve Spot</>
          )}
        </button>
      </div>
    </form>
  );
}