import { DEMO_KPIS, DEMO_PROJECTS, DEMO_TASKS, DEMO_NOTIFICATIONS } from '@/lib/demo-data';
import { formatCurrency, formatPercent, formatRelativeTime, cn } from '@/lib/utils';
import { PROJECT_STATUS_CONFIG, TASK_PRIORITY_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  FolderKanban,
  DollarSign,
  Users,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Activity,
  Clock,
  CheckCircle2,
  Circle,
} from 'lucide-react';

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = 'primary',
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  trendLabel?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
    info: 'bg-info/10 text-info',
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-surface-border bg-dark-900 p-5 transition-all duration-normal hover:border-primary/20 hover:shadow-glow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && trendLabel && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend === 'up' ? (
            <TrendingUp className="h-3.5 w-3.5 text-success" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-danger" />
          )}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
            {trendLabel}
          </span>
        </div>
      )}
      {/* Subtle glow effect on hover */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-slow group-hover:opacity-100" />
    </div>
  );
}

function BudgetBar() {
  const { totalBudget, totalSpent } = DEMO_KPIS;
  const pct = Math.round((totalSpent / totalBudget) * 100);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="rounded-xl border border-surface-border bg-dark-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-text">Budget Global</h3>
        <BarChart3 className="h-4 w-4 text-text-muted" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-text">{formatCurrency(totalSpent)}</p>
          <p className="text-xs text-text-muted">dépensé sur {formatCurrency(totalBudget)}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-success">{formatCurrency(remaining)}</p>
          <p className="text-xs text-text-muted">restant</p>
        </div>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-dark-700">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-slow',
            pct > 80 ? 'bg-danger' : pct > 60 ? 'bg-warning' : 'bg-primary'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs font-medium text-text-muted">{pct}% consommé</p>
    </div>
  );
}

function ProjectsList() {
  return (
    <div className="rounded-xl border border-surface-border bg-dark-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-text">Chantiers récents</h3>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-light"
        >
          Voir tout <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 space-y-3 stagger-children">
        {DEMO_PROJECTS.slice(0, 4).map((project) => {
          const statusConfig = PROJECT_STATUS_CONFIG[project.status];
          const statusColors: Record<string, string> = {
            success: 'bg-success/10 text-success',
            warning: 'bg-warning/10 text-warning',
            danger: 'bg-danger/10 text-danger',
            info: 'bg-info/10 text-info',
          };

          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group flex items-center gap-4 rounded-lg p-3 transition-all duration-fast hover:bg-surface-hover"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-text group-hover:text-primary">
                    {project.name}
                  </p>
                  <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[statusConfig.color]}`}>
                    {statusConfig.label}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-text-muted">{project.address}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="w-20">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark-700">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[10px] font-mono text-text-muted">
                    {project.progress}%
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TasksOverview() {
  const activeTasks = DEMO_TASKS.filter((t) => t.status !== 'done').slice(0, 5);

  return (
    <div className="rounded-xl border border-surface-border bg-dark-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-text">Tâches en cours</h3>
        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-light"
        >
          Voir tout <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 space-y-2 stagger-children">
        {activeTasks.map((task) => {
          const priorityConf = TASK_PRIORITY_CONFIG[task.priority];
          const project = DEMO_PROJECTS.find((p) => p.id === task.project_id);
          const priorityColors: Record<string, string> = {
            'text-muted': 'border-text-muted/30',
            info: 'border-info',
            warning: 'border-warning',
            danger: 'border-danger',
          };

          return (
            <div
              key={task.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border-l-2 bg-dark-800/50 px-3 py-2.5 transition-colors hover:bg-surface-hover',
                priorityColors[priorityConf.color]
              )}
            >
              {task.status === 'done' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              ) : task.status === 'in_progress' ? (
                <Activity className="h-4 w-4 shrink-0 text-info" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-text-muted" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text">{task.title}</p>
                <p className="text-xs text-text-muted">{project?.name}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {task.due_date && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {new Date(task.due_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    { id: 1, user: 'Sophie Martin', action: 'a mis à jour l\'avancement', target: 'Résidence Les Oliviers', time: 'il y a 2h', type: 'update' },
    { id: 2, user: 'Karim Benali', action: 'a terminé la tâche', target: 'Diagnostic structurel', time: 'il y a 4h', type: 'complete' },
    { id: 3, user: 'Marie Lefèvre', action: 'a ajouté un commentaire sur', target: 'Installation réseau plomberie', time: 'il y a 6h', type: 'comment' },
    { id: 4, user: 'Jean-Pierre Dubois', action: 'a créé le chantier', target: 'Centre Commercial Bellecour', time: 'hier', type: 'create' },
    { id: 5, user: 'Lucas Moreau', action: 'a déplacé 5 palettes vers', target: 'Chantier Oliviers', time: 'hier', type: 'move' },
  ];

  const typeColors: Record<string, string> = {
    update: 'bg-info',
    complete: 'bg-success',
    comment: 'bg-warning',
    create: 'bg-primary',
    move: 'bg-accent-light',
  };

  return (
    <div className="rounded-xl border border-surface-border bg-dark-900 p-5">
      <h3 className="font-display text-sm font-semibold text-text">Activité récente</h3>
      <div className="mt-4 space-y-4">
        {activities.map((act, i) => (
          <div key={act.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${typeColors[act.type]}`} />
              {i < activities.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-surface-border" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-text">{act.user}</span>{' '}
                {act.action}{' '}
                <span className="font-medium text-primary">{act.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-text-muted">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Tableau de bord</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Bienvenue, Jean-Pierre. Voici l&apos;état de vos chantiers.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 stagger-children">
        <KPICard
          title="Chantiers actifs"
          value={DEMO_KPIS.activeProjects}
          subtitle={`${DEMO_KPIS.totalProjects} au total`}
          icon={FolderKanban}
          trend="up"
          trendLabel="+1 ce mois"
          color="primary"
        />
        <KPICard
          title="Budget consommé"
          value={formatCurrency(DEMO_KPIS.totalSpent)}
          subtitle={`sur ${formatCurrency(DEMO_KPIS.totalBudget)}`}
          icon={DollarSign}
          trend="up"
          trendLabel="25% ce mois"
          color="info"
        />
        <KPICard
          title="Équipe"
          value={DEMO_KPIS.teamSize}
          subtitle={`${DEMO_KPIS.openTasks} tâches ouvertes`}
          icon={Users}
          color="success"
        />
        <KPICard
          title="Alertes stock"
          value={DEMO_KPIS.lowStockAlerts}
          subtitle="ressources sous le seuil"
          icon={AlertTriangle}
          color={DEMO_KPIS.lowStockAlerts > 0 ? 'danger' : 'success'}
        />
      </div>

      {/* Budget Bar */}
      <BudgetBar />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProjectsList />
        <TasksOverview />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
