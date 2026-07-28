"use client";

import Link from "next/link";
import { talentPool } from "../../../lib/recruiterData";
import { useStore } from "../../../lib/store";
import CandidateCard from "../../../components/CandidateCard";

export default function ShortlistPage() {
  const { state } = useStore();
  const shortlisted = talentPool.filter((c) => state.shortlist.includes(c.handle));

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
      <h1 className="font-head text-2xl font-bold text-ink">Shortlist</h1>
      <p className="mt-1 text-sm text-inkmuted">Candidates you've flagged for a follow-up interview.</p>

      {shortlisted.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-line p-10 text-center text-sm text-inkmuted">
          Nothing shortlisted yet.{" "}
          <Link href="/recruiter/dashboard" className="font-semibold text-teal-dark">
            Browse talent search →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shortlisted.map((c) => (
            <CandidateCard key={c.handle} candidate={c} />
          ))}
        </div>
      )}
    </div>
  );
}
