"use client";

import { useMemo, useState } from "react";
import { currentRecruiter, talentPool, allDomains } from "../../../lib/recruiterData";
import CandidateCard from "../../../components/CandidateCard";

export default function RecruiterDashboardPage() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [minScore, setMinScore] = useState(0);

  const results = useMemo(() => {
    return talentPool.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.stack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesDomain = domain === "All" || c.domains.includes(domain);
      const matchesScore = c.avgScore >= minScore;
      return matchesQuery && matchesDomain && matchesScore;
    });
  }, [query, domain, minScore]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
      <p className="text-sm text-inkmuted">Welcome back,</p>
      <h1 className="font-head text-2xl font-bold text-ink md:text-3xl">{currentRecruiter.name.split(" ")[0]}</h1>
      <p className="mt-1 text-sm text-inkmuted">
        {currentRecruiter.company} · hiring for {currentRecruiter.openRoles} open roles
      </p>

      <div className="mt-6 rounded-xl bg-card p-5">
        <p className="text-sm text-inkmuted">
          Every candidate below has a verified, AI + peer-reviewed contribution record — not a resume claim.
          Filter by stack, domain, or minimum review score to find who's actually shipped production code.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tech stack (e.g. React, Python)…"
          className="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-teal/50"
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2.5 text-sm font-semibold text-inkmuted outline-none"
        >
          <option value="All">All domains</option>
          {allDomains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="rounded-md border border-line bg-white px-3 py-2.5 text-sm font-semibold text-inkmuted outline-none"
        >
          <option value={0}>Any review score</option>
          <option value={4.5}>4.5+ avg. score</option>
          <option value={4.7}>4.7+ avg. score</option>
        </select>
      </div>

      <p className="mt-4 text-xs font-semibold text-inkmuted">{results.length} candidates match</p>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <CandidateCard key={c.handle} candidate={c} />
        ))}
        {results.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-line p-10 text-center text-sm text-inkmuted">
            No candidates match these filters. Try widening your search.
          </div>
        )}
      </div>
    </div>
  );
}
