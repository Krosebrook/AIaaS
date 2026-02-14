import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { 
  Home, Briefcase, FileText, BookOpen, Users, Phone,
  Search, Sparkles, BarChart3, X
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const commands = [
    { id: 'home', name: 'Go to Home', page: 'Home', icon: Home, keywords: ['dashboard', 'main'] },
    { id: 'services', name: 'Go to Services', page: 'Services', icon: Briefcase, keywords: ['offerings', 'products'] },
    { id: 'cases', name: 'Go to Case Studies', page: 'CaseStudies', icon: FileText, keywords: ['portfolio', 'work'] },
    { id: 'workshops', name: 'Go to Workshops', page: 'Workshops', icon: BookOpen, keywords: ['training', 'learning'] },
    { id: 'about', name: 'Go to About', page: 'About', icon: Users, keywords: ['team', 'company'] },
    { id: 'contact', name: 'Go to Contact', page: 'Contact', icon: Phone, keywords: ['reach', 'email'] },
    { id: 'content', name: 'Content Generator', page: 'ContentGenerator', icon: Sparkles, keywords: ['ai', 'blog', 'marketing'] },
    { id: 'seo', name: 'SEO Dashboard', page: 'SEODashboard', icon: BarChart3, keywords: ['analytics', 'audit'] },
  ];

  const filteredCommands = query
    ? commands.filter(cmd => 
        cmd.name.toLowerCase().includes(query.toLowerCase()) ||
        cmd.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  const handleSelect = (page) => {
    navigate(createPageUrl(page));
    onClose();
    setQuery('');
  };

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, commands, and actions..."
            className="flex-1 outline-none text-slate-900 placeholder-slate-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="py-2">
              {filteredCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.page)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">{cmd.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-slate-500">
              No results found
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>Navigate with ↑↓ • Select with ↵</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}