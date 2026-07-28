"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { currentStudent, sprintCatalog } from "./mockData";

// Lightweight client-side store simulating what would be API-backed state in production.
// Persists to localStorage so the flow survives page navigation/refresh within the prototype.

const STORAGE_KEY = "devlink_prototype_state_v1";

const defaultState = () => ({
  sprintStatus: {}, // sprintId -> "accepted" | "reviewing" | "changes_requested" | "startup_review" | "approved"
  submissions: {}, // sprintId -> { notes, submittedAt, attempt }
  aiReview: {}, // sprintId -> { score, comments: [], verdict }
  peerReview: {}, // sprintId -> { reviewer, score, note }
  earnings: currentStudent.totalEarnings,
  completedSprintIds: [],
  approvedCandidates: [], // startup-side: AI-suggested backlog items approved and posted to the marketplace
  rejectedCandidates: [], // startup-side: AI-suggested backlog items dismissed
  repoConnected: false,
  shortlist: [], // recruiter-side: candidate handles saved for follow-up
});

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state, hydrated]);

  const actions = useMemo(
    () => ({
      acceptSprint(sprintId) {
        setState((s) => ({
          ...s,
          sprintStatus: { ...s.sprintStatus, [sprintId]: "accepted" },
        }));
      },
      submitSprint(sprintId, notes) {
        setState((s) => ({
          ...s,
          sprintStatus: { ...s.sprintStatus, [sprintId]: "reviewing" },
          submissions: {
            ...s.submissions,
            [sprintId]: {
              notes,
              submittedAt: new Date().toISOString(),
              attempt: (s.submissions[sprintId]?.attempt || 0) + 1,
            },
          },
        }));
      },
      completeAiReview(sprintId, review) {
        setState((s) => ({
          ...s,
          aiReview: { ...s.aiReview, [sprintId]: review },
          sprintStatus: {
            ...s.sprintStatus,
            [sprintId]: review.verdict === "pass" ? "peer_review" : "changes_requested",
          },
        }));
      },
      completePeerReview(sprintId, review) {
        setState((s) => ({
          ...s,
          peerReview: { ...s.peerReview, [sprintId]: review },
          sprintStatus: { ...s.sprintStatus, [sprintId]: "startup_review" },
        }));
      },
      startupApprove(sprintId, payout) {
        setState((s) => ({
          ...s,
          sprintStatus: { ...s.sprintStatus, [sprintId]: "approved" },
          earnings: s.earnings + payout,
          completedSprintIds: s.completedSprintIds.includes(sprintId)
            ? s.completedSprintIds
            : [...s.completedSprintIds, sprintId],
        }));
      },
      startupRequestChanges(sprintId) {
        setState((s) => ({
          ...s,
          sprintStatus: { ...s.sprintStatus, [sprintId]: "changes_requested" },
        }));
      },
      approveCandidate(candidateId) {
        setState((s) => ({
          ...s,
          approvedCandidates: s.approvedCandidates.includes(candidateId)
            ? s.approvedCandidates
            : [...s.approvedCandidates, candidateId],
        }));
      },
      rejectCandidate(candidateId) {
        setState((s) => ({
          ...s,
          rejectedCandidates: s.rejectedCandidates.includes(candidateId)
            ? s.rejectedCandidates
            : [...s.rejectedCandidates, candidateId],
        }));
      },
      connectRepo() {
        setState((s) => ({ ...s, repoConnected: true }));
      },
      toggleShortlist(handle) {
        setState((s) => ({
          ...s,
          shortlist: s.shortlist.includes(handle)
            ? s.shortlist.filter((h) => h !== handle)
            : [...s.shortlist, handle],
        }));
      },
      resetSprint(sprintId) {
        setState((s) => {
          const status = { ...s.sprintStatus };
          delete status[sprintId];
          return { ...s, sprintStatus: status };
        });
      },
    }),
    []
  );

  const derived = useMemo(() => {
    const accepted = sprintCatalog.filter((s) => state.sprintStatus[s.id]);
    const inFlight = accepted.filter((s) =>
      ["accepted", "reviewing", "peer_review", "changes_requested"].includes(state.sprintStatus[s.id])
    );
    const approved = accepted.filter((s) => state.sprintStatus[s.id] === "approved");
    return { accepted, inFlight, approved };
  }, [state.sprintStatus]);

  const value = { state, ...actions, ...derived, hydrated };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
