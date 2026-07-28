// Mock data layer for the DevLink.ai prototype.
// In a real build, every export here becomes an API call (REST/GraphQL) to the backend.

export const currentStudent = {
  id: "u-siddharth",
  name: "Siddharth Rao",
  handle: "siddharth-rao",
  college: "Tier-2 Private Engineering College, Pune",
  year: "2nd Year, B.E. Computer Engineering",
  stack: ["React", "Node.js", "Express", "MongoDB", "Git"],
  avatarInitials: "SR",
  totalEarnings: 13500,
  sprintsCompleted: 3,
  avgReviewScore: 4.6,
};

export const sprintCatalog = [
  {
    id: "spr-101",
    title: "Add unit tests for the UserProfile component",
    startup: "NimbusLogix",
    startupStage: "Seed — Logistics SaaS",
    stack: ["React", "Jest"],
    difficulty: "Intermediate",
    domain: "Testing",
    estHours: 8,
    payout: 4500,
    deadlineDays: 3,
    matchScore: 94,
    summary:
      "The UserProfile component has zero test coverage. We need unit tests covering render states, form validation, and the avatar upload edge case.",
    acceptanceCriteria: [
      "80%+ statement coverage on UserProfile.jsx",
      "Cover: empty state, loading state, validation errors, successful save",
      "Use existing test utilities in /test/utils — do not introduce a new testing library",
      "No console warnings on test run",
    ],
    codebaseContext:
      "This is a mid-sized React + Node/Express app. The component you'll touch sits in a codebase with ~40k lines. Three existing test files show the team's conventions — read them before writing new tests.",
    files: [
      { path: "src/components/UserProfile.jsx", kind: "target" },
      { path: "src/components/UserProfile.test.jsx", kind: "new" },
      { path: "test/utils/renderWithProviders.js", kind: "reference" },
      { path: "src/components/__tests__/Avatar.test.jsx", kind: "reference" },
    ],
    sourcePreview: `export function UserProfile({ user, onSave }) {
  const [form, setForm] = useState(user);
  const [saving, setSaving] = useState(false);

  if (!user) return <ProfileSkeleton />;

  async function handleSave() {
    setSaving(true);
    await api.updateProfile(form);
    setSaving(false);
    onSave(form);
  }

  return (
    <div className="profile-card">
      <Avatar url={user.avatarUrl} />
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <button onClick={handleSave} disabled={saving}>Save</button>
    </div>
  );
}`,
    scaffold: `import { render, screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test/utils/renderWithProviders";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  it("shows a skeleton while user is loading", () => {
    // TODO
  });

  it("renders the saved name and avatar", () => {
    // TODO
  });

  it("disables the Save button while saving", () => {
    // TODO
  });

  it("handles a user with no avatarUrl without throwing", () => {
    // TODO — this is the edge case called out in the brief
  });
});`,
  },
  {
    id: "spr-102",
    title: "Refactor ProductCard to match updated Figma spec",
    startup: "Farmly",
    startupStage: "Pre-Seed — AgriTech Marketplace",
    stack: ["React", "Tailwind"],
    difficulty: "Beginner",
    domain: "Frontend",
    estHours: 6,
    payout: 3200,
    deadlineDays: 4,
    matchScore: 88,
    summary:
      "Design refreshed the ProductCard three sprints ago; the implementation drifted. Bring spacing, typography and hover states back in line with the latest Figma file.",
    acceptanceCriteria: [
      "Matches Figma spec pixel-for-pixel at 3 breakpoints (mobile/tablet/desktop)",
      "No visual regression on the product grid or search results pages that reuse this component",
      "Keep existing prop interface — do not introduce breaking changes",
    ],
    codebaseContext:
      "ProductCard is used in 6 places across the app. Check the grid and search result pages after your change.",
    files: [
      { path: "src/components/ProductCard.jsx", kind: "target" },
      { path: "design/ProductCard-spec.fig", kind: "reference" },
    ],
    sourcePreview: `export function ProductCard({ product }) {
  return (
    <div className="p-3 rounded-md border">
      <img src={product.image} className="w-full h-32 object-cover" />
      <h4 className="mt-2 text-sm">{product.name}</h4>
      <p className="text-xs text-gray-500">₹{product.price}</p>
    </div>
  );
}`,
    scaffold: `export function ProductCard({ product }) {
  return (
    <div className="p-4 rounded-lg border hover:shadow-md transition sm:p-4">
      {/* TODO: match spacing/typography tokens from the updated Figma spec */}
      <img src={product.image} className="w-full h-36 object-cover rounded-md" />
      {/* TODO: heading + price styles */}
    </div>
  );
}`,
  },
  {
    id: "spr-103",
    title: "Investigate and fix race condition in payment queue",
    startup: "PayNow",
    startupStage: "Series A — Fintech Infra",
    stack: ["Python", "Celery"],
    difficulty: "Advanced",
    domain: "Backend",
    estHours: 14,
    payout: 9000,
    deadlineDays: 6,
    matchScore: 61,
    summary:
      "Under concurrent load, two workers occasionally pick up the same payment job, causing a duplicate charge. Root-cause it and fix the locking strategy.",
    acceptanceCriteria: [
      "Reproduce the race condition with a test that fails on current code",
      "Fix passes the new test and the full existing suite",
      "No change to the public task API signature",
    ],
    codebaseContext:
      "This sprint requires reading Celery worker configuration and Redis lock usage. Flagged as Advanced — only accept if you're comfortable with concurrency concepts.",
    files: [
      { path: "workers/payment_processor.py", kind: "target" },
      { path: "workers/locks.py", kind: "reference" },
    ],
    sourcePreview: `def process_payment(job):
    lock = acquire_lock(job.id, ttl=30)
    if not lock:
        return  # another worker has it

    if not job.is_valid():
        return  # BUG: lock never released here

    charge(job)
    release_lock(lock)`,
    scaffold: `def process_payment(job):
    lock = acquire_lock(job.id, ttl=LOCK_TTL_SECONDS)
    if not lock:
        return

    try:
        if not job.is_valid():
            return
        charge(job)
    finally:
        release_lock(lock)  # TODO: confirm this covers every early-return path`,
  },
  {
    id: "spr-104",
    title: "Write API documentation for the /orders endpoint suite",
    startup: "NimbusLogix",
    startupStage: "Seed — Logistics SaaS",
    stack: ["Node.js", "OpenAPI"],
    difficulty: "Beginner",
    domain: "Docs",
    estHours: 5,
    payout: 2600,
    deadlineDays: 5,
    matchScore: 79,
    summary:
      "Three integration partners have complained about undocumented order endpoints. Produce OpenAPI-spec documentation with example requests/responses.",
    acceptanceCriteria: [
      "All 7 /orders routes documented with request/response schemas",
      "Include at least one realistic example per route",
      "Validated against the live schema using the provided lint script",
    ],
    codebaseContext: "Read the existing /users docs for the format convention the team already uses.",
    files: [
      { path: "docs/orders.yaml", kind: "new" },
      { path: "docs/users.yaml", kind: "reference" },
      { path: "src/routes/orders.js", kind: "reference" },
    ],
    sourcePreview: `router.post("/orders/:id/cancel", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send();
  if (order.status === "shipped") return res.status(409).send({ error: "already shipped" });
  order.status = "cancelled";
  await order.save();
  res.status(200).send(order);
});`,
    scaffold: `paths:
  /orders/{id}/cancel:
    post:
      summary: Cancel an order
      responses:
        "200":
          description: Order cancelled
        "404":
          description: Order not found
        # TODO: add the 409 case for already-shipped orders`,
  },
];

