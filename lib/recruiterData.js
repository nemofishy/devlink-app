// Mock data for the Recruiter (Rahul Singhvi) persona flow.
// Mirrors the "Technical Recruiter" persona: screens 200+ applicants per role, needs a real signal
// of engineering competence that resumes and LeetCode scores can't provide.

export const currentRecruiter = {
  name: "Rahul Singhvi",
  role: "Technical Recruiter",
  company: "Series B Fintech Startup (350 employees)",
  openRoles: 8,
  subscription: "Job Match — $199/month",
};

// Siddharth Rao ("siddharth-rao") is the one candidate wired to the live, shared demo state — his card
// reflects whatever you've actually done as the student in this session. Everyone else is static seed
// data so the search/filter experience has enough volume to feel like a real talent pool.
export const talentPool = [
  {
    handle: "siddharth-rao",
    name: "Siddharth Rao",
    college: "Tier-2 Private Engineering College, Pune",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    domains: ["Frontend", "Testing"],
    live: true, // pulls real values from the shared store instead of the numbers below
    sprintsCompleted: 3,
    avgScore: 4.6,
    lastActive: "Today",
  },
  {
    handle: "ananya-verma",
    name: "Ananya Verma",
    college: "NIT Surathkal",
    stack: ["Python", "Django", "PostgreSQL"],
    domains: ["Backend"],
    sprintsCompleted: 11,
    avgScore: 4.8,
    lastActive: "2 days ago",
    sampleSprints: [
      { title: "Add idempotency keys to the payments webhook handler", startup: "Ledgerly", score: 4.9 },
      { title: "Optimize N+1 query on the invoices dashboard", startup: "Ledgerly", score: 4.7 },
      { title: "Migrate auth middleware to async/await", startup: "Farmly", score: 4.8 },
    ],
  },
  {
    handle: "rohit-bansal",
    name: "Rohit Bansal",
    college: "VIT Vellore",
    stack: ["React", "TypeScript", "Tailwind"],
    domains: ["Frontend"],
    sprintsCompleted: 7,
    avgScore: 4.4,
    lastActive: "1 week ago",
    sampleSprints: [
      { title: "Build responsive pricing table component", startup: "Farmly", score: 4.5 },
      { title: "Fix accessibility issues on the checkout flow", startup: "Ledgerly", score: 4.3 },
    ],
  },
  {
    handle: "farhan-sheikh",
    name: "Farhan Sheikh",
    college: "Jadavpur University",
    stack: ["Python", "Celery", "Redis"],
    domains: ["Backend", "DevOps"],
    sprintsCompleted: 15,
    avgScore: 4.7,
    lastActive: "3 days ago",
    sampleSprints: [
      { title: "Add dead-letter queue for failed background jobs", startup: "PayNow", score: 4.8 },
      { title: "Set up autoscaling rules for the worker fleet", startup: "PayNow", score: 4.6 },
      { title: "Reduce Celery task latency under peak load", startup: "NimbusLogix", score: 4.7 },
    ],
  },
  {
    handle: "meher-kaur",
    name: "Meher Kaur",
    college: "Thapar Institute",
    stack: ["Node.js", "Express", "Jest"],
    domains: ["Testing", "Backend"],
    sprintsCompleted: 9,
    avgScore: 4.9,
    lastActive: "Today",
    sampleSprints: [
      { title: "Add integration tests for the checkout API", startup: "Farmly", score: 5.0 },
      { title: "Raise test coverage on the auth module to 90%", startup: "NimbusLogix", score: 4.8 },
    ],
  },
  {
    handle: "devansh-patel",
    name: "Devansh Patel",
    college: "SRM Chennai",
    stack: ["React", "Node.js", "MongoDB"],
    domains: ["Frontend", "Backend"],
    sprintsCompleted: 4,
    avgScore: 4.2,
    lastActive: "5 days ago",
    sampleSprints: [
      { title: "Add dark mode toggle to the settings page", startup: "Farmly", score: 4.2 },
      { title: "Fix cart total rounding bug", startup: "Farmly", score: 4.2 },
    ],
  },
];

export const allDomains = ["Frontend", "Backend", "Testing", "DevOps"];
