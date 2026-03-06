import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Package,
  Users,
  FileBarChart,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export const APP_NAME = 'BuildFlow Pro';
export const APP_DESCRIPTION = 'Gestion de chantiers intelligente pour les entreprises du BTP';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const SIDEBAR_NAV: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Chantiers', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Tâches', href: '/dashboard/tasks', icon: ClipboardList },
  { label: 'Ressources', href: '/dashboard/resources', icon: Package },
  { label: 'Équipe', href: '/dashboard/team', icon: Users },
  { label: 'Rapports', href: '/dashboard/reports', icon: FileBarChart },
  { label: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export const PROJECT_STATUS_CONFIG = {
  planning: { label: 'Planification', color: 'info' as const },
  active: { label: 'En cours', color: 'success' as const },
  paused: { label: 'En pause', color: 'warning' as const },
  completed: { label: 'Terminé', color: 'success' as const },
  cancelled: { label: 'Annulé', color: 'danger' as const },
} as const;

export const TASK_STATUS_CONFIG = {
  todo: { label: 'À faire', color: 'text-muted' },
  in_progress: { label: 'En cours', color: 'info' },
  review: { label: 'En revue', color: 'warning' },
  done: { label: 'Terminé', color: 'success' },
} as const;

export const TASK_PRIORITY_CONFIG = {
  low: { label: 'Basse', color: 'text-muted' },
  medium: { label: 'Moyenne', color: 'info' },
  high: { label: 'Haute', color: 'warning' },
  critical: { label: 'Critique', color: 'danger' },
} as const;

export const ROLE_CONFIG = {
  admin: { label: 'Administrateur', description: 'Accès complet' },
  manager: { label: 'Chef de chantier', description: 'Gestion des chantiers et équipes' },
  worker: { label: 'Ouvrier', description: 'Accès aux tâches assignées' },
  client: { label: 'Client', description: 'Suivi d\'avancement uniquement' },
} as const;
