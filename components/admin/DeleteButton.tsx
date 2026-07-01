"use client";

/**
 * Delete via a bound server action, with a confirm() guard.
 */
export function DeleteButton({
  action,
  confirmText = "Wirklich löschen? Das kann nicht rückgängig gemacht werden.",
}: {
  action: () => void;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
        Löschen
      </button>
    </form>
  );
}
