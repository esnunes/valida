var Valida = require('..');


var schema = {
  code: [
    { sanitizer: Valida.Sanitizer.upperCase },
  ]
};


var product = { code: 'td' };


Valida.process(product, schema, function(err, ctx) {
  console.log('simple', product);
}, 'simple');
