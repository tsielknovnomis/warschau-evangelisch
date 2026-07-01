import { getSettings } from "@/lib/data/settings";
import { getNextEvent } from "@/lib/data/events";
import { autoBarParts } from "@/lib/announcement";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function Page() {
  const [settings, nextEvent] = await Promise.all([getSettings(), getNextEvent()]);
  // Same "on break" rule as the public layout: next service > ~3 weeks out.
  const onBreak = nextEvent
    ? (new Date(nextEvent.startsAt).getTime() - Date.now()) / 86_400_000 > 20
    : false;
  const autoParts = autoBarParts(nextEvent, onBreak);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-aubergine">Info-Leiste</h1>
      <p className="mt-1 text-sm text-muted">Die schmale Leiste ganz oben über der Navigation.</p>
      <div className="mt-6">
        <SettingsForm settings={settings} autoParts={autoParts} />
      </div>
    </div>
  );
}
