import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Calculation = sequelize.define(
  "Calculation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    lead_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    facility_size_mw: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    utilization_percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },

    cooling_type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        // funcion fuera de sequelize para validar que los valores de cooling_type sean validos y que al menos haya un valor
        isValidCoolingTypes(value) {
          const allowed = ["air", "liquid", "immersion"];
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error("cooling_type debe tener al menos un valor");
          }
          const invalidos = value.filter((v) => !allowed.includes(v));
          if (invalidos.length > 0) {
            throw new Error(
              `Valores de cooling_type inválidos: ${invalidos.join(", ")}`,
            );
          }
        },
      },
    },

    stranded_capacity_percent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },

    stranded_capacity_mw: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },

    annual_loss_min: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },

    annual_loss_max: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },

    formula_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "calculations",
    timestamps: true,
  },
);

export default Calculation;
