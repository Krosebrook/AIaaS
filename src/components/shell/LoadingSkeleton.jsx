import React from 'react';

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg animate-pulse">
          <div className="w-10 h-10 bg-slate-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-6 bg-white border border-slate-200 rounded-lg animate-pulse">
          <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4"></div>
          <div className="h-5 bg-slate-200 rounded w-2/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3"></div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}