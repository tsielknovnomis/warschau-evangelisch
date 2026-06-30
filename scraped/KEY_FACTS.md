# KEY_FACTS — Deutschsprachige Evangelische Seelsorge in Warschau

> Harte Fakten, die beim Relaunch **wörtlich** übernommen werden müssen.
> Zitate sind aus den gescrapten Seiten unter `scraped/content/` entnommen (Quelle pro Block angegeben).
> ⚠️ = Widerspruch / offene Frage, am Ende gesammelt unter „Offene Fragen“.

---

## 1. Identität

- **Vereinsname (deutsch):** „Verein für Deutschsprachige Evangelische Seelsorge in Warschau“
  (Footer-Copyright, jede Seite: „© 2023 Verein für Deutschsprachige Evangelische Seelsorge in Warschau | Stowarzyszenie Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie“)
- **Offizieller polnischer Name (laut Satzung § 1.1):** „Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie“
- **Internationaler Name (laut Satzung § 1.2):** „Für internationale Kontakte kann der Verein den Namen ‚Deutschsprachige Evangelische Seelsorge in Warschau‘ verwenden.“
- **Website-Titel / Marke:** „Deutschsprachige Evangelische Seelsorge in Warschau“ (warschau-evangelisch.de)
- **Was es ist** (Quelle `index.md`):
  > „… beim Verein für deutschsprachige evangelische Seelsorge in Warschau! Wir sind deutschsprachige Christinnen und Christen, die zeitweise oder dauerhaft in und um Warschau leben.“
  > „Als Gemeinde sind wir der evangelisch-lutherischen Tradition verbunden, aber offen für alle Menschen, egal welcher Konfession, Nationalität oder Herkunft, die in deutscher Sprache Gott in Jesus Christus begegnen, Gemeinschaft erleben und eine geistige Heimat finden möchten.“
  > „Unsere Gemeinde existiert mit Unterbrechungen seit den 1980er Jahren, wurde 2011 reorganisiert und gleichsam wiedergegründet. Sie ist _keine EKD-Auslandsgemeinde_, sondern arbeitet als eingetragener ‚Verein für Deutschsprachige Evangelische Seelsorge in Warschau‘ eng mit den polnischen Lutheranern, der Evangelisch-Augsburgischen Kirche unter der Leitung von Bischof Jerzy Samiec, und insbesondere mit der Warschauer Trinitatisgemeinde zusammen.“
- **Rechtsstatus:** Eingetragener Verein im polnischen Gerichtsregister (KRS).
  **KRS-Nummer: 0000590323**, aufgenommen **zum 08. Dezember 2015** (Quelle `uber-uns__verein.md`).

---

## 2. Kontakt

### Postanschrift / Vereinssitz (laut Spendenkonto-Block im Footer, jede Seite)
```
Ewangelickie Duszpasterstwo
Języka Niemieckiego w Warszawie
ul. Miodowa 21
00-246 Warszawa
```

### Veranstaltungsort / Gottesdienstort
- Footer (jede Seite): „ul. Miodowa 21 · 00-246 Warszawa“
- `gottesdiensttermine.md`:
  > „Soweit nicht abweichend angegeben, finden die Gottesdienste statt in der **ul. Miodowa 21**, 2. Stock – Zugang über ul. Leona Schillera.“
- `index.md`: Räumlichkeiten des „Lutherischen Zentrums in der Miodowa-Straße 21“ / „Lutherisches Zentrum in der ul. Miodowa“.
- ⚠️ **Abweichende Adresse auf der Anfahrt-Seite** (`gottesdiensttermine__anfahrt.md`):
  > „Sie finden uns unter der Adresse: ul. Miodowa **21B**, 00-**171** Warszawa, Polen“
  > „Bitte beachten Sie, dass sich der Zugang zum Gottesdienstraum auf der Hinterseite des Gebäudes in der ul. Miodowa befindet. Dorthin gelangen Sie über die ul. Leona Schillera. Der Gottesdienstraum befindet sich im 2. Stock (Synodalsaal).“
  → Hausnummer (21 vs. 21B) und PLZ (00-246 vs. 00-171) widersprechen sich zwischen Footer/Termine und Anfahrt. Siehe Offene Fragen.

