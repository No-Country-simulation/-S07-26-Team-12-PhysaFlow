import AppError from "../utils/AppError.js";

class LeadService {
  constructor({ leadRepository, calculationRepository }) {
    this.leadRepository = leadRepository;
    this.calculationRepository = calculationRepository;
  }

  // POST /api/leads/register
  async register(email, calculationId) {
    let lead = await this.leadRepository.findByEmail(email);

    // asignaciones
    if (!lead) {
      const name = email.split("@")[0];
      lead = await this.leadRepository.create({ email, name });
    }

    const calculation =
      await this.calculationRepository.findById(calculationId);
    if (!calculation) {
      throw new AppError("Cálculo no encontrado", 404);
    }

    await this.calculationRepository.update(calculationId, {
      lead_id: lead.id,
    });
  }
}

export default LeadService;
