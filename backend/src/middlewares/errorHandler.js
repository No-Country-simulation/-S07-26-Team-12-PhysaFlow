const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Errores de squelize
  if (err.name === "SequelizeValidationError") {
    err.statusCode = 422;
    err.message = err.errors.map((e) => e.message).join(", ");
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    err.statusCode = 409;
    err.message = err.errors.map((e) => e.message).join(", ");
  }
  if (err.name === "SequelizeDatabaseError" && err.parent?.code === "22P02") {
    err.statusCode = 400;
    err.isOperational = true;
    err.message = "El valor proporcionado no tiene un formato válido";
  }

  // production: respuesta limpia
  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }

  // development: respuesta completa para debugear
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

export default errorHandler;
