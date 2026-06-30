# Scrape-Report — warschau-evangelisch.de

**Master-Index zum Relaunch der Website der *Deutschsprachigen Evangelischen Seelsorge in Warschau* (DEGWAW).**
Dieses Dokument ist der Einstiegspunkt: was gescrapt wurde, wo es liegt, was die vier Detail-Analysen enthalten und welche Fragen vor dem Relaunch beim Auftraggeber zu klären sind.

**Scrape-Stand:** 30.06.2026 · **Quelle:** WordPress-Site (`http://warschau-evangelisch.de/`)

---

## 1. Was wurde gescrapt — Inventar & Ablage

Alles liegt unter `scraped/`. Die Roh-Metadaten des Scrapers liegen eine Ebene höher in `.firecrawl/` (Projekt-Root).

| Was | Menge | Ort |
|---|---|---|
| Seiteninhalte als Markdown | **126 Seiten** | `scraped/content/*.md` |
| Roh-HTML der Kernseiten | **13 Core-Seiten** | `scraped/html/*.html` |
| Bilder (Originale + WP-Größenvarianten) | **40 Bilder** (46 Dateien inkl. Encoding-Dubletten/PageSpeed-Klone; ~26 Originale) | `scraped/assets/images/<jahr>/<monat>/` |
| PDFs | **2** (`Beitrittserklaerung.pdf`, `moege_die_strasse.pdf`) | `scraped/assets/pdfs/` |
| Theme- & Plugin-CSS | 4 Dateien | `scraped/assets/css/` |
| Screenshots | **4** (Home Desktop/Mobile, Gottesdienste, Über uns) | `scraped/screenshots/` |
| Scraper-Metadaten | URL-Listen, Asset-Listen, Embeds/Links, Branding-JSON | `.firecrawl/` (Projekt-Root) |

**Hinweise zur Ablage:**
- `scraped/assets/fonts/` und `scraped/assets/videos/` sind **leer** — die Schrift (Open Sans) kommt von Google Fonts, alle Videos liegen als YouTube-Embeds vor (nichts self-hosted).
- Die **17 Predigt-Videos** sind nicht heruntergeladen, sondern verweisen auf den YouTube-Kanal (`@warschau-evangelisch`). Liste in `ASSET_INVENTORY.md`.
- Nützliche Metadaten-Dateien: `.firecrawl/pages-index.json` (alle 126 Seiten), `.firecrawl/urls-core.txt` (13 Core), `.firecrawl/urls-posts.txt` (112 Posts + PDF), `.firecrawl/embeds-and-links.json`, `.firecrawl/homepage-full.json` (Branding-Extraktion).

---

## 2. Die Site in einem Absatz

