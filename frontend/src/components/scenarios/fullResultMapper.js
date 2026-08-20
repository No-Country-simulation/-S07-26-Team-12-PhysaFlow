import { formatAmount } from "../hooks/formatAmount";

const coolingLabels = {
  air: "Aire",
  liquid: "Líquido",
  immersion: "Inmersión",
};

const formatLoss = (min, max) =>
  `$${formatAmount(min)}–${formatAmount(max)}`;

export const mapCalculationToScenario = (calculation) => {
  const strandedPercent = Math.round(
    calculation.stranded_capacity_percent * 100,
  );
  const cooling = calculation.cooling_type
    .map((type) => coolingLabels[type] ?? type)
    .join(" + ");

  return {
    name: "Actual",
    details: `${calculation.facility_size_mw} MW · ${calculation.utilization_percentage}% util · ${cooling}`,
    badge: "BASE",
    stranded: `${strandedPercent}%`,
    strandedMw: `${calculation.stranded_capacity_mw} MW`,
    loss: formatLoss(calculation.annual_loss_min, calculation.annual_loss_max),
    // The API exposes only the total, so these bars remain a frontend estimate.
    bars: [
      100,
      Math.max(0, 100 - strandedPercent),
      Math.max(0, 100 - strandedPercent * 2),
    ],
  };
};
