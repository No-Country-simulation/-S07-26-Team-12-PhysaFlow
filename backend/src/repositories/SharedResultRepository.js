class SharedResultRepository {
  constructor(model) {
    this.model = model;
  }

  //crer un result compartido nuevo
  async create(data) {
    return this.model.create(data);
  }

  // buscar result compar por Primary Key
  async findById(id) {
    return this.model.findByPk(id);
  }

  //busccar todos los result compar
  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  // actualizar result compar por PK
  async update(id, data) {
    const entity = await this.model.findByPk(id);

    if (!entity) return null;
    await entity.update(data);

    return entity;
  }

  //eliminar result compar por PK
  async delete(id) {
    const entity = await this.model.findByPk(id);

    if (!entity) return false;
    await entity.destroy();

    return true;
  }

  //buscar result compar por token unico
  async findByToken(token) {
    return this.model.findOne({ where: { share_token: token } });
  }
}

export default SharedResultRepository;
