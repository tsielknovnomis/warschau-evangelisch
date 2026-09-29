# PROJECT_STATE — warschau-evangelisch

**Status (30.07.2026):** 🎉 **LIVE auf https://warschau-evangelisch.de!** Go-Live komplett: Domain bei INWX, DNS von Simon gesetzt, Website auf Simons Netlify-Site (Auto-Deploy aus github.com/tsielknovnomis/warschau-evangelisch — jeder Push auf `main` geht live), Mail via ImprovMX. Vollständig verifiziert (SSL, Redirects, Canonicals, MX/SPF, Admin-Schutz). Alte Preview-Site leitet per 301 auf die echte Domain um.

- Live: https://warschau-evangelisch.de · Admin: `/admin` (Team-Passwort)
- Restarbeiten: Mail-Praxistest + „Senden als" + DKIM; alte Postfächer sichern (vor 08.08.!); echte Termine/News eintragen

## In Progress
- **Simon (Admin-Passwort) muss im Panel noch:** alten „Sommerpause"-Beitrag löschen, 11.10. auf „Gottesdienst mit Jürgen Wandel" umbenennen, künftige Ausfälle per „Fällt aus" markieren.
- **Mail-Restarbeiten** (OPEN_ITEMS Punkt 11): realer Zustelltest an vorstand@/info@/pfarrer@, „Senden als" in Gmail (SMTP smtp.improvmx.com:587), DKIM-TXT aus dem ImprovMX-Dashboard bei INWX eintragen.

## Hinweis (kein akuter Handlungsbedarf)
- Die technischen Zugänge (Netlify-Site inkl. ADMIN_PASSWORD + Blobs-Daten, GitHub-Repo tsielknovnomis/warschau-evangelisch, Domain bei INWX, ImprovMX) laufen über Simons Accounts — Simon ist im Vorstand, das ist so gewollt. Nur das Admin-Passwort kennt aktuell allein Simon; ggf. im Team teilen.

## Next Up
- ⚠️ **Vor dem 08.08.:** alte Postfächer sichern (Simon — Hosting-Ende!)
- Team trägt echte Termine/News im Admin-Panel ein (OPEN_ITEMS Punkt 8 — aktuell Platzhalter auf der LIVE-Seite!)
- Google Business Profile + Search Console (OPEN_ITEMS Punkt 12)
- Admin-Passwort final rotieren, falls Simon das Interims-Passwort übernommen hat (Punkt 7)

## Known Issues
- Keine offenen technischen Bugs. Offene **Fakten** (Pfarrer, USt-IdNr., Datenschutz-Schlussprüfung) in OPEN_ITEMS Punkte 3–5.

## Recent Decisions
- **29.09.** „Immer aktuell": ISR stündlich + Client-Uhr-Absicherung; Ausfälle sichtbar (durchgestrichen, „Entfällt"); ohne Termin neutraler Hinweis, „Sommerpause" nur Juni–August; News/Leisten-Text mit „Anzeigen bis", Anpinnen ohne Datum max. 30 Tage; Warnungen im Admin. Spec: `docs/superpowers/specs/2026-09-29-always-current-design.md`
- **23.07.** Vorstands-Notizen (docx) komplett umgesetzt: Du-Form final; Mt 11,28 im Hero unten rechts (ohne Ortszeile, höher positioniert); alle Bibelstellen zu bibleserver.com verlinkt; Zitate rechtsbündig (Goldbalken rechts); neue Texte der „Geistliche Heimat"-Sektion inkl. „Gelebtes Kirchenjahr"; /glauben visuell aufgewertet (dunkles Zitat-Band, Weg-Stationen); scharfes Hero-Bild mit linksverankertem Crop (Kreuz stabil bei ~67–72 %)
- **23.07.** Admin: Termin-Vorlagen als Dropdown (Liste + Formular, `?vorlage=`), Einladungstext in 4 Varianten (WhatsApp/E-Mail × Du/Sie; E-Mail nach Vorbild der echten Gemeinde-Mails)
- **23.07.** WhatsApp-Gruppe + Instagram (@warschau.evangelisch) verlinkt; WhatsApp-QR auf Startseite + /gottesdienste
- **17.07.** Vorstand: Bankdaten bestätigt; Simon von Kleist presserechtlich Verantwortlicher; Spenden-QR (poln. ZBP-Format) in Spendenkonto-Karte; Abendmahl ohne Checkbox, Texte „meist mit Heiligem Abendmahl"; flache URLs (/glauben, /verein, /beitritt, /satzung, /geschichte); „Glaube" als eigener Nav-Punkt
- **10.07.** **Supabase → Netlify Blobs** (0 €/Monat, Supabase-Projekt gelöscht); Team-Passwort-Auth (HMAC-signierte Cookies, `lib/auth.ts`); jede Mutation prüft `isAdmin()`
- **Anfang Juli** Admin-Dashboard mit Tabs + Suche + Monatsgruppen (skaliert für viele Einträge); SSR-sichtbare Reveals (Progressive Enhancement) nach Bug-Report des Vorstands; SEO-Paket (OG-Image, Apple-Icon, Twitter-Cards, Canonicals)

## Recently Done
- **29.09.** „Immer aktuell" live: ISR stündlich + Client-Uhr, Ausfälle, Ablaufdaten, Admin-Warnungen; Fix: „Über uns"-Dropdown verursachte horizontales Scrollen bei ~1024 px
- Social-Media-Paket in `social/` (302 ausgearbeitete Content-Ideen als Excel, Bios, Profilbilder, Gruppenbeschreibungen)
- Simon-Anleitung als Word-Dokument (Netlify + Domain-Alternativen-Vergleich + Mail-Setup)
- Projekt aufgeräumt: README ergänzt, tote Exporte + deno.lock entfernt, PROJECT_STATE/OPEN_ITEMS aktualisiert

## Doku-Wegweiser
- **OPEN_ITEMS.md** — selbsterklärendes Übergabe-Dokument: alle offenen Punkte + kompletter Go-Live-Plan
- **README.md** — Einstieg für Entwickler (Setup, Struktur, Deploy)
- **CLAUDE.md** — Konventionen für KI-Sessions · **SPEC.md** — ursprüngliche Bauvorlage (30.06.)
- **scraped/** — Archiv der Alt-Website (Referenz) · **social/** — Social-Media-Paket
- **docs/superpowers/** — historische Specs & Pläne aus der Bauphase
