// Event templates for the admin panel — shared by the template dropdown on
// the Termine tab and the new-event form (prefill via ?vorlage=<key>).

export const DEFAULT_LOCATION = "ul. Miodowa 21, 2. Stock (Synodalsaal)";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Next Sunday (never today) at the given time, as a datetime-local value. */
export function nextSunday(hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() + (((7 - d.getDay()) % 7) || 7));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hour)}:${pad(minute)}`;
}

/** December 24 of the current (or next, if past) year at 16:00. */
export function nextChristmasEve(): string {
  const now = new Date();
  const year =
    now > new Date(now.getFullYear(), 11, 24, 16) ? now.getFullYear() + 1 : now.getFullYear();
  return `${year}-12-24T16:00`;
}

export type EventTemplate = {
  key: string;
  label: string;
  title: string;
  startsAt: () => string;
  description: string;
  isSpecial: boolean;
  cancelled?: boolean;
  cancelNote?: string;
};

export const EVENT_TEMPLATES: EventTemplate[] = [
  {
    key: "gottesdienst",
    label: "Gottesdienst",
    title: "Gottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "",
    isSpecial: false,
  },
  {
    key: "gemeindekaffee",
    label: "Gottesdienst mit Gemeindekaffee",
    title: "Gottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "Im Anschluss laden wir herzlich zum Gemeindekaffee ein.",
    isSpecial: false,
  },
  {
    key: "familiengottesdienst",
    label: "Familiengottesdienst",
    title: "Familiengottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "Familiengottesdienst — Kinder sind besonders willkommen.",
    isSpecial: true,
  },
  {
    key: "ausfall",
    label: "Ausfall (Gottesdienst entfällt)",
    title: "Gottesdienst entfällt",
    startsAt: () => nextSunday(9, 30),
    description: "",
    isSpecial: false,
    cancelled: true,
    cancelNote:
      "Wir laden herzlich ein, den polnischen Gottesdienst in der Dreifaltigkeitskirche (Kościół Świętej Trójcy, pl. Małachowskiego) mitzufeiern.",
  },
  {
    key: "christvesper",
    label: "Christvesper",
    title: "Christvesper mit Krippenspiel",
    startsAt: nextChristmasEve,
    description: "Heiligabend — mit dem Krippenspiel der Kinder.",
    isSpecial: true,
  },
];

export function getTemplate(key: string | undefined): EventTemplate | undefined {
  return EVENT_TEMPLATES.find((t) => t.key === key);
}
