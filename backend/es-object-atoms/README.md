---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30460221008700f15382d7a11d72ddc3ee80d7b7ccdef75dba6dae9233f15712ea5c945ff8022100a60a727e52ac614107d438c10577ca2642bbb800c8ab3d963bc7b774a1afa0ef
    ReservedCode2: 304402201bfd22a7476cd811bdba309a360214c0ebe35f043852c05896f340b6e699dc270220762890e55dd559cd1e8e187740b84724f7925e8a929a65bc51eee0f3f3d855c4
---

# es-object-atoms <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

ES Object-related atoms: Object, ToObject, RequireObjectCoercible.

## Example

```js
const assert = require('assert');

const $Object = require('es-object-atoms');
const isObject = require('es-object-atoms/isObject');
const ToObject = require('es-object-atoms/ToObject');
const RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

assert.equal($Object, Object);
assert.throws(() => ToObject(null), TypeError);
assert.throws(() => ToObject(undefined), TypeError);
assert.throws(() => RequireObjectCoercible(null), TypeError);
assert.throws(() => RequireObjectCoercible(undefined), TypeError);

assert.equal(isObject(undefined), false);
assert.equal(isObject(null), false);
assert.equal(isObject({}), true);
assert.equal(isObject([]), true);
assert.equal(isObject(function () {}), true);

assert.deepEqual(RequireObjectCoercible(true), true);
assert.deepEqual(ToObject(true), Object(true));

const obj = {};
assert.equal(RequireObjectCoercible(obj), obj);
assert.equal(ToObject(obj), obj);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

## Security

Please email [@ljharb](https://github.com/ljharb) or see https://tidelift.com/security if you have a potential security vulnerability to report.

[package-url]: https://npmjs.org/package/es-object-atoms
[npm-version-svg]: https://versionbadg.es/ljharb/es-object-atoms.svg
[deps-svg]: https://david-dm.org/ljharb/es-object-atoms.svg
[deps-url]: https://david-dm.org/ljharb/es-object-atoms
[dev-deps-svg]: https://david-dm.org/ljharb/es-object-atoms/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/es-object-atoms#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/es-object-atoms.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/es-object-atoms.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/es-object.svg
[downloads-url]: https://npm-stat.com/charts.html?package=es-object-atoms
[codecov-image]: https://codecov.io/gh/ljharb/es-object-atoms/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/es-object-atoms/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/es-object-atoms
[actions-url]: https://github.com/ljharb/es-object-atoms/actions
