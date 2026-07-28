"use client";

import Link from "next/link";
import { useStore } from "../lib/store";

const difficultyStyles = {
  Beginner: "bg-teal/10 text-teal-dark",
  Intermediate: "bg-amber/10 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

const statusMeta = {
  accepted: { label: "Continue in sandbox →", tone: "bg-ink text-white hover:bg-black" },
  reviewing: { label: "Under AI review…", tone: "bg-slate-200 text-slate-500 cursor-default" },
  peer_review: { label: "Awaiting peer review…", tone: "bg-slate-200 text-slate-500 cursor-default" },
  startup_review: { label: "Awaiting startup approval…", tone: "bg-slate-200 text-slate-500 cursor-default" },
  changes_requested: { label: "Changes requested →", tone: "bg-amber-500 text-white hover:bg-amber-600" },
  approved: { label: "Approved ✓ View record", tone: "bg-teal text-white hover:bg-teal-dark" },
};

export default function SprintCard({ sprint }) {
  const { state } = useStore();
  const status = state.sprintStatus[sprint.id];
  const meta = status ? statusMeta[status] : null;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-sm transition hover:shadow-card">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-inkmuted">
              {sprint.startup} · {sprint.startupStage}
            </p>
            <h3 className="mt-1 font-head text-base font-bold leading-snug text-ink">{sprint.title}</h3>
          </div>
          <div className="shrink-0 rounded-full bg-card2 px-2.5 py-1 text-xs font-bold text-teal-dark">
            {sprint.matchScore}% match
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-inkmuted">{sprint.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyles[sprint.difficulty]}`}>
            {sprint.difficulty}
          </span>
          {sprint.stack.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex gap-5 text-sm">
          <div>
            <div className="font-head text-base font-bold text-ink">₹{sprint.payout.toLocaleString("en-IN")}</div>
            <div className="text-xs text-inkmuted">payout</div>
          </div>
          <div>
            <div className="font-head text-base font-bold text-ink">{sprint.estHours}h</div>
            <div className="text-xs text-inkmuted">est. time</div>
          </div>
        </div>
        <Link
          href={status === "accepted" ? `/student/sprints/${sprint.id}/workspace` : `/student/sprints/${sprint.id}`}
          className={`rounded-md px-3.5 py-2 text-xs font-semibold transition ${
            meta ? meta.tone : "bg-ink text-white hover:bg-black"
          }`}
        >
          {meta ? meta.label : "View sprint →"}
        </Link>
      </div>
    </div>
  );
}
