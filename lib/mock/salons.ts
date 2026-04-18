/**
 * Mock data for Salon oversight dashboards.
 *
 * SOURCE OF TRUTH: This data mirrors the shape we expect from
 * OpenServ's multi-tenant backend (see MULTI-TENANT-REQUIREMENTS.md).
 * Swap these mocks for real Supabase queries when the backend ships.
 */

export type Role = 'owner' | 'manager' | 'stylist'
export type Tier = 'Pro' | 'Studio' | 'Studio Plus'
export type MemberStatus = 'active' | 'pending' | 'invited' | 'paused'

export interface Stylist {
  id: string
  name: string
  role: Role
  tier: Tier
  scoreAvg: number
  consultationsThisMonth: number
  retentionRate: number
  lastActive: string
  status: MemberStatus
  joinedAt: string
  specialty?: string
  scoreTrend: number[] // 30 data points, 0-10 range
}

export interface InventoryLine {
  id: string
  name: string
  manufacturer: 'Goldwell' | 'Redken' | 'Wella' | 'Schwarzkopf'
  lastUsed: string
  usageTrend: number[]
  assignedTo: string[]
  status: 'active' | 'low' | 'archived'
}

export interface SalonClient {
  id: string
  name: string
  assignedStylist: string
  lastVisit: string
  ltv: number
  retentionScore: number
  status: 'active' | 'at-risk' | 'lapsed'
}

export interface SalonActivity {
  id: string
  timestamp: string
  actor: string
  type:
    | 'consultation'
    | 'invitation'
    | 'scoring'
    | 'feedback'
    | 'seat-change'
    | 'client-added'
  summary: string
}

