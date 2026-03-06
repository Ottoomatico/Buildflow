import { DEMO_RESOURCES } from '@/lib/demo-data';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Plus,
  Filter,
  Package,
  Wrench,
  Truck,
  AlertTriangle,
  ArrowUpDown,
  MapPin,
  TrendingDown,
} from 'lucide-react';

export default function ResourcesPage() {
  const categoryConfig = {
    material: { label: 'Matériaux', icon: Package, color: 'bg-info/10 text-info' },
    equipment: { label: 'Équipement', icon: Wrench, color: 'bg-warning/10 text-warning' },
    vehicle: { label: 'Véhicules', icon: Truck, color: 'bg-success/10 text-success' },
  };

  const materials = DEMO_RESOURCES.filter(r => r.category === 'material');
  const equipment = DEMO_RESOURCES.filter(r => r.category === 'equipment');
  const vehicles = DEMO_RESOURCES.filter(r => r.category === 'vehicle');

  const lowStock = DEMO_RESOURCES.filter(r => r.quantity <= r.min_quantity);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Ressources</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {DEMO_RESOURCES.length} ressources · {lowStock.length} alerte{lowStock.length > 1 ? 's' : ''} stock
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-dark-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            <Plus className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Low Stock Alert Banner */}
      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger/10">
            <AlertTriangle className="h-5 w-5 text-danger" />
          </div>
          <div>
            <p className="text-sm font-semibold text-danger">Alerte stock bas</p>
            <p className="text-xs text-text-secondary">
              {lowStock.map(r => r.name).join(', ')} — en dessous du seuil minimum
            </p>
          </div>
          <button className="ml-auto shrink-0 rounded-lg border border-danger/20 bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/20">
            Commander
          </button>
        </div>
      )}

      {/* Category Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { cat: 'material' as const, items: materials },
          { cat: 'equipment' as const, items: equipment },
          { cat: 'vehicle' as const, items: vehicles },
        ].map(({ cat, items }) => {
          const conf = categoryConfig[cat];
          const Icon = conf.icon;
          const totalValue = items.reduce((s, r) => s + r.quantity * r.unit_cost, 0);

          return (
            <div key={cat} className="rounded-xl border border-surface-border bg-dark-900 p-5">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', conf.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{conf.label}</p>
                  <p className="text-xs text-text-muted">{items.length} références</p>
                </div>
              </div>
              <p className="mt-3 font-display text-xl font-bold text-text">
                {formatCurrency(totalValue)}
              </p>
              <p className="text-xs text-text-muted">valeur totale stock</p>
            </div>
          );
        })}
      </div>

      {/* Resources Table */}
      <div className="overflow-hidden rounded-xl border border-surface-border bg-dark-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <button className="flex items-center gap-1 hover:text-text">
                    Ressource <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Catégorie</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Quantité</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Min</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Coût unit.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Emplacement</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">État</th>
              </tr>
            </thead>
            <tbody className="stagger-children">
              {DEMO_RESOURCES.map((res) => {
                const conf = categoryConfig[res.category];
                const Icon = conf.icon;
                const isLow = res.quantity <= res.min_quantity;
                const stockPct = res.min_quantity > 0 ? Math.round((res.quantity / (res.min_quantity * 3)) * 100) : 100;

                return (
                  <tr
                    key={res.id}
                    className="border-b border-surface-border transition-colors hover:bg-surface-hover cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', conf.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{res.name}</p>
                          <p className="text-xs text-text-muted">{res.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold', conf.color)}>
                        {conf.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={cn('text-sm font-mono font-medium', isLow ? 'text-danger' : 'text-text')}>
                        {res.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-text-muted">
                      {res.min_quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-text-secondary">
                      {formatCurrency(res.unit_cost)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <MapPin className="h-3 w-3" />
                        {res.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-semibold text-danger">
                          <TrendingDown className="h-3 w-3" />
                          Bas
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
