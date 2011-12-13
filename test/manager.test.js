var should = require('should');
var StopwatchManager = require('../lib/stopwatch');

describe('StopwatchManager', function() {
  var stopwatch = StopwatchManager.get(1, {seconds: 1, interval: 0});

  describe('getting an instance', function() {
    var subject = StopwatchManager.get(1);

    it('should have the same seconds', function() {
      subject.seconds.should.equal(stopwatch.seconds);
    });

    it('should have the same interval', function() {
      subject.interval.should.equal(stopwatch.interval);
    });
  });
  
  describe('when the time ends', function() {
    it('should create a new instance', function(done) {
      stopwatch.start();
      stopwatch.on('end', function() {
        var subject = StopwatchManager.get(1, { seconds: 10, interval: 2000 });
        subject.seconds.should.equal(10);
        subject.interval.should.equal(2000);
        done();
      });
    });

  });
});
