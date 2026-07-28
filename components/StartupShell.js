"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { currentStartup } from "../lib/startupData";

const navItems = [
  { href: "/startup/dashboard", label: "Overview", icon: "grid" },
  { href: "/startup/backlog", label: "Backlog & Repo", icon: "repo" },
  { href: "/startup/submissions", label: "Submissions", icon: "check" },
];

function NavIcon({ name, active }) {
  const cls = `h-4 w-4 ${active ? "text-teal-bright" : "text-slate-400"}`;
  if (name === "grid")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  if (name === "repo")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls}>
        <path
          d="M6 3.5h10.5a1.5 1.5 0 011.5 1.5v14l-6-3-6 3V5A1.5 1.5 0 016 3.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls}>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StartupShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line bg-bgdark md:flex">
          <div className="px-6 py-6">
            <Link href="/">
              <Logo dark />
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <NavIcon name={item.icon} active={active} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                {currentStartup.avatarInitials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{currentStartup.contact}</div>
                <div className="truncate text-xs text-slate-400">{currentStartup.name}</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 md:ml-64">
          <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3 md:hidden">
            <Logo dark={false} size="sm" />
            <div className="text-xs font-semibold text-inkmuted">{currentStartup.contact}</div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
