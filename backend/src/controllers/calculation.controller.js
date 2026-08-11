import CalculationDTO from "../dto/calculation.dto.js";

class CalculationController {
  constructor(calculationService) {
    this.calculationService = calculationService;
    this.create = this.create.bind(this);
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
