var rsvp = require('rsvp');


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


Valida.prototype.setValidators = function(set) {
  for (var key in set) {
    this.setValidator(key, set[key]);
  }
};

/**
 * fn = (ctx, options, value, [cb])
 */
Valida.prototype.setSanitizer = function(key, fn) {
  this.sanitizers[key] = fn;
};


Valida.prototype.setSanitizers = function(set) {
  for (var key in set) {
    this.setSanitizer(key, set[key]);
  }
};


Valida.prototype.process = function(obj, schema, cb, groups) {
  var deferred = rsvp.defer();

  if (typeof cb !== 'function') {
    groups = cb;

    cb = function (err, ctx) {
      if (err) return deferred.reject(err);

      deferred.resolve(ctx);
    };
  }

  var ctx = new Valida.Context(this, obj, schema, cb, groups);
  ctx.run();

  return deferred.promise;
};


Valida.Context = require('./context');


module.exports = new Valida();
