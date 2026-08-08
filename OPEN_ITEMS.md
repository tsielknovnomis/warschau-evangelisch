# OPEN ITEMS — Deutschsprachige Evangelische Seelsorge in Warschau (DEGWAW)

> **Dieses Dokument ist bewusst selbsterklärend:** Jeder Punkt enthält alle Infos, um ihn
> **ohne weiteren Kontext** abzuarbeiten (auch in einer neuen Session).
> Zuletzt aktualisiert: **17.07.2026**.

**Projekt-Kontext in 5 Zeilen:**
- **🎉 LIVE seit 30.07.2026:** https://warschau-evangelisch.de läuft auf der neuen Website (Simons Netlify-Site `warschau-evangelisch`, Auto-Deploy aus GitHub; DNS bei INWX; Mail via ImprovMX). Alte Preview leitet auf die echte Domain um.
- Admin-Panel: https://warschau-evangelisch.de/admin (Team-Passwort; haben Moritz + Simon).
- Ansprechpartner Gemeinde: **Simon von Kleist** (Vorstand, schreibt von vorstand@warschau-evangelisch.de); weitere Vorstände: Jürgen Wandel, Jens Boysen. Gemeinde-Gmail: **degwaw@gmail.com**.
- Code-Repo: lokal bei Moritz (`~/AI/Tools/warschau-evangelisch/`), noch **nicht** auf GitHub (kommt mit Punkt 11).

