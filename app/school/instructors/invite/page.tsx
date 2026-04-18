import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { InviteForm } from '@/components/team/InviteForm'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'

export const metadata: Metadata = {
  title: 'Invite instructor · School Console · Versani',
  description: 'Add a new instructor to your faculty.',
  robots: { index: false, follow: false },
}

export default function InviteInstructorPage() {
  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Instructors"
        title="Invite an instructor"
        subtitle="Instructors are included in your base plan. Scope their access after they accept."
      />

      <PrivacyNotice>
        Newly invited instructors start with no class access. Grant access
        explicitly from{' '}
        <a
          href="/school/permissions"
          className="text-gold hover:text-gold-light underline underline-offset-4"
        >
          Permissions
        </a>{' '}
        after they accept their invitation.
      </PrivacyNotice>

      <InviteForm
        roles={[{ value: 'instructor', label: 'Instructor' }]}
        hint="Instructors count against your faculty quota, not your student base seats."
        defaultMessage="Welcome to Versani. Once you accept, your school admin will assign the classes you'll oversee."
      />
    </div>
  )
}
