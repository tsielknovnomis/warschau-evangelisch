/**
 * Spam protection for email addresses (board request, Nov 2026):
 * addresses are only ever shown as "info [klammeraffe] warschau [minus] evangelisch [punkt] de".
 * The plain address never appears in the HTML or the JS bundle; the click handler
 * reassembles it in the browser.
 */
const RULES: [plain: string, word: string][] = [
  ["@", "klammeraffe"],
  ["-", "minus"],
  [".", "punkt"],
];

export function obfuscateEmail(address: string): string {
  return [...address.trim()]
    .map((ch) => {
      const rule = RULES.find(([plain]) => plain === ch);
      return rule ? ` [${rule[1]}] ` : ch;
    })
    .join("");
}

export function deobfuscateEmail(obfuscated: string): string {
  return RULES.reduce(
    (s, [plain, word]) => s.replaceAll(new RegExp(`\\s*\\[${word}\\]\\s*`, "g"), plain),
    obfuscated.trim(),
  );
}
