"use client";

import Link from "next/link";
import { currentStudent } from "../lib/mockData";
import { useStore } from "../lib/store";

export default function CandidateCard({ candidate }) {
  const { state, toggleShortlist } = useStore();
  const shortlisted = state.shortlist.includes(candidate.handle);

  const sprintsCompleted = candidate.live
    ? currentStudent.sprintsCompleted + state.completedSprintIds.length
    : candidate.sprintsCompleted;
  const avgScore = candidate.live ? currentStudent.avgReviewScore : candidate.avgScore;

  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm transition hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-head text-base font-bold text-ink">{candidate.name}</h3>
              {candidate.live && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">LIVE DEMO</span>
              )}
            </div>
            <p className="text-xs text-inkmuted">{candidate.college}</p>
          </div>
        </div>
        <button
          onClick={() => toggleShortlist(candidate.handle)}
          className={`shrink-0 rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
            shortlisted ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          {shortlisted ? "★ Shortlisted" : "☆ Shortlist"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {candidate.stack.map((t) => (
          <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
        <div>
          <div className="font-head text-base font-bold text-ink">{sprintsCompleted}</div>
          <div className="text-[10px] text-inkmuted">verified sprints</div>
        </div>
        <div>
          <div className="font-head text-base font-bold text-ink">{avgScore}</div>
          <div className="text-[10px] text-inkmuted">avg. score / 5</div>
        </div>
        <div>
          <div className="font-head text-base font-bold text-ink">{candidate.lastActive}</div>
          <div className="text-[10px] text-inkmuted">last active</div>
        </div>
      </div>

      <Link
        href={`/u/${candidate.handle}`}
        target="_blank"
        className="mt-4 block rounded-md bg-ink py-2 text-center text-xs font-bold text-white transition hover:bg-black"
      >
        View verified profile →
      </Link>
    </div>
  );
}
