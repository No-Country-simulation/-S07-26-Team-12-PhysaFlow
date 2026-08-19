import PDFDocument from "pdfkit";
import { COLORS, FONTS, MARGINS, PAGE } from "./styles.js";
import {
  formatCurrency,
  formatMW,
  formatPercent,
  formatDate,
  formatDateShort,
  formatId,
  calcUsedCapacityMW,
  calcChange,
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
import { drawBarChart, drawComparisonBar } from "./charts.js";

export function createComparisonPDF(calcA, calcB) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: MARGINS,
      bufferPages: true,
      info: {
        Title: `PhysaFlow Comparison - ${formatId(calcA.id)} vs ${formatId(calcB.id)}`,
        Author: "PhysaFlow",
      },
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    drawBackground(doc);

    // ── PAGE 1: Comparison Overview ──
    drawTitle(doc, "PhysaFlow", "Comparative Analysis Report");

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(COLORS.gray.medium)
      .text(
        `Calculation A: ${formatId(calcA.id)}  |  Calculation B: ${formatId(calcB.id)}`,
        MARGINS.left,
        doc.y,
        { lineBreak: false },
      );

    doc.moveDown(0.8);

    drawSectionTitle(doc, "Side-by-Side Comparison");

    const colWidths = [
      140,
      (PAGE.contentWidth - 140) / 2,
      (PAGE.contentWidth - 140) / 2,
    ];
    const rows = [
      [
        "Facility Size",
        formatMW(calcA.facility_size_mw),
        formatMW(calcB.facility_size_mw),
      ],
      [
        "Utilization",
        formatPercent(calcA.utilization_percentage),
        formatPercent(calcB.utilization_percentage),
      ],
      [
        "Cooling Type",
        Array.isArray(calcA.cooling_type)
          ? calcA.cooling_type.join(", ")
          : calcA.cooling_type,
        Array.isArray(calcB.cooling_type)
          ? calcB.cooling_type.join(", ")
          : calcB.cooling_type,
      ],
      [
        "Stranded Capacity %",
        formatPercent(calcA.stranded_capacity_percent),
        formatPercent(calcB.stranded_capacity_percent),
      ],
      [
        "Stranded Capacity MW",
        formatMW(calcA.stranded_capacity_mw),
        formatMW(calcB.stranded_capacity_mw),
      ],
      [
        "Annual Loss Min",
        formatCurrency(calcA.annual_loss_min),
        formatCurrency(calcB.annual_loss_min),
      ],
      [
        "Annual Loss Max",
        formatCurrency(calcA.annual_loss_max),
        formatCurrency(calcB.annual_loss_max),
      ],
      [
        "Date",
        formatDateShort(calcA.createdAt),
        formatDateShort(calcB.createdAt),
      ],
    ];

    const tableEndY = drawTable(
      doc,
      MARGINS.left,
      doc.y,
      ["Metric", "Calculation A", "Calculation B"],
      rows,
      colWidths,
    );

    doc.y = tableEndY + 20;

    // Summary cards
    const cardW = (PAGE.contentWidth - 30) / 4;
    const cardY = doc.y;
    const diffStranded = calcChange(
      calcB.stranded_capacity_mw,
      calcA.stranded_capacity_mw,
    );
    const diffPercent = calcChange(
      calcB.stranded_capacity_percent,
      calcA.stranded_capacity_percent,
    );
    const diffMinLoss = calcChange(
      calcB.annual_loss_min,
      calcA.annual_loss_min,
    );
    const diffMaxLoss = calcChange(
      calcB.annual_loss_max,
      calcA.annual_loss_max,
    );

    const summaryCards = [
      {
        label: "STRANDED %",
        value: `${diffPercent >= 0 ? "+" : ""}${diffPercent.toFixed(2)}pp`,
      },
      {
        label: "STRANDED MW",
        value: `${diffStranded >= 0 ? "+" : ""}${diffStranded.toFixed(2)} MW`,
      },
      {
        label: "LOSS MIN",
        value: `${diffMinLoss >= 0 ? "+" : ""}$${Math.abs(diffMinLoss).toLocaleString()}`,
      },
      {
        label: "LOSS MAX",
        value: `${diffMaxLoss >= 0 ? "+" : ""}$${Math.abs(diffMaxLoss).toLocaleString()}`,
      },
    ];

    summaryCards.forEach((c, i) => {
      drawMetricCard(
        doc,
        MARGINS.left + i * (cardW + 10),
        cardY,
        cardW,
        55,
        c.label,
        c.value,
      );
    });

    // ── PAGE 2: Detailed View A ──
    doc.addPage();
    drawBackground(doc);
    drawTitle(
      doc,
      "Calculation A – Detailed View",
      `ID: ${formatId(calcA.id)}`,
    );

    drawDetailedPage(doc, calcA);

    // ── PAGE 3: Detailed View B ──
    doc.addPage();
    drawBackground(doc);
    drawTitle(
      doc,
      "Calculation B – Detailed View",
      `ID: ${formatId(calcB.id)}`,
    );

    drawDetailedPage(doc, calcB);

    // ── PAGE 4: Comparative Analysis ──
    doc.addPage();
    drawBackground(doc);
    drawTitle(doc, "Comparative Analysis", "Differences between calculations");

    drawSectionTitle(doc, "Stranded Capacity Comparison");
    drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 130, [
      {
        label: "Calc A",
        value: Number(calcA.stranded_capacity_mw),
        color: COLORS.green.medium,
        groupLabel: "Stranded Capacity (MW)",
      },
      {
        label: "Calc B",
        value: Number(calcB.stranded_capacity_mw),
        color: COLORS.gold.main,
      },
    ]);

    doc.y += 135;

    drawSectionTitle(doc, "Annual Loss Comparison");
    drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 130, [
      {
        label: "Calc A Min",
        value: calcA.annual_loss_min / 1000,
        color: COLORS.green.light,
        groupLabel: "Annual Loss (×$1,000)",
      },
      {
        label: "Calc A Max",
        value: calcA.annual_loss_max / 1000,
        color: COLORS.green.medium,
      },
      {
        label: "Calc B Min",
        value: calcB.annual_loss_min / 1000,
        color: COLORS.gold.light,
      },
      {
        label: "Calc B Max",
        value: calcB.annual_loss_max / 1000,
        color: COLORS.gold.dark,
      },
    ]);

    // ── PAGE 5: Summary / Key Changes ──
    doc.addPage();
    drawBackground(doc);
    drawTitle(doc, "Summary", "Key changes between calculations");

    drawSectionTitle(doc, "Change Summary");

    const changeColW = [
      160,
      (PAGE.contentWidth - 160) / 2,
      (PAGE.contentWidth - 160) / 2,
    ];
    const changeRows = [
      [
        "Utilization",
        formatPercent(calcA.utilization_percentage),
        formatPercent(calcB.utilization_percentage),
      ],
      [
        "Stranded Capacity %",
        formatPercent(calcA.stranded_capacity_percent),
        formatPercent(calcB.stranded_capacity_percent),
      ],
      [
        "Stranded Capacity MW",
        formatMW(calcA.stranded_capacity_mw),
        formatMW(calcB.stranded_capacity_mw),
      ],
      [
        "Annual Loss Min",
        formatCurrency(calcA.annual_loss_min),
        formatCurrency(calcB.annual_loss_min),
      ],
      [
        "Annual Loss Max",
        formatCurrency(calcA.annual_loss_max),
        formatCurrency(calcB.annual_loss_max),
      ],
      [
        "Cooling Type",
        (calcA.cooling_type || []).join(", "),
        (calcB.cooling_type || []).join(", "),
      ],
      [
        "Facility Size",
        formatMW(calcA.facility_size_mw),
        formatMW(calcB.facility_size_mw),
      ],
    ];

    const changeTableEndY = drawTable(
      doc,
      MARGINS.left,
      doc.y,
      ["Metric", "Calculation A", "Calculation B"],
      changeRows,
      changeColW,
    );

    doc.y = changeTableEndY + 20;

    // Delta summary
    drawSectionTitle(doc, "Absolute Differences");

    drawComparisonBar(
      doc,
      MARGINS.left,
      doc.y,
      PAGE.contentWidth,
      "Stranded MW",
      Number(calcA.stranded_capacity_mw),
      Number(calcB.stranded_capacity_mw),
      " MW",
    );
    doc.y += 35;

    drawComparisonBar(
      doc,
      MARGINS.left,
      doc.y,
      PAGE.contentWidth,
      "Annual Loss Min",
      calcA.annual_loss_min / 1000,
      calcB.annual_loss_min / 1000,
      "K",
    );
    doc.y += 35;

    drawComparisonBar(
      doc,
      MARGINS.left,
      doc.y,
      PAGE.contentWidth,
      "Annual Loss Max",
      calcA.annual_loss_max / 1000,
      calcB.annual_loss_max / 1000,
      "K",
    );

    // ── FOOTERS (post-processed via bufferPages) ──
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      drawFooterToPage(doc, i + 1, range.count, calcA.id);
    }

    doc.end();
  });
}

