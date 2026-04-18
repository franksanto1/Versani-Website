import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { Button } from '@/components/ui/Button'
import { salonMock } from '@/lib/mock/salons'

export const metadata: Metadata = {
  title: 'Settings · Salon Console · Versani',
  description: 'Salon profile, branding, and data sharing.',
  robots: { index: false, follow: false },
}

export default function SalonSettingsPage() {
  const { profile } = salonMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Settings"
        title="Salon settings"
        subtitle="Profile, branding, data-sharing, and notifications."
      />

      <DataCard title="Profile" action={<Button variant="gold-outline" size="sm">Save</Button>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Salon name" defaultValue={profile.name} />
          <Field label="Location" defaultValue={profile.city} />
          <Field label="Timezone" defaultValue="America/New_York" />
          <Field label="Owner" defaultValue={profile.ownerName} />
        </div>
        <div className="mt-4">
          <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Logo
          </label>
          <div className="rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] p-6 text-center text-sm text-muted-foreground">
            Drop a PNG or SVG here, or click to upload.
          </div>
        </div>
      </DataCard>

      <DataCard
        title="Branding"
        description="These details appear on client-facing reports."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Accent color" defaultValue="#CDA77B" />
          <Field
            label="Custom domain (coming soon)"
            defaultValue="reports.santosalon.com"
            disabled
          />
        </div>
      </DataCard>

      <DataCard
        title="Data sharing"
        description="Default visibility of shared records across the team."
      >
        <div className="space-y-3">
          <RadioRow
            checked={profile.dataSharingDefault === 'team'}
            label="Whole team"
            description="Every stylist sees the full client database, inventory, and formula history."
          />
          <RadioRow
            checked={profile.dataSharingDefault === 'owner-only'}
            label="Owner-only"
            description="Only the owner and designated managers see shared records. Stylists see their own clients."
          />
        </div>
      </DataCard>

      <DataCard title="Notifications">
        <div className="space-y-3">
          <Toggle
            label="Weekly team digest"
            description="Every Monday at 8am local time."
            defaultChecked
          />
          <Toggle
            label="Low-performer alerts"
            description="Alert when a stylist's rolling score drops below 7.5."
            defaultChecked
          />
          <Toggle
            label="New invitation accepted"
            description="Ping when a new stylist joins."
            defaultChecked
          />
        </div>
      </DataCard>

      <DataCard title="Danger zone">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-foreground">Pause salon</div>
              <div className="text-xs text-muted-foreground">
                Freeze billing and suspend team access while you regroup.
              </div>
            </div>
            <Button variant="gold-outline" size="sm">
              Pause
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-foreground">Export data</div>
              <div className="text-xs text-muted-foreground">
                Download a ZIP of your salon's records.
              </div>
            </div>
            <Button variant="gold-outline" size="sm">
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-rose-200">Delete salon</div>
              <div className="text-xs text-muted-foreground">
                Permanent. Removes all team access and operational data.
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-rose-200">
              Delete
            </Button>
          </div>
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

function RadioRow({
  checked,
  label,
  description,
}: {
  checked: boolean
  label: string
  description: string
}) {
  return (
    <label className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] cursor-pointer">
      <span
        className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
          checked ? 'border-gold' : 'border-white/20'
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-gold" />}
      </span>
      <div>
        <div className="text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
    </label>
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
