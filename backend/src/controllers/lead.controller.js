import LeadRegisterDTO from "../dto/lead.dto.js";

class LeadController {
  constructor(leadService) {
    this.leadService = leadService;
    this.register = this.register.bind(this);
  }

  async register(req, res) {
    const dto = new LeadRegisterDTO(req.body);
    const { email, calculation_id } = dto.toObject();

    await this.leadService.register(email, calculation_id);

    res.status(200).json({
      success: true,
      message: "Usuario creado exitosamente. Cálculo vinculado correctamente",
    });
  }
}

export default LeadController;
