# Multi-Tenant Requirements — OpenServ Handoff

This document specifies everything OpenServ's backend needs to provide in order to replace the mock data currently powering `/salon`, `/school`, and `/instructor` on the Versani marketing site.

These routes are prototypes against `lib/mock/*` today. When the items below ship, we swap the imports for real Supabase queries — the UI does not need to change.

---

## 1. Database schema

All tables live in the same Supabase project as the main Versani app. Multi-tenancy is enforced by `organization_id` scoping on every owned row, with RLS policies as described in §2.

### 1.1 `organizations`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `kind` | `text` | `'salon'` or `'school'` |
| `name` | `text` | Display name (e.g. "Santo Salon & Spa") |
| `slug` | `text` UNIQUE | URL-safe identifier |
| `city` | `text` | Optional, user-entered |
| `timezone` | `text` | IANA zone |
| `tier` | `text` | `'salon_a'`, `'salon_b'`, `'school_base'` etc. |
| `max_seats` | `integer` | Hard cap before plan change required |
| `data_sharing_default` | `text` | `'team'` or `'owner-only'` (salons only) |
| `stripe_customer_id` | `text` | Null until first paid invoice |
| `stripe_subscription_id` | `text` | Null until provisioned |
| `branding` | `jsonb` | Accent color, logo URL, custom domain |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

### 1.2 `organization_members`

Joins users to organizations with a role. A user may belong to multiple orgs.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `organization_id` | `uuid` FK → `organizations.id` | ON DELETE CASCADE |
| `user_id` | `uuid` FK → `auth.users.id` | ON DELETE CASCADE |
| `role` | `text` | Enum: `salon_owner`, `salon_manager`, `salon_stylist`, `school_owner`, `school_admin`, `instructor`, `student` |
| `status` | `text` | `active`, `paused`, `invited`, `graduated` |
| `invited_at` | `timestamptz` | |
| `joined_at` | `timestamptz` | |

Indexes: `(organization_id, role)`, `(user_id)`.

### 1.3 `classes` (schools only)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `organization_id` | `uuid` FK | Must be kind=`school` |
| `name` | `text` | |
| `description` | `text` | |
| `primary_instructor_id` | `uuid` FK → `organization_members.id` | |
| `term_start` | `date` | |
| `term_end` | `date` | |
| `archived_at` | `timestamptz` | Null when active |

### 1.4 `class_enrollments`

| Column | Type |
|---|---|
| `id` | `uuid` PK |
| `class_id` | `uuid` FK → `classes.id` |
| `student_member_id` | `uuid` FK → `organization_members.id` |
| `enrolled_at` | `timestamptz` |
| `completed_at` | `timestamptz` nullable |

UNIQUE `(class_id, student_member_id)`.

### 1.5 `class_assignments`

Scope-based instructor ↔ class access grants (schools only).

| Column | Type |
|---|---|
| `id` | `uuid` PK |
| `class_id` | `uuid` FK |
| `instructor_member_id` | `uuid` FK → `organization_members.id` |
| `granted_by_member_id` | `uuid` FK → `organization_members.id` |
| `granted_at` | `timestamptz` |

UNIQUE `(class_id, instructor_member_id)`.

### 1.6 `permission_grants`

Binary per-report grants for salon managers.

| Column | Type |
|---|---|
| `id` | `uuid` PK |
| `organization_id` | `uuid` FK |
| `manager_member_id` | `uuid` FK → `organization_members.id` |
| `report_key` | `text` | `team_heartbeat`, `comparable_reports`, `individual_drilldowns`, `inventory`, `clients`, `operations`, `billing`, `settings` |
| `granted` | `boolean` | |
| `updated_by_member_id` | `uuid` FK | |
| `updated_at` | `timestamptz` | |

UNIQUE `(manager_member_id, report_key)`.

### 1.7 `invitations`

