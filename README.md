<div align="center">

# DevLink.ai

**AI-driven micro-internship & peer-vetted project marketplace**

*Bridging the gap between academic coding and production-level engineering*

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/status-prototype-orange)](#honest-scope)

</div>

---

## What is this?

Millions of CS students graduate every year without ever touching a real production codebase — and
thousands of early-stage startups sit on backlogs they can't afford to hire for. **DevLink.ai** connects
them through **Micro-Sprints**: small, bounded, paid tasks (4–20 hours) carved out of a real startup's
backlog, completed in a sandboxed environment, reviewed by AI and peers, and recorded as a verified,
GitHub-linked contribution.

This repo is a **fully clickable frontend prototype** of that product — three connected dashboards (Student,
Startup, Recruiter) sharing one live application state, built to prove out the UX before any backend exists.

## Table of contents

- [Features](#features)
- [How the three sides connect](#how-the-three-sides-connect)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Honest scope: what's mocked vs. what production needs](#honest-scope)
- [Tech stack](#tech-stack)
- [Team](#team)

## Features

### 🎓 Student — the supply side
| Route | What it does |
|---|---|
| `/student/dashboard` | Matched sprint feed with difficulty, domain, and payout filters |
| `/student/sprints/[id]` | Full brief, acceptance criteria, codebase context |
| `/student/sprints/[id]/workspace` | The sandbox: file tree, existing code, an editable "your changes" pane, simulated test run, PR-style submission |
| `/student/sprints/[id]/review` | A 4-step pipeline you walk through manually — **AI review → peer review → startup approval → payout**. First attempts intentionally surface a blocking AI comment, so you can see the resubmission loop |
| `/student/portfolio` · `/student/earnings` | Verified contribution history and payout history |

### 🚀 Startup — the demand side
| Route | What it does |
|---|---|
| `/startup/dashboard` | Live sprint status, backlog stats, a banner when something needs approval |
| `/startup/backlog` | Simulated GitHub connect → AI Sprint Decomposer proposes new Micro-Sprints from the backlog |
| `/startup/submissions` | Final-approval queue — sprints that passed AI + peer review land here with both review summaries; approving pays the student |

### 🔍 Recruiter — the monetization layer
| Route | What it does |
|---|---|
| `/recruiter/dashboard` | Searchable/filterable talent pool — by tech stack, domain, minimum review score |
| `/recruiter/shortlist` | Candidates flagged for follow-up |
| `/u/[handle]` | Public verified profile — unfakeable, timestamped contribution record |

## How the three sides connect

This isn't three disconnected screens. **Accept and complete a sprint as the student**, and it lands in the
startup's Submissions queue awaiting final approval. **Approve it as the startup**, and that's what actually
credits the student's earnings and writes their portfolio entry. **Search as the recruiter**, and that same
verified sprint shows up live on the candidate's public profile.

```
Student accepts sprint → submits work
        ↓
   AI review (auto-flags issues on first attempt)
        ↓
   Peer review (human validation)
        ↓
   Startup final approval  ──→  payout + verified portfolio entry
        ↓
   Recruiter sees it on the candidate's public profile
```

State persists to `localStorage`, so refreshing won't reset your progress. To reset the demo: browser
dev tools → Application → Local Storage → clear `devlink_prototype_state_v1`.

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Go to `/login`, pick a role, and try the loop above —
ideally in two or three browser tabs at once (one per role) so you can watch actions on one side show up
on another.

For a production build:

```bash
npm run build
npm start
```

## Project structure

```
app/
├─ page.js                            Landing page
├─ login/page.js                      Role picker (mock auth)
├─ student/
│  ├─ layout.js                       Sidebar shell
│  ├─ dashboard/page.js               Sprint feed
│  ├─ sprints/[id]/page.js            Sprint detail
│  ├─ sprints/[id]/workspace/page.js  Sandbox
│  ├─ sprints/[id]/review/page.js     AI + peer review
│  ├─ portfolio/page.js               Verified portfolio
│  └─ earnings/page.js                Earnings
├─ startup/
│  ├─ layout.js                       Sidebar shell
│  ├─ dashboard/page.js               Overview + approval banner
│  ├─ backlog/page.js                 Repo connect + AI sprint decomposition
│  └─ submissions/page.js             Final-approval queue
├─ recruiter/
│  ├─ layout.js                       Sidebar shell
│  ├─ dashboard/page.js               Talent search + filters
│  └─ shortlist/page.js               Saved candidates
└─ u/[handle]/page.js                 Public verified profile

components/                           Shared UI (cards, shells, code block, logo)
lib/
├─ mockData.js                        Mock sprints, personas, AI/peer review generators
├─ startupData.js                     Mock startup backlog + candidate sprints
├─ recruiterData.js                   Mock talent pool
└─ store.js                           Client-side state: accept/submit/review/approve/payout/shortlist
```

## Honest scope

This prototype proves the UX end to end. It is **not** connected to a real backend — there's no database,
no real authentication, and no live AI, sandbox, or payment infrastructure. Everywhere that mock layer
lives (`lib/mockData.js`, `lib/store.js`) is structured so it can be swapped for real API calls without
restructuring the UI. Turning this into the real product means adding:

- **Auth & accounts** — real login (e.g. NextAuth), role-based access per persona
- **A database** — Postgres, with the schema implied by `lib/mockData.js` (users, sprints, submissions, reviews, payouts)
- **Real sandbox infrastructure** — containerized, ephemeral dev environments (Docker/Kubernetes, e.g. AWS Fargate) instead of a textarea, plus real GitHub API integration for repo forking and PR creation
- **Real AI review** — an LLM API (Claude/GPT-4o) wired to the sprint's actual diff and static analysis tools (ESLint/Pylint), replacing the scripted findings in `lib/mockData.js`
- **Payments** — a payout rail (Razorpay/Stripe Connect) to actually credit students

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS
- **State**: React Context + `localStorage` (no backend yet — see [Honest scope](#honest-scope))
- **Language**: JavaScript

## Team

| Name | Roll No. |
|---|---|
| Nirmit Shah | B085 |
| Mokshesh Sheth | B096 |
| Pushkar Singh | B105 |
| Ayati Jain | B126 |
| Anoushka Jain | B144 |

---

<div align="center">
<sub>We're not building another job board. We're rebuilding the pathway.</sub>
</div>
