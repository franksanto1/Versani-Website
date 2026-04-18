import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { InviteForm } from '@/components/team/InviteForm'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { salonMock } from '@/lib/mock/salons'
import { formatCurrency, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Invite stylists · Salon Console · Versani',
  description: 'Send invitations to new stylists.',
  robots: { index: false, follow: false },
}

export default function SalonInvitePage() {
  const { invitations, profile } = salonMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Team"
        title="Invite stylists"
        subtitle="Send an invitation link. Each seat is billed at $39.99/month."
      />

      <PrivacyNotice>
        You have <strong>0 available seats</strong> on {profile.tier}. Adding a
        stylist will prorate an additional seat on your next invoice
        ({formatDate(profile.nextRenewal)}) for{' '}
        {formatCurrency(39.99)} per stylist.
      </PrivacyNotice>

      <InviteForm
        roles={[
          { value: 'stylist', label: 'Stylist' },
          { value: 'manager', label: 'Manager' },
        ]}
        hint="We'll email this person a secure link. They join by creating or signing into their Versani account."
      />

      <DataCard title="Pending invitations">
        {invitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending invitations.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Email</th>
                <th className="text-left py-2 font-normal">Role</th>
                <th className="text-left py-2 font-normal">Sent</th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv) => (
                <tr key={inv.email} className="border-b border-white/[0.04] last:border-b-0">
                  <td className="py-3 text-foreground">{inv.email}</td>
                  <td className="py-3 text-muted-foreground capitalize">
                    {inv.role}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {formatDate(inv.sentAt)}
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light">
                      Resend
                    </button>
                    <span className="mx-2 text-muted-foreground/40">·</span>
                    <button className="text-xs uppercase tracking-[0.18em] text-rose-300 hover:text-rose-200">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DataCard>
    </div>
  )
}
