# 🧭 APEX CIRCLE — Complete Implementation Plan

> **Research-grade, end-to-end system blueprint** covering architecture, modules, workflows, data, permissions, states, UX, and operational concerns across all three layers.

| Layer | Tech Stack |
|---|---|
| 🌐 Community Website | React + TypeScript + Tailwind |
| 🖥 Desktop Admin App | Tauri + React + TypeScript |
| 🟩 Backend API | Node + Express + TypeScript + MongoDB |

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [System Architecture](#2-system-architecture)
3. [Global Role Model](#3-global-role-model)
4. [PART 1 — Community Website](#part-1--community-website-react)
5. [PART 2 — Desktop Admin & Internal Ops App](#part-2--desktop-admin--internal-ops-app)
6. [PART 3 — Backend API](#part-3--backend-api-node--express--ts)
7. [Global Workflows](#global-workflows)
8. [Security Model](#security-model)
9. [Data Model](#data-model)
10. [State Machines](#state-machines)
11. [Folder Structures](#folder-structures)
12. [API Routes Map](#api-routes-map)
13. [DB Schema Reference](#db-schema-reference)

---

## 1. Platform Overview

Apex Circle is a developer community platform enabling:

- **Community identity & outreach** (website)
- **Member engagement & participation**
- **Events & hackathons lifecycle**
- **Content & learning resources**
- **Media & recognition**
- **Internal operations** (desktop console)
- **Governance & analytics**

**Comparable ecosystems:** GDG, MLSA, DevRel communities.

---

## 2. System Architecture

### Frontend Web

| Concern | Choice |
|---|---|
| Framework | React + TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Data Fetching | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| State | Zustand (global) / Context (local) |
| Icons | Lucide React |
| Animations | Framer Motion |

### Desktop App

| Concern | Choice |
|---|---|
| Shell | Tauri v2 |
| UI | React + TypeScript + Tailwind |
| Local Storage | Tauri secure store |
| API | Same backend as web |
| Build | Vite + Tauri CLI |

### Backend API

| Concern | Choice |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh) + RBAC |
| Media | Cloudinary |
| Validation | Zod |
| Email | Nodemailer / Resend |
| Logging | Winston |
| Testing | Vitest + Supertest |

### Infrastructure

| Concern | Choice |
|---|---|
| Web Hosting | Vercel |
| API Hosting | Render / Railway |
| Database | MongoDB Atlas |
| CDN | Cloudinary CDN / Vercel Edge |
| Object Storage | Cloudinary |
| CI/CD | GitHub Actions |
| Monitoring | Sentry (errors) + Uptime Kuma |

---

## 3. Global Role Model

| Role | Scope |
|---|---|
| **Visitor** | Public pages, no auth |
| **Member** | Authenticated, dashboard, events, hackathons |
| **Volunteer** | Member + limited ops tasks |
| **Organizer** | Manage events, hackathons, content |
| **Admin** | Full platform control |
| **Hackathon Manager** | Hackathon-specific full control |
| **Content Manager** | Blog, resources, CMS, gallery |

**RBAC enforced at backend → consumed by web & desktop.**

### Permission Matrix

```
Resource            Visitor  Member  Volunteer  Organizer  Admin  HackMgr  ContentMgr
──────────────────────────────────────────────────────────────────────────────────────
Public pages        R        R       R          R          R      R        R
Member dashboard    —        R       R          R          R      R        R
Events (register)   —        CRU     CRU        CRUD       CRUD   R        R
Events (manage)     —        —       R          CRUD       CRUD   R        R
Hackathons (join)   —        CRU     CRU        CRU        CRUD   CRUD     R
Hackathons (manage) —        —       —          R          CRUD   CRUD     —
Gallery             R        R       R          CRU        CRUD   R        CRUD
Projects            R        R       CRU        CRUD       CRUD   R        R
Resources           R        R       R          CRU        CRUD   R        CRUD
Blog                R        R       R          CRU        CRUD   R        CRUD
Members (manage)    —        —       —          R          CRUD   R        —
Certificates        —        R       R          CRU        CRUD   CRU      —
Analytics           —        —       —          R          CRUD   R        R
Settings            —        —       —          —          CRUD   —        —
Audit logs          —        —       —          R          CRUD   R        —
```

---

# PART 1 — Community Website (React)

> **Purpose:** Public presence, member onboarding, event participation, community storytelling.

---

## 1.1 Information Architecture

### Public Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Community landing page |
| About | `/about` | Mission, vision, story |
| Events | `/events` | Events listing |
| Event Details | `/events/:slug` | Single event |
| Hackathons | `/hackathons` | Hackathons listing |
| Hackathon Details | `/hackathons/:slug` | Single hackathon |
| Gallery | `/gallery` | Photo albums |
| Projects | `/projects` | Community project showcase |
| Resources | `/resources` | Learning materials |
| Blog | `/blog` | Community blog |
| Blog Post | `/blog/:slug` | Single post |
| Team | `/team` | Leadership & volunteers |
| Partners | `/partners` | Sponsors & collaborators |
| Join Community | `/join` | Application form |
| Contact | `/contact` | Contact form |

### Authenticated Pages

| Page | Route | Description |
|---|---|---|
| Member Dashboard | `/dashboard` | Overview |
| My Events | `/dashboard/events` | Registered events |
| My Hackathons | `/dashboard/hackathons` | Hackathon participation |
| Certificates | `/dashboard/certificates` | Earned certificates |
| Profile | `/dashboard/profile` | Edit profile |
| Announcements | `/dashboard/announcements` | Community announcements |

---

## 1.2 Home Page (Community Landing)

### Sections (top → bottom)

| # | Section | Data Source | Dynamic |
|---|---|---|---|
| 1 | **Hero** | CMS ContentBlock | ✅ |
| 2 | **Community Intro** | CMS ContentBlock | ✅ |
| 3 | **Upcoming Events** | Events API (next 3) | ✅ |
| 4 | **Active Hackathons** | Hackathons API (active) | ✅ |
| 5 | **What We Do** | CMS ContentBlock | ✅ |
| 6 | **Impact Stats** | Analytics API | ✅ |
| 7 | **Featured Projects** | Projects API (featured) | ✅ |
| 8 | **Gallery Preview** | Gallery API (latest album) | ✅ |
| 9 | **Team Preview** | Team API (leads) | ✅ |
| 10 | **Testimonials** | CMS ContentBlock | ✅ |
| 11 | **Partners** | Partners API | ✅ |
| 12 | **Join CTA** | Static + link | ❌ |
| 13 | **Footer** | CMS + static | Partial |

### Component Breakdown

```
HomePage/
├── HeroSection.tsx
├── CommunityIntro.tsx
├── UpcomingEvents.tsx
├── ActiveHackathons.tsx
├── WhatWeDo.tsx
├── ImpactStats.tsx
├── FeaturedProjects.tsx
├── GalleryPreview.tsx
├── TeamPreview.tsx
├── Testimonials.tsx
├── PartnersStrip.tsx
├── JoinCTA.tsx
└── Footer.tsx
```

---

## 1.3 About Page

### Sections

- **Mission** — CMS editable
- **Vision** — CMS editable
- **Our Story** — CMS editable rich text
- **What We Do** — Activities cards
- **Core Values** — Values grid
- **Community Structure** — Org chart / roles
- **Chapters** — Location-based groups (if applicable)

All sections **CMS-managed** via desktop app.

---

## 1.4 Events System (Public)

### Events List Page (`/events`)

- **Tabs:** Upcoming | Past
- **Filters:** Category, Date range, Location type (online/offline)
- **Search:** Title / description
- **Cards:** Banner, title, date, location, capacity indicator, register button

### Event Details Page (`/events/:slug`)

| Section | Content |
|---|---|
| Banner | Event cover image |
| Title + Meta | Name, date/time, location, type |
| Description | Rich text |
| Agenda | Timeline items |
| Speakers | Speaker cards (name, bio, photo) |
| Registration | Button + capacity status |
| Share | Social share links |

### Member Actions

- **Register** → creates Registration record
- **Cancel registration** (before event date)
- **View attendance status** (after event)

---

## 1.5 Hackathons (Public)

### Hackathons List (`/hackathons`)

- **Tabs:** Upcoming | Active | Past
- **Cards:** Banner, title, dates, tracks count, prize pool, status badge

### Hackathon Details (`/hackathons/:slug`)

| Section | Content |
|---|---|
| Overview | Description, format, rules |
| Tracks | Track cards with descriptions |
| Prizes | Prize breakdown per track |
| Timeline | Phase dates (registration → submission → judging → results) |
| Judges | Judge profiles |
| Registration | Solo or team registration |
| FAQ | Common questions |

### Member Actions

- **Register** (solo / create team / join team)
- **Create / manage team**
- **Submit project** (during submission phase)
- **View results** (after judging)

---

## 1.6 Gallery

- **Albums grid** — Cover image, title, date, photo count
- **Album view** — Photo grid with lightbox
- **Event tagging** — Albums linked to events

---

## 1.7 Projects Showcase

### Project Card

| Field | Type |
|---|---|
| Name | String |
| Description | Text |
| Tech Stack | Tags |
| Links | GitHub, demo, etc. |
| Contributors | Member references |
| Thumbnail | Image |

- Filter by tech, category
- Search by name

---

## 1.8 Resources

| Type | Format |
|---|---|
| Documents | PDF, slides |
| Videos | YouTube embeds |
| Slides | SlideShare / Google Slides |
| Repositories | GitHub links |

- **Filter:** Type, category, difficulty
- **Search:** Title, description

---

## 1.9 Blog

- **Posts list** — Card grid, featured post hero
- **Categories / Tags** — Filter
- **Post detail** — Rich text, author, date, tags, share
- **Related posts** — Tag-based

---

## 1.10 Team Page

### Grouped by Role

| Group | Display |
|---|---|
| **Leadership** | Photo, name, title, bio, socials |
| **Organizers** | Photo, name, role |
| **Volunteers** | Photo, name, role |

---

## 1.11 Partners Page

- **Logo grid** grouped by tier
- **Tiers:** Platinum, Gold, Silver, Community
- Each: Logo, name, description, website link

---

## 1.12 Join Community

### Application Form

| Field | Type | Required |
|---|---|---|
| Full Name | Text | ✅ |
| Email | Email | ✅ |
| Phone | Text | ❌ |
| College / Company | Text | ✅ |
| Role / Year | Text | ✅ |
| Skills | Multi-select / tags | ✅ |
| Why join? | Textarea | ✅ |
| Portfolio / GitHub | URL | ❌ |
| LinkedIn | URL | ❌ |

**Flow:** Submit → Backend creates Application (Pending) → Desktop app review → Approve/Reject → Email notification.

---

## 1.13 Contact Page

| Field | Type |
|---|---|
| Name | Text |
| Email | Email |
| Subject | Text |
| Message | Textarea |

Submit → Backend inbox → Desktop app view.

---

## 1.14 Member Dashboard

### Sidebar Navigation

| Item | Route |
|---|---|
| Dashboard | `/dashboard` |
| My Events | `/dashboard/events` |
| My Hackathons | `/dashboard/hackathons` |
| Certificates | `/dashboard/certificates` |
| Profile | `/dashboard/profile` |
| Announcements | `/dashboard/announcements` |

### Dashboard Overview

- Welcome message
- Upcoming registered events
- Active hackathon status
- Recent certificates
- Latest announcements

---

## 1.15 Member Events

- **Registered events** list
- **Attendance status** (Present / Absent / Pending)
- **Event status** badge
- **Cancel registration** action (if allowed)

---

## 1.16 Member Hackathons

- **Registered hackathons** list
- **Team info** (members, name)
- **Submission status** (Draft / Submitted)
- **Results** (after judging)

---

## 1.17 Certificates

- **Certificate list** — Event/hackathon name, type, date
- **Download** — PDF generation
- **Verify link** — Public verification URL

---

## 1.18 Profile

### Editable Fields

| Field | Type |
|---|---|
| Display Name | Text |
| Bio | Textarea |
| Avatar | Image upload |
| Skills | Tags |
| GitHub | URL |
| LinkedIn | URL |
| Portfolio | URL |
| College / Company | Text |

---

# PART 2 — Desktop Admin & Internal Ops App

> **Purpose:** Central operations console for team to manage all platform content, members, events, hackathons, media, certificates, and analytics.

---

## 2.1 Module Map

| # | Module | Access |
|---|---|---|
| 1 | Dashboard | All team |
| 2 | Members | Admin, Organizer |
| 3 | Applications | Admin, Organizer |
| 4 | Events | Admin, Organizer |
| 5 | Hackathons | Admin, Hackathon Manager |
| 6 | Gallery | Admin, Organizer, Content Manager |
| 7 | Projects | Admin, Organizer |
| 8 | Resources | Admin, Content Manager |
| 9 | Blog / CMS | Admin, Content Manager |
| 10 | Team | Admin |
| 11 | Partners | Admin |
| 12 | Certificates | Admin, Organizer |
| 13 | Announcements | Admin, Organizer |
| 14 | Website Content | Admin, Content Manager |
| 15 | Analytics | Admin, Organizer |
| 16 | Reports | Admin |
| 17 | Settings | Admin |
| 18 | Audit Logs | Admin |

---

## 2.2 Desktop Dashboard

### Hero Stats

| Metric | Source |
|---|---|
| Total Members | Users count (active) |
| Upcoming Events | Events (published, future) |
| Active Hackathons | Hackathons (open/live) |
| Pending Approvals | Applications (pending) |
| Submissions Pending | Submissions (review needed) |

### Panels

- **Recent Activity** — Latest audit log entries
- **Upcoming Deadlines** — Event dates, hackathon phases
- **Alerts** — Low capacity events, overdue tasks

---

## 2.3 Members Management

### Features

| Feature | Description |
|---|---|
| View all members | Table with search, filter, sort |
| Member detail | Full profile, activity history |
| Role assignment | Change role (dropdown) |
| Status management | Active / Inactive toggle |
| Participation history | Events attended, hackathons, certificates |
| Bulk actions | Export, role change, status change |

### Member Lifecycle

```
Application (Pending) → Approved → Active Member → Inactive (optional)
                      → Rejected
```

---

## 2.4 Applications Management

| Feature | Description |
|---|---|
| View pending | Table sorted by date |
| Application detail | All form fields |
| Approve | Creates User + sends welcome email |
| Reject | Sends rejection email |
| Notes | Internal reviewer notes |

---

## 2.5 Events Management

### Features

| Feature | Description |
|---|---|
| Create event | Full form: title, description, date, location, capacity, banner |
| Edit event | Update any field |
| Publish / Unpublish | Toggle visibility |
| Manage registrations | View, export, cancel |
| Mark attendance | Checklist / bulk |
| Post-event | Photos, feedback, certificates |

### Event Lifecycle

```
Draft → Published → Live (on event day) → Completed
```

### Event Form Fields

| Field | Type | Required |
|---|---|---|
| Title | Text | ✅ |
| Slug | Auto-gen / manual | ✅ |
| Description | Rich text | ✅ |
| Type | Online / Offline / Hybrid | ✅ |
| Category | Select | ✅ |
| Date / Time | DateTime | ✅ |
| End Date / Time | DateTime | ✅ |
| Location | Text + map | Conditional |
| Online Link | URL | Conditional |
| Capacity | Number | ❌ |
| Banner | Image upload | ✅ |
| Speakers | Multi-select / add | ❌ |
| Agenda | Timeline items | ❌ |
| Tags | Tags | ❌ |
| Status | Select | ✅ |

---

## 2.6 Hackathons Management

### Features

| Feature | Description |
|---|---|
| Create hackathon | Full wizard |
| Manage tracks | CRUD tracks |
| Assign judges | Per track |
| View teams | Team details, members |
| View submissions | Submission review |
| Manage timeline | Phase dates |
| Announce results | Winners per track |

### Hackathon Lifecycle

```
Draft → Open (registration) → Live (hacking) → Judging → Completed
```

### Hackathon Form Fields

| Field | Type |
|---|---|
| Title | Text |
| Slug | Auto-gen |
| Description | Rich text |
| Rules | Rich text |
| Registration Start/End | DateTime |
| Hacking Start/End | DateTime |
| Judging Start/End | DateTime |
| Banner | Image |
| Tracks | Sub-form array |
| Prizes | Sub-form array |
| Max Team Size | Number |
| Min Team Size | Number |

### Track Fields

| Field | Type |
|---|---|
| Name | Text |
| Description | Text |
| Prizes | Array |
| Judges | Member references |

---

## 2.7 Gallery Management

| Feature | Description |
|---|---|
| Create album | Title, description, event link, cover |
| Upload photos | Bulk upload to Cloudinary |
| Manage photos | Reorder, delete, caption |
| Tag events | Link album to event |

---

## 2.8 Projects Management

| Feature | Description |
|---|---|
| Add project | Full form |
| Edit project | Update fields |
| Assign contributors | Member references |
| Feature toggle | Mark as featured |
| Status | Active / Archived |

---

## 2.9 Resources Management

| Feature | Description |
|---|---|
| Upload resource | File + metadata |
| Categorize | Type, category, difficulty |
| Edit metadata | Update fields |
| Publish / Archive | Toggle visibility |

---

## 2.10 Blog CMS

| Feature | Description |
|---|---|
| Create post | Rich text editor |
| Draft / Publish | Status toggle |
| Tags | Manage tags |
| Featured | Mark featured |
| Author | Assign author |
| SEO | Slug, meta description |

---

## 2.11 Team Management

| Feature | Description |
|---|---|
| Add team member | Profile from members |
| Set display role | Title for public display |
| Set group | Leadership / Organizer / Volunteer |
| Order | Display order |
| Active toggle | Show/hide on website |

---

## 2.12 Partners Management

| Feature | Description |
|---|---|
| Add partner | Logo, name, description, URL |
| Set tier | Platinum / Gold / Silver / Community |
| Order | Display order per tier |
| Active toggle | Show/hide |

---

## 2.13 Certificates Management

| Feature | Description |
|---|---|
| Certificate templates | Design templates with placeholders |
| Assign certificates | Per event / hackathon |
| Bulk generate | Generate for all attendees / winners |
| Download | PDF export |
| Verification | Public verification URL |

### Certificate Types

| Type | Trigger |
|---|---|
| Event Attendance | Attendance marked |
| Event Speaker | Manual assign |
| Hackathon Participation | Team submitted |
| Hackathon Winner | Results announced |
| Volunteer | Manual assign |
| Special Recognition | Manual assign |

---

## 2.14 Announcements

| Feature | Description |
|---|---|
| Create | Title, body, priority, target audience |
| Publish | Visible on member dashboard |
| Archive | Remove from active |
| Pin | Sticky announcement |

---

## 2.15 Website Content CMS

### Editable Blocks

| Block | Fields |
|---|---|
| Hero Section | Title, subtitle, CTA text, CTA link, background image |
| Community Intro | Title, body, image |
| What We Do | Cards (icon, title, description) |
| Impact Stats | Metric cards (label, value, icon) |
| Testimonials | Array (name, role, quote, photo) |
| About Sections | Mission, vision, story, values |
| Footer | Links, social URLs, contact info |

---

## 2.16 Analytics

### Dashboards

| Dashboard | Metrics |
|---|---|
| **Members** | Growth over time, active vs inactive, role distribution, skill cloud |
| **Events** | Events per month, attendance rates, capacity utilization, popular categories |
| **Hackathons** | Participation, team sizes, submission rates, track distribution |
| **Content** | Blog views (if tracked), resource downloads, gallery views |

### Charts

- Line charts (growth trends)
- Bar charts (comparisons)
- Pie/Donut charts (distributions)
- Stat cards (key metrics)

---

## 2.17 Reports

| Report | Content | Export |
|---|---|---|
| Event Report | Attendees, stats, feedback | CSV, PDF |
| Hackathon Report | Teams, submissions, scores, winners | CSV, PDF |
| Members Report | Full roster, roles, activity | CSV |
| Annual Summary | Yearly metrics compilation | PDF |

---

## 2.18 Settings

| Setting | Description |
|---|---|
| Community Info | Name, description, logo, social links |
| Email Templates | Welcome, rejection, event, certificate |
| Roles & Permissions | Configure RBAC |
| API Keys | Cloudinary, email service |
| Feature Flags | Toggle platform features |

---

## 2.19 Audit Logs

| Field | Description |
|---|---|
| Timestamp | When |
| Actor | Who (user reference) |
| Action | What (create, update, delete) |
| Resource | Which entity |
| Resource ID | Which record |
| Details | Change diff / description |
| IP Address | Where (optional) |

- **Filterable** by actor, action, resource, date range
- **Searchable**
- **Immutable** (append-only)

---

# PART 3 — Backend API (Node + Express + TS)

> **Purpose:** Single source of truth for web + desktop. RESTful API with JWT auth and RBAC.

---

## 3.1 Backend Domains

```
auth/           → Authentication & authorization
users/          → User profiles & management
roles/          → Role definitions & RBAC
applications/   → Join requests lifecycle
events/         → Event CRUD & management
registrations/  → Event registrations
attendance/     → Event attendance tracking
hackathons/     → Hackathon CRUD & lifecycle
teams/          → Hackathon teams
submissions/    → Hackathon project submissions
judges/         → Judge assignments
scores/         → Judging scores
gallery/        → Albums & photos
projects/       → Community projects
resources/      → Learning materials
posts/          → Blog posts
team-members/   → Leadership profiles
partners/       → Sponsors & collaborators
certificates/   → Certificate issuance
announcements/  → Community announcements
content/        → CMS content blocks
analytics/      → Metrics & stats
reports/        → Data exports
settings/       → Platform configuration
audit/          → Audit trail
```

---

## 3.2 Auth

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/auth/login` | Login with email/password | Public |
| POST | `/api/auth/register` | Self-register (creates application) | Public |
| POST | `/api/auth/refresh` | Refresh access token | Authenticated |
| POST | `/api/auth/logout` | Invalidate refresh token | Authenticated |
| POST | `/api/auth/forgot-password` | Send reset email | Public |
| POST | `/api/auth/reset-password` | Reset with token | Public |
| GET | `/api/auth/me` | Get current user | Authenticated |

### Auth Flow

```
Login → Validate credentials → Generate JWT (access + refresh)
      → Return tokens + user data

Access Token: 15min expiry, signed JWT
Refresh Token: 7d expiry, stored in httpOnly cookie + DB
```

---

## 3.3 Users

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/users` | List users (paginated) | Admin, Organizer |
| GET | `/api/users/:id` | Get user detail | Admin, Organizer, Self |
| PUT | `/api/users/:id` | Update user | Admin, Self |
| PATCH | `/api/users/:id/role` | Change role | Admin |
| PATCH | `/api/users/:id/status` | Change status | Admin |
| DELETE | `/api/users/:id` | Soft delete | Admin |
| GET | `/api/users/:id/activity` | User activity history | Admin, Self |

### User Schema

```typescript
interface IUser {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  college?: string;
  company?: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.4 Applications

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/applications` | Submit application | Public |
| GET | `/api/applications` | List applications | Admin, Organizer |
| GET | `/api/applications/:id` | Get detail | Admin, Organizer |
| PATCH | `/api/applications/:id/approve` | Approve | Admin, Organizer |
| PATCH | `/api/applications/:id/reject` | Reject | Admin, Organizer |

### Application Schema

```typescript
interface IApplication {
  _id: ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  college?: string;
  company?: string;
  roleOrYear: string;
  skills: string[];
  whyJoin: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: ObjectId;  // User ref
  reviewNotes?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.5 Events

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/events` | List events (public) | Public |
| GET | `/api/events/:slug` | Get event detail | Public |
| POST | `/api/events` | Create event | Admin, Organizer |
| PUT | `/api/events/:id` | Update event | Admin, Organizer |
| DELETE | `/api/events/:id` | Delete event | Admin |
| PATCH | `/api/events/:id/status` | Change status | Admin, Organizer |
| POST | `/api/events/:id/register` | Register for event | Member |
| DELETE | `/api/events/:id/register` | Cancel registration | Member |
| GET | `/api/events/:id/registrations` | List registrations | Admin, Organizer |
| POST | `/api/events/:id/attendance` | Mark attendance (bulk) | Admin, Organizer |
| GET | `/api/events/:id/attendance` | Get attendance | Admin, Organizer |

### Event Schema

```typescript
interface IEvent {
  _id: ObjectId;
  title: string;
  slug: string;
  description: string;
  type: 'online' | 'offline' | 'hybrid';
  category: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  coordinates?: { lat: number; lng: number };
  onlineLink?: string;
  capacity?: number;
  banner: string;
  speakers: ISpeaker[];
  agenda: IAgendaItem[];
  tags: string[];
  status: 'draft' | 'published' | 'live' | 'completed' | 'cancelled';
  registrationCount: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ISpeaker {
  name: string;
  bio: string;
  photo?: string;
  title?: string;
  socials?: Record<string, string>;
}

interface IAgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}
```

### Registration Schema

```typescript
interface IRegistration {
  _id: ObjectId;
  event: ObjectId;
  user: ObjectId;
  status: 'registered' | 'cancelled' | 'waitlisted';
  registeredAt: Date;
  cancelledAt?: Date;
}
```

### Attendance Schema

```typescript
interface IAttendance {
  _id: ObjectId;
  event: ObjectId;
  user: ObjectId;
  status: 'present' | 'absent';
  markedBy: ObjectId;
  markedAt: Date;
}
```

---

## 3.6 Hackathons

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/hackathons` | List hackathons | Public |
| GET | `/api/hackathons/:slug` | Get detail | Public |
| POST | `/api/hackathons` | Create | Admin, Hackathon Manager |
| PUT | `/api/hackathons/:id` | Update | Admin, Hackathon Manager |
| DELETE | `/api/hackathons/:id` | Delete | Admin |
| PATCH | `/api/hackathons/:id/status` | Change status | Admin, Hackathon Manager |
| POST | `/api/hackathons/:id/register` | Register | Member |
| GET | `/api/hackathons/:id/teams` | List teams | Public (after open) |
| GET | `/api/hackathons/:id/submissions` | List submissions | Admin, HM, Judges |
| GET | `/api/hackathons/:id/results` | Get results | Public (after judging) |

### Hackathon Schema

```typescript
interface IHackathon {
  _id: ObjectId;
  title: string;
  slug: string;
  description: string;
  rules: string;
  banner: string;
  registrationStart: Date;
  registrationEnd: Date;
  hackingStart: Date;
  hackingEnd: Date;
  judgingStart: Date;
  judgingEnd: Date;
  minTeamSize: number;
  maxTeamSize: number;
  tracks: ITrack[];
  prizes: IPrize[];
  status: 'draft' | 'open' | 'live' | 'judging' | 'completed';
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ITrack {
  _id: ObjectId;
  name: string;
  description: string;
  prizes: IPrize[];
}

interface IPrize {
  position: string;
  title: string;
  description: string;
  value?: string;
}
```

---

## 3.7 Teams

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/teams` | Create team | Member |
| GET | `/api/teams/:id` | Get team | Team member, Admin |
| PUT | `/api/teams/:id` | Update team | Team leader |
| POST | `/api/teams/:id/join` | Join team | Member |
| POST | `/api/teams/:id/leave` | Leave team | Team member |
| DELETE | `/api/teams/:id/members/:userId` | Remove member | Team leader |

### Team Schema

```typescript
interface ITeam {
  _id: ObjectId;
  hackathon: ObjectId;
  name: string;
  description?: string;
  track: ObjectId;
  leader: ObjectId;
  members: ObjectId[];
  inviteCode: string;
  status: 'forming' | 'locked' | 'submitted';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.8 Submissions

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/submissions` | Submit project | Team leader |
| GET | `/api/submissions/:id` | Get submission | Team, Admin, Judge |
| PUT | `/api/submissions/:id` | Update submission | Team leader |
| PATCH | `/api/submissions/:id/lock` | Lock submission | Admin, HM |

### Submission Schema

```typescript
interface ISubmission {
  _id: ObjectId;
  hackathon: ObjectId;
  team: ObjectId;
  track: ObjectId;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  videoUrl?: string;
  screenshots: string[];
  status: 'draft' | 'submitted' | 'locked';
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.9 Judging

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/judges` | Assign judge | Admin, HM |
| GET | `/api/judges/hackathon/:id` | List judges | Admin, HM |
| DELETE | `/api/judges/:id` | Remove judge | Admin, HM |
| POST | `/api/scores` | Submit score | Judge |
| GET | `/api/scores/submission/:id` | Get scores | Admin, HM |
| GET | `/api/scores/hackathon/:id/summary` | Score summary | Admin, HM |

### Judge Schema

```typescript
interface IJudge {
  _id: ObjectId;
  hackathon: ObjectId;
  user: ObjectId;
  tracks: ObjectId[];
  assignedBy: ObjectId;
  createdAt: Date;
}
```

### Score Schema

```typescript
interface IScore {
  _id: ObjectId;
  hackathon: ObjectId;
  submission: ObjectId;
  judge: ObjectId;
  criteria: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  totalScore: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.10 Gallery

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/gallery/albums` | List albums | Public |
| GET | `/api/gallery/albums/:id` | Get album with photos | Public |
| POST | `/api/gallery/albums` | Create album | Admin, Organizer, CM |
| PUT | `/api/gallery/albums/:id` | Update album | Admin, Organizer, CM |
| DELETE | `/api/gallery/albums/:id` | Delete album | Admin |
| POST | `/api/gallery/albums/:id/photos` | Upload photos | Admin, Organizer, CM |
| DELETE | `/api/gallery/photos/:id` | Delete photo | Admin, Organizer, CM |

### Album Schema

```typescript
interface IAlbum {
  _id: ObjectId;
  title: string;
  description?: string;
  coverImage: string;
  event?: ObjectId;
  photoCount: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

### Photo Schema

```typescript
interface IPhoto {
  _id: ObjectId;
  album: ObjectId;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  order: number;
  uploadedBy: ObjectId;
  createdAt: Date;
}
```

---

## 3.11 Projects

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/projects` | List projects | Public |
| GET | `/api/projects/:id` | Get project | Public |
| POST | `/api/projects` | Create project | Admin, Organizer |
| PUT | `/api/projects/:id` | Update project | Admin, Organizer |
| DELETE | `/api/projects/:id` | Delete project | Admin |

### Project Schema

```typescript
interface IProject {
  _id: ObjectId;
  name: string;
  description: string;
  thumbnail?: string;
  techStack: string[];
  category: string;
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  contributors: ObjectId[];
  featured: boolean;
  status: 'active' | 'archived';
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.12 Resources

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/resources` | List resources | Public |
| GET | `/api/resources/:id` | Get resource | Public |
| POST | `/api/resources` | Create resource | Admin, CM |
| PUT | `/api/resources/:id` | Update resource | Admin, CM |
| DELETE | `/api/resources/:id` | Delete resource | Admin |

### Resource Schema

```typescript
interface IResource {
  _id: ObjectId;
  title: string;
  description: string;
  type: 'document' | 'video' | 'slides' | 'repository' | 'link';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  fileUrl?: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.13 Blog

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/posts` | List posts (published) | Public |
| GET | `/api/posts/:slug` | Get post | Public |
| GET | `/api/posts/drafts` | List drafts | Admin, CM |
| POST | `/api/posts` | Create post | Admin, CM |
| PUT | `/api/posts/:id` | Update post | Admin, CM |
| DELETE | `/api/posts/:id` | Delete post | Admin |
| PATCH | `/api/posts/:id/publish` | Publish | Admin, CM |

### Post Schema

```typescript
interface IPost {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;       // Rich text / MDX
  excerpt: string;
  coverImage?: string;
  author: ObjectId;
  tags: string[];
  category?: string;
  featured: boolean;
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.14 Team Members

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/team-members` | List team members | Public |
| POST | `/api/team-members` | Add team member | Admin |
| PUT | `/api/team-members/:id` | Update | Admin |
| DELETE | `/api/team-members/:id` | Remove | Admin |
| PATCH | `/api/team-members/reorder` | Reorder | Admin |

### TeamMember Schema

```typescript
interface ITeamMember {
  _id: ObjectId;
  user: ObjectId;
  displayRole: string;
  group: 'leadership' | 'organizer' | 'volunteer';
  bio?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.15 Partners

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/partners` | List partners | Public |
| POST | `/api/partners` | Add partner | Admin |
| PUT | `/api/partners/:id` | Update | Admin |
| DELETE | `/api/partners/:id` | Remove | Admin |

### Partner Schema

```typescript
interface IPartner {
  _id: ObjectId;
  name: string;
  logo: string;
  description?: string;
  website?: string;
  tier: 'platinum' | 'gold' | 'silver' | 'community';
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.16 Certificates

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/certificates` | List certificates | Admin, Organizer |
| GET | `/api/certificates/my` | My certificates | Member |
| GET | `/api/certificates/:id` | Get certificate | Owner, Admin |
| GET | `/api/certificates/verify/:code` | Public verify | Public |
| POST | `/api/certificates` | Issue certificate | Admin, Organizer |
| POST | `/api/certificates/bulk` | Bulk issue | Admin, Organizer |
| DELETE | `/api/certificates/:id` | Revoke | Admin |

### Certificate Schema

```typescript
interface ICertificate {
  _id: ObjectId;
  user: ObjectId;
  type: 'event_attendance' | 'event_speaker' | 'hackathon_participation' | 'hackathon_winner' | 'volunteer' | 'special';
  title: string;
  description?: string;
  event?: ObjectId;
  hackathon?: ObjectId;
  verificationCode: string;
  fileUrl?: string;
  status: 'pending' | 'issued';
  issuedBy: ObjectId;
  issuedAt: Date;
  createdAt: Date;
}
```

---

## 3.17 Announcements

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/announcements` | List announcements | Member |
| GET | `/api/announcements/:id` | Get detail | Member |
| POST | `/api/announcements` | Create | Admin, Organizer |
| PUT | `/api/announcements/:id` | Update | Admin, Organizer |
| DELETE | `/api/announcements/:id` | Delete | Admin |

### Announcement Schema

```typescript
interface IAnnouncement {
  _id: ObjectId;
  title: string;
  body: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  targetAudience: 'all' | 'members' | 'organizers';
  pinned: boolean;
  active: boolean;
  createdBy: ObjectId;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.18 CMS Content

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/content` | List all blocks | Public |
| GET | `/api/content/:key` | Get block by key | Public |
| PUT | `/api/content/:key` | Update block | Admin, CM |

### ContentBlock Schema

```typescript
interface IContentBlock {
  _id: ObjectId;
  key: string;          // e.g., 'home_hero', 'about_mission'
  section: string;      // e.g., 'home', 'about'
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  items?: Record<string, any>[];
  metadata?: Record<string, any>;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 3.19 Analytics

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/analytics/overview` | Platform stats | Admin, Organizer |
| GET | `/api/analytics/members` | Member metrics | Admin, Organizer |
| GET | `/api/analytics/events` | Event metrics | Admin, Organizer |
| GET | `/api/analytics/hackathons` | Hackathon metrics | Admin, HM |
| GET | `/api/analytics/growth` | Growth trends | Admin |

### Computed Metrics

```typescript
interface IAnalyticsOverview {
  totalMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalHackathons: number;
  activeHackathons: number;
  totalProjects: number;
  totalCertificates: number;
  pendingApplications: number;
}
```

---

## 3.20 Settings

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/settings` | Get all settings | Admin |
| GET | `/api/settings/:key` | Get setting | Admin |
| PUT | `/api/settings/:key` | Update setting | Admin |

### Setting Schema

```typescript
interface ISetting {
  _id: ObjectId;
  key: string;
  value: any;
  category: 'general' | 'email' | 'features' | 'integrations';
  description?: string;
  updatedBy: ObjectId;
  updatedAt: Date;
}
```

---

## 3.21 Audit Logs

### Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/audit-logs` | List logs (paginated) | Admin |
| GET | `/api/audit-logs/:id` | Get detail | Admin |

### AuditLog Schema

```typescript
interface IAuditLog {
  _id: ObjectId;
  actor: ObjectId;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'login' | 'export';
  resource: string;     // e.g., 'event', 'user', 'hackathon'
  resourceId: ObjectId;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
```

---

# Global Workflows

## Member Onboarding

```
Visitor submits Join form
  → Application created (Pending)
  → Desktop app: review queue
  → Admin approves
    → User account created
    → Welcome email sent
    → Member can login
  → Admin rejects
    → Rejection email sent
```

## Event Lifecycle

```
Admin creates event (Draft)
  → Publish (Published)
  → Members register
  → Event day (Live)
  → Mark attendance
  → Post-event actions
    → Upload gallery
    → Issue certificates
  → Mark Completed
```

## Hackathon Lifecycle

```
Admin creates hackathon (Draft)
  → Open registration (Open)
  → Members register, form teams
  → Hacking begins (Live)
  → Teams submit projects
  → Submissions locked (Judging)
  → Judges score submissions
  → Results announced (Completed)
  → Certificates issued
```

## Submission Judging

```
Submission locked
  → Assigned judges review
  → Each judge scores per criteria
  → Scores aggregated
  → Rankings computed per track
  → Winners announced
```

## Certificate Issuing

```
Trigger (attendance/winner/manual)
  → Certificate record created (Pending)
  → PDF generated from template
  → Certificate Issued
  → Member can view & download
  → Public verification URL active
```

## Content Publishing

```
Author creates content (Draft)
  → Editor reviews
  → Publish (Published)
  → Visible on website
  → Archive (optional)
```

---

# Security Model

| Concern | Implementation |
|---|---|
| **Authentication** | JWT (access 15min + refresh 7d) |
| **Authorization** | RBAC middleware on every protected route |
| **Password** | bcrypt hashing (salt rounds 12) |
| **Input Validation** | Zod schemas on all endpoints |
| **File Upload** | Type + size validation, Cloudinary processing |
| **Rate Limiting** | Express rate limiter on auth routes |
| **CORS** | Whitelist web + desktop origins |
| **Audit Trail** | All mutations logged with actor + details |
| **Data Sanitization** | mongo-sanitize + xss-clean |
| **Headers** | Helmet.js security headers |
| **HTTPS** | Enforced in production |

---

# Data Model (Entity Relationship)

```
User ──< Registration >── Event
User ──< Attendance >── Event
User ──< Application
User ──< TeamMembership >── Team >── Hackathon
User ──< Certificate
User ──< AuditLog (as actor)

Hackathon ──< Track
Hackathon ──< Team
Team ──< Submission
Track ──< Submission
Track ──< Judge assignment
Judge ──< Score >── Submission

Album ──< Photo
Album ──? Event

Project ──< Contributors (User refs)
Post ──> Author (User ref)
Resource ──> CreatedBy (User ref)
TeamMember ──> User
Partner (standalone)
Announcement ──> CreatedBy
ContentBlock (standalone, keyed)
Setting (standalone, keyed)
```

---

# State Machines

## Member Status

```
         ┌─────────┐
         │ Pending  │ (Application submitted)
         └────┬─────┘
              │ approve
         ┌────▼─────┐
         │  Active   │
         └────┬─────┘
              │ deactivate
         ┌────▼──────┐
         │ Inactive   │
         └────┬──────┘
              │ reactivate
              └──────► Active
```

## Event Status

```
  Draft → Published → Live → Completed
                   ↘ Cancelled
```

## Hackathon Status

```
  Draft → Open → Live → Judging → Completed
```

## Submission Status

```
  Draft → Submitted → Locked
```

## Certificate Status

```
  Pending → Issued
```

---

# Folder Structures

## Frontend (React Website)

```
Apex-Circle-Frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── common/          # Button, Card, Modal, Input, etc.
│   │   ├── layout/          # Header, Footer, Sidebar, Layout
│   │   ├── home/            # HomePage sections
│   │   ├── events/          # Event components
│   │   ├── hackathons/      # Hackathon components
│   │   ├── gallery/         # Gallery components
│   │   ├── projects/        # Project components
│   │   ├── resources/       # Resource components
│   │   ├── blog/            # Blog components
│   │   ├── team/            # Team components
│   │   ├── partners/        # Partner components
│   │   ├── auth/            # Login, Register forms
│   │   └── dashboard/       # Member dashboard components
│   ├── pages/
│   │   ├── public/          # Home, About, Events, etc.
│   │   ├── auth/            # Login, ForgotPassword
│   │   └── dashboard/       # Member dashboard pages
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API service functions
│   ├── stores/              # Zustand stores
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── lib/                 # Third-party configs
│   ├── constants/           # App constants
│   ├── router/              # React Router config
│   ├── styles/              # Global styles
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── .env
```

## Desktop App (Tauri + React)

```
Apex-Circle-Desktop-Application/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/          # AppShell, Sidebar, TopBar
│   │   ├── dashboard/
│   │   ├── members/
│   │   ├── applications/
│   │   ├── events/
│   │   ├── hackathons/
│   │   ├── gallery/
│   │   ├── projects/
│   │   ├── resources/
│   │   ├── blog/
│   │   ├── team/
│   │   ├── partners/
│   │   ├── certificates/
│   │   ├── announcements/
│   │   ├── content/
│   │   ├── analytics/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── audit/
│   ├── pages/               # One per module
│   ├── hooks/
│   ├── services/            # API service (same backend)
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── router/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── capabilities/
│   ├── icons/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── build.rs
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── .env
```

## Backend API

```
Apex-Circle-Backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── cloudinary.ts
│   │   ├── cors.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   ├── validate.ts
│   │   ├── upload.ts
│   │   ├── rateLimiter.ts
│   │   ├── errorHandler.ts
│   │   └── audit.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Application.ts
│   │   ├── Event.ts
│   │   ├── Registration.ts
│   │   ├── Attendance.ts
│   │   ├── Hackathon.ts
│   │   ├── Track.ts
│   │   ├── Team.ts
│   │   ├── Submission.ts
│   │   ├── Judge.ts
│   │   ├── Score.ts
│   │   ├── Album.ts
│   │   ├── Photo.ts
│   │   ├── Project.ts
│   │   ├── Resource.ts
│   │   ├── Post.ts
│   │   ├── TeamMember.ts
│   │   ├── Partner.ts
│   │   ├── Certificate.ts
│   │   ├── Announcement.ts
│   │   ├── ContentBlock.ts
│   │   ├── Setting.ts
│   │   └── AuditLog.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── applications.routes.ts
│   │   ├── events.routes.ts
│   │   ├── hackathons.routes.ts
│   │   ├── teams.routes.ts
│   │   ├── submissions.routes.ts
│   │   ├── judges.routes.ts
│   │   ├── scores.routes.ts
│   │   ├── gallery.routes.ts
│   │   ├── projects.routes.ts
│   │   ├── resources.routes.ts
│   │   ├── posts.routes.ts
│   │   ├── team-members.routes.ts
│   │   ├── partners.routes.ts
│   │   ├── certificates.routes.ts
│   │   ├── announcements.routes.ts
│   │   ├── content.routes.ts
│   │   ├── analytics.routes.ts
│   │   ├── settings.routes.ts
│   │   └── audit.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── applications.controller.ts
│   │   ├── events.controller.ts
│   │   ├── hackathons.controller.ts
│   │   ├── teams.controller.ts
│   │   ├── submissions.controller.ts
│   │   ├── judges.controller.ts
│   │   ├── scores.controller.ts
│   │   ├── gallery.controller.ts
│   │   ├── projects.controller.ts
│   │   ├── resources.controller.ts
│   │   ├── posts.controller.ts
│   │   ├── team-members.controller.ts
│   │   ├── partners.controller.ts
│   │   ├── certificates.controller.ts
│   │   ├── announcements.controller.ts
│   │   ├── content.controller.ts
│   │   ├── analytics.controller.ts
│   │   ├── settings.controller.ts
│   │   └── audit.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── applications.service.ts
│   │   ├── events.service.ts
│   │   ├── hackathons.service.ts
│   │   ├── teams.service.ts
│   │   ├── submissions.service.ts
│   │   ├── judges.service.ts
│   │   ├── scores.service.ts
│   │   ├── gallery.service.ts
│   │   ├── projects.service.ts
│   │   ├── resources.service.ts
│   │   ├── posts.service.ts
│   │   ├── team-members.service.ts
│   │   ├── partners.service.ts
│   │   ├── certificates.service.ts
│   │   ├── announcements.service.ts
│   │   ├── content.service.ts
│   │   ├── analytics.service.ts
│   │   ├── settings.service.ts
│   │   ├── audit.service.ts
│   │   ├── email.service.ts
│   │   └── cloudinary.service.ts
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── users.validator.ts
│   │   ├── applications.validator.ts
│   │   ├── events.validator.ts
│   │   ├── hackathons.validator.ts
│   │   ├── teams.validator.ts
│   │   ├── submissions.validator.ts
│   │   ├── scores.validator.ts
│   │   ├── gallery.validator.ts
│   │   ├── projects.validator.ts
│   │   ├── resources.validator.ts
│   │   ├── posts.validator.ts
│   │   ├── partners.validator.ts
│   │   ├── certificates.validator.ts
│   │   ├── announcements.validator.ts
│   │   └── content.validator.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   ├── event.types.ts
│   │   ├── hackathon.types.ts
│   │   └── common.types.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── response.ts
│   │   ├── pagination.ts
│   │   ├── slug.ts
│   │   └── token.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── Dockerfile
└── docker-compose.yml
```

---

# API Routes Map (Complete)

## Auth (`/api/auth`)

```
POST   /login
POST   /register
POST   /refresh
POST   /logout
POST   /forgot-password
POST   /reset-password
GET    /me
```

## Users (`/api/users`)

```
GET    /
GET    /:id
PUT    /:id
PATCH  /:id/role
PATCH  /:id/status
DELETE /:id
GET    /:id/activity
```

## Applications (`/api/applications`)

```
POST   /
GET    /
GET    /:id
PATCH  /:id/approve
PATCH  /:id/reject
```

## Events (`/api/events`)

```
GET    /
GET    /:slug
POST   /
PUT    /:id
DELETE /:id
PATCH  /:id/status
POST   /:id/register
DELETE /:id/register
GET    /:id/registrations
POST   /:id/attendance
GET    /:id/attendance
```

## Hackathons (`/api/hackathons`)

```
GET    /
GET    /:slug
POST   /
PUT    /:id
DELETE /:id
PATCH  /:id/status
POST   /:id/register
GET    /:id/teams
GET    /:id/submissions
GET    /:id/results
```

## Teams (`/api/teams`)

```
POST   /
GET    /:id
PUT    /:id
POST   /:id/join
POST   /:id/leave
DELETE /:id/members/:userId
```

## Submissions (`/api/submissions`)

```
POST   /
GET    /:id
PUT    /:id
PATCH  /:id/lock
```

## Judges (`/api/judges`)

```
POST   /
GET    /hackathon/:id
DELETE /:id
```

## Scores (`/api/scores`)

```
POST   /
GET    /submission/:id
GET    /hackathon/:id/summary
```

## Gallery (`/api/gallery`)

```
GET    /albums
GET    /albums/:id
POST   /albums
PUT    /albums/:id
DELETE /albums/:id
POST   /albums/:id/photos
DELETE /photos/:id
```

## Projects (`/api/projects`)

```
GET    /
GET    /:id
POST   /
PUT    /:id
DELETE /:id
```

## Resources (`/api/resources`)

```
GET    /
GET    /:id
POST   /
PUT    /:id
DELETE /:id
```

## Posts (`/api/posts`)

```
GET    /
GET    /:slug
GET    /drafts
POST   /
PUT    /:id
DELETE /:id
PATCH  /:id/publish
```

## Team Members (`/api/team-members`)

```
GET    /
POST   /
PUT    /:id
DELETE /:id
PATCH  /reorder
```

## Partners (`/api/partners`)

```
GET    /
POST   /
PUT    /:id
DELETE /:id
```

## Certificates (`/api/certificates`)

```
GET    /
GET    /my
GET    /:id
GET    /verify/:code
POST   /
POST   /bulk
DELETE /:id
```

## Announcements (`/api/announcements`)

```
GET    /
GET    /:id
POST   /
PUT    /:id
DELETE /:id
```

## Content (`/api/content`)

```
GET    /
GET    /:key
PUT    /:key
```

## Analytics (`/api/analytics`)

```
GET    /overview
GET    /members
GET    /events
GET    /hackathons
GET    /growth
```

## Settings (`/api/settings`)

```
GET    /
GET    /:key
PUT    /:key
```

## Audit Logs (`/api/audit-logs`)

```
GET    /
GET    /:id
```

---

# DB Schema Reference

> All schemas use Mongoose with TypeScript. Timestamps (`createdAt`, `updatedAt`) are auto-managed.

### Index Strategy

| Collection | Indexes |
|---|---|
| User | `email` (unique), `role`, `status` |
| Application | `email` (unique), `status` |
| Event | `slug` (unique), `status`, `startDate` |
| Registration | `{event, user}` (compound unique) |
| Attendance | `{event, user}` (compound unique) |
| Hackathon | `slug` (unique), `status` |
| Team | `{hackathon, name}` (compound unique), `inviteCode` |
| Submission | `{hackathon, team}` (compound unique) |
| Score | `{submission, judge}` (compound unique) |
| Album | `event` |
| Photo | `album` |
| Post | `slug` (unique), `status`, `tags` |
| Certificate | `verificationCode` (unique), `user` |
| ContentBlock | `key` (unique) |
| Setting | `key` (unique) |
| AuditLog | `actor`, `resource`, `createdAt` |

---

# Implementation Priority

## Phase 1 — Foundation (Weeks 1-3)

- [ ] Backend: Project setup, config, database connection
- [ ] Backend: Auth module (login, JWT, RBAC middleware)
- [ ] Backend: User CRUD
- [ ] Backend: Applications module
- [ ] Frontend: Project setup, routing, layout
- [ ] Frontend: Home page (static first)
- [ ] Frontend: Auth pages (login)
- [ ] Desktop: Project setup, layout shell, auth

## Phase 2 — Core Features (Weeks 4-7)

- [ ] Backend: Events module (full CRUD + registration + attendance)
- [ ] Backend: Gallery module
- [ ] Backend: Projects module
- [ ] Backend: Blog module
- [ ] Frontend: Events pages (list + detail + registration)
- [ ] Frontend: Gallery, Projects, Blog pages
- [ ] Frontend: Member dashboard (overview, my events)
- [ ] Desktop: Members management
- [ ] Desktop: Applications management
- [ ] Desktop: Events management
- [ ] Desktop: Gallery management

## Phase 3 — Hackathons (Weeks 8-11)

- [ ] Backend: Hackathons module
- [ ] Backend: Teams module
- [ ] Backend: Submissions module
- [ ] Backend: Judging module (judges + scores)
- [ ] Frontend: Hackathon pages (list + detail + registration)
- [ ] Frontend: Team management, submission
- [ ] Desktop: Hackathons management
- [ ] Desktop: Submissions & judging

## Phase 4 — Content & Operations (Weeks 12-14)

- [ ] Backend: CMS Content module
- [ ] Backend: Resources module
- [ ] Backend: Team Members + Partners modules
- [ ] Backend: Certificates module
- [ ] Backend: Announcements module
- [ ] Frontend: Resources, Team, Partners pages
- [ ] Frontend: Certificates page
- [ ] Desktop: CMS content management
- [ ] Desktop: Certificates management
- [ ] Desktop: Announcements

## Phase 5 — Analytics & Polish (Weeks 15-17)

- [ ] Backend: Analytics + Reports modules
- [ ] Backend: Settings + Audit modules
- [ ] Desktop: Analytics dashboards
- [ ] Desktop: Reports + export
- [ ] Desktop: Settings + Audit logs
- [ ] Frontend: Polish, animations, responsive
- [ ] All: Testing, bug fixes, optimization
- [ ] All: Documentation

---

> **This document serves as the single source of truth for Apex Circle platform development.**  
> Last updated: February 2026
