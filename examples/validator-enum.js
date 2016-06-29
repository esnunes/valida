var Valida = require('..');


var schema = {
  color: [
    { validator: Valida.Validator.enum, items: ['blue', 'black', 'white'] },
  ]
};


var data = { color: 'blue' };


Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.color = 'black';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});

data.color = 'red';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.color = {some: {objectTry: true}};
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});


data.color = 0.1;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});

data.color = NaN;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});

data.color = 0;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});

data.color = 1;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});

data.color = -1000;
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});
