
'use strict';

var validator = module.exports = {};

validator.required = function(ctx, options, value) {
  if (typeof value == 'undefined' || value === null) return { key: 'required' };
};
