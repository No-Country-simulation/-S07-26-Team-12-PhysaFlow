class CalculationService {
  constructor({ calculationRepository, leadRepository }) {
    this.calculationRepository = calculationRepository;
    this.leadRepository = leadRepository;
  }

  //obtener todos los calculos
  async getAll(options = {}) {}
}

export default CalculationService;
