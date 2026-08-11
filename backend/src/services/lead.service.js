class LeadService {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  // obtener todos los leads
  async getAll(options = {}) {}
}

export default LeadService;
