var Valida = require('..');


var schema = {
  birthday: [
    { sanitizer: Valida.Sanitizer.toDate }
  ]
};


var person = { birthday: 'Tue Oct 08 2013 19:09:56 GMT-0300 (BRT)' };


Valida.process(person, schema, function(err, ctx) {
  // jshint unused:false
  console.log(person, Object.prototype.toString.call(person.birthday));
});


person.birthday = new Date();


Valida.process(person, schema, function(err, ctx) {
  // jshint unused:false
  console.log(person, Object.prototype.toString.call(person.birthday));
});
