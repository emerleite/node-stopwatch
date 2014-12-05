var EventEmitter = require('events').EventEmitter;
var stopwatches = {};

function Stopwatch(id, options) {
  EventEmitter.call(this);

  this.id = id;
  this.seconds = options.seconds || 10;
  this.interval = (options.interval || options.interval == 0) ? options.interval : 1000;
  this.timer = null;
}

Stopwatch.prototype.__proto__ = EventEmitter.prototype;

Stopwatch.prototype.stop = function() {
  clearInterval(this.timer);
  this.timer = null;
};

Stopwatch.prototype.start = function() {
  if (this.started()) { return false; }

  var self = this;

  self.timer = setInterval(function () {
    self.emit('tick', self.seconds);

    if (--self.seconds < 0) {
      self.stop();
      self.emit('end');
    }
  }, self.interval);

  return true;
};

Stopwatch.prototype.started = function() {
  return !!this.timer;
};

Stopwatch.prototype.restart = function() {
  this.stop();
  this.removeAllListeners('tick');
  this.removeAllListeners('end');
  this.start();
};

module.exports = {
  Stopwatch : Stopwatch,
  get: function(id, options) {
    if (!stopwatches[id]) {
      stopwatches[id] = new Stopwatch(id, options);
      stopwatches[id].on('end', function() {
        stopwatches[id] = null;
        delete stopwatches[id];
      });
    }
    return stopwatches[id];
  }
};
