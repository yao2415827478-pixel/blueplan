---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304602210087f64c8bed0433f6d4bbeb6da8d1b14ddb3e044486a7b1ece308998b4a50d6930221009980b0284769dd3eba549c2031cdb74649c6be3ec65028739c259fc6ae275016
    ReservedCode2: 304502206c2d5abfbaf487e5ec1dec36f395ea3598e450b7c362fdc7fbe84c2611a6865702210084d7c46e0e6069168c2f4ed95f7b77d27d475d04adf32dda14e6d4515e9e7490
---

# gopd <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

`Object.getOwnPropertyDescriptor`, but accounts for IE's broken implementation.

## Usage

```javascript
var gOPD = require('gopd');
var assert = require('assert');

if (gOPD) {
	assert.equal(typeof gOPD, 'function', 'descriptors supported');
	// use gOPD like Object.getOwnPropertyDescriptor here
} else {
	assert.ok(!gOPD, 'descriptors not supported');
}
```

[package-url]: https://npmjs.org/package/gopd
[npm-version-svg]: https://versionbadg.es/ljharb/gopd.svg
[deps-svg]: https://david-dm.org/ljharb/gopd.svg
[deps-url]: https://david-dm.org/ljharb/gopd
[dev-deps-svg]: https://david-dm.org/ljharb/gopd/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/gopd#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/gopd.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/gopd.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/gopd.svg
[downloads-url]: https://npm-stat.com/charts.html?package=gopd
[codecov-image]: https://codecov.io/gh/ljharb/gopd/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/gopd/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/gopd
[actions-url]: https://github.com/ljharb/gopd/actions