| Column | Type |
|---|---|
| `id` | `uuid` PK |
| `organization_id` | `uuid` FK |
| `email` | `text` |
| `role` | `text` |
| `token` | `text` UNIQUE | Opaque one-time token |
| `expires_at` | `timestamptz` | 7 days from send by default |
| `sent_at` | `timestamptz` |
| `accepted_at` | `timestamptz` nullable |
| `revoked_at` | `timestamptz` nullable |
| `invited_by_member_id` | `uuid` FK |
| `welcome_message` | `text` |
| `default_class_id` | `uuid` FK → `classes.id` nullable | Schools only |

### 1.8 `audit_logs`

| Column | Type |
|---|---|
| `id` | `uuid` PK |
| `organization_id` | `uuid` FK |
| `actor_member_id` | `uuid` FK |
| `action` | `text` | e.g. `member.invited`, `permission.granted`, `seat.added` |
| `target_type` | `text` | e.g. `member`, `class`, `invoice` |
| `target_id` | `uuid` |
| `payload` | `jsonb` | Structured before/after snapshot |
| `ip` | `inet` |
| `user_agent` | `text` |
| `created_at` | `timestamptz` |

Every role/permission/billing mutation must write an audit log row in the same transaction.

---

## 2. Row-Level Security policies

All of the tables above require RLS enabled with the following policies. Shorthand: `current_member_of(org_id)` is a SQL function that returns the authed user's `organization_members` row for `org_id` (or null).

### `organization_members`

- **SELECT** — user can read their own member row, plus rows in the same org if they are an owner/admin. Managers can read members of their org only if their permission grant for `team_heartbeat` is true.
- **INSERT** — only owner/admin of the same org, via the invitation-accept flow.
- **UPDATE** — only owner/admin can change roles.
- **DELETE** — only owner/admin. Self-removal blocked by trigger (must transfer ownership first).

### `classes`, `class_enrollments`

- **SELECT** — school owner/admin always. Instructors only where `class_id IN (SELECT class_id FROM class_assignments WHERE instructor_member_id = current member)`. Students only their own enrollment.
- **INSERT/UPDATE/DELETE** — owner/admin only.

### `permission_grants`

- **SELECT** — owner/admin always; manager can read their own rows.
- **INSERT/UPDATE/DELETE** — owner/admin only.

### `class_assignments`

- **SELECT** — school owner/admin; instructor can read their own rows.
- **INSERT/UPDATE/DELETE** — owner/admin only.

### `invitations`

- **SELECT** — owner/admin of the org only.
- **INSERT** — owner/admin only.
- **UPDATE** — owner/admin (revoke) OR the invited email (accept via token).

### `audit_logs`

- **SELECT** — owner/admin only.
- **INSERT** — server-side only via service-role key (not client-writable).

Also: the existing Versani app tables that hold craft data (consultations, scores, service mix) need a join to `organization_id` or a derivation from the user's active org membership. See §6.

---

## 3. API endpoints

All endpoints live at `/api/*` in this Next.js app OR on OpenServ's backend. Either way the contract is the same. All require an authenticated session cookie.

### 3.1 Team management

- `POST /api/team/invite`
  - body: `{ organization_id, email, role, welcome_message?, default_class_id? }`
  - side effects: inserts into `invitations`, sends email via Resend/SendGrid, writes audit log
  - response: `{ invitation_id, expires_at }`

- `POST /api/team/accept`
  - body: `{ token }`
  - side effects: creates `auth.users` row if missing, inserts `organization_members`, marks invitation accepted
  - response: `{ organization_id, role, redirect_to }`

- `POST /api/team/remove`
  - body: `{ member_id }`
  - response: `204`

- `POST /api/team/role`
  - body: `{ member_id, role }`
  - guards: cannot demote last owner
  - response: `{ member }`

### 3.2 Permissions

- `POST /api/permissions/grant`
  - body for salons: `{ manager_member_id, report_key, granted }`
  - body for schools: `{ instructor_member_id, class_id, granted }`
  - response: `204`

