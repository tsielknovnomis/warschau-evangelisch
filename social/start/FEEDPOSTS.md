# Die 10 Start-Feedposts

Format 1080 × 1350 (4:5), alle im Gemeinde-Look. Ein Feedpost alle 2 Wochen, montags 18:00 (Tag laut `PLAN.md`).
Fertige Bilder liegen in `social/posts/`; Vorlagen in `social/templates/`.
Jede Caption endet mit dem **Caption-Abschluss** (siehe `REELS.md`) und den Hashtags.

**Caption-Abschluss (Kurzform):**
> ⛪ Gottesdienst jeden 2. und 4. Sonntag, 09:30 Uhr · ul. Miodowa 21 (2. Stock, Eingang über ul. Leona Schillera)
> 💬 Ob er stattfindet und was sonst ansteht, erfährst du zuerst in unserer WhatsApp-Gruppe → Link in der Bio

Fast jeder Post hat ein **echtes Foto**. Drei Posts nutzen schon vorhandene Fotos, sieben bekommen ihr Foto vom Drehtag.
**Ein Look, wechselnde Layouts** (nie zwei gleiche nacheinander): 1 Vollbild · 2 Fotoband oben · 3 dunkel mit Foto-Fenster · 4 rundes Porträt · 5 Foto + Bibelvers · 6 Foto-Spalte links · 7 Bilderrahmen · 8 Foto-Spalte rechts · 9 Vollbild · 10 Fotoband oben.
Vorlage für die Foto-Posts: `templates/foto-post.html?post=<Nr>`. Fotos vom Drehtag als `templates/fotos/F1.jpg` … `F8.jpg` ablegen, dann neu rendern.

| # | Tag | Foto | Status |
|---|---|---|---|
| 1 | 0 | F1 — Saal mit Menschen, von hinten | ⏳ Foto vom Drehtag |
| 2 | 14 | Warschau-Panorama (vorhanden) | ✅ fertig |
| 3 | 28 | F5 — Hand mit Handy im Saal | ⏳ Foto vom Drehtag |
| 4 | 42 | F3 — Porträt Pfarrer Bujok | ⏳ Foto vom Drehtag |
| 5 | 56 | Altar mit Kreuz und Bibel (vorhanden) | ✅ fertig |
| 6 | 70 | F6 — Fassade Miodowa 21 | ⏳ Foto vom Drehtag |
| 7 | 84 | F2 — Kaffeetisch mit Menschen | ⏳ Foto vom Drehtag |
| 8 | 98 | F7 — offene Bibel | ⏳ Foto vom Drehtag |
| 9 | 112 | Dreifaltigkeitskirche (vorhanden) | ✅ fertig |
| 10 | 126 | F8 — Eingangstür mit Schild | ⏳ Foto vom Drehtag |

---|---|---|---|
| 1 | 0 | `posts/02-vorstellung.png` | ✅ fertig |
| 2 | 14 | `posts/08-neu-in-warschau.png` | ✅ fertig |
| 3 | 28 | `posts/18-whatsapp.png` | ✅ fertig |
| 4 | 42 | aus `templates/person.html` + Foto F3 | ⏳ nach dem Drehtag |
| 5 | 56 | `posts/07-vers-altar.png` | ✅ fertig |
| 6 | 70 | `posts/12-wusstest-du.png` | ✅ fertig |
| 7 | 84 | aus `templates/rueckblick.html` + Foto F2 | ⏳ nach dem Drehtag |
| 8 | 98 | `posts/11-zitat-luther.png` | ✅ fertig |
| 9 | 112 | `posts/06-kirche-bild.png` | ✅ fertig |
| 10 | 126 | `posts/19-rhythmus.png` | ✅ fertig |

---

