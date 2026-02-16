import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, X, Loader2 } from 'lucide-react';

export default function TaskForm({ projectId, onTaskCreated, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    estimatedHours: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        projectId,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
        estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        status: 'todo'
      };

      const newTask = await base44.entities.Task.create(taskData);
      onTaskCreated(newTask);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        estimatedHours: '',
        tags: ''
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">New Task</h3>
        <button type="button" onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Task title *"
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none"
        />

        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none resize-none"
          rows="2"
        />

        <div className="grid grid-cols-2 gap-2">
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="critical">Critical</option>
          </select>

          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Est. hours"
            min="0"
            step="0.5"
            value={formData.estimatedHours}
            onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none"
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-int-orange focus:outline-none"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading || !formData.title}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Task
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}