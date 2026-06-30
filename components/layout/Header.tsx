"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lutherrose } from "@/components/content/Lutherrose";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { mainNav } from "@/lib/nav";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="bg-aubergine text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 text-white hover:text-white">
          <Lutherrose className="h-11 w-11 shrink-0 sm:h-14 sm:w-14" />
          <span className="font-serif leading-tight">
            <span className="hidden text-base font-semibold sm:block sm:text-lg">
              Deutschsprachige Evangelische Seelsorge
            </span>
            <span className="block text-base font-semibold sm:hidden">
              Evangelisch in Warschau
            </span>
            <span className="hidden text-sm text-white/80 sm:block">in Warschau</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Hauptmenü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/10 ${isActive(item.href) ? "text-white" : "text-white/85"}`}
                >
                  {item.label}
                  {item.children && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full z-40 w-56 rounded-md border border-line bg-white py-2 text-ink opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-sm hover:bg-aubergine-50 ${pathname === child.href ? "text-aubergine" : "text-ink"}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Menü öffnen"
          aria-expanded={drawerOpen}
          className="rounded p-2 text-white hover:bg-white/10 lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
