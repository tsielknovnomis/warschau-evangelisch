import { siteConfig } from "@/lib/site-config";

/**
 * Donation account block — light, clean card with aubergine accents.
 * QR code is a placeholder until the bank account is confirmed (OPEN_ITEMS.md).
 */
export function SpendenkontoCard() {
  const { bank } = siteConfig;
  const rows = [
    { label: "Bank", value: bank.name, mono: false },
    { label: "PLN", value: bank.pln, mono: true },
    { label: "EUR / IBAN", value: bank.eurIban, mono: true },
    { label: "BIC", value: bank.bic, mono: true },
  ];

  return (
    <div className="overflow-hidden rounded-[4px] border border-line bg-surface">
      <div className="border-l-[3px] border-gold p-7 sm:p-9">
        <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          Deine Unterstützung
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium text-aubergine">Spendenkonto</h3>
        <p className="mt-2 text-sm text-muted">
          Unsere Gemeinde finanziert sich ausschließlich aus freiwilligen Zuwendungen.
        </p>

        {/* Account holder */}
        <div className="mt-6">
          <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
            Kontoinhaber
          </p>
          <p className="mt-1 text-sm text-ink">{bank.holder}</p>
        </div>

        {/* Bank details — full width so IBANs sit on one line */}
        <dl className="mt-5 divide-y divide-line border-t border-line">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-wrap items-baseline gap-x-4 py-2.5">
              <dt className="w-24 shrink-0 font-body text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {r.label}
              </dt>
              <dd className={`text-ink ${r.mono ? "font-mono text-[0.95rem] tracking-tight" : "text-sm"}`}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 flex items-center gap-2 text-xs text-muted">
          <span className="flex h-5 w-5 items-center justify-center rounded border border-dashed border-gold/50 text-[8px]">
            QR
          </span>
          Ein QR-Code für die Banking-App folgt, sobald das Konto final bestätigt ist.
        </p>
      </div>
    </div>
  );
}
