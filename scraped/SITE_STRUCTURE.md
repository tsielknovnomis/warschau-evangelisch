# Informationsarchitektur — warschau-evangelisch.de

**Projekt:** Relaunch der Website der *Deutschsprachigen Evangelischen Seelsorge in Warschau*
**Quelle:** WordPress-Site (Theme `responsive-brix`, WordPress 7.0), 126 gescrapte Seiten
**Ziel des Relaunch:** Inhalt & Struktur bleiben gleich, Technik/Optik wird modernisiert
**Stand der Daten:** Scrape vom 30.06.2026; sichtbares Banner wirbt für Ostergottesdienst 05.04.2026

---

## 1. Hauptnavigation (Header-Menü)

Das Primärmenü ist auf **jeder** Seite identisch (Theme-Header). Exakte Baumstruktur:

```
Home                          → /  (http://warschau-evangelisch.de/)
Gottesdienste                 → /gottesdiensttermine/
├── Alle Termine              → /gottesdiensttermine/
└── Anfahrt                   → /gottesdiensttermine/anfahrt/
Über uns                      → /uber-uns/
├── Geschichte                → /uber-uns/geschichte/
└── Verein                    → /uber-uns/verein/
    ├── Beitrittserklärung    → /beitrittserklaerung/
    └── Vereinssatzung        → /uber-uns/verein/satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau/
```

Beobachtungen:
- Der Menüpunkt **Gottesdienste** und sein Unterpunkt **Alle Termine** zeigen beide auf `/gottesdiensttermine/` (Top-Level-Link = erster Unterpunkt — typisches WordPress-Muster).
- **Home** zeigt auf die echte Startseite `/` (`index`), nicht auf die separate Seite `/home/` (`Begrüßungsseite`). Es existieren also zwei "Start"-artige Seiten (siehe §3 und §6).
- Die Menüstruktur ist 3-stufig (Beitrittserklärung/Vereinssatzung als Enkel unter Verein).
- Oberhalb des Logos liegt ein globales **Ankündigungs-Banner** ("### Ostergottesdienst: Herzliche Einladung … 05. April 2026 …") — ebenfalls auf jeder Seite.

---

## 2. Seiteninventar (126 Seiten, gruppiert nach Typ)

### (a) Core-/Strukturseiten — 13 Stück
Pflegbare, strukturelle WordPress-*Pages* (vs. Blog-*Posts*). Quelle: `urls-core.txt`.

| # | Slug | Titel | Zweck |
|---|------|-------|-------|
| 1 | `index` (`/`) | Deutschsprachige Evangelische Seelsorge in Warschau | Echte Startseite (Accordion-Willkommensseite) |
| 2 | `home` (`/home/`) | Begrüßungsseite | Alte/zweite Startseite — Blog-Stream + Kalender (Legacy) |
| 3 | `gottesdiensttermine` | Gottesdienste | Termin-Übersicht (Google-Kalender-Einbindung) |
| 4 | `gottesdiensttermine__anfahrt` | Anfahrt | Adresse, ÖPNV, OpenStreetMap-Karte |
| 5 | `uber-uns` | Über uns | Kurzporträt der Gemeinde (Stichpunkte) |
| 6 | `uber-uns__geschichte` | Geschichte | Langtext zur Gemeinde-/Vereinsgeschichte (größte Inhaltsseite, ~13k Zeichen) |
| 7 | `uber-uns__verein` | Verein | Vereinsgründung, KRS-Eintrag, Link zur Satzung |
| 8 | `uber-uns__verein__satzung-…` | Vereinssatzung | Vollständige Satzung in Paragraphen §1–§… (~21k Zeichen) |
| 9 | `beitrittserklaerung` | Beitrittserklärung | 3-Schritt-Anleitung + PDF-Download zum Mitglied werden |
| 10 | `naechster-gottesdienst` | Nächster Gottesdienst | Quasi-leere Seite (zeigt nur "Keine kommenden Termine vorhanden.") |
| 11 | `beitraege` | Beiträge | Quasi-leere Seite (nur Überschrift "Beiträge", offenbar Blog-Index-Platzhalter) |
| 12 | `links` | Links | Linksammlung zu Partnerkirchen, Botschaften etc. |
| 13 | `materialien` | Materialien | Liedtext "Möge die Straße uns zusammenführen" + PDF |