- `POST /api/permissions/revoke` — syntactic sugar for `grant` with `granted:false`.

### 3.3 Billing

- `POST /api/billing/seats`
  - body: `{ organization_id, delta }` (positive or negative)
  - side effects: update Stripe subscription quantity, update `organizations.max_seats`, write audit log
  - response: `{ subscription, proration_preview }`

- `POST /api/billing/portal`
  - returns Stripe customer-portal URL for the current org

### 3.4 Data reads

For each route in the UI, OpenServ should provide a typed server action or RPC that returns the exact shape currently in `lib/mock/salons.ts` / `lib/mock/schools.ts`. Proposed names:

- `getSalonDashboard(org_id) → SalonDashboardPayload`
- `getSalonTeam(org_id, filters?) → { stylists, invitations }`
- `getStylist(org_id, stylist_id) → StylistWithTrend`
- `getSalonInventory(org_id) → { lines, manufacturers }`
- `getSalonClients(org_id, pagination) → { clients, total }`
- `getSalonOperations(org_id) → { mrrHistory, seatsByTier, ... }`
- `getSchoolDashboard(org_id) → SchoolDashboardPayload`
- `getSchoolStudents(org_id, filters?) → { students, invitations }`
- `getStudent(org_id, student_id) → StudentWithTrend`
- `getSchoolClasses(org_id) → SchoolClass[]`
- `getSchoolClass(org_id, class_id) → SchoolClassDetail`
- `getInstructorScope(instructor_member_id) → { classes, students, submissions }`

Types live in `lib/mock/*.ts` as `Stylist`, `Student`, etc. — OpenServ should generate the Supabase types and we re-export them.

---

## 4. Stripe integration

### 4.1 Salon billing

- **Model**: per-seat metered subscription. One subscription per organization.
- **Price**: `$39.99/month/seat` at `salon_b` tier (adjust for other tiers).
- **Quantity source**: number of active `organization_members` with role in (`salon_stylist`, `salon_manager`, `salon_owner`) minus the owner's complimentary seat (or include — business decision).
- **Proration**: default Stripe proration when quantity changes mid-cycle.
- **Webhook → DB**: on `customer.subscription.updated`, update `organizations.tier`, `max_seats`, `stripe_subscription_id`. On `invoice.paid`, store in an `invoices` table (not specified above — we can derive from Stripe for now).

### 4.2 School billing

- **Two subscriptions per school**:
  1. Base seats — `$8.99/student/month`, quantity = active students
  2. Pro upgrades — NOT billed to school. Each upgraded student has their own $9.99/month subscription on their personal card.
- **Upgrade flow**: when a student clicks "Upgrade to Pro" inside the main Versani app, Stripe Checkout collects their card. On success, we write `organization_members.tier = 'pro_upgraded'`. School's own subscription is unaffected.
- **Transparency view**: `getSchoolOperations()` returns both revenue streams so the admin sees `mrrFromBase + mrrFromUpgrades` together — even though the school only pays the base.

### 4.3 Proration on seat changes

- Adding a seat mid-cycle: immediate incremental charge (prorated).
- Removing a seat mid-cycle: credit applied to next invoice.
- Pausing a salon: `pause_collection` on subscription; seats remain active but billing is deferred. No billing while paused.

---

## 5. Email infrastructure

Provider: Resend or SendGrid. Templates are owned by this marketing repo and rendered server-side (React Email or MJML).

### 5.1 Transactional templates needed

| Template | Trigger |
|---|---|
| Salon invitation | `POST /api/team/invite` (stylist or manager) |
| School student invitation | Invite with role=`student` |
| Instructor invitation | Invite with role=`instructor` |
| Invitation reminder (day 5) | Cron job, invitations not yet accepted |
| Role change notification | When a stylist is promoted to manager |
| Permission grant change | When a manager's or instructor's grants change materially |
| Seat change confirmation | Owner receives after billing.seats |
| Graduation reminder | 14 days before term end, for students on graduation pipeline |

