---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100a1c260c08a1e1db538edad2c0de01e2b8aa30518028634405cb7262efea11c9302204207c8a4db144ceb7346c25632517975774b921689d21f96f02253be04aa7b94
    ReservedCode2: 3045022100a774c4de9d0f876f065ef4ee3985245843071cdbd26759fe375dca178447551b02202e8b12bcd9b8192038cbc255f50ce05bc5392843161605caf45fce933e1abb82
---

# dunder-proto <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

If available, the `Object.prototype.__proto__` accessor and mutator, call-bound.

## Getting started

```sh
npm install --save dunder-proto
```

## Usage/Examples

```js
const assert = require('assert');
const getDunder = require('dunder-proto/get');
const setDunder = require('dunder-proto/set');

const obj = {};

assert.equal('toString' in obj, true);
assert.equal(getDunder(obj), Object.prototype);

setDunder(obj, null);

assert.equal('toString' in obj, false);
assert.equal(getDunder(obj), null);
```

## Tests

Clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/dunder-proto
[npm-version-svg]: https://versionbadg.es/es-shims/dunder-proto.svg
[deps-svg]: https://david-dm.org/es-shims/dunder-proto.svg
[deps-url]: https://david-dm.org/es-shims/dunder-proto
[dev-deps-svg]: https://david-dm.org/es-shims/dunder-proto/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/dunder-proto#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/dunder-proto.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/dunder-proto.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/dunder-proto.svg
[downloads-url]: https://npm-stat.com/charts.html?package=dunder-proto
[codecov-image]: https://codecov.io/gh/es-shims/dunder-proto/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/dunder-proto/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/dunder-proto
[actions-url]: https://github.com/es-shims/dunder-proto/actions
