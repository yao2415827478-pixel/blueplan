---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100c53b0886d7fab079a0d9213409ef96c4676d008144522de9a27874c1f956d78e0220559907b24e923c67b95a43bde2171eb85f34fcda9f5c1d82ca7f48ff3151effd
    ReservedCode2: 3046022100c77a1696d70e7a155f2669e15b9142470ef1d7e8f1ee262105feb8dc3842a174022100d461f5ff3a19d7bebde12a30ec9833c10dfca201d92eb979552929304d77e631
---

# statuses

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![OpenSSF Scorecard Badge][ossf-scorecard-badge]][ossf-scorecard-visualizer]

HTTP status utility for node.

This module provides a list of status codes and messages sourced from
a few different projects:

  * The [IANA Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
  * The [Node.js project](https://nodejs.org/)
  * The [NGINX project](https://www.nginx.com/)
  * The [Apache HTTP Server project](https://httpd.apache.org/)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install statuses
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var status = require('statuses')
```

### status(code)

Returns the status message string for a known HTTP status code. The code
may be a number or a string. An error is thrown for an unknown status code.

<!-- eslint-disable no-undef -->

```js
status(403) // => 'Forbidden'
status('403') // => 'Forbidden'
status(306) // throws
```

### status(msg)

Returns the numeric status code for a known HTTP status message. The message
is case-insensitive. An error is thrown for an unknown status message.

<!-- eslint-disable no-undef -->

```js
status('forbidden') // => 403
status('Forbidden') // => 403
status('foo') // throws
```

### status.codes

Returns an array of all the status codes as `Integer`s.

### status.code[msg]

Returns the numeric status code for a known status message (in lower-case),
otherwise `undefined`.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status['not found'] // => 404
```

### status.empty[code]

Returns `true` if a status code expects an empty body.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.empty[200] // => undefined
status.empty[204] // => true
status.empty[304] // => true
```

### status.message[code]

Returns the string message for a known numeric status code, otherwise
`undefined`. This object is the same format as the
[Node.js http module `http.STATUS_CODES`](https://nodejs.org/dist/latest/docs/api/http.html#http_http_status_codes).

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.message[404] // => 'Not Found'
```

### status.redirect[code]

Returns `true` if a status code is a valid redirect status.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.redirect[200] // => undefined
status.redirect[301] // => true
```

### status.retry[code]

Returns `true` if you should retry the rest.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.retry[501] // => undefined
status.retry[503] // => true
```

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/jshttp/statuses/master?label=ci
[ci-url]: https://github.com/jshttp/statuses/actions?query=workflow%3Aci
[coveralls-image]: https://badgen.net/coveralls/c/github/jshttp/statuses/master
[coveralls-url]: https://coveralls.io/r/jshttp/statuses?branch=master
[node-version-image]: https://badgen.net/npm/node/statuses
[node-version-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/statuses
[npm-url]: https://npmjs.org/package/statuses
[npm-version-image]: https://badgen.net/npm/v/statuses
[ossf-scorecard-badge]: https://api.securityscorecards.dev/projects/github.com/jshttp/statuses/badge
[ossf-scorecard-visualizer]: https://kooltheba.github.io/openssf-scorecard-api-visualizer/#/projects/github.com/jshttp/statuses
