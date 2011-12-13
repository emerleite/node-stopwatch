[![Build Status](https://secure.travis-ci.org/emerleite/node-stopwatch.png)](http://travis-ci.org/emerleite/node-stopwatch])

Node.js stopwatch
=================
This project is a simple way to use a stopwatch. I've done some penny auction/bid sistems with stopwatches and also done a realtime social video visualization. These projects shares a core stopwatch logic and because it becomes hard to maintain I extracted it to this library. I hope it helps somebody else.

Dependencies
------------
Only has dev depencencies:

* mocha
* should

Instalation
-----------
> npm install stopwatch

Usuage
------
To create a stopwatch you only need a identifier and you can pass a hash with options with the stopwatch seconds. The default is 10 seconds.

```js
var Stopwatch = require('stopwatch').Stopwatch;

var stopwatch = new Stopwatch(1, { seconds: 60 });
stopwatch.on('tick', function(secondsLeft) {
  //when one second pass.
});
stopwatch.on('end', function() {
  //when the time ends
});
```

### Managed
If you want a managed instance (per identifier) you only need to require the module and use the get function.

```js
var StopwatchManager = require('stopwatch');

var stopwatch = StopwatchManager.get(1, {seconds: 10 });
stopwatch.on('tick', function(secondsLeft) {
  //when one second pass.
});
stopwatch.on('end', function() {
   //when the time ends
   //StopwatchManager also destroys the managed hash reference
});

//It will get the same instance
var stopwatchRecovered = StopwatchManager.get(1, {seconds: 10 });
```

If you invoke get with the same id, it will not create another instance, but use the same stored instance. When ends, it cleans the managed reference to prevent memory leaks by strong references.

### Examples
See the test folder. I'll write more example in a examples folder.

Running tests
-------------
To run the tests you need to install mocha and should. 
    npm install
    npm test
