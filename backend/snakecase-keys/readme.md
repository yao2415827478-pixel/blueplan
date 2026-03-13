---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30440220470be58d435856a7c40b81aaa0469ec84cd9ed30d84e6300c7cd3680ae77a1420220525e81731d19d947ca2f1d6e5142417c126fefa512cd86a5b668c3cdf4d479ba
    ReservedCode2: 3046022100a72f01469ffe8cf9560dcee843b586ceb28b299eb0c0ec4b0731abcbba0567d4022100cd57f617cba814106b72c47b9098d881c61a33984ae50c55defc6a0591844a6c
---

# snakecase-keys [![Build Status](https://travis-ci.org/bendrucker/snakecase-keys.svg?branch=master)](https://travis-ci.org/bendrucker/snakecase-keys)

> Convert an object's keys to snake case


## Install

```
$ npm install --save snakecase-keys
```


## Usage

```js
var snakeCaseKeys = require('snakecase-keys')

snakeCaseKeys({fooBar: 'baz'})
//=> {foo_bar: 'baz'}

snakeCaseKeys({'foo-bar': true, nested: {fooBaz: 'bar'}});
//=> {foo_bar: true, nested: {foo_baz: 'bar'}}
```

## API

#### `snakeCaseKeys(obj, options)` -> `object`

##### obj

*Required*  
Type: `object`

An object to transform into snake case (keys only).

##### options

*Optional*  
Type: `object`

###### deep

Type: `boolean`  
Default: `true`

Enables snake-casing of keys in nested objects.

## Related

* [camelcase-keys](https://github.com/sindresorhus/camelcase-keys)

## License

MIT © [Ben Drucker](http://bendrucker.me)
