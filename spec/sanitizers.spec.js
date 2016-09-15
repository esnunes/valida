var Valida = require('../');
var expect = require('chai').expect;

describe('sanitizers', function () {
  describe('toInt', function () {
    var schema = {
      age: [
        { sanitizer: Valida.Sanitizer.toInt }
      ],
    };

    describe('given is a string data of a valid integer number', function () {
      it('should set the field with the converted int value', function (done) {
        var data = { age: '50' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.age).to.eql(50);
          done();
        });
      });
    });

    describe('given is a string data of a invalid integer number', function () {
      it('should set the field with the result of the failed convertion', function (done) {
        var data = { age: 'x50' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.age).to.be.NaN;
          done();
        });
      });
    });
  });

  describe('toFloat', function () {
    var schema = {
      price: [
        { sanitizer: Valida.Sanitizer.toFloat }
      ],
    };

    describe('given is a string data of a valid float number', function () {
      it('should set the field with the converted float value', function (done) {
        var data = { price: '50.10' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.price).to.eql(50.10);
          done();
        });
      });
    });

    describe('given is a string data of a invalid float number', function () {
      it('should set the field with the result of the failed convertion', function (done) {
        var data = { price: 'x50' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.price).to.be.NaN;
          done();
        });
      });
    });
  });

  describe('toDate', function () {
    var schema = {
      createdAt: [
        { sanitizer: Valida.Sanitizer.toDate }
      ],
    };

    describe('given is a string data of a valid date', function () {
      it('should set the field with the converted date value', function (done) {
        var date = new Date();
        var data = { createdAt: date.toISOString() };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.createdAt).to.eql(date);
          done();
        });
      });
    });

    describe('given is a string data of a invalid date', function () {
      it('should set the field with the result of the failed convertion', function (done) {
        var data = { createdAt: '----' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.createdAt).to.be.NaN;
          done();
        });
      });
    });
  });

  describe('trim', function () {
    var schema = {
      name: [
        { sanitizer: Valida.Sanitizer.trim }
      ],
    };

    describe('given is a string data with whitespaces around it', function () {
      it('should set the field with no whitespaces arount id', function (done) {
        var data = { name: '   Jack   ' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.name).to.eql('Jack');
          done();
        });
      });
    });
  });

  describe('string', function () {
    var schema = {
      age: [
        { sanitizer: Valida.Sanitizer.string }
      ],
    };

    describe('given is a interger data', function () {
      it('should set the field with the converted string value', function (done) {
        var data = { age: 100 };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.age).to.eql('100');
          done();
        });
      });
    });
  });

  describe('lowerCase', function () {
    var schema = {
      text: [
        { sanitizer: Valida.Sanitizer.lowerCase }
      ],
    };

    describe('given is a string data with letters in all diferent cases', function () {
      it('should set the field with lower case', function (done) {
        var data = { text: 'My Name is Jack. OK?!' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.text).to.eql('my name is jack. ok?!');
          done();
        });
      });
    });
  });

  describe('titleCase', function () {
    var schema = {
      text: [
        { sanitizer: Valida.Sanitizer.titleCase }
      ],
    };

    describe('given is a string data with letters in all diferent cases', function () {
      it('should set the field with title case', function (done) {
        var data = { text: 'my name is Jack. OK?!' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.text).to.eql('My Name Is Jack. OK?!');
          done();
        });
      });
    });
  });

  describe('upperCaseFirst', function () {
    var schema = {
      text: [
        { sanitizer: Valida.Sanitizer.upperCaseFirst }
      ],
    };

    describe('given is a string data with letters in all diferent cases', function () {
      it('should set the field with title case', function (done) {
        var data = { text: 'my name is Jack. OK?!' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.text).to.eql('My name is Jack. OK?!');
          done();
        });
      });
    });
  });

  describe('upperCase', function () {
    var schema = {
      text: [
        { sanitizer: Valida.Sanitizer.upperCase }
      ],
    };

    describe('given is a string data with letters in all diferent cases', function () {
      it('should set the field with title case', function (done) {
        var data = { text: 'my name is Jack. OK?!' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.text).to.eql('MY NAME IS JACK. OK?!');
          done();
        });
      });
    });
  });

  describe('toBool', function () {
    var schema = {
      published: [
        { sanitizer: Valida.Sanitizer.toBool }
      ],
    };

    describe('given is a string "true"', function () {
      it('should set the field with "true" bool value', function (done) {
        var data = { published: 'true' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.published).to.eql(true);
          done();
        });
      });
    });

    describe('given is a string "false"', function () {
      it('should set the field with "false" bool value', function (done) {
        var data = { published: 'false' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.published).to.eql(false);
          done();
        });
      });
    });

    describe('given is a string with an invalid bool value', function () {
      it('should set the field with "false" bool value', function (done) {
        var data = { published: 'NOPE' };

        Valida.process(data, schema, function(err, ctx) {
          if (err) return done(err);
          expect(data.published).to.eql(false);
          done();
        });
      });
    });
  });
});
