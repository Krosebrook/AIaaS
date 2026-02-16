import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Folder, Plus, X, Loader2, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';
import ProjectCard from '../components/project/ProjectCard';
import TaskItem from '../components/project/TaskItem';
import TaskForm from '../components/project/TaskForm';

export default function Projects() {
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    collaborators: ''
  });
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-updated_date'),
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', selectedProjectId],
    queryFn: () => selectedProjectId 
      ? base44.entities.Task.filter({ projectId: selectedProjectId }, '-updated_date')
      : Promise.resolve([]),
    enabled: !!selectedProjectId,
  });

  const createProjectMutation = useMutation({
    mutationFn: (data) => base44.entities.Project.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setProjectForm({ name: '', description: '', dueDate: '', priority: 'medium', collaborators: '' });
      setShowNewProject(false);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id) => base44.entities.Project.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      if (selectedProjectId) setSelectedProjectId(null);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => base44.entities.Task.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedProjectId] });
    },
  });

  const handleCreateProject = async (e) => {
    e.preventDefault();
    createProjectMutation.mutate({
      name: projectForm.name,
      description: projectForm.description,
      dueDate: projectForm.dueDate,
      priority: projectForm.priority,
      collaborators: projectForm.collaborators ? projectForm.collaborators.split(',').map(c => c.trim()) : [],
      progress: 0,
      status: 'planning'
    });
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
  };

  const calculateProjectProgress = (project) => {
    if (!tasks.length) return project.progress || 0;
    return Math.round((projectStats.completed / projectStats.total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Folder className="w-8 h-8 text-int-orange" />
          Project Management
        </h1>
        <button
          onClick={() => setShowNewProject(true)}
          className="px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {showNewProject && (
        <form onSubmit={handleCreateProject} className="p-6 bg-carbon-night border border-int-orange/30 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Create New Project</h2>
            <button type="button" onClick={() => setShowNewProject(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project name *"
              required
              value={projectForm.name}
              onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
              className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-white focus:border-int-orange focus:outline-none"
            />

            <textarea
              placeholder="Project description"
              value={projectForm.description}
              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-white focus:border-int-orange focus:outline-none resize-none"
              rows="3"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                required
                value={projectForm.dueDate}
                onChange={(e) => setProjectForm({...projectForm, dueDate: e.target.value})}
                className="px-4 py-2 bg-void border border-slate-700 rounded-lg text-white focus:border-int-orange focus:outline-none"
              />

              <select
                value={projectForm.priority}
                onChange={(e) => setProjectForm({...projectForm, priority: e.target.value})}
                className="px-4 py-2 bg-void border border-slate-700 rounded-lg text-white focus:border-int-orange focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Collaborators (comma-separated emails)"
              value={projectForm.collaborators}
              onChange={(e) => setProjectForm({...projectForm, collaborators: e.target.value})}
              className="w-full px-4 py-2 bg-void border border-slate-700 rounded-lg text-white focus:border-int-orange focus:outline-none"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createProjectMutation.isPending}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
              >
                {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewProject(false)}
                className="px-4 py-2 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {projectsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-int-orange" />
              </div>
            ) : projects.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                <Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No projects yet. Create one to get started.</p>
              </div>
            ) : (
              projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`cursor-pointer transition-all p-4 rounded-lg border-2 ${
                    selectedProjectId === project.id
                      ? 'bg-int-orange/10 border-int-orange'
                      : 'bg-slate-900/50 border-slate-700 hover:border-int-orange/50'
                  }`}
                >
                  <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className={`px-2 py-0.5 rounded text-white ${
                        project.status === 'active' ? 'bg-green-500/30' :
                        project.status === 'planning' ? 'bg-blue-500/30' :
                        project.status === 'completed' ? 'bg-purple-500/30' :
                        'bg-slate-600'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded h-1.5">
                      <div 
                        className="bg-int-orange h-full rounded transition-all"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                    <div className="text-slate-300">{project.progress || 0}%</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedProject ? (
            <div className="space-y-6">
              <div className="p-6 bg-carbon-night border border-int-orange/30 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.name}</h2>
                    <p className="text-slate-400">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => deleteProjectMutation.mutate(selectedProject.id)}
                    className="p-2 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-int-orange">{projectStats.total}</div>
                    <div className="text-xs text-slate-400">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{projectStats.completed}</div>
                    <div className="text-xs text-slate-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{projectStats.inProgress}</div>
                    <div className="text-xs text-slate-400">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{projectStats.blocked}</div>
                    <div className="text-xs text-slate-400">Blocked</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Project Progress</span>
                    <span className="font-semibold text-int-orange">{calculateProjectProgress(selectedProject)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-int-orange to-int-navy h-full rounded-full transition-all"
                      style={{ width: `${calculateProjectProgress(selectedProject)}%` }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700">
                  <div>
                    <span className="text-xs text-slate-400">Due Date</span>
                    <div className="font-semibold text-white flex items-center gap-1 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedProject.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
                    <div>
                      <span className="text-xs text-slate-400">Collaborators</span>
                      <div className="text-sm text-white flex items-center gap-1 mt-1">
                        <Users className="w-4 h-4" />
                        {selectedProject.collaborators.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Tasks</h3>
                  <button
                    onClick={() => setShowNewTask(!showNewTask)}
                    className="px-3 py-1 bg-int-orange/30 border border-int-orange/50 rounded font-semibold hover:bg-int-orange/40 transition-all text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </div>

                {showNewTask && (
                  <TaskForm
                    projectId={selectedProject.id}
                    onTaskCreated={() => {
                      queryClient.invalidateQueries({ queryKey: ['tasks', selectedProject.id] });
                      setShowNewTask(false);
                    }}
                    onClose={() => setShowNewTask(false)}
                  />
                )}

                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 bg-slate-900/30 rounded-lg">
                      <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No tasks yet. Create one to get started.</p>
                    </div>
                  ) : (
                    tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onUpdate={() => queryClient.invalidateQueries({ queryKey: ['tasks', selectedProject.id] })}
                        onDelete={(id) => deleteTaskMutation.mutate(id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-slate-900/30 rounded-lg h-full flex items-center justify-center">
              <div>
                <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a project to view tasks</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}