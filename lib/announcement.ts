import type { ChurchEvent } from "@/lib/types";

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
  timeZone: "Europe/Warsaw",
});
const timeFmt = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Warsaw",
});

export type BarParts = { label: string; text: string };

/**
 * The automatic announcement-bar content derived from the next service.
 * Single source of truth for the public bar AND the admin preview.
 */
export function autoBarParts(event: ChurchEvent | null, onBreak: boolean): BarParts | null {
  if (!event) return null;
  const start = new Date(event.startsAt);
  const date = dateFmt.format(start);
  const time = timeFmt.format(start);
  return onBreak
    ? {
        label: "Sommerpause ☀",
        text: `Der nächste Gottesdienst ist am ${date}, ${time} Uhr. Du bist herzlich eingeladen!`,
      }
    : { label: "Herzlich eingeladen", text: `Gottesdienst am ${date}, ${time} Uhr` };
}
