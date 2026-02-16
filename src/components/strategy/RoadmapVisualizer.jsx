import React from 'react';
import { Calendar, Target, CheckCircle } from 'lucide-react';

export default function RoadmapVisualizer({ roadmap }) {
  const getPhaseIcon = (index) => {
    if (index === 0) return <Target className="w-6 h-6" />;
    if (index === roadmap.length - 1) return <CheckCircle className="w-6 h-6" />;
    return <Calendar className="w-6 h-6" />;
  };

  const getPhaseColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600'
    ];
    return colors[index % colors.length];
  };

  const estimateTotalDays = () => {
    return roadmap.reduce((sum, phase) => {
      const match = phase.duration.match(/(\d+)/);
      const months = match ? parseInt(match[0]) : 0;
      return sum + (months * 30);
    }, 0);
  };

  const startDate = new Date();
  let currentDate = new Date(startDate);

  return (
    <div className="space-y-6">
      {/* Timeline Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-sm text-slate-400 mb-1">Total Duration</div>
          <div className="text-2xl font-bold text-int-orange">
            {roadmap.reduce((sum, p) => {
              const match = p.duration.match(/(\d+)/);
              return sum + (match ? parseInt(match[0]) : 0);
            }, 0)} months
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-sm text-slate-400 mb-1">Number of Phases</div>
          <div className="text-2xl font-bold text-int-navy">{roadmap.length}</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-sm text-slate-400 mb-1">Est. Completion</div>
          <div className="text-lg font-bold text-white">
            {new Date(currentDate.getTime() + estimateTotalDays() * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="relative">
        <div className="space-y-8">
          {roadmap.map((phase, index) => {
            const phaseStartDate = new Date(currentDate);
            const match = phase.duration.match(/(\d+)/);
            const months = match ? parseInt(match[0]) : 0;
            currentDate = new Date(currentDate.getTime() + months * 30 * 24 * 60 * 60 * 1000);
            const phaseEndDate = new Date(currentDate);

            return (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < roadmap.length - 1 && (
                  <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-int-orange via-int-orange to-transparent opacity-30"></div>
                )}

                {/* Phase Node */}
                <div className="flex gap-6">
                  <div className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${getPhaseColor(index)} flex items-center justify-center text-white shadow-lg`}>
                    {getPhaseIcon(index)}
                  </div>

                  {/* Phase Content */}
                  <div className="flex-1 pt-2 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{phase.phase}</h3>
                        <div className="text-sm text-slate-400 mt-1">
                          {phaseStartDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          {' → '}
                          {phaseEndDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold text-slate-300">
                        {phase.duration}
                      </span>
                    </div>

                    {/* Deliverables */}
                    <div className="mt-3 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                      <div className="text-sm font-semibold text-slate-300 mb-2">Deliverables</div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, i) => (
                          <li key={i} className="text-sm text-slate-400 flex gap-2">
                            <span className="text-int-orange flex-shrink-0">✓</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress bar */}
                    {index === 0 && (
                      <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-gradient-to-r from-int-orange to-int-navy"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-4 bg-int-navy/20 border border-int-navy/30 rounded-lg">
        <div className="text-sm font-semibold text-slate-300 mb-3">Timeline Breakdown</div>
        <div className="grid md:grid-cols-2 gap-3">
          {roadmap.map((phase, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{phase.phase}</span>
              <span className="font-semibold text-white">{phase.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}