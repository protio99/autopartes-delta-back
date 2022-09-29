const {ValidationError} = require('sequelize')


function logErrors(error, req, res, next) {
  next(error);
}

function errorsHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });

}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

function ormErrorHandler(error, req, res, next) {
   if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.name
    });
  }
  next(error);
  
}

module.exports = { logErrors, errorsHandler, boomErrorHandler, ormErrorHandler };
