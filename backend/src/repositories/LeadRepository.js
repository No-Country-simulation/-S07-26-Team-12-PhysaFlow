class LeadRepository {
  constructor(model) {
    this.model = model;
  }

  //crear lead nuevo
  async create(data) {
    return this.model.create(data);
  }

  // buscar lead por Primary Key
  async findById(id) {
    return this.model.findByPk(id);
  }

  //buscar TODOS los leads
  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  //actualizar lead por PK. devuelve null si no existe
  async update(id, data) {
    const entity = await this.model.findByPk(id);

    if (!entity) return null;
    await entity.update(data);

    return entity;
  }

  // eliminar lead por PK. devuelve false si no existe y true si se borro
  async delete(id) {
    const entity = await this.model.findByPk(id);

    if (!entity) return false;
    await entity.destroy();

    return true;
  }

  // buscar lead por email
  async findByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

export default LeadRepository;
