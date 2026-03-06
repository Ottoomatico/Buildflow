import type { Project, Task, Resource, Profile, Notification } from '@/lib/types/database';

export const DEMO_PROFILES: Profile[] = [
  { id: '1', organization_id: 'org-1', full_name: 'Jean-Pierre Dubois', avatar_url: null, role: 'admin', phone: '+33 6 12 34 56 78', created_at: '2024-01-15T10:00:00Z' },
  { id: '2', organization_id: 'org-1', full_name: 'Sophie Martin', avatar_url: null, role: 'manager', phone: '+33 6 23 45 67 89', created_at: '2024-02-01T09:00:00Z' },
  { id: '3', organization_id: 'org-1', full_name: 'Karim Benali', avatar_url: null, role: 'manager', phone: '+33 6 34 56 78 90', created_at: '2024-02-10T08:00:00Z' },
  { id: '4', organization_id: 'org-1', full_name: 'Marie Lefèvre', avatar_url: null, role: 'worker', phone: '+33 6 45 67 89 01', created_at: '2024-03-01T07:00:00Z' },
  { id: '5', organization_id: 'org-1', full_name: 'Lucas Moreau', avatar_url: null, role: 'worker', phone: '+33 6 56 78 90 12', created_at: '2024-03-15T07:00:00Z' },
  { id: '6', organization_id: 'org-1', full_name: 'Isabelle Roux', avatar_url: null, role: 'client', phone: '+33 6 67 89 01 23', created_at: '2024-04-01T10:00:00Z' },
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-1', organization_id: 'org-1', name: 'Résidence Les Oliviers',
    description: 'Construction d\'un immeuble résidentiel de 24 logements avec parking souterrain',
    status: 'active', address: '15 Rue de la Paix, Lyon 69003',
    latitude: 45.7640, longitude: 4.8357,
    budget: 2800000, spent: 1456000, start_date: '2024-06-01', end_date: '2025-12-31',
    progress: 52, manager_id: '2', created_at: '2024-05-15T10:00:00Z',
  },
  {
    id: 'proj-2', organization_id: 'org-1', name: 'Pont de la Confluence',
    description: 'Rénovation du pont piétonnier avec mise aux normes structurelles',
    status: 'active', address: 'Quai Perrache, Lyon 69002',
    latitude: 45.7440, longitude: 4.8262,
    budget: 950000, spent: 312000, start_date: '2024-09-01', end_date: '2025-06-30',
    progress: 33, manager_id: '3', created_at: '2024-08-20T09:00:00Z',
  },
  {
    id: 'proj-3', organization_id: 'org-1', name: 'Centre Commercial Bellecour',
    description: 'Extension du centre commercial — nouvelle aile de 3000m² et parkings',
    status: 'planning', address: 'Place Bellecour, Lyon 69002',
    latitude: 45.7578, longitude: 4.8320,
    budget: 5200000, spent: 0, start_date: '2025-03-01', end_date: '2026-09-30',
    progress: 0, manager_id: '2', created_at: '2025-01-10T10:00:00Z',
  },
  {
    id: 'proj-4', organization_id: 'org-1', name: 'École Maternelle Pasteur',
    description: 'Réhabilitation complète avec isolation thermique et mise aux normes PMR',
    status: 'completed', address: '8 Avenue Pasteur, Villeurbanne 69100',
    latitude: 45.7712, longitude: 4.8812,
    budget: 680000, spent: 645000, start_date: '2024-01-15', end_date: '2024-11-30',
    progress: 100, manager_id: '3', created_at: '2023-11-01T08:00:00Z',
  },
  {
    id: 'proj-5', organization_id: 'org-1', name: 'Entrepôt Logistique Nord',
    description: 'Construction d\'un entrepôt logistique de 8000m² avec quais de chargement',
    status: 'paused', address: 'ZI Nord, Rillieux-la-Pape 69140',
    latitude: 45.8214, longitude: 4.8987,
    budget: 3400000, spent: 890000, start_date: '2024-07-01', end_date: '2025-10-31',
    progress: 26, manager_id: '2', created_at: '2024-06-01T10:00:00Z',
  },
];

