/**
 * Instructor-scoped view helpers.
 *
 * Instructors have scope-based permissions — they only see students
 * enrolled in classes that school admin has granted them access to.
 * These helpers enforce that filter on the mock data so the instructor
 * routes render data consistent with real permission semantics.
 */

import {
  schoolMock,
  findInstructor,
  grantedClassesForInstructor,
  type Student,
  type SchoolClass,
  type Submission,
} from './schools'

/**
 * For prototype purposes, we pretend the logged-in instructor is Rachel Kim (i1).
 * In production this is derived from the authenticated user's organization_member row.
 */
export const CURRENT_INSTRUCTOR_ID = 'i1'

export function getCurrentInstructor() {
  return findInstructor(CURRENT_INSTRUCTOR_ID)!
}

/** Classes this instructor has been granted access to. */
export function getGrantedClasses(
  instructorId: string = CURRENT_INSTRUCTOR_ID
): SchoolClass[] {
  const ids = grantedClassesForInstructor(instructorId)
  return schoolMock.classes.filter((c) => ids.includes(c.id))
}

/** Students enrolled in any class this instructor has access to. */
export function getGrantedStudents(
  instructorId: string = CURRENT_INSTRUCTOR_ID
): Student[] {
  const classIds = grantedClassesForInstructor(instructorId)
  if (classIds.length === 0) return []

  const classIdSet = new Set(classIds)
  return schoolMock.students.filter((s) =>
    s.classIds.some((cid) => classIdSet.has(cid))
  )
}

/** Submissions awaiting grade within instructor's granted classes. */
export function getGrantedPendingSubmissions(
  instructorId: string = CURRENT_INSTRUCTOR_ID
): Submission[] {
  const classIds = grantedClassesForInstructor(instructorId)
  const set = new Set(classIds)
  return schoolMock.submissions.filter(
    (sub) => sub.status === 'pending' && set.has(sub.classId)
  )
}

/** Class-detail access check: returns class if instructor is granted, otherwise null. */
export function getGrantedClass(
  classId: string,
  instructorId: string = CURRENT_INSTRUCTOR_ID
): SchoolClass | null {
  const allowed = grantedClassesForInstructor(instructorId)
  if (!allowed.includes(classId)) return null
  return schoolMock.classes.find((c) => c.id === classId) ?? null
}

/** Per-instructor dashboard metrics, scoped only to the data they can see. */
export function getInstructorMetrics(
  instructorId: string = CURRENT_INSTRUCTOR_ID
) {
  const students = getGrantedStudents(instructorId)
  const classes = getGrantedClasses(instructorId)
  const pending = getGrantedPendingSubmissions(instructorId)

  const atRisk = students.filter((s) => s.trajectory === 'at-risk')
  const avgScore =
    students.length > 0
      ? students.reduce((acc, s) => acc + s.scoreAvg, 0) / students.length
      : 0

  return {
    studentCount: students.length,
    classCount: classes.length,
    pendingReviewCount: pending.length,
    classAverage: Number(avgScore.toFixed(1)),
    atRiskCount: atRisk.length,
    atRiskStudents: atRisk,
    trendingUp: students
      .filter((s) => s.trajectory === 'up')
      .slice(0, 3),
  }
}

/** Previous grades given by this instructor (mock for drill-down UI). */
export const instructorGivenGrades: Record<
  string,
  Array<{
    instructorId: string
    studentId: string
    assignment: string
    grade: string
    feedback: string
    date: string
  }>
> = {
  i1: [
    {
      instructorId: 'i1',
      studentId: 'st1',
      assignment: 'Foundations — Module 3: Underlying Pigment',
      grade: '8.6',
      feedback:
        'Accurate level call. Watch the undertone on the mid-lengths when reformulating.',
      date: '2026-04-09',
    },
    {
      instructorId: 'i1',
      studentId: 'st7',
      assignment: 'Corrective Color — Module 2: Diagnosis Lab',
      grade: '7.9',
      feedback:
        'Good methodology. Include base reading before drifting into toner conversations.',
      date: '2026-04-05',
    },
    {
      instructorId: 'i1',
      studentId: 'st11',
      assignment: 'Foundations — Module 4: Tonal Families',
      grade: '8.4',
      feedback: 'Clear reasoning. Continue pushing into warmer family exercises.',
      date: '2026-04-02',
    },
  ],
}
