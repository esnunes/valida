
'use strict';

var sanitizer = module.exports = {};

/*
 * options = { radix = 10 }
 */
sanitizer.toInt = function(ctx, options, value) {
  if (value === null) return value;

  options.radix = options.radix || 10;
  return parseInt(value, options.radix);
};