> Hinweis: Die Header-Navigation verlinkt nur **8** dieser Seiten direkt. `home`, `beitraege`, `naechster-gottesdienst` sind im Menü nicht verlinkt (nur intern/im Footer teils erreichbar).

### (b) Historische Gottesdienst-/Predigt-Beiträge — ~113 Blog-Posts
Quelle: `urls-posts.txt` (112 Post-URLs + 1 PDF-Asset). Das sind WordPress-*Posts*, chronologisch als Blog geführt.

- **Zeitraum:** Oktober **2015** bis Dezember **2021** (Inhalt). Die Banner-/Predigt-Daten im Template sind bis **2026** aktualisiert, der eigentliche Beitrags-Korpus endet aber Ende 2021 (`weihnachtsworte-2021` ist der jüngste echte Post).
- **Muster der Slugs:** drei Konventionen gemischt:
  - datierte Termine: `gottesdienst_2015-12-06`, `gottesdienst-am-14-02-2016`, `gottesdienst-2019-05-26` (Inkonsistenz: Unterstrich vs. Bindestrich, ISO vs. DD-MM)
  - benannte Anlässe: `erntedankgottesdienst-2015`, `ostergottesdienst-2017`, `pfingsten`, `christi-himmelfahrt`, `weihnachtsgottesdienst`
  - Sonder-/Ankündigungs-Posts: `neue-website`, `neuer-pfarrer`, `sommerpause`, `gottesdienstausfall_2018-05-27`, `abschied-anja-desiree-lipponer`, `wir-feiern-gottesdienst-online`
- **Inhaltsmuster pro Post:** Überschrift (Anlass/Datum) → 1 Foto (oft `wp-content/uploads/2015/09/...`) → kurzer Einladungs-/Ankündigungstext (Datum, Uhrzeit 09:30, Ort Miodowa, Abendmahl-Hinweis) → Veröffentlichungsdatum. Ab 2020 zunehmend Online-Formate (Instagram-/YouTube-Embeds, z. B. `wir-feiern-gottesdienst-online`, `online-gottesdienst-am-palmsonntag`).
- **Themen-Cluster:** reguläre Sonntags-Gottesdienste, Erntedank, Ostern, Pfingsten, Advent (1.–4. Advent), Weihnachten/Heiligabend, Reformationstag, deutsch-polnische/ökumenische Gottesdienste, Konfirmation/Konfirmandenunterricht, Gemeindeausflüge, Gemeindeversammlungen.

> Diese ~113 Posts sind das eigentliche „Archiv" der Seite. Für den Relaunch als Sammlung erhaltenswert (Gemeindechronik), aber nicht einzeln im Menü.

### (c) Sonderseiten
- `materialien` (Core-Page) — Liedtexte/Material; verlinkt PDF `wp-content/uploads/2021/01/moege_die_strasse.pdf` (im Index als eigene "Seite" erfasst, `md_chars` 996 — reines PDF-Asset).
- `links` (Core-Page) — externe Linksammlung.
- `beitrittserklaerung` (Core-Page) — Mitgliedsantrag; verlinkt PDF `wp-content/uploads/2024/12/Beitrittserklaerung.pdf`.
- **Spendenkonto** — keine eigene Seite, sondern global wiederkehrender Footer-Block (siehe §4).

---

## 3. Die 13 Core-Seiten im Detail

Jede Core-Seite besteht aus **drei Schichten**: globaler Header (Banner + Logo + Menü) — **Seiten-Body** (unten beschrieben) — globale Sidebar/Footer (§4). Nur der Body unterscheidet sich; er wird hier beschrieben.

