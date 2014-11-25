var Valida = require('..');


var studentSchema = {
  name: [
    { sanitizer: Valida.Sanitizer.trim },
    { validator: Valida.Validator.required }
  ],
  age: [
    { sanitizer: Valida.Sanitizer.toInt },
    { validator: Valida.Validator.required }
  ]
};

var classroomSchema = {
  name: [
    { sanitizer: Valida.Sanitizer.trim },
    { validator: Valida.Validator.required }
  ],
  students: [
    { validator: Valida.Validator.array },
    { validator: Valida.Validator.required },
    { validator: Valida.Validator.schema, schema: studentSchema }
  ]
};

var data = {
  name: 'class 1403',
  students: [{
    name: 'Eduardo Nunes',
    age: '32'
  }, {
    name: 'Paulo Ragonha',
    age: 30
  }, {
    name: 'Max Nunes',
    age: 24
  }]
};


var done = function (ctx) {
  console.log('validation succeed, isValid =', ctx.isValid());
  if (!ctx.isValid()) return console.log('errors', JSON.stringify(ctx.errors()));
  console.log('data', data);
};


var fail = function (err) {
  console.log('failed with err', err);
};


Valida.process(data, classroomSchema)
  .then(done, fail);


data = {
  name: 'class 1403',
  students: [{
    name: 'Eduardo Nunes',
    age: '32'
  }, {
    name: 'Paulo Ragonha',
  }, {
    name: 'Max Nunes',
    age: 24
  }]
};


Valida.process(data, classroomSchema)
  .then(done, fail);
