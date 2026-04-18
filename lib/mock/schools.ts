/**
 * Mock data for Beauty School oversight dashboards.
 *
 * Scope-based permissions: instructors see only the classes they're granted.
 * See permissionGrants for current assignments.
 */

export type SchoolRole = 'admin' | 'owner' | 'instructor' | 'student'
export type StudentTier = 'Base' | 'Pro Upgraded'
export type StudentStatus = 'active' | 'pending' | 'invited' | 'paused' | 'graduated'

export interface Student {
  id: string
  name: string
  year: 'Year 1' | 'Year 2'
  tier: StudentTier
  scoreAvg: number
  coursesEnrolled: number
  coursesCompleted: number
  classIds: string[]
  lastActive: string
  status: StudentStatus
  joinedAt: string
  scoreTrend: number[]
  /** Used on dashboard "trending up / at risk" sections */
  trajectory?: 'up' | 'flat' | 'at-risk'
}

export interface Instructor {
  id: string
  name: string
  specialty: string
  studentsAssigned: number
  classesAssigned: string[] // class IDs
  status: 'active' | 'paused'
  joinedAt: string
}

export interface SchoolClass {
  id: string
  name: string
  instructorId: string
  instructor: string
  enrolled: number
  avgScore: number
  completion: number
  description: string
  startDate: string
  endDate: string
}

export interface SchoolActivity {
  id: string
  timestamp: string
  actor: string
  type:
    | 'submission'
    | 'grade'
    | 'invitation'
    | 'enrollment'
    | 'upgrade'
    | 'graduation'
    | 'feedback'
  summary: string
}

export interface Submission {
  id: string
  studentId: string
  studentName: string
  classId: string
  className: string
  assignment: string
  submittedAt: string
  status: 'pending' | 'graded'
  grade?: string
  feedback?: string
}

