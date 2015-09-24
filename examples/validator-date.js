var Valida = require('..');


var schema = {
  date: [
    { validator: Valida.Validator.date }
  ]
};


var data = { date: null };


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.date = 'some-string';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.date = new Date();
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.date = 'Thu Sep 24 2015 11:31:30 GMT-0300 (BRT)';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.date = '2015-02-13';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});
