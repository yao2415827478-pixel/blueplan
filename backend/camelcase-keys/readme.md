---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100cb9c1da9ca6931824130f2ddb871f28d2a27510393b9bd32b8de084711e53416022100e9b1259917fb9bf79a8ad3bfdcf33f475021fb35b547bc28d55f3ce51fc48f2d
    ReservedCode2: 3046022100958123fa035a66cde513cd5cb4326b4f869d2de4a20fcdceea1c95f1268124d3022100860ea747a696f45e01613faa9de2802b8f740f2ae681d659b76958845c790aad
---

# camelcase-keys [![Build Status](https://travis-ci.org/sindresorhus/camelcase-keys.svg?branch=master)](https://travis-ci.org/sindresorhus/camelcase-keys)

> Convert object keys to camelCase using [`camelcase`](https://github.com/sindresorhus/camelcase)


## Install

```
$ npm install --save camelcase-keys
```


## Usage

```js
const camelcaseKeys = require('camelcase-keys');

// Convert an object
camelcaseKeys({'foo-bar': true});
//=> {fooBar: true}

// Convert an array of objects
camelcaseKeys([{'foo-bar': true}, {'bar-foo': false}]);
//=> [{fooBar: true}, {barFoo: false}]

camelcaseKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true});
//=> {fooBar: true, nested: {unicornRainbow: true}}
```

```js
const camelcaseKeys = require('camelcase-keys');

const argv = require('minimist')(process.argv.slice(2));
//=> {_: [], 'foo-bar': true}

camelcaseKeys(argv);
//=> {_: [], fooBar: true}
```


## API

### camelcaseKeys(input, [options])

#### input

Type: `Object` `Object[]`

Object or array of objects to camelCase.

#### options

Type: `Object`

##### exclude

Type: `string[]` `RegExp[]`<br>
Default: `[]`

Exclude keys from being camelCased.

##### deep

Type: `boolean`<br>
Default: `false`

Recurse nested objects and objects in arrays.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
