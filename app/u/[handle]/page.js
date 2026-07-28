"use client";

import Link from "next/link";
import { currentStudent, seededPortfolio, findSprint } from "../../../lib/mockData";
import { talentPool } from "../../../lib/recruiterData";
import { useStore } from "../../../lib/store";
import Logo from "../../../components/Logo";

export default function PublicProfilePage({ params }) {
  const { state } = useStore();
  const isLiveStudent = params.handle === currentStudent.handle;
  const candidate = !isLiveStudent && talentPool.find((c) => c.handle === params.handle);

  if (!isLiveStudent && !candidate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <div>
          <p className="font-head text-lg font-bold text-ink">Profile not found</p>
          <Link href="/" className="mt-2 inline-block text-sm text-teal-dark">
            ← Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  let profile, entries;

  if (isLiveStudent) {
    const liveEntries = state.completedSprintIds.map((id) => {
      const sprint = findSprint(id);
      const peer = state.peerReview[id];
      return {
        id,
        title: sprint.title,
        startup: sprint.startup,
        payout: sprint.payout,
        peerScore: peer?.score || 4.6,
        reviewer: peer?.reviewer || "Peer reviewer",
        completedOn: "This week",
      };
    });
    entries = [...liveEntries, ...seededPortfolio];
    profile = {
      name: currentStudent.name,
      initials: currentStudent.avatarInitials,
      college: currentStudent.college,
      stack: currentStudent.stack,
      avgScore: currentStudent.avgReviewScore,
    };
  } else {
    entries = candidate.sampleSprints.map((s, i) => ({
      id: `${candidate.handle}-${i}`,
      title: s.title,
      startup: s.startup,
      peerScore: s.score,
      reviewer: "Peer reviewer",
      completedOn: candidate.lastActive,
    }));
    profile = {
      name: candidate.name,
      initials: candidate.name.split(" ").map((n) => n[0]).join(""),
      college: candidate.college,
      stack: candidate.stack,
      avgScore: candidate.avgScore,
    };
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-bgdark py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <Link href="/">
            <Logo dark size="sm" />
          </Link>
          <span className="text-xs text-slate-400">Public Verified Profile — sample</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal text-xl font-bold text-white">
              {profile.initials}
            </div>
            <div>
              <h1 className="font-head text-2xl font-bold text-ink">{profile.name}</h1>
              <p className="text-sm text-inkmuted">{profile.college}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.stack.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-6">
            <Metric label="Verified sprints" value={entries.length} />
            <Metric label="Avg. review score" value={`${profile.avgScore} / 5`} />
            <Metric
              label="Total value delivered"
              value={`₹${entries.reduce((a, e) => a + (e.payout || 0), 0).toLocaleString("en-IN")}+`}
            />
          </div>
        </div>

        <h2 className="mb-3 mt-8 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">
          Verified contribution record
        </h2>
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className="rounded-xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-teal-dark">{e.startup}</p>
                  <h3 className="mt-0.5 font-head text-base font-bold text-ink">{e.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Verified by {e.reviewer} · {e.completedOn}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal-dark">
                  {e.peerScore} / 5
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-card2 p-5 text-center text-sm text-teal-dark">
          This is what a recruiter sees when they check a candidate's DevLink.ai profile — unfakeable, timestamped,
          verified.
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="text-center">
      <div className="font-head text-lg font-bold text-ink">{value}</div>
      <div className="text-xs text-inkmuted">{label}</div>
    </div>
  );
}
