import validator from "validator";
import AppError from "../utils/AppError.js";

class LeadRegisterDTO {
  constructor(data) {
    this.email = data.email;
    this.calculation_id = data.calculation_id;
    this._validate();
  }

  _validate() {
    if (!this.email || !validator.isEmail(this.email)) {
      throw new AppError("email es obligatorio y debe ser un email válido", 400);
    }

    if (!this.calculation_id || !validator.isUUID(this.calculation_id)) {
      throw new AppError(
        "calculation_id es obligatorio y debe ser un UUID válido",
        400,
      );
    }
  }

  toObject() {
    return {
      email: this.email.toLowerCase().trim(),
      calculation_id: this.calculation_id,
    };
  }
}

export default LeadRegisterDTO;