// Completed sprint history seeded for the portfolio view (independent of live prototype state)
export const seededPortfolio = [
  {
    id: "spr-091",
    title: "Add pagination to the Transactions table",
    startup: "PayNow",
    stack: ["React", "TypeScript"],
    payout: 5200,
    aiScore: 4.7,
    peerScore: 4.8,
    reviewer: "Arjun Menon, IIT Madras",
    completedOn: "2026-05-14",
    peerNote: "Clean implementation, good edge-case handling on empty state.",
  },
  {
    id: "spr-088",
    title: "Fix responsive layout bug on the pricing page",
    startup: "Farmly",
    stack: ["React", "Tailwind"],
    payout: 2800,
    aiScore: 4.4,
    peerScore: 4.5,
    reviewer: "Arjun Menon, IIT Madras",
    completedOn: "2026-04-30",
    peerNote: "Good use of container queries. Minor: could've reused the existing breakpoint tokens.",
  },
  {
    id: "spr-081",
    title: "Add input validation to signup form",
    startup: "NimbusLogix",
    stack: ["Node.js", "Express"],
    payout: 5500,
    aiScore: 4.6,
    peerScore: 4.7,
    reviewer: "Vikram Iyer, Senior SDE",
    completedOn: "2026-04-09",
    peerNote: "Correctly handled async error paths — better than most junior submissions I review.",
  },
];

