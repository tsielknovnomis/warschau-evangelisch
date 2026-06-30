import { siteConfig } from "@/lib/site-config";

/**
 * Donation account block — light, clean card with aubergine accents.
 * QR code is a placeholder until the bank account is confirmed (OPEN_ITEMS.md).
 */
export function SpendenkontoCard() {
  const { bank } = siteConfig;
  return (
    <div className="overflow-hidden rounded-[4px] border border-line bg-surface">
      <div className="border-l-[3px] border-gold p-7 sm:p-9">
        <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          Ihre Unterstützung
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium text-aubergine">Spendenkonto</h3>
        <p className="mt-2 max-w-md text-sm text-muted">
          Unsere Gemeinde finanziert sich ausschließlich aus freiwilligen Zuwendungen.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto]">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-aubergine">Kontoinhaber</dt>
              <dd className="text-muted">{bank.holder}</dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 border-t border-line pt-3">
              <dt className="font-semibold text-ink">Bank</dt>
              <dd className="text-muted">{bank.name}</dd>
              <dt className="font-semibold text-ink">PLN</dt>
              <dd className="font-mono text-[13px] text-muted">{bank.pln}</dd>
              <dt className="font-semibold text-ink">EUR / IBAN</dt>
              <dd className="font-mono text-[13px] text-muted">{bank.eurIban}</dd>
              <dt className="font-semibold text-ink">BIC</dt>
              <dd className="font-mono text-[13px] text-muted">{bank.bic}</dd>
            </div>
          </dl>

          <div className="flex flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-gold/50 bg-bg p-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded bg-aubergine-50 text-xs text-muted">
              QR-Code
            </div>
            <p className="max-w-[10rem] text-[11px] leading-tight text-muted">
              QR-Code für Banking-App folgt nach Konto-Freigabe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