Die Website gehört dem **Verein für Deutschsprachige Evangelische Seelsorge in Warschau** (poln. *Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie*, KRS 0000590323) — einer eingetragenen, deutschsprachigen evangelisch-lutherischen Gemeinde, die unter dem Dach der Evangelisch-Augsburgischen Kirche in Polen und in enger Zusammenarbeit mit der Warschauer Trinitatisgemeinde arbeitet (keine EKD-Auslandsgemeinde). Die Seite dient als Visitenkarte und Infozentrum: Gottesdiensttermine, Anfahrt zur ul. Miodowa 21, Selbstporträt/Leitbild, Gemeinde- und Vereinsgeschichte, Vereinssatzung, Mitgliedschaft/Spenden sowie ein Predigt-Archiv. Technisch ist es eine **WordPress-Installation** mit dem kommerziellen Theme *Responsive Brix* (~2015), Markenfarbe Aubergine `#480048`, Lutherrose-Logo und Open Sans. Der Zustand ist gemischt: Template und Predigt-Widget sind bis 2026 gepflegt (Oster-Banner 05.04.2026, jüngste Predigt 22.02.2026), der eigentliche **Blog-/Predigt-Korpus von ~113 Beiträgen reicht jedoch nur von 2015 bis Ende 2021** und wird seither nicht mehr bespielt; Aktualität kommt nur noch über YouTube und Google Calendar. Es gibt diverse Altlasten (zwei Startseiten, leere Platzhalter-Seiten, hartkodiertes „© 2023", toter Twitter-Feed) und mehrere inhaltliche Widersprüche (Bankverbindung, Adresse, amtierender Pfarrer), die der Relaunch bereinigen muss. **Ziel des Relaunch:** Inhalt und Struktur weitgehend erhalten, Technik und Optik modernisieren.

---

## 3. Die vier Detail-Dokumente

| Dokument | Inhalt |
|---|---|
| [`SITE_STRUCTURE.md`](./SITE_STRUCTURE.md) | Informationsarchitektur: Hauptnavigation, vollständiges Seiteninventar (13 Core-Seiten im Detail + ~113 Blog-Posts), globale Sidebar/Footer, Relaunch-Notizen (veraltet/redundant/erhaltenswert). |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Visuelles Erscheinungsbild: Farbpalette, Typografie, Layout, Komponenten — plus Modernisierungs-Chancen mit Leitsatz „gleiche Seele, zeitgemäßes Handwerk". |
| [`ASSET_INVENTORY.md`](./ASSET_INVENTORY.md) | Vollständiger Medienkatalog: Bilder (Marke/Hero/liturgisch/Stock/Fotos), PDFs, 17 YouTube-Predigten, Twitter, ~90 externe Links — inkl. „Decisions needed". |
| [`KEY_FACTS.md`](./KEY_FACTS.md) | Harte, wörtlich zu übernehmende Fakten: Identität, Kontakt, Bankdaten, Personen, Gottesdienst-Infos, Selbstbeschreibung, Verein/Mitgliedschaft, QR-Code. |

---

## 4. Offene Fragen an den Auftraggeber

Konsolidiert und entdoppelt aus allen vier Analysen. **P1 = vor Relaunch klären** (Fakten erscheinen sonst falsch online), P2 = Produkt-/Scope-Entscheidung, P3 = nice-to-have.

### Umfang & Inhalte

- **(P2)** Soll das historische Predigt-/Gottesdienst-Archiv (~113 Posts, 2015–2021) im Relaunch als **durchsuchbares Archiv** erhalten bleiben, oder reicht eine kuratierte Auswahl? Der Blog wird seit Ende 2021 nicht mehr bespielt.
- **(P2)** Kann die zweite Startseite `/home` (alter Blog-Index mit `[gcal]`-Shortcode) entfallen und durch ein **modernes Aktuelles-Modul** auf der neuen Startseite ersetzt werden?
- **(P2)** Sollen die **leeren Seiten** `/naechster-gottesdienst` und `/beitraege` als eigenständige Seiten gestrichen werden? Ihre Inhalte sind bereits über Sidebar-Widget bzw. Kalender abgedeckt.
- **(P3)** Ist die datierte Grußkarte „Weihnachts-Neujahrswünsche2018" bzw. die A4-Andachtsvorlage für den Relaunch noch relevant oder obsolet?
- **(P3)** `Beitrittserklaerung.pdf` (966 KB) als Download behalten oder durch ein **digitales Online-Formular** ersetzen?

### Fakten & Daten (P1 — Widersprüche, müssen aufgelöst werden)

- **(P1) Bankverbindung:** Welches Konto gilt? `/index` nennt **BNP Paribas** (PLN `13 1600 1462 1728 8283 8000 0001`), `/home` nennt **Bank Pekao SA** (PLN `19 1950 0001 2006 0018 9010 0002`) — widersprüchlich. Bitte zugleich die Spaltenzuordnung bestätigen: PLN = `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN = `PL56 1600 1462 1728 8283 8000 0003`, BIC = `PPABPLPK`, Bank = BNP Paribas — und dass das alte Pekao-SA-Konto (`PKOPPLPW`) endgültig nicht mehr gilt.
- **(P1) Adresse:** Welche stimmt? Footer/Spendenkonto/Termine nennen **ul. Miodowa 21, 00-246 Warszawa**, die Anfahrt-Seite **ul. Miodowa 21B, 00-171 Warszawa** (Hausnummer 21 vs. 21B, PLZ 00-246 vs. 00-171).
- **(P1) Amtierender Pfarrer:** Ist **Dr. Grzegorz Olek** (laut `index.md`) Stand 2026 weiterhin der amtierende Pfarrer? Ältere Seiten nennen Karol Długosz / Wojciech Pracki.
- **(P1) Vorstand:** Ist die Liste (Prädikant Jürgen Wandel / Jens Boysen, Finanzen / Prädikant Simon von Kleist) Stand 2026 noch aktuell?
- **(P2) Telefon:** Es gibt **keine Telefonnummer** auf der gesamten Site. Im Relaunch eine Telefon-/Mobilnummer ergänzen, oder Kontakt rein per E-Mail?

### Design & Marke

- **(P2)** Soll **Koralle (`#F3595B`)** oder **Aubergine (`#480048`)** die kanonische **Linkfarbe** sein? Heute widersprüchlich (Theme-Default Koralle vs. Customizer-Override Aubergine).
- **(P3)** Soll das **Lutherrose-Logo** (liegt nur als PNG bis 270×270 vor) für scharfe Skalierung als **SVG** vektorisiert werden?

### Technik & Hosting

- **(P2)** Bleibt die **Google-Calendar-Integration** (inkl. iCal/XML-Abo-Feeds, Kalender `gepi24i5nv28v7n3ir55fh5ta8@group.calendar.google.com`) im neuen System bestehen, oder wird auf ein anderes Termin-/Kalendersystem migriert?
- **(P2)** Wer pflegt nach dem Relaunch das **Oster-/Ankündigungs-Banner** und das **„Predigt vom …"-Widget** — dynamisch/CMS-gesteuert oder weiterhin manuell?
- **(P2)** Original-**QR-Code-Grafik** (50-PLN-Spende, Banking-App) fehlt im Scrape (Base64 entfernt) und liegt nicht in `scraped/assets/`. Aus Originalquelle wiederbeschaffen oder neu generieren (BNP-Paribas-PLN-Konto)?

### Medien (Videos & Social)

- **(P2) YouTube-Predigten:** Weiterhin per Embed einbinden oder herunterladen und selbst hosten? *Empfehlung: DSGVO-konformes 2-Klick-Embed (z. B. lite-youtube) plus vorsorgliches Backup der 17 Videos.*
- **(P1/P2) Twitter/X `@degwaw`:** Der eingebettete Feed ist defekt („Rate limit exceeded"). Ist der Account noch aktiv? Falls nein, ersatzlos entfernen und stattdessen auf Facebook/Instagram/YouTube verweisen. *Tendenz: droppen.*
- **(P2) Social-Links allgemein:** Sollen Twitter `@degwaw`, YouTube-Kanal + Predigt-Playlist im Relaunch übernommen werden?

### Bild-Lizenzen (P1 vor Weiterverwendung)

- **(P1)** Lizenz/Herkunft der beiden 2025/12-**Flickr-Fotos** (`45311718152_…`, `5271842813_…`) klären, bevor sie weiterverwendet werden.
- **(P2)** Sollen die drei **Pixabay-Stockbilder** (wheat, fruit, table) durch eigene oder lizenzklare Motive ersetzt werden?
- **(P3)** Was zeigt das über `image.php` ausgelieferte Banner (2016/11)? Motiv und Herkunft sind aus der Datei nicht ableitbar — beim Relaunch sichten.

---

## 5. Empfohlene nächste Schritte

1. **P1-Fragen an den Auftraggeber schicken** (Bankverbindung, Adresse, Pfarrer, Vorstand, Flickr-Lizenzen) — diese Fakten gehen sonst falsch online und blockieren den Content-Aufbau.
2. **Scope/IA festlegen:** eine Startseite + Aktuelles-Modul, Archiv-Strategie für die ~113 Posts, leere Seiten streichen. Grundlage: `SITE_STRUCTURE.md` §5.
3. **Design-Direction fixieren:** Linkfarbe entscheiden, Aubergine-Palette mit Tints/Shades ausbauen, Typo-Skala (Body 17–18px), Buttons modernisieren. Grundlage: `DESIGN_SYSTEM.md` §5.
4. **Assets aufräumen:** Marke (Lutherrose, Altar-Hero) übernehmen, Stockbilder/datierte Grafiken markieren, QR-Code wiederbeschaffen/neu generieren, Logo-SVG erwägen. Grundlage: `ASSET_INVENTORY.md` §6.
5. **Migrations-Hygiene planen:** alte WP-URLs (Pagination, `?p=`-Permalinks, Slug-Inkonsistenzen, Doppelseiten) per Redirect auf neue, kanonische URLs abfangen; `http://`-Links auf `https` heben.
6. **Tech-Entscheidung:** Kalender (Google Calendar weiter?) und Predigt-Widget (CMS-gesteuert?) klären, bevor das neue System gewählt wird.
