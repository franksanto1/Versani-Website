import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { InviteForm } from '@/components/team/InviteForm'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { schoolMock } from '@/lib/mock/schools'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Invite students · School Console · Versani',
  description: 'Send invitations to students (single or CSV bulk).',
  robots: { index: false, follow: false },
}

export default function SchoolInviteStudentsPage() {
  const pending = schoolMock.invitations.filter(
    (inv) => inv.role === 'student'
  )

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Students"
        title="Invite students"
        subtitle="Each base seat is $8.99/month. Students can upgrade themselves to Pro ($9.99/month) directly with Versani."
      />

      <PrivacyNotice>
        Students join at the Base tier by default. Their personal performance
        reports live inside the Versani app — they do not see the web dashboard.
        Your instructors see students only within classes you grant them.
      </PrivacyNotice>

      <InviteForm
        roles={[
          { value: 'student', label: 'Student' },
        ]}
        allowBulk
        hint="Each added student adds $8.99/month to your school's base plan. Changes prorate at your next renewal."
        extraField={
          <div>
            <label
              htmlFor="invite-class"
              className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Default class
            </label>
            <select
              id="invite-class"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground focus:outline-none focus:border-gold/50"
            >
              {schoolMock.classes.map((c) => (
                <option key={c.id} value={c.id} className="bg-background">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <DataCard title="Pending student invitations">
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending student invitations.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Email</th>
                <th className="text-left py-2 font-normal">Sent</th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((inv) => (
                <tr key={inv.email} className="border-b border-white/[0.04] last:border-b-0">
                  <td className="py-3 text-foreground">{inv.email}</td>
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
