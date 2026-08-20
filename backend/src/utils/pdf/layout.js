import { COLORS, FONTS, MARGINS, PAGE } from "./styles.js";

export function drawBackground(doc) {
  doc.rect(0, 0, PAGE.width, PAGE.height).fill(COLORS.bg);
}

export function drawFooterToPage(doc, pageNum, totalPages, calculationId) {
  const y = PAGE.height - 35;

  doc
    .rect(0, y - 10, PAGE.width, 45)
    .fill(COLORS.green.dark);

  doc
    .font(FONTS.regular)
    .fontSize(8)
    .fillColor(COLORS.green.pale)
    .text("PhysaFlow Report", MARGINS.left, y, { continued: true, lineBreak: false })
    .text(`  |  Calculation: ${calculationId ? String(calculationId).slice(0, 8) : "N/A"}`, { continued: true, lineBreak: false })
    .text(`  |  Page ${pageNum} of ${totalPages}`, { continued: false, lineBreak: false })
    .text(
      `Generated: ${new Date().toLocaleDateString("en-US")}`,
      MARGINS.left,
      y + 12,
      { lineBreak: false },
    );
}

export function drawTitle(doc, title, subtitle) {
  doc
    .font(FONTS.bold)
    .fontSize(22)
    .fillColor(COLORS.green.dark)
    .text(title, MARGINS.left, MARGINS.top + 20, {
      width: PAGE.contentWidth,
      lineBreak: false,
    });

  if (subtitle) {
    doc
      .font(FONTS.regular)
      .fontSize(11)
      .fillColor(COLORS.gray.medium)
      .text(subtitle, MARGINS.left, doc.y + 5, {
        width: PAGE.contentWidth,
        lineBreak: false,
      });
  }

  doc.moveDown(0.5);

  doc
    .moveTo(MARGINS.left, doc.y)
    .lineTo(MARGINS.left + 80, doc.y)
    .lineWidth(3)
    .strokeColor(COLORS.gold.main)
    .stroke();

  doc.moveDown(0.8);
}

export function drawSectionTitle(doc, title) {
  doc.moveDown(0.5);

  doc
    .font(FONTS.bold)
    .fontSize(15)
    .fillColor(COLORS.green.dark)
    .text(title, MARGINS.left, doc.y, {
      width: PAGE.contentWidth,
      lineBreak: false,
    });

  doc.moveDown(0.3);

  doc
    .moveTo(MARGINS.left, doc.y)
    .lineTo(MARGINS.left + PAGE.contentWidth, doc.y)
    .lineWidth(0.5)
    .strokeColor(COLORS.green.light)
    .stroke();

  doc.moveDown(0.4);
}

export function drawMetricCard(doc, x, y, w, h, label, value, color, subvalue) {
  doc.roundedRect(x, y, w, h, 4).fill(color || COLORS.white);

  doc.rect(x, y, w, 4).fill(COLORS.green.medium);

  if (subvalue) {
    doc
      .font(FONTS.bold)
      .fontSize(14)
      .fillColor(COLORS.green.dark)
      .text(value, x + 10, y + 10, {
        width: w - 20,
        align: "center",
        lineBreak: false,
      });

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(COLORS.gray.medium)
      .text(subvalue, x + 10, y + 26, {
        width: w - 20,
        align: "center",
        lineBreak: false,
      });

    doc
      .font(FONTS.regular)
      .fontSize(7)
      .fillColor(COLORS.gray.medium)
      .text(label, x + 10, y + h - 14, {
        width: w - 20,
        align: "center",
        lineBreak: false,
      });
  } else {
    doc
      .font(FONTS.bold)
      .fontSize(16)
      .fillColor(COLORS.green.dark)
      .text(value, x + 10, y + 14, {
        width: w - 20,
        align: "center",
        lineBreak: false,
      });

    doc
      .font(FONTS.regular)
      .fontSize(8)
      .fillColor(COLORS.gray.medium)
      .text(label, x + 10, y + h - 18, {
        width: w - 20,
        align: "center",
        lineBreak: false,
      });
  }
}

export function drawTable(doc, x, startY, headers, rows, colWidths) {
  let y = startY;
  const rowHeight = 22;
  const headerHeight = 26;
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);

  doc.rect(x, y, totalWidth, headerHeight).fill(COLORS.green.dark);

  let xPos = x;
  headers.forEach((h, i) => {
    doc
      .font(FONTS.bold)
      .fontSize(9)
      .fillColor(COLORS.white)
      .text(h, xPos + 6, y + 8, { width: colWidths[i] - 12, lineBreak: false });
    xPos += colWidths[i];
  });

  y += headerHeight;

  rows.forEach((row, ri) => {
    const bgColor = ri % 2 === 0 ? COLORS.white : COLORS.gray.pale;
    doc.rect(x, y, totalWidth, rowHeight).fill(bgColor);

    xPos = x;
    row.forEach((cell, ci) => {
      doc
        .font(FONTS.regular)
        .fontSize(9)
        .fillColor(COLORS.black)
        .text(String(cell ?? "—"), xPos + 6, y + 6, {
          width: colWidths[ci] - 12,
          lineBreak: false,
        });
      xPos += colWidths[ci];
    });

    y += rowHeight;
  });

  doc.rect(x, startY, totalWidth, y - startY).lineWidth(0.5).stroke(COLORS.gray.light);

  doc.y = y;
  return y;
}

export function drawFacilityMini(doc, x, y, w, calc) {
  const boxH = 50;

  doc.roundedRect(x, y, w, boxH, 4).fill(COLORS.white);
  doc.rect(x, y, w, 3).fill(COLORS.green.dark);

  doc
    .font(FONTS.bold)
    .fontSize(9)
    .fillColor(COLORS.green.dark)
    .text("Facility Overview", x + 8, y + 8, { width: w - 16, lineBreak: false });

  doc
    .font(FONTS.regular)
    .fontSize(8)
    .fillColor(COLORS.gray.dark);

  const labels = [
    `Total: ${Number(calc.facility_size_mw).toFixed(1)} MW`,
    `Used: ${((Number(calc.facility_size_mw) * Number(calc.utilization_percentage)) / 100).toFixed(1)} MW`,
    `Stranded: ${Number(calc.stranded_capacity_mw).toFixed(1)} MW`,
  ];

  labels.forEach((t, i) => {
    doc.text(t, x + 8 + i * (w / 3), y + 24, { width: w / 3 - 4, lineBreak: false });
  });
}
