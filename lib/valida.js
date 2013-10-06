
'use strict';

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
  var ctx = new Valida.Context(this, obj, schema, cb, groups);
  ctx.run();
};

Valida.Context = require('./context');

module.exports = new Valida();
