[![Build Status](https://secure.travis-ci.org/emerleite/node-stopwatch.png)](http://travis-ci.org/emerleite/node-stopwatch)

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

To-Do
-----
* see (<https://github.com/emerleite/node-stopwatch/issues>)

Author
------

* Emerson Macedo (<http://codificando.com/> and <http://nodecasts.org>)

License:
--------

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
