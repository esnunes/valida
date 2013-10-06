
'use strict';

var Valida = require('..');

var schema = {
  name: [
    { sanitizer: Valida.Sanitizer.trim, groups: ['simple'] },
    { sanitizer: Valida.Sanitizer.trim, chars: '\\[\\]', groups: ['chars'] }
  ]
};

var person = { name: '   Eduardo Nunes   ' };

Valida.process(person, schema, function(err, ctx) {
  console.log('simple', person);
}, 'simple');

person.name = '[Eduardo Nunes]';

Valida.process(person, schema, function(err, ctx) {
  console.log('chars', person);
}, 'chars');
