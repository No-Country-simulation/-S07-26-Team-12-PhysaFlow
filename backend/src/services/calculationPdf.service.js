import AppError from "../utils/AppError.js";
import { createIndividualPDF } from "../utils/pdf/generateIndividual.js";
import { createComparisonPDF } from "../utils/pdf/generateComparison.js";

class CalculationPdfService {
  constructor({ calculationRepository }) {
    this.calculationRepository = calculationRepository;
  }

  async generatePdf(calculationId, compareWithId) {
    const calc = await this.calculationRepository.findById(calculationId);
    if (!calc) {
      throw new AppError("Cálculo no encontrado", 404);
    }

    if (!compareWithId) {
      return createIndividualPDF(calc.toJSON());
    }

    const calcB = await this.calculationRepository.findById(compareWithId);
    if (!calcB) {
      throw new AppError("El segundo cálculo no fue encontrado", 404);
    }

    if (calc.lead_id && calcB.lead_id && calc.lead_id !== calcB.lead_id) {
      throw new AppError(
        "No se permiten comparaciones entre cálculos de diferentes leads",
        409,
      );
    }

    if ((calc.lead_id && !calcB.lead_id) || (!calc.lead_id && calcB.lead_id)) {
      throw new AppError(
        "No se puede comparar: un cálculo pertenece a un lead y el otro no",
        409,
      );
    }

    return createComparisonPDF(calc.toJSON(), calcB.toJSON());
  }
}

export default CalculationPdfService;