export function findSprint(id) {
  return sprintCatalog.find((s) => s.id === id);
}

const firstAttemptFindings = {
  "spr-101": [
    { line: 47, severity: "blocker", note: "Missing null check before accessing user.avatarUrl — will throw when a user has no avatar set." },
    { line: 63, severity: "minor", note: "Test description says 'renders correctly' — name it after the behavior being tested instead." },
  ],
  "spr-102": [
    { line: 22, severity: "blocker", note: "Card padding is 12px on mobile; Figma spec calls for 16px at the sm breakpoint." },
  ],
  "spr-103": [
    { line: 88, severity: "blocker", note: "Lock is acquired but not released on the early-return path when the job payload fails validation — this reintroduces the race under load." },
    { line: 12, severity: "minor", note: "Magic number 30 (lock TTL seconds) should be a named constant shared with the worker config." },
  ],
  "spr-104": [
    { line: 4, severity: "minor", note: "The /orders/{id}/cancel example response is missing the 409 conflict case documented in the code." },
  ],
};

const peerNotesByDomain = {
  Testing: "Clean test structure, good use of mocking. Matches team conventions.",
  Frontend: "Pixel-accurate against the spec at all three breakpoints. Nice attention to hover states.",
  Backend: "Correctly reasoned about the concurrency issue — this is senior-level debugging for a student submission.",
  Docs: "Documentation is clear and the examples are realistic. Partner integration friction should drop.",
};

export function getMockAiReview(sprint, attempt) {
  const findings = attempt === 1 ? firstAttemptFindings[sprint.id] || [] : [];
  const blockers = findings.filter((f) => f.severity === "blocker");
  const verdict = blockers.length > 0 ? "changes_requested" : "pass";
  return {
    verdict,
    score: verdict === "pass" ? 4.4 + Math.random() * 0.5 : null,
    findings,
    summary:
      verdict === "pass"
        ? "Static analysis, test coverage, and LLM logic review all pass threshold. Routed to peer review."
        : `${blockers.length} blocking issue${blockers.length > 1 ? "s" : ""} found. Fix and resubmit — no penalty for a first-pass revision.`,
  };
}

export function getMockPeerReview(sprint) {
  return {
    reviewer: sprint.domain === "Backend" ? "Vikram Iyer, Senior SDE" : "Arjun Menon, IIT Madras",
    score: Math.round((4.4 + Math.random() * 0.5) * 10) / 10,
    note: peerNotesByDomain[sprint.domain] || "Solid submission, approved.",
  };
}

export function difficultyColor(difficulty) {
  switch (difficulty) {
    case "Beginner":
      return { bg: "bg-teal-50", text: "text-teal-dark", ring: "ring-teal/30" };
    case "Intermediate":
      return { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber/30" };
    case "Advanced":
      return { bg: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-300" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-600", ring: "ring-slate-300" };
  }
}
