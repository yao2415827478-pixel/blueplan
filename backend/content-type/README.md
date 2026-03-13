---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100d5bb50fabdb3f6ecc42e2ff55e87047fe165ba20947634f8ca84f5a9b3a4f46e02207ad32e733c2390c3f58cfc54ae2024009939e6dac3e5d24503e2ea9f3115664c
    ReservedCode2: 304502206f6189972e501a163dbb40402288c25558e4e100076f79bdc6aa8379a22c8fcc022100cea91250c05529ec0682e31fe2bcb3c075ac0f6e72c71f726ca78f0622d58b5a
---

# content-type

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Create and parse HTTP Content-Type header according to RFC 7231

## Installation

```sh
$ npm install content-type
```

## API

```js
var contentType = require('content-type')
```

### contentType.parse(string)

```js
var obj = contentType.parse('image/svg+xml; charset=utf-8')
```

Parse a `Content-Type` header. This will return an object with the following
properties (examples are shown for the string `'image/svg+xml; charset=utf-8'`):

 - `type`: The media type (the type and subtype, always lower case).
   Example: `'image/svg+xml'`

 - `parameters`: An object of the parameters in the media type (name of parameter
   always lower case). Example: `{charset: 'utf-8'}`

Throws a `TypeError` if the string is missing or invalid.

### contentType.parse(req)

```js
var obj = contentType.parse(req)
```

Parse the `Content-Type` header from the given `req`. Short-cut for
`contentType.parse(req.headers['content-type'])`.

Throws a `TypeError` if the `Content-Type` header is missing or invalid.

### contentType.parse(res)

```js
var obj = contentType.parse(res)
```

Parse the `Content-Type` header set on the given `res`. Short-cut for
`contentType.parse(res.getHeader('content-type'))`.

Throws a `TypeError` if the `Content-Type` header is missing or invalid.

### contentType.format(obj)

```js
var str = contentType.format({
  type: 'image/svg+xml',
  parameters: { charset: 'utf-8' }
})
```

Format an object into a `Content-Type` header. This will return a string of the
content type for the given object with the following properties (examples are
shown that produce the string `'image/svg+xml; charset=utf-8'`):

 - `type`: The media type (will be lower-cased). Example: `'image/svg+xml'`

 - `parameters`: An object of the parameters in the media type (name of the
   parameter will be lower-cased). Example: `{charset: 'utf-8'}`

Throws a `TypeError` if the object contains an invalid type or parameter names.

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/jshttp/content-type/master?label=ci
[ci-url]: https://github.com/jshttp/content-type/actions/workflows/ci.yml
[coveralls-image]: https://badgen.net/coveralls/c/github/jshttp/content-type/master
[coveralls-url]: https://coveralls.io/r/jshttp/content-type?branch=master
[node-image]: https://badgen.net/npm/node/content-type
[node-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/content-type
[npm-url]: https://npmjs.org/package/content-type
[npm-version-image]: https://badgen.net/npm/v/content-type
