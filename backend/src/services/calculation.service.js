// Factores de perdida segun tipo de cooling (solo se usa el primero del array)
const COOLING_FACTORS = {
  air: 0.18,
  liquid: 0.05,
  immersion: 0.03,
};

class CalculationService {
  constructor({ calculationRepository }) {
    this.calculationRepository = calculationRepository;
  }

  // Obtener todos los calculos
  async getAll(options = {}) {
    return this.calculationRepository.findAll(options);
  }

  // Calcula capacity stranding y guarda el resultado (POST /api/calculations/)
  async calculateAndSave(dto) {
    const { facility_size_mw, utilization_percentage, cooling_type } = dto;

    // Convertir porcentaje a proporcion (80 → 0.80)
    const utilization = utilization_percentage / 100;
    // =========================================================================================================
    // el modelo admite multiples sistemas de cooling, pero la formla actual solo contempla uno
    // se utiliza el primer elemento hasta definir la estrategia para configuraciones hibridas
    // =========================================================================================================
    const coolingFactor = COOLING_FACTORS[cooling_type[0]];

    // Ajuste segun rango de utilizacion
    let adjustment = 0;

    if (utilization > 0.9) adjustment = 0.07;
    else if (utilization > 0.7) adjustment = 0.04;
    else if (utilization < 0.4) adjustment = -0.02;

    // Calculos finales
    const stranded_capacity_percent = coolingFactor + adjustment;
    const stranded_capacity_mw = facility_size_mw * stranded_capacity_percent;

    const annual_loss_min = stranded_capacity_mw * 250000;
    const annual_loss_max = stranded_capacity_mw * 450000;

    // Persistir via repository
    return this.calculationRepository.create({
      // =========================================================================================================
      // TODO:
      // cuando exista autenticacion, obtener el lead_id desde req.user.id desde el controller
      // mientras tanto permanece null
      // =========================================================================================================
      lead_id: null,

      facility_size_mw,
      utilization_percentage,
      cooling_type,

      stranded_capacity_percent,
      stranded_capacity_mw,

      annual_loss_min,
      annual_loss_max,

      formula_version: "1.0.0",
    });
  }
}

export default CalculationService;
