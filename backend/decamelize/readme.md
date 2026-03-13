---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100b5180a26b19a949c492fa8528e7b12edba888304fc489c1598459bb7c5f691e502205eedcf745e07531abc11e62fd2c3ea8e19f2cb1f687783c802e3f1ddce00cbf8
    ReservedCode2: 304502207e5cb48d742bebd8b360b810c8246a754a20d50554d16d2276e8cadbe414836f022100f4a0712f3504bfbf5cdde15c9ebcd295e815d165940bfc07bc4a5c1ff8329748
---

# decamelize [![Build Status](https://travis-ci.org/sindresorhus/decamelize.svg?branch=master)](https://travis-ci.org/sindresorhus/decamelize)

> Convert a camelized string into a lowercased one with a custom separator<br>
> Example: `unicornRainbow` → `unicorn_rainbow`


## Install

```
$ npm install decamelize
```


## Usage

```js
const decamelize = require('decamelize');

decamelize('unicornRainbow');
//=> 'unicorn_rainbow'

decamelize('unicornRainbow', '-');
//=> 'unicorn-rainbow'
```


## API

### decamelize(input, [separator])

#### input

Type: `string`

#### separator

Type: `string`<br>
Default: `_`


## Related

See [`camelcase`](https://github.com/sindresorhus/camelcase) for the inverse.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
