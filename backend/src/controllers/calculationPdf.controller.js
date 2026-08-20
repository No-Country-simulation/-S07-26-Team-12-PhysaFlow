import validator from "validator";
import AppError from "../utils/AppError.js";

class CalculationPdfController {
  constructor(calculationPdfService) {
    this.calculationPdfService = calculationPdfService;
    this.generate = this.generate.bind(this);
  }

  //GET /api/calculations/:Id/pdf
  //GET /api/calculations/:Id/pdf?compare_with=UUID
  async generate(req, res) {
    const { id } = req.params;
    const { compare_with } = req.query;

    if (!validator.isUUID(id)) {
      throw new AppError("El ID del cálculo no es un UUID válido", 400);
    }

    if (compare_with && !validator.isUUID(compare_with)) {
      throw new AppError("compare_with no es un UUID válido", 400);
    }

    //llamado al servicio para generar PDF
    const pdfBuffer = await this.calculationPdfService.generatePdf(
      id,
      compare_with || null,
    );

    //config encabezados para descargar
    const filename = compare_with
      ? `physaflow-comparison-${id.slice(0, 8)}-${compare_with.slice(0, 8)}.pdf`
      : `physaflow-calculation-${id.slice(0, 8)}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  }
}

export default CalculationPdfController;
