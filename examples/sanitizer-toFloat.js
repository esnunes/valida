var Valida = require('..');


var schema = {
  salary: [
    { sanitizer: Valida.Sanitizer.toFloat, groups: ['without precision'] },
    { sanitizer: Valida.Sanitizer.toFloat, precision: 6, groups: ['with precision'] }
  ]
};


var person = { salary: '1.541712812' };


Valida.process(person, schema, function(err, ctx) {
  // jshint unused:false
  console.log('without precision', person);
}, 'without precision');


person.salary = 1.541712812;


Valida.process(person, schema, function(err, ctx) {
  // jshint unused:false
  console.log('with precision', person);
}, 'with precision');


person.salary = '12.423423134123';


Valida.process(person, schema, function(err, ctx) {
  // jshint unused:false
  console.log('with precision', person);
}, 'with precision');
