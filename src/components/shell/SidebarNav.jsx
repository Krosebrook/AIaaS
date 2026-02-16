import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { 
  Home, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Users, 
  Phone,
  Search,
  Settings,
  Activity,
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function SidebarNav({ isOpen, onToggle, currentPage }) {
  const navigation = [
    { name: 'Home', page: 'Home', icon: Home, section: 'main' },
    { name: 'Services', page: 'Services', icon: Briefcase, section: 'main' },
    { name: 'Case Studies', page: 'CaseStudies', icon: FileText, section: 'main' },
    { name: 'Workshops', page: 'Workshops', icon: BookOpen, section: 'main' },
    { name: 'About', page: 'About', icon: Users, section: 'main' },
    { name: 'Contact', page: 'Contact', icon: Phone, section: 'main' },
  ];

  const tools = [
    { name: 'Content Generator', page: 'ContentGenerator', icon: Sparkles, section: 'tools' },
    { name: 'SEO Dashboard', page: 'SEODashboard', icon: BarChart3, section: 'tools' },
    { name: 'Settings', page: 'UserSettings', icon: Settings, section: 'tools' },
  ];

  return (
    <>
      <div 
        className={`${
          isOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col border-r border-slate-700`}
      >
        {isOpen && (
          <>
            {/* Logo */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-orange-400">i</span>
                  <span className="text-2xl font-bold text-orange-400">N</span>
                  <span className="text-2xl font-bold text-orange-400">T</span>
                  <span className="text-xs font-light text-orange-400 align-top">™</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-1">Control Center</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Main
                </div>
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.page;
                    return (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Tools
                </div>
                <div className="space-y-1">
                  {tools.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.page;
                    return (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
              <div className="text-xs text-slate-500 text-center">
                © 2026 INTinc.com
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}