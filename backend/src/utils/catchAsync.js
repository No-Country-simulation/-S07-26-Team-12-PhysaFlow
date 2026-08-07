// captura errores en controllers async y los pasa a next(err) para no repetir try/catch
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // cualquier error pasa al middleware errorHandler
  };
};

export default catchAsync;