### 3.1 `index` (`/`) — Startseite „Herzlich willkommen …"
- **Zweck:** Haupt-Landingpage, ersetzt seit Redesign die alte `home`-Seite.
- **Content-Blöcke (Accordion, Plugin `responsive-accordion-and-collapse`):** Bibelzitat-Bild (Altar Miodowa) + Losungsvers, dann 5 aufklappbare Sektionen — erste offen (`is-open`):
  1. **Herzlich willkommen …** (Selbstvorstellung, Verweis auf EAKP/Trinitatisgemeinde/Miodowa 21)
  2. **Was wir wollen und glauben** (Glaubensbekenntnis/Leitbild)
  3. **Gottesdienste** (Rhythmus: 2. & 4. Sonntag/Monat, Heiliges Abendmahl)
  4. **Ansprechpartner** (Pfarrer Dr. Grzegorz Olek; Vorstand: Jürgen Wandel, Jens Boysen, Simon von Kleist)
  5. **Mitgliedschaft** (Finanzierung durch Spenden, Beitrag 10–100 €/50–500 zł, Link zur Beitrittserklärung)
- **Dynamisch:** keine eigenen Widgets im Body; alle dynamischen Elemente liegen in der globalen Sidebar (§4).

### 3.2 `home` (`/home/`) — „Begrüßungsseite" (Legacy-Blog-Index)
- **Zweck:** ältere Startseite; faktisch ein **Blog-Stream** mit zusätzlichen Widgets. Wirkt heute redundant zu `index`.
- **Content-Blöcke:**
  - **Google-Kalender-Shortcode** `[gcal id="46"]` (Plugin `google-calendar-events`) — im Markdown unrendered sichtbar.
  - **Bilder-Galerie/Slider** (4 Kacheln: „Erntedankgottesdienst 2015", „Jeden zweiten Sonntag …", alle verlinkt auf `?p=209`).
  - Widget-Überschriften **„Nächster Gottesdienst"**, **„Beiträge"**.
  - **RSS-Tageslosung** (`### [RSS] Tageslosung`, Feed `hradetzkys.de/rss/tageslosung.xml`).
  - **Blog-Liste** beginnend mit „Weihnachtsworte 2021" inkl. **Pagination „1 2 … 112 Next »"** (`/page/2/` … `/page/112/`) → bestätigt ~112 Beitrags-Seiten.
- **Dynamisch:** Google-Kalender-Embed, RSS-Feed, paginierter Beitrags-Loop.

