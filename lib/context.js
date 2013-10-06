
'use strict';

var async = require('async');

var Context = module.exports = function(valida, obj, schema, cb, group) {
  this.valida = valida;
  this.obj = obj;
  this.schema = schema;
  this.cb = cb;
  this.group = group;

  this.status = {
    errors: {},
    valid: true
  };
};

Context.prototype.isValid = function() {
  return this.status && this.status.valid;
};

Context.prototype.errors = function() {
  if (!this.status || this.status.valid) return {};
  return this.status.errors;
};

Context.prototype.addError = function(key, error) {
  this.status.errors[key] = this.status.errors[key] || [];
  this.status.errors[key].push(error);
  this.status.valid = false;
};

Context.prototype.run = function() {
  for (var key in this.schema) {
    var jobs = this.schema[key];

    // sanitizers
    for (var i = 0, len = jobs.length; i < len; i++) {
      if (!jobs[i].sanitizer) continue;
      if (typeof this.obj[key] == 'undefined') continue;

      var sanitizer = jobs[i].sanitizer;
      var fn = this.valida.sanitizers[sanitizer];
      if (!fn) return this.cb(new Error('invalid sanitizer ' + sanitizer));

      this.obj[key] = fn(this, jobs[i], this.obj[key]);
    }
  }

  var asyncValidators = [];
  for (var key in this.schema) {
    var jobs = this.schema[key];

    // validators
    for (var i = 0, len = jobs.length; i < len; i++) {
      if (!jobs[i].validator) continue;

      var validator = jobs[i].validator;
      var fn = this.valida.validators[validator];
      if (!fn) return this.cb(new Error('invalid validator ' + validator));

      if (fn.length == 4) {
        (function(fn, ctx, key, validators, options, value) {
          validators.push(function(cb) {
            fn(ctx, options, value, function(err, result) {
              if (err) return cb(err);
              if (typeof result != 'undefined') ctx.addError(key, result);
              cb();
            });
          });
        })(fn, this, key, asyncValidators, jobs[i], this.obj[key]);
      } else {
        var result = fn(this, jobs[i], this.obj[key]);
        if (typeof result != 'undefined') this.addError(key, result);
      }
    }
  }

  if (asyncValidators.length > 0) {
    console.log('async');
    var that = this;
    async.parallel(asyncValidators, function(err) {
      that.cb(err, that);
    });
  } else {
    console.log('sync');
    this.cb(null, this);
  }
};
