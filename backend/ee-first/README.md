---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210083aed42737553710b72116c386347a7570162ad32bfee653cde2a72eca59b36c02205bdff42b0e4e5c4e12101f1e7edf2b8be4e20e13d30e1d82b2f59b0c7367c6ef
    ReservedCode2: 304602210084fc4a92306db77219af7e8ca93e8c9c663256d6ff91730d8231eae5e78ab4920221009593527853c1a4ca55be25887d935b2d8a410ad9732605f492236b64377100c1
---

# EE First

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Get the first event in a set of event emitters and event pairs,
then clean up after itself.

## Install

```sh
$ npm install ee-first
```

## API

```js
var first = require('ee-first')
```

### first(arr, listener)

Invoke `listener` on the first event from the list specified in `arr`. `arr` is
an array of arrays, with each array in the format `[ee, ...event]`. `listener`
will be called only once, the first time any of the given events are emitted. If
`error` is one of the listened events, then if that fires first, the `listener`
will be given the `err` argument.

The `listener` is invoked as `listener(err, ee, event, args)`, where `err` is the
first argument emitted from an `error` event, if applicable; `ee` is the event
emitter that fired; `event` is the string event name that fired; and `args` is an
array of the arguments that were emitted on the event.

```js
var ee1 = new EventEmitter()
var ee2 = new EventEmitter()

first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error']
], function (err, ee, event, args) {
  // listener invoked
})
```

#### .cancel()

The group of listeners can be cancelled before being invoked and have all the event
listeners removed from the underlying event emitters.

```js
var thunk = first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error']
], function (err, ee, event, args) {
  // listener invoked
})

// cancel and clean up
thunk.cancel()
```

[npm-image]: https://img.shields.io/npm/v/ee-first.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ee-first
[github-tag]: http://img.shields.io/github/tag/jonathanong/ee-first.svg?style=flat-square
[github-url]: https://github.com/jonathanong/ee-first/tags
[travis-image]: https://img.shields.io/travis/jonathanong/ee-first.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/ee-first
[coveralls-image]: https://img.shields.io/coveralls/jonathanong/ee-first.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jonathanong/ee-first?branch=master
[license-image]: http://img.shields.io/npm/l/ee-first.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/ee-first.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/ee-first
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
