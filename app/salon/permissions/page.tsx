import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { PermissionGrantTable } from '@/components/team/PermissionGrantTable'
import { salonMock } from '@/lib/mock/salons'

export const metadata: Metadata = {
  title: 'Permissions · Salon Console · Versani',
  description: 'Grant specific reports to managers.',
  robots: { index: false, follow: false },
}

const reportRows = [
  {
    key: 'teamHeartbeat',
    label: 'Team heartbeat',
    description: 'Dashboard-level team overview, score averages, activity feed.',
  },
  {
    key: 'comparableReports',
    label: 'Comparable reports',
    description: 'The side-by-side stylist comparison builder.',
  },
  {
    key: 'individualDrilldowns',
    label: 'Individual drill-downs',
    description: 'Per-stylist score trends, retention, and service mix.',
  },
  {
    key: 'inventory',
    label: 'Inventory',
    description: 'Shared product lines and usage across the team.',
  },
  {
    key: 'clients',
    label: 'Clients',
    description: 'Shared client database, LTV, and retention.',
  },
  {
    key: 'operations',
    label: 'Operations',
    description: 'MRR, seat utilization, and team health score.',
  },
  {
    key: 'billing',
    label: 'Billing',
    description: 'Invoices, Stripe portal, payment method.',
  },
  {
    key: 'settings',
    label: 'Settings',
    description: 'Salon profile, branding, data sharing defaults.',
  },
]

export default function SalonPermissionsPage() {
  const managerGrants = salonMock.managerPermissions[0]
  const manager = salonMock.stylists.find((s) => s.id === managerGrants?.managerId)

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Permissions"
        title="Manager permissions"
        subtitle="Grant specific reports to each manager. Stylists see their own work in the app — not here."
      />

      <PrivacyNotice>
        Zero-trust by default. Managers start with no access until you grant
        each report individually. Stylists never have access to web oversight;
        they see their own performance inside the Versani app.
      </PrivacyNotice>

      {manager && managerGrants && (
        <PermissionGrantTable
          subject={{
            id: manager.id,
            name: manager.name,
            context: 'Granting access to',
          }}
          rows={reportRows}
          initialGrants={managerGrants.grants}
        />
      )}

      {salonMock.stylists.filter((s) => s.role === 'manager').length === 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Promote a stylist to manager to grant web-dashboard access.
          </p>
        </div>
      )}
    </div>
  )
}
