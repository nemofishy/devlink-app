"use client";

import { useEffect, useState } from "react";
import { currentStartup, candidateSprints } from "../../../lib/startupData";
import { useStore } from "../../../lib/store";

const difficultyStyles = {
  Beginner: "bg-teal/10 text-teal-dark",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function BacklogPage() {
  const { state, connectRepo, approveCandidate, rejectCandidate } = useStore();
  const [connecting, setConnecting] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    if (state.repoConnected && !analyzed && !analyzing) setAnalyzed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.repoConnected]);

  function handleConnect() {
    setConnecting(true);
    setTimeout(() => {
      connectRepo();
      setConnecting(false);
      setAnalyzing(true);
      setTimeout(() => setAnalyzed(true), 1600);
    }, 1000);
  }

  const showSuggestions = state.repoConnected && analyzed;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:py-10">
      <h1 className="font-head text-2xl font-bold text-ink">Backlog &amp; Repo</h1>
      <p className="mt-1 text-sm text-inkmuted">
        Connect your GitHub repository and the AI Sprint Decomposer will scan your backlog for bounded,
        completable tasks.
      </p>

      {!state.repoConnected ? (
        <div className="mt-6 rounded-xl border-2 border-dashed border-line bg-card p-10 text-center">
          <p className="font-head text-lg font-bold text-ink">Connect {currentStartup.repoName}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-inkmuted">
            We only ever work in an ephemeral, sandboxed fork. Your production repository is never accessed
            directly.
          </p>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="mt-5 rounded-md bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-black disabled:opacity-60"
          >
            {connecting ? "Connecting to GitHub…" : "Connect GitHub repository"}
          </button>
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-card2 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span className="text-sm font-semibold text-teal-dark">{currentStartup.repoName} connected</span>
        </div>
      )}

      {analyzing && !analyzed && (
        <div className="mt-6 rounded-xl bg-bgdark p-8 text-center">
          <p className="font-head text-sm font-bold text-white">AI Sprint Decomposer analyzing your codebase…</p>
          <p className="mt-1 text-xs text-slate-400">Scanning open issues, test coverage gaps, and PR patterns</p>
        </div>
      )}

      {showSuggestions && (
        <div className="mt-8">
          <h2 className="mb-3 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">
            AI-suggested Micro-Sprints
          </h2>
          <div className="space-y-3">
            {candidateSprints.map((c) => {
              const approved = state.approvedCandidates.includes(c.id);
              const rejected = state.rejectedCandidates.includes(c.id);
              return (
                <div key={c.id} className="rounded-xl border border-line bg-white p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-head text-base font-bold text-ink">{c.title}</h3>
                      <p className="mt-1.5 text-sm text-inkmuted">{c.rationale}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyles[c.difficulty]}`}>
                          {c.difficulty}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {c.domain}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {c.estHours}h est.
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-head text-lg font-bold text-ink">
                        ₹{c.suggestedPayout.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-inkmuted">suggested payout</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 border-t border-line pt-4">
                    {approved ? (
                      <span className="rounded-md bg-teal/10 px-3 py-1.5 text-xs font-bold text-teal-dark">
                        ✓ Posted to marketplace
                      </span>
                    ) : rejected ? (
                      <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                        Dismissed
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => approveCandidate(c.id)}
                          className="rounded-md bg-teal px-3.5 py-1.5 text-xs font-bold text-white hover:bg-teal-dark"
                        >
                          Approve &amp; post
                        </button>
                        <button
                          onClick={() => rejectCandidate(c.id)}
                          className="rounded-md border border-line px-3.5 py-1.5 text-xs font-semibold text-inkmuted hover:bg-slate-50"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
