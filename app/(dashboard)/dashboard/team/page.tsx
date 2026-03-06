import { DEMO_PROFILES } from '@/lib/demo-data';
import { getInitials, cn } from '@/lib/utils';
import { ROLE_CONFIG } from '@/lib/constants';
import {
  Plus,
  Filter,
  Phone,
  Mail,
  MoreHorizontal,
  Shield,
  HardHat,
  Hammer,
  Users as UsersIcon,
} from 'lucide-react';

export default function TeamPage() {
  const roleIcons = {
    admin: Shield,
    manager: HardHat,
    worker: Hammer,
    client: UsersIcon,
  };

  const roleColors = {
    admin: 'bg-primary/10 text-primary border-primary/20',
    manager: 'bg-info/10 text-info border-info/20',
    worker: 'bg-success/10 text-success border-success/20',
    client: 'bg-warning/10 text-warning border-warning/20',
  };

  const avatarColors = [
    'bg-primary/20 text-primary',
    'bg-info/20 text-info',
    'bg-success/20 text-success',
    'bg-warning/20 text-warning',
    'bg-danger/20 text-danger',
    'bg-accent-light/30 text-text-secondary',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Équipe</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {DEMO_PROFILES.length} membres · {DEMO_PROFILES.filter(p => p.role !== 'client').length} actifs sur chantier
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-dark-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            <Plus className="h-4 w-4" />
            Inviter
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {DEMO_PROFILES.map((member, i) => {
          const roleConf = ROLE_CONFIG[member.role];
          const RoleIcon = roleIcons[member.role];

          return (
            <div
              key={member.id}
              className="group rounded-xl border border-surface-border bg-dark-900 p-5 transition-all duration-normal hover:border-primary/20 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold', avatarColors[i % avatarColors.length])}>
                    {getInitials(member.full_name)}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-text">{member.full_name}</p>
                    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold mt-1', roleColors[member.role])}>
                      <RoleIcon className="h-3 w-3" />
                      {roleConf.label}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-1 hover:bg-surface-hover">
                  <MoreHorizontal className="h-4 w-4 text-text-muted" />
                </button>
              </div>

              <p className="mt-3 text-xs text-text-muted">{roleConf.description}</p>

              <div className="mt-4 space-y-2 border-t border-surface-border pt-4">
                {member.phone && (
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Phone className="h-3.5 w-3.5 text-text-muted" />
                    {member.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Mail className="h-3.5 w-3.5 text-text-muted" />
                  {member.full_name.toLowerCase().replace(' ', '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@buildflow.fr
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
