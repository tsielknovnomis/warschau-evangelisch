# Asset-Inventar — warschau-evangelisch.de

Vollständiger Katalog aller Medien-Assets der gescrapten Website (Deutschsprachige Evangelische Seelsorge Warschau / DEGWAW), erstellt für den Relaunch.

**Quellen:** `.firecrawl/assets-*.txt`, `.firecrawl/embeds-and-links.json`, `scraped/assets/images/`, `scraped/assets/pdfs/`
**Stand:** 2026-06-30

**Schnellüberblick:**
- 40 Bilddateien heruntergeladen (Originale + WordPress-Größenvarianten), organisiert nach Jahr/Monat
- 2 PDFs
- 17 YouTube-Predigtvideos (eingebettet, NICHT selbst gehostet)
- 1 Twitter/X-Feed (`@degwaw`)
- ~90 externe Links (Bibel-Ressourcen, Partnergemeinden, EKD, Social Media, Karten)

---

## 1. Bild-Inventar

Die Bilder liegen in `scraped/assets/images/<jahr>/<monat>/`. WordPress (über das Jetpack/Photon-CDN `i0.wp.com` sowie PageSpeed `.webp`-Varianten) erzeugt für jedes Original automatisch beschnittene Größenvarianten (`-300x234`, `-1024x647`, `-840x385` usw.). **Für den Relaunch zählt jeweils nur das Original** — die Varianten sind Ableitungen und können neu generiert werden.

### 1a. Brand / Marke — MUST KEEP

Die Kern-Markenidentität der Gemeinde. Diese Assets unbedingt übernehmen.

| Datei | Größe | Typ | Hinweis |
|---|---|---|---|
| `2015/09/cropped-Lutherrose_small-1.png` | 43 KB | **Logo-Original (Lutherrose)** | **MUST KEEP** — Gemeindelogo |
| `2015/09/cropped-Lutherrose_small-270x270.png` | 78 KB | Logo-Variante | WP-Größenvariante |
| `2015/09/cropped-Lutherrose_small-192x192.png` | 39 KB | Favicon/App-Icon | WP-Variante (Android/PWA-Größe) |
| `2015/09/cropped-Lutherrose_small-180x180.png` | 41 KB | Apple-Touch-Icon | WP-Variante |
| `2015/09/cropped-Lutherrose_small-32x32.png` | 2,8 KB | Favicon | WP-Variante |

Zusätzlich existieren PageSpeed-optimierte WebP-Klone derselben Lutherrose (`xcropped-Lutherrose_small-*.png.pagespeed.ic.*.webp`) — in der Asset-Liste, aber **nicht relevant** (Build-Artefakte des alten PageSpeed-Moduls, werden beim Relaunch ohnehin neu erzeugt).

**Empfehlung:** Lutherrose-Original (`cropped-Lutherrose_small-1.png`) als Quelle behalten, Favicon-/Icon-Set im Relaunch neu aus dem Original ableiten (idealerweise zusätzlich als SVG vektorisieren, da PNG-Logo bei Skalierung unscharf wird).

### 1b. Hero / Altar — MUST KEEP

| Datei | Größe | Typ | Hinweis |
|---|---|---|---|
| `2021/04/Altar_Miodowa_noalpha.png` | 608 KB | **Hero-Original (Altar Miodowa)** | **MUST KEEP** — Altar der Gemeinde, Miodowa-Straße. Zentrales Hero-Motiv |
| `2021/04/Altar_Miodowa_noalpha-1024x311.png` | 362 KB | Hero-Variante (Banner-Crop) | WP-Variante, 1024×311 Banner-Zuschnitt |

**Empfehlung:** Hero behalten. `noalpha` deutet darauf hin, dass eine transparente Version existierte — falls Original mit Alpha auffindbar, für flexiblere Platzierung sichern.

### 1c. Liturgische / saisonale Illustrationen

