import validator from "validator";
import CalculationDTO from "../dto/calculation.dto.js";
import AppError from "../utils/AppError.js";

class CalculationController {
  constructor(calculationService) {
    this.calculationService = calculationService;
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.findByLeadId = this.findByLeadId.bind(this);
  }

  async findByLeadId(req, res) {
    const { lead_id } = req.query;

    if (!lead_id || !validator.isUUID(lead_id)) {
      throw new AppError("lead_id es obligatorio y debe ser un UUID válido", 400);
    }

    const calculations = await this.calculationService.findByLeadId(lead_id);
    res.status(200).json({ success: true, data: calculations });
  }

  async findById(req, res) {
    const calculation = await this.calculationService.findById(req.params.id);

    res.status(200).json({ success: true, data: calculation });
  }

  async create(req, res) {
    // =========================================================================================================
    // TODO:
    // cuando exista autenticacion, obtener el lead_id desde req.user.id
    // mientras tanto permanece null
    // =========================================================================================================
    const dto = new CalculationDTO(req.body);

    const calculation = await this.calculationService.calculateAndSave(
      dto.toObject(),
    );

    res.status(201).json({ success: true, data: calculation });
  }
}

export default CalculationController;
