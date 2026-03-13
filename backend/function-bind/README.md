---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100d81e76c7bd42b9605b2e58701034a24d9e43a409f2ccf64467bdfdc6fda1a4ee022100b0a0a04cb03a4a136e8e3028ee617bdf7c96af9534eaaef75c1a82d55934f5a5
    ReservedCode2: 3045022100a4f622ac0f662556e8da5d2bfc3e8225f3dff7000e13f6377652f69b2f94ebdf02200a6851ecb5215308e21d9780c8e9ef451a85e69f97f1b9458a80af8b8e17c196
---

# function-bind <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
<!--[![coverage][codecov-image]][codecov-url]-->
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Implementation of function.prototype.bind

Old versions of phantomjs, Internet Explorer < 9, and node < 0.6 don't support `Function.prototype.bind`.

## Example

```js
Function.prototype.bind = require("function-bind")
```

## Installation

`npm install function-bind`

## Contributors

 - Raynos

## MIT Licenced

[package-url]: https://npmjs.org/package/function-bind
[npm-version-svg]: https://versionbadg.es/Raynos/function-bind.svg
[deps-svg]: https://david-dm.org/Raynos/function-bind.svg
[deps-url]: https://david-dm.org/Raynos/function-bind
[dev-deps-svg]: https://david-dm.org/Raynos/function-bind/dev-status.svg
[dev-deps-url]: https://david-dm.org/Raynos/function-bind#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/function-bind.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/function-bind.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/function-bind.svg
[downloads-url]: https://npm-stat.com/charts.html?package=function-bind
[codecov-image]: https://codecov.io/gh/Raynos/function-bind/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/Raynos/function-bind/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/Raynos/function-bind
[actions-url]: https://github.com/Raynos/function-bind/actions
