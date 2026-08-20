import { Op } from "sequelize";
import Lead from "../models/Lead.model.js";

class LeadRepository {
  constructor(model) {
    this.model = model;
  }

  //crear lead nuevo
  async create(data) {
    return Lead.create(data);
  }

  // buscar lead por Primary Key
  async findById(id) {
    return Lead.findByPk(id);
  }

  //buscar TODOS los leads
  async findAll(options = {}) {
    return Lead.findAll(options);
  }

  //actualizar lead por PK. devuelve null si no existe
  async update(id, data) {
    const entity = await Lead.findByPk(id);
    if (!entity) return null;
    await entity.update(data);
    return entity;
  }

  // eliminar lead por PK. devuelve false si no existe y true si se borro
  async delete(id) {
    const entity = await Lead.findByPk(id);
    if (!entity) return false;
    await entity.destroy();
    return true;
  }

  // buscar lead por email
  async findByEmail(email) {
    return Lead.findOne({ where: { email: { [Op.iLike]: email } } });
  }
}

export default LeadRepository;
