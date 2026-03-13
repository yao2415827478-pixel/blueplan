---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402207706332ccafd2e0e6326f157001fab21be670010fc2ef6f42592e1aac646414202200748b94721332a35b95a1bba8c5866468a4d40707c0dc32bc9eafaa2d11ced20
    ReservedCode2: 30450220745cc1e5c9431e32f542132aa7f9d816a4e4ac2e3f7da10dac81176b3f5e810f022100dd453a1277d8976d06fffaa259d995b76a71080f4ef38bf446ff9812f2e8254d
---

# has-symbols <sup>[![Version Badge][2]][1]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

Determine if the JS environment has Symbol support. Supports spec, or shams.

## Example

```js
var hasSymbols = require('has-symbols');

hasSymbols() === true; // if the environment has native Symbol support. Not polyfillable, not forgeable.

var hasSymbolsKinda = require('has-symbols/shams');
hasSymbolsKinda() === true; // if the environment has a Symbol sham that mostly follows the spec.
```

## Supported Symbol shams
 - get-own-property-symbols [npm](https://www.npmjs.com/package/get-own-property-symbols) | [github](https://github.com/WebReflection/get-own-property-symbols)
 - core-js [npm](https://www.npmjs.com/package/core-js) | [github](https://github.com/zloirock/core-js)

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/has-symbols
[2]: https://versionbadg.es/inspect-js/has-symbols.svg
[5]: https://david-dm.org/inspect-js/has-symbols.svg
[6]: https://david-dm.org/inspect-js/has-symbols
[7]: https://david-dm.org/inspect-js/has-symbols/dev-status.svg
[8]: https://david-dm.org/inspect-js/has-symbols#info=devDependencies
[11]: https://nodei.co/npm/has-symbols.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/has-symbols.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/has-symbols.svg
[downloads-url]: https://npm-stat.com/charts.html?package=has-symbols
[codecov-image]: https://codecov.io/gh/inspect-js/has-symbols/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/inspect-js/has-symbols/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-symbols
[actions-url]: https://github.com/inspect-js/has-symbols/actions
