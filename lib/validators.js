
'use strict';

var validator = module.exports = {};

validator.required = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return { validator: 'required' };
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

    return { validator: 'regex', pattern: options.pattern.source, modifiers: mod };
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

  if (!valid) return { validator: 'len', min: options.min, max: options.max };
};

validator.array = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return;

  if (!Array.isArray(value)) return { validator: 'array' };
};
