"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Logo from "../../components/Logo";

const roles = [
  {
    key: "student",
    title: "Student",
    body: "Browse Micro-Sprints, work in the sandbox, build a verified portfolio.",
    href: "/student/dashboard",
    available: true,
  },
  {
    key: "startup",
    title: "Startup",
    body: "Connect your repo, approve AI-decomposed sprints, review submissions.",
    href: "/startup/dashboard",
    available: true,
  },
  {
    key: "recruiter",
    title: "Recruiter",
    body: "Search verified talent by real sprint history and review scores.",
    href: "/recruiter/dashboard",
    available: true,
  },
];

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const intent = params.get("intent");

  return (
    <main className="flex min-h-screen items-center justify-center bg-bgdark px-6 dot-grid-bg">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-bgdark2 p-8 md:p-12">
        <div className="mb-8 flex justify-center">
          <Logo dark />
        </div>
        <h1 className="text-center font-head text-2xl font-bold text-white">
          This is a prototype — pick a role to preview
        </h1>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-slate-400">
          No real accounts here. All three sides — Student, Startup, and Recruiter — are built and share the
          same live sprint data. Accept a sprint as a student, approve it as the startup, then search for
          that verified candidate as a recruiter.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => r.available && router.push(r.href)}
              disabled={!r.available}
              className={`rounded-xl border p-5 text-left transition ${
                r.available
                  ? "border-teal/40 bg-white/5 hover:border-teal hover:bg-white/10"
                  : "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-50"
              } ${intent === r.key ? "ring-2 ring-teal" : ""}`}
            >
              <div className="font-head text-lg font-bold text-white">{r.title}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{r.body}</p>
              {!r.available && (
                <span className="mt-3 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  COMING NEXT
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
