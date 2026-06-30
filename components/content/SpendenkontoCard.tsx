import { siteConfig } from "@/lib/site-config";

/**
 * Donation account block — light, clean card with aubergine accents.
 * Bank details come from site-config (verify before go-live, see OPEN_ITEMS.md).
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

        {/* Bank details — label above value, so long IBANs get the full width */}
        <dl className="mt-5 divide-y divide-line border-t border-line">
          {rows.map((r) => (
            <div key={r.label} className="py-3">
              <dt className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                {r.label}
              </dt>
              <dd className={`mt-1 text-ink ${r.mono ? "font-mono text-[0.82rem] tracking-tight sm:text-[0.95rem]" : "text-[0.95rem]"}`}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
