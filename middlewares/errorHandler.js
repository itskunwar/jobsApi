const errorHandler = (error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(error.properties);
  res.status(status).json({ message });
};

module.exports = { errorHandler };
