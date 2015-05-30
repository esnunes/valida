var rsvp = require('rsvp'),
    Valida = require('./valida');


var validator = module.exports = {};


validator.required = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) {
    var err = { validator: 'required' };
    addMessage(err, options);

    return err;
  }
};


validator.empty = function(ctx, options, value) {
  if (typeof value !== 'undefined' && !value.length) {
    var err = { validator: 'empty' };
    addMessage(err, options);

    return err;
  }
};


/*
 * options = { pattern, modified }
 */
validator.regex = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return;

  value = value + '';

  if (Object.prototype.toString.call(options.pattern).slice(8, -1) !== 'RegExp') {
    options.pattern = new RegExp(options.pattern, options.modifiers);
  }

  if (!options.pattern.test(value)) {
    var mod = '';
    if (options.pattern.global) mod += 'g';
    if (options.pattern.ignoreCase) mod += 'i';
    if (options.pattern.multiline) mod += 'm';

    var err = { validator: 'regex', pattern: options.pattern.source, modifiers: mod };
    addMessage(err, options);

    return err;
  }
};


/*
 * options = { min, max }
 * value = array and non-array
 */
validator.len = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return;

  if (!Array.isArray(value)) value = value + '';

  var valid = true;
  if (options.min !== undefined && options.min > value.length) valid = false;
  if (options.max !== undefined && options.max < value.length) valid = false;

  var err = { validator: 'len', min: options.min, max: options.max };
  addMessage(err, options);

  if (!valid) return err;
};


validator.array = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return;

  if (!Array.isArray(value)) {
    var err = { validator: 'array' };
    addMessage(err, options);

    return err;
  }
};


validator.schema = function(ctx, options, value, cb) {
  if (typeof value == 'undefined' || value === null) return cb();
  if (typeof options.schema === 'undefined') return cb(new Error('validator requires schema option'));

  value = Array.isArray(value) ? value : [ value ];

  var errors = {};

  var verify = function () {
    if (Object.keys(errors).length) return cb(null, { validator: 'schema', errors: errors });
    cb();
  };

  var isValid = function (i, ctx) {
    if (ctx.isValid()) return;

    errors[i] = ctx.errors();
  };

  var parallel = value.map(function (permission, i) {
    return Valida.process(permission, options.schema)
      .then(isValid.bind(null, i));
  });

  return rsvp.all(parallel)
    .then(verify);
};


validator.plainObject = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return;

  if (typeof value !== 'object' || Array.isArray(value)) {
    var err = { validator: 'plainObject' };
    addMessage(err, options);

    return err;
  }
};


function addMessage (err, opt) {
  if (opt.msg) err.msg = opt.msg;
}
