import AppError from "../utils/AppError.js";
import {
  calculateStranding,
  getCoolingFactor,
  toUtilization,
} from "../utils/calculationFormula.js";

class CalculationService {
  constructor({ calculationRepository }) {
    this.calculationRepository = calculationRepository;
  }

  // Obtener todos los calculos
  async getAll(options = {}) {
    return this.calculationRepository.findAll(options);
  }

  // GET /api/calculations/:id
  async findById(id) {
    const calculation = await this.calculationRepository.findById(id);
    if (!calculation) {
      throw new AppError("Cálculo no encontrado", 404);
    }
    return calculation;
  }

  // GET /api/calculations?lead_id=:id
  async findByLeadId(leadId) {
    return this.calculationRepository.findByLeadId(leadId);
  }

  // POST /api/calculations/
  async calculateAndSave(dto) {
    const { facility_size_mw, utilization_percentage, cooling_type } = dto;

    // funciones importadas del calculationFormula.js
    const utilization = toUtilization(utilization_percentage);
    const coolingFactor = getCoolingFactor(cooling_type);
    const calculationsResults = calculateStranding(
      facility_size_mw,
      utilization,
      coolingFactor,
    );

    // TODO: cuando exista autenticación, obtener lead_id desde req.user
    return this.calculationRepository.create({
      lead_id: null,

      facility_size_mw,
      utilization_percentage,
      cooling_type,
      ...calculationsResults,

      formula_version: "v1.0.1",
    });
  }

  async delete(id) {
  const calculation = await this.calculationRepository.delete(id);

  if (!calculation) {
    throw new AppError('Cálculo no encontrado para este usuario', 404);
  }

  return true;
};
}

export default CalculationService;
