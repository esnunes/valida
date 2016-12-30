var Valida = require('..');


var schema = {
  code: [
    { validator: Valida.Validator.range, min: 2, max: 10, groups: ['both'] },
    { validator: Valida.Validator.range, min: 2, groups: ['min'] },
    { validator: Valida.Validator.range, max: 10, groups: ['max'] },
  ]
};


var data = { };

data.code = 5;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'both');


data.code = 1;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'both');


data.code = 10;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'both');


data.code = 20;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'both');


data.code = 0;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'min');


data.code = 2;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'min');

data.code = 200;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'min');

data.code = 20;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'max');


data.code = 10;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'max');

data.code = -3;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
}, 'max');
