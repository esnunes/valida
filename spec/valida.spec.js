var Valida = require('../');
var expect = require('chai').expect;

describe('schema sanitization', function() {

  context('with root key outside schema', function() {

    let schema = {
      name: [
        { validator: Valida.Validator.required }
      ]
    }

    it('should remove foreign key', function (done) {
      var data = {
        name: 'Jack',
        surname: 'Sparrow'
      };

      Valida.process(data, schema, function(err, ctx) {
        if (err) return done(err);
        expect(Object.keys(data)).to.not.include('surname');
        done();
      });
    });
  });

  context('with inner key outside schema', function() {

    let schema = {
      name: [
        { validator: Valida.Validator.required }
      ],
      complex: [
        { validator: Valida.Validator.required },
        { validator: Valida.Validator.schema, schema: {
          name: [
            { validator: Valida.Validator.required }
          ]
        } }
      ]
    }

    it('should remove foreign key', function (done) {
      var data = {
        name: 'Jack',
        complex: {
          name: 'Jack',
          surname: 'Sparrow'
        }
      };

      Valida.process(data, schema, function(err, ctx) {
        if (err) return done(err);
        expect(Object.keys(data.complex)).to.not.include('surname');
        done();
      });
    });
  });
});
