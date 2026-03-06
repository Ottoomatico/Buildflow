import { DEMO_PROJECTS } from '@/lib/demo-data';
import { formatCurrency, cn } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileText,
  Calendar,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export default function ReportsPage() {
  // Budget breakdown data
  const budgetData = DEMO_PROJECTS.filter(p => p.budget && p.budget > 0);
  const totalBudget = budgetData.reduce((s, p) => s + (p.budget || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Rapports</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Analyse financière et avancement des chantiers
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-dark-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
            <Calendar className="h-4 w-4" />
            Période
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            <Download className="h-4 w-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Budget Chart Simulation */}
      <div className="rounded-xl border border-surface-border bg-dark-900 p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-base font-semibold text-text">Répartition budgétaire</h3>
            <p className="text-xs text-text-muted">Budget alloué vs dépensé par chantier</p>
          </div>
          <PieChart className="h-5 w-5 text-text-muted" />
        </div>
        <div className="space-y-4">
          {budgetData.map((project) => {
            const budgetPct = Math.round(((project.budget || 0) / totalBudget) * 100);
            const spentPct = project.budget ? Math.round((project.spent / project.budget) * 100) : 0;
            const barColors = spentPct > 80 ? 'from-danger to-danger/70' : spentPct > 60 ? 'from-warning to-warning/70' : 'from-primary to-primary-light';

            return (
              <div key={project.id} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-text truncate">{project.name}</span>
                    <span className="shrink-0 text-xs text-text-muted">({budgetPct}% du global)</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-text-secondary">{formatCurrency(project.spent)}</span>
                    <span className="text-xs text-text-muted">/ {formatCurrency(project.budget || 0)}</span>
                    <span className={cn(
                      'font-mono text-xs font-semibold',
                      spentPct > 80 ? 'text-danger' : spentPct > 60 ? 'text-warning' : 'text-primary'
                    )}>
                      {spentPct}%
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-dark-700">
                  <div
                    className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-slow', barColors)}
                    style={{ width: `${spentPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Rapport mensuel', desc: 'Synthèse avancement et dépenses — Mars 2025', date: '01/03/2025', type: 'monthly' },
          { title: 'Bilan financier Q4', desc: 'Analyse budgétaire du 4ème trimestre', date: '15/01/2025', type: 'quarterly' },
          { title: 'Suivi heures équipe', desc: 'Temps passé par membre et par chantier', date: '28/02/2025', type: 'timesheet' },
          { title: 'Rapport qualité', desc: 'Contrôles qualité et non-conformités', date: '20/02/2025', type: 'quality' },
          { title: 'Planning prévisionnel', desc: 'Projection d\'avancement sur 6 mois', date: '05/03/2025', type: 'forecast' },
          { title: 'Inventaire ressources', desc: 'État des stocks et besoins à venir', date: '01/03/2025', type: 'inventory' },
        ].map((report, i) => (
          <div
            key={i}
            className="group rounded-xl border border-surface-border bg-dark-900 p-5 transition-all hover:border-primary/20 hover:shadow-glow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
            </div>
            <h4 className="mt-3 font-display text-sm font-semibold text-text group-hover:text-primary transition-colors">
              {report.title}
            </h4>
            <p className="mt-1 text-xs text-text-muted">{report.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-3">
              <span className="text-xs text-text-muted">{report.date}</span>
              <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-light">
                <Download className="h-3 w-3" />
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
