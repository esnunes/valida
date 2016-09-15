var Valida = require('..');


var schema = {
  code: [
    { sanitizer: Valida.Sanitizer.lowerCase },
  ]
};


var product = { code: 'TD' };


Valida.process(product, schema, function(err, ctx) {
  console.log('simple', product);
}, 'simple');
