// Mock data for the Startup (Meera Krishnamurthy) persona flow.
// Mirrors the "Startup CTO" persona from the market/persona research: seed-funded B2B SaaS,
// 7-person team, backlog she can't get to, previous internship experiment failed.

export const currentStartup = {
  id: "org-nimbuslogix",
  name: "NimbusLogix",
  stage: "Seed — Logistics Workflow Automation SaaS",
  contact: "Meera Krishnamurthy",
  role: "Co-Founder & CTO",
  team: "7 people (3 engineers, 2 sales, 1 design, 1 ops)",
  stack: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
  monthlyDevBudget: 3000,
  repoConnected: false,
  repoName: "nimbuslogix/core-platform",
  backlogSize: 47,
  avatarInitials: "MK",
};

// The sprints this startup already has posted live (these exist in the shared sprintCatalog too —
// filtered by startup name so Meera's dashboard reflects the same live student activity).
export const nimbusLiveSprintIds = ["spr-101", "spr-104"];

// Backlog items the AI Sprint Decomposer has proposed after analyzing the connected repo,
// but which have not yet been approved/posted to the marketplace.
export const candidateSprints = [
  {
    id: "cand-1",
    title: "Fix inconsistent date formatting across the dashboard",
    domain: "Frontend",
    difficulty: "Beginner",
    estHours: 4,
    suggestedPayout: 2200,
    rationale:
      "Detected 6 different date formats across 14 components. Low risk, high polish impact — good first sprint for a new student.",
  },
  {
    id: "cand-2",
    title: "Add rate limiting to the public webhook endpoint",
    domain: "Backend",
    difficulty: "Intermediate",
    estHours: 10,
    suggestedPayout: 5800,
    rationale:
      "No rate limiting currently exists on /webhooks/inbound. Flagged as a priority after last month's integration partner incident.",
  },
  {
    id: "cand-3",
    title: "Write integration tests for the invoicing module",
    domain: "Testing",
    difficulty: "Intermediate",
    estHours: 9,
    suggestedPayout: 5200,
    rationale:
      "Invoicing has 12% test coverage — the lowest of any module and the one most likely to cause a billing incident.",
  },
  {
    id: "cand-4",
    title: "Migrate legacy CSS modules to Tailwind on the Settings page",
    domain: "Frontend",
    difficulty: "Beginner",
    estHours: 6,
    suggestedPayout: 2800,
    rationale:
      "Settings is the last page still on the old CSS module system, slowing down every design system update.",
  },
];
