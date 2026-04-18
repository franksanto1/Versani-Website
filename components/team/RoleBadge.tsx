import { cn } from '@/lib/cn'

type RoleKey =
  | 'owner'
  | 'manager'
  | 'stylist'
  | 'student'
  | 'instructor'
  | 'admin'

const styles: Record<RoleKey, string> = {
  owner: 'bg-gold/10 border-gold/40 text-gold',
  manager: 'bg-amber-400/10 border-amber-400/30 text-amber-200',
  stylist: 'bg-white/[0.04] border-white/10 text-muted-foreground',
  student: 'bg-white/[0.04] border-white/10 text-muted-foreground',
  instructor: 'bg-sky-400/10 border-sky-400/30 text-sky-200',
  admin: 'bg-gold/10 border-gold/40 text-gold',
}

const labels: Record<RoleKey, string> = {
  owner: 'Owner',
  manager: 'Manager',
  stylist: 'Stylist',
  student: 'Student',
  instructor: 'Instructor',
  admin: 'Admin',
}

export function RoleBadge({
  role,
  className,
}: {
  role: RoleKey
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] border',
        styles[role],
        className
      )}
    >
      {labels[role]}
    </span>
  )
}
