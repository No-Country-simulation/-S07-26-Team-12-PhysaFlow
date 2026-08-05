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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      // TODO:en futuras versiones podra actualizarse
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    source: {
      type: DataTypes.ENUM("direct", "shared"),
      allowNull: false,
      defaultValue: "direct",
    },

    status: {
      type: DataTypes.ENUM("new", "contacted", "converted"), // sujeto a cambios
      allowNull: false,
      defaultValue: "new",
    },
  },
  {
    tableName: "Leads",
    timestamps: true,
  }
);

export default Lead;
