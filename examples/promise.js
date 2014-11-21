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


var done = function (ctx) {
  console.log('validation succeed, isValid =', ctx.isValid());
  if (!ctx.isValid()) return console.log('errors', ctx.errors());
  console.log('data', person);
};


var fail = function (err) {
  console.log('failed with err', err);
};


Valida.process(person, schema, ['create', 'update'])
  .then(done, fail);

Valida.process(person, schema, ['update'])
  .then(done, fail);

Valida.process(person, schema, ['create'])
  .then(done, fail);

Valida.process(person, schema)
  .then(done, fail);
