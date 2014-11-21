var ValidaInvalidError = require('./valida-invalid-error');
var async = require('async');


var Context = module.exports = function(valida, obj, schema, cb, groups) {
  this.valida = valida;
  this.obj = obj;
  this.schema = schema;
  this.cb = cb;
  this.groups = typeof groups == 'string' ? [groups] : groups;

  this.status = {
    errors: {},
    valid: true
  };
};


Context.prototype.isValid = function() {
  return this.status && this.status.valid;
};


Context.prototype.errors = function() {
  if (!this.status || this.status.valid) return;
  return this.status.errors;
};


Context.prototype.invalidError = function () {
  return new ValidaInvalidError(this.status.errors);
};


Context.prototype.addError = function(key, error) {
  this.status.errors[key] = this.status.errors[key] || [];
  this.status.errors[key].push(error);
  this.status.valid = false;
};


Context.prototype.groupsValid = function(groups) {
  var checkGroupsEmpty = !this.groups || this.groups.length === 0;
  var ruleGroupsEmpty = !groups || groups.length === 0;

  if (checkGroupsEmpty && ruleGroupsEmpty) return true;
  if (!checkGroupsEmpty && ruleGroupsEmpty) return true;
  if (!checkGroupsEmpty && !ruleGroupsEmpty) {
    for (var i = 0, len = this.groups.length; i < len; i++) {
      if (groups.indexOf(this.groups[i]) != -1) return true;
    }
  }

  return false;
};


Context.prototype.run = function() {
  Object.keys(this.schema).forEach(function (key) {
    var rules = this.schema[key];

    // sanitizers
    for (var i = 0, len = rules.length; i < len; i++) {
      if (!rules[i].sanitizer) continue;
      if (typeof this.obj[key] == 'undefined') continue;
      if (!this.groupsValid(rules[i].groups)) continue;

      var fn = rules[i].sanitizer;
      if (typeof fn === 'string') fn = this.valida.sanitizers[fn];
      if (!fn) return this.cb(new Error('invalid sanitizer ' + rules[i].sanitizer));

      this.obj[key] = fn(this, rules[i], this.obj[key]);
    }
  }, this);

  var asyncValidators = [];
  Object.keys(this.schema).forEach(function (key) {
    var rules = this.schema[key];

    // validators
    for (var i = 0, len = rules.length; i < len; i++) {
      if (!rules[i].validator) continue;
      if (!this.groupsValid(rules[i].groups)) continue;

      var fn = rules[i].validator;
      if (typeof fn === 'string') fn = this.valida.validators[fn];
      if (!fn) return this.cb(new Error('invalid validator ' + rules[i].validator));

      if (fn.length == 4) {
        asyncValidators.push(asyncCall.bind(null, fn, this, key, rules[i], this.obj[key]));
      } else {
        var result = fn(this, rules[i], this.obj[key]);
        if (typeof result != 'undefined') this.addError(key, result);
      }
    }
  }, this);

  if (asyncValidators.length > 0) {
    var that = this;
    async.parallel(asyncValidators, function(err) {
      that.cb(err, that);
    });
  } else {
    this.cb(null, this);
  }
};


var asyncCall = function (fn, ctx, key, options, value, cb) {
  fn(ctx, options, value, function(err, result) {
    if (err) return cb(err);
    if (typeof result != 'undefined') ctx.addError(key, result);
    cb();
  });
};
