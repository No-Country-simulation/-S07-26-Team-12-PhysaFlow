import { Sequelize } from "sequelize";

// configuracion de la coneccion a la DB de postgress
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // esto es importante. es para que no se muestren los logs en consola
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// conectarse a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL conectado correctamente");
  } catch (error) {
    // si hay un error al conectarse cerramos el proceso
    console.error("❌ Error al conectar con PostgreSQL:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
