var titleCase = require('titlecase');
var upperCaseFirst = require('upper-case-first');

var sanitizer = module.exports = {};


/*
 * options = { radix = 10 }
 */
sanitizer.toInt = function(ctx, options, value) {
  if (value === null) return value;

  options.radix = options.radix || 10;
  return parseInt(value, options.radix);
};


/*
 * options = { precision }
 */
sanitizer.toFloat = function(ctx, options, value) {
  if (value === null) return value;

  value = parseFloat(value);
  if (typeof options.precision != 'undefined') {
    value = value.toFixed(options.precision);
    value = parseFloat(value);
  }
  return value;
};


sanitizer.toDate = function(ctx, options, value) {
  if (value === null) return value;
  return new Date(value);
};


/*
 * options = { chars }
 */
sanitizer.trim = function(ctx, options, value) {
  if (value === null) return value;

  value += '';

  options.chars = options.chars || '\\r\\n\\t\\s';

  return value.replace(new RegExp('^[' + options.chars + ']+|[' + options.chars + ']+$', 'g'), '');
};

sanitizer.string = function(ctx, options, value) {
  if (value === null) return value;

  return String(value);
};

sanitizer.lowerCase = function(ctx, options, value) {
  if (value === null) return value;

  return String(value).toLowerCase();
};

sanitizer.titleCase = function(ctx, options, value) {
  if (value === null) return value;

  return titleCase(value);
};

sanitizer.upperCaseFirst = function(ctx, options, value) {
  if (value === null) return value;

  return upperCaseFirst(value);
};

sanitizer.upperCase = function(ctx, options, value) {
  if (value === null) return value;

  return String(value).toUpperCase();
};

sanitizer.toBool = function(ctx, options, value) {
  if (value === null) return value;

  const strVal = String(value).toLowerCase();
  return strVal === 'true';
};