## 1 — Schön, dass du hier bist
*Auf Facebook nach dem Posten **oben anpinnen** (… → „Beitrag fixieren").*
> Schön, dass du hier bist! 🕊️
> Wir sind die deutschsprachige evangelisch-lutherische Gemeinde in Warschau — ein offenes Haus für alle, die hier Gottesdienst auf Deutsch feiern und Gemeinschaft finden möchten.
> Ob du seit Jahren in Warschau lebst oder gerade erst angekommen bist: Du musst niemanden kennen, um dazuzugehören.

## 2 — Neu in Warschau?
> Neu in Warschau? Du bist nicht allein. 🌍
> Neue Stadt, neue Sprache, alles fremd — bei uns triffst du Menschen, die genau das kennen. Wir feiern Gottesdienst auf Deutsch, trinken danach zusammen Kaffee und helfen einander beim Ankommen.
> Komm einfach vorbei — du musst niemanden kennen, um dazuzugehören.

## 3 — So erfährst du, wann wir uns treffen
> Wann ist der nächste Gottesdienst? 💬
> In unserer WhatsApp-Gruppe erfährst du es immer zuerst — dazu Änderungen, Einladungen und kleine Momente aus dem Gemeindeleben. Einfach beitreten, mitlesen, dabei sein.

## 4 — Wir stellen vor: unser Pfarrer *(nach dem Drehtag)*
Bild: `templates/person.html` mit Foto F3 · Name „Adam Bujok" · Aufgabe „Pfarrer" · Zitat = ein Satz aus seiner Interview-Antwort (Reel 4), **wörtlich und mit seinem Okay**.
> Darf ich vorstellen: Adam Bujok, unser Pfarrer. 🙌
> [Ein Satz aus dem Interview, wörtlich.]
> Am Sonntag kannst du ihn persönlich kennenlernen.

## 5 — Wort für die Woche
> „Denn wo zwei oder drei versammelt sind in meinem Namen, da bin ich mitten unter ihnen." — Matthäus 18,20
> Genau darum geht es bei uns: zusammenkommen, hören, singen, beten — und danach bei Kaffee einfach Mensch sein. Du bist herzlich eingeladen. 🕊️

## 6 — Wusstest du?
> Wusstest du? Deutschsprachige evangelische Gottesdienste gibt es in Warschau schon seit den 1980er Jahren. 2011 wurde unsere Gemeinde neu gegründet, seit 2015 sind wir ein eingetragener Verein — unter dem Dach der Evangelisch-Augsburgischen Kirche in Polen.
> Mehr über unsere Geschichte: warschau-evangelisch.de/geschichte

## 7 — Danke für diesen Sonntag *(nach dem Drehtag)*
Bild: `templates/rueckblick.html` mit Foto F2 (Kaffeetisch).
> Danke für diesen Sonntag! 🕊️
> Vertraute Lieder, ein gutes Wort und danach lange Gespräche beim Kaffee. Schön, dass ihr da wart — und schön, wenn du nächstes Mal dazukommst.

## 8 — Zum Nachdenken: Martin Luther
> „Ein Christenmensch ist ein freier Herr über alle Dinge und niemand untertan. Ein Christenmensch ist ein dienstbarer Knecht aller Dinge und jedermann untertan." — Martin Luther, 1520
> Frei — und gerade deshalb für andere da. Zwei Sätze, die scheinbar nicht zusammenpassen, und doch das Herz evangelischen Glaubens beschreiben. Was denkst du darüber?

## 9 — Mitten in Warschau
> Mitten in Warschau steht die evangelische Dreifaltigkeitskirche (Kościół Świętej Trójcy) am pl. Małachowskiego — eines der Wahrzeichen der Evangelisch-Augsburgischen Kirche in Polen, zu der auch wir gehören. ⛪
> Unsere deutschsprachigen Gottesdienste feiern wir im Lutherischen Zentrum in der ul. Miodowa 21.

## 10 — Jeden 2. und 4. Sonntag
> Gottesdienst auf Deutsch — jeden 2. und 4. Sonntag um 09:30 Uhr. 🕘
> Im Lutherischen Zentrum, ul. Miodowa 21, 2. Stock (Eingang über die ul. Leona Schillera). Danach gibt es Kaffee und Gespräche. Komm einfach vorbei, so wie du bist.

---

**Hashtags Instagram:** `#Warschau #Warszawa #DeutscheInPolen #evangelisch #GottesdienstAufDeutsch #NeuInWarschau #Kirche`
**Hashtags Facebook:** `#Warschau #DeutscheInPolen #evangelisch`

**Festtags-Joker:** Liegt ein Post-Tag in den 2 Wochen vor Advent, Weihnachten oder Ostern, diesen Post durch einen Festtagsgruß aus `templates/feiertag.html` ersetzen (Text dann mit Moritz/Claude anpassen) und den ausgelassenen Post ans Ende schieben.
