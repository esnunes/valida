var Valida = require('..');


var schema = {
  text: [
    {
      validator: Valida.Validator.custom,
      validation: (value) => value === 'hello custom',
      key: 'custom validation function',
      msg: 'your text is incorrect'
    }
  ]
};


data.text = 'invalid text';
Valida.process(data, schema, function(err, ctx) {
  if (err) return console.log(err);
  if (!ctx.isValid()) return console.log('invalid', ctx.errors());
  console.log('valid');
});
