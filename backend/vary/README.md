---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30450220103baa15513aa0030202da6bca57ecdd9470b9628b324246faf51bcfa034e52c0221008c35e2e14b8d6004930e68c3db7951b9bba1cbd3c7b34555a347b42a0907bd9a
    ReservedCode2: 304502205ba3c710a5671975846974887459ab80f417ab264713ce8f035c4a66533bac9c022100b50f7d78355982f0406c771754e8b335b582176a93e5f84406743e1f7d3d205b
---

# vary

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Manipulate the HTTP Vary header

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally): 

```sh
$ npm install vary
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var vary = require('vary')
```

### vary(res, field)

Adds the given header `field` to the `Vary` response header of `res`.
This can be a string of a single field, a string of a valid `Vary`
header, or an array of multiple fields.

This will append the header if not already listed, otherwise leaves
it listed in the current location.

<!-- eslint-disable no-undef -->

```js
// Append "Origin" to the Vary header of the response
vary(res, 'Origin')
```

### vary.append(header, field)

Adds the given header `field` to the `Vary` response header string `header`.
This can be a string of a single field, a string of a valid `Vary` header,
or an array of multiple fields.

This will append the header if not already listed, otherwise leaves
it listed in the current location. The new header string is returned.

<!-- eslint-disable no-undef -->

```js
// Get header string appending "Origin" to "Accept, User-Agent"
vary.append('Accept, User-Agent', 'Origin')
```

## Examples

### Updating the Vary header when content is based on it

```js
var http = require('http')
var vary = require('vary')

http.createServer(function onRequest (req, res) {
  // about to user-agent sniff
  vary(res, 'User-Agent')

  var ua = req.headers['user-agent'] || ''
  var isMobile = /mobi|android|touch|mini/i.test(ua)

  // serve site, depending on isMobile
  res.setHeader('Content-Type', 'text/html')
  res.end('You are (probably) ' + (isMobile ? '' : 'not ') + 'a mobile user')
})
```

## Testing

```sh
$ npm test
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/vary.svg
[npm-url]: https://npmjs.org/package/vary
[node-version-image]: https://img.shields.io/node/v/vary.svg
[node-version-url]: https://nodejs.org/en/download
[travis-image]: https://img.shields.io/travis/jshttp/vary/master.svg
[travis-url]: https://travis-ci.org/jshttp/vary
[coveralls-image]: https://img.shields.io/coveralls/jshttp/vary/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/vary
[downloads-image]: https://img.shields.io/npm/dm/vary.svg
[downloads-url]: https://npmjs.org/package/vary
