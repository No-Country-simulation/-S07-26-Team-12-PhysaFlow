import "dotenv/config";
import { sequelize } from "../src/config/database.js";
import "../src/models/index.models.js";

import Lead from "../src/models/Lead.model.js";
import Calculation from "../src/models/calculation.model.js";
import SharedResult from "../src/models/SharedResult.model.js";

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL");

    // limpiar datos
    await SharedResult.destroy({ where: {} });
    await Calculation.destroy({ where: {} });
    await Lead.destroy({ where: {} });
    console.log("🗑️  Datos anteriores eliminados");

    // Leads
    const leads = await Lead.bulkCreate([
      {
        name: "Fulanito Filanin",
        email: "Fulanito@example.com",
        source: "direct",
        status: "converted",
      },
      {
        name: "Maria Marianes",
        email: "maria@example.com",
        source: "shared",
        status: "contacted",
      },
      {
        name: "Carlos Carlin",
        email: "carlos@example.com",
        source: "direct",
        status: "new",
      },
    ]);
    console.log(`✅ ${leads.length} leads creados`);

    // calculations
    const calculations = await Calculation.bulkCreate([
      {
        lead_id: leads[0].id,
        facility_size_mw: 50,
        utilization_percentage: 60,
        cooling_type: ["air"],
        stranded_capacity_percent: 8.5,
        stranded_capacity_mw: 4.25,
        annual_loss_min: 25000,
        annual_loss_max: 40000,
        formula_version: "0.0.1",
      },
      {
        lead_id: leads[0].id,
        facility_size_mw: 100,
        utilization_percentage: 75,
        cooling_type: ["liquid"],
        stranded_capacity_percent: 12.3,
        stranded_capacity_mw: 12.3,
        annual_loss_min: 50000,
        annual_loss_max: 80000,
        formula_version: "0.0.1",
      },
      {
        lead_id: leads[0].id,
        facility_size_mw: 200,
        utilization_percentage: 90,
        cooling_type: ["immersion"],
        stranded_capacity_percent: 5.1,
        stranded_capacity_mw: 10.2,
        annual_loss_min: 80000,
        annual_loss_max: 120000,
        formula_version: "0.0.2",
      },
      {
        lead_id: leads[1].id,
        facility_size_mw: 30,
        utilization_percentage: 45,
        cooling_type: ["air", "liquid"],
        stranded_capacity_percent: 15.0,
        stranded_capacity_mw: 4.5,
        annual_loss_min: 15000,
        annual_loss_max: 25000,
        formula_version: "0.0.1",
      },
      {
        lead_id: leads[1].id,
        facility_size_mw: 75,
        utilization_percentage: 80,
        cooling_type: ["liquid", "immersion"],
        stranded_capacity_percent: 10.2,
        stranded_capacity_mw: 7.65,
        annual_loss_min: 35000,
        annual_loss_max: 55000,
        formula_version: "0.0.1",
      },
      {
        lead_id: leads[1].id,
        facility_size_mw: 150,
        utilization_percentage: 70,
        cooling_type: ["air", "liquid", "immersion"],
        stranded_capacity_percent: 7.8,
        stranded_capacity_mw: 11.7,
        annual_loss_min: 60000,
        annual_loss_max: 95000,
        formula_version: "0.0.2",
      },
      {
        lead_id: leads[2].id,
        facility_size_mw: 80,
        utilization_percentage: 65,
        cooling_type: ["air", "immersion"],
        stranded_capacity_percent: 9.0,
        stranded_capacity_mw: 7.2,
        annual_loss_min: 30000,
        annual_loss_max: 48000,
        formula_version: "0.0.2",
      },
      {
        lead_id: leads[2].id,
        facility_size_mw: 250,
        utilization_percentage: 85,
        cooling_type: ["liquid"],
        stranded_capacity_percent: 4.2,
        stranded_capacity_mw: 10.5,
        annual_loss_min: 100000,
        annual_loss_max: 150000,
        formula_version: "0.0.1",
      },
      {
        lead_id: null,
        facility_size_mw: 120,
        utilization_percentage: 55,
        cooling_type: ["air", "liquid"],
        stranded_capacity_percent: 18.5,
        stranded_capacity_mw: 22.2,
        annual_loss_min: 70000,
        annual_loss_max: 110000,
        formula_version: "0.0.1",
      },
      {
        lead_id: null,
        facility_size_mw: 60,
        utilization_percentage: 50,
        cooling_type: ["air", "liquid", "immersion"],
        stranded_capacity_percent: 20.0,
        stranded_capacity_mw: 12.0,
        annual_loss_min: 20000,
        annual_loss_max: 35000,
        formula_version: "0.0.2",
      },
    ]);
    console.log(`✅ ${calculations.length} calculos creados`);

    // sharedResults
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 7);

    const sharedResults = await SharedResult.bulkCreate([
      {
        calculation_id: calculations[0].id,
        share_token: "token-abc-001",
        view_count: 12,
        expiresAt: expires,
      },
      {
        calculation_id: calculations[3].id,
        share_token: "token-abc-002",
        view_count: 5,
        expiresAt: expires,
      },
      {
        calculation_id: calculations[8].id,
        share_token: "token-abc-003",
        view_count: 0,
        expiresAt: expires,
      },
      {
        calculation_id: calculations[4].id,
        share_token: "token-abc-004",
        view_count: 23,
        expiresAt: expires,
      },
    ]);
    console.log(`✅ ${sharedResults.length} resultados compartidos creados`);

    // finalisima
    console.log("\n📊 Resumen del seed:");
    console.log(`   Leads:          ${leads.length}`);
    console.log(`   Calculations:   ${calculations.length}`);
    console.log(`   SharedResults:  ${sharedResults.length}`);
    console.log("\n✅ Seed completado exitosamente");
  } catch (error) {
    console.error("❌ Error durante el seed:", error.message);
  } finally {
    await sequelize.close();
  }
};

seed();
