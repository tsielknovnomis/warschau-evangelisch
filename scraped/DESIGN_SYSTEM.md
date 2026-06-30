# Design-System — warschau-evangelisch.de

Dokumentation des visuellen Erscheinungsbilds der gescrapten WordPress-Seite
(Deutschsprachige Evangelische Seelsorge in Warschau) als Grundlage für einen
identitätstreuen, modernisierten Relaunch.

**Theme:** Responsive Brix 4.9.13 (kommerzielles WordPress-Theme, ~2015)
**Logo:** Lutherrose (`cropped-Lutherrose_small-1.png`)
**Quellen:** `responsive-brix-style.min.css` (~63 KB Theme), Plugin-/Google-Fonts-CSS,
`homepage-inline.css` (WP-Customizer), strukturierte Branding-Extraktion in
`homepage-full.json`, Screenshots (Home Desktop/Mobile, Gottesdienste, Über uns).

---

## 1. Farbpalette

| Token | Hex | Verwendung |
|---|---|---|
| `--color-primary` (Aubergine) | `#480048` | Markenfarbe. Kopfbalken-Hintergrund (`header::before { background: rgb(72,0,72) }`), Site-Title, Navigation, hervorgehobener Fließtext (`<strong>`), Links im Inhalt (Customizer-Override). Dominante Identitätsfarbe, ~90 Verwendungen. |
| `--color-accent` (Koralle) | `#F3595B` | Akzent. Theme-Default-Linkfarbe (`a{color:#f3595b}`), Buttons (`.button{background:#f3595b}`), CTA-Hervorhebungen, kleine Markierungen im Footer. |
| `--color-secondary` (Blaugrau) | `#ABB8C3` | Sekundärfarbe (aus Branding-Tokens + WP-Block-Palette). Dezente UI-Akzente, Trennelemente. |
| `--color-section-bg` (Creme) | `#F6F3ED` | Warmer Sektions-Hintergrund. `.highlight-typo`, Spendenkonto-Band, `.wp-caption`, Menü-Hover, `#loop-meta`. 16 Verwendungen — der „ruhige“ Hintergrund-Charakter der Seite. |
| `--color-text` (Body) | `#666` | Standard-Fließtextfarbe (`body{color:#666}`). 14 Verwendungen. |
| `--color-text-muted` | `#AAA` | Gedämpfter Text, Blockquote-Text, Social-Icons im Topbar, Bildunterschriften. |
| `--color-heading-on-dark` | `#FFF` | Weiß. H1 im Kopfbalken/Hero (weiß auf Aubergine), Button-Text, `:hover`-States auf invertierten Bereichen. |
| `--color-border` | `#DDD` | Trennlinien, Tabellen, Blockquote-Border-left, Box-Rahmen. 34 Verwendungen — sehr präsent (text-/listenlastiges Layout mit vielen Linien). |
| `--color-background` | `#FFFFFF` | Seiten-Grundhintergrund (`body{background:#fff}`). Hauptspalte ist weiß. |

> Hinweis: Die WP-Gutenberg-Block-Palette (`#ff6900`, `#fcb900`, `#cf2e2e`, `#9b51e0`,
> `#0693e3` …) liegt in `homepage-inline.css`, ist aber **theme-default** und gehört
> *nicht* zur Markenidentität — beim Relaunch ignorieren.

---

## 2. Typografie

**Schriftfamilie:** Open Sans (Google Fonts), Fallback-Stack
`"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`.
Überschriften und Body verwenden dieselbe Familie (kein Display-/Serif-Kontrast).

**Geladene Google-Fonts-Gewichte** (`open-sans-googlefonts.css`):

| Gewicht | Style | Rolle |
|---|---|---|
| 300 (Light) | normal | feine Überschriften / große Headings |
| 400 (Regular) | normal + italic | Fließtext, Standard |
| 700 (Bold) | normal + italic | Buttons, fette Hervorhebungen |
| 800 (ExtraBold) | normal | kräftige Headings |

**Größen & Gewichte:**

| Element | Größe | Line-height | Gewicht / Farbe |
|---|---|---|---|
| Body | `14px` | `2em` (≈28px) | 400, `#666` |
| H1 (Hero, auf Kopfbalken) | `50px` | — | weiß auf Aubergine |
| H1 (Theme em-Skala) | `2.57em` (≈36px) | `1.333em` | im Inhalt |
| H2 | `30px` | `1.333em` | Abschnittsüberschriften (z. B. „Was wir wollen und glauben“) |
| H3 | `1.71em` (≈24px) | — | Unterüberschriften / Widget-Titel |
| H4 / Widget | `20px` (auf Dunkel `15px`) | `1.4285em` | Sidebar-Widget-Titel |

