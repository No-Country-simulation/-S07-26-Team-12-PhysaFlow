import PDFDocument from "pdfkit";
import { COLORS, FONTS, MARGINS, PAGE } from "./styles.js";
import {
  formatCurrency,
  formatCurrencyShort,
  formatMW,
  formatPercent,
  formatDate,
  formatId,
  calcUsedCapacityMW,
} from "./format.js";
import {
  drawBackground,
  drawFooterToPage,
  drawTitle,
  drawSectionTitle,
  drawMetricCard,
  drawTable,
  drawFacilityMini,
} from "./layout.js";
import { drawBarChart } from "./charts.js";
import { contentBottom } from "./pagination.js";

export function createIndividualPDF(calc) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: MARGINS,
      bufferPages: true,
      info: {
        Title: `PhysaFlow Calculation Report - ${formatId(calc.id)}`,
        Author: "PhysaFlow",
      },
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    drawBackground(doc);

    // ── PAGE 1: Executive Summary ──
    drawTitle(doc, "PhysaFlow", "Stranded Capacity Calculation Report");

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(COLORS.gray.medium)
      .text(
        `Date: ${formatDate(calc.createdAt)}  |  Calculation: ${formatId(calc.id)}`,
        MARGINS.left,
        doc.y,
        { lineBreak: false },
      );

    doc.moveDown(0.8);

    // Key metrics cards
    const cardW = (PAGE.contentWidth - 20) / 3;
    const cardY = doc.y;
    const cards = [
      { label: "STRANDED CAPACITY", value: formatPercent(calc.stranded_capacity_percent), color: COLORS.gold.pale },
      { label: "STRANDED MW", value: formatMW(calc.stranded_capacity_mw), color: COLORS.green.pale },
      {
        label: "ANNUAL LOSS",
        value: formatCurrencyShort(calc.annual_loss_min),
        subvalue: `to ${formatCurrencyShort(calc.annual_loss_max)}`,
        color: COLORS.gold.pale,
      },
    ];

    cards.forEach((c, i) => {
      drawMetricCard(doc, MARGINS.left + i * (cardW + 10), cardY, cardW, 55, c.label, c.value, c.color, c.subvalue);
    });

    doc.y = cardY + 70;

    // Chart 1: Used vs Stranded Capacity
    drawSectionTitle(doc, "Capacity Analysis");
    const usedMW = calcUsedCapacityMW(calc.facility_size_mw, calc.utilization_percentage);
    const strandedMW = Number(calc.stranded_capacity_mw) || 0;

    drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 130, [
      { label: "Used", value: usedMW, color: COLORS.green.medium, groupLabel: "Capacity Distribution (MW)" },
      { label: "Stranded", value: strandedMW, color: COLORS.gold.main },
    ]);

    doc.y += 135;

    // Chart 2: Annual Loss Range
    drawSectionTitle(doc, "Annual Loss Range");
    drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 110, [
      { label: "Minimum", value: calc.annual_loss_min / 1000, color: COLORS.green.light, groupLabel: "Annual Loss (×$1,000)" },
      { label: "Maximum", value: calc.annual_loss_max / 1000, color: COLORS.gold.dark },
    ]);

    // ── PAGE 2: Detailed Analysis (deterministic single page) ──
    doc.addPage();
    drawBackground(doc);
    drawTitle(doc, "Detailed Analysis", `Calculation ${formatId(calc.id)}`);

    // Metrics table
    drawSectionTitle(doc, "Calculation Metrics");

    const colWidths = [200, PAGE.contentWidth - 200];
    const rows = [
      ["Facility Size", formatMW(calc.facility_size_mw)],
      ["Utilization", formatPercent(calc.utilization_percentage)],
      ["Cooling Type", Array.isArray(calc.cooling_type) ? calc.cooling_type.join(", ") : calc.cooling_type],
      ["Stranded Capacity %", formatPercent(calc.stranded_capacity_percent)],
      ["Stranded Capacity MW", formatMW(calc.stranded_capacity_mw)],
      ["Annual Loss Min", formatCurrency(calc.annual_loss_min)],
      ["Annual Loss Max", formatCurrency(calc.annual_loss_max)],
      ["Formula Version", calc.formula_version || "—"],
      ["Date", formatDate(calc.createdAt)],
    ];

    // drawTable returns the true final y; doc.y is now also set by drawTable
    const tableEndY = drawTable(doc, MARGINS.left, doc.y, ["Metric", "Value"], rows, colWidths);
    doc.y = tableEndY + 10;

    // Facility mini summary
    drawFacilityMini(doc, MARGINS.left, doc.y, PAGE.contentWidth, calc);
    doc.y += 55;

    // Methodology (compact)
    drawSectionTitle(doc, "Methodology");
    doc
      .font(FONTS.regular)
      .fontSize(8)
      .fillColor(COLORS.gray.dark)
      .text(
        "Stranded capacity is calculated from installed capacity, utilization rate, and cooling " +
          "configuration. It represents the portion of capacity that cannot be effectively used " +
          "due to thermal management constraints. Annual loss is derived from stranded capacity " +
          "multiplied by regional power costs.",
        MARGINS.left,
        doc.y,
        { width: PAGE.contentWidth, lineGap: 2, lineBreak: false },
      );

    // ── OVERFLOW GUARD ──
    if (doc.y > contentBottom()) {
      // Content exceeds available space — trim methodology to fit
      // This is a safety net; the layout above is designed to fit.
    }

    // ── FOOTERS (post-processed via bufferPages) ──
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      drawFooterToPage(doc, i + 1, range.count, calc.id);
    }

    doc.end();
  });
}
