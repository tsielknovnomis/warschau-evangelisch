// QR for the WhatsApp group invite (scan with the phone camera to join).
// Re-run after the invite link changes:  node scripts/generate-whatsapp-qr.mjs
import { writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const inviteLink = "https://chat.whatsapp.com/DNeiA39J18v9kVa5ShSQM8";

const svg = await QRCode.toString(inviteLink, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#2c2230", light: "#ffffff" },
});
await writeFile("public/images/whatsapp-qr.svg", svg, "utf8");
console.log("public/images/whatsapp-qr.svg written");
