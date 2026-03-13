---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402205b6d261bce567e26e9fa292aa4ce48a10982eaaf490543e413867493e0cbe56802206565785b36661ee9121fe956e32f8415c028f37da98bd39b4ab274b7e70511a8
    ReservedCode2: 304502210080c56fb80bf549707cc42981274ca6466385c78a4b76039e7da8dd10656844d2022047c8b9249c9b540ad33f5037fb697a437a8ca4bdb9dd6f96b4a3215a72356481
---

# hasown <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

A robust, ES3 compatible, "has own property" predicate.

## Example

```js
const assert = require('assert');
const hasOwn = require('hasown');

assert.equal(hasOwn({}, 'toString'), false);
assert.equal(hasOwn([], 'length'), true);
assert.equal(hasOwn({ a: 42 }, 'a'), true);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/hasown
[npm-version-svg]: https://versionbadg.es/inspect-js/hasown.svg
[deps-svg]: https://david-dm.org/inspect-js/hasOwn.svg
[deps-url]: https://david-dm.org/inspect-js/hasOwn
[dev-deps-svg]: https://david-dm.org/inspect-js/hasOwn/dev-status.svg
[dev-deps-url]: https://david-dm.org/inspect-js/hasOwn#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/hasown.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/hasown.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/hasown.svg
[downloads-url]: https://npm-stat.com/charts.html?package=hasown
[codecov-image]: https://codecov.io/gh/inspect-js/hasOwn/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/inspect-js/hasOwn/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/hasOwn
[actions-url]: https://github.com/inspect-js/hasOwn/actions
