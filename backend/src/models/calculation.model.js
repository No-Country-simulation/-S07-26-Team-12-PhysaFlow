import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
            references:{
                model: "leads",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
            type: DataTypes.ENUM('air', 'liquid', 'immersion'),
            allowNull: false,
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
}
);

export default Calculation