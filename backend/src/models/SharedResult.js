import { DataTypes } from "sequelize";
import sequelize from "../models/database.js";

const SharedResult = sequelize.define(
    "SharedResult",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: 0, // defaultValue establecido en "0" para que inicie en el orden correspondiente en la tabla
            primaryKey: true,
            allowNull: false,
        },

        calculation_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: "calculations",
                key: "id",
            },
            onUpdate: CASCADE,
            onDelete: CASCADE,
        },

        share_token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => { //Se agrego un tiempo de vigencia a 7 dias
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);
                return expirationDate;
            },
        },
    },
    
    {
    tableName: "shared_results",
    timestamps: true,
    }
);

export default SharedResult;

