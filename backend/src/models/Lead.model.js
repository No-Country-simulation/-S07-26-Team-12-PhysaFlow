import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // TODO:agrgar calculation_id (UUID, FK) cuando exista Calculation
    // TODO:agregar sharedResult_id (UUID, FK) cuando exista SharedResult
  },
  {
    timestamps: true,
  },
);

export default Lead;
