"use client";

import { useState } from "react";
import Link from "next/link";
import { findSprint, getMockAiReview, getMockPeerReview } from "../../../../../lib/mockData";
import { useStore } from "../../../../../lib/store";

const severityStyle = {
  blocker: "bg-rose-100 text-rose-700",
  minor: "bg-amber-100 text-amber-700",
};

export default function ReviewPage({ params }) {
  const sprint = findSprint(params.id);
  const { state, completeAiReview, completePeerReview } = useStore();
  const [aiRunning, setAiRunning] = useState(false);
  const [peerRunning, setPeerRunning] = useState(false);

  if (!sprint) {
    return <div className="mx-auto max-w-3xl px-6 py-16 text-center text-inkmuted">Sprint not found.</div>;
  }

  const submission = state.submissions[sprint.id];
  const attempt = submission?.attempt || 1;
  const aiReview = state.aiReview[sprint.id];
  const peerReview = state.peerReview[sprint.id];
  const status = state.sprintStatus[sprint.id];

  function runAiReview() {
    setAiRunning(true);
    setTimeout(() => {
      const review = getMockAiReview(sprint, attempt);
      completeAiReview(sprint.id, review);
      setAiRunning(false);
    }, 1400);
  }

  function runPeerReview() {
    setPeerRunning(true);
    setTimeout(() => {
      const review = getMockPeerReview(sprint);
      completePeerReview(sprint.id, review);
      setPeerRunning(false);
    }, 1400);
  }

  if (!submission) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-inkmuted">No submission yet for this sprint.</p>
        <Link href={`/student/sprints/${sprint.id}`} className="mt-4 inline-block text-sm font-semibold text-teal-dark">
          ← Back to sprint
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 md:py-10">
      <Link href={`/student/sprints/${sprint.id}`} className="text-sm font-semibold text-inkmuted hover:text-ink">
        ← Back to sprint
      </Link>
      <h1 className="mt-3 font-head text-2xl font-bold text-ink">{sprint.title}</h1>
      <p className="text-sm text-inkmuted">
        {sprint.startup} · attempt {attempt}
      </p>

      <div className="mt-8 space-y-4">
        {/* Step 1: Submission */}
        <StepCard n={1} title="Submitted" done>
          <p className="text-sm text-inkmuted">
            {submission.notes?.prNotes || "No notes provided."}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Submitted {new Date(submission.submittedAt).toLocaleString()}
          </p>
        </StepCard>

        {/* Step 2: AI review */}
        <StepCard
          n={2}
          title="AI Review"
          done={!!aiReview}
          active={!aiReview}
        >
          {!aiReview ? (
            <div>
              <p className="mb-3 text-sm text-inkmuted">
                Static analysis, test coverage, and LLM-based logic review run automatically on submission.
              </p>
              <button
                onClick={runAiReview}
                disabled={aiRunning}
                className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-black disabled:opacity-60"
              >
                {aiRunning ? "Analyzing submission…" : "Run AI review"}
              </button>
            </div>
          ) : (
            <div>
              <div
                className={`mb-3 rounded-md px-3 py-2 text-sm font-semibold ${
                  aiReview.verdict === "pass" ? "bg-teal/10 text-teal-dark" : "bg-amber-100 text-amber-700"
                }`}
              >
                {aiReview.summary}
              </div>
              {aiReview.findings.length > 0 && (
                <ul className="space-y-2">
                  {aiReview.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 rounded-lg bg-card p-3 text-sm">
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${severityStyle[f.severity]}`}>
                        line {f.line}
                      </span>
                      <span className="text-ink">{f.note}</span>
                    </li>
                  ))}
                </ul>
              )}
              {aiReview.verdict === "changes_requested" && (
                <Link
                  href={`/student/sprints/${sprint.id}/workspace`}
                  className="mt-4 inline-block rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
                >
                  Fix and resubmit →
                </Link>
              )}
            </div>
          )}
        </StepCard>

        {/* Step 3: Peer review */}
        <StepCard
          n={3}
          title="Peer Review"
          done={!!peerReview}
          active={aiReview?.verdict === "pass" && !peerReview}
          disabled={!aiReview || aiReview.verdict !== "pass"}
        >
          {!aiReview || aiReview.verdict !== "pass" ? (
            <p className="text-sm text-slate-400">Waiting on a passing AI review before peer review can begin.</p>
          ) : !peerReview ? (
            <div>
              <p className="mb-3 text-sm text-inkmuted">
                A vetted peer reviewer validates the AI's assessment and adds nuanced feedback within a 48-hour SLA.
              </p>
              <button
                onClick={runPeerReview}
                disabled={peerRunning}
                className="rounded-md bg-teal px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-dark disabled:opacity-60"
              >
                {peerRunning ? "Reviewer validating…" : "Send to peer reviewer"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between rounded-lg bg-card p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{peerReview.reviewer}</p>
                  <p className="mt-1 text-sm text-inkmuted">"{peerReview.note}"</p>
                </div>
                <div className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-sm font-bold text-teal-dark">
                  {peerReview.score} / 5
                </div>
              </div>
            </div>
          )}
        </StepCard>

        {/* Step 4: Startup final approval */}
        <StepCard
          n={4}
          title="Startup Final Approval"
          done={status === "approved"}
          active={status === "startup_review"}
          disabled={!peerReview}
        >
          {!peerReview ? (
            <p className="text-sm text-slate-400">Waiting on peer review to complete.</p>
          ) : status === "startup_review" ? (
            <p className="text-sm text-inkmuted">
              On {sprint.startup}'s dashboard now — their CTO reviews AI + peer scores and approves payout,
              typically within a 30-minute weekly review window.
            </p>
          ) : (
            <p className="text-sm text-inkmuted">Approved by {sprint.startup}. Payout released.</p>
          )}
        </StepCard>

        {status === "approved" && (
          <div className="rounded-xl bg-ink p-6 text-center">
            <p className="font-head text-lg font-bold text-white">Sprint approved ✓</p>
            <p className="mt-1 text-sm text-slate-300">
              ₹{sprint.payout.toLocaleString("en-IN")} credited. A verified contribution record was added to your
              portfolio.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                href="/student/portfolio"
                className="rounded-md bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-dark"
              >
                View verified portfolio →
              </Link>
              <Link
                href="/student/dashboard"
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
              >
                Back to sprint feed
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepCard({ n, title, children, done, active, disabled }) {
  return (
    <div
      className={`rounded-xl border p-5 transition ${
        disabled
          ? "border-line bg-slate-50 opacity-60"
          : active
          ? "border-teal/40 bg-white shadow-card"
          : "border-line bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            done ? "bg-teal text-white" : "bg-slate-200 text-slate-500"
          }`}
        >
          {done ? "✓" : n}
        </div>
        <h2 className="font-head text-sm font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-3 pl-9">{children}</div>
    </div>
  );
}
