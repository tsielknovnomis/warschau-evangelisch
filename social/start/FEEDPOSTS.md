# Die 10 Feedposts

Format 1080 × 1350 (4:5). Ein Feedpost alle 2 Wochen, montags 18:00 (Tag laut `PLAN.md`).
**Jeder Post bekommt ein eigenes, echtes Foto vom Drehtag** — kein Foto wiederholt sich.
**Captions** (Instagram + Facebook, fertig zum Kopieren): `CAPTIONS.md`.

**Ein Look, wechselnde Layouts** — gleiche Farben, Schriften, Lutherrose und Fußzeile, aber nie zwei gleiche Layouts nacheinander.

| # | Tag | Thema | Layout | Foto (Dreh-Briefing, Teil F) |
|---|---|---|---|---|
| 1 | 0 | Schön, dass du hier bist | Vollbild, Text auf dem Foto | F1 — Saal mit Menschen, von hinten |
| 2 | 14 | Neu in Warschau? | Fotoband oben | F11 — Straßenszene in der Nähe |
| 3 | 28 | WhatsApp-Gruppe | dunkel mit Foto-Fenster + QR | F5 — Hand mit Handy im Saal |
| 4 | 42 | Unser Pfarrer | rundes Porträt | F3 — Porträt Pfarrer Bujok |
| 5 | 56 | Wort für die Woche | Foto in der Mitte + Bibelvers | F9 — Altar mit brennenden Kerzen |
| 6 | 70 | Wusstest du? | Foto-Spalte links | F6 — Fassade Miodowa 21 |
| 7 | 84 | Danke für diesen Sonntag | Bilderrahmen | F2 — Kaffeetisch mit Menschen |
| 8 | 98 | Luther-Zitat | Foto-Spalte rechts | F7 — offene Bibel |
| 9 | 112 | Mitten in Warschau | Vollbild, nur Logo | F10 — Dreifaltigkeitskirche *(optional)* |
| 10 | 126 | Jeden 2. und 4. Sonntag | Fotoband oben | F8 — Eingangstür mit Schild |

**Ersatz, falls ein Foto fehlt:** Post 2 → vorhandenes Warschau-Panorama · Post 5 → vorhandenes Altarfoto · Post 9 → vorhandenes Foto der Dreifaltigkeitskirche.

## Technik (Claude)

- Vorlage: `templates/foto-post.html?post=<Nr>` — Texte und Layouts stehen dort im Block `POSTS`.
- Fotos vom Drehtag als `templates/fotos/F1.jpg` … `F11.jpg` ablegen, dann neu rendern (Befehl im `STYLEGUIDE.md`).
- Vorschau mit Platzhaltern: `posts/vorschau/post-01.png` … `post-10.png`.

**Festtags-Joker:** Liegt ein Post-Tag in den 2 Wochen vor Advent, Weihnachten oder Ostern, diesen Post durch einen Festtagsgruß aus `templates/feiertag.html` ersetzen (Text dann anpassen) und den ausgelassenen Post ans Ende schieben.
