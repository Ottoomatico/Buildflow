export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'admin' | 'manager' | 'worker' | 'client';
export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type ResourceCategory = 'material' | 'equipment' | 'vehicle';
export type NotificationType = 'info' | 'warning' | 'alert' | 'success';
export type ReportType = 'progress' | 'financial' | 'resource' | 'incident';
export type OrgPlan = 'starter' | 'pro' | 'enterprise';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  plan: OrgPlan;
  created_at: string;
}

export interface Profile {
  id: string;
  organization_id: string | null;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  budget: number | null;
  spent: number;
  start_date: string | null;
  end_date: string | null;
  progress: number;
  manager_id: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  start_date: string | null;
  due_date: string | null;
  progress: number;
  assignee_id: string | null;
  parent_task_id: string | null;
  sort_order: number;
  created_at: string;
}

export interface Resource {
  id: string;
  organization_id: string;
  name: string;
  category: ResourceCategory;
  unit: string;
  quantity: number;
  min_quantity: number;
  unit_cost: number;
  location: string | null;
  created_at: string;
}

export interface ResourceAllocation {
  id: string;
  resource_id: string;
  project_id: string;
  quantity: number;
  allocated_date: string;
  returned_date: string | null;
  notes: string | null;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  profile_id: string;
  role: string;
  daily_rate: number | null;
  start_date: string | null;
  end_date: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  project_id: string;
  author_id: string | null;
  title: string;
  content: Json;
  type: ReportType;
  created_at: string;
}

// Supabase Database type for client generation
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Organization, 'id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'> & { created_at?: string };
        Update: Partial<Omit<Profile, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'spent' | 'progress'> & { 
          id?: string; created_at?: string; spent?: number; progress?: number;
        };
        Update: Partial<Omit<Project, 'id'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'progress' | 'sort_order'> & {
          id?: string; created_at?: string; progress?: number; sort_order?: number;
        };
        Update: Partial<Omit<Task, 'id'>>;
      };
      resources: {
        Row: Resource;
        Insert: Omit<Resource, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Resource, 'id'>>;
      };
      resource_allocations: {
        Row: ResourceAllocation;
        Insert: Omit<ResourceAllocation, 'id'> & { id?: string };
        Update: Partial<Omit<ResourceAllocation, 'id'>>;
      };
      project_members: {
        Row: ProjectMember;
        Insert: Omit<ProjectMember, 'id'> & { id?: string };
        Update: Partial<Omit<ProjectMember, 'id'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at' | 'read'> & { 
          id?: string; created_at?: string; read?: boolean;
        };
        Update: Partial<Omit<Notification, 'id'>>;
      };
      reports: {
        Row: Report;
        Insert: Omit<Report, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Report, 'id'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
