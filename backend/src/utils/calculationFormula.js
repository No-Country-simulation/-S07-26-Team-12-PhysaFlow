// Factores de perdida segun tipo de cooling (solo se usa el primero del array)
const COOLING_FACTORS = {
  air: 0.18,
  liquid: 0.05,
  immersion: 0.03,
};

// Perdidas economicas por MW de capacidad varada (por defecto 250.000 y 450.000)
const LOSS_PER_MW = {
  min: 250000,
  max: 450000,
};

// Conviete porcentaje a proporción (80 → 0.80)
export const toUtilization = (percentage) => percentage / 100;

// Obtiene el factor de cooling según el tipo
export const getCoolingFactor = (coolingType) => {
  return COOLING_FACTORS[coolingType[0]];
};

// Ajuste segun rango de utilizacion
export const getUtilizationAdjustment = (utilization) => {
  if (utilization > 0.9) return 0.07;
  if (utilization > 0.7) return 0.04;
  if (utilization < 0.4) return -0.02;
  return 0;
};

// Calcula strandedCapacity y perdidas anuales
export const calculateStranding = (facilityMW, utilization, coolingFactor) => {
  const adjustment = getUtilizationAdjustment(utilization);
  const stranded_capacity_percent = coolingFactor + adjustment;
  const stranded_capacity_mw = facilityMW * stranded_capacity_percent;

  const annual_loss_min = stranded_capacity_mw * LOSS_PER_MW.min;
  const annual_loss_max = stranded_capacity_mw * LOSS_PER_MW.max;

  return {
    stranded_capacity_percent,
    stranded_capacity_mw,
    annual_loss_min,
    annual_loss_max,
  };
};
