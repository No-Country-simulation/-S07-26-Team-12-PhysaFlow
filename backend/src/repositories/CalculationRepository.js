class CalculationRepository {
  constructor(model) {
    this.model = model;
  }

  // crear un calculo nuvo
  async create(data) {
    return this.model.create(data);
  }

  // buscar calculo por Primary Key
  async findById(id) {
    return this.model.findByPk(id);
  }

  //buscar todos los calclos con opciones
  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  // actualizar calculo por PK. devuelve null si no existe
  async update(id, data) {
    const entity = await this.model.findByPk(id);

    if (!entity) return null;
    await entity.update(data);

    return entity;
  }

  // eliminar calculo por PK. devuelve false si no existe y true si se borro
  async delete(id) {
    const entity = await this.model.findByPk(id);

    if (!entity) return false;
    await entity.destroy();

    return true;
  }

  // buscar todos los calculos de un lead
  async findByLeadId(leadId) {
    return this.model.findAll({
      where: { lead_id: leadId },
    });
  }
}

export default CalculationRepository;
