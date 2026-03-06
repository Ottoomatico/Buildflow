'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_NAV, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HardHat, LogOut, ChevronLeft } from 'lucide-react';
import { DEMO_PROJECTS } from '@/lib/demo-data';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-surface-border bg-dark-900 md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-surface-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <HardHat className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold tracking-tight text-text">
          {APP_NAME}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {SIDEBAR_NAV.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-fast',
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-secondary'
                )}
              />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-xs font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Active Projects Mini-List */}
      <div className="border-t border-surface-border px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
          Chantiers actifs
        </p>
        <div className="space-y-1">
          {DEMO_PROJECTS.filter((p) => p.status === 'active')
            .slice(0, 3)
            .map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-hover"
              >
                <div className="relative h-2 w-2 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-success" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-success opacity-25" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-text-secondary group-hover:text-text">
                    {project.name}
                  </p>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-dark-700">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-slow"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-text-muted">{project.progress}%</span>
              </Link>
            ))}
        </div>
      </div>

      {/* User Section */}
      <div className="border-t border-surface-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
            JP
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium text-text">Jean-Pierre D.</p>
            <p className="text-xs text-text-muted">Administrateur</p>
          </div>
          <LogOut className="h-4 w-4 text-text-muted" />
        </button>
      </div>
    </aside>
  );
}
