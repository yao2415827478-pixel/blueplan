---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022049c9901560b2d2e47e921497c56bec380e8171e8fd3f1bda50ea03097ef02da8022100c7b6d1a1395bc71bb1cc8486e9c52af15158130e7d2536f4c8dc1d7fa2b603a4
    ReservedCode2: 30450220207889b7820b14345c392036834cd13872cb936ca6667f88dbb3c220f1a9c4670221009d245a37c24690a038ce28c0310fd930e240866663a7e44b307452d0e674be7a
---

# unpipe

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Unpipe a stream from all destinations.

## Installation

```sh
$ npm install unpipe
```

## API

```js
var unpipe = require('unpipe')
```

### unpipe(stream)

Unpipes all destinations from a given stream. With stream 2+, this is
equivalent to `stream.unpipe()`. When used with streams 1 style streams
(typically Node.js 0.8 and below), this module attempts to undo the
actions done in `stream.pipe(dest)`.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/unpipe.svg
[npm-url]: https://npmjs.org/package/unpipe
[node-image]: https://img.shields.io/node/v/unpipe.svg
[node-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/stream-utils/unpipe.svg
[travis-url]: https://travis-ci.org/stream-utils/unpipe
[coveralls-image]: https://img.shields.io/coveralls/stream-utils/unpipe.svg
[coveralls-url]: https://coveralls.io/r/stream-utils/unpipe?branch=master
[downloads-image]: https://img.shields.io/npm/dm/unpipe.svg
[downloads-url]: https://npmjs.org/package/unpipe
