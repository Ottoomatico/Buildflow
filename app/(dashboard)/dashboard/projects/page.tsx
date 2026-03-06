import { DEMO_PROJECTS, DEMO_PROFILES } from '@/lib/demo-data';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { PROJECT_STATUS_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import {
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export default function ProjectsPage() {
  const statusColors: Record<string, string> = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-info/10 text-info border-info/20',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Chantiers</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {DEMO_PROJECTS.length} chantiers · {DEMO_PROJECTS.filter(p => p.status === 'active').length} en cours
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-dark-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            <Plus className="h-4 w-4" />
            Nouveau chantier
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['all', 'active', 'planning', 'paused', 'completed'].map((status) => (
          <button
            key={status}
            className={cn(
              'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              status === 'all'
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text'
            )}
          >
            {status === 'all' ? 'Tous' :
             status === 'active' ? 'En cours' :
             status === 'planning' ? 'Planification' :
             status === 'paused' ? 'En pause' : 'Terminés'}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 stagger-children">
        {DEMO_PROJECTS.map((project) => {
          const statusConf = PROJECT_STATUS_CONFIG[project.status];
          const manager = DEMO_PROFILES.find((p) => p.id === project.manager_id);
          const budgetPct = project.budget ? Math.round((project.spent / project.budget) * 100) : 0;

          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-dark-900 p-5 transition-all duration-normal hover:border-primary/20 hover:shadow-glow"
            >
              {/* Status Badge */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-text group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  {project.address && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{project.address}</span>
                    </div>
                  )}
                </div>
                <span className={cn('shrink-0 ml-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold', statusColors[statusConf.color])}>
                  {statusConf.label}
                </span>
              </div>

              {/* Description */}
              {project.description && (
                <p className="mt-3 text-xs text-text-secondary line-clamp-2">{project.description}</p>
              )}

              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Avancement</span>
                  <span className="font-mono font-medium text-text">{project.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-dark-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-slow"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Meta Row */}
              <div className="mt-4 flex items-center gap-4 border-t border-surface-border pt-4">
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <DollarSign className="h-3 w-3" />
                  <span>{formatCurrency(project.spent)}</span>
                  {project.budget && (
                    <span className="text-text-muted/60">/ {formatCurrency(project.budget)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(project.end_date)}</span>
                </div>
              </div>

              {/* Manager */}
              {manager && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    {manager.full_name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <span className="text-xs text-text-secondary">{manager.full_name}</span>
                </div>
              )}

              {/* Hover arrow */}
              <ArrowUpRight className="absolute right-4 top-5 h-4 w-4 text-text-muted opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
            </Link>
          );
        })}

        {/* Add New Card */}
        <button className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-surface-border bg-dark-900/50 p-8 text-text-muted transition-all hover:border-primary/30 hover:text-primary">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium">Ajouter un chantier</p>
        </button>
      </div>
    </div>
  );
}
