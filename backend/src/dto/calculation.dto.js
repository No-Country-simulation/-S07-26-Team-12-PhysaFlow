import validator from "validator";
import AppError from "../utils/AppError.js";

//valores permitidos para cooling_type (deben coincidir con el enum del modelo)
const ALLOWED_COOLING = ["air", "liquid", "immersion"];

// DTO que valida y transforma los datos de entrada para POST /api/calculations/
class CalculationDTO {
  constructor(data) {
    this.facility_size_mw = data.facility_size_mw;
    this.utilization_percentage = data.utilization_percentage;
    this.cooling_type = data.cooling_type;
    this._validate(); // lanza AppError(400) si alguna validación falla
  }

  // Valida cada campo antes de que llegue al Service
  _validate() {
    if (!validator.isFloat(String(this.facility_size_mw), { min: 0.01 })) {
      throw new AppError(
        "facility_size_mw es obligatorio y debe ser mayor a 0",
        400,
      );
    }

    // utilization_percentage: obligatorio, 0-100
    if (
      !validator.isFloat(String(this.utilization_percentage), {
        min: 0,
        max: 100,
      })
    ) {
      throw new AppError(
        "utilization_percentage es obligatorio y debe estar entre 0 y 100",
        400,
      );
    }

    // cooling_type: debe ser array no vacío
    if (!Array.isArray(this.cooling_type) || this.cooling_type.length === 0) {
      throw new AppError("cooling_type debe ser un array no vacío", 400);
    }

    // cooling_type: cada valor debe estar en el enum permitido
    const invalidos = this.cooling_type.filter(
      (v) => !ALLOWED_COOLING.includes(v),
    );
    if (invalidos.length > 0) {
      throw new AppError(
        `Valores de cooling_type inválidos: ${invalidos.join(", ")}`,
        400,
      );
    }

    // cooling_type: no permitir duplicados
    const unicos = new Set(this.cooling_type);
    if (unicos.size !== this.cooling_type.length) {
      throw new AppError("cooling_type no debe contener duplicados", 400);
    }
  }

  // Devuelve los datos validados como objeto plano, listos para el Service
  toObject() {
    return {
      facility_size_mw: Number(this.facility_size_mw),
      utilization_percentage: Number(this.utilization_percentage),
      cooling_type: this.cooling_type,
    };
  }
}

export default CalculationDTO;
