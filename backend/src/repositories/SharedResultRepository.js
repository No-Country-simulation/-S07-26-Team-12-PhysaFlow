import SharedResult from "../models/SharedResult.model.js";

class SharedResultRepository {
  constructor(model) {
    this.model = model;
  }

  //crer un result compartido nuevo
  async create(data) {
    return SharedResult.create(data);
  }

  // buscar result compar por Primary Key
  async findById(id) {
    return SharedResult.findByPk(id);
  }

  //busccar todos los result compar
  async findAll(options = {}) {
    return SharedResult.findAll(options);
  }

  // actualizar result compar por PK
  async update(id, data) {
    const entity = await SharedResult.findByPk(id);
    if (!entity) return null;
    await entity.update(data);
    return entity;
  }

  //eliminar result compar por PK
  async delete(id) {
    const entity = await SharedResult.findByPk(id);
    if (!entity) return false;
    await entity.destroy();
    return true;
  }

  //buscar result compar por token unico
  async findByToken(token) {
    return SharedResult.findOne({ where: { share_token: token } });
  }
}

export default SharedResultRepository;
