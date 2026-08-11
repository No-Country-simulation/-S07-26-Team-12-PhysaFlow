import Lead from "./Lead.model.js";
import SharedResult from "./SharedResult.model.js";
import Calculation from "./calculation.model.js";

/*
Lead (1)
     │
     └────────── hasMany ──────────► Calculation (N)

Calculation (N)
     │
     └────────── belongsTo (opcional) ──► Lead (1)
     lead_id puede ser NULL ─► onDelete: SET NULL


Calculation (1)
     │
     └────────── hasMany ──────────► SharedResult (N)

SharedResult (N)
     │
     └────────── belongsTo ───────► Calculation (1)
*/

// Lead (1) ===> Calculation (N)
Lead.hasMany(Calculation, {
  foreignKey: "lead_id",
  as: "calculations",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

Calculation.belongsTo(Lead, {
  foreignKey: "lead_id",
  as: "lead",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// Calculation (1) ===> SharedResult (N)
Calculation.hasMany(SharedResult, {
  foreignKey: { name: "calculation_id", allowNull: false },
  as: "sharedResults",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

SharedResult.belongsTo(Calculation, {
  foreignKey: "calculation_id",
  as: "calculation",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// exportar modelos
const models = {
  Lead,
  Calculation,
  SharedResult,
};

export default models;
