var Valida = require('../');
var expect = require('chai').expect;

describe('validators', function () {
  describe('required', function () {
    var schema = {
      name: [
        { validator: Valida.Validator.required }
      ],
    };

    describe('given the field is present in the data', function () {
      it('should consider valid', function (done) {
        var data = { name: 'Jack' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is not present in the data', function () {
      it('should consider invalid', function (done) {
        var data = { };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('empty', function () {
    var schema = {
      name: [
        { validator: Valida.Validator.empty }
      ],
    };

    describe('given the field is not empty', function () {
      it('should consider valid', function (done) {
        var data = { name: 'Jack' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is empty', function () {
      it('should consider invalid', function (done) {
        var data = { name: '' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('regex', function () {
    var schema = {
      name: [
        { validator: Valida.Validator.regex, pattern: '[A-Z]', modifiers: 'i' }
      ],
    };

    describe('given the field matches the regex pattern', function () {
      it('should consider valid', function (done) {
        var data = { name: 'Jack' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field does not match the regex pattern', function () {
      it('should consider invalid', function (done) {
        var data = { name: '1111' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('len', function () {
    var schema = {
      fruits: [
        { validator: Valida.Validator.len, min: 2, max: 3 }
      ]
    };

    describe('given an array that matches the expected length', function () {
      it('should consider valid', function (done) {
        var data = { fruits: ['apple', 'orange'] };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given and array that does not match the expected length', function () {
      it('should consider invalid when min is not right', function (done) {
        var data = { fruits: ['apple'] };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });

      it('should consider invalid when max is not right', function (done) {
        var data = { fruits: ['apple', 'orange', 'banana', 'watermelon'] };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });

    describe('given a string that matches the expected length', function () {
      it('should consider valid', function (done) {
        var data = { fruits: 'fig' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given and array that does not match the expected length', function () {
      it('should consider invalid when min is not right', function (done) {
        var data = { fruits: 'x' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });

      it('should consider invalid when max is not right', function (done) {
        var data = { fruits: 'coconut' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('array', function () {
    var schema = {
      fruits: [
        { validator: Valida.Validator.array }
      ],
    };

    describe('given the field is an array', function () {
      it('should consider valid', function (done) {
        var data = { fruits: ['orange'] };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is not an array', function () {
      it('should consider invalid', function (done) {
        var data = { fruits: 'orange' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('plainObject', function () {
    var schema = {
      user: [
        { validator: Valida.Validator.plainObject }
      ],
    };

    describe('given the field is a plain object', function () {
      it('should consider valid', function (done) {
        var data = { user: { name: 'Jack' } };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is not a plain object', function () {
      it('should consider invalid', function (done) {
        var data = { user: [{ name: 'Jack' }] };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('date', function () {
    var schema = {
      createdAt: [
        { validator: Valida.Validator.date }
      ],
    };

    describe('given the field is a date', function () {
      it('should consider valid', function (done) {
        var data = { createdAt: new Date() };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is not a date', function () {
      it('should consider invalid', function (done) {
        var data = { createdAt: 'nope' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('integer', function () {
    var schema = {
      age: [
        { validator: Valida.Validator.integer }
      ],
    };

    describe('given the field is a integer', function () {
      it('should consider valid', function (done) {
        var data = { age: 45 };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given the field is not a integer', function () {
      it('should consider invalid', function (done) {
        var data = { age: 'nope' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('enum', function () {
    var schema = {
      fruit: [
        { validator: Valida.Validator.enum, items: ['apple', 'orange'] }
      ],
    };

    describe('given a value that exists in the enum', function () {
      it('should consider valid', function (done) {
        var data = { fruit: 'orange' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given a value that does not exist in the enum', function () {
      it('should consider invalid', function (done) {
        var data = { fruit: 'watermelon' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('bool', function () {
    var schema = {
      published: [
        { validator: Valida.Validator.bool }
      ],
    };

    describe('given a value true of bool type', function () {
      it('should consider valid', function (done) {
        var data = { published: true };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given a value false of bool type', function () {
      it('should consider valid', function (done) {
        var data = { published: false };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given a value true of string type', function () {
      it('should consider invalid', function (done) {
        var data = { published: 'true' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('float', function () {
    var schema = {
      salary: [
        { validator: Valida.Validator.float }
      ],
    };

    describe('given a value 1.20 of "float" type', function () {
      it('should consider valid', function (done) {
        var data = { salary: 1.20 };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(true);
          done();
        });
      });
    });

    describe('given a value 1.20 of string type', function () {
      it('should consider invalid', function (done) {
        var data = { salary: '1.20' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(ctx.isValid()).to.eql(false);
          done();
        });
      });
    });
  });

  describe('range', function () {
    describe('given a schema with both min and max values', () => {
      var schema = {
        code: [
          { validator: Valida.Validator.range, min: 0, max: 10 }
        ],
      };

      describe('given a value smaller than the min value', () => {
        it ('should consider invalid', (done) => {
          var data = { code: -10 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(false);
            done();
          });
        });
      });

      describe('given a value bigger than the max value', () => {
        it ('should consider invalid', (done) => {
          var data = { code: 20 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(false);
            done();
          });
        });
      });

      describe('given a value between the min and max value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 5 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });

      describe('given a value equal to the min value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 0 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });

      describe('given a value equal to the max value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 10 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });
    });

    describe('given a schema with only min value', () => {
      var schema = {
        code: [
          { validator: Valida.Validator.range, min: 0 }
        ],
      };

      describe('given a value smaller than the min value', () => {
        it ('should consider invalid', (done) => {
          var data = { code: -10 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(false);
            done();
          });
        });
      });

      describe('given a value bigger than the min value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 5 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });

      describe('given a value equal to the min value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 0 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });
    });

    describe('given a schema with only max value', () => {
      var schema = {
        code: [
          { validator: Valida.Validator.range, max: 10 }
        ],
      };

      describe('given a value bigger than the max value', () => {
        it ('should consider invalid', (done) => {
          var data = { code: 20 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(false);
            done();
          });
        });
      });

      describe('given a value smaller than the max value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 5 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });

      describe('given a value equal to the max value', () => {
        it ('should consider valid', (done) => {
          var data = { code: 10 };

          Valida.process(data, schema, function(err, ctx) {
            if (err) return done(err);
            expect(ctx.isValid()).to.eql(true);
            done();
          });
        });
      });
    });
  });
});
