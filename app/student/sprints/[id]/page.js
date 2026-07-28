"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { findSprint } from "../../../../lib/mockData";
import { useStore } from "../../../../lib/store";

const fileKindStyle = {
  target: "bg-amber-100 text-amber-700",
  new: "bg-teal/10 text-teal-dark",
  reference: "bg-slate-100 text-slate-600",
};

export default function SprintDetailPage({ params }) {
  const sprint = findSprint(params.id);
  const router = useRouter();
  const { state, acceptSprint } = useStore();
  const status = state.sprintStatus[sprint?.id];

  if (!sprint) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-inkmuted">Sprint not found.</p>
        <Link href="/student/dashboard" className="mt-4 inline-block text-sm font-semibold text-teal-dark">
          ← Back to feed
        </Link>
      </div>
    );
  }

  function handleAccept() {
    acceptSprint(sprint.id);
    router.push(`/student/sprints/${sprint.id}/workspace`);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:py-10">
      <Link href="/student/dashboard" className="text-sm font-semibold text-inkmuted hover:text-ink">
        ← Back to feed
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-start">
        <div>
          <p className="text-sm font-semibold text-teal-dark">
            {sprint.startup} · {sprint.startupStage}
          </p>
          <h1 className="mt-1 font-head text-2xl font-bold text-ink md:text-3xl">{sprint.title}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-card2 px-2.5 py-1 text-xs font-semibold text-teal-dark">
              {sprint.matchScore}% skill match
            </span>
            {sprint.stack.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full shrink-0 rounded-xl bg-card p-4 md:w-56">
          <Row label="Payout" value={`₹${sprint.payout.toLocaleString("en-IN")}`} />
          <Row label="Est. time" value={`${sprint.estHours} hrs`} />
          <Row label="Deadline" value={`${sprint.deadlineDays} days`} />
          <Row label="Difficulty" value={sprint.difficulty} />
          {!status && (
            <button
              onClick={handleAccept}
              className="mt-3 w-full rounded-md bg-teal py-2.5 text-sm font-bold text-white transition hover:bg-teal-dark"
            >
              Accept sprint
            </button>
          )}
          {status === "accepted" && (
            <Link
              href={`/student/sprints/${sprint.id}/workspace`}
              className="mt-3 block w-full rounded-md bg-ink py-2.5 text-center text-sm font-bold text-white transition hover:bg-black"
            >
              Open sandbox →
            </Link>
          )}
          {(status === "reviewing" || status === "peer_review") && (
            <div className="mt-3 rounded-md bg-slate-200 py-2.5 text-center text-sm font-semibold text-slate-600">
              In review…
            </div>
          )}
          {status === "startup_review" && (
            <div className="mt-3 rounded-md bg-slate-200 py-2.5 text-center text-sm font-semibold text-slate-600">
              Awaiting startup approval…
            </div>
          )}
          {status === "changes_requested" && (
            <Link
              href={`/student/sprints/${sprint.id}/workspace`}
              className="mt-3 block w-full rounded-md bg-amber-500 py-2.5 text-center text-sm font-bold text-white transition hover:bg-amber-600"
            >
              Address feedback →
            </Link>
          )}
          {status === "approved" && (
            <Link
              href="/student/portfolio"
              className="mt-3 block w-full rounded-md bg-teal py-2.5 text-center text-sm font-bold text-white transition hover:bg-teal-dark"
            >
              View verified record →
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Section title="Brief">
            <p className="text-sm leading-relaxed text-inkmuted">{sprint.summary}</p>
          </Section>

          <Section title="Acceptance criteria">
            <ul className="space-y-2">
              {sprint.acceptanceCriteria.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-ink">
                  <span className="mt-0.5 text-teal-dark">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Codebase context">
            <p className="text-sm leading-relaxed text-inkmuted">{sprint.codebaseContext}</p>
          </Section>
        </div>

        <div>
          <Section title="Files in this sprint">
            <div className="space-y-2">
              {sprint.files.map((f) => (
                <div key={f.path} className="flex items-center justify-between rounded-lg bg-card px-3 py-2">
                  <code className="truncate text-xs text-ink">{f.path}</code>
                  <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${fileKindStyle[f.kind]}`}>
                    {f.kind}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 first:mt-0">
      <h2 className="mb-2.5 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-inkmuted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
