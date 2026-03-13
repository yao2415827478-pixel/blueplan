---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022020ee08a31f553a2400e9c41712efb532a7f1af0756f19ec9ddf1a067b9174956022100fde5ac9a419e60b4bf03c8e73faf14795f5deced626240f0b07f74efe0ff0bf7
    ReservedCode2: 30450221009c1e7ff40f058a4fc6ad6119fdb3e67443c3eb7ca0d91604f85593fe91deb63702201b24d4b27f938281a992cb4a3c3c15b4575c79c8d6734fd63acb1036a1dd424e
---

# forwarded

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Parse HTTP X-Forwarded-For header

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install forwarded
```

## API

```js
var forwarded = require('forwarded')
```

### forwarded(req)

```js
var addresses = forwarded(req)
```

Parse the `X-Forwarded-For` header from the request. Returns an array
of the addresses, including the socket address for the `req`, in reverse
order (i.e. index `0` is the socket address and the last index is the
furthest address, typically the end-user).

## Testing

```sh
$ npm test
```

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/jshttp/forwarded/master?label=ci
[ci-url]: https://github.com/jshttp/forwarded/actions?query=workflow%3Aci
[npm-image]: https://img.shields.io/npm/v/forwarded.svg
[npm-url]: https://npmjs.org/package/forwarded
[node-version-image]: https://img.shields.io/node/v/forwarded.svg
[node-version-url]: https://nodejs.org/en/download/
[coveralls-image]: https://img.shields.io/coveralls/jshttp/forwarded/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/forwarded?branch=master
[downloads-image]: https://img.shields.io/npm/dm/forwarded.svg
[downloads-url]: https://npmjs.org/package/forwarded
