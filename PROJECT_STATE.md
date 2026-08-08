# PROJECT_STATE — warschau-evangelisch

**Status (30.07.2026):** 🎉 **LIVE auf https://warschau-evangelisch.de!** Go-Live komplett: Domain bei INWX, DNS von Simon gesetzt, Website auf Simons Netlify-Site (Auto-Deploy aus github.com/tsielknovnomis/warschau-evangelisch — jeder Push auf `main` geht live), Mail via ImprovMX. Vollständig verifiziert (SSL, Redirects, Canonicals, MX/SPF, Admin-Schutz). Alte Preview-Site leitet per 301 auf die echte Domain um.

- Live: https://warschau-evangelisch.de · Admin: `/admin` (Team-Passwort)
- Restarbeiten: Mail-Praxistest + „Senden als" + DKIM; alte Postfächer sichern (vor 08.08.!); echte Termine/News eintragen

## In Progress
- **Hosting-Umzug** (OPEN_ITEMS Punkt 11): Simon erledigt Phase 1 (Netlify-Site aus Repo, Domain-Auth-Code, Mail-Sicherung, Zoho-Konto) — Anleitung liegt bei Moritz in `~/Downloads/Anleitung-Simon_Netlify-Domain-Mail.docx`. Danach Moritz: Domain-Transfer (INWX o. a.), DNS, Zoho-Postfächer (vorstand@/info@/pfarrer@), Go-Live.

## Next Up
- Nach Simons Rückmeldung: Domain-Transfer + DNS + Mail (OPEN_ITEMS Phasen 2–4)
- Admin-Passwort auf finales Team-Passwort rotieren (OPEN_ITEMS Punkt 7)
- Team trägt echte Termine/News auf der NEUEN Netlify-Site ein (OPEN_ITEMS Punkt 8)

## Known Issues
- Keine offenen technischen Bugs. Offene **Fakten** (Pfarrer, USt-IdNr., Datenschutz-Schlussprüfung) in OPEN_ITEMS Punkte 3–5.

## Recent Decisions
- **23.07.** Vorstands-Notizen (docx) komplett umgesetzt: Du-Form final; Mt 11,28 im Hero unten rechts (ohne Ortszeile, höher positioniert); alle Bibelstellen zu bibleserver.com verlinkt; Zitate rechtsbündig (Goldbalken rechts); neue Texte der „Geistliche Heimat"-Sektion inkl. „Gelebtes Kirchenjahr"; /glauben visuell aufgewertet (dunkles Zitat-Band, Weg-Stationen); scharfes Hero-Bild mit linksverankertem Crop (Kreuz stabil bei ~67–72 %)
- **23.07.** Admin: Termin-Vorlagen als Dropdown (Liste + Formular, `?vorlage=`), Einladungstext in 4 Varianten (WhatsApp/E-Mail × Du/Sie; E-Mail nach Vorbild der echten Gemeinde-Mails)
- **23.07.** WhatsApp-Gruppe + Instagram (@warschau.evangelisch) verlinkt; WhatsApp-QR auf Startseite + /gottesdienste
- **17.07.** Vorstand: Bankdaten bestätigt; Simon von Kleist presserechtlich Verantwortlicher; Spenden-QR (poln. ZBP-Format) in Spendenkonto-Karte; Abendmahl ohne Checkbox, Texte „meist mit Heiligem Abendmahl"; flache URLs (/glauben, /verein, /beitritt, /satzung, /geschichte); „Glaube" als eigener Nav-Punkt
- **10.07.** **Supabase → Netlify Blobs** (0 €/Monat, Supabase-Projekt gelöscht); Team-Passwort-Auth (HMAC-signierte Cookies, `lib/auth.ts`); jede Mutation prüft `isAdmin()`
- **Anfang Juli** Admin-Dashboard mit Tabs + Suche + Monatsgruppen (skaliert für viele Einträge); SSR-sichtbare Reveals (Progressive Enhancement) nach Bug-Report des Vorstands; SEO-Paket (OG-Image, Apple-Icon, Twitter-Cards, Canonicals)

## Recently Done (Auszug Juli)
- Social-Media-Paket in `social/` (302 ausgearbeitete Content-Ideen als Excel, Bios, Profilbilder, Gruppenbeschreibungen)
- Simon-Anleitung als Word-Dokument (Netlify + Domain-Alternativen-Vergleich + Mail-Setup)
- Projekt aufgeräumt: README ergänzt, tote Exporte + deno.lock entfernt, PROJECT_STATE/OPEN_ITEMS aktualisiert

## Doku-Wegweiser
- **OPEN_ITEMS.md** — selbsterklärendes Übergabe-Dokument: alle offenen Punkte + kompletter Go-Live-Plan
- **README.md** — Einstieg für Entwickler (Setup, Struktur, Deploy)
- **CLAUDE.md** — Konventionen für KI-Sessions · **SPEC.md** — ursprüngliche Bauvorlage (30.06.)
- **scraped/** — Archiv der Alt-Website (Referenz) · **social/** — Social-Media-Paket
- **docs/superpowers/** — historische Specs & Pläne aus der Bauphase
