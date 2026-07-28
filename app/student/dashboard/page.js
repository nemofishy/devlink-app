"use client";

import { useMemo, useState } from "react";
import { sprintCatalog, currentStudent } from "../../../lib/mockData";
import { useStore } from "../../../lib/store";
import SprintCard from "../../../components/SprintCard";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function DashboardPage() {
  const { state } = useStore();
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("match");

  const sprints = useMemo(() => {
    let list = sprintCatalog.filter((s) => state.sprintStatus[s.id] !== "approved");
    if (difficulty !== "All") list = list.filter((s) => s.difficulty === difficulty);
    if (sort === "match") list = [...list].sort((a, b) => b.matchScore - a.matchScore);
    if (sort === "payout") list = [...list].sort((a, b) => b.payout - a.payout);
    if (sort === "deadline") list = [...list].sort((a, b) => a.deadlineDays - b.deadlineDays);
    return list;
  }, [difficulty, sort, state.sprintStatus]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-inkmuted">Good to see you back,</p>
          <h1 className="font-head text-2xl font-bold text-ink md:text-3xl">{currentStudent.name.split(" ")[0]} 👋</h1>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <StatPill label="Earned" value={`₹${state.earnings.toLocaleString("en-IN")}`} />
          <StatPill label="Sprints done" value={currentStudent.sprintsCompleted + state.completedSprintIds.length} />
          <StatPill label="Avg. score" value={`${currentStudent.avgReviewScore} / 5`} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-head text-lg font-bold text-ink">Sprint feed</h2>
          <p className="text-sm text-inkmuted">Matched to your stack: {currentStudent.stack.join(", ")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-line">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 text-xs font-semibold transition ${
                  difficulty === d ? "bg-ink text-white" : "bg-white text-inkmuted hover:bg-slate-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-xs font-semibold text-inkmuted focus:outline-none"
          >
            <option value="match">Sort: Best match</option>
            <option value="payout">Sort: Highest payout</option>
            <option value="deadline">Sort: Soonest deadline</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {sprints.map((s) => (
          <SprintCard key={s.id} sprint={s} />
        ))}
        {sprints.length === 0 && (
          <div className="col-span-2 rounded-xl border border-dashed border-line p-10 text-center text-sm text-inkmuted">
            No sprints match this filter right now. Try a different difficulty.
          </div>
        )}
      </div>
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-lg bg-card px-4 py-2.5 text-center">
      <div className="font-head text-base font-bold text-ink">{value}</div>
      <div className="text-[11px] text-inkmuted">{label}</div>
    </div>
  );
}
