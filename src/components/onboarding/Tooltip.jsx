import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';

export default function Tooltip({ 
  children, 
  content, 
  position = 'top',
  persistent = false,
  id = null
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (id && persistent) {
      const dismissed = localStorage.getItem(`tooltip_dismissed_${id}`);
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
  }, [id, persistent]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (id) {
      localStorage.setItem(`tooltip_dismissed_${id}`, 'true');
    }
  };

  if (isDismissed && persistent) return children;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-slate-800'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => !persistent && setIsVisible(true)}
      onMouseLeave={() => !persistent && setIsVisible(false)}
      onFocus={() => !persistent && setIsVisible(true)}
      onBlur={() => !persistent && setIsVisible(false)}
    >
      {children}
      
      {(isVisible || persistent) && !isDismissed && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${positionClasses[position]}`}
          role="tooltip"
        >
          <div className="relative bg-slate-800 text-white text-sm rounded-lg shadow-xl p-3 max-w-xs">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
              <div className="flex-1">
                {content}
              </div>
              {persistent && (
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1 hover:bg-slate-700 rounded transition-colors"
                  aria-label="Dismiss tooltip"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
          </div>
        </div>
      )}
    </div>
  );
}