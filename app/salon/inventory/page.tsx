import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { StatusBadge } from '@/components/team/StatusBadge'
import { MiniSparkline } from '@/components/team/MiniSparkline'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { Button } from '@/components/ui/Button'
import { salonMock } from '@/lib/mock/salons'

export const metadata: Metadata = {
  title: 'Inventory · Salon Console · Versani',
  description: 'Shared product inventory for the salon team.',
  robots: { index: false, follow: false },
}

const manufacturers: Array<'Goldwell' | 'Redken' | 'Wella' | 'Schwarzkopf'> = [
  'Goldwell',
  'Redken',
  'Wella',
  'Schwarzkopf',
]

export default function SalonInventoryPage() {
  const { inventory, stylists } = salonMock

  const stylistName = (id: string) =>
    stylists.find((s) => s.id === id)?.name.split(' ')[0] ?? '—'

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Inventory"
        title="Shared inventory"
        subtitle="The product lines your team is using across consultations."
        right={
          <Button variant="gold-solid" size="sm">
            Add product line
          </Button>
        }
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {manufacturers.map((m) => {
          const lines = inventory.filter((i) => i.manufacturer === m)
          return (
            <div
              key={m}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-gold">
                {m}
              </div>
              <div className="font-serif text-3xl text-foreground mt-2">
                {lines.length}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Lines tracked
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                Used by {new Set(lines.flatMap((l) => l.assignedTo)).size}{' '}
                stylist
                {new Set(lines.flatMap((l) => l.assignedTo)).size === 1
                  ? ''
                  : 's'}
              </div>
            </div>
          )
        })}
      </section>

      <DataCard title="Product lines">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Line</th>
                <th className="text-left py-2 font-normal">Manufacturer</th>
                <th className="text-left py-2 font-normal">Last used</th>
                <th className="text-left py-2 font-normal">Usage trend</th>
                <th className="text-left py-2 font-normal">Assigned to</th>
                <th className="text-left py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((line) => (
                <tr
                  key={line.id}
                  className="border-b border-white/[0.04] last:border-b-0"
                >
                  <td className="py-3 text-foreground">{line.name}</td>
                  <td className="py-3 text-muted-foreground">
                    {line.manufacturer}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {line.lastUsed}
                  </td>
                  <td className="py-3">
                    <MiniSparkline
                      data={line.usageTrend}
                      width={84}
                      height={22}
                    />
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {line.assignedTo.map(stylistName).join(', ')}
                  </td>
                  <td className="py-3">
                    <StatusBadge
                      status={line.status === 'active' ? 'active' : 'low'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>

      <PrivacyNotice>
        Inventory is shared across everyone on your team. Adjust who can see
        product assignments in{' '}
        <a
          href="/salon/settings"
          className="text-gold hover:text-gold-light underline underline-offset-4"
        >
          Settings → Data sharing
        </a>
        .
      </PrivacyNotice>
    </div>
  )
}
