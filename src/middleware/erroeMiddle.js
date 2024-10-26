const errorMiddel = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetail = err.extraDetail || "Error from Backend";
  
    return res.status(status).json({ message, extraDetail });
  };
  
  module.exports = errorMiddel;
  