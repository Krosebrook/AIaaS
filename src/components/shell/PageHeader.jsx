import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs = [],
  actions = [],
  backTo = null 
}) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                {crumb.page ? (
                  <Link 
                    to={createPageUrl(crumb.page)}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Back Link */}
        {backTo && (
          <Link
            to={createPageUrl(backTo.page)}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {backTo.label}
          </Link>
        )}

        {/* Title & Actions */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            {description && (
              <p className="mt-2 text-slate-600">{description}</p>
            )}
          </div>

          {actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    action.primary
                      ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {action.icon && <action.icon className="w-4 h-4 inline-block mr-2" />}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}