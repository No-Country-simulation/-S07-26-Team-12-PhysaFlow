import CalculationDTO from "../dto/calculation.dto.js";

class CalculationController {
  constructor(calculationService) {
    this.calculationService = calculationService;
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
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
