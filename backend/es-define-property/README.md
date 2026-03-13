---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e6cd183c25a7a02a0dcd106fef3241b4f5d8df3d2505e38481c97e4bdd79cbf6022003e24d9beeb0c6b218329243ff45d5282a3397f79e4831769d4a845daea416a4
    ReservedCode2: 3046022100d2ead20e16f8a12395cd02d58eb2a55792418df1d282e4531dceac6fffa3e6e60221009a3d0059d73dbd019319bf556de38a53782ae8ac972ca2a0b725aa050d6adb3c
---

# es-define-property <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

`Object.defineProperty`, but not IE 8's broken one.

## Example

```js
const assert = require('assert');

const $defineProperty = require('es-define-property');

if ($defineProperty) {
    assert.equal($defineProperty, Object.defineProperty);
} else if (Object.defineProperty) {
    assert.equal($defineProperty, false, 'this is IE 8');
} else {
    assert.equal($defineProperty, false, 'this is an ES3 engine');
}
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

## Security

Please email [@ljharb](https://github.com/ljharb) or see https://tidelift.com/security if you have a potential security vulnerability to report.

[package-url]: https://npmjs.org/package/es-define-property
[npm-version-svg]: https://versionbadg.es/ljharb/es-define-property.svg
[deps-svg]: https://david-dm.org/ljharb/es-define-property.svg
[deps-url]: https://david-dm.org/ljharb/es-define-property
[dev-deps-svg]: https://david-dm.org/ljharb/es-define-property/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/es-define-property#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/es-define-property.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/es-define-property.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/es-define-property.svg
[downloads-url]: https://npm-stat.com/charts.html?package=es-define-property
[codecov-image]: https://codecov.io/gh/ljharb/es-define-property/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/es-define-property/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/es-define-property
[actions-url]: https://github.com/ljharb/es-define-property/actions
