---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30460221008462b382d8def8e225369410df9569e47dc284ef33b728ee4c1bfa34b1c92367022100a795c4371a7dfdc1f6ff1259c68cd28933e7cf3f1099867ff7f13cc84d293e74
    ReservedCode2: 30440220755c6073aff7e663709a9baf08dc42efc8e3c9fc985afdda34b06e59afeaae0f02203e2e929233c675acfe592f9977187d656ac81d18bc4e5f19fe5ec9738070f154
---

# mime-types

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]

The ultimate javascript content-type utility.

Similar to [the `mime@1.x` module](https://www.npmjs.com/package/mime), except:

- __No fallbacks.__ Instead of naively returning the first available type,
  `mime-types` simply returns `false`, so do
  `var type = mime.lookup('unrecognized') || 'application/octet-stream'`.
- No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`.
- No `.define()` functionality
- Bug fixes for `.lookup(path)`

Otherwise, the API is compatible with `mime` 1.x.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install mime-types
```

## Adding Types

All mime types are based on [mime-db](https://www.npmjs.com/package/mime-db),
so open a PR there if you'd like to add mime types.

## API

```js
var mime = require('mime-types')
```

All functions return `false` if input is invalid or not found.

### mime.lookup(path)

Lookup the content-type associated with a file.

```js
mime.lookup('json') // 'application/json'
mime.lookup('.md') // 'text/markdown'
mime.lookup('file.html') // 'text/html'
mime.lookup('folder/file.js') // 'application/javascript'
mime.lookup('folder/.htaccess') // false

mime.lookup('cats') // false
```

### mime.contentType(type)

Create a full content-type header given a content-type or extension.
When given an extension, `mime.lookup` is used to get the matching
content-type, otherwise the given content-type is used. Then if the
content-type does not already have a `charset` parameter, `mime.charset`
is used to get the default charset and add to the returned content-type.

```js
mime.contentType('markdown') // 'text/x-markdown; charset=utf-8'
mime.contentType('file.json') // 'application/json; charset=utf-8'
mime.contentType('text/html') // 'text/html; charset=utf-8'
mime.contentType('text/html; charset=iso-8859-1') // 'text/html; charset=iso-8859-1'

// from a full path
mime.contentType(path.extname('/path/to/file.json')) // 'application/json; charset=utf-8'
```

### mime.extension(type)

Get the default extension for a content-type.

```js
mime.extension('application/octet-stream') // 'bin'
```

### mime.charset(type)

Lookup the implied default charset of a content-type.

```js
mime.charset('text/markdown') // 'UTF-8'
```

### var type = mime.types[extension]

A map of content-types by extension.

### [extensions...] = mime.extensions[type]

A map of extensions by content-type.

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/jshttp/mime-types/master?label=ci
[ci-url]: https://github.com/jshttp/mime-types/actions/workflows/ci.yml
[coveralls-image]: https://badgen.net/coveralls/c/github/jshttp/mime-types/master
[coveralls-url]: https://coveralls.io/r/jshttp/mime-types?branch=master
[node-version-image]: https://badgen.net/npm/node/mime-types
[node-version-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/mime-types
[npm-url]: https://npmjs.org/package/mime-types
[npm-version-image]: https://badgen.net/npm/v/mime-types