### 5.2 Deliverability

- Dedicated sending subdomain (e.g. `hello.versani.ai`) with SPF, DKIM, DMARC configured.
- Bounce and complaint webhooks write to `email_events` (optional, can skip for v1).

---

## 6. Data exposure from main Versani app

The marketing-site oversight dashboards need read access to craft data from the main app's Supabase. Options, in order of preference:

1. **Shared Supabase project** — main app tables get an `organization_id` column; oversight dashboards query them directly with RLS.
2. **Published views / RPCs** — main app exposes read-only views scoped by `organization_id`.
3. **API bridge** — OpenServ runs an API that proxies aggregated data.

Whatever form, the following must be available, scoped by `organization_id` and filtered by RLS:

- `consultations` — one row per consultation, includes `member_id`, `class_id` (schools), `score`, `service_type`, `created_at`
- `formula_scores` — per-consultation score breakdown (composite, tonal accuracy, process accuracy, etc.)
- `service_mix_aggregate` — per-member rollup for dashboards
- `retention_aggregate` — per-client returning rate
- `inventory_usage` — per-line, per-salon usage counts

The `getStylist` and `getStudent` endpoints in §3.4 aggregate these into the shapes the UI expects.

---

## 7. Security review items

Before shipping:

1. **Multi-tenant isolation test** — for each table, verify via automated test that a user in org A cannot read/write any row in org B.
2. **Permission bypass audit** — specifically for the manager → report-access and instructor → class-scope paths. Test that a manager without the `clients` grant gets 403 on both the page and the API.
3. **Invitation token entropy** — tokens must be 32+ bytes of crypto randomness, single-use, time-bounded.
4. **Audit log completeness** — spot-check that every sensitive mutation (role change, grant change, seat change, pause, delete) writes an audit row in the same transaction as the write.
5. **PII minimization** — student/stylist email addresses should not be exposed to peers (e.g. other instructors outside a student's scope).
6. **Session fixation on invitation accept** — ensure accepting an invitation issues a fresh session, does not inherit a pre-existing session's privileges.
7. **Stripe webhook signature verification** — required on every webhook endpoint.
8. **Rate limiting** — invitation send, permission grant, and compare/export endpoints need rate limits to prevent abuse.

---

## 8. Estimated work scope

Rough order-of-magnitude. OpenServ to refine.

| Workstream | Est. effort |
|---|---|
| Schema migrations + RLS policies | 1–1.5 weeks |
| Auth + invitation flow | 1 week |
| Org-scoped data reads (getSalon/getSchool/getInstructor bundles) | 2 weeks |
| Stripe salon per-seat billing | 1 week |
| Stripe school base + student upgrade split | 1 week |
| Email templates + sending | 0.5 week |
| Admin permission UI wiring (replace mocks in existing components) | 0.5 week |
| Audit logging everywhere | 0.5 week |
| Security review + fixes | 1 week |
| **Total** | **8.5–9 weeks of focused work** |

This aligns roughly with the original $70K quote if OpenServ is loaded at ~$8K/week blended. Once the oversight UI is reviewed and approved, Frank can validate the scope against the quote and trim any items here that aren't in v1.

---

## 9. What is already done in this repo

- `lib/mock/salons.ts`, `lib/mock/schools.ts`, `lib/mock/instructor-view.ts`, `lib/mock/charts.ts` — the data shapes OpenServ must produce
- `lib/previewMode.ts` — boolean used to show a "Preview mode" banner when Supabase env vars are missing
- `components/team/*` — the complete component library used by these routes
- `app/salon/*`, `app/school/*`, `app/instructor/*` — the routes themselves, all server components
- `lib/supabase/middleware.ts` — has TODO markers where OpenServ should plug in role checks once `organization_members` exists

Swap the mock imports for typed Supabase server reads and the UI will render real data without further changes.
