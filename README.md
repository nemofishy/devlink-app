# DevLink.ai — Frontend Prototype

A clickable, fully-styled Next.js prototype of DevLink.ai's product experience. This is **not** connected
to a real backend — there's no database, no auth, no live AI or sandbox infrastructure. Every interactive
flow (accepting a sprint, submitting work, AI review, peer review, payouts) runs on mock data and a small
client-side store so the whole loop is genuinely clickable end to end.

## What's built

- **Landing page** (`/`) — marketing site matching the pitch deck's navy/teal branding.
- **Login / role picker** (`/login`) — all three sides of the marketplace (Student, Startup, Recruiter) are
  built and share the same live state.
- **Student dashboard** (`/student/dashboard`) — matched sprint feed with difficulty/sort filters.
- **Sprint detail** (`/student/sprints/[id]`) — brief, acceptance criteria, codebase context, files.
- **Sandbox workspace** (`/student/sprints/[id]/workspace`) — the core differentiator: file tree, read-only
  view of the existing code, an editable "your changes" pane, a simulated test run, and a PR-description
  submission step.
- **AI + Peer Review** (`/student/sprints/[id]/review`) — a 4-step review pipeline you can walk through
  manually (Run AI review → Send to peer reviewer → Startup final approval → Approved). The first submission
  attempt on most sprints intentionally surfaces a blocking AI comment, so you can see the resubmission loop,
  matching the "Siddharth's first sprint" story from the research.
- **Verified Portfolio** (`/student/portfolio`) — the student's own contribution history.
- **Public Profile** (`/u/siddharth-rao`) — the shareable, recruiter-facing version of the portfolio.
- **Earnings** (`/student/earnings`) — payout history.
- **Startup dashboard** (`/startup/dashboard`) — Meera's overview: live sprint status, backlog stats, a
  banner when a submission needs her approval.
- **Backlog & Repo** (`/startup/backlog`) — simulated GitHub connect → AI Sprint Decomposer proposes new
  Micro-Sprints from the backlog → approve/dismiss each one.
- **Submissions** (`/startup/submissions`) — the final-approval queue: sprints that passed AI + peer review
  land here with both review summaries, and approving pays the student and completes their portfolio entry.

- **Recruiter dashboard** (`/recruiter/dashboard`) — Rahul's flow: a searchable/filterable talent pool
  (by tech stack, domain, minimum review score), each candidate showing verified sprint count and average
  score.
- **Shortlist** (`/recruiter/shortlist`) — candidates flagged for follow-up.
- **Public verified profiles** (`/u/[handle]`) — every candidate the recruiter clicks into gets a real
  profile page. Siddharth Rao's (`/u/siddharth-rao`) is wired to the live shared state; the other five
  candidates in the talent pool use seeded sample data so search/filter has enough volume to feel real.

**All three personas are connected through the same state.** Accept and complete a sprint as the student,
and it will appear in the startup's Submissions queue awaiting final approval — approving it there is what
actually credits the student's earnings and portfolio, which the recruiter then sees reflected live on
Siddharth's profile. This mirrors the real four-step gate described in the research (AI review → peer
review → startup final sign-off → verified portfolio).

State (which sprints you've accepted/submitted/completed, and your running earnings total) persists to
`localStorage`, so refreshing the page won't reset your progress. Use your browser's dev tools
(Application → Local Storage → clear `devlink_prototype_state_v1`) to reset the demo.

## Running it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

## What "production-ready" would actually require

This prototype proves the UX. Turning it into the real product means replacing the mock layer with:

- **Auth & accounts** — real login (NextAuth or similar), role-based access for students/startups/recruiters.
- **Database** — Postgres (see the persona/market reports for the intended schema: users, sprints,
  submissions, reviews, payouts).
- **Real sandbox infra** — containerized, ephemeral dev environments (Docker/Kubernetes, e.g. AWS Fargate),
  not a textarea. GitHub API integration for actual repo forking and PR creation.
- **Real AI review** — an LLM API (Claude/GPT-4o) wired to the sprint's actual diff, plus static analysis
  tools (ESLint/Pylint) — not the scripted mock findings in `lib/mockData.js`.
- **Payments** — a payout rail (Razorpay/Stripe Connect) for crediting students.
Everywhere the mock data layer (`lib/mockData.js`, `lib/store.js`) is used, it's structured so those calls
can be swapped for real API calls without restructuring the UI.

## Project structure

```
app/
  page.js                              Landing page
  login/page.js                        Role picker (mock auth)
  student/
    layout.js                          Sidebar shell
    dashboard/page.js                  Sprint feed
    sprints/[id]/page.js               Sprint detail
    sprints/[id]/workspace/page.js     Sandbox
    sprints/[id]/review/page.js        AI + peer review
    portfolio/page.js                  Verified portfolio
    earnings/page.js                   Earnings
  startup/
    layout.js                          Sidebar shell
    dashboard/page.js                  Overview + approval banner
    backlog/page.js                    Repo connect + AI sprint decomposition
    submissions/page.js                Final-approval queue
  recruiter/
    layout.js                          Sidebar shell
    dashboard/page.js                  Talent search + filters
    shortlist/page.js                  Saved candidates
  u/[handle]/page.js                   Public verified profile (live for Siddharth, seeded for others)
components/                            Shared UI
lib/mockData.js                        Mock sprints, personas, reviews
lib/startupData.js                     Mock startup backlog + candidate sprints
lib/recruiterData.js                   Mock talent pool
lib/store.js                           Client-side state (accept/submit/review/approve/payout/shortlist)
```
