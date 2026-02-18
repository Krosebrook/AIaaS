import React, { useState, useEffect } from 'react';
import { OnboardingWorkflow } from '../components/onboarding/OnboardingWorkflow';
import { Mail, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function OnboardingDashboard() {
  const [onboardings, setOnboardings] = useState([]);
  const [emailSearch, setEmailSearch] = useState('');

  useEffect(() => {
    loadOnboardings();
  }, []);

  const loadOnboardings = () => {
    const allOnboardings = [];
    
    // Scan localStorage for onboarding data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('onboarding_') || key.startsWith('onboarding_workshop_') || key.startsWith('onboarding_assessment_'))) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          allOnboardings.push({
            ...data,
            key
          });
        } catch (error) {
          console.error('Failed to parse onboarding data:', error);
        }
      }
    }

    setOnboardings(allOnboardings);
  };

  const completeOnboarding = (email) => {
    OnboardingWorkflow.completeOnboarding(email);
    loadOnboardings();
  };

  const filteredOnboardings = onboardings.filter(o => 
    !emailSearch || o.email.toLowerCase().includes(emailSearch.toLowerCase())
  );

  const getSource = (key) => {
    if (key.includes('workshop')) return 'Workshop';
    if (key.includes('assessment')) return 'Assessment';
    return 'Contact Form';
  };

  return (
    <div className="min-h-screen bg-void text-signal-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Client Onboarding Pipeline</h1>
          <p className="text-xl text-signal-white/80">
            Track and manage automated client onboarding workflows
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-gradient-to-br from-int-orange/20 to-int-navy/20 border border-int-orange/30 rounded-xl">
            <div className="text-3xl font-bold mb-2">{onboardings.length}</div>
            <div className="text-sm text-signal-white/80">Total Onboardings</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl">
            <div className="text-3xl font-bold mb-2">
              {onboardings.filter(o => o.status === 'active').length}
            </div>
            <div className="text-sm text-signal-white/80">Active</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-xl">
            <div className="text-3xl font-bold mb-2">
              {onboardings.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-sm text-signal-white/80">Completed</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl">
            <div className="text-3xl font-bold mb-2">
              {onboardings.filter(o => {
                const days = Math.floor((new Date() - new Date(o.startDate)) / (1000 * 60 * 60 * 24));
                return days < 7 && o.status === 'active';
              }).length}
            </div>
            <div className="text-sm text-signal-white/80">This Week</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by email..."
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className="w-full px-4 py-3 bg-carbon-night border border-slate-700 rounded-lg text-signal-white focus:outline-none focus:border-int-orange"
          />
        </div>

        {/* Onboarding List */}
        <div className="space-y-4">
          {filteredOnboardings.length === 0 ? (
            <div className="text-center py-12 text-signal-white/60">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No onboarding workflows found</p>
            </div>
          ) : (
            filteredOnboardings.map((onboarding, i) => {
              const daysSince = Math.floor((new Date() - new Date(onboarding.startDate)) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={i} className="p-6 bg-carbon-night border border-slate-700 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{onboarding.name || onboarding.email}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          onboarding.status === 'active' 
                            ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                            : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                        }`}>
                          {onboarding.status}
                        </span>
                        <span className="px-3 py-1 bg-int-orange/20 border border-int-orange/30 rounded-full text-xs font-semibold text-int-orange">
                          {getSource(onboarding.key)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-signal-white/60">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {onboarding.email}
                        </div>
                        {onboarding.company && (
                          <div>Company: {onboarding.company}</div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Started {daysSince} {daysSince === 1 ? 'day' : 'days'} ago
                        </div>
                      </div>
                    </div>
                    {onboarding.status === 'active' && (
                      <button
                        onClick={() => completeOnboarding(onboarding.email)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-sm transition-all"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>

                  {/* Email Sequence Progress */}
                  {onboarding.sequence && (
                    <div className="mt-4 p-4 bg-void/50 rounded-lg">
                      <div className="text-sm font-semibold mb-3 text-signal-white/80">Email Sequence:</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{onboarding.sequence.email1.subject}</div>
                            <div className="text-xs text-signal-white/60">Sent immediately</div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 ${daysSince >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                          {daysSince >= 3 ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{onboarding.sequence.email2.subject}</div>
                            <div className="text-xs text-signal-white/60">
                              {daysSince >= 3 ? 'Sent on day 3' : `Scheduled for day 3 (in ${3 - daysSince} days)`}
                            </div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 ${daysSince >= 7 ? 'opacity-100' : 'opacity-40'}`}>
                          {daysSince >= 7 ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{onboarding.sequence.email3.subject}</div>
                            <div className="text-xs text-signal-white/60">
                              {daysSince >= 7 ? 'Sent on day 7' : `Scheduled for day 7 (in ${7 - daysSince} days)`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  {onboarding.category && (
                    <div className="mt-4 text-sm text-signal-white/60">
                      Category: <span className="text-signal-white">{onboarding.category}</span>
                    </div>
                  )}
                  {onboarding.workshop && (
                    <div className="mt-2 text-sm text-signal-white/60">
                      Workshop: <span className="text-signal-white">{onboarding.workshop}</span>
                    </div>
                  )}
                  {onboarding.score !== undefined && (
                    <div className="mt-2 text-sm text-signal-white/60">
                      Assessment Score: <span className="text-signal-white">{onboarding.score}/100 ({onboarding.level})</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}