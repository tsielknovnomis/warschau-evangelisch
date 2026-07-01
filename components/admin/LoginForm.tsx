"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, {});
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">E-Mail</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">Passwort</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine"
        />
      </label>
      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[3px] bg-aubergine px-4 py-2.5 font-body font-semibold text-bg transition-colors hover:bg-aubergine-deep disabled:opacity-60"
      >
        {pending ? "Anmelden…" : "Anmelden"}
      </button>
    </form>
  );
}
