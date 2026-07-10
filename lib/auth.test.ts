import { describe, it, expect, beforeEach } from "vitest";
import { createSessionToken, verifySessionToken, verifyPassword } from "@/lib/auth";

beforeEach(() => {
  process.env.ADMIN_PASSWORD = "test-password-123";
});

describe("verifyPassword", () => {
  it("accepts the correct password", () => {
    expect(verifyPassword("test-password-123")).toBe(true);
  });
  it("rejects a wrong password", () => {
    expect(verifyPassword("wrong")).toBe(false);
  });
  it("rejects everything when no password is configured", () => {
    process.env.ADMIN_PASSWORD = "";
    expect(verifyPassword("")).toBe(false);
  });
});

describe("session tokens", () => {
  it("round-trips a freshly created token", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
  });
  it("rejects a tampered token", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(token.slice(0, -2) + "ff")).toBe(false);
  });
  it("rejects an expired token", async () => {
    const expired = String(Date.now() - 1000);
    // signature would be valid only for this exp — but expiry check comes first
    expect(await verifySessionToken(`${expired}.deadbeef`)).toBe(false);
  });
  it("rejects tokens signed with a different password", async () => {
    const token = await createSessionToken();
    process.env.ADMIN_PASSWORD = "rotated-password";
    expect(await verifySessionToken(token)).toBe(false);
  });
  it("rejects garbage", async () => {
    expect(await verifySessionToken(undefined)).toBe(false);
    expect(await verifySessionToken("")).toBe(false);
    expect(await verifySessionToken("no-dot")).toBe(false);
  });
});