function drawDetailedPage(doc, calc) {
  drawSectionTitle(doc, "Calculation Metrics");

  const colWidths = [200, PAGE.contentWidth - 200];
  const rows = [
    ["Facility Size", formatMW(calc.facility_size_mw)],
    ["Utilization", formatPercent(calc.utilization_percentage)],
    [
      "Cooling Type",
      Array.isArray(calc.cooling_type)
        ? calc.cooling_type.join(", ")
        : calc.cooling_type,
    ],
    ["Stranded Capacity %", formatPercent(calc.stranded_capacity_percent)],
    ["Stranded Capacity MW", formatMW(calc.stranded_capacity_mw)],
    ["Annual Loss Min", formatCurrency(calc.annual_loss_min)],
    ["Annual Loss Max", formatCurrency(calc.annual_loss_max)],
    ["Formula Version", calc.formula_version || "—"],
    ["Date", formatDate(calc.createdAt)],
  ];

  const tableEndY = drawTable(
    doc,
    MARGINS.left,
    doc.y,
    ["Metric", "Value"],
    rows,
    colWidths,
  );

  doc.y = tableEndY + 8;

  // Facility mini summary
  drawFacilityMini(doc, MARGINS.left, doc.y, PAGE.contentWidth, calc);
  doc.y += 42;

  drawSectionTitle(doc, "Capacity Analysis");
  const usedMW = calcUsedCapacityMW(
    calc.facility_size_mw,
    calc.utilization_percentage,
  );

  drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 100, [
    {
      label: "Used",
      value: usedMW,
      color: COLORS.green.medium,
      groupLabel: "Capacity Distribution (MW)",
    },
    {
      label: "Stranded",
      value: Number(calc.stranded_capacity_mw),
      color: COLORS.gold.main,
    },
  ]);

  doc.y += 105;

  drawSectionTitle(doc, "Annual Loss Range");
  drawBarChart(doc, MARGINS.left, doc.y, PAGE.contentWidth, 80, [
    {
      label: "Minimum",
      value: calc.annual_loss_min / 1000,
      color: COLORS.green.light,
      groupLabel: "Annual Loss (×$1,000)",
    },
    {
      label: "Maximum",
      value: calc.annual_loss_max / 1000,
      color: COLORS.gold.dark,
    },
  ]);
}
