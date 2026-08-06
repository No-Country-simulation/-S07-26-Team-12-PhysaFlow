// Clase de error custom para errores (404, 400, 409, etc etc)
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 4xx => fail, 5xx => error
    this.isOperational = true; // true = error esperado, false = bug de programasion

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
