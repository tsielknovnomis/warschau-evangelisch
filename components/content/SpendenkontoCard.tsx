import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site-config";

/**
 * Donation account block. QR code is a placeholder until the bank account
 * is finally confirmed (see OPEN_ITEMS.md).
 */
export function SpendenkontoCard() {
  const { bank } = siteConfig;
  return (
    <Card tone="cream">
      <h3 className="font-serif text-xl font-semibold text-aubergine">Spendenkonto</h3>
      <p className="mt-1 text-sm text-muted">
        Unsere Gemeinde finanziert sich ausschließlich aus freiwilligen Zuwendungen.
      </p>

      <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_auto]">
        <dl className="space-y-1.5 text-sm">
          <div>
            <dt className="font-semibold text-ink">Kontoinhaber</dt>
            <dd className="text-muted">{bank.holder}</dd>
          </div>
          <div className="grid grid-cols-[5rem_1fr] gap-x-2 pt-2">
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

        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-aubergine-300 bg-white/60 p-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded bg-aubergine-50 text-xs text-muted">
            QR-Code
          </div>
          <p className="max-w-[10rem] text-[11px] leading-tight text-muted">
            QR-Code für Banking-App folgt nach Konto-Freigabe.
          </p>
        </div>
      </div>
    </Card>
  );
}
