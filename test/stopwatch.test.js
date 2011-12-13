var should = require('should');
var Stopwatch = require('../lib/stopwatch').Stopwatch;

describe('Stopwatch', function() {
  var stopwatch = null;

  beforeEach(function() {
    stopwatch = new Stopwatch(1, { interval:0 });
  });

  describe('events', function() {
    describe('tick and end', function() {
      beforeEach(function() {
        stopwatch.start();
      });
   
      it('should emit tick N times based on', function(done) {
        var left = 10;
        stopwatch.on('tick', function(secondsLeft) {
          secondsLeft.should.equal(left--);
          if (left < 0) { done(); }
        });
      });
   
      it('should emit an end event', function(done) {
        stopwatch.on('end', done);
      });
    });
  });
  
  describe('#start', function() {
    it('should return true when first time', function() {
      stopwatch.start().should.be.true;
    });

    it('should return false when sencod time', function() {
      stopwatch.start();
      stopwatch.start().should.be.false;
    });
  });

  describe('#stop', function() {
    it('should not be started', function() {
      stopwatch.start();
      stopwatch.stop();
      stopwatch.started().should.be.false
    });
    
    it('should allow a new start', function() {
      stopwatch.stop();
      stopwatch.start().should.be.true;
    });
  });

  describe('#restart', function() {
    describe('when already started', function() {
      beforeEach(function() {
        stopwatch.start();
      });

      it('should be started', function() {
        stopwatch.restart();
        stopwatch.started().should.be.true;
      });

      describe('when has listeners', function() {
        beforeEach(function() {
          stopwatch.on('tick', function() {});
          stopwatch.on('end', function() {});
          stopwatch.restart();
        });
        
        it('should remove all tick listeners', function() {
          stopwatch.listeners('tick').length.should.equal(0);
        });

        it('should remove all end listeners', function() {
          stopwatch.listeners('end').length.should.equal(0);
        });
      });
    });

    describe('when stopped', function() {
      beforeEach(function() {
        stopwatch.start();
        stopwatch.stop();
      });

      it('should be started', function() {
        stopwatch.restart();
        stopwatch.started().should.be.true;
      });
    });
  });

  describe('#started', function() {
    it('should not be started without calling #start', function() {
      stopwatch.started().should.be.false;
    });
  
    it('should be started after calling #start', function() {
      stopwatch.start();
      stopwatch.started().should.be.true;
    });

    it('should not be started when end', function(done) {
      stopwatch.start();
      stopwatch.on('end', function() {
        stopwatch.started().should.be.false;
        done();
      });
    });
  });
});
