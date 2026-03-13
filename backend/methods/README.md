---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100f8a8a040cac6c497c05119fbd632be6beef8cfc8f7cac3ff9c24103f209d32c0022100d892cd40e1ff5464b3790aea2c72650e1becffc69d39ee315ed77cacfb7ddcb1
    ReservedCode2: 3045022054a11965e62914b3bc3a0b6caf2ef72da95f27f382a130765c73a3c0a786aadf022100c73170419f765b1ab8339a164020071946a5b4b8fae138f6ca97835ee8214583
---

# Methods

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

HTTP verbs that Node.js core's HTTP parser supports.

This module provides an export that is just like `http.METHODS` from Node.js core,
with the following differences:

  * All method names are lower-cased.
  * Contains a fallback list of methods for Node.js versions that do not have a
    `http.METHODS` export (0.10 and lower).
  * Provides the fallback list when using tools like `browserify` without pulling
    in the `http` shim module.

## Install

```bash
$ npm install methods
```

## API

```js
var methods = require('methods')
```

### methods

This is an array of lower-cased method names that Node.js supports. If Node.js
provides the `http.METHODS` export, then this is the same array lower-cased,
otherwise it is a snapshot of the verbs from Node.js 0.10.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/methods.svg?style=flat
[npm-url]: https://npmjs.org/package/methods
[node-version-image]: https://img.shields.io/node/v/methods.svg?style=flat
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://img.shields.io/travis/jshttp/methods.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/methods
[coveralls-image]: https://img.shields.io/coveralls/jshttp/methods.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/methods?branch=master
[downloads-image]: https://img.shields.io/npm/dm/methods.svg?style=flat
[downloads-url]: https://npmjs.org/package/methods
