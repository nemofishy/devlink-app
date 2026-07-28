"use client";

import Link from "next/link";
import { nimbusLiveSprintIds } from "../../../lib/startupData";
import { findSprint, currentStudent } from "../../../lib/mockData";
import { useStore } from "../../../lib/store";

export default function SubmissionsPage() {
  const { state, startupApprove, startupRequestChanges } = useStore();

  const rows = nimbusLiveSprintIds.map((id) => ({
    sprint: findSprint(id),
    status: state.sprintStatus[id],
    submission: state.submissions[id],
    ai: state.aiReview[id],
    peer: state.peerReview[id],
  }));

  const actionable = rows.filter((r) => r.status === "startup_review");
  const other = rows.filter((r) => r.status !== "startup_review");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:py-10">
      <h1 className="font-head text-2xl font-bold text-ink">Submissions</h1>
      <p className="mt-1 text-sm text-inkmuted">
        Only submissions that already passed AI review and peer review reach this queue.
      </p>

      {actionable.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-line p-10 text-center text-sm text-inkmuted">
          Nothing needs your approval right now. Try completing a sprint from the Student side (browse to
          /student/dashboard) to see it land here.
        </div>
      )}

      <div className="mt-6 space-y-4">
        {actionable.map(({ sprint, submission, ai, peer }) => (
          <div key={sprint.id} className="rounded-xl border border-teal/30 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-head text-base font-bold text-ink">{sprint.title}</h3>
                <p className="mt-1 text-xs text-inkmuted">"{submission?.notes?.prNotes}"</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-head text-lg font-bold text-ink">₹{sprint.payout.toLocaleString("en-IN")}</div>
                <div className="text-xs text-inkmuted">payout on approval</div>
              </div>
            </div>

            <Link
              href={`/u/${currentStudent.handle}`}
              target="_blank"
              className="mt-3 flex items-center gap-3 rounded-lg bg-card2 p-3 transition hover:bg-teal/10"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                {currentStudent.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{currentStudent.name}</p>
                <p className="truncate text-xs text-inkmuted">
                  {currentStudent.college} · {currentStudent.sprintsCompleted} prior sprints · {currentStudent.avgReviewScore}/5 avg
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-teal-dark">View verified profile ↗</span>
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-card p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-inkmuted">AI Review</p>
                <p className="mt-1 text-sm text-ink">{ai?.summary}</p>
              </div>
              <div className="rounded-lg bg-card p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-inkmuted">Peer Review</p>
                <p className="mt-1 text-sm text-ink">
                  {peer?.reviewer} · {peer?.score} / 5
                </p>
                <p className="mt-1 text-xs italic text-inkmuted">"{peer?.note}"</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-line pt-4">
              <button
                onClick={() => startupApprove(sprint.id, sprint.payout)}
                className="rounded-md bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-dark"
              >
                Approve &amp; pay ₹{sprint.payout.toLocaleString("en-IN")}
              </button>
              <button
                onClick={() => startupRequestChanges(sprint.id)}
                className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-inkmuted hover:bg-slate-50"
              >
                Request changes
              </button>
            </div>
          </div>
        ))}
      </div>

      {other.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">
            Everything else
          </h2>
          <div className="space-y-2">
            {other.map(({ sprint, status }) => (
              <div key={sprint.id} className="flex items-center justify-between rounded-lg bg-card px-4 py-3 text-sm">
                <span className="text-ink">{sprint.title}</span>
                <span className="text-xs font-semibold text-inkmuted">
                  {status === "approved" ? "Completed ✓" : status ? "In progress" : "Not yet accepted by a student"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
