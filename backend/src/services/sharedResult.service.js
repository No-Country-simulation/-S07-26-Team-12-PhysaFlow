class SharedResultService {
  constructor({ sharedResultRepository }) {
    this.sharedResultRepository = sharedResultRepository;
  }

  // obtener todos los result compar
  async getAll(options = {}) {}
}

export default SharedResultService;
