"use client";

import Link from "next/link";
import { currentStartup, nimbusLiveSprintIds } from "../../../lib/startupData";
import { findSprint } from "../../../lib/mockData";
import { useStore } from "../../../lib/store";

const statusLabel = {
  accepted: "Student working in sandbox",
  reviewing: "Under AI review",
  peer_review: "Under peer review",
  changes_requested: "Changes requested from student",
  startup_review: "Needs your approval",
  approved: "Completed",
};

const statusTone = {
  accepted: "bg-slate-100 text-slate-600",
  reviewing: "bg-slate-100 text-slate-600",
  peer_review: "bg-slate-100 text-slate-600",
  changes_requested: "bg-amber-100 text-amber-700",
  startup_review: "bg-teal/10 text-teal-dark",
  approved: "bg-ink text-white",
};

export default function StartupDashboardPage() {
  const { state } = useStore();

  const liveSprints = nimbusLiveSprintIds.map((id) => ({ sprint: findSprint(id), status: state.sprintStatus[id] }));
  const needsApproval = liveSprints.filter((s) => s.status === "startup_review").length;
  const completed = liveSprints.filter((s) => s.status === "approved").length;
  const active = liveSprints.filter((s) => s.status && s.status !== "approved").length;
  const totalPosted = liveSprints.length + state.approvedCandidates.length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 md:py-10">
      <p className="text-sm text-inkmuted">Welcome back,</p>
      <h1 className="font-head text-2xl font-bold text-ink md:text-3xl">{currentStartup.contact.split(" ")[0]}</h1>
      <p className="mt-1 text-sm text-inkmuted">
        {currentStartup.name} · {currentStartup.stage}
      </p>

      {needsApproval > 0 && (
        <Link
          href="/startup/submissions"
          className="mt-6 flex items-center justify-between rounded-xl bg-ink px-5 py-4 text-white transition hover:bg-black"
        >
          <span className="text-sm font-semibold">
            {needsApproval} submission{needsApproval > 1 ? "s" : ""} passed AI + peer review and need your final approval
          </span>
          <span className="text-sm font-bold">Review now →</span>
        </Link>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Open backlog items" value={currentStartup.backlogSize} />
        <Stat label="Sprints posted" value={totalPosted} />
        <Stat label="Active right now" value={active} />
        <Stat label="Completed" value={completed} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5 md:col-span-2">
          <h2 className="font-head text-sm font-bold uppercase tracking-wide text-inkmuted">Your live sprints</h2>
          <div className="mt-3 space-y-2.5">
            {liveSprints.map(({ sprint, status }) => (
              <div key={sprint.id} className="flex items-center justify-between rounded-lg bg-card px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{sprint.title}</p>
                  <p className="text-xs text-inkmuted">
                    ₹{sprint.payout.toLocaleString("en-IN")} · {sprint.domain}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[status] || "bg-slate-100 text-slate-500"}`}>
                  {status ? statusLabel[status] : "Open — not yet accepted"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-card2 p-5">
          <h2 className="font-head text-sm font-bold text-ink">Why this beats a freelancer</h2>
          <ul className="mt-3 space-y-2 text-sm text-inkmuted">
            <li>✓ Sandbox fork — your production code is never exposed</li>
            <li>✓ AI pre-review cuts your review time to ~30 min/week</li>
            <li>✓ Avg. sprint cost ₹{Math.round((liveSprints[0]?.sprint.payout || 4000))} vs. 3x that for freelance</li>
            <li>✓ Work-for-hire terms — you own everything produced</li>
          </ul>
          <Link
            href="/startup/backlog"
            className="mt-4 block rounded-md bg-teal py-2 text-center text-sm font-bold text-white hover:bg-teal-dark"
          >
            Post more of your backlog →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center">
      <div className="font-head text-2xl font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-inkmuted">{label}</div>
    </div>
  );
}