**Line-heights im System:** `1em`, `1.333em`, `1.4em`, `2em` (Body). Großzügige
Zeilenhöhe von 2em beim Fließtext erzeugt den luftigen, lesefreundlichen, aber
text-lastigen Charakter. Body-Schrift mit nur 14px ist nach heutigen Maßstäben klein.

---

## 3. Layout

**Gesamtstruktur (von oben nach unten, siehe Screenshots):**

1. **Schmaler Hinweis-Balken** ganz oben (Mini-Text, zentriert — Termin-/Hinweiszeile).
2. **Aubergine Kopfbalken** (`#480048`): Logo + Site-Title („Deutschsprachige
   Evangelische Seelsorge in Warschau“, mehrzeilig) **links**, Hauptnavigation
   (HOME, GOTTESDIENSTE ▾, ÜBER UNS ▾ …) **rechts**. Weiße Typo auf Aubergine.
3. **Hero-Bild** unter dem Kopf (Altar-/Kerzenmotiv), volle Inhaltsbreite, darunter
   ein Bibelvers als Bildunterschrift („… Matthäus 11,28“, rechtsbündig kursiv).
4. **Inhaltsbereich zweispaltig:**
   - **Hauptspalte (links, breit, weiß):** Fließtext-Begrüßung + Akkordeon-Abschnitte.
   - **Sidebar (rechts, schmal):** Widgets „Nächster Gottesdienst“, „Predigt …“,
     „Weitere Predigten“.
5. **Spendenkonto-Band** (Creme `#F6F3ED`, volle Breite): drei Spalten —
   Kontoinhaber | Bankdaten | QR-Code für Überweisung.
6. **Footer** (Creme, mehrspaltig): Social-Icons, „Meine Tweets“, Seitenübersicht
   (Linkliste), Kontaktblock (Adresse, Telefon, E-Mail). Ganz unten Copyright-Zeile.

**Container & Breite:**
- Maximale Inhaltsbreite: `max-width: 1260px`, zentriert.
- Hauptspalte + rechte Sidebar (`layout-narrow-right`), Creme-Bänder bluten per
  `width:9999px`-Pseudoelement randlos über die volle Viewport-Breite aus.

**Responsive Breakpoint:**
- Primärer Umbruch bei **`max-width: 799px`** (17 Media-Queries) — darunter
  Mobile-Layout: einspaltig gestapelt, Navigation als Burger/eingeklappt,
  Sidebar rutscht unter den Inhalt, Spendenkonto-Spalten stapeln (siehe
  `02-home-mobile.png`).
- Weitere Breakpoints (WP-/Plugin-bedingt): 600px, 768px, 782px, 1023px.

**Spacing-Skala:** Basis-Einheit `4px` (`baseUnit: 4`); em-basierte Abstände im
Theme (`.67em`, `1.07em`, `1.71em`). Buttons mit großzügigem Innenabstand
(`13px 55px` large, `10px 35px` medium).

---

## 4. Beobachtete Komponenten

### Akkordeon-Abschnitte
Auf der Startseite klappbare Abschnitte „Was wir wollen und glauben“,
„Gottesdienste“, „Ansprechpartner“, „Mitgliedschaft“ (CSS `.c-accordion`,
Plugin-Datei `accordion-blocks.css`). Titel mit `+`-Indikator rechts (`content:"+"`,
Farbe `#777`), im offenen Zustand `−`. Fett gesetzt, schlichte Linien-Optik —
das zentrale Inhalts-Navigationselement der Home.

### Sidebar-Widget „Nächster Gottesdienst“
Custom-HTML-Widget mit `widget-title`, das einen **eingebetteten YouTube-Player**
enthält (Video-Card mit Play-Button, sichtbar in allen Desktop-Screenshots).
Begleitet von „Predigt vom …“ und „Weitere Predigten → auf YouTube ansehen“.

### Buttons
`.button`: Hintergrund Koralle `#F3595B`, weißer **uppercase, bold** Text, kein
sichtbarer Radius (`border-radius:0` im Theme; Design-Token nominell 3px), mit
markantem `inset 0 -3px 0 rgba(0,0,0,.33)`-Bottom-Shadow (flacher „gedrückter“
2015er-Look). Größen: `-medium` (`10px 35px`), `-large` (`13px 55px 14px`),
`-small` (`6px 25px`). `:active` invertiert den Shadow nach oben.

### Blockquote / Bibelvers
`blockquote`: linker Rahmen `5px solid #DDD`, **kursiv**, **uppercase**, Farbe
`#AAA`, Schriftgröße `1.28em`. `cite`/`small` mit Geviertstrich-Präfix (`— `).
Wird für Bibelverse / Zitate genutzt (z. B. Hero-Untertitel „Matthäus 11,28“).

