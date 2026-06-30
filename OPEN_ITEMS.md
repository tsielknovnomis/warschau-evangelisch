# OPEN ITEMS — vom Auftraggeber final zu klären

> Diese Punkte konnte Moritz (Stand 30.06.2026) nicht abschließend beantworten.
> Ich arbeite mit den unten genannten **Arbeitsannahmen** weiter und markiere die betroffenen
> Stellen im Code/Content mit `TODO(verify)`. **Vor dem echten Go-Live müssen diese bestätigt werden.**

| # | Thema | Arbeitsannahme (so baue ich es) | Muss bestätigt werden | Status |
|---|-------|----------------------------------|------------------------|--------|
| 1 | **Bankkonto** | BNP Paribas — PLN `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN `PL56 1600 1462 1728 8283 8000 0003`, BIC `PPABPLPK`. Altes Pekao-SA-Konto entfernt. | Ist das BNP-Konto aktuell & korrekt? Pekao endgültig raus? | 🟥 offen |
| 2 | **QR-Code (Spende)** | Wird **erst generiert, wenn Konto bestätigt** (Platzhalter bis dahin). Voreinstellung: 50 PLN auf PLN-Konto. | Konto (#1) zuerst klären. | 🟥 blockiert durch #1 |
| 3 | **Amtierender Pfarrer** | Dr. Grzegorz Olek (aus neuester Alt-Seite). | Ist Dr. Olek Stand 2026 noch im Amt? Sonst Name/Titel korrigieren. | 🟧 zu verifizieren |
| 4 | **Flickr-Fotos** (2× Dez. 2025) | **Nicht verwendet** (keine Lizenz). | Falls gewünscht: Lizenz/Herkunft klären, dann ggf. einbinden. | 🟩 entschieden (raus) |

## Bereits geklärt (während dieser Session)

- ✅ **Adresse:** `ul. Miodowa 21, 00-246 Warszawa` — offiziell bestätigt (luteranie.pl / Centrum Luterańskie / Wikipedia). Die alte „21B / 00-171" war falsch.
- ✅ **Telefon:** keine Nummer angeben — Kontakt nur per E-Mail (`info@`, `pfarrer@warschau-evangelisch.de`).
- ✅ **Vorstand:** Jürgen Wandel / Jens Boysen / Simon von Kleist (bestätigt aktuell).
- ✅ **Twitter/X `@degwaw`:** raus (toter Feed). Stattdessen YouTube + Instagram/Facebook.

## Vom Auftraggeber getroffene Richtungsentscheidungen (30.06.2026)

- **Stack:** Next.js + TS + Tailwind, Supabase-Backend, Netlify.
- **Sprache:** Deutsch, technisch i18n-ready (PL später ergänzbar).
- **Termine:** eigenes Termin-Modul im Backend (kein Google Calendar mehr).
- **Backend pflegbar:** Aktuelles/News + Predigt-Archiv + Termine. Kernseiten pflegt Moritz im Code.
- **Design:** behutsam klassisch — kirchlich-würdevolle Identität bewahren, solide modernisieren.
- **Archiv:** alle ~113 Alt-Beiträge als durchsuchbares Archiv migrieren.
