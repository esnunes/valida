var util = require('util');


var ValidaInvalidError = module.exports = function ValidaInvalidError (validationErrors) {
  Error.call(this);

  this.name = this.constructor.name;
  Error.captureStackTrace(this, this.constructor);

  this.validationErrors = validationErrors;
};


util.inherits(ValidaInvalidError, Error);
