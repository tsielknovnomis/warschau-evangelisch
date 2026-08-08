# Social-Media-Styleguide — Warschau-Evangelisch

Damit jeder Post aussieht wie aus einem Guss — egal ob aus den HTML-Vorlagen
(`social/templates/`) oder selbst in Canva gebaut.

## Farben (exakt diese Hex-Werte)

| Rolle | Hex | Verwendung |
|---|---|---|
| Pergament (Grund) | `#faf8f3` | Standard-Hintergrund jeder Kachel |
| Pergament dunkel | `#f1ece1` | Alternativ-Hintergrund (z. B. Vers-Karten) |
| **Aubergine** | `#480048` | Überschriften, Markenfarbe, Datums-Kachel |
| Aubergine tief | `#36013a` | dunkle Flächen (sparsam!) |
| Gold | `#a3854f` | Linien, Zierbalken |
| Gold (Text) | `#8a6d34` | Kicker-Zeilen, Akzente in Überschriften |
| Tinte | `#2c2230` | Fließtext |
| Grau | `#6d616a` | Nebeninfos, Quellenangaben |

## Schriften (beide kostenlos in Canva verfügbar!)

- **Fraunces** — Überschriften & Zitate. Medium (500). Akzentwörter *kursiv in Gold* (`#8a6d34`).
- **Spectral** — Fließtext (Regular/Medium) und Kicker (Semibold, **Großbuchstaben, gesperrt** ~ +200 Zeichenabstand).

## Aufbau jeder Kachel (1080 × 1350 px, Hochformat 4:5)

1. **Rand:** ~84 px auf allen Seiten freihalten
2. **Kopf:** kleine Lutherrose (56 px) + Kicker in Gold-Großbuchstaben (z. B. HERZLICHE EINLADUNG)
3. **Mitte:** eine große Fraunces-Überschrift — letztes/wichtigstes Wort kursiv in Gold. Wenig Text!
4. **Fuß:** dünne Linie (`#e5dccd`), darunter links **warschau-evangelisch.de** (Fraunces, Aubergine), rechts *@warschau.evangelisch* (grau)

## Feed-Regeln

- **Grundstimmung hell** (Pergament). Dunkle Aubergine-Kacheln nur als seltener Akzent.
- Lutherrose groß & blass (8–10 % Deckkraft) als Hintergrund-Ornament — angeschnitten am Rand wirkt am besten.
- Zitate: **rechtsbündig mit Gold-Balken rechts** (wie auf der Website), Quelle klein in Grau.
- Fotos: warm und natürlich, keine Filter-Experimente; Foto-Kacheln nach Vorlage `foto.html` (Foto oben ~60 %, Goldlinie, Textfeld unten).
- Emojis sparsam: 🕘 📍 🕊️ für Termindetails sind okay, sonst zurückhaltend.

## Text-Regeln

- **Du-Form**, warm und einladend („Komm einfach vorbei — so wie du bist.")
- Kurze Captions: 2–4 Sätze + CTA (WhatsApp-Gruppe oder Gottesdienst) + Hashtags
- Standard-Hashtags: `#Warschau #Warszawa #DeutscheInPolen #evangelisch #Kirche #GottesdienstAufDeutsch #Expats #NeuInWarschau`

## Neue Posts aus den HTML-Vorlagen erzeugen (Moritz)

1. Vorlage in `social/templates/` kopieren/anpassen (Texte im HTML ändern)
2. Im Ordner `python3 -m http.server 8321` starten, Seite im Browser bei Fenstergröße 1080×1350 öffnen
3. Screenshot → fertige Kachel nach `social/posts/`

Vorlagen: `launch.html` (Ankündigung) · `vorstellung.html` (Statement) · `termin.html` (Gottesdienst-Termin) · `vers.html` (Bibelvers) · `foto.html` (Foto + Titel)

## Foto-Layouts (drei Varianten)

1. **`foto-voll.html` — „Nur Bild":** Foto füllt die ganze Kachel. Oben links heller Chip
   (Lutherrose + EVANGELISCH IN WARSCHAU), unten dunkler Verlauf mit Website + Handle.
   Am besten mit Hochformat-Fotos (z. B. `trinity-exterior`). In Canva: Foto vollflächig,
   darüber Chip + Verlauf aus der Vorlage nachbauen.
2. **`vers-foto.html` — Vers + Fotoband:** Kicker oben, Foto als volles Querband
   (goldene Ränder oben/unten, ~470 px hoch), darunter das Zitat rechtsbündig mit Goldbalken.
3. **`foto.html` / `neu-in-warschau.html` — Foto oben + Text unten:** Foto als Band oben
   (~560 px, goldene Linie unten), darunter Kicker, Überschrift, Fließtext, Fußzeile.

**Personen auf Fotos:** nur posten, wenn niemand erkennbar ist oder Einwilligungen vorliegen
(bei Kindern: Eltern). Details in `posts/CAPTIONS.md`.
