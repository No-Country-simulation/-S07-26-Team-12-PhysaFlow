import { COLORS, FONTS } from "./styles.js";

export function drawBarChart(doc, x, y, w, h, items) {
  if (!items || items.length === 0) return;

  const savedY = doc.y;

  const maxValue = Math.max(...items.map((i) => Math.abs(i.value)), 1);
  const barWidth = Math.min(80, (w - 60) / items.length - 8);
  const chartHeight = h - 45;
  const baseY = y + h - 30;

  if (items[0]?.groupLabel) {
    doc
      .font(FONTS.bold)
      .fontSize(11)
      .fillColor(COLORS.green.dark)
      .text(items[0].groupLabel, x, y, { width: w, lineBreak: false });
  }

  doc
    .moveTo(x + 30, y + 20)
    .lineTo(x + 30, baseY)
    .lineWidth(0.5)
    .stroke(COLORS.gray.medium);

  items.forEach((item, i) => {
    const barH = (Math.abs(item.value) / maxValue) * (chartHeight - 10);
    const totalBarsWidth = items.length * barWidth + (items.length - 1) * 8;
    const barX = x + 45 + i * (barWidth + 8) + (w - 45 - totalBarsWidth) / 2;
    const barY = baseY - barH;

    doc.roundedRect(barX, barY, barWidth, barH, 2).fill(item.color || COLORS.green.medium);

    doc
      .font(FONTS.bold)
      .fontSize(10)
      .fillColor(COLORS.green.dark)
      .text(String(item.value), barX, barY - 14, {
        width: barWidth,
        align: "center",
        lineBreak: false,
      });

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(COLORS.gray.dark)
      .text(item.label, barX - 4, baseY + 4, {
        width: barWidth + 8,
        align: "center",
        lineBreak: false,
      });
  });

  doc.y = savedY;
}

export function drawHorizontalBarChart(doc, x, y, w, h, items) {
  if (!items || items.length === 0) return;

  const savedY = doc.y;

  const maxValue = Math.max(...items.map((i) => Math.abs(i.value)), 1);
  const barHeight = 16;
  const gap = 8;
  const labelWidth = 80;
  const valueWidth = 70;
  const chartWidth = w - labelWidth - valueWidth - 20;
  let curY = y;

  items.forEach((item) => {
    const barW = (Math.abs(item.value) / maxValue) * chartWidth;

    doc
      .font(FONTS.regular)
      .fontSize(8)
      .fillColor(COLORS.gray.dark)
      .text(item.label, x, curY + 3, { width: labelWidth, lineBreak: false });

    doc
      .rect(x + labelWidth, curY, chartWidth, barHeight)
      .fill(COLORS.gray.pale);

    doc
      .rect(x + labelWidth, curY, barW, barHeight)
      .fill(item.color || COLORS.green.medium);

    doc
      .font(FONTS.bold)
      .fontSize(8)
      .fillColor(COLORS.green.dark)
      .text(item.valueLabel || String(item.value), x + labelWidth + chartWidth + 5, curY + 3, {
        width: valueWidth,
        lineBreak: false,
      });

    curY += barHeight + gap;
  });

  doc.y = savedY;
}

export function drawComparisonBar(doc, x, y, w, label, valueA, valueB, unit) {
  const savedY = doc.y;

  const barHeight = 14;
  const labelW = 100;
  const barAreaW = w - labelW - 60;
  const maxVal = Math.max(Math.abs(valueA), Math.abs(valueB), 1);

  doc
    .font(FONTS.regular)
    .fontSize(8)
    .fillColor(COLORS.gray.dark)
    .text(label, x, y + 2, { width: labelW, lineBreak: false });

  const barX = x + labelW;

  const barAW = (Math.abs(valueA) / maxVal) * barAreaW;
  doc.rect(barX, y, barAW, barHeight).fill(COLORS.green.medium);
  doc
    .font(FONTS.regular)
    .fontSize(7)
    .fillColor(COLORS.white)
    .text(`${Number(valueA).toFixed(1)}${unit || ""}`, barX + 4, y + 3, {
      width: barAW - 8,
      lineBreak: false,
    });

  const barBY = y + barHeight + 3;
  const barBW = (Math.abs(valueB) / maxVal) * barAreaW;
  doc.rect(barX, barBY, barBW, barHeight).fill(COLORS.gold.main);
  doc
    .font(FONTS.regular)
    .fontSize(7)
    .fillColor(COLORS.white)
    .text(`${Number(valueB).toFixed(1)}${unit || ""}`, barX + 4, barBY + 3, {
      width: barBW - 8,
      lineBreak: false,
    });

  doc.y = savedY;
}
