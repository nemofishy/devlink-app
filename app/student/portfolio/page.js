"use client";

import Link from "next/link";
import { currentStudent, seededPortfolio, findSprint } from "../../../lib/mockData";
import { useStore } from "../../../lib/store";

export default function PortfolioPage() {
  const { state } = useStore();

  const liveEntries = state.completedSprintIds.map((id) => {
    const sprint = findSprint(id);
    const peer = state.peerReview[id];
    const ai = state.aiReview[id];
    return {
      id,
      title: sprint.title,
      startup: sprint.startup,
      stack: sprint.stack,
      payout: sprint.payout,
      aiScore: ai?.score ? Math.round(ai.score * 10) / 10 : null,
      peerScore: peer?.score,
      reviewer: peer?.reviewer,
      completedOn: "just now",
      peerNote: peer?.note,
    };
  });

  const entries = [...liveEntries, ...seededPortfolio];

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:py-10">
      <div className="flex flex-col justify-between gap-6 rounded-xl bg-card p-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-head text-2xl font-bold text-ink">My Verified Portfolio</h1>
          <p className="mt-1 text-sm text-inkmuted">
            Every entry below is a cryptographically signed, GitHub-linked contribution record.
          </p>
        </div>
        <Link
          href={`/u/${currentStudent.handle}`}
          target="_blank"
          className="shrink-0 rounded-md bg-ink px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-black"
        >
          View public profile ↗
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Metric label="Verified sprints" value={entries.length} />
        <Metric label="Avg. AI + peer score" value={`${currentStudent.avgReviewScore} / 5`} />
        <Metric label="Total earned" value={`₹${state.earnings.toLocaleString("en-IN")}`} />
      </div>

      <h2 className="mb-3 mt-8 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">
        Contribution history
      </h2>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-semibold text-teal-dark">{e.startup}</p>
                <h3 className="mt-0.5 font-head text-base font-bold text-ink">{e.title}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.stack.map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-head text-base font-bold text-ink">₹{e.payout.toLocaleString("en-IN")}</div>
                <div className="text-xs text-inkmuted">{e.completedOn}</div>
              </div>
            </div>
            {(e.peerNote || e.reviewer) && (
              <div className="mt-4 flex items-center justify-between rounded-lg bg-card px-3 py-2.5">
                <p className="text-xs italic text-inkmuted">
                  {e.reviewer ? `${e.reviewer}: ` : ""}"{e.peerNote}"
                </p>
                {e.peerScore && (
                  <span className="shrink-0 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal-dark">
                    {e.peerScore} / 5
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center">
      <div className="font-head text-xl font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-inkmuted">{label}</div>
    </div>
  );
}
