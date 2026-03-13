---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100c067f7404a65abf82d86db82747d63b46c0a5e3c383a9a9fc997d25c2516ff170220499e2afd99943fa73ba5c494b83ade7022e52a42775ef7dfd9338e7df2c8693c
    ReservedCode2: 3046022100dc2edd0f8c04dc726459a0cb9f938aff062f8d03187da15848b4680b084a0f9b022100e9ddd4d8c5ed94f09c79ab91ef8fd0610f26ddd0ecba565f3995b01af2c18f72
---

# merge-descriptors

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Merge objects using descriptors.

```js
var thing = {
  get name() {
    return 'jon'
  }
}

var animal = {

}

merge(animal, thing)

animal.name === 'jon'
```

## API

### merge(destination, source)

Redefines `destination`'s descriptors with `source`'s. The return value is the
`destination` object.

### merge(destination, source, false)

Defines `source`'s descriptors on `destination` if `destination` does not have
a descriptor by the same name. The return value is the `destination` object.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/merge-descriptors.svg
[npm-url]: https://npmjs.org/package/merge-descriptors
[travis-image]: https://img.shields.io/travis/component/merge-descriptors/master.svg
[travis-url]: https://travis-ci.org/component/merge-descriptors
[coveralls-image]: https://img.shields.io/coveralls/component/merge-descriptors/master.svg
[coveralls-url]: https://coveralls.io/r/component/merge-descriptors?branch=master
[downloads-image]: https://img.shields.io/npm/dm/merge-descriptors.svg
[downloads-url]: https://npmjs.org/package/merge-descriptors