### 3.3 `gottesdiensttermine` — „Gottesdienste / Termine im Überblick"
- **Zweck:** zentrale Termin-/Kalenderseite (Menüpunkt „Alle Termine").
- **Content-Blöcke:** Einleitung (Ort Miodowa 21, 2. Stock, Zugang ul. Leona Schillera, Verweis auf Anfahrt) → **Google-Kalender-Liste** (Plugin `google-calendar-events`/`simcal`), aktuell leer: „Keine Einträge vom 19.06.2026 bis zum 19.07.2027." → **iCal/XML-Abo-Links** (Google-Calendar-Feed `gepi24i5nv28v7n3ir55fh5ta8@group.calendar.google.com`, als `xml.gif`/`ical.gif`-Buttons).
- **Dynamisch:** Google-Calendar-Embed (Liste) + Kalender-Abo-Feeds.

### 3.4 `gottesdiensttermine/anfahrt` — „Anfahrt"
- **Zweck:** Wegbeschreibung zum Gottesdienstraum.
- **Content-Blöcke:** Adresse (ul. Miodowa 21B, 00-171 Warszawa — ⚠ andere PLZ als sonst genannt 00-246) → ÖPNV (jakdojade.pl-Deeplink) → Veturilo-Fahrrad-Station → Hinweis Hinterzugang über ul. Leona Schillera, 2. Stock (Synodalsaal) → **OpenStreetMap-Karte** (Plugin `osm`, mit Zoom-Controls `+ – ⇧ ›` und „© OpenStreetMap contributors") → Rücklink zur Termin-Übersicht.
- **Dynamisch:** eingebettete OpenStreetMap-Karte mit Marker.

### 3.5 `uber-uns` — „Über uns"
- **Zweck:** kompaktes Gemeindeporträt.
- **Content-Blöcke:** 9-Punkte-Stichpunktliste (wer wir sind, Gottesdienst-Rhythmus 14-tägig/Advent wöchentlich/Sommerpause, Kindergottesdienst, Gemeindekaffee, Konfirmandenunterricht im 2-Jahres-Zyklus, Hauskreise, Amtshandlungen, Krippenspiel, Gastprediger) + Kontakt-E-Mails (`info [at]` / `pfarrer [at]`).
- **Dynamisch:** keine (nur globale Sidebar).

### 3.6 `uber-uns/geschichte` — „Geschichte"
- **Zweck:** ausführliche Gemeinde-/Vereinsgeschichte (Fließtext, längste Inhaltsseite).
- **Content-Blöcke:** Überschrift + Bibelmotto („Bittet, so wird euch gegeben …") → 8 Absätze: Anfänge 1980er (von Fritsch, Pfr. Domke), Lücke 2008–2010, Neugründung 2011 (Bischof Samiec, Pfr. Pracki, erster Gottesdienst Ostern 2011), Begründung deutschsprachiger Gemeinde, Amtshandlungen, Zusammenarbeit EAKP/Trinitatis, Vakanz/Wechsel der Pfarrer (Pracki → Długosz 2015), Vereinsgründung Dezember 2015. Abschluss: Verweis auf chrismon-Artikel (April 2016) + EKD-Archiv.
- **Dynamisch:** keine.

### 3.7 `uber-uns/verein` — „Verein"
- **Zweck:** Vereins-Rechtsstatus erklären.
- **Content-Blöcke:** 3 Absätze (Zweck der Vereinsgründung; KRS-Eintragung 08.12.2015 unter **KRS 0000590323** mit externem KRS-Link; Dank an Beteiligte) → Button-Link **„Satzung des Vereins … anzeigen"** (zeigt auf Legacy-URL `/satzung-des-vereins-…/`, nicht die kanonische `/uber-uns/verein/satzung-…/`).
- **Dynamisch:** keine.

### 3.8 `uber-uns/verein/satzung-…` — „Vereinssatzung"
- **Zweck:** vollständige Vereinssatzung (juristischer Volltext).
- **Content-Blöcke:** Paragraphen **§1 ff.** mit nummerierten Absätzen (Name „Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie"; Zweck; Sitz Warschau; Rechtsperson; Stempel/Logo; Kooperation EAKP; Ehrenamt; Vereinsziele …). ~21k Zeichen, reiner Strukturtext.
- **Dynamisch:** keine.

### 3.9 `beitrittserklaerung` — „Beitrittserklärung"
- **Zweck:** Mitglied werden.
- **Content-Blöcke:** „In drei Schritten zum Mitglied" (1. PDF herunterladen → `wp-content/uploads/2024/12/Beitrittserklaerung.pdf`, 2. ausfüllen/unterschreiben, 3. scannen & per E-Mail senden) + Hinweis, die Erklärung auch im Gottesdienst abgeben zu können.
- **Dynamisch:** keine (statischer PDF-Download).

### 3.10 `naechster-gottesdienst` — „Nächster Gottesdienst"
- **Zweck:** eigenständige Seite, die den nächsten Termin zeigen soll.
- **Content-Blöcke:** nur Überschrift + „Keine kommenden Termine vorhanden." — **funktional leer** (dieselbe Aussage liefert bereits das Sidebar-Widget).
- **Dynamisch:** vermutlich Kalender-Widget (aktuell ohne Daten).

### 3.11 `beitraege` — „Beiträge"
- **Zweck:** Blog-Index/Archiv-Platzhalter.
- **Content-Blöcke:** nur Überschrift „Beiträge" — **leerer Body** (Beitragsliste rendert hier nicht; der eigentliche Stream liegt auf `home`).
- **Dynamisch:** keine sichtbar.

### 3.12 `links` — „Links"
- **Zweck:** kuratierte externe Linkliste.
- **Content-Blöcke:** ~14 Links: EAKP (luteranie.pl), EKD, Hilfskomitee, Kirchentag, Trinitatisgemeinde, Himmelfahrtsgemeinde, kath. Emmaus-Gemeinde, Botschaften (DE/AT/CH), Willy-Brandt-Schule, Deutsch-Polnische Gesellschaft, Deutscher Stammtisch (XING), Bischofspredigt-Link (evangelisch.de). ⚠ Mehrere Ziele sind `http://` und potenziell tot (XING-Gruppe, diplo-Subseiten).
- **Dynamisch:** keine.

### 3.13 `materialien` — „Materialien"
- **Zweck:** Lied-/Begleitmaterial.
- **Content-Blöcke:** Liedtext **„Möge die Straße uns zusammenführen"** (irisches Segenslied, 4 Strophen + Refrain) + Link zur PDF-Version (`wp-content/uploads/2021/01/moege_die_strasse.pdf`).
- **Dynamisch:** keine.

---

## 4. Wiederkehrende Sidebar & Footer (global, jede Seite)

Identisch auf allen Core-Pages **und** Blog-Posts (Theme-Sidebar/Footer). Reihenfolge:

1. **Widget „Nächster Gottesdienst"** — Google-Calendar-getrieben; aktuell „Keine kommenden Termine vorhanden."
2. **Widget „Predigt vom [Datum]"** — **YouTube-Video-Embed** der jeweils letzten Predigt (aktuell „Der Versuchung widerstehen", 22.02.2026, Kanal „Deutschsprachige Seelsorge Warschau", 33 Abonnenten, Video `youtu.be/xHjDEox-gTU`).
3. **Widget „Weitere Predigten"** — Link zur **YouTube-Playlist** (`youtube.com/playlist?list=PLoTDnYaedQnt8wxH4n61hMvhb_VbuRqa4`).
4. **Block „Spendenkonto"** — Tabelle mit:
   - **Kontoinhaber:** Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie, ul. Miodowa 21, 00-246 Warszawa
   - **Bank:** BNP Paribas — PLN `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN `PL56 1600 1462 1728 8283 8000 0003`, BIC `PPABPLPK`
   - **QR-Code** für Banking-App-Überweisung (50-PLN-Spende)
   - ⚠ Auf `/home/` steht eine **abweichende, ältere Bankverbindung** (Bank Pekao SA, PLN `19 1950 0001 2006 0018 9010 0002`, BIC `PKOPPLPW`) → Daten-Inkonsistenz.
5. **Block „Seitenübersicht" (Mini-Sitemap)** — Begrüßungsseite, Über uns, Gottesdienste, Anfahrt, Verein, Geschichte, Beitrittserklärung, Materialien, Links.
6. **Twitter-Feed-Widget** — „Meine Tweets" / `twitter.com/@degwaw` (Handle **@degwaw**), per `twitter-timeline`/`widgets.js`. Liefert beim Scrape **„Rate limit exceeded"** → faktisch defekt/tot.
7. **Footer-Kontaktblock „Deutschsprachige evangelische Gottesdienste in Warschau":**
   - Adresse: ul. Miodowa 21, 00-246 Warszawa (Link → Anfahrt)
   - Rhythmus: „Jeden zweiten und vierten Sonntag im Monat um 09:30 Uhr"
   - **KONTAKT:** verschleierte E-Mail `info [klammeraffe] warschau-evangelisch [punkt] de`
   - **KRS-Badge** (Link zur polnischen KRS-Datenbank)
   - **Copyright:** „© 2023 Verein für Deutschsprachige Evangelische Seelsorge in Warschau | Stowarzyszenie Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie" (⚠ Jahr 2023 hart kodiert)

---

## 5. Relaunch-Notizen

### Klar veraltet / inkonsistent
- **Hartkodierte Daten/Jahre:** Footer-Copyright „© 2023"; globales Banner mit fixem Osterdatum (05.04.2026) auf allen Seiten — sollte dynamisch oder per Aktuelles-Modul werden.
- **Toter Twitter-Feed:** `@degwaw`-Timeline liefert „Rate limit exceeded"; Twitter/X-Widgets sind ohnehin kaum noch sinnvoll einbettbar → **entfernen oder durch aktiven Kanal ersetzen**.
- **Beitrags-Korpus endet 2021** (`weihnachtsworte-2021`), obwohl Predigt-Widget bis 2026 gepflegt ist → Blog wird nicht mehr bespielt; Aktualität kommt nur noch über YouTube/Kalender.
- **Widersprüchliche Bankdaten:** `index` (BNP Paribas) vs. `home` (Bank Pekao SA) → vor Relaunch verifizieren, welche aktuell ist.
- **Adress-Inkonsistenz:** Miodowa 21, 00-246 (Footer/Spendenkonto) vs. Miodowa 21B, 00-171 (Anfahrt) → klären.
- **`http://`-Links** (Botschaften, XING-Stammtisch, EKD-Unterseiten) — teils tot/unsicher; im Relaunch prüfen und auf `https` heben.
- **`[gcal id="46"]`-Shortcode** rendert auf `/home/` nicht sauber (Plugin-Altlast).

### Redundant / Junk (Relaunch-Kandidaten zum Zusammenlegen/Entfernen)
- **Zwei Startseiten:** `index` (modern, Accordion) und `home` (alter Blog-Index). `home` ist redundant → in modernes „Aktuelles" überführen oder streichen; nur eine Startseite behalten.
- **Leere Seiten:** `naechster-gottesdienst` (nur „Keine Termine") und `beitraege` (nur Überschrift) — Inhalt wird bereits durch Sidebar-Widget bzw. Blog-Stream abgedeckt → als eigene Seiten überflüssig.
- **Doppelte Weihnachts-Posts:** `weihnachts%c2%adgottesdienst` (URL-encodetes Weiches Trennzeichen im Slug) **und** `weihnachtsgottesdienst` — derselbe Titel, kaputter Sonderzeichen-Slug → konsolidieren.
- **Doppelte ökumenische Adventsandacht:** `oekumenische-adventsandacht` + `oekumenische-adventsandacht2017` (gleicher Titel).
- **Typische WP-Archiv-Altlasten** (nicht im Scrape, aber im Relaunch zu beachten): `/__trashed`-Slugs, `author/`-Archive, `category/`/`tag/`-Archive, `/page/2…112/`-Pagination, `?p=209`-ID-Permalinks → im neuen System nicht nachbauen, alte URLs per Redirect auf passende Inhalte abfangen.
- **Inkonsistente Slug-Konventionen** im Post-Archiv (Unterstrich vs. Bindestrich, ISO vs. DD-MM-Datum) → bei Migration vereinheitlichen, alte Slugs als Redirects erhalten.
- **Doppelte interne Pfade** für dieselbe Seite (z. B. Satzung unter `/satzung-…/` und `/uber-uns/verein/satzung-…/`) → eine kanonische URL festlegen.

### Klar erhaltenswert (Struktur bleibt)
- **Header-Navigation 1:1** (Home / Gottesdienste › Alle Termine, Anfahrt / Über uns › Geschichte, Verein › Beitrittserklärung, Vereinssatzung).
- **Inhaltlich tragende Core-Seiten:** `index` (Accordion-Leitbild), `geschichte`, `verein` + `satzung`, `uber-uns`, `gottesdiensttermine`, `anfahrt`, `links`, `materialien`, `beitrittserklaerung`.
- **Funktionsblöcke:** Google-Kalender (Termine + iCal/XML-Abo), OpenStreetMap-Karte (Anfahrt), YouTube-Predigt-Embed + Playlist, Spendenkonto-Block (mit QR), KRS-Badge, verschleierte Kontakt-E-Mail.
- **Predigt-/Gottesdienst-Archiv (~113 Posts, 2015–2021):** als Gemeindechronik/Archivbereich erhalten (gesammelt, nicht im Hauptmenü), inkl. PDFs (`moege_die_strasse.pdf`, `Beitrittserklaerung.pdf`).
- **Mehrsprachige Vereins-Identität** (deutsch/polnischer Vereinsname) im Footer beibehalten.

---

## Anhang — Datei-Referenzen
- Index aller 126 Seiten: `.firecrawl/pages-index.json`
- Core-URLs (13): `.firecrawl/urls-core.txt`
- Post-URLs (112 + 1 PDF): `.firecrawl/urls-posts.txt`
- Markdown aller Seiten: `scraped/content/*.md`
- Roh-HTML der 13 Core-/Strukturseiten: `scraped/html/*.html`
