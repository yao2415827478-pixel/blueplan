---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100d1b9d9cc96f08282d3e4a70538231a04a3d9641788acfe93d9ffcd1ff923fa65022077c2fe63188da38d568b09bf83b11d2ff331208eebc009bc9d70676f1b2fbd2f
    ReservedCode2: 304402204ae2565b65a67f9c89f4949c053b9465d24d77dc546beec5901c8b78510aa9f102202e3ddeb227a4b88dbbea3b515bd805f84df8c51c921f703f889058430d815302
---

# Path-to-RegExp

Turn an Express-style path string such as `/user/:name` into a regular expression.

**Note:** This is a legacy branch. You should upgrade to `1.x`.

## Usage

```javascript
var pathToRegexp = require('path-to-regexp');
```

### pathToRegexp(path, keys, options)

 - **path** A string in the express format, an array of such strings, or a regular expression
 - **keys** An array to be populated with the keys present in the url.  Once the function completes, this will be an array of strings.
 - **options**
   - **options.sensitive** Defaults to false, set this to true to make routes case sensitive
   - **options.strict** Defaults to false, set this to true to make the trailing slash matter.
   - **options.end** Defaults to true, set this to false to only match the prefix of the URL.

```javascript
var keys = [];
var exp = pathToRegexp('/foo/:bar', keys);
//keys = ['bar']
//exp = /^\/foo\/(?:([^\/]+?))\/?$/i
```

## Live Demo

You can see a live demo of this library in use at [express-route-tester](http://forbeslindesay.github.com/express-route-tester/).

## License

  MIT