### Spendenkonto-Box
Cremefarbenes (`#F6F3ED`) Band über volle Breite, drei Spalten:
**Kontoinhaber** (Adresse) · **Bankdaten** (IBAN/BIC, hier „BNP Paribas“) ·
**QR-Code**. Spaltentitel in gesperrten Versalien (letterspaced uppercase),
zentriert. Ruhiger, sachlicher „Info-Streifen“.

### QR-Code-Block
Teil des Spendenkonto-Bands: kleines schwarz-weißes QR-Bild mit Überschrift
„QR-CODE FÜR ÜBERWEISUNG PER BANKING-APP“. Funktional, ohne Styling-Rahmen.

### Weitere
- **Topbar Social-Icons** (`#AAA`, Hover farbig) im Footer/Topbar.
- **„Meine Tweets“**-Twitter-Widget im Footer (Embed, heute toter Dienst).
- **Seitenübersicht-Linkliste** im Footer (Begrüßungsseite, Über uns,
  Gottesdienste, Anfahrt, Geschichte, …).

---

## 5. Visueller Charakter & Modernisierungs-Chancen

### Charakter / Tonalität
**Traditionell, ruhig, würdevoll, text-lastig — eine klassische Gemeinde-Website
im Stil um 2015.** Das Aubergine-Violett wirkt kirchlich-feierlich (liturgische
Anmutung), die Creme-Flächen und die großzügige 2em-Zeilenhöhe vermitteln Ruhe und
Seriosität. Gleichzeitig fühlt es sich datiert an: 14px-Body ist zu klein, die
Koralle-Buttons mit Hard-Shadow sind ein erkennbarer 2015er-Flat-Trend, viele
`#DDD`-Linien und gesperrte Versalien wirken altbacken, Hero-Bild ohne Overlay-Typo,
Twitter-Widget tot, Layout fix auf 1260px. Optisch sehr „WordPress-Standard-Theme“.

### Modernisierungs-Chancen (Identität bewahren)

**Bewahren — die DNA:**
- **Lutherrose-Logo** unverändert übernehmen (Wiedererkennung, theologisches Symbol).
- **Aubergine `#480048`** als Leitfarbe behalten — sie *ist* die Marke.
- **Ruhiges, text-lesefreundliches, würdevolles Gefühl** als Leitprinzip.
- **Creme `#F6F3ED`** als warmer Sektions-Hintergrund weiterführen.

**Verbessern — behutsam:**
1. **Typografie skalieren:** Body von 14px → 17–18px, Zeilenhöhe von 2em auf ein
   ausgewogeneres ~1.6 reduzieren. Open Sans als verlässliche, gut lesbare Basis
   beibehalten; optional eine ruhige Serifenschrift (z. B. für Bibelverse/Headings)
   für mehr „kirchliche“ Wärme ergänzen — ohne den Charakter zu brechen.
2. **Aubergine-Palette ausbauen:** abgestufte Tints/Shades von `#480048` für Hover,
   Flächen und Akzente definieren (heute springt die Seite hart zwischen Aubergine
   und Koralle). Koralle dezenter und gezielter als reine CTA-Farbe einsetzen.
3. **Buttons modernisieren:** Hard-Bottom-Shadow entfernen, sanfter Radius (echte
   3px–6px), ruhige Hover-/Focus-States, klare Fokus-Ringe (Accessibility).
4. **Kontrast & A11y:** `#666`-Body und `#AAA`-Blockquote auf WCAG-AA prüfen;
   Linkfarbe konsistent machen (heute Theme-Koralle vs. Customizer-Aubergine —
   widersprüchlich). Akkordeon mit echten ARIA-Attributen.
5. **Hero aufwerten:** Altar-/Kerzenmotiv beibehalten, aber mit ruhigem
   Aubergine-Overlay + weißer Headline statt nacktem Bild; Bibelvers prominenter,
   weniger gedrängt.
6. **Layout-Luft & Responsiveness:** moderner fluider Container statt fixer 1260px,
   mehr Weißraum zwischen den text-lastigen Abschnitten, Mobile-Navigation
   überarbeiten. Die zwei `#DDD`-Linien sparsamer einsetzen.
7. **Tote Bausteine ersetzen:** „Meine Tweets“-Widget entfernen; das
   „Nächster Gottesdienst“-Video-Widget als eigenständige, gepflegte Komponente
   neu bauen (zentrales, wertvolles Feature der Seite).
8. **Spendenkonto/QR-Box** als saubere, klar gerahmte Karte mit Creme-Hintergrund
   neu aufsetzen — der Inhalt ist gut, nur die Darstellung wirkt wie ein Info-Streifen.

**Leitsatz für den Relaunch:** Gleiche Seele (Lutherrose, Aubergine, Ruhe,
Lesbarkeit, würdevoll), zeitgemäßes Handwerk (Typo-Skala, Spacing, A11y,
responsives Layout, gepflegte Komponenten).