| # | Thema | Stand / Arbeitsannahme | Zu tun | Status |
|---|-------|------------------------|--------|--------|
| 1 | **Bankkonto** | BNP Paribas — PLN `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN `PL56 1600 1462 1728 8283 8000 0003`, BIC `PPABPLPK`, Kontoinhaber „Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie". Steht in `lib/site-config.ts` (`bank`). | — | 🟩 bestätigt (Vorstand, 17.07.) |
| 2 | **Presserechtlich Verantwortlicher (§ 18 Abs. 2 MStV)** | **Simon von Kleist, c/o ul. Miodowa 21, 00-246 Warszawa** — steht im Impressum (`content/pages/de/impressum.md`, Abschnitt „Verantwortlich für den Inhalt"). | — | 🟩 erledigt (Entscheidung Moritz/Vorstand 17.07.) |
| 3 | **Amtierender Pfarrer** | **Dr. Grzegorz Olek** (von der Alt-Seite übernommen). Steht in `lib/site-config.ts` (`people.pastor`, mit `verify: true`) und im Impressum. | Vorstand bestätigt: noch im Amt? Falls nein → Name/Titel an beiden Stellen ändern, `verify`-Flag entfernen. | 🟧 zu verifizieren |
| 4 | **Datenschutz + Impressum Schlussprüfung** | Beide Seiten sind fertig formuliert nach DDG/DSGVO/TDDDG (UODO als Aufsichtsbehörde, EU-US DPF + SCC für YouTube/Google Maps, Consent-Banner). Dateien: `content/pages/de/datenschutz.md` + `impressum.md`. Arbeitsannahme: DSGVO gilt unmittelbar, **kein** DSG-EKD (Verein nach polnischem Recht, KRS 0000590323). | Fachliche/anwaltliche Schlussprüfung vor Go-Live; Annahme „kein DSG-EKD" bestätigen. | 🟧 zu prüfen |
| 5 | **USt-IdNr.** | Annahme: gemeinnütziger Verein, keine USt-IdNr. → im Impressum **weggelassen**. | Vorstand: Falls doch eine existiert → in `content/pages/de/impressum.md` (Abschnitt Registereintrag) nachtragen. | 🟧 zu verifizieren |
| 6 | **Instagram- + WhatsApp-Link** | **Eingetragen (23.07.):** WhatsApp `https://chat.whatsapp.com/DNeiA39J18v9kVa5ShSQM8`, Instagram `@warschau.evangelisch`. Gruppenname „Warschau – Evangelisch". WhatsApp-QR auf /gottesdienste. | Kurz prüfen, dass der Instagram-Account wirklich unter diesem Handle existiert. | 🟩 eingetragen |
| 7 | **Admin-Team-Passwort ändern** | Login ist EIN gemeinsames Team-Passwort, gespeichert als Netlify-Env-Var `ADMIN_PASSWORD` (Site: warschau-evangelisch-relaunch). Das aktuelle Passwort hat Moritz (im Chat übergeben, bewusst nicht in diesem Repo notiert). | Neues Passwort wählen, dann: `netlify env:set ADMIN_PASSWORD "NEUES-PASSWORT"` + Redeploy (`netlify deploy --build --prod`). Alte Sessions werden dadurch automatisch ungültig (Token sind mit dem Passwort signiert). | 🟧 offen |
| 8 | **Echte Termine + Neuigkeiten** | Aktuell **Platzhalter-Inhalte** (13 Beispiel-Gottesdienste Sep–Dez 2026, 3 Beispiel-News) aus `data/seed/*.json`. Gepflegt wird über das Admin-Panel (`/admin`, Tabs Termine/Aktuelles/Info-Leiste; Speicherung in Netlify Blobs, sofort live, kein Deploy nötig). | Team ersetzt Platzhalter durch echte Inhalte im Panel. Praktisch: Termin-Vorlagen-Buttons beim Anlegen + „Text zum Kopieren" (WhatsApp/E-Mail-Einladung) auf jeder Termin-Bearbeiten-Seite. | 🟥 offen |
| 9 | **Flickr-Fotos** (2× Dez. 2025) | Nicht verwendet (keine Lizenz geklärt). | Nur falls gewünscht: Lizenz klären, dann einbinden. | 🟩 entschieden (raus) |
| 10 | **Anrede Du vs. Sie** | **Vorstand hat entschieden: Du** (Notizen-Dokument, 23.07.). Website ist bereits durchgehend per Du. | — | 🟩 entschieden (Du) |
| 12 | **Google Business Profile + Search Console** (nach Go-Live) | Technisches SEO ist fertig (Church-Schema mit Adresse/Geo, Titles mit Suchbegriffen, Sitemap, Canonicals). Der **größte Hebel für lokale Suchen** („Kirche Warschau", „Gemeinde Warschau") ist aber ein **Google-Unternehmensprofil** (business.google.com): Kategorie „Evangelische Kirche", Adresse ul. Miodowa 21, Gottesdienstzeiten, Website-Link, Fotos. | Nach Go-Live: Vorstand legt Profil an (Login degwaw@gmail.com); Google verifiziert per Postkarte/Telefon an die Adresse. Zusätzlich Moritz: Search Console einrichten + Sitemap einreichen. | 🟨 nach Go-Live |
| 11 | **Hosting-/Domain-/Mail-Umzug** | **🟩 GO-LIVE ERFOLGT (30.07.2026).** Simon hat alles gesetzt: INWX-Transfer, DNS (A→Netlify, www-CNAME, MX→ImprovMX, SPF), Netlify-Site aus GitHub-Repo. Von Moritz vollständig verifiziert: SSL ✓, alle Alt-URL-Redirects ✓, Canonicals/Sitemap auf echter Domain ✓, Admin geschützt ✓, Auto-Deploy ✓, alte Preview leitet um ✓. | Restarbeiten: (a) Moritz/Simon: Test-Mails an alle 3 Adressen real prüfen; (b) „Senden als" in Gmail einrichten (SMTP smtp.improvmx.com:587); (c) DKIM-TXT aus ImprovMX-Dashboard bei INWX eintragen; (d) VOR 08.08.: alte Postfächer sichern! | 🟩 live — kleine Restarbeiten |

---

## Punkt 11 im Detail: Hosting-, Domain- & Mail-Umzug (= Go-Live-Plan)

### Ausgangslage (alle Fakten)

- **Alter Anbieter:** RejestracjaDomen.pl Sp. z o.o. (Z. Modzelewskiego 27, 02-679 Warszawa, NIP 5213652634, Tel. +48 22 853 88 86, info@rejestracjadomen.pl). Das Hosting läuft technisch über **hostingrd.pl**.
  - **Kunden-Panel:** https://rejestracjadomen.pl/site/login
  - **cPanel der Gemeinde:** https://r1355696.hostingrd.pl:2083/
