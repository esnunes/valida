var util = require('util');


var ValidaInvalidError = module.exports = function ValidaInvalidError (validationErrors) {
  var message = 'validaInvalidError';

  Error.call(this);

  this.name = this.constructor.name;
  this.validationErrors = validationErrors;

  Object.defineProperty(
    this,
    'message',
    {
      enumerable: false,
      value: message,
      writable: true,
    }
  );

  if (Error.hasOwnProperty('captureStackTrace')) {
    Error.captureStackTrace(this, this.constructor);
    return;
  }

  Object.defineProperty(
    this,
    'stack',
    {
      enumerable: false,
      value: (new Error(message)).stack,
    }
  );
};


util.inherits(ValidaInvalidError, Error);
