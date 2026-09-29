// The parish lives in Warsaw; all displayed/entered times are Europe/Warsaw
// wall-clock times, stored as UTC in the database.

const TZ = "Europe/Warsaw";

/** "YYYY-MM-DDTHH:mm" (Warsaw wall time from a datetime-local input) → UTC ISO. */
export function warsawLocalToIso(local: string): string {
  const [datePart, timePart] = local.split("T");
  const [y, mo, da] = datePart.split("-").map(Number);
  const [h, mi] = (timePart ?? "00:00").split(":").map(Number);
  const utcGuess = Date.UTC(y, mo - 1, da, h, mi);
  // offset between UTC and Warsaw at that instant
  const warsawAsIfUtc = new Date(
    new Date(utcGuess).toLocaleString("en-US", { timeZone: TZ }),
  ).getTime();
  const offset = warsawAsIfUtc - utcGuess;
  return new Date(utcGuess - offset).toISOString();
}

/** UTC ISO → "YYYY-MM-DDTHH:mm" (Warsaw wall time) for a datetime-local input. */
export function isoToWarsawLocal(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Warsaw calendar day of an instant, as "YYYY-MM-DD" (sortable string). */
export function warsawDay(ms: number): string {
  return dayFmt.format(new Date(ms));
}

/** Warsaw calendar month (1–12) of an instant. */
export function warsawMonth(ms: number): number {
  return Number(warsawDay(ms).slice(5, 7));
}