### E-Mail (auf der Site verschleiert dargestellt)
- Allgemein: **info@warschau-evangelisch.de**
  (`uber-uns.md`: „schreiben Sie bitte eine E-Mail an info [at] warschau-evangelisch.de“; Footer-Kontakt: „info [klammeraffe] warschau-evangelisch [punkt] de“)
- Pastor: **pfarrer@warschau-evangelisch.de**
  (`uber-uns.md`: „… oder wenden Sie sich an unseren Pastor unter pfarrer [at] warschau-evangelisch.de.“)

### Telefon
- ⚠️ **Keine Telefonnummer auf den gescrapten Seiten gefunden.** Kontakt erfolgt ausschließlich per E-Mail. Siehe Offene Fragen.

### Social / Sonstiges
- YouTube-Kanal: „Deutschsprachige Seelsorge Warschau“ (https://www.youtube.com/channel/UCMf4N1R2vUnstAfN1KBxZ6g), Predigt-Playlist: https://www.youtube.com/playlist?list=PLoTDnYaedQnt8wxH4n61hMvhb_VbuRqa4
- Twitter/X-Handle im Footer: **@degwaw** („Meine Tweets“, https://twitter.com/@degwaw)
- KRS-Eintrag online: https://wyszukiwarka-krs.ms.gov.pl/ (Footer-Link)

---

## 3. Bank / Spendenkonto

### AKTUELL (Footer-Block „Spendenkonto“ auf JEDER Seite — verbindlich)
| Feld | Wert (wörtlich) |
|---|---|
| **Kontoinhaber** | Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie, ul. Miodowa 21, 00-246 Warszawa |
| **Bank** | BNP Paribas |
| **Konto PLN** | `13 1600 1462 1728 8283 8000 0001` |
| **EUR (IBAN)** | `PL56 1600 1462 1728 8283 8000 0003` |
| **BIC** | `PPABPLPK` |

Tabellen-Originalstruktur (zur Sicherheit, da Spaltenzuordnung im Scrape leicht versetzt ist):
> Spalte „Bankdaten“-Labels: `PLN:` / `EUR (IBAN):` / `BIC:`
> Spalte „QR-Code“: `BNP Paribas` / `13 1600 1462 1728 8283 8000 0001` / `PL56 1600 1462 1728 8283 8000 0003` / `PPABPLPK`
> (Im Quell-Markdown stehen Bank+Nummern in der QR-Spalte; inhaltlich gehören sie zu den o. g. Labels. → Im Zweifel verifizieren.)

### QR-Code / Banking-App
- Spalte „QR-Code für Überweisung per Banking-App“: enthält ein QR-Bild (im Scrape entfernt: `<Base64-Image-Removed>`).
- Alt-Text des Bildes (wörtlich): „50 PLN Spende für den Verein für deutschsprachige evangelische Seelsorge in Warschau auf das Konto 13 1600 1462 1728 8283 8000 0001“
  → Der QR-Code ist auf eine **50-PLN-Spende** auf das PLN-Konto voreingestellt. Bilddatei muss aus `scraped/assets/` o. ä. wiederbeschafft werden.

### ⚠️ ALTES Konto (nur historisch — NICHT mehr verwenden)
Im Weihnachtsbrief 2021 (`home.md`, Eintrag „Weihnachtsworte 2021“, datiert 2021-12-24) steht ein **anderes, älteres** Konto:
> Bank Polska Kasa Opieki SA
> PLN: 19 1950 0001 2006 0018 9010 0002
> EUR (IBAN): PL89 1950 0001 2006 0018 9010 0003
> BIC: PKOPPLPW
→ Veraltet; das aktuelle Konto ist das **BNP-Paribas**-Konto aus dem Footer. Beim Relaunch nur BNP Paribas übernehmen.

---

## 4. Personen

### Aktuell (laut `index.md` — neueste „Ansprechpartner“-Liste, Stand der Seite 2021-04-14 ff.)
- **Pfarrer:** Dr. Grzegorz Olek
- **Vorstand:**
  - Prädikant Jürgen Wandel (Mitglieder)
  - Jens Boysen (Finanzen)
  - Prädikant Simon von Kleist

### Historische / weitere genannte Personen
- **Jürgen Wandel** — Prädikant; im Vorstand; Geschichte-Autor; hält Predigten (z. B. Predigt vom 18.10.2020). Mehrfach genannt.
- **Simon v. Kleist** — Prädikant; Vorstand; Mit-Autor des Geschichte-Texts.
- **Jens Mattern** — Mit-Autor des Geschichte-Texts (`uber-uns__geschichte.md`, Zeile: „– _Simon v. Kleist, Jürgen Wandel, Jens Mattern_“). Keine Rolle im aktuellen Vorstand genannt.
- **Jens Boysen** — Vorstand (Finanzen) laut `index.md`; auch im Vorstand 2021 (`home.md`).
- **Anja-Désirée Lipponer** (auch „Anja Lipponer“) — bis **31.01.2021** in der Gemeinde tätig; ihr Abschiedsgottesdienst war am 31.01.2021 (`abschied-anja-desiree-lipponer.md`). Rolle nicht explizit als „Pfarrerin/Vikarin“ benannt — Dank für „Deinen Dienst in Warschau“.

### Vorstand laut Weihnachtsbrief 2021 (`home.md`, datiert 2021-12-24) — historisch
> „Ihr Vorstand des Vereins für deutschsprachige evangelische Seelsorge in Warschau: Jürgen Wandel, Jens Boysen, Simon v. Kleist“
(deckt sich mit `index.md` bis auf den Pfarrer.)

### Frühere Pfarrer / Seelsorger (aus `uber-uns__geschichte.md` & `neuer-pfarrer.md`) — historischer Kontext
- Pfarrer Heinz Domke (Berlin) — rund 19 Jahre, bis ca. 2008.
- Pfarrer **Wojciech Pracki** — erster Pfarrer ab 2011 (später Probst in Oppeln).
- Pfarrer **Karol Długosz** — neuer Pastor seit **06.09.2015** (`neuer-pfarrer.md`).
- **Agnieszka Gotfrejów-Tarnogórska** — Pressesprecherin der EAKP, begleitete die Gemeinde (ab 2015).
- Bischof der EAKP: **Jerzy Samiec** (durchgängig genannt).

⚠️ Reihenfolge/Aktualität der Pfarrer: Die Geschichte-Seite (2015) nennt Długosz als „neuen Pfarrer“; die Startseite (`index.md`, 2021+) nennt **Dr. Grzegorz Olek** als aktuellen Pfarrer. Für den Relaunch ist **Dr. Grzegorz Olek** der aktuelle Pfarrer. Siehe Offene Fragen zur Verifikation.

---

## 5. Gottesdienst-Infos

- **Rhythmus** (`uber-uns.md`):
  > „Die Gottesdienste finden im Jahresverlauf alle zwei Wochen statt, im Advent feiern wir jeden Sonntag Gottesdienst. Während der Sommerferien finden keine Gottesdienste statt.“
- **Footer (jede Seite):** „Jeden zweiten und vierten Sonntag im Monat um 09:30 Uhr“
- **`index.md`:** „Gottesdienst feiern wir üblicherweise an zwei Sonntagen im Monat im Lutherischen Zentrum in der ul. Miodowa, in der Regel mit Heiligem Abendmahl.“
- **Uhrzeit:** in der Regel **09:30 Uhr** (Footer, Oster-Ankündigung). Internationale/ökumenische Gottesdienste teils 10:30 Uhr (z. B. polnisch-schwedisch-deutscher Gottesdienst 08.12.2019, 10:30 Uhr in der Trinitatiskirche).
- **Ort:** ul. Miodowa 21, 2. Stock (Synodalsaal), Zugang über ul. Leona Schillera; gelegentlich Trinitatiskirche (Plac Stanisława Małachowskiego 1).
- **Sommerpause** (`sommerpause.md`):
  > „Während der Sommerferien finden keine Gottesdienste statt.“ / „Wichtiger Hinweis: Auch während der Sommerferien sind wir für Sie da! Auf Anfrage bieten wir Gottesdienste auch außer der Reihe! Setzen Sie sich mit uns in Verbindung.“
  > Nach der Sommerpause: „Den Einschulungsgottesdienst feiern wir am 3. September um 09:30 Uhr.“
- **Kindergottesdienst / Familiengottesdienste** parallel zum Gottesdienst (`uber-uns.md`).
- **Gemeindekaffee** im Anschluss an die Gottesdienste (`uber-uns.md`).
- **Sprache:** Deutsch. Gelegentlich ökumenische/internationale Gottesdienste mehrsprachig:
  - polnisch-deutsche Gottesdienste (mehrfach belegt),
  - **polnisch-schwedisch-deutscher** Gottesdienst zum 2. Advent (08.12.2019, `polnisch-schwedisch-deutscher-gottesdienst-zum2-advent.md`),
  - ökumenische Adventsandachten.
  - `uber-uns__geschichte.md`: Gottesdienste werden „immer wieder gerne auch von polnischen Christen und anderen Nichtmuttersprachlern besucht“.
- **Kalender-Feeds (XML/iCal)** für Termine (`gottesdiensttermine.md`):
  - XML: `https://www.google.com/calendar/feeds/gepi24i5nv28v7n3ir55fh5ta8%40group.calendar.google.com/public/basic`
  - iCal: `https://www.google.com/calendar/ical/gepi24i5nv28v7n3ir55fh5ta8%40group.calendar.google.com/public/basic.ics`
- **Aktuelle Ankündigung (Banner auf jeder Seite):**
  > „Ostergottesdienst: Herzliche Einladung zum Ostergottesdienst um 09:30 Uhr am 5. April 2026 mit Musik von J.S. Bach!“

---

## 6. Selbstbeschreibung „Über uns“ (Bullet-Liste — wörtlich aus `uber-uns.md`)

- Wir sind evangelische Christinnen und Christen unterschiedlicher Nationalitäten, eine junge Gemeinschaft mit vielen Familien.
- Wir feiern evangelische Gottesdienste in deutscher Sprache unter dem Dach und mit Unterstützung der Evangelisch-Augsburgischen Kirche in Polen.
- Die Gottesdienste finden im Jahresverlauf alle zwei Wochen statt, im Advent feiern wir jeden Sonntag Gottesdienst. Während der Sommerferien finden keine Gottesdienste statt.
- Kindergottesdienste werden parallel zum Gottesdienst angeboten. Zu bestimmten Anlässen feiern wir Familiengottesdienste mit Groß und Klein.
- Gelegenheit zum näheren Kennenlernen und Vertiefen der Gemeinschaft bietet sich beim gut besuchten Gemeindekaffee im Anschluss an die Gottesdienste.
- In Zweijahreszyklen wird Konfirmandenunterricht angeboten, außerdem finden Hauskreistreffen statt.
- Wir haben eine Trauung, eine Taufe und einen Kirchenwiedereintritt gefeiert.
- Das Krippenspiel zu Weihnachten ist jedes Jahr ein Highlight.
- Gelegentlich sind Gastprediger aus Deutschland zu Besuch,

(Abschlusssatz `uber-uns.md`):
> „Wenn Sie gerne laufend über Gottesdienste informiert oder selbst in der Gemeinde aktiv werden möchten, schreiben Sie bitte eine E-Mail an info [at] warschau-evangelisch.de oder wenden Sie sich an unseren Pastor unter pfarrer [at] warschau-evangelisch.de.“

### Glaubens-/Leitbild-Texte (aus `index.md`, falls fürs Relaunch gewünscht)
- Abschnitte „Herzlich willkommen …“, „Was wir wollen und glauben“, „Gottesdienste“, „Ansprechpartner“, „Mitgliedschaft“ mit Bibelversen (Mt 11,28; Joh 14,6; Mt 18,20; Röm 12,5). Vollständig in `scraped/content/index.md`.

---

## 7. Verein / Mitgliedschaft

### Wie man beitritt (`beitrittserklaerung.md`)
> „In drei Schritten zum Mitglied:
> 1. Beitrittserklärung hier herunterladen.
> 2. Ausfüllen und unterschreiben.
> 3. Scannen oder fotografieren und per E-Mail an uns senden.
> Gerne dürfen Sie die ausgedruckte Erklärung ebenfalls unterschrieben in den Gottesdienst mitbringen.“
- **PDF-Download Beitrittserklärung:** `http://warschau-evangelisch.de/wp-content/uploads/2024/12/Beitrittserklaerung.pdf`

### Mitgliedsbeitrag (`index.md`, Abschnitt „Mitgliedschaft“)
> „Die deutschsprachige evangelische Gemeindegruppe finanziert sich _ausschließlich aus freiwilligen Zuwendungen_ ihrer Mitglieder und anderer Personen.“
> „… ein Mitgliedsbeitrag zwischen 10 und 100 Euro bzw. 50 und 500 Złoty monatlich nach Ihren Möglichkeiten …“

### Satzung — Existenz & Eckdaten
- Vollständige **Vereinssatzung** ist vorhanden: `scraped/content/uber-uns__verein__satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau.md` (356 Zeilen, §§ 1–33).
- Titel: „Satzung des Vereins ‚Deutschsprachige Evangelische Seelsorge in Warschau‘“.
- Eckpunkte (wörtlich/sinngemäß aus der Satzung):
  - § 1: Name pl „Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie“; internat. dt. „Deutschsprachige Evangelische Seelsorge in Warschau“.
  - § 3: Sitz Warschau; Tätigkeitsbereich Polen (auch außerhalb möglich).
  - § 4: auf unbestimmte Zeit; juristische Person.
  - § 6: Zusammenarbeit mit der Evangelisch-Augsburgischen Kirche in Polen.
  - § 12/13: Mitglieder = ordentliche, Förder- und Ehrenmitglieder; ordentlich ab 16 Jahren; Ausländer ohne festen Wohnsitz in Polen können Mitglied werden.
  - § 20 ff.: Organe = Mitgliederversammlung, Vorstand, Revisionskommission.
  - § 26: Vorstand 3–6 Mitglieder (Vorsitzender, Schatzmeister, Sekretär).
- **Vereinsgründung** (`uber-uns__verein.md`): nach „zweieinhalb Jahren … zum 08. Dezember 2015 unter der KRS-Nummer 0000590323 in das Polnische Gerichtsregister aufgenommen.“

---

## 8. QR-Code / Payment-App

- Im Spendenkonto-Block existiert eine Spalte „QR-Code für Überweisung per Banking-App“ mit eingebettetem QR-Bild (im Scrape als `<Base64-Image-Removed>` entfernt).
- Voreinstellung laut Alt-Text: **50 PLN** auf das PLN-Konto `13 1600 1462 1728 8283 8000 0001`.
- → Bilddatei beim Relaunch aus `scraped/assets/` bzw. originalem WP-Upload wiederbeschaffen, oder QR neu generieren (PLN-Konto, BNP Paribas).

---

## Offene Fragen (an die Gemeinde / Site-Owner)

1. **Adress-Widerspruch:** Footer/Termine nennen „ul. Miodowa 21, 00-246 Warszawa“, die Anfahrt-Seite „ul. Miodowa 21B, 00-171 Warszawa“. Welche ist die korrekte Post- bzw. Veranstaltungsadresse? (Vermutung: 21 = Gebäudekomplex/Sitz, 21B = konkreter Zugang; PLZ-Differenz 00-246 vs. 00-171 muss geklärt werden.)
2. **Telefonnummer:** Auf der ganzen Site keine Telefonnummer gefunden. Soll im Relaunch eine Telefon-/Mobilnummer ergänzt werden, oder bleibt Kontakt rein per E-Mail?
3. **Aktueller Pfarrer:** `index.md` nennt „Dr. Grzegorz Olek“ als Pfarrer; ältere Seiten nennen Karol Długosz/Wojciech Pracki. Ist Dr. Grzegorz Olek (Stand jetzt, 2026) weiterhin der amtierende Pfarrer?
4. **Aktueller Vorstand:** Ist die Vorstandsliste (Jürgen Wandel / Jens Boysen / Simon von Kleist) noch aktuell (Stand 2026)? Gibt es weitere/neue Mitglieder?
5. **Bankspalten-Zuordnung:** Im Quell-Markdown stehen Bank+Kontonummern technisch in der QR-Spalte. Bitte bestätigen: PLN = `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN = `PL56 1600 1462 1728 8283 8000 0003`, BIC = `PPABPLPK`, Bank = BNP Paribas — und dass das alte Pekao-SA-Konto (PKOPPLPW) endgültig nicht mehr gilt.
6. **QR-Code-Bild:** Original-QR-Grafik liegt nicht im Markdown vor (Base64 entfernt). Aus den Assets wiederbeschaffen oder neu generieren?
7. **Twitter/@degwaw & YouTube:** Sollen Social-Links (Twitter @degwaw, YouTube-Kanal/Predigt-Playlist) im Relaunch übernommen werden, oder ist Twitter inzwischen inaktiv?
8. **Kalender-Feed:** Soll der bestehende Google-Calendar-Feed (gepi24i5…@group.calendar.google.com) weitergenutzt und eingebunden werden?
