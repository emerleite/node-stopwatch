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
To create a stopwatch you only need a identifier and you can pass a hash with options with the stopwatch seconds and the interval (in miliseonds) if you want to reduce your stopwatch interval. The default is 1000 miliseconds (or 1 second).
> var Stopwatch = require('stopwatch').Stopwatch;
> var stopwatch = new Stopwatch(1, { seconds: 60, interval:10 });
> stopwatch.on('tick', function(secondsLeft) {
>   //when one second pass.
> });
> stopwatch.on('end, function() {
>   //when the time ends
> });

### Managed
If you want a managed instance you only need to require the module and use the get function.
> var StopwatchManager = require('stopwatch');
> var stopwatch = StopwatchManager.get(1, {seconds: 1, interval: 0});
> stopwatch.on('tick', function(secondsLeft) {
>   //when one second pass.
> });
> stopwatch.on('end, function() {
>   //when the time ends
> });


### Examples
See the test folder. I'll write more example in a examples folder.

Running tests
-------------
To run the tests you need to install mocha and should. 
> npm install
> npm test
