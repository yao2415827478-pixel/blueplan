---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e487461d3488043216c2fd2b4fe04952d53fbd124208cb276df128f990571bc60220558f675a554cda061ebbc147ef43026ec66c8dee12cd2dab0cbbafa3e11ded4b
    ReservedCode2: 304502205d3da33bcb558e14369829da4a90c880e748ec6ae692a17c621a2e7111a86fdb022100992d07d98397bb93449a4c9330b64f205aaa84ca09ad9b879ba81fc18256bc60
---

# map-obj [![Build Status](https://travis-ci.org/sindresorhus/map-obj.svg?branch=master)](https://travis-ci.org/sindresorhus/map-obj)

> Map object keys and values into a new object


## Install

```
$ npm install --save map-obj
```


## Usage

```js
const mapObj = require('map-obj');

const newObject = mapObj({foo: 'bar'}, (key, value) => [value, key]);
//=> {bar: 'foo'}
```


## API

### mapObj(source, mapper, [options])

#### source

Type: `Object`

Source object to copy properties from.

#### mapper

Type: `Function`

Mapping function.

- It has signature `mapper(sourceKey, sourceValue, source)`.
- It must return a two item array: `[targetKey, targetValue]`.

#### deep

Type: `boolean`<br>
Default: `false`

Recurse nested objects and objects in arrays.

#### target

Type: `Object`<br>
Default: `{}`

Target object to map properties on to.


## Related

- [filter-obj](https://github.com/sindresorhus/filter-obj) - Filter object keys and values into a new object
- [object-assign](https://github.com/sindresorhus/object-assign) - Copy enumerable own properties from one or more source objects to a target object


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
