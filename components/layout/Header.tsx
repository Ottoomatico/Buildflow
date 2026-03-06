'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-data';
import { formatRelativeTime } from '@/lib/utils';
import { useState } from 'react';

function NotificationTypeIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    info: 'bg-info/20 text-info',
    warning: 'bg-warning/20 text-warning',
    alert: 'bg-danger/20 text-danger',
    success: 'bg-success/20 text-success',
  };
  return (
    <div className={`h-2 w-2 rounded-full ${type === 'info' ? 'bg-info' : type === 'warning' ? 'bg-warning' : type === 'alert' ? 'bg-danger' : 'bg-success'}`} />
  );
}

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const unreadCount = DEMO_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-border bg-dark-900/80 px-4 backdrop-blur-xl md:px-6">
      {/* Mobile menu button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Bar */}
      <div className="hidden flex-1 md:block md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Rechercher un chantier, une tâche, un membre..."
            className="w-full rounded-lg border border-surface-border bg-dark-800 py-2 pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-surface-border bg-dark-700 px-1.5 py-0.5 text-xs text-text-muted lg:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-surface-border bg-dark-900 shadow-elevated animate-scale-in">
                <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
                  <h3 className="font-display text-sm font-semibold">Notifications</h3>
                  <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                    {unreadCount} nouvelles
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {DEMO_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex gap-3 border-b border-surface-border px-4 py-3 transition-colors hover:bg-surface-hover ${!notif.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="mt-1.5">
                        <NotificationTypeIcon type={notif.type} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text">{notif.title}</p>
                        <p className="mt-0.5 text-xs text-text-secondary line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          {formatRelativeTime(notif.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-border px-4 py-2">
                  <button className="w-full rounded-lg py-1.5 text-center text-xs font-medium text-primary hover:bg-primary/5">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User avatar (mobile) */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary md:hidden">
          JP
        </div>
      </div>
    </header>
  );
}