Bilder zu Kirchenjahr-Andachten. Teils eigene Fotos/Scans, teils Stockmaterial bzw. Kunst-Reproduktionen (Gemeinfreiheit prüfen).

| Datei (Original) | Anlass | Größe | Quelle/Typ |
|---|---|---|---|
| `2016/03/pustygrób.jpg` | **Ostern** — leeres Grab (poln. „pusty grób") | 163 KB | Illustration |
| `2016/04/dergutehirte.jpg` | **Guter Hirte** (Joh 10,11) | 326 KB | Illustration/Kunstreproduktion |
| `2016/05/261258_pentecoste_giotto1_34.jpg` | **Pfingsten** — Giotto, „Pentecoste" | 170 KB | Kunstreproduktion (Giotto, gemeinfrei) |
| `2015/09/Christ_ist_geboren.jpg` | **Weihnachten** — „Christ ist geboren" | 20 KB | Illustration |
| `2015/09/wheat-850328_1280.jpg` | **Erntedank** — Weizen | 138 KB | **Stock** (Pixabay-ID 850328) |
| `2016/09/fruit-696169_1280.jpg` | **Erntedank** — Früchte | 303 KB | **Stock** (Pixabay-ID 696169) |
| `2017/01/table-291883_1280.jpg` | gedeckter Tisch (Abendmahl/Gemeinschaft?) | 298 KB | **Stock** (Pixabay-ID 291883) |
| `2015/09/Andacht-A4-1.jpg` | Andachts-Vorlage (A4-Format) | 945 KB | Scan/Layout (großes A4-Andachtsblatt) |

> **Stock-Erkennung:** Dateinamen mit Muster `<wort>-<6-7-stellige-id>_1280` (`wheat-850328`, `fruit-696169`, `table-291883`) sind klassische **Pixabay-/Stock-Downloads**. Im Relaunch ersetzbar bzw. durch eigene Motive zu ersetzen (siehe Decisions).

### 1d. Fotos (eigene Aufnahmen / Orte / Events)

| Datei (Original) | Motiv | Größe | Hinweis |
|---|---|---|---|
| `2015/09/Warszawa_panorama.jpg` | **Warschau-Panorama** | 243 KB | Stadtmotiv, vermutlich eigenes/lizenziertes Foto |
| `2015/09/Tansania_IMG_0677a_kleiner.jpg` | **Tansania** (Partnerschaft/Mission) | 84 KB | Eigenes Foto (IMG_ + handbenannt) |
| `2016/09/wpid-20160827_182420-...jpg` | Event-Foto (27.08.2016) | 80 KB | Handyfoto (wpid/Timestamp-Name) |
| `2017/06/20170624_144826.jpg` | Event-Foto (24.06.2017) | 1,6 MB | Handyfoto (Timestamp-Name) |
| `2018/04/20171112_110346-...jpg` | Event-Foto (12.11.2017) | 1,0 MB | Handyfoto (Hochformat) |
| `2025/12/45311718152_cdc9ca5fd8_o.jpg` | Foto (Flickr-Original, `_o`) | 851 KB | **Flickr**-Download (ID-Muster) — Herkunft/Lizenz prüfen |
| `2025/12/5271842813_a0693751ea_o.jpg` | Foto (Flickr-Original, `_o`) | 1,6 MB | **Flickr**-Download (ID-Muster) — Herkunft/Lizenz prüfen |

> Die beiden `2025/12/`-Dateien tragen Flickr-typische numerische IDs mit `_o` (Original-Suffix). Datum 2025/12 deutet auf neueste Uploads. **Lizenz/Herkunft klären** bevor weiterverwendet.

### 1e. Grußkarten

| Datei | Motiv | Größe | Hinweis |
|---|---|---|---|
| `2018/12/Weihnachts-Neujahrswünsche2018-29.jpg` | **Weihnachts-/Neujahrsgruß 2018** | 187 KB | Saisonale Grußkarte (datiert, einmalig) |

> Existiert doppelt als URL-encodete Variante (`Weihnachts-Neujahrsw%C3%BCnsche2018-29.jpg`) und Unicode-Variante — identische Datei (187 KB), nur unterschiedliche Pfadkodierung. **Datiert (2018) → für Relaunch vermutlich obsolet.**

### Hinweise zu Duplikaten / Encoding

- `pustygrób-300x161.jpg` existiert zweimal: einmal Unicode (`pustygrób`), einmal prozentkodiert (`pustygr%C3%B3b`) — identisch (15 KB).
- `Weihnachts-Neujahrswünsche2018-29.jpg` analog doppelt (s.o.).
- `image.php_.jpg` / `image.php_-840x385.jpg` (2016/11): über ein PHP-Skript ausgeliefertes Bild (vermutlich dynamisch generiertes Banner) — Motiv aus Datei nicht ableitbar, beim Relaunch sichten.

---

## 2. PDF-Inventar

`scraped/assets/pdfs/`

| Datei | Größe | Inhalt |
|---|---|---|
| `moege_die_strasse.pdf` | 63 KB | **„Möge die Straße uns zusammenführen"** — irischer Segen (Liedtext/Segensspruch). Liturgisches Material. |
| `Beitrittserklaerung.pdf` | 966 KB | **Beitrittserklärung** — Mitgliedschafts-/Aufnahmeformular der Gemeinde. Funktionales Dokument, im Relaunch als ausfüllbares Formular relevant. |

**Empfehlung:** Beide übernehmen. `Beitrittserklaerung.pdf` ist mit ~1 MB groß für ein Formular — ggf. komprimieren oder durch ein Online-Formular ersetzen.

---

## 3. Video-Inventar — Predigten (YouTube)

Auf der Seite sind **17 YouTube-Videos** eingebettet — die aufgezeichneten **Predigten** der Gemeinde. Sie liegen **auf YouTube** (Kanal `@warschau-evangelisch`, `UCMf4N1R2vUnstAfN1KBxZ6g`), **nicht selbst gehostet**. Es wurden keine self-hosted Video- oder Audio-Dateien gefunden (`assets-videos.txt` und `assets-audio.txt` sind leer).

| # | YouTube-Link |
|---|---|
| 1 | https://www.youtube.com/watch?v=03lmXWdb4HI |
| 2 | https://www.youtube.com/watch?v=3qrFUgtQSnM |
| 3 | https://www.youtube.com/watch?v=4jV_M37EfQ4 |
| 4 | https://www.youtube.com/watch?v=5s-HzWnWuUg |
| 5 | https://www.youtube.com/watch?v=AnlCTyzFjxA |
| 6 | https://www.youtube.com/watch?v=BqCQcuy-4is |
| 7 | https://www.youtube.com/watch?v=C7Z8rqyGL7c |
| 8 | https://www.youtube.com/watch?v=ECqKLOtuBwM |
| 9 | https://www.youtube.com/watch?v=FzNhPVmOQAQ |
| 10 | https://www.youtube.com/watch?v=MFcx9sAge40 |
| 11 | https://www.youtube.com/watch?v=SWXNsoxTJjg |
| 12 | https://www.youtube.com/watch?v=fOglfqmyVA8 |
| 13 | https://www.youtube.com/watch?v=h3N-3up1_zA |
| 14 | https://www.youtube.com/watch?v=hRflmmGXaIs |
| 15 | https://www.youtube.com/watch?v=jFWpNCuo9NQ |
| 16 | https://www.youtube.com/watch?v=xHjDEox-gTU |
| 17 | https://www.youtube.com/watch?v=yTNAwib4dco |

> **Offene Frage:** Sollen die Predigt-Videos im Relaunch weiterhin per YouTube-Embed eingebunden bleiben (kein Hosting-Aufwand, aber YouTube-Tracking/Branding und Abhängigkeit von Drittplattform), oder heruntergeladen und selbst gehostet werden (volle Kontrolle, aber Speicher-/Bandbreitenkosten)? Siehe „Decisions needed".

---

## 4. Twitter / X

Die Seite bettet einen Twitter-Feed des Gemeinde-Handles **`@degwaw`** ein (DEGWAW = Deutschsprachige Evangelische Gemeinde / Seelsorge Warschau). Verlinkt: `https://twitter.com/degwaw`.

> Die übrigen in `twitter_handles` gelisteten Einträge (`js`, `settings`, `srv`) sind **False Positives** aus dem Twitter-Widget-JavaScript (z. B. `platform.twitter.com/js/...`, `settings`, `srv`) — **keine echten Handles, ignorieren.**

---

## 5. Externe Links — Kategorien

Aus `external_links` (~90 URLs), thematisch gruppiert:

### Bibel-Ressourcen
- **die-bibel.de** (Deutsche Bibelgesellschaft, Lutherbibel 2017) — zahlreiche tiefe Bibelstellen-Links (Andachten verlinken jeweilige Tageslese)
- **bibleserver.com** (LUT / HFA) — diverse Verse (Joh 14,6; Mt 11,28; Röm 12,5 u. a.)
- `hradetzkys.de/rss/tageslosung.xml` — Tageslosung-RSS-Feed
- `liederkiste.com` — Liedtexte

### Partnergemeinden / Lutherische Kirchen Polen
- **luteranie.pl** — Evangelisch-Augsburgische Kirche in Polen (Dachorganisation)
- **trojca.waw.pl** (+ `/deutsch.html`) — Dreifaltigkeitsgemeinde Warschau (Partnergemeinde)
- **pulawska.luteranie.pl** / `pulawska.luteranie.pl` — Gemeinde Puławska
- `wbs.pl` — Warschauer Bibelgesellschaft / Gemeinde (inkl. ökum. Adventsandacht)
- `bik.luteranie.pl/.../darowizny.html` — Spenden
- `kath-emmaus.pl`, `armia-zbawienia.pl` (Heilsarmee), `ksiezowka.pl` — weitere kirchliche/ökum. Partner

### Evangelische Kirche Deutschland / Werke
- **ekd.de** (+ Kirchentag, Aktuelles) — EKD
- `gustav-adolf-werk.de` — Diaspora-Hilfswerk (Polen-Bezug)
- `hilfskomitee-evangelisch-in-polen.de` — Hilfskomitee
- `chrismon.evangelisch.de`, `evangelisch.de` (Predigt-Kommentar), `leuenberg.eu`, `berlinerdom.de`

### Diplomatische Vertretungen (deutschsprachiger Raum in Warschau)
- `warschau.diplo.de` (Dt. Botschaft), `bmeia.gv.at/.../warschau` (AT-Botschaft), `eda.admin.ch/warsaw` (CH-Botschaft), `dpg-warschau.de` (Dt.-Poln. Gesellschaft)

### Social Media
- **Facebook:** `facebook.com/warschauevangelisch` (Seite) + Gruppe „DEUTSCHSPRACHIGE.EVANGELISCHE.SEELSORGE.WARSCHAU"
- **Instagram:** `instagram.com/anja.de.li` (persönl. Profil) + Post `B-AztUxgc_X`
- **YouTube:** `@warschau-evangelisch` / Kanal `UCMf4N1R2vUnstAfN1KBxZ6g` (Predigt-Kanal)
- **Twitter/X:** `@degwaw` (s. o.)
- **Xing:** `xing.com/net/stammtischwarschau` (Warschau-Stammtisch)

### Karten / Anfahrt
- **OpenStreetMap** — mehrere Pins (Miodowa-Standort, `way/788053975`, Koordinaten 52.238/21.011)
- `jakdojade.pl` (poln. ÖPNV-Routing), `veturilo.waw.pl` (Stadtrad Warschau)
- `ul.miodowa 21` — **kaputter Link** (`http://ul.miodowa%2021/`, keine echte URL; war wohl als Adresse gemeint)

### Kalender / Tools
- **Google Calendar** — öffentlicher Gemeindekalender (Feed `gepi24i5nv28v7n3ir55fh5ta8@group.calendar.google.com`, als ICS + Basic-Feed)
- **Zoom** — `us02web.zoom.us/j/85751759449` (fester Meeting-Raum, z. B. Online-Andacht)

### Sonstige / Referenzen
- Wikipedia (95 Thesen, Memling „Jüngstes Gericht"), Wikimedia-Bild, `filharmonia.pl`, `luter2017.pl`, KRS-Register-Einträge (poln. Vereinsregister), `hyumika.com`, `d-pt.ppstatic.pl` (Bild), `krs-online.com.pl`

---

## 6. Decisions needed

1. **YouTube-Predigten — Re-Hosting?**
   17 Predigt-Videos liegen auf YouTube (nicht self-hosted). Optionen:
   - **(a) Embed behalten** — null Aufwand, kein Speicher; aber Drittabhängigkeit, YouTube-Cookies/DSGVO-Banner nötig, fremdes Branding.
   - **(b) Herunterladen & selbst hosten** — volle Kontrolle, datenschutzfreundlicher; aber Speicher-/Bandbreitenkosten und manueller Download-Aufwand für 17 Videos.
   - **(c) Hybrid** — Embed mit „2-Klick"-/Consent-Lösung (z. B. lite-youtube), Videos zusätzlich als Backup sichern.
   *Empfehlung: (c) für DSGVO-Konformität, Videos vorsorglich als Backup ziehen.*

2. **Twitter/X-Feed — behalten oder droppen?**
   Der eingebettete `@degwaw`-Feed stammt aus der Twitter-Ära. X-Embeds sind heute unzuverlässig (API-Beschränkungen, Ladeprobleme, Image-Frage). **Frage an Gemeinde:** Ist der X-Account noch aktiv? Falls ja, modernes Embed prüfen; falls nein, Feed ersatzlos entfernen und stattdessen auf den aktiven Kanal (Facebook/Instagram/YouTube) verweisen. *Tendenz: droppen.*

3. **Bilder — wiederverwendbar vs. zu ersetzendes Stockmaterial.**
   - **Behalten (Marke/eigen):** Lutherrose-Logo + Favicon-Set, Altar Miodowa (Hero), Warschau-Panorama, Tansania-Foto, eigene Event-Fotos.
   - **Ersetzen/prüfen (Stock):** `wheat-850328`, `fruit-696169`, `table-291883` (Pixabay-Stock — durch eigene oder hochwertigere/lizenzklare Motive ersetzen).
   - **Lizenz klären:** beide `2025/12/`-Flickr-Fotos (`_o`-Originale), Giotto-Pfingstbild (Kunst-Reproduktion — Gemeinfreiheit wahrscheinlich, aber Quelle dokumentieren), `dergutehirte`, `pustygrób`.
   - **Vermutlich obsolet:** datierte Grußkarte „Weihnachts-Neujahrswünsche2018", `Andacht-A4-1` (alte A4-Vorlage), `image.php_` (Herkunft unklar).

4. **Logo als Vektor?**
   Lutherrose liegt nur als PNG (max. 270×270) vor. Für scharfe Skalierung auf allen Geräten (Retina, Print, Favicon) empfiehlt sich eine **SVG-Vektorisierung** des Logos — Entscheidung, ob im Relaunch-Budget.

5. **PDFs — Formular modernisieren?**
   `Beitrittserklaerung.pdf` (966 KB) als Download behalten oder durch ein **digitales Online-Formular** ersetzen (niedrigere Hürde, kein Drucken/Scannen nötig)?

6. **Kaputter Adress-Link** `http://ul.miodowa%2021/` im Relaunch durch korrekten Maps-Link/strukturierte Adresse ersetzen.
