import { DEMO_TASKS, DEMO_PROJECTS, DEMO_PROFILES } from '@/lib/demo-data';
import { cn, formatDate, getInitials } from '@/lib/utils';
import { TASK_STATUS_CONFIG, TASK_PRIORITY_CONFIG } from '@/lib/constants';
import {
  Plus,
  Filter,
  Clock,
  CheckCircle2,
  Circle,
  Activity,
  AlertCircle,
  GripVertical,
  MoreHorizontal,
} from 'lucide-react';

export default function TasksPage() {
  const columns = [
    { key: 'todo' as const, tasks: DEMO_TASKS.filter(t => t.status === 'todo') },
    { key: 'in_progress' as const, tasks: DEMO_TASKS.filter(t => t.status === 'in_progress') },
    { key: 'review' as const, tasks: DEMO_TASKS.filter(t => t.status === 'review') },
    { key: 'done' as const, tasks: DEMO_TASKS.filter(t => t.status === 'done') },
  ];

  const statusIcons = {
    todo: Circle,
    in_progress: Activity,
    review: AlertCircle,
    done: CheckCircle2,
  };

  const statusIconColors = {
    todo: 'text-text-muted',
    in_progress: 'text-info',
    review: 'text-warning',
    done: 'text-success',
  };

  const priorityDots: Record<string, string> = {
    low: 'bg-text-muted/50',
    medium: 'bg-info',
    high: 'bg-warning',
    critical: 'bg-danger',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Tâches</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {DEMO_TASKS.length} tâches · {DEMO_TASKS.filter(t => t.status !== 'done').length} en cours
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-dark-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            <Plus className="h-4 w-4" />
            Nouvelle tâche
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const statusConf = TASK_STATUS_CONFIG[col.key];
          const StatusIcon = statusIcons[col.key];

          return (
            <div key={col.key} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-2 rounded-t-xl bg-dark-900 px-4 py-3 border border-surface-border border-b-0">
                <StatusIcon className={cn('h-4 w-4', statusIconColors[col.key])} />
                <span className="text-sm font-semibold text-text">{statusConf.label}</span>
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-dark-700 px-1.5 text-xs font-medium text-text-muted">
                  {col.tasks.length}
                </span>
              </div>

              {/* Column Body */}
              <div className="flex-1 space-y-2 rounded-b-xl border border-surface-border bg-dark-800/30 p-3 min-h-[200px]">
                {col.tasks.map((task) => {
                  const project = DEMO_PROJECTS.find(p => p.id === task.project_id);
                  const assignee = DEMO_PROFILES.find(p => p.id === task.assignee_id);

                  return (
                    <div
                      key={task.id}
                      className="group rounded-lg border border-surface-border bg-dark-900 p-3 transition-all hover:border-primary/20 hover:shadow-card cursor-pointer"
                    >
                      {/* Priority & Menu */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn('h-2 w-2 rounded-full', priorityDots[task.priority])} />
                          <span className="text-[10px] font-medium text-text-muted uppercase">
                            {TASK_PRIORITY_CONFIG[task.priority].label}
                          </span>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4 text-text-muted" />
                        </button>
                      </div>

                      {/* Title */}
                      <p className="mt-2 text-sm font-medium text-text leading-snug">
                        {task.title}
                      </p>

                      {/* Project */}
                      {project && (
                        <p className="mt-1 text-xs text-text-muted truncate">
                          {project.name}
                        </p>
                      )}

                      {/* Progress bar for in-progress tasks */}
                      {task.status === 'in_progress' && task.progress > 0 && (
                        <div className="mt-3">
                          <div className="h-1 w-full overflow-hidden rounded-full bg-dark-700">
                            <div
                              className="h-full rounded-full bg-info"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <p className="mt-1 text-right text-[10px] font-mono text-text-muted">
                            {task.progress}%
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between">
                        {assignee && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-light/30 text-[10px] font-bold text-text-secondary" title={assignee.full_name}>
                            {getInitials(assignee.full_name)}
                          </div>
                        )}
                        {task.due_date && (
                          <span className="flex items-center gap-1 text-[10px] text-text-muted">
                            <Clock className="h-3 w-3" />
                            {new Date(task.due_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Empty state */}
                {col.tasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-text-muted">
                    <Circle className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-xs">Aucune tâche</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
