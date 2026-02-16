import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Calendar, AlertCircle, Clock, Tag, Trash2, ChevronDown } from 'lucide-react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✓';
      case 'in-progress': return '→';
      case 'blocked': return '!';
      case 'review': return '◉';
      default: return '○';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'in-progress': return 'text-blue-400 bg-blue-400/10';
      case 'review': return 'text-purple-400 bg-purple-400/10';
      case 'blocked': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
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

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const nextStatuses = {
    'todo': ['in-progress'],
    'in-progress': ['review', 'completed'],
    'review': ['completed', 'in-progress'],
    'completed': [],
    'blocked': ['todo']
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await base44.entities.Task.update(task.id, { status: newStatus });
      onUpdate({ ...task, status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <div className="p-4 bg-slate-900/50 hover:bg-slate-900/70 transition-all cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-3">
          <span className={`text-2xl font-bold flex-shrink-0 ${getStatusColor(task.status)}`}>
            {getStatusIcon(task.status)}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className={`font-semibold line-clamp-2 ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                {task.title}
              </h4>
              <span className={`flex-shrink-0 text-xs font-bold ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              {task.assignee && (
                <div className="text-slate-300">Assigned: {task.assignee.split('@')[0]}</div>
              )}
              {task.dueDate && (
                <div className={isOverdue ? 'text-red-400 font-semibold' : ''}>
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue && ' (OVERDUE)'}
                </div>
              )}
              {task.estimatedHours && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.estimatedHours}h
                </div>
              )}
            </div>
          </div>

          <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-slate-800/30 border-t border-slate-700 space-y-4">
          {task.description && (
            <div>
              <p className="text-sm text-slate-300">{task.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase">Status</div>
            <div className="flex gap-2 flex-wrap">
              {['todo', 'in-progress', 'review', 'completed', 'blocked'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    task.status === status
                      ? 'bg-int-orange text-void'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {status.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-slate-700">
            <button
              onClick={() => onDelete(task.id)}
              className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}