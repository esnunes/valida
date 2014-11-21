var Valida = require('..');


var schema = {
  age: [
    { sanitizer: Valida.Sanitizer.toInt },
    { validator: Valida.Validator.required, groups: ['create'] }
  ],
  name: [
    { validator: Valida.Validator.required, groups: ['update'] }
  ]
};


var person = {
  age: '10'
};


Valida.process(person, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log(ctx.errors());
  console.log('valid', person);
}, ['create', 'update']);


Valida.process(person, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log(ctx.errors());
  console.log('valid', person);
}, 'update');


Valida.process(person, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log(ctx.errors());
  console.log('valid', person);
}, 'create');


Valida.process(person, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log(ctx.errors());
  console.log('valid', person);
});
