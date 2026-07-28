"use client";

import { seededPortfolio, findSprint } from "../../../lib/mockData";
import { useStore } from "../../../lib/store";

export default function EarningsPage() {
  const { state } = useStore();

  const liveEntries = state.completedSprintIds.map((id) => {
    const sprint = findSprint(id);
    return { id, title: sprint.title, startup: sprint.startup, payout: sprint.payout, when: "Today" };
  });
  const seeded = seededPortfolio.map((e) => ({ ...e, when: e.completedOn }));
  const rows = [...liveEntries, ...seeded];
  const maxPayout = Math.max(...rows.map((r) => r.payout), 1);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 md:py-10">
      <h1 className="font-head text-2xl font-bold text-ink">Earnings</h1>
      <p className="mt-1 text-sm text-inkmuted">Payouts land the moment a sprint is peer-approved.</p>

      <div className="mt-6 rounded-xl bg-ink p-6 text-white">
        <p className="text-sm text-slate-300">Total earned</p>
        <p className="mt-1 font-head text-4xl font-bold">₹{state.earnings.toLocaleString("en-IN")}</p>
        <p className="mt-2 text-xs text-slate-400">Across {rows.length} approved sprints</p>
      </div>

      <h2 className="mb-3 mt-8 font-head text-sm font-bold uppercase tracking-wide text-inkmuted">Payout history</h2>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.id} className="rounded-lg border border-line bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-ink">{r.title}</p>
                <p className="text-xs text-inkmuted">
                  {r.startup} · {r.when}
                </p>
              </div>
              <div className="font-head font-bold text-teal-dark">+₹{r.payout.toLocaleString("en-IN")}</div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal"
                style={{ width: `${Math.max(8, (r.payout / maxPayout) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
