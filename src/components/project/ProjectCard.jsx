import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Calendar, Users, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export default function ProjectCard({ project, onDelete }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'planning': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on-hold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const isOverdue = new Date(project.dueDate) < new Date() && project.status !== 'completed';

  return (
    <Link to={createPageUrl('Projects')} state={{ selectedProjectId: project.id }}>
      <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-int-orange transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-white flex-1 line-clamp-2">{project.name}</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(project.id);
            }}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{project.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
            <span className={`text-xs font-semibold ${getPriorityColor(project.priority)}`}>
              {project.priority.toUpperCase()}
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-int-orange to-int-navy h-full rounded-full transition-all"
              style={{ width: `${project.progress || 0}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">{project.progress || 0}% Complete</div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
            {isOverdue && <AlertCircle className="w-3 h-3 text-red-400 ml-1" />}
          </div>

          {project.collaborators && project.collaborators.length > 0 && (
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="w-4 h-4" />
              <span>{project.collaborators.length} collaborators</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}