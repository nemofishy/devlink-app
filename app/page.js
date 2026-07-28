import Link from "next/link";
import MarketingNav from "../components/MarketingNav";

const steps = [
  {
    n: "01",
    title: "AI Sprint Decomposer",
    body: "We analyze a startup's GitHub repo and break its backlog into scoped, matched Micro-Sprints (4–20 hrs).",
  },
  {
    n: "02",
    title: "Sandboxed Cloud",
    body: "You work in an isolated, ephemeral environment. The startup's production code is never exposed.",
  },
  {
    n: "03",
    title: "AI + Peer Review",
    body: "Static analysis and LLM review catch most issues instantly; a human peer reviewer validates the rest.",
  },
  {
    n: "04",
    title: "Verified Portfolio",
    body: "Approved sprints become a cryptographically signed, GitHub-linked contribution record. Real proof.",
  },
];

const stats = [
  { n: "1.5M+", l: "engineering grads/yr in India, ~60% not job-ready" },
  { n: "100,000+", l: "DPIIT-recognised startups sitting on unaddressed backlogs" },
  { n: "$450B+", l: "combined TAM across EdTech, freelance & HR tech" },
];

export default function LandingPage() {
  return (
    <main className="bg-white">
      <div className="bg-bgdark">
        <MarketingNav />
        <section className="relative overflow-hidden">
          <div className="dot-grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
            <p className="mb-4 text-sm font-semibold tracking-widest text-teal-bright">
              FOR CS STUDENTS &amp; EARLY-STAGE STARTUPS
            </p>
            <h1 className="max-w-3xl font-head text-4xl font-bold leading-tight text-white md:text-6xl">
              Prove you can code on <span className="text-teal-bright">real</span> production software.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              DevLink.ai matches you to paid, bounded tasks inside real startup codebases — reviewed by AI
              and peers, verified on your GitHub profile. Not another tutorial clone. Proof.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/login?intent=student"
                className="rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal/20 transition hover:bg-teal-dark"
              >
                I'm a student — browse sprints
              </Link>
              <Link
                href="/login?intent=startup"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                I'm a startup — post a backlog
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-head text-3xl font-bold text-white">{s.n}</div>
                  <div className="mt-1 text-sm text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold tracking-widest text-teal-dark">HOW IT WORKS</p>
        <h2 className="mt-3 max-w-2xl font-head text-3xl font-bold text-ink md:text-4xl">
          Micro-Sprints, not internships.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl bg-card p-6 shadow-card">
              <div className="font-head text-2xl font-bold text-ice">{s.n}</div>
              <h3 className="mt-3 font-head text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-inkmuted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="stakeholders" className="bg-card2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold tracking-widest text-teal-dark">WHO IT'S FOR</p>
          <h2 className="mt-3 max-w-2xl font-head text-3xl font-bold text-ink md:text-4xl">
            Everyone in the loop gets something they can't get elsewhere.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-card">
              <h3 className="font-head text-lg font-bold text-ink">Students</h3>
              <p className="mt-2 text-sm text-inkmuted">
                Earn ₹3,000–₹9,000 per sprint while building a verified portfolio that actually gets you
                interview callbacks.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-card">
              <h3 className="font-head text-lg font-bold text-ink">Startups</h3>
              <p className="mt-2 text-sm text-inkmuted">
                Clear your technical debt backlog at a third of freelancer cost, with zero onboarding
                overhead and no IP exposure.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-card">
              <h3 className="font-head text-lg font-bold text-ink">Recruiters</h3>
              <p className="mt-2 text-sm text-inkmuted">
                Filter for candidates with real, verified production-codebase contributions — not another
                LeetCode score.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-widest text-teal-dark">THE VERIFIED PORTFOLIO</p>
            <h2 className="mt-3 font-head text-3xl font-bold text-ink md:text-4xl">
              A GitHub-linked record no one can fake.
            </h2>
            <p className="mt-4 text-inkmuted">
              Every approved sprint becomes a signed, timestamped contribution record — with AI review
              score, peer reviewer notes, and the real tech stack used. It's the resume line that isn't a
              resume line.
            </p>
            <Link
              href="/u/siddharth-rao"
              className="mt-6 inline-block rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
            >
              View a sample verified profile →
            </Link>
          </div>
          <div className="rounded-xl border border-line bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="font-head font-bold text-ink">Siddharth Rao</div>
              <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-dark">
                3 verified sprints
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Add pagination to Transactions table", "4.7 / 5"],
                ["Fix responsive layout bug on pricing page", "4.4 / 5"],
                ["Add input validation to signup form", "4.6 / 5"],
              ].map(([t, s]) => (
                <div key={t} className="flex items-center justify-between rounded-lg bg-white p-3 text-sm shadow-sm">
                  <span className="text-ink">{t}</span>
                  <span className="font-semibold text-teal-dark">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-bgdark py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
          <span>© 2026 DevLink.ai — Bridging academic coding and production-level engineering.</span>
          <span>Prototype build · not production infrastructure</span>
        </div>
      </footer>
    </main>
  );
}
