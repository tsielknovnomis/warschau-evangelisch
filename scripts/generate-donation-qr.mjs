// Generates the Polish bank-transfer QR (ZBP recommendation) for the donation
// card. Run after the board changes any bank detail:  node scripts/generate-donation-qr.mjs
import { writeFile } from "node:fs/promises";
import QRCode from "qrcode";

// Fields: NIP | country | account (NRB) | amount in grosze | recipient | title | reserved x3
const payload =
  "|PL|13160014621728828380000001|005000|Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie|Darowizna na cele kultu religijnego|||";

const svg = await QRCode.toString(payload, {
  type: "svg",
  errorCorrectionLevel: "L",
  margin: 2,
  color: { dark: "#2c2230", light: "#ffffff" },
});
await writeFile("public/images/spenden-qr.svg", svg, "utf8");
console.log("public/images/spenden-qr.svg written");
