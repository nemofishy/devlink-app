"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findSprint } from "../../../../../lib/mockData";
import { useStore } from "../../../../../lib/store";
import CodeBlock from "../../../../../components/CodeBlock";

const fileKindStyle = {
  target: "bg-amber-400",
  new: "bg-teal-bright",
  reference: "bg-slate-500",
};

export default function WorkspacePage({ params }) {
  const sprint = findSprint(params.id);
  const router = useRouter();
  const { state, acceptSprint, submitSprint } = useStore();
  const status = state.sprintStatus[sprint?.id];

  const [tab, setTab] = useState("existing");
  const [patch, setPatch] = useState(sprint?.scaffold || "");
  const [notes, setNotes] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (sprint && !status) acceptSprint(sprint.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprint?.id]);

  if (!sprint) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-inkmuted">Sprint not found.</div>
    );
  }

  const attempt = (state.submissions[sprint.id]?.attempt || 0) + 1;

  function runTests() {
    setRunning(true);
    setTimeout(() => {
      const hasEdited = patch.trim() !== (sprint.scaffold || "").trim();
      setTestResult(hasEdited ? "pass" : "empty");
      setRunning(false);
    }, 900);
  }

  function handleSubmit() {
    submitSprint(sprint.id, { code: patch, prNotes: notes });
    router.push(`/student/sprints/${sprint.id}/review`);
  }

  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col bg-bgdark">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-4">
          <Link href={`/student/sprints/${sprint.id}`} className="text-xs font-semibold text-slate-400 hover:text-white">
            ← Exit sandbox
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div>
            <p className="text-xs text-slate-400">{sprint.startup}</p>
            <h1 className="font-head text-sm font-bold text-white">{sprint.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {attempt > 1 && (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
              Attempt {attempt}
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-bright" />
            Ephemeral sandbox · isolated container
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-white/[0.02] p-4 md:block">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-slate-500">Files</p>
          <div className="space-y-1">
            {sprint.files.map((f) => (
              <div key={f.path} className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-slate-300">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${fileKindStyle[f.kind]}`} />
                <span className="truncate">{f.path.split("/").pop()}</span>
              </div>
            ))}
          </div>
          <p className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-wide text-slate-500">Acceptance criteria</p>
          <ul className="space-y-1.5">
            {sprint.acceptanceCriteria.map((c) => (
              <li key={c} className="text-[11px] leading-snug text-slate-400">
                · {c}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex flex-1 flex-col overflow-y-auto p-5">
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setTab("existing")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                tab === "existing" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Existing code
            </button>
            <button
              onClick={() => setTab("yours")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                tab === "yours" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Your changes
            </button>
          </div>

          {tab === "existing" ? (
            <CodeBlock
              code={sprint.sourcePreview || "// no preview available"}
              filename={sprint.files.find((f) => f.kind === "target")?.path}
            />
          ) : (
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0B1220]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
                <code className="text-xs text-slate-400">
                  {sprint.files.find((f) => f.kind === "new")?.path || sprint.files[0].path}
                </code>
                <button
                  onClick={runTests}
                  disabled={running}
                  className="rounded bg-teal px-3 py-1 text-[11px] font-bold text-white hover:bg-teal-dark disabled:opacity-60"
                >
                  {running ? "Running…" : "Run tests"}
                </button>
              </div>
              <textarea
                value={patch}
                onChange={(e) => setPatch(e.target.value)}
                spellCheck={false}
                className="h-72 w-full resize-none bg-transparent p-4 font-mono text-[12.5px] text-slate-200 outline-none"
              />
              {testResult && (
                <div
                  className={`border-t border-white/10 px-4 py-2 text-xs font-semibold ${
                    testResult === "pass" ? "text-teal-bright" : "text-amber-300"
                  }`}
                >
                  {testResult === "pass"
                    ? "✓ Local test run passed. Ready to submit for review."
                    : "⚠ No changes detected yet — write your solution above before running tests."}
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Submission notes (PR description)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Briefly describe what you changed and why…"
              className="h-24 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-teal/50"
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Every keystroke and commit in this sandbox is logged for AI + peer review.
            </p>
            <button
              onClick={handleSubmit}
              disabled={!notes.trim()}
              className="rounded-md bg-teal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for review →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