export const salonMock = {
  profile: {
    name: 'Santo Salon & Spa',
    city: 'Westchester, NY',
    activeSeats: 8,
    maxSeats: 8,
    tier: 'Salon Option B',
    joinedAt: '2025-10-15',
    mrrContribution: 319.92,
    nextRenewal: '2026-05-15',
    ownerName: 'Santo De Luca',
    dataSharingDefault: 'team' as 'team' | 'owner-only',
  },
  stylists: [
    {
      id: 's1',
      name: 'Sarah Chen',
      role: 'stylist',
      tier: 'Studio',
      scoreAvg: 8.7,
      consultationsThisMonth: 47,
      retentionRate: 0.89,
      lastActive: '2h ago',
      status: 'active',
      joinedAt: '2025-10-15',
      specialty: 'Balayage',
      scoreTrend: [8.2, 8.3, 8.4, 8.6, 8.5, 8.7, 8.8, 8.6, 8.9, 8.7, 8.8, 8.7, 8.9, 8.8, 8.7, 8.6, 8.7, 8.8, 8.9, 8.7, 8.6, 8.8, 8.7, 8.9, 8.8, 8.7, 8.6, 8.8, 8.7, 8.9],
    },
    {
      id: 's2',
      name: 'Marcus Williams',
      role: 'stylist',
      tier: 'Studio',
      scoreAvg: 8.4,
      consultationsThisMonth: 42,
      retentionRate: 0.85,
      lastActive: '1h ago',
      status: 'active',
      joinedAt: '2025-10-15',
      specialty: 'Gray Coverage',
      scoreTrend: [8.0, 8.1, 8.2, 8.3, 8.2, 8.4, 8.3, 8.4, 8.5, 8.4, 8.3, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.3, 8.4, 8.4, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4],
    },
    {
      id: 's3',
      name: 'Priya Patel',
      role: 'stylist',
      tier: 'Pro',
      scoreAvg: 8.9,
      consultationsThisMonth: 51,
      retentionRate: 0.92,
      lastActive: '30m ago',
      status: 'active',
      joinedAt: '2025-11-02',
      specialty: 'Color Correction',
      scoreTrend: [8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 8.9, 8.8, 9.0, 8.9, 8.8, 9.1, 8.9, 9.0, 8.9, 8.8, 9.0, 8.9, 9.0, 8.9, 8.8, 9.0, 8.9, 8.9, 9.0, 8.9, 8.8, 9.0, 8.9, 9.0],
    },
    {
      id: 's4',
      name: 'Jordan Rivera',
      role: 'manager',
      tier: 'Studio Plus',
      scoreAvg: 9.1,
      consultationsThisMonth: 38,
      retentionRate: 0.94,
      lastActive: '15m ago',
      status: 'active',
      joinedAt: '2025-10-15',
      specialty: 'Editorial',
      scoreTrend: [8.8, 8.9, 9.0, 9.1, 9.0, 9.2, 9.1, 9.0, 9.2, 9.1, 9.0, 9.1, 9.2, 9.1, 9.0, 9.2, 9.1, 9.0, 9.1, 9.2, 9.1, 9.0, 9.1, 9.2, 9.1, 9.0, 9.2, 9.1, 9.0, 9.1],
    },
    {
      id: 's5',
      name: 'Amira Hassan',
      role: 'stylist',
      tier: 'Studio',
      scoreAvg: 7.8,
      consultationsThisMonth: 28,
      retentionRate: 0.76,
      lastActive: '1d ago',
      status: 'active',
      joinedAt: '2025-12-01',
      specialty: 'Foundation',
      scoreTrend: [7.5, 7.6, 7.7, 7.6, 7.8, 7.7, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.8, 7.9, 7.8],
    },
    {
      id: 's6',
      name: 'Lena Okonkwo',
      role: 'stylist',
      tier: 'Pro',
      scoreAvg: 8.2,
      consultationsThisMonth: 35,
      retentionRate: 0.81,
      lastActive: '5h ago',
      status: 'active',
      joinedAt: '2026-01-10',
      specialty: 'Vivids',
      scoreTrend: [7.9, 8.0, 8.1, 8.0, 8.2, 8.1, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.1, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.2, 8.3, 8.2],
    },
    {
      id: 's7',
      name: 'Diego Alvarez',
      role: 'stylist',
      tier: 'Pro',
      scoreAvg: 7.5,
      consultationsThisMonth: 22,
      retentionRate: 0.73,
      lastActive: '3h ago',
      status: 'active',
      joinedAt: '2026-02-20',
      specialty: 'Men\u2019s Color',
      scoreTrend: [7.2, 7.3, 7.4, 7.3, 7.5, 7.4, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.5, 7.6, 7.5],
    },
    {
      id: 's8',
      name: 'Kai Tanaka',
      role: 'stylist',
      tier: 'Studio',
      scoreAvg: 8.6,
      consultationsThisMonth: 44,
      retentionRate: 0.88,
      lastActive: '45m ago',
      status: 'active',
      joinedAt: '2025-11-20',
      specialty: 'Toning',
      scoreTrend: [8.3, 8.4, 8.5, 8.4, 8.6, 8.5, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.5, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.6, 8.7, 8.6],
    },
  ] as Stylist[],
  invitations: [
    {
      email: 'jessica.lee@example.com',
      role: 'stylist' as Role,
      sentAt: '2026-04-10',
      status: 'pending' as const,
    },
    {
      email: 'marco.benetti@example.com',
      role: 'stylist' as Role,
      sentAt: '2026-04-14',
      status: 'pending' as const,
    },
  ],
  inventory: [
    { id: 'inv1', name: 'Topchic Permanent', manufacturer: 'Goldwell', lastUsed: '2h ago', usageTrend: [3, 5, 4, 6, 8, 7, 9, 8, 7, 9, 8, 10, 9, 11], assignedTo: ['s1', 's4', 's8'], status: 'active' },
    { id: 'inv2', name: 'Colorance Demi', manufacturer: 'Goldwell', lastUsed: '5h ago', usageTrend: [2, 3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 8, 9], assignedTo: ['s2', 's3'], status: 'active' },
    { id: 'inv3', name: 'Elumen Direct', manufacturer: 'Goldwell', lastUsed: '1d ago', usageTrend: [1, 2, 1, 3, 2, 4, 3, 5, 4, 5, 4, 6, 5, 7], assignedTo: ['s6'], status: 'low' },
    { id: 'inv4', name: 'Shades EQ Gloss', manufacturer: 'Redken', lastUsed: '1h ago', usageTrend: [5, 6, 7, 8, 7, 9, 10, 9, 11, 10, 12, 11, 13, 12], assignedTo: ['s1', 's2', 's3', 's4'], status: 'active' },
    { id: 'inv5', name: 'Color Gels Lacquers', manufacturer: 'Redken', lastUsed: '3h ago', usageTrend: [4, 5, 4, 6, 5, 7, 6, 8, 7, 8, 7, 9, 8, 10], assignedTo: ['s2', 's5'], status: 'active' },
    { id: 'inv6', name: 'Chromatics', manufacturer: 'Redken', lastUsed: '2d ago', usageTrend: [2, 1, 3, 2, 4, 3, 2, 4, 3, 5, 4, 3, 5, 4], assignedTo: ['s7'], status: 'low' },
    { id: 'inv7', name: 'Koleston Perfect', manufacturer: 'Wella', lastUsed: '30m ago', usageTrend: [6, 7, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 12, 13], assignedTo: ['s1', 's3', 's4', 's8'], status: 'active' },
    { id: 'inv8', name: 'Color Touch', manufacturer: 'Wella', lastUsed: '4h ago', usageTrend: [3, 4, 5, 4, 6, 5, 7, 6, 7, 6, 8, 7, 8, 9], assignedTo: ['s2', 's5', 's6'], status: 'active' },
    { id: 'inv9', name: 'Illumina Color', manufacturer: 'Wella', lastUsed: '6h ago', usageTrend: [2, 3, 2, 4, 3, 5, 4, 5, 4, 6, 5, 6, 5, 7], assignedTo: ['s3', 's4'], status: 'active' },
    { id: 'inv10', name: 'IGORA Royal', manufacturer: 'Schwarzkopf', lastUsed: '1h ago', usageTrend: [4, 5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 10, 11], assignedTo: ['s1', 's4', 's6'], status: 'active' },
    { id: 'inv11', name: 'IGORA Vibrance', manufacturer: 'Schwarzkopf', lastUsed: '5h ago', usageTrend: [3, 4, 3, 5, 4, 6, 5, 7, 6, 7, 6, 8, 7, 8], assignedTo: ['s2', 's6'], status: 'active' },
    { id: 'inv12', name: 'BlondMe Premium', manufacturer: 'Schwarzkopf', lastUsed: '3d ago', usageTrend: [1, 2, 1, 2, 3, 2, 3, 2, 3, 2, 4, 3, 3, 4], assignedTo: ['s7'], status: 'low' },
  ] as InventoryLine[],
  clients: [
    { id: 'c1', name: 'Isabella Romano', assignedStylist: 'Jordan Rivera', lastVisit: '2026-04-12', ltv: 4280, retentionScore: 0.94, status: 'active' },
    { id: 'c2', name: 'Megan O\u2019Connell', assignedStylist: 'Sarah Chen', lastVisit: '2026-04-09', ltv: 3110, retentionScore: 0.88, status: 'active' },
    { id: 'c3', name: 'Felicia Moretti', assignedStylist: 'Priya Patel', lastVisit: '2026-04-15', ltv: 5640, retentionScore: 0.96, status: 'active' },
    { id: 'c4', name: 'Rachel Goldman', assignedStylist: 'Jordan Rivera', lastVisit: '2026-02-28', ltv: 2180, retentionScore: 0.62, status: 'at-risk' },
    { id: 'c5', name: 'Yuki Nakamura', assignedStylist: 'Kai Tanaka', lastVisit: '2026-04-11', ltv: 2950, retentionScore: 0.85, status: 'active' },
    { id: 'c6', name: 'Delphine Martin', assignedStylist: 'Sarah Chen', lastVisit: '2026-03-01', ltv: 1840, retentionScore: 0.58, status: 'at-risk' },
    { id: 'c7', name: 'Olivia Birchwood', assignedStylist: 'Marcus Williams', lastVisit: '2026-04-08', ltv: 2330, retentionScore: 0.81, status: 'active' },
    { id: 'c8', name: 'Amanda Clarkson', assignedStylist: 'Lena Okonkwo', lastVisit: '2026-04-14', ltv: 1960, retentionScore: 0.79, status: 'active' },
    { id: 'c9', name: 'Harper Whitfield', assignedStylist: 'Priya Patel', lastVisit: '2026-04-10', ltv: 3890, retentionScore: 0.91, status: 'active' },
    { id: 'c10', name: 'Simone Ashworth', assignedStylist: 'Kai Tanaka', lastVisit: '2026-01-18', ltv: 1120, retentionScore: 0.45, status: 'lapsed' },
    { id: 'c11', name: 'Valerie Thompson', assignedStylist: 'Jordan Rivera', lastVisit: '2026-04-13', ltv: 4510, retentionScore: 0.93, status: 'active' },
    { id: 'c12', name: 'Gemma Holloway', assignedStylist: 'Diego Alvarez', lastVisit: '2026-04-05', ltv: 1420, retentionScore: 0.72, status: 'active' },
    { id: 'c13', name: 'Camille Dubois', assignedStylist: 'Amira Hassan', lastVisit: '2026-03-25', ltv: 980, retentionScore: 0.68, status: 'at-risk' },
    { id: 'c14', name: 'Sofia Kuznetsova', assignedStylist: 'Sarah Chen', lastVisit: '2026-04-12', ltv: 3220, retentionScore: 0.86, status: 'active' },
    { id: 'c15', name: 'Beatrice Albright', assignedStylist: 'Marcus Williams', lastVisit: '2026-02-10', ltv: 1540, retentionScore: 0.52, status: 'at-risk' },
    { id: 'c16', name: 'Natalia Volkova', assignedStylist: 'Priya Patel', lastVisit: '2026-04-16', ltv: 6140, retentionScore: 0.97, status: 'active' },
    { id: 'c17', name: 'Elena Castaneda', assignedStylist: 'Lena Okonkwo', lastVisit: '2026-04-07', ltv: 2070, retentionScore: 0.80, status: 'active' },
    { id: 'c18', name: 'Tessa Bellamy', assignedStylist: 'Jordan Rivera', lastVisit: '2025-12-12', ltv: 860, retentionScore: 0.38, status: 'lapsed' },
    { id: 'c19', name: 'Cora Halvorsen', assignedStylist: 'Kai Tanaka', lastVisit: '2026-04-14', ltv: 2680, retentionScore: 0.84, status: 'active' },
    { id: 'c20', name: 'Priyanka Desai', assignedStylist: 'Sarah Chen', lastVisit: '2026-04-09', ltv: 3450, retentionScore: 0.89, status: 'active' },
  ] as SalonClient[],
  totalClientCount: 247,
  aggregateMetrics: {
    totalConsultationsThisMonth: 307,
    teamScoreAvg: 8.4,
    topPerformer: 'Jordan Rivera',
    revenueContributionLTM: 51234,
    clientRetentionRate: 0.85,
    teamHealthScore: 87, // 0-100 composite
  },
  recentActivity: [
    { id: 'a1', timestamp: '2026-04-18T09:32:00', actor: 'Priya Patel', type: 'consultation', summary: 'Completed corrective color consultation for Natalia Volkova' },
    { id: 'a2', timestamp: '2026-04-18T08:14:00', actor: 'Jordan Rivera', type: 'scoring', summary: 'Scored a 9.4 on balayage formula for Isabella Romano' },
    { id: 'a3', timestamp: '2026-04-17T18:45:00', actor: 'Sarah Chen', type: 'consultation', summary: 'Completed consultation for Megan O\u2019Connell' },
    { id: 'a4', timestamp: '2026-04-17T14:22:00', actor: 'System', type: 'invitation', summary: 'Invitation sent to marco.benetti@example.com' },
    { id: 'a5', timestamp: '2026-04-17T11:08:00', actor: 'Kai Tanaka', type: 'consultation', summary: 'Completed toning consultation for Yuki Nakamura' },
    { id: 'a6', timestamp: '2026-04-17T09:55:00', actor: 'Marcus Williams', type: 'feedback', summary: 'Left feedback note on Olivia Birchwood\u2019s formula history' },
    { id: 'a7', timestamp: '2026-04-16T16:30:00', actor: 'Lena Okonkwo', type: 'client-added', summary: 'Added new client: Amanda Clarkson' },
    { id: 'a8', timestamp: '2026-04-16T13:17:00', actor: 'Priya Patel', type: 'scoring', summary: 'Scored a 9.1 on gray coverage formula' },
    { id: 'a9', timestamp: '2026-04-16T10:40:00', actor: 'Santo De Luca', type: 'seat-change', summary: 'Seat allocation reviewed — 8 of 8 active' },
    { id: 'a10', timestamp: '2026-04-15T20:11:00', actor: 'System', type: 'invitation', summary: 'Invitation sent to jessica.lee@example.com' },
  ] as SalonActivity[],
  mrrHistory: [
    { month: '2025-05', mrr: 0 },
    { month: '2025-06', mrr: 0 },
    { month: '2025-07', mrr: 0 },
    { month: '2025-08', mrr: 0 },
    { month: '2025-09', mrr: 0 },
    { month: '2025-10', mrr: 199.95 },
    { month: '2025-11', mrr: 239.94 },
    { month: '2025-12', mrr: 239.94 },
    { month: '2026-01', mrr: 279.93 },
    { month: '2026-02', mrr: 319.92 },
    { month: '2026-03', mrr: 319.92 },
    { month: '2026-04', mrr: 319.92 },
  ],
  managerPermissions: [
    {
      managerId: 's4',
      grants: {
        teamHeartbeat: true,
        comparableReports: true,
        individualDrilldowns: true,
        inventory: true,
        clients: true,
        operations: false,
        billing: false,
        settings: false,
      },
    },
  ],
  invoiceHistory: [
    { id: 'inv-2025-10', date: '2025-10-15', amount: 199.95, status: 'paid' },
    { id: 'inv-2025-11', date: '2025-11-15', amount: 239.94, status: 'paid' },
    { id: 'inv-2025-12', date: '2025-12-15', amount: 239.94, status: 'paid' },
    { id: 'inv-2026-01', date: '2026-01-15', amount: 279.93, status: 'paid' },
    { id: 'inv-2026-02', date: '2026-02-15', amount: 319.92, status: 'paid' },
    { id: 'inv-2026-03', date: '2026-03-15', amount: 319.92, status: 'paid' },
  ],
}