export const DEMO_TASKS: Task[] = [
  { id: 't-1', project_id: 'proj-1', title: 'Fondations profondes — secteur A', description: null, status: 'done', priority: 'critical', start_date: '2024-06-01', due_date: '2024-08-15', progress: 100, assignee_id: '4', parent_task_id: null, sort_order: 1, created_at: '2024-05-20T10:00:00Z' },
  { id: 't-2', project_id: 'proj-1', title: 'Élévation murs porteurs', description: null, status: 'in_progress', priority: 'high', start_date: '2024-08-16', due_date: '2025-01-31', progress: 65, assignee_id: '5', parent_task_id: null, sort_order: 2, created_at: '2024-05-20T10:00:00Z' },
  { id: 't-3', project_id: 'proj-1', title: 'Installation réseau plomberie', description: null, status: 'in_progress', priority: 'medium', start_date: '2024-11-01', due_date: '2025-03-31', progress: 30, assignee_id: '4', parent_task_id: null, sort_order: 3, created_at: '2024-05-20T10:00:00Z' },
  { id: 't-4', project_id: 'proj-1', title: 'Câblage électrique niveaux 1-3', description: null, status: 'todo', priority: 'medium', start_date: '2025-02-01', due_date: '2025-05-31', progress: 0, assignee_id: '5', parent_task_id: null, sort_order: 4, created_at: '2024-05-20T10:00:00Z' },
  { id: 't-5', project_id: 'proj-1', title: 'Toiture et étanchéité', description: null, status: 'todo', priority: 'high', start_date: '2025-04-01', due_date: '2025-07-31', progress: 0, assignee_id: null, parent_task_id: null, sort_order: 5, created_at: '2024-05-20T10:00:00Z' },
  { id: 't-6', project_id: 'proj-2', title: 'Diagnostic structurel', description: null, status: 'done', priority: 'critical', start_date: '2024-09-01', due_date: '2024-10-15', progress: 100, assignee_id: '3', parent_task_id: null, sort_order: 1, created_at: '2024-08-25T10:00:00Z' },
  { id: 't-7', project_id: 'proj-2', title: 'Renforcement piles du pont', description: null, status: 'in_progress', priority: 'critical', start_date: '2024-10-16', due_date: '2025-03-31', progress: 45, assignee_id: '4', parent_task_id: null, sort_order: 2, created_at: '2024-08-25T10:00:00Z' },
  { id: 't-8', project_id: 'proj-2', title: 'Remplacement tablier', description: null, status: 'todo', priority: 'high', start_date: '2025-04-01', due_date: '2025-06-30', progress: 0, assignee_id: null, parent_task_id: null, sort_order: 3, created_at: '2024-08-25T10:00:00Z' },
];

export const DEMO_RESOURCES: Resource[] = [
  { id: 'r-1', organization_id: 'org-1', name: 'Béton C30/37', category: 'material', unit: 'm³', quantity: 145, min_quantity: 50, unit_cost: 95, location: 'Dépôt Central', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-2', organization_id: 'org-1', name: 'Acier HA500', category: 'material', unit: 'tonnes', quantity: 12, min_quantity: 5, unit_cost: 1200, location: 'Dépôt Central', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-3', organization_id: 'org-1', name: 'Pelle hydraulique CAT 320', category: 'equipment', unit: 'unité', quantity: 2, min_quantity: 1, unit_cost: 450, location: 'Chantier Oliviers', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-4', organization_id: 'org-1', name: 'Grue à tour Potain MC 85', category: 'equipment', unit: 'unité', quantity: 1, min_quantity: 0, unit_cost: 800, location: 'Chantier Oliviers', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-5', organization_id: 'org-1', name: 'Camion benne 8x4', category: 'vehicle', unit: 'unité', quantity: 3, min_quantity: 2, unit_cost: 280, location: 'Dépôt Central', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-6', organization_id: 'org-1', name: 'Parpaings 20x20x50', category: 'material', unit: 'palettes', quantity: 28, min_quantity: 30, unit_cost: 85, location: 'Dépôt Central', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-7', organization_id: 'org-1', name: 'Tubes PVC Ø100', category: 'material', unit: 'mètres', quantity: 340, min_quantity: 100, unit_cost: 8, location: 'Dépôt Central', created_at: '2024-01-10T08:00:00Z' },
  { id: 'r-8', organization_id: 'org-1', name: 'Compacteur vibrant', category: 'equipment', unit: 'unité', quantity: 1, min_quantity: 1, unit_cost: 320, location: 'Chantier Confluence', created_at: '2024-01-10T08:00:00Z' },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n-1', user_id: '1', title: 'Stock bas', message: 'Parpaings 20x20x50 en dessous du seuil minimum (28/30)', type: 'warning', read: false, link: '/dashboard/resources', created_at: '2025-03-06T14:30:00Z' },
  { id: 'n-2', user_id: '1', title: 'Tâche terminée', message: 'Fondations profondes — secteur A marquée comme terminée par Marie Lefèvre', type: 'success', read: false, link: '/dashboard/projects/proj-1', created_at: '2025-03-06T11:15:00Z' },
  { id: 'n-3', user_id: '1', title: 'Nouveau rapport', message: 'Rapport d\'avancement généré pour Pont de la Confluence', type: 'info', read: true, link: '/dashboard/reports', created_at: '2025-03-05T16:00:00Z' },
  { id: 'n-4', user_id: '1', title: 'Retard détecté', message: 'Élévation murs porteurs — risque de retard de 2 semaines', type: 'alert', read: false, link: '/dashboard/projects/proj-1', created_at: '2025-03-04T09:00:00Z' },
];

// KPI calculations
export const DEMO_KPIS = {
  totalProjects: DEMO_PROJECTS.length,
  activeProjects: DEMO_PROJECTS.filter(p => p.status === 'active').length,
  totalBudget: DEMO_PROJECTS.reduce((sum, p) => sum + (p.budget || 0), 0),
  totalSpent: DEMO_PROJECTS.reduce((sum, p) => sum + p.spent, 0),
  avgProgress: Math.round(DEMO_PROJECTS.filter(p => p.status === 'active').reduce((sum, p) => sum + p.progress, 0) / DEMO_PROJECTS.filter(p => p.status === 'active').length),
  teamSize: DEMO_PROFILES.filter(p => p.role !== 'client').length,
  openTasks: DEMO_TASKS.filter(t => t.status !== 'done').length,
  lowStockAlerts: DEMO_RESOURCES.filter(r => r.quantity <= r.min_quantity).length,
};
