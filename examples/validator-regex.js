var Valida = require('..');


var schema = {
  code: [
    { validator: Valida.Validator.regex, pattern: /^[0-9]*$/, groups: ['not matching pattern'] },
    { validator: Valida.Validator.regex, pattern: /^a[0-9]*z$/, groups: ['matching pattern'] },
    { validator: Valida.Validator.regex, pattern: '^a[0-9]*z$', groups: ['matching string without modifiers'] },
    { validator: Valida.Validator.regex, pattern: '[A-Z]', modifiers: 'i', groups: ['string with modifiers'] }
  ]
};


var data = { code: 'a1234z' };


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'not matching pattern');


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'matching pattern');


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'matching string without modifiers');


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'string with modifiers');


data.code = '123';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'string with modifiers');


data.code = null;


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'matching pattern');


delete data.code;


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'matching pattern');