/**
 * Service mix breakdown shown on stylist drill-down pages.
 * Keyed by stylist ID so we can surface realistic variance.
 */
export const serviceMixByStylist: Record<
  string,
  Array<{ service: string; pct: number }>
> = {
  s1: [
    { service: 'Balayage', pct: 42 },
    { service: 'Single-process', pct: 24 },
    { service: 'Highlights', pct: 18 },
    { service: 'Toner', pct: 12 },
    { service: 'Gloss', pct: 4 },
  ],
  s2: [
    { service: 'Gray Coverage', pct: 38 },
    { service: 'Single-process', pct: 28 },
    { service: 'Toner', pct: 18 },
    { service: 'Highlights', pct: 12 },
    { service: 'Other', pct: 4 },
  ],
  s3: [
    { service: 'Color Correction', pct: 48 },
    { service: 'Balayage', pct: 22 },
    { service: 'Highlights', pct: 14 },
    { service: 'Toner', pct: 10 },
    { service: 'Gloss', pct: 6 },
  ],
  s4: [
    { service: 'Editorial', pct: 30 },
    { service: 'Balayage', pct: 28 },
    { service: 'Vivids', pct: 22 },
    { service: 'Color Correction', pct: 12 },
    { service: 'Toner', pct: 8 },
  ],
  s5: [
    { service: 'Single-process', pct: 44 },
    { service: 'Gray Coverage', pct: 24 },
    { service: 'Toner', pct: 18 },
    { service: 'Highlights', pct: 10 },
    { service: 'Other', pct: 4 },
  ],
  s6: [
    { service: 'Vivids', pct: 36 },
    { service: 'Balayage', pct: 24 },
    { service: 'Color Correction', pct: 18 },
    { service: 'Toner', pct: 14 },
    { service: 'Highlights', pct: 8 },
  ],
  s7: [
    { service: 'Men\u2019s Color', pct: 52 },
    { service: 'Gray Coverage', pct: 22 },
    { service: 'Single-process', pct: 16 },
    { service: 'Toner', pct: 8 },
    { service: 'Other', pct: 2 },
  ],
  s8: [
    { service: 'Toner', pct: 38 },
    { service: 'Balayage', pct: 24 },
    { service: 'Gloss', pct: 18 },
    { service: 'Highlights', pct: 14 },
    { service: 'Single-process', pct: 6 },
  ],
}

export function findStylist(id: string): Stylist | undefined {
  return salonMock.stylists.find((s) => s.id === id)
}