export const schoolMock = {
  profile: {
    name: 'Paul Mitchell Academy - Denver',
    city: 'Denver, CO',
    activeStudents: 42,
    maxStudents: 100,
    proUpgrades: 18,
    activeInstructors: 4,
    courses: 6,
    term: 'Spring 2026',
    termStart: '2026-01-15',
    termEnd: '2026-05-30',
    joinedAt: '2025-09-01',
    mrrFromBase: 377.58,
    mrrFromUpgrades: 179.82,
    totalMRR: 557.4,
    nextRenewal: '2026-05-01',
    adminName: 'Dr. Patricia Vance',
  },
  students: [
    { id: 'st1', name: 'Emma Rodriguez', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.3, coursesEnrolled: 3, coursesCompleted: 5, classIds: ['c1', 'c3', 'c6'], lastActive: '1h ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [7.8, 7.9, 8.0, 8.1, 8.0, 8.2, 8.1, 8.3, 8.2, 8.1, 8.3, 8.2, 8.4, 8.3, 8.2, 8.3, 8.4, 8.3, 8.2, 8.4, 8.3, 8.2, 8.3, 8.4, 8.3, 8.2, 8.3, 8.4, 8.3, 8.4], trajectory: 'up' },
    { id: 'st2', name: 'Jaylen Brooks', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.7, coursesEnrolled: 2, coursesCompleted: 6, classIds: ['c2', 'c6'], lastActive: '30m ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [8.2, 8.3, 8.4, 8.5, 8.6, 8.5, 8.7, 8.6, 8.8, 8.7, 8.6, 8.8, 8.7, 8.6, 8.8, 8.7, 8.6, 8.7, 8.8, 8.7, 8.6, 8.8, 8.7, 8.6, 8.7, 8.8, 8.7, 8.8, 8.7, 8.8], trajectory: 'up' },
    { id: 'st3', name: 'Chloe Washington', year: 'Year 1', tier: 'Base', scoreAvg: 7.2, coursesEnrolled: 4, coursesCompleted: 2, classIds: ['c1', 'c3', 'c6', 'c4'], lastActive: '2h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.8, 6.9, 7.0, 6.9, 7.1, 7.0, 7.2, 7.1, 7.0, 7.2, 7.1, 7.3, 7.2, 7.1, 7.3, 7.2, 7.1, 7.2, 7.3, 7.2, 7.1, 7.3, 7.2, 7.1, 7.2, 7.3, 7.2, 7.3, 7.2, 7.3], trajectory: 'up' },
    { id: 'st4', name: 'Matteo Ricci', year: 'Year 1', tier: 'Base', scoreAvg: 6.1, coursesEnrolled: 3, coursesCompleted: 1, classIds: ['c1', 'c6'], lastActive: '3d ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.5, 6.3, 6.2, 6.4, 6.1, 6.3, 6.0, 6.2, 6.1, 5.9, 6.1, 6.0, 5.8, 6.0, 5.9, 6.1, 5.9, 5.8, 6.0, 5.9, 5.7, 5.9, 5.8, 6.0, 5.9, 5.7, 5.9, 5.8, 5.9, 6.1], trajectory: 'at-risk' },
    { id: 'st5', name: 'Aisha Okafor', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.9, coursesEnrolled: 2, coursesCompleted: 5, classIds: ['c2', 'c5'], lastActive: '15m ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [8.4, 8.5, 8.6, 8.7, 8.8, 8.7, 8.9, 8.8, 9.0, 8.9, 8.8, 9.0, 8.9, 8.8, 9.0, 8.9, 8.8, 8.9, 9.0, 8.9, 8.8, 9.0, 8.9, 8.8, 8.9, 9.0, 8.9, 9.0, 8.9, 9.0], trajectory: 'up' },
    { id: 'st6', name: 'Dylan Thornton', year: 'Year 1', tier: 'Base', scoreAvg: 6.8, coursesEnrolled: 3, coursesCompleted: 1, classIds: ['c1', 'c4', 'c6'], lastActive: '1d ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.4, 6.5, 6.6, 6.5, 6.7, 6.6, 6.8, 6.7, 6.6, 6.8, 6.7, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8, 6.9], trajectory: 'flat' },
    { id: 'st7', name: 'Zoe Castellanos', year: 'Year 1', tier: 'Pro Upgraded', scoreAvg: 7.9, coursesEnrolled: 3, coursesCompleted: 2, classIds: ['c1', 'c3', 'c6'], lastActive: '45m ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [7.4, 7.5, 7.6, 7.7, 7.6, 7.8, 7.7, 7.9, 7.8, 7.7, 7.9, 7.8, 8.0, 7.9, 7.8, 7.9, 8.0, 7.9, 7.8, 8.0, 7.9, 7.8, 7.9, 8.0, 7.9, 7.8, 7.9, 8.0, 7.9, 8.0], trajectory: 'up' },
    { id: 'st8', name: 'Ravi Subramanian', year: 'Year 2', tier: 'Base', scoreAvg: 7.5, coursesEnrolled: 2, coursesCompleted: 4, classIds: ['c3', 'c6'], lastActive: '4h ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [7.1, 7.2, 7.3, 7.2, 7.4, 7.3, 7.5, 7.4, 7.3, 7.5, 7.4, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.6], trajectory: 'flat' },
    { id: 'st9', name: 'Brianna Phillips', year: 'Year 1', tier: 'Base', scoreAvg: 5.8, coursesEnrolled: 3, coursesCompleted: 0, classIds: ['c1', 'c6', 'c4'], lastActive: '5d ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.2, 6.0, 5.9, 6.1, 5.8, 6.0, 5.7, 5.9, 5.8, 5.6, 5.8, 5.7, 5.5, 5.7, 5.6, 5.8, 5.6, 5.5, 5.7, 5.6, 5.4, 5.6, 5.5, 5.7, 5.6, 5.4, 5.6, 5.5, 5.6, 5.8], trajectory: 'at-risk' },
    { id: 'st10', name: 'Noah Fitzgerald', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.4, coursesEnrolled: 2, coursesCompleted: 5, classIds: ['c3', 'c5'], lastActive: '2h ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [7.9, 8.0, 8.1, 8.2, 8.1, 8.3, 8.2, 8.4, 8.3, 8.2, 8.4, 8.3, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.3, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.5], trajectory: 'up' },
    { id: 'st11', name: 'Mei Lin', year: 'Year 1', tier: 'Pro Upgraded', scoreAvg: 8.1, coursesEnrolled: 3, coursesCompleted: 2, classIds: ['c1', 'c3', 'c6'], lastActive: '1h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [7.6, 7.7, 7.8, 7.9, 7.8, 8.0, 7.9, 8.1, 8.0, 7.9, 8.1, 8.0, 8.2, 8.1, 8.0, 8.1, 8.2, 8.1, 8.0, 8.2, 8.1, 8.0, 8.1, 8.2, 8.1, 8.0, 8.1, 8.2, 8.1, 8.2], trajectory: 'up' },
    { id: 'st12', name: 'Oluwafemi Adebayo', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.6, coursesEnrolled: 2, coursesCompleted: 5, classIds: ['c2', 'c6'], lastActive: '20m ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [8.1, 8.2, 8.3, 8.4, 8.3, 8.5, 8.4, 8.6, 8.5, 8.4, 8.6, 8.5, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.5, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.5, 8.6, 8.7, 8.6, 8.7], trajectory: 'up' },
    { id: 'st13', name: 'Willa Bauman', year: 'Year 1', tier: 'Base', scoreAvg: 7.0, coursesEnrolled: 3, coursesCompleted: 1, classIds: ['c1', 'c6', 'c4'], lastActive: '6h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.6, 6.7, 6.8, 6.7, 6.9, 6.8, 7.0, 6.9, 6.8, 7.0, 6.9, 7.1, 7.0, 6.9, 7.0, 7.1, 7.0, 6.9, 7.0, 7.1, 7.0, 6.9, 7.0, 7.1, 7.0, 6.9, 7.0, 7.1, 7.0, 7.1], trajectory: 'flat' },
    { id: 'st14', name: 'Carlos Mendoza', year: 'Year 1', tier: 'Pro Upgraded', scoreAvg: 7.7, coursesEnrolled: 3, coursesCompleted: 2, classIds: ['c1', 'c3', 'c6'], lastActive: '3h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [7.2, 7.3, 7.4, 7.5, 7.4, 7.6, 7.5, 7.7, 7.6, 7.5, 7.7, 7.6, 7.8, 7.7, 7.6, 7.7, 7.8, 7.7, 7.6, 7.8, 7.7, 7.6, 7.7, 7.8, 7.7, 7.6, 7.7, 7.8, 7.7, 7.8], trajectory: 'up' },
    { id: 'st15', name: 'Svetlana Popov', year: 'Year 2', tier: 'Base', scoreAvg: 7.8, coursesEnrolled: 2, coursesCompleted: 4, classIds: ['c3', 'c6'], lastActive: '2h ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [7.4, 7.5, 7.6, 7.5, 7.7, 7.6, 7.8, 7.7, 7.6, 7.8, 7.7, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.9], trajectory: 'flat' },
    { id: 'st16', name: 'Henry Blackwood', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.2, coursesEnrolled: 2, coursesCompleted: 5, classIds: ['c2', 'c5'], lastActive: '50m ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [7.7, 7.8, 7.9, 8.0, 7.9, 8.1, 8.0, 8.2, 8.1, 8.0, 8.2, 8.1, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.1, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.1, 8.2, 8.3, 8.2, 8.3], trajectory: 'up' },
    { id: 'st17', name: 'Rosalind Beckwith', year: 'Year 1', tier: 'Base', scoreAvg: 6.5, coursesEnrolled: 3, coursesCompleted: 1, classIds: ['c1', 'c6', 'c4'], lastActive: '2d ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.9, 6.7, 6.6, 6.8, 6.5, 6.7, 6.4, 6.6, 6.5, 6.3, 6.5, 6.4, 6.2, 6.4, 6.3, 6.5, 6.3, 6.2, 6.4, 6.3, 6.1, 6.3, 6.2, 6.4, 6.3, 6.1, 6.3, 6.2, 6.3, 6.5], trajectory: 'at-risk' },
    { id: 'st18', name: 'Tariq Abdul-Malik', year: 'Year 1', tier: 'Pro Upgraded', scoreAvg: 7.6, coursesEnrolled: 3, coursesCompleted: 2, classIds: ['c1', 'c3', 'c6'], lastActive: '1h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [7.1, 7.2, 7.3, 7.4, 7.3, 7.5, 7.4, 7.6, 7.5, 7.4, 7.6, 7.5, 7.7, 7.6, 7.5, 7.6, 7.7, 7.6, 7.5, 7.7, 7.6, 7.5, 7.6, 7.7, 7.6, 7.5, 7.6, 7.7, 7.6, 7.7], trajectory: 'up' },
    { id: 'st19', name: 'Isla Marchetti', year: 'Year 2', tier: 'Pro Upgraded', scoreAvg: 8.5, coursesEnrolled: 2, coursesCompleted: 5, classIds: ['c2', 'c6'], lastActive: '10m ago', status: 'active', joinedAt: '2025-09-01', scoreTrend: [8.0, 8.1, 8.2, 8.3, 8.2, 8.4, 8.3, 8.5, 8.4, 8.3, 8.5, 8.4, 8.6, 8.5, 8.4, 8.5, 8.6, 8.5, 8.4, 8.6, 8.5, 8.4, 8.5, 8.6, 8.5, 8.4, 8.5, 8.6, 8.5, 8.6], trajectory: 'up' },
    { id: 'st20', name: 'Dimitri Varga', year: 'Year 1', tier: 'Base', scoreAvg: 6.9, coursesEnrolled: 3, coursesCompleted: 1, classIds: ['c1', 'c6', 'c4'], lastActive: '5h ago', status: 'active', joinedAt: '2026-01-15', scoreTrend: [6.5, 6.6, 6.7, 6.6, 6.8, 6.7, 6.9, 6.8, 6.7, 6.9, 6.8, 7.0, 6.9, 6.8, 6.9, 7.0, 6.9, 6.8, 6.9, 7.0, 6.9, 6.8, 6.9, 7.0, 6.9, 6.8, 6.9, 7.0, 6.9, 7.0], trajectory: 'flat' },
  ] as Student[],
  /** Graduation pipeline: students marked for graduation this term */
  graduatingThisTerm: ['st2', 'st5', 'st10', 'st12', 'st19'],
  instructors: [
    { id: 'i1', name: 'Rachel Kim', specialty: 'Color Correction', studentsAssigned: 15, classesAssigned: ['c1', 'c3'], status: 'active', joinedAt: '2024-08-15' },
    { id: 'i2', name: 'James Patterson', specialty: 'Balayage & Vivids', studentsAssigned: 12, classesAssigned: ['c2', 'c5'], status: 'active', joinedAt: '2023-09-01' },
    { id: 'i3', name: 'Nadia Volkov', specialty: 'Business & Color Theory', studentsAssigned: 8, classesAssigned: ['c1', 'c6'], status: 'active', joinedAt: '2025-01-10' },
    { id: 'i4', name: 'Eduardo Silva', specialty: 'Gray Coverage', studentsAssigned: 7, classesAssigned: ['c4'], status: 'active', joinedAt: '2024-09-01' },
  ] as Instructor[],
  classes: [
    { id: 'c1', name: 'Foundations of Color', instructorId: 'i1', instructor: 'Rachel Kim', enrolled: 14, avgScore: 7.8, completion: 0.62, description: 'Introduction to color theory, tonal families, and the chemistry of oxidative color.', startDate: '2026-01-15', endDate: '2026-05-30' },
    { id: 'c2', name: 'Balayage Mastery', instructorId: 'i2', instructor: 'James Patterson', enrolled: 8, avgScore: 8.5, completion: 0.78, description: 'Freehand painting techniques for dimensional, lived-in color.', startDate: '2026-01-15', endDate: '2026-05-30' },
    { id: 'c3', name: 'Corrective Color', instructorId: 'i1', instructor: 'Rachel Kim', enrolled: 12, avgScore: 8.1, completion: 0.45, description: 'Diagnosing and resolving unwanted tone, banding, and color build-up.', startDate: '2026-01-15', endDate: '2026-05-30' },
    { id: 'c4', name: 'Gray Coverage Techniques', instructorId: 'i4', instructor: 'Eduardo Silva', enrolled: 7, avgScore: 8.3, completion: 0.82, description: 'Coverage strategy, percentage gray assessment, and blending approaches.', startDate: '2026-01-15', endDate: '2026-05-30' },
    { id: 'c5', name: 'Editorial Vivids', instructorId: 'i2', instructor: 'James Patterson', enrolled: 4, avgScore: 8.9, completion: 0.95, description: 'High-impact creative color for photo work, competition, and advanced clientele.', startDate: '2026-01-15', endDate: '2026-05-30' },
    { id: 'c6', name: 'Business of Color', instructorId: 'i3', instructor: 'Nadia Volkov', enrolled: 42, avgScore: 7.2, completion: 0.35, description: 'Consultation, pricing, client communication, and building a sustainable book.', startDate: '2026-01-15', endDate: '2026-05-30' },
  ] as SchoolClass[],
  /** Scope-based grants: which classes each instructor can access on the web dashboard */
  permissionGrants: [
    { instructorId: 'i1', classIds: ['c1', 'c3'] },
    { instructorId: 'i2', classIds: ['c2', 'c5'] },
    { instructorId: 'i3', classIds: ['c1', 'c6'] },
    { instructorId: 'i4', classIds: ['c4'] },
  ],
  invitations: [
    { email: 'taylor.nguyen@example.com', role: 'student' as SchoolRole, sentAt: '2026-04-12', status: 'pending' as const },
    { email: 'miriam.stein@example.com', role: 'student' as SchoolRole, sentAt: '2026-04-15', status: 'pending' as const },
    { email: 'prof.harding@example.com', role: 'instructor' as SchoolRole, sentAt: '2026-04-10', status: 'pending' as const },
  ],
  recentActivity: [
    { id: 'a1', timestamp: '2026-04-18T10:15:00', actor: 'Emma Rodriguez', type: 'submission', summary: 'Submitted coursework for Corrective Color — Module 4' },
    { id: 'a2', timestamp: '2026-04-18T09:02:00', actor: 'Rachel Kim', type: 'grade', summary: 'Graded Jaylen Brooks on Foundations of Color — Module 3 (9.0)' },
    { id: 'a3', timestamp: '2026-04-17T17:40:00', actor: 'Aisha Okafor', type: 'upgrade', summary: 'Upgraded to Pro from Base tier' },
    { id: 'a4', timestamp: '2026-04-17T14:22:00', actor: 'James Patterson', type: 'feedback', summary: 'Left feedback on Noah Fitzgerald\u2019s Editorial Vivids submission' },
    { id: 'a5', timestamp: '2026-04-17T11:55:00', actor: 'System', type: 'enrollment', summary: 'Dimitri Varga enrolled in Gray Coverage Techniques' },
    { id: 'a6', timestamp: '2026-04-16T16:30:00', actor: 'Nadia Volkov', type: 'grade', summary: 'Graded 6 submissions for Business of Color' },
    { id: 'a7', timestamp: '2026-04-16T13:18:00', actor: 'System', type: 'invitation', summary: 'Invitation sent to taylor.nguyen@example.com' },
    { id: 'a8', timestamp: '2026-04-15T09:44:00', actor: 'Chloe Washington', type: 'submission', summary: 'Submitted coursework for Foundations of Color — Module 2' },
    { id: 'a9', timestamp: '2026-04-14T15:10:00', actor: 'Eduardo Silva', type: 'grade', summary: 'Graded Willa Bauman on Gray Coverage — Module 3 (7.2)' },
    { id: 'a10', timestamp: '2026-04-13T10:00:00', actor: 'System', type: 'graduation', summary: 'Graduation pipeline updated — 5 students on track' },
  ] as SchoolActivity[],
  /** Submissions queue — used by instructor/grading view */
  submissions: [
    { id: 'sub1', studentId: 'st1', studentName: 'Emma Rodriguez', classId: 'c3', className: 'Corrective Color', assignment: 'Module 4 — Removing Unwanted Warmth', submittedAt: '2026-04-18T10:15:00', status: 'pending' },
    { id: 'sub2', studentId: 'st7', studentName: 'Zoe Castellanos', classId: 'c3', className: 'Corrective Color', assignment: 'Module 3 — Band Diagnosis', submittedAt: '2026-04-17T19:22:00', status: 'pending' },
    { id: 'sub3', studentId: 'st11', studentName: 'Mei Lin', classId: 'c1', className: 'Foundations of Color', assignment: 'Module 5 — Developer Ratios', submittedAt: '2026-04-17T14:08:00', status: 'pending' },
    { id: 'sub4', studentId: 'st14', studentName: 'Carlos Mendoza', classId: 'c3', className: 'Corrective Color', assignment: 'Module 2 — Color Wheel Fundamentals', submittedAt: '2026-04-17T09:50:00', status: 'pending' },
    { id: 'sub5', studentId: 'st18', studentName: 'Tariq Abdul-Malik', classId: 'c1', className: 'Foundations of Color', assignment: 'Module 4 — Tonal Families', submittedAt: '2026-04-16T21:30:00', status: 'pending' },
    { id: 'sub6', studentId: 'st3', studentName: 'Chloe Washington', classId: 'c1', className: 'Foundations of Color', assignment: 'Module 3 — Underlying Pigment', submittedAt: '2026-04-16T15:42:00', status: 'pending' },
    { id: 'sub7', studentId: 'st17', studentName: 'Rosalind Beckwith', classId: 'c1', className: 'Foundations of Color', assignment: 'Module 2 — Color Wheel Basics', submittedAt: '2026-04-15T17:18:00', status: 'pending' },
    { id: 'sub8', studentId: 'st4', studentName: 'Matteo Ricci', classId: 'c1', className: 'Foundations of Color', assignment: 'Module 2 — Color Wheel Basics', submittedAt: '2026-04-15T11:05:00', status: 'pending' },
  ] as Submission[],
  enrollmentHistory: [
    { month: '2025-05', count: 0 },
    { month: '2025-06', count: 0 },
    { month: '2025-07', count: 0 },
    { month: '2025-08', count: 0 },
    { month: '2025-09', count: 18 },
    { month: '2025-10', count: 19 },
    { month: '2025-11', count: 20 },
    { month: '2025-12', count: 20 },
    { month: '2026-01', count: 38 },
    { month: '2026-02', count: 40 },
    { month: '2026-03', count: 41 },
    { month: '2026-04', count: 42 },
  ],
  invoiceHistory: [
    { id: 'sch-2025-09', date: '2025-09-01', amount: 161.82, status: 'paid' },
    { id: 'sch-2025-10', date: '2025-10-01', amount: 170.81, status: 'paid' },
    { id: 'sch-2025-11', date: '2025-11-01', amount: 179.80, status: 'paid' },
    { id: 'sch-2025-12', date: '2025-12-01', amount: 179.80, status: 'paid' },
    { id: 'sch-2026-01', date: '2026-01-01', amount: 341.62, status: 'paid' },
    { id: 'sch-2026-02', date: '2026-02-01', amount: 499.60, status: 'paid' },
    { id: 'sch-2026-03', date: '2026-03-01', amount: 528.57, status: 'paid' },
    { id: 'sch-2026-04', date: '2026-04-01', amount: 557.40, status: 'paid' },
  ],
}

export function findStudent(id: string): Student | undefined {
  return schoolMock.students.find((s) => s.id === id)
}

export function findInstructor(id: string): Instructor | undefined {
  return schoolMock.instructors.find((i) => i.id === id)
}

export function findClass(id: string): SchoolClass | undefined {
  return schoolMock.classes.find((c) => c.id === id)
}

/** Returns the list of classes a given instructor is allowed to see. */
export function grantedClassesForInstructor(instructorId: string): string[] {
  const g = schoolMock.permissionGrants.find(
    (p) => p.instructorId === instructorId
  )
  return g?.classIds ?? []
}

/** Service-mix breakdown per student (practice work, not real clients). */
export const serviceMixByStudent: Record<
  string,
  Array<{ service: string; pct: number }>
> = {
  st1: [
    { service: 'Corrective Color', pct: 38 },
    { service: 'Single-process', pct: 26 },
    { service: 'Toner', pct: 18 },
    { service: 'Gray Coverage', pct: 12 },
    { service: 'Other', pct: 6 },
  ],
  st2: [
    { service: 'Balayage', pct: 44 },
    { service: 'Single-process', pct: 22 },
    { service: 'Toner', pct: 14 },
    { service: 'Vivids', pct: 12 },
    { service: 'Other', pct: 8 },
  ],
  st3: [
    { service: 'Foundation', pct: 52 },
    { service: 'Single-process', pct: 22 },
    { service: 'Toner', pct: 14 },
    { service: 'Gray Coverage', pct: 8 },
    { service: 'Other', pct: 4 },
  ],
  st4: [
    { service: 'Foundation', pct: 60 },
    { service: 'Single-process', pct: 20 },
    { service: 'Toner', pct: 12 },
    { service: 'Other', pct: 8 },
  ],
  st5: [
    { service: 'Balayage', pct: 38 },
    { service: 'Vivids', pct: 26 },
    { service: 'Editorial', pct: 20 },
    { service: 'Toner', pct: 10 },
    { service: 'Other', pct: 6 },
  ],
  st7: [
    { service: 'Foundation', pct: 38 },
    { service: 'Corrective Color', pct: 22 },
    { service: 'Toner', pct: 18 },
    { service: 'Single-process', pct: 14 },
    { service: 'Other', pct: 8 },
  ],
  st9: [
    { service: 'Foundation', pct: 64 },
    { service: 'Single-process', pct: 20 },
    { service: 'Toner', pct: 10 },
    { service: 'Other', pct: 6 },
  ],
}

export const instructorFeedbackByStudent: Record<
  string,
  Array<{ instructor: string; date: string; note: string }>
> = {
  st1: [
    { instructor: 'Rachel Kim', date: '2026-04-15', note: 'Strong diagnostic work on the banding case study. Continue practicing gloss decision-making.' },
    { instructor: 'Nadia Volkov', date: '2026-04-02', note: 'Consultation language is improving. Keep focusing on contraindication phrasing.' },
  ],
  st4: [
    { instructor: 'Rachel Kim', date: '2026-04-10', note: 'Submission past due. Let\u2019s check in on pace and support needs.' },
    { instructor: 'Nadia Volkov', date: '2026-03-24', note: 'Attendance pattern flagged. Please reach out during office hours.' },
  ],
  st9: [
    { instructor: 'Rachel Kim', date: '2026-04-12', note: 'Foundations review needed. Re-sit Module 2 recommended.' },
  ],
  st17: [
    { instructor: 'Rachel Kim', date: '2026-04-14', note: 'Recent scores trending down. Schedule a review session.' },
  ],
}
