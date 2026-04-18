import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { Button } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'

export const metadata: Metadata = {
  title: 'Settings · School Console · Versani',
  description: 'School profile, academic calendar, and defaults.',
  robots: { index: false, follow: false },
}

export default function SchoolSettingsPage() {
  const { profile } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Settings"
        title="School settings"
        subtitle="Profile, academic calendar, graduation automation, and data-sharing defaults."
      />

      <DataCard title="School profile" action={<Button variant="gold-outline" size="sm">Save</Button>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="School name" defaultValue={profile.name} />
          <Field label="Location" defaultValue={profile.city} />
          <Field label="Admin" defaultValue={profile.adminName} />
          <Field label="Timezone" defaultValue="America/Denver" />
        </div>
      </DataCard>

      <DataCard title="Academic calendar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Current term" defaultValue={profile.term} />
          <Field label="Term start" defaultValue={profile.termStart} />
          <Field label="Term end" defaultValue={profile.termEnd} />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Versani uses the term dates to drive reporting windows and graduation
          pipeline eligibility.
        </p>
      </DataCard>

      <DataCard
        title="Graduation automation"
        description="How we handle students at the end of their program."
      >
        <div className="space-y-3">
          <Toggle
            label="Auto-convert graduates to Pro"
            description="When marked graduating, offer a discounted migration to a personal Versani Pro account."
            defaultChecked
          />
          <Toggle
            label="Notify student two weeks before graduation"
            description="Email reminder so they can prepare their account migration."
            defaultChecked
          />
        </div>
      </DataCard>

      <DataCard title="Instructor defaults">
        <Toggle
          label="Default new instructors to no access"
          description="Newly invited instructors must be explicitly granted classes. Recommended."
          defaultChecked
        />
        <Toggle
          label="Allow instructors to request class access"
          description="Instructors can request class scope from the admin inbox."
          defaultChecked
        />
      </DataCard>

      <DataCard title="Branding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Accent color" defaultValue="#CDA77B" />
          <Field label="Logo" defaultValue="paul-mitchell-denver.png" disabled />
        </div>
      </DataCard>
    </div>
  )
}

function Field({
  label,
  defaultValue,
  disabled,
}: {
  label: string
  defaultValue: string
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground focus:outline-none focus:border-gold/50 disabled:opacity-50"
      />
    </div>
  )
}

function Toggle({
  label,
  description,
  defaultChecked,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/[0.06]">
      <div>
        <div className="text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full border ${
          defaultChecked
            ? 'bg-gold/70 border-gold'
            : 'bg-white/[0.06] border-white/20'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${
            defaultChecked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </div>
  )
}
