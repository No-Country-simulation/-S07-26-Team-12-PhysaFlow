import { PAGE, MARGINS } from "./styles.js";

const FOOTER_RESERVE = 50;

export function ensureSpace(doc, requiredHeight) {
  const available = PAGE.height - MARGINS.bottom - doc.y;
  if (available < requiredHeight) {
    doc.addPage();
  }
}

export function contentBottom() {
  return PAGE.height - MARGINS.bottom - FOOTER_RESERVE;
}
