import { siteConfig } from "@/lib/site-config";

/**
 * Donation account block. QR code is a placeholder until the bank account
 * is finally confirmed (see OPEN_ITEMS.md).
 */
export function SpendenkontoCard() {
  const { bank } = siteConfig;
  return (
    <div className="relative overflow-hidden rounded-[4px] border border-gold/40 bg-aubergine-deep p-7 text-bg sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-[0.1]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, var(--gold-soft) 0deg 0.4deg, transparent 0.4deg 8deg)",
          maskImage: "radial-gradient(circle, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
          Ihre Unterstützung
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium text-white">Spendenkonto</h3>
        <p className="mt-2 max-w-md text-sm text-bg/70">
          Unsere Gemeinde finanziert sich ausschließlich aus freiwilligen Zuwendungen.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto]">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-gold-soft">Kontoinhaber</dt>
              <dd className="text-bg/80">{bank.holder}</dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 border-t border-white/10 pt-3">
              <dt className="text-gold-soft">Bank</dt>
              <dd className="text-bg/85">{bank.name}</dd>
              <dt className="text-gold-soft">PLN</dt>
              <dd className="font-mono text-[13px] text-bg/85">{bank.pln}</dd>
              <dt className="text-gold-soft">EUR / IBAN</dt>
              <dd className="font-mono text-[13px] text-bg/85">{bank.eurIban}</dd>
              <dt className="text-gold-soft">BIC</dt>
              <dd className="font-mono text-[13px] text-bg/85">{bank.bic}</dd>
            </div>
          </dl>

          <div className="flex flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-gold/40 bg-white/5 p-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded bg-white/10 text-xs text-bg/60">
              QR-Code
            </div>
            <p className="max-w-[10rem] text-[11px] leading-tight text-bg/55">
              QR-Code für Banking-App folgt nach Konto-Freigabe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
