var Valida = require('..');


Valida.setValidator('timeout1', function(ctx, options, value, cb) {
  setTimeout(function() {
    console.log('timeout1', new Date());
    cb();
  }, 2000);
});


Valida.setValidator('timeout2', function(ctx, options, value, cb) {
  setTimeout(function() {
    console.log('timeout2', new Date());
    cb(null, { key: 'timeout2', someAddInfo: 'hello world' });
  }, 5000);
});


var schema = {
  id: [
    { validator: 'timeout1' },
    { sanitizer: Valida.Sanitizer.toInt },
    { validator: Valida.Validator.required },
    { validator: 'timeout2' }
  ]
};


var obj = {
  id: '10'
};


Valida.process(obj, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) console.log(ctx.errors());
  console.log(obj);
});
