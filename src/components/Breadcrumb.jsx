import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link 
            to={createPageUrl('Home')} 
            className="flex items-center gap-1 text-signal-white/60 hover:text-int-orange transition-colors focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-void rounded px-1"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-signal-white/30" aria-hidden="true" />
            {item.href ? (
              <Link
                to={item.href}
                className="text-signal-white/60 hover:text-int-orange transition-colors focus:outline-none focus:ring-2 focus:ring-int-orange focus:ring-offset-2 focus:ring-offset-void rounded px-1"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-signal-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}