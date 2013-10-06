
'use strict';

var Valida = module.exports = require('./valida');

Valida.Sanitizer = {};
Valida.Validator = {};

var sanitizers = require('./sanitizers');
for (var key in sanitizers) {
  Valida.Sanitizer[key] = key;
  Valida.setSanitizer(key, sanitizers[key]);
}

var validators = require('./validators');
for (var key in validators) {
  Valida.Validator[key] = key;
  Valida.setValidator(key, validators[key]);
}
