---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502206d80ba3c44ea5bbcb2373c4c2550891af0b19b784b6a38b00bdc379d3a8a87bc022100f77a865eef31610edd5bd0e21669c550b60264a1b299714ba24ba4519fbf59b6
    ReservedCode2: 3045022100b6589fd8f5f427366b5223e2114c46d1c079ae8fa92d7317a5649933eb086c2b022055200032a5fb5a0eb83569c6d94bd623b87d6f280dd5dccbbc7e08beff73d9d1
---

# lodash v4.17.23

The [Lodash](https://lodash.com/) library exported as [Node.js](https://nodejs.org/) modules.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save lodash
```

In Node.js:
```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

See the [package source](https://github.com/lodash/lodash/tree/4.17.23-npm) for more details.

**Note:**<br>
Install [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## Support

Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.<br>
Automated [browser](https://saucelabs.com/u/lodash) & [CI](https://travis-ci.org/lodash/lodash/) test runs are available.