- **Paket „Hosting Basic":** bündelt Webhosting (alte WordPress/PHP-Seite), **E-Mail-Postfächer** (u. a. vorstand@warschau-evangelisch.de) und die **Domain warschau-evangelisch.de**. Kostet ~250–283 PLN/Jahr.
- **Ablauf:** Laut Mail von RejestracjaDomen (16.07.2026, an vorstand@… und degwaw@gmail.com) lief die Zahlungsfrist zum **08.08.2026**; **Simon verlängert NICHT** (Entscheidung 25.07.) → **Hosting inkl. alter Postfächer endet am 08.08.2026.** Die **Domain selbst läuft laut Simon bis über Mitte August hinaus** (genaues Datum noch offen) und kostet dort ~120 PLN/Jahr — Transfer zu INWX (~6–7 €/Jahr) von Simon bestätigt (27.07.).
- **Beweis, dass der alte Mailserver kaputt ist:** Am 17.07. bouncte Moritz' Antwort an den Vorstand-Verteiler: `MAILER-DAEMON@pmg.hostingrd.pl` meldete, dass **Outlook/Hotmail die Server-IP 195.128.154.5 blockt** (Fehler `550 5.7.1 … block list (S3150)`) — Jens Boysen (jens_boysen@hotmail.com) bekommt Gemeinde-Mails deshalb **schon heute nicht**. Der Mail-Umzug ist also unabhängig vom Ablaufdatum nötig.
- **Wunsch der Gemeinde/Moritz:** So einfach wie möglich. Gemeinde besitzt die Accounts selbst; Code auf GitHub; jede Änderung deployt automatisch.
- **Simon von Kleist** meldet sich bei Moritz mit weiteren Infos (+ Du/Sie-Entscheidung, siehe Punkt 10).

### Ziel-Architektur

| Baustein | Lösung | Kosten/Jahr |
|---|---|---|
| Website + Backend + Admin-Panel | **Netlify** (eigener Gemeinde-Account; Site + Blobs-Store „content" + Env `ADMIN_PASSWORD`) | 0 € |
| Code + Auto-Deploy | **GitHub** (Gemeinde-Account); Netlify per Git-Integration verbunden → jeder Push auf `main` deployt automatisch | 0 € |
| Domain warschau-evangelisch.de | **Transfer zu INWX** (deutscher Registrar; Alternative Porkbun). DNS danach: Website → Netlify, Mail → Zoho | ~6 € |
| E-Mail (vorstand@, info@, pfarrer@) | **Zoho Mail Free** (zoho.eu) — bis 5 Postfächer à 5 GB, Webmail + Mobile-Apps, eigene Domain | 0 € |

**Summe: ~6 €/Jahr statt ~66 € (283 PLN).** Termine/Aktuelles/Leiste brauchen kein Deploy — pflegt das Team im Panel (Blobs + Revalidation).

### Schritte

**Phase 1 — bis Ende Juli (Vorstand/Simon, ~30 Min):**
1. Im Kunden-Panel (https://rejestracjadomen.pl/site/login) das **Ablaufdatum der Domain selbst** prüfen — kann vom Hosting-Datum (15.08.) abweichen und bestimmt den echten Zeitdruck.
2. Dort den **Auth-/EPP-Code** für warschau-evangelisch.de anfordern (der „Umzugsschlüssel") → an Moritz.
3. ~~GitHub-Account anlegen~~ **Erledigt: privates Repo `tsielknovnomis/warschau-evangelisch`** (Simons Account, Moritz/`moritzthln` ist Collaborator; Code liegt dort, 23.07.). ~~Netlify-Account~~ **Erledigt: Simon hat per GitHub-Login ein Netlify-Team erstellt** (Team-Name „waschau-evangelisch", Slug `tsielknovnomis`, laut WhatsApp 21./22.07.). **Site richtet Simon selbst per Netlify-UI ein (einfachster Weg):** app.netlify.com (GitHub-Login) → „Add new project" → „Import an existing project" → GitHub → Repo `warschau-evangelisch` → Build-Settings unverändert lassen → Deploy. Danach: *Site configuration → Environment variables* → `ADMIN_PASSWORD` = Team-Passwort (von Moritz) anlegen und **einmal neu deployen** (Deploys → Trigger deploy), sonst geht der Admin-Login nicht. Optional Site-Name ändern (z. B. `warschau-evangelisch`). Ab dann deployt jeder GitHub-Push automatisch. Wichtig: Echte Termine/News erst auf der NEUEN Site eintragen (Inhalte der Preview wandern nicht mit). Noch anlegen: **zoho.eu → Zoho Mail „Forever Free"** (Login degwaw@gmail.com).
4. **Alte Postfächer sichern**: Im cPanel (https://r1355696.hostingrd.pl:2083/) bzw. per IMAP alle Mails exportieren — nach dem 15.08. ist die Historie unwiederbringlich weg.
5. Die Proforma (282,90 PLN) **erstmal nicht zahlen** — nur Notfall-Fallback (siehe Risiken).

### Mail-Setup im Detail (ENTSCHIEDEN 28.07.: ImprovMX + Gmail — 0 €)

**Architektur:** Kein eigenes Mail-Hosting. [ImprovMX](https://improvmx.com) (Free: 500 Weiterleitungen/Tag, 25 SMTP-Sends/Tag) leitet die Adressen weiter; gesendet wird aus Gmail heraus per „Senden als" über ImprovMX-SMTP. Zoho wurde verworfen (Free-Plan ohne IMAP/Weiterleitung, regional versteckt). SMTP2GO wird NICHT gebraucht (ImprovMX-SMTP reicht).

**Adress-Plan:**
- `vorstand@` → Weiterleitung an **degwaw@gmail.com**
- `info@` → Weiterleitung an **degwaw@gmail.com**
- `pfarrer@` → Weiterleitung an die **private Adresse des Pfarrers** (Vertraulichkeit! Seelsorge-Mails gehören nicht in das gemeinsame Gmail-Postfach) — Adresse beim Pfarrer erfragen.

**Simon (~10 Min):**
1. Auf **improvmx.com** Account anlegen — Login **degwaw@gmail.com** (Gemeinde-Besitz).
2. Domain **warschau-evangelisch.de** hinzufügen.
3. Die 3 Aliase mit obigen Zielen anlegen. (DNS zeigt erstmal „pending" — das übernimmt Moritz.)

**Moritz (bei DNS-Zugriff, VOR dem 08.08.):**
4. DNS setzen: MX `mx1.improvmx.com` (10) + `mx2.improvmx.com` (20); TXT-SPF `v=spf1 include:spf.improvmx.com ~all`; **DKIM** aus dem ImprovMX-Dashboard eintragen (Zustellbarkeit!).
5. Testmails an Gmail UND Outlook/Hotmail (jens_boysen@hotmail.com).

**Simon danach — „Senden als" in Gmail (~5 Min pro Adresse):**
6. Im ImprovMX-Dashboard SMTP-Zugangsdaten erzeugen (Benutzer = vorstand@warschau-evangelisch.de).
7. Gmail (degwaw@gmail.com): Zahnrad → *Alle Einstellungen* → *Konten & Import* → *„Als anderer Absender senden" → E-Mail-Adresse hinzufügen* → vorstand@warschau-evangelisch.de → SMTP-Server **smtp.improvmx.com**, Port **587**, Benutzername = die Adresse, Passwort = aus ImprovMX. Bestätigungscode kommt als weitergeleitete Mail an. Dasselbe für info@.
8. Beim Antworten in Gmail die Absender-Adresse wählen (oder „Aus derselben Adresse antworten" in den Einstellungen aktivieren).

**Bekannte Einschränkungen (bewusst akzeptiert):** kein IMAP-Postfach (alles lebt in Gmail); 25 gesendete Mails/Tag über ImprovMX-SMTP; US-nahe Datenverarbeitung der Weiterleitung. Falls das später stört → Upgrade-Pfad: Migadu Micro (~18 €/Jahr, echte EU-Postfächer) — Recherche vom 28.07.

**Phase 2 — Ende Juli (Moritz):**
6. ~~Repo pushen~~ **Erledigt (23.07.)** — Code liegt in `tsielknovnomis/warschau-evangelisch`, Moritz pusht weiter dorthin. Offen: In Netlify-Account der Gemeinde neue Site aus dem GitHub-Repo anlegen (Auto-Deploy bei jedem Push); Env `ADMIN_PASSWORD` setzen; Blobs-Inhalte (Termine/News/Leiste) aus der bisherigen Preview-Site übernehmen.
7. Zoho: Domain verifizieren, Postfächer vorstand@/info@/pfarrer@ anlegen.

**Phase 3 — Anfang August (Moritz):**
8. **Domain-Transfer** bei INWX mit dem Auth-Code starten (.de-Transfers: Stunden bis wenige Tage).
9. **DNS umstellen:** Website → Netlify (A/CNAME bzw. Netlify DNS); Mail → Zoho (MX, SPF, DKIM, DMARC) — damit ist auch das Blocklisten-Problem Geschichte.
10. **Go-Live auf warschau-evangelisch.de** — 301-Redirects von allen alten WordPress-URLs sind in `next.config.ts` fertig.
11. Testmails an Gmail **und** Outlook/Hotmail (insb. jens_boysen@hotmail.com) zur Bestätigung.

**Phase 4 — 15.08.:** Alt-Paket auslaufen lassen. Im Panel prüfen, ob der Anbieter eine aktive Kündigung verlangt (polnische Anbieter verlängern teils automatisch).

### Risiken & Notfallplan
- **Größtes Risiko:** Domain läuft ab, bevor der Transfer durch ist → möglicher Domain-Verlust. Darum Transfer **früh** starten. Wird es bis ~08.08. knapp: **lieber einmal 282,90 PLN zahlen** als die Domain riskieren — Geld ärgerlich, Domain unersetzlich.
- **DNS-Übergang:** Mails können für einige Stunden verzögert ankommen — unkritisch, vorher ankündigen.
- **Zoho Free** = Webmail + Mobile-Apps. Desktop-IMAP (Outlook/Apple Mail) gibt's erst im Bezahltarif (~1 €/Postfach/Monat) — bei Bedarf später zubuchbar.

---

## Bereits geklärt (Historie)

- ✅ **Adresse:** `ul. Miodowa 21, 00-246 Warszawa` — offiziell bestätigt (luteranie.pl / Centrum Luterańskie / Wikipedia). Die alte „21B / 00-171" war falsch.
- ✅ **Telefon:** keine Nummer angeben — Kontakt nur per E-Mail (`info@`, `pfarrer@warschau-evangelisch.de`).
- ✅ **Vorstand:** Jürgen Wandel / Jens Boysen / Simon von Kleist (bestätigt aktuell).
- ✅ **Twitter/X `@degwaw`:** raus (toter Feed). Stattdessen YouTube + Instagram/Facebook.
- ✅ **QR-Code (Spende):** erst entfernt, dann am 17.07. vom Vorstand mit offiziellen Überweisungsdaten geliefert (poln. ZBP-Format: `|PL|13160014621728828380000001|005000|Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie|Darowizna na cele kultu religijnego|||`) → eingebaut in der Spendenkonto-Karte. Neu generieren: `node scripts/generate-donation-qr.mjs`.
- ✅ **Abendmahl:** Checkbox + Badges entfernt; öffentliche Texte sagen bewusst „**meist** mit Heiligem Abendmahl" (Gemeinde will nicht gebunden sein — Entscheidung 17.07.).
- ✅ **Bankkonto + Presserechtlich Verantwortlicher:** siehe Punkte 1 + 2 oben (beide 17.07. erledigt).

## Richtungsentscheidungen des Auftraggebers (30.06.2026)

- **Stack:** Next.js + TS + Tailwind, Netlify. *(Backend ursprünglich Supabase, am 10.07. durch Netlify Blobs ersetzt — 0 €/Monat; Supabase-Projekt gelöscht.)*
- **Sprache:** Deutsch, technisch i18n-ready (PL später ergänzbar).
- **Termine:** eigenes Termin-Modul im Backend (kein Google Calendar mehr).
- **Backend pflegbar:** Aktuelles/News + Termine + Info-Leiste. Kernseiten pflegt Moritz im Code. Predigten: statische Liste (`lib/seed/sermons.ts`), bleibt vorerst.
- **Design:** behutsam klassisch — kirchlich-würdevolle Identität bewahren, solide modernisieren (Aubergine #480048, Gold, Lutherrose).
- **Archiv:** ~~alle ~113 Alt-Beiträge migrieren~~ *(später verworfen — Aktuelles startet frisch; Alt-Inhalte liegen archiviert in `scraped/`).*
