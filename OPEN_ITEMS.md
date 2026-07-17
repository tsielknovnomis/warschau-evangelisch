# OPEN ITEMS — vom Auftraggeber final zu klären

> Diese Punkte konnte Moritz (Stand 30.06.2026) nicht abschließend beantworten.
> Ich arbeite mit den unten genannten **Arbeitsannahmen** weiter und markiere die betroffenen
> Stellen im Code/Content mit `TODO(verify)`. **Vor dem echten Go-Live müssen diese bestätigt werden.**

| # | Thema | Arbeitsannahme (so baue ich es) | Muss bestätigt werden | Status |
|---|-------|----------------------------------|------------------------|--------|
| 1 | **Bankkonto** | BNP Paribas — PLN `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN `PL56 1600 1462 1728 8283 8000 0003`, BIC `PPABPLPK`. Altes Pekao-SA-Konto entfernt. | **PLN-Konto bestätigt** (Vorstand lieferte es am 17.07. selbst als QR-Daten). Noch offen: EUR-IBAN + BIC bestätigen. | 🟧 teilw. bestätigt |
| 2 | **Presserechtlich Verantwortlicher (§ 18 Abs. 2 MStV)** | Vorläufig **Jürgen Wandel** (erster Vorstand) im Impressum eingetragen. | **Go-Live-Blocker:** Verein muss die verantwortliche Person final benennen (Pfarrer nach Bestätigung oder benanntes Vorstandsmitglied). | 🟥 offen |
| 3 | **Amtierender Pfarrer** | Dr. Grzegorz Olek (aus neuester Alt-Seite). | Ist Dr. Olek Stand 2026 noch im Amt? Sonst Name/Titel korrigieren. | 🟧 zu verifizieren |
| 4 | **Datenschutz + Impressum** | Nach DDG/DSGVO/TDDDG 2026 finalisiert (UODO als Aufsichtsbehörde, DPF+SCC, Consent). | Anwaltliche/fachliche **Schlussprüfung** vor Go-Live (DSGVO unmittelbar, kein DSG-EKD — Annahme bestätigen). | 🟧 zu prüfen |
| 5 | **USt-IdNr.** | Annahme: gemeinnützig, keine vorhanden → im Impressum **weggelassen**. | Falls doch eine existiert: nachtragen. | 🟧 zu verifizieren |
| 6 | **Social-/Kontakt-Links** | Instagram (`instagram.com/`) und WhatsApp-Gruppe (`chat.whatsapp.com/`) sind **Platzhalter**; YouTube + Facebook (`/warschauevangelisch`) sind echt. | Echten **Instagram-Account-Link** und **WhatsApp-Gruppen-Einladungslink** eintragen. | 🟥 offen |
| 7 | **Admin-Login** | **Team-Passwort** (ein gemeinsames für alle, in Netlify-Env `ADMIN_PASSWORD`). | Passwort ändern: `netlify env:set ADMIN_PASSWORD "…"` + Redeploy — alte Sessions werden dabei automatisch ungültig. | 🟧 Passwort ändern |
| 8 | **Echte Inhalte** | Platzhalter-Termine/-News (über `/admin` pflegbar, gespeichert in Netlify Blobs). | Echte Gottesdienst-Termine + Neuigkeiten eintragen, Platzhalter ersetzen. | 🟥 offen |
| 9 | **Flickr-Fotos** (2× Dez. 2025) | **Nicht verwendet** (keine Lizenz). | Falls gewünscht: Lizenz/Herkunft klären, dann ggf. einbinden. | 🟩 entschieden (raus) |
| 10 | **Anrede Du vs. Sie** | Aktuell durchgehend „Du". | Simon klärt im Vorstand. Umstellung auf „Sie" = ~1 h reine Textarbeit (zentrale Inhalte), kein Umbau. | 🟧 Vorstand entscheidet |
| 11 | **Hosting-Umzug** (Plan unten) | GitHub + Netlify (0 €) + Domain-Transfer zu INWX (~6 €/J.) + Zoho Mail Free (0 €). | Vorstand: Domain-Ablaufdatum prüfen, **Auth-/EPP-Code holen**, 3 Gemeinde-Accounts anlegen, alte Postfächer sichern. Rechnung (282,90 PLN) nur im Notfall zahlen. | 🟥 offen — **Deadline 08./15.08.** |

## Hosting-, Domain- & Mail-Umzug — Plan (Stand 17.07.2026, Deadline 15.08.)

### Ausgangslage
- Altes Paket **„Hosting Basic" bei RejestracjaDomen.pl** (Panel: https://rejestracjadomen.pl/site/login) bündelt Hosting + E-Mail + Domain für ~283 PLN/Jahr; läuft **15.08.2026** aus, Proforma zahlbar bis **08.08.**
- System veraltet (altes PHP/WordPress). **Mailserver (195.128.154.5 / pmg.hostingrd.pl) steht auf Microsofts Sperrliste** — belegt durch Bounce an eine Hotmail-Adresse am 17.07. Gemeinde-Mails an Outlook/Hotmail kommen schon jetzt nicht an.
- Neue Website ist fertig (Netlify-Preview), Backend = Netlify Blobs, 0 €.

### Ziel-Architektur

| Baustein | Lösung | Kosten/Jahr |
|---|---|---|
| Website + Backend + Admin-Panel | **Netlify** (Gemeinde-Account) | 0 € |
| Code + Auto-Deploy | **GitHub** (Gemeinde-Account) — jeder Push deployt automatisch | 0 € |
| Domain warschau-evangelisch.de | Transfer zu **INWX** (Alternative: Porkbun) | ~6 € |
| E-Mail (vorstand@, info@, pfarrer@) | **Zoho Mail Free** — 5 Postfächer, Webmail + Mobile-Apps | 0 € |

**Summe: ~6 €/Jahr statt ~66 €.** Inhalte (Termine/Aktuelles/Leiste) brauchen kein Deploy — pflegt das Team im Panel.

### Schritte

**Phase 1 — bis Ende Juli (Vorstand, ~30 Min):**
1. Im alten Panel das **Ablaufdatum der Domain selbst** prüfen (kann vom Hosting-Datum 15.08. abweichen — bestimmt den echten Zeitdruck).
2. **Auth-/EPP-Code** für warschau-evangelisch.de anfordern.
3. Drei Gemeinde-Accounts anlegen (Login z. B. degwaw@gmail.com): **github.com**, **netlify.com** („Login mit GitHub"), **zoho.eu** (Mail Free). Moritz liefert Klick-Anleitung.
4. **Alte Postfächer exportieren/sichern** — nach dem 15.08. unwiederbringlich weg.
5. Rechnung **nicht** zahlen (nur Notfall, s. Risiken).

**Phase 2 — Ende Juli (Moritz):**
6. Repo → Gemeinde-GitHub; Netlify-Site im Gemeinde-Account + GitHub-Verbindung (Auto-Deploy); `ADMIN_PASSWORD` als Env setzen.
7. Zoho: Domain-Verifizierung + Postfächer anlegen.

**Phase 3 — Anfang August (Moritz):**
8. **Domain-Transfer** mit Auth-Code starten (.de: Stunden bis wenige Tage).
9. **DNS umstellen**: Website → Netlify; Mail → Zoho (MX, SPF, DKIM, DMARC → löst auch das Blocklisten-Problem).
10. **Go-Live auf warschau-evangelisch.de** (Redirects von Alt-URLs sind im Code fertig).
11. Testmails an Gmail **und** Outlook/Hotmail.

**Phase 4 — 15.08.:** Altes Paket auslaufen lassen (im Panel prüfen, ob aktive Kündigung nötig).

### Risiken & Notfallplan
- **Domain läuft vor Transfer ab → möglicher Domain-Verlust.** Deshalb Transfer früh starten. Wird es bis ~08.08. knapp: lieber einmal 282,90 PLN zahlen als die Domain riskieren.
- DNS-Umstellung: Mails können übergangsweise Stunden verzögert ankommen — unkritisch.
- Zoho Free = Webmail + Mobile. Desktop-IMAP (Outlook/Apple Mail) erst im Bezahltarif (~1 €/Postfach/Monat), bei Bedarf zubuchbar.

## Bereits geklärt (während dieser Session)

- ✅ **Adresse:** `ul. Miodowa 21, 00-246 Warszawa` — offiziell bestätigt (luteranie.pl / Centrum Luterańskie / Wikipedia). Die alte „21B / 00-171" war falsch.
- ✅ **Telefon:** keine Nummer angeben — Kontakt nur per E-Mail (`info@`, `pfarrer@warschau-evangelisch.de`).
- ✅ **Vorstand:** Jürgen Wandel / Jens Boysen / Simon von Kleist (bestätigt aktuell).
- ✅ **Twitter/X `@degwaw`:** raus (toter Feed). Stattdessen YouTube + Instagram/Facebook.
- ✅ **QR-Code (Spende):** erst entfernt, dann am 17.07. vom Vorstand mit offiziellen Überweisungsdaten (poln. ZBP-Format) geliefert → jetzt in der Spendenkonto-Karte eingebaut. Neu generieren: `node scripts/generate-donation-qr.mjs`.

## Vom Auftraggeber getroffene Richtungsentscheidungen (30.06.2026)

- **Stack:** Next.js + TS + Tailwind, Netlify. *(Backend ursprünglich Supabase, am 10.07. durch Netlify Blobs ersetzt — 0 €/Monat.)*
- **Sprache:** Deutsch, technisch i18n-ready (PL später ergänzbar).
- **Termine:** eigenes Termin-Modul im Backend (kein Google Calendar mehr).
- **Backend pflegbar:** Aktuelles/News + Predigt-Archiv + Termine. Kernseiten pflegt Moritz im Code.
- **Design:** behutsam klassisch — kirchlich-würdevolle Identität bewahren, solide modernisieren.
- **Archiv:** alle ~113 Alt-Beiträge als durchsuchbares Archiv migrieren.
