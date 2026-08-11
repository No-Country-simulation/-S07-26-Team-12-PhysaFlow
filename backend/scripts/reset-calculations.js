import "dotenv/config";
import { sequelize } from "../src/config/database.js";

const reset = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL");

    await sequelize.query("DROP TABLE IF EXISTS calculations CASCADE;");
    console.log("🗑️  Tabla calculations eliminada");

    await sequelize.query(
      "DROP TYPE IF EXISTS enum_calculations_cooling_type;",
    );
    console.log("🗑️  Tipo enum_calculations_cooling_type eliminado");

    console.log(
      "\n✅ Listo. Reiniciá el server (rs en nodemon) para que sync la recree.",
    );
  } catch (error) {
    console.error("❌ Error durante el reset:", error.message);
  } finally {
    await sequelize.close();
  }
};

reset();
