import React from 'react';
import { Search, Command, Menu } from 'lucide-react';

export default function Topbar({ onCommandPaletteOpen, onSidebarToggle }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto">
        <button
          onClick={onCommandPaletteOpen}
          className="w-full flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors group"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="flex-1 text-left text-sm text-slate-500">Search or jump to...</span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <kbd className="px-2 py-1 bg-white border border-slate-200 rounded shadow-sm">⌘</kbd>
            <kbd className="px-2 py-1 bg-white border border-slate-200 rounded shadow-sm">K</kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Help"
        >
          <span className="text-sm font-semibold text-slate-600">?</span>
        </button>
      </div>
    </header>
  );
}