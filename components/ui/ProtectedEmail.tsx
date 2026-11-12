"use client";

import { deobfuscateEmail } from "@/lib/email-obfuscation";

/**
 * Shows an address only as "info [klammeraffe] … [punkt] de" (spam protection).
 * Clicking opens the mail program; the real address is assembled in the browser.
 */
export function ProtectedEmail({
  obfuscated,
  className = "",
}: {
  obfuscated: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      title="E-Mail schreiben"
      onClick={() => {
        window.location.href = `mailto:${deobfuscateEmail(obfuscated)}`;
      }}
      className={`protected-email cursor-pointer text-left ${className}`}
    >
      {obfuscated}
    </button>
  );
}
