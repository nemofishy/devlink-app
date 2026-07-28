import Link from "next/link";
import Logo from "./Logo";

export default function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bgdark/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo dark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#how-it-works" className="text-sm text-slate-300 hover:text-white">
            How it works
          </a>
          <a href="/#stakeholders" className="text-sm text-slate-300 hover:text-white">
            Who it's for
          </a>
          <a href="/#trust" className="text-sm text-slate-300 hover:text-white">
            Verified Portfolio
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-200 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/login?intent=student"
            className="rounded-md bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
