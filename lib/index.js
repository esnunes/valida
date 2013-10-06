
'use strict';

var Context = require('./context');

var Valida = function() {
  this.validators = {};
  this.sanitizers = {};
};

/**
 * fn won't be called in case value is undefined.
 *
 * fn = (ctx, options, value, [cb])
 */
Valida.prototype.setValidator = function(key, fn) {
  this.validators[key] = fn;
};

/**
 * fn = (ctx, options, value, [cb])
 */
Valida.prototype.setSanitizer = function(key, fn) {
  this.sanitizers[key] = fn;
};


Valida.prototype.process = function(obj, schema, cb, groups) {
  var ctx = new Context(this, obj, schema, cb, groups);
  ctx.run();
};

var valida = module.exports = new Valida();
valida.Sanitizer = {};
valida.Validator = {};
valida.Context = Context;

var sanitizers = require('./sanitizers');
for (var key in sanitizers) {
  valida.Sanitizer[key] = key;
  valida.setSanitizer(key, sanitizers[key]);
}

var validators = require('./validators');
for (var key in validators) {
  valida.Validator[key] = key;
  valida.setValidator(key, validators[key]);
}
