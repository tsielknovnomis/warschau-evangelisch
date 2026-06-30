"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/nav";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <nav
        aria-label="Hauptmenü"
        className={`absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-serif text-lg text-aubergine">Menü</span>
          <button
            onClick={onClose}
            aria-label="Menü schließen"
            className="rounded p-2 text-aubergine hover:bg-aubergine-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ul className="px-3 py-3">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="py-0.5">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded px-3 py-2 font-semibold ${active ? "bg-aubergine-50 text-aubergine" : "text-ink hover:bg-aubergine-50"}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-3 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className={`block rounded px-3 py-1.5 text-base ${pathname === child.href ? "text-aubergine" : "text-muted hover:text-aubergine"}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
