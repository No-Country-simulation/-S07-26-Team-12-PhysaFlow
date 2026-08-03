import Lead from "./Lead.model.js";
import SharedResult from "./SharedResult.model.js";
import Calculation from "./Calculation.model.js";

/*
Lead (1)
     │
     └────────── hasMany ──────────► Calculation (N)

Calculation (N)
     │
     └────────── belongsTo ───────► Lead (1)


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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Calculation.belongsTo(Lead, {
  foreignKey: "lead_id",
  as: "lead",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Calculation (1) ===> SharedResult (N)
Calculation.hasMany(SharedResult, {
  foreignKey: "calculation_id",
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
