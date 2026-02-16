import React, { useState, useEffect } from 'react';
import { usePersonalization } from '../components/PersonalizationEngine';
import { TourRestartButton } from '../components/GuidedTour';
import { Save, User, Bell, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function UserSettings() {
  const { userProfile, updateUserPreferences, getUserPreferences } = usePersonalization();
  const [saved, setSaved] = useState(false);
  
  const [preferences, setPreferences] = useState({
    interests: [],
    contentTypes: [],
    communicationPreferences: {
      emailUpdates: true,
      personalization: true,
      outreachTriggers: true
    }
  });

  useEffect(() => {
    const loadedPrefs = getUserPreferences();
    if (loadedPrefs) {
      setPreferences(loadedPrefs);
    }
  }, []);

  const interestOptions = [
    { id: 'ai-security', label: 'AI Security & Compliance' },
    { id: 'custom-engineering', label: 'Custom AI Engineering' },
    { id: 'workshops', label: 'Training & Workshops' },
    { id: 'case-studies', label: 'Success Stories & Case Studies' },
    { id: 'prototyping', label: 'Rapid Prototyping' },
    { id: 'infrastructure', label: 'AI Infrastructure' },
    { id: 'consulting', label: 'Strategic Consulting' },
    { id: 'automation', label: 'Business Automation' }
  ];

  const contentTypeOptions = [
    { id: 'technical', label: 'Technical Deep Dives' },
    { id: 'business', label: 'Business Case Studies' },
    { id: 'educational', label: 'Educational Content' },
    { id: 'news', label: 'Industry News & Updates' },
    { id: 'guides', label: 'Implementation Guides' },
    { id: 'workshops', label: 'Workshop Information' }
  ];

  const toggleInterest = (interestId) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const toggleContentType = (typeId) => {
    setPreferences(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(typeId)
        ? prev.contentTypes.filter(t => t !== typeId)
        : [...prev.contentTypes, typeId]
    }));
  };

  const toggleCommPref = (prefKey) => {
    setPreferences(prev => ({
      ...prev,
      communicationPreferences: {
        ...prev.communicationPreferences,
        [prefKey]: !prev.communicationPreferences[prefKey]
      }
    }));
  };

  const handleSave = () => {
    updateUserPreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            Personalization Settings
          </h1>
          <p className="text-signal-white/70">
            Customize your experience by setting your interests and preferences
          </p>
        </div>

        {/* Interests Section */}
        <div className="mb-8 p-6 bg-carbon-night rounded-xl border border-int-navy/30">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-int-navy" />
            <h2 className="text-2xl font-bold">Your Interests</h2>
          </div>
          <p className="text-signal-white/60 mb-6 text-sm">
            Select topics you're interested in to receive personalized content and recommendations
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {interestOptions.map(option => (
              <div key={option.id} className="flex items-center gap-3 p-3 bg-void rounded-lg hover:bg-void/80 transition-colors">
                <Checkbox
                  id={option.id}
                  checked={preferences.interests.includes(option.id)}
                  onCheckedChange={() => toggleInterest(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Content Types Section */}
        <div className="mb-8 p-6 bg-carbon-night rounded-xl border border-int-teal/30">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-int-teal" />
            <h2 className="text-2xl font-bold">Preferred Content Types</h2>
          </div>
          <p className="text-signal-white/60 mb-6 text-sm">
            Choose the types of content you find most valuable
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {contentTypeOptions.map(option => (
              <div key={option.id} className="flex items-center gap-3 p-3 bg-void rounded-lg hover:bg-void/80 transition-colors">
                <Checkbox
                  id={`content-${option.id}`}
                  checked={preferences.contentTypes.includes(option.id)}
                  onCheckedChange={() => toggleContentType(option.id)}
                />
                <Label htmlFor={`content-${option.id}`} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Preferences Section */}
        <div className="mb-8 p-6 bg-carbon-night rounded-xl border border-int-orange/30">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-int-orange" />
            <h2 className="text-2xl font-bold">Communication Preferences</h2>
          </div>
          <p className="text-signal-white/60 mb-6 text-sm">
            Control how we personalize your experience and communicate with you
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-void rounded-lg">
              <Checkbox
                id="email-updates"
                checked={preferences.communicationPreferences.emailUpdates}
                onCheckedChange={() => toggleCommPref('emailUpdates')}
              />
              <div className="flex-1">
                <Label htmlFor="email-updates" className="cursor-pointer font-semibold block mb-1">
                  Email Updates
                </Label>
                <p className="text-sm text-signal-white/60">
                  Receive personalized content recommendations and updates
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-void rounded-lg">
              <Checkbox
                id="personalization"
                checked={preferences.communicationPreferences.personalization}
                onCheckedChange={() => toggleCommPref('personalization')}
              />
              <div className="flex-1">
                <Label htmlFor="personalization" className="cursor-pointer font-semibold block mb-1">
                  AI Personalization
                </Label>
                <p className="text-sm text-signal-white/60">
                  Use AI to personalize content, CTAs, and recommendations based on your behavior
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-void rounded-lg">
              <Checkbox
                id="outreach"
                checked={preferences.communicationPreferences.outreachTriggers}
                onCheckedChange={() => toggleCommPref('outreachTriggers')}
              />
              <div className="flex-1">
                <Label htmlFor="outreach" className="cursor-pointer font-semibold block mb-1">
                  Smart Outreach Triggers
                </Label>
                <p className="text-sm text-signal-white/60">
                  Receive timely suggestions and offers based on your engagement patterns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guided Tour Section */}
        <div className="mb-8 p-6 bg-carbon-night rounded-xl border border-int-orange/30">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-int-orange" />
            <h2 className="text-2xl font-bold">Help & Tutorials</h2>
          </div>
          <p className="text-signal-white/60 mb-4 text-sm">
            Need help getting started? Restart the guided tour to learn about key features and accelerate your understanding of the platform.
          </p>
          <TourRestartButton />
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleSave}
            className="px-8 py-6 bg-gradient-to-r from-int-orange to-int-navy text-lg font-semibold hover:shadow-glow transition-all"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Preferences
          </Button>
          
          {saved && (
            <div className="flex items-center gap-2 text-int-teal animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Settings saved!</span>
            </div>
          )}
        </div>

        {/* Current Profile Info */}
        <div className="mt-8 p-6 bg-carbon-night rounded-xl border border-int-navy/30">
          <h3 className="font-semibold mb-4 text-int-navy">Your Current Profile</h3>
          <div className="space-y-2 text-sm text-signal-white/70">
            <div>
              <span className="font-semibold">Pages visited:</span> {userProfile.visitedPages.length}
            </div>
            <div>
              <span className="font-semibold">Tracked interests:</span> {Array.from(userProfile.interests).join(', ') || 'None yet'}
            </div>
            <div>
              <span className="font-semibold">Explicit interests:</span> {preferences.interests.length} selected
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6), 0 0 60px rgba(30,58,95,0.4);
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}