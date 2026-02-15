<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/D4E0BAQF1PHwKK_ViDg/img-crop_100/B4EZnsRhrXIIAM-/0/1760605642362?e=1772668800&v=beta&t=zHdmlHtd1gM7B8bS-OHUtzOdNnWiJXSb_k-nPrlHtHg" alt="Apex Circle Logo" width="200" />
</p>

<h1 align="center">Apex Circle</h1>

<p align="center">
  <strong>A developer community platform for engagement, events, hackathons, and collaboration.</strong>
</p>

<p align="center">
  <a href="https://github.com/NexGenStudioDev/Apex-Circle/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/NexGenStudioDev/Apex-Circle?style=flat-square" alt="License" />
  </a>
  <a href="https://github.com/NexGenStudioDev/Apex-Circle/issues">
    <img src="https://img.shields.io/github/issues/NexGenStudioDev/Apex-Circle?style=flat-square" alt="Issues" />
  </a>
  <a href="https://github.com/NexGenStudioDev/Apex-Circle/pulls">
    <img src="https://img.shields.io/github/issues-pr/NexGenStudioDev/Apex-Circle?style=flat-square" alt="Pull Requests" />
  </a>
  <a href="https://github.com/NexGenStudioDev/Apex-Circle/stargazers">
    <img src="https://img.shields.io/github/stars/NexGenStudioDev/Apex-Circle?style=flat-square" alt="Stars" />
  </a>
  <a href="https://github.com/NexGenStudioDev/Apex-Circle/network/members">
    <img src="https://img.shields.io/github/forks/NexGenStudioDev/Apex-Circle?style=flat-square" alt="Forks" />
  </a>
</p>

---

## About

**Apex Circle** is a full-stack developer community platform that powers:

- **Community Website** — Public presence, member onboarding, event participation, and community storytelling
- **Desktop Admin App** — Internal operations console for admins and organizers
- **Backend API** — Centralized API powering both web and desktop clients

Comparable ecosystems: GDG, MLSA, DevRel communities.

---

## Tech Stack

| Layer                 | Technologies                                                                   |
| --------------------- | ------------------------------------------------------------------------------ |
| **Community Website** | React · TypeScript · Tailwind CSS · React Router v6 · TanStack Query · Zustand |
| **Desktop Admin App** | Tauri v2 · React · TypeScript · Tailwind CSS · Vite                            |
| **Backend API**       | Node.js 20+ · Express.js · TypeScript · MongoDB · Mongoose · JWT · Zod         |
| **Infrastructure**    | Vercel · Render/Railway · MongoDB Atlas · Cloudinary · GitHub Actions · Sentry |

---

## Project Structure

```
Apex-Circle/
├── Apex-Circle-Frontend/        # Community website (React + TypeScript + Tailwind)
├── Apex-Circle-Dasktop-Application/  # Desktop admin app (Tauri v2 + React)
├── Apex-Circle-Backend/         # Backend API (Node + Express + TypeScript + MongoDB)
└── IMPLEMENTATION_PLAN.md       # Detailed implementation blueprint
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** ([Install](https://pnpm.io/installation))
- **Rust** (for Tauri desktop app) ([Install](https://www.rust-lang.org/tools/install))
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Clone the Repository

```bash
git clone https://github.com/NexGenStudioDev/Apex-Circle.git
cd Apex-Circle
```

### Community Website (Frontend)

```bash
cd Apex-Circle-Frontend
pnpm install
pnpm dev
```

### Backend API

```bash
cd Apex-Circle-Backend
pnpm install
cp .env.example .env   # Configure environment variables
pnpm dev
```

### Desktop Admin App

```bash
cd Apex-Circle-Dasktop-Application
pnpm install
pnpm tauri dev
```

> **Note:** The desktop app requires Rust and system dependencies for Tauri. See the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your OS.

---

## Features

### Community Website

- Landing page with community intro, stats, and testimonials
- Events listing, registration, and attendance tracking
- Hackathons with team formation, submissions, and judging
- Photo gallery with event-linked albums
- Community blog and learning resources
- Member dashboard with certificates
- Project showcase

### Desktop Admin App

- Member management and role assignments
- Event and hackathon lifecycle management
- Content management (blog, resources, gallery)
- Certificate generation and distribution
- Analytics dashboard
- Audit logs and governance tools

### Backend API

- JWT authentication (access + refresh tokens)
- Role-based access control (RBAC)
- RESTful API with Zod validation
- Media uploads via Cloudinary
- Email notifications (Nodemailer / Resend)
- Structured logging with Winston

---

## Roles & Permissions

| Role                  | Description                                            |
| --------------------- | ------------------------------------------------------ |
| **Visitor**           | Public pages, no authentication required               |
| **Member**            | Dashboard, event registration, hackathon participation |
| **Volunteer**         | Member privileges + limited operational tasks          |
| **Organizer**         | Manage events, hackathons, and content                 |
| **Admin**             | Full platform control                                  |
| **Hackathon Manager** | Hackathon-specific full control                        |
| **Content Manager**   | Blog, resources, CMS, and gallery management           |

---

## Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before getting started.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to your branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## Community

- [Issues](https://github.com/NexGenStudioDev/Apex-Circle/issues) — Report bugs or request features
- [Discussions](https://github.com/NexGenStudioDev/Apex-Circle/discussions) — Ask questions and share ideas
- [Pull Requests](https://github.com/NexGenStudioDev/Apex-Circle/pulls) — Contribute code

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/NexGenStudioDev">NexGenStudio</a>
</p>
