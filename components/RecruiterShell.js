"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { currentRecruiter } from "../lib/recruiterData";
import { useStore } from "../lib/store";

const navItems = [
  { href: "/recruiter/dashboard", label: "Talent Search", icon: "search" },
  { href: "/recruiter/shortlist", label: "Shortlist", icon: "star" },
];

function NavIcon({ name, active }) {
  const cls = `h-4 w-4 ${active ? "text-teal-bright" : "text-slate-400"}`;
  if (name === "search")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls}>
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M19 19l-4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls}>
      <path
        d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RecruiterShell({ children }) {
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
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <NavIcon name={item.icon} active={active} />
                    {item.label}
                  </span>
                  {item.icon === "star" && state.shortlist.length > 0 && (
                    <span className="rounded-full bg-teal px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {state.shortlist.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-sm font-semibold text-white">{currentRecruiter.name}</p>
              <p className="mt-0.5 text-xs text-slate-400">{currentRecruiter.company}</p>
              <p className="mt-1.5 text-[11px] font-semibold text-teal-bright">{currentRecruiter.subscription}</p>
            </div>
          </div>
        </aside>

        <div className="flex-1 md:ml-64">
          <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3 md:hidden">
            <Logo dark={false} size="sm" />
            <div className="text-xs font-semibold text-inkmuted">{currentRecruiter.name}</div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
