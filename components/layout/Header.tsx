"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lutherrose } from "@/components/content/Lutherrose";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      {/* Top utility bar */}
      <div className="hidden bg-aubergine-deep text-gold-soft lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-1.5 text-[0.78rem] tracking-wide">
          <span>Gottesdienst · zweiter &amp; vierter Sonntag im Monat, {siteConfig.service.time} · {siteConfig.address.street}</span>
          <a href={`mailto:${siteConfig.contact.general}`} className="text-gold-soft transition-colors hover:text-white">
            {siteConfig.contact.general}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-gold/30 bg-aubergine">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3 text-white hover:text-white">
            <Lutherrose className="h-12 w-12 shrink-0 transition-transform duration-300 group-hover:rotate-[8deg] sm:h-[52px] sm:w-[52px]" />
            <span className="leading-tight">
              <span className="block font-display text-[1.05rem] font-medium text-white sm:text-[1.2rem]">
                <span className="hidden sm:inline">Deutschsprachige Evangelische Seelsorge</span>
                <span className="sm:hidden">Evangelisch in Warschau</span>
              </span>
              <span className="hidden text-[0.72rem] uppercase tracking-[0.2em] text-gold-soft sm:block">
                in Warschau
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Hauptmenü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href} className="group/item relative">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-3 py-2 font-body text-[0.95rem] font-medium text-white/90 transition-colors hover:text-white ${
                      isActive(item.href) ? "text-white" : ""
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gold transition-transform duration-300 ${
                          isActive(item.href)
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/item:scale-x-100"
                        }`}
                      />
                    </span>
                    {item.children && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className="text-gold-soft">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </Link>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-full z-40 w-60 overflow-hidden rounded-[3px] border border-line bg-surface py-1.5 text-ink opacity-0 shadow-xl transition-all group-hover/item:visible group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 font-body text-[0.92rem] transition-colors hover:bg-aubergine-50 hover:text-aubergine ${
                              pathname === child.href ? "text-gold-deep" : "text-ink"
                            }`}
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
            className="rounded p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
