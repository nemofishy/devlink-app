"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { currentStudent } from "../lib/mockData";
import { useStore } from "../lib/store";

const navItems = [
  { href: "/student/dashboard", label: "Sprint Feed", icon: "grid" },
  { href: "/student/portfolio", label: "My Portfolio", icon: "badge" },
  { href: "/student/earnings", label: "Earnings", icon: "coin" },
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
  if (name === "badge")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls}>
        <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v9M9.3 15c0 1.1 1.2 2 2.7 2s2.7-.9 2.7-2-1.2-1.7-2.7-2-2.7-.9-2.7-2 1.2-2 2.7-2 2.7.9 2.7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function StudentShell({ children }) {
  const pathname = usePathname();
  const { state } = useStore();

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
                {currentStudent.avatarInitials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{currentStudent.name}</div>
                <div className="truncate text-xs text-slate-400">
                  ₹{state.earnings.toLocaleString("en-IN")} earned
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 md:ml-64">
          <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3 md:hidden">
            <Logo dark={false} size="sm" />
            <div className="text-xs font-semibold text-inkmuted">{currentStudent.name}</div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
