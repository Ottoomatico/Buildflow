import { HardHat, Building2, Shield, Palette, Bell, Globe, Database, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-surface-border bg-dark-900 overflow-hidden">
      <div className="flex items-center gap-3 border-b border-surface-border bg-dark-800/50 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-text">{title}</h3>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <label className="text-sm font-medium text-text-secondary sm:w-40 shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function TextInput({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-lg border border-surface-border bg-dark-800 px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
    />
  );
}

function Toggle({ enabled = false }: { enabled?: boolean }) {
  return (
    <button
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors duration-fast',
        enabled ? 'bg-primary' : 'bg-dark-700'
      )}
    >
      <div
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-fast',
          enabled ? 'left-[22px]' : 'left-0.5'
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Paramètres</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Configuration de votre organisation et préférences
        </p>
      </div>

      {/* Settings sections */}
      <div className="space-y-6 max-w-3xl">
        <SettingsSection title="Organisation" description="Informations de votre entreprise" icon={Building2}>
          <FormRow label="Nom">
            <TextInput defaultValue="BTP Solutions Lyon" />
          </FormRow>
          <FormRow label="SIRET">
            <TextInput defaultValue="123 456 789 00001" />
          </FormRow>
          <FormRow label="Adresse">
            <TextInput defaultValue="45 Rue de la République, 69002 Lyon" />
          </FormRow>
          <FormRow label="Téléphone">
            <TextInput defaultValue="+33 4 72 00 00 00" />
          </FormRow>
        </SettingsSection>

        <SettingsSection title="Notifications" description="Gérer vos alertes et e-mails" icon={Bell}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text">Alertes stock bas</p>
              <p className="text-xs text-text-muted">Notification quand un stock passe sous le seuil</p>
            </div>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text">Retards de tâches</p>
              <p className="text-xs text-text-muted">Alerte quand une tâche dépasse sa date limite</p>
            </div>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text">Rapports hebdomadaires</p>
              <p className="text-xs text-text-muted">Résumé envoyé chaque lundi matin</p>
            </div>
            <Toggle enabled={false} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text">Notifications push</p>
              <p className="text-xs text-text-muted">Recevoir des notifications dans le navigateur</p>
            </div>
            <Toggle enabled={true} />
          </div>
        </SettingsSection>

        <SettingsSection title="Sécurité" description="Paramètres de sécurité et authentification" icon={Shield}>
          <div className="space-y-4">
            <button className="w-full rounded-lg border border-surface-border bg-dark-800 px-4 py-3 text-left transition-colors hover:bg-surface-hover">
              <p className="text-sm font-medium text-text">Changer le mot de passe</p>
              <p className="text-xs text-text-muted">Dernière modification il y a 45 jours</p>
            </button>
            <button className="w-full rounded-lg border border-surface-border bg-dark-800 px-4 py-3 text-left transition-colors hover:bg-surface-hover">
              <p className="text-sm font-medium text-text">Authentification à deux facteurs</p>
              <p className="text-xs text-success font-medium">Activée</p>
            </button>
            <button className="w-full rounded-lg border border-surface-border bg-dark-800 px-4 py-3 text-left transition-colors hover:bg-surface-hover">
              <p className="text-sm font-medium text-text">Sessions actives</p>
              <p className="text-xs text-text-muted">2 appareils connectés</p>
            </button>
          </div>
        </SettingsSection>

        {/* Save button */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="rounded-lg border border-surface-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover">
            Annuler
          </button>
          <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-glow">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
