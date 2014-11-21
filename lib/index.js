var Valida = module.exports = require('./valida');


Valida.Sanitizer = {};
Valida.Validator = {};


var sanitizers = require('./sanitizers');
Object.keys(sanitizers).forEach(function (key) {
  Valida.Sanitizer[key] = key;
  Valida.setSanitizer(key, sanitizers[key]);
});


var validators = require('./validators');
Object.keys(validators).forEach(function (key) {
  Valida.Validator[key] = key;
  Valida.setValidator(key, validators[key]);
});
