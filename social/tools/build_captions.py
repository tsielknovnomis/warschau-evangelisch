"""Build social/start/CAPTIONS.md: ready-to-paste captions (Instagram + Facebook) for all posts and reels.
Single source of truth for caption texts — edit CAPTIONS below, then run: python3 social/tools/build_captions.py"""
from pathlib import Path

WHATSAPP = "https://chat.whatsapp.com/DNeiA39J18v9kVa5ShSQM8"
SERVICE = "⛪ Gottesdienst jeden 2. und 4. Sonntag, 09:30 Uhr · ul. Miodowa 21 (2. Stock, Eingang über ul. Leona Schillera)"
TAGS_IG = "#Warschau #Warszawa #DeutscheInPolen #evangelisch #GottesdienstAufDeutsch #NeuInWarschau #Kirche"
TAGS_FB = "#Warschau #DeutscheInPolen #evangelisch"

# (key, title, schedule, text, show_whatsapp_line)
POSTS = [
    ("Post 1", "Schön, dass du hier bist", "Tag 0 · Facebook: oben anpinnen",
     "Schön, dass du hier bist! 🕊️\nWir sind die deutschsprachige evangelisch-lutherische Gemeinde in Warschau — ein offenes Haus für alle, die hier Gottesdienst auf Deutsch feiern und Gemeinschaft finden möchten.\nOb du seit Jahren in Warschau lebst oder gerade erst angekommen bist: Du musst niemanden kennen, um dazuzugehören.", True),
    ("Post 2", "Neu in Warschau?", "Tag 14",
     "Neu in Warschau? Du bist nicht allein. 🌍\nNeue Stadt, neue Sprache, alles fremd — bei uns triffst du Menschen, die genau das kennen. Wir feiern Gottesdienst auf Deutsch, trinken danach zusammen Kaffee und helfen einander beim Ankommen.\nKomm einfach vorbei — du musst niemanden kennen, um dazuzugehören.", True),
    ("Post 3", "WhatsApp-Gruppe", "Tag 28",
     "Wann ist der nächste Gottesdienst? 💬\nIn unserer WhatsApp-Gruppe erfährst du es immer zuerst — dazu Änderungen, Einladungen und kleine Momente aus dem Gemeindeleben. Einfach beitreten, mitlesen, dabei sein.", False),
    ("Post 4", "Unser Pfarrer", "Tag 42 · ⚠️ Satz aus dem Interview einsetzen",
     "Darf ich vorstellen: Adam Bujok, unser Pfarrer. 🙌\n„[Ein Satz aus seinem Interview — wörtlich, mit seinem Okay.]“\nAm Sonntag kannst du ihn persönlich kennenlernen.", True),
    ("Post 5", "Wort für die Woche", "Tag 56",
     "„Denn wo zwei oder drei versammelt sind in meinem Namen, da bin ich mitten unter ihnen.“ — Matthäus 18,20\nGenau darum geht es bei uns: zusammenkommen, hören, singen, beten — und danach bei Kaffee einfach Mensch sein. Du bist herzlich eingeladen. 🕊️", True),
    ("Post 6", "Wusstest du?", "Tag 70",
     "Wusstest du? Deutschsprachige evangelische Gottesdienste gibt es in Warschau schon seit den 1980er Jahren. 📜\n2011 wurde unsere Gemeinde neu gegründet, seit 2015 sind wir ein eingetragener Verein — unter dem Dach der Evangelisch-Augsburgischen Kirche in Polen.\nMehr über unsere Geschichte: warschau-evangelisch.de/geschichte", True),
    ("Post 7", "Danke für diesen Sonntag", "Tag 84",
     "Danke für diesen Sonntag! 🕊️\nVertraute Lieder, ein gutes Wort und danach lange Gespräche beim Kaffee. Schön, dass ihr da wart — und schön, wenn du nächstes Mal dazukommst.", True),
    ("Post 8", "Luther-Zitat", "Tag 98",
     "„Ein Christenmensch ist ein freier Herr über alle Dinge und niemand untertan. Ein Christenmensch ist ein dienstbarer Knecht aller Dinge und jedermann untertan.“ — Martin Luther, 1520\nFrei — und gerade deshalb für andere da. Zwei Sätze, die scheinbar nicht zusammenpassen, und doch das Herz evangelischen Glaubens beschreiben. Was denkst du darüber?", True),
    ("Post 9", "Mitten in Warschau", "Tag 112",
     "Mitten in Warschau steht die evangelische Dreifaltigkeitskirche (Kościół Świętej Trójcy) am pl. Małachowskiego — eines der Wahrzeichen der Evangelisch-Augsburgischen Kirche in Polen, zu der auch wir gehören. ⛪\nUnsere deutschsprachigen Gottesdienste feiern wir im Lutherischen Zentrum in der ul. Miodowa 21.", True),
    ("Post 10", "Jeden 2. und 4. Sonntag", "Tag 126",
     "Gottesdienst auf Deutsch — jeden 2. und 4. Sonntag um 09:30 Uhr. 🕘\nIm Lutherischen Zentrum, ul. Miodowa 21, 2. Stock. Den Eingang findest du auf der Rückseite, über die ul. Leona Schillera. Danach gibt es Kaffee und Gespräche. Komm einfach vorbei, so wie du bist.", True),
]

REELS = [
    ("Reel 1", "Wir sind da", "Tag 3",
     "Wusstest du, dass es mitten in Warschau Gottesdienst auf Deutsch gibt? 🕊️\nWir sind eine kleine, offene evangelische Gemeinde — und freuen uns über jedes neue Gesicht.", True),
    ("Reel 2", "Der Weg zu uns", "Tag 10",
     "So findest du zu uns 📍\nDer Eingang zum Lutherischen Zentrum liegt auf der Rückseite — über die ul. Leona Schillera. Dann in den 2. Stock, in den Synodalsaal.\nSpeicher dir das Video für deinen ersten Besuch. Karte und Anfahrt: warschau-evangelisch.de/anfahrt", True),
    ("Reel 3", "Dein erster Gottesdienst", "Tag 17",
     "Dein erster Gottesdienst bei uns — so läuft er ab. 🕊️\nKeine Anmeldung, kein Dresscode, kein Vorwissen nötig. Komm einfach, so wie du bist.", True),
    ("Reel 4", "Unser Pfarrer", "Tag 24",
     "Darf ich vorstellen: Adam Bujok, unser Pfarrer. 🙌\nDrei Fragen, drei ehrliche Antworten. Und am Sonntag kannst du ihn persönlich kennenlernen.", True),
    ("Reel 5", "Das Beste kommt danach", "Tag 31",
     "Das Beste kommt danach. ☕\nNach jedem Gottesdienst bleiben wir noch zusammen — bei Kaffee und guten Gesprächen. Gerade wenn du neu in Warschau bist: Hier findest du Anschluss.", True),
    ("Reel 6", "Was die Lutherrose bedeutet", "Tag 38",
     "Kreuz, Herz, Rose, Himmel, Ring — was die Lutherrose bedeutet. 🌹\nMartin Luther hat sein Siegel 1530 selbst erklärt. Bis heute ist es das Zeichen evangelisch-lutherischer Kirchen — und unser Logo.", True),
    ("Reel 7", "Ein Satz aus der Predigt", "Tag 45",
     "Ein Gedanke zum Mitnehmen — aus unserer Predigt. 🕊️\nWenn du mehr hören willst: Bei uns wird in jedem Gottesdienst auf Deutsch gepredigt.", True),
    ("Reel 8", "Warum ich herkomme", "Tag 52",
     "Warum kommst du hierher? Drei Antworten aus unserer Gemeinde. 💛\nUnd was wäre deine? Vielleicht findest du sie am Sonntag.", True),
    ("Reel 9", "Unser Vorstand", "Tag 59",
     "Das ist unser Vorstand: Jürgen, Jens und Simon. 👋\nSie kümmern sich darum, dass bei uns Gottesdienst, Gemeinschaft und vieles mehr möglich sind. Sprich sie am Sonntag gern an.", True),
    ("Reel 10", "Muss ich glauben, um zu kommen?", "Tag 66",
     "Muss ich glauben, um zu kommen? Nein. 🕊️\nFragen, Zweifel und Neugier sind bei uns willkommen. Du musst niemanden kennen und nichts mitbringen.", True),
    ("Reel 11", "Sonntagmorgen in 20 Sekunden", "Tag 73",
     "Ein Sonntagmorgen bei uns — in 20 Sekunden. 🕊️\nKerzen, Lieder, Kaffee und Menschen, die sich freuen, dass du da bist.", True),
    ("Reel 12", "Bevor du kommst", "Tag 80",
     "Bevor du kommst … ☕\nStühle, Kerzen, Kaffee: An jedem Gottesdienst-Sonntag bereiten Menschen aus unserer Gemeinde alles vor — damit du einfach ankommen kannst. Danke an alle, die mit anpacken! 💛", True),
    ("Reel 13", "Ein Wort, das dir in Warschau hilft", "Tag 87",
     "Dziękuję — das Wort, das du in Warschau jeden Tag brauchst. 🇵🇱\nUnd das wir sonntags auf Deutsch sagen: Danke für diese Woche, danke für die Menschen um uns, danke, Gott.\nWelches polnische Wort hat dir am Anfang am meisten geholfen?", True),
    ("Reel 14", "Advent bei uns", "Joker: nur im Advent",
     "Advent bei uns. 🕯️\nKerzen, vertraute Lieder und die Vorfreude auf Weihnachten — feier die Adventszeit mit uns auf Deutsch, mitten in Warschau. Bring gern jemanden mit!", True),
]


def caption(text: str, whatsapp_line: bool, fb: bool) -> str:
    link = WHATSAPP if fb else "Link im Profil"
    end = [SERVICE]
    if whatsapp_line:
        end.append(f"💬 Ob er stattfindet und was sonst ansteht, erfährst du zuerst in unserer WhatsApp-Gruppe → {link}")
    else:
        end.append(f"👉 Zur WhatsApp-Gruppe: {link}")
    return f"{text}\n\n" + "\n".join(end) + f"\n\n{TAGS_FB if fb else TAGS_IG}"


def section(items) -> list[str]:
    out = []
    for key, title, when, text, wa in items:
        out += [f"## {key} — {title}", f"*{when}*", "", "**Instagram:**", "```",
                caption(text, wa, fb=False), "```", "", "**Facebook:**", "```",
                caption(text, wa, fb=True), "```", "", "---", ""]
    return out


lines = ["# Captions — fertig zum Kopieren", "",
         "Für jeden Post und jedes Reel: eine Fassung für **Instagram** und eine für **Facebook**.",
         "In der Meta Business Suite: **„Für jede Plattform anpassen“** wählen und die passende Fassung einfügen.",
         "", "# Feedposts", ""] + section(POSTS) + ["# Reels", ""] + section(REELS)
Path(__file__).resolve().parent.parent.joinpath("start", "CAPTIONS.md").write_text("\n".join(lines), encoding="utf-8")
print("CAPTIONS.md:", len(POSTS), "posts,", len(REELS), "reels")
