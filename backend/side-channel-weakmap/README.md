---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100a0d0da890cd754b3a5475b4f57b03adabb47b7324ea1638e2af384e80faae5a4022041194fe18b71d44316c60460b1e5e3d2f764df029f44d156d1f631f43dad6040
    ReservedCode2: 3045022015626d54359615eb21284444897b758efcf7788ae28837c916acaa1d6bd579df0221008fa7a9a105ece86ce8b4179cd5ae1bd3dbd842df88524d0423743177d355f58a
---

# side-channel-weakmap <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Store information about any JS value in a side channel. Uses WeakMap if available.

Warning: this implementation will leak memory until you `delete` the `key`.
Use [`side-channel`](https://npmjs.com/side-channel) for the best available strategy.

## Getting started

```sh
npm install --save side-channel-weakmap
```

## Usage/Examples

```js
const assert = require('assert');
const getSideChannelList = require('side-channel-weakmap');

const channel = getSideChannelList();

const key = {};
assert.equal(channel.has(key), false);
assert.throws(() => channel.assert(key), TypeError);

channel.set(key, 42);

channel.assert(key); // does not throw
assert.equal(channel.has(key), true);
assert.equal(channel.get(key), 42);

channel.delete(key);
assert.equal(channel.has(key), false);
assert.throws(() => channel.assert(key), TypeError);
```

## Tests

Clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/side-channel-weakmap
[npm-version-svg]: https://versionbadg.es/ljharb/side-channel-weakmap.svg
[deps-svg]: https://david-dm.org/ljharb/side-channel-weakmap.svg
[deps-url]: https://david-dm.org/ljharb/side-channel-weakmap
[dev-deps-svg]: https://david-dm.org/ljharb/side-channel-weakmap/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/side-channel-weakmap#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/side-channel-weakmap.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/side-channel-weakmap.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/side-channel-weakmap.svg
[downloads-url]: https://npm-stat.com/charts.html?package=side-channel-weakmap
[codecov-image]: https://codecov.io/gh/ljharb/side-channel-weakmap/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/side-channel-weakmap/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/side-channel-weakmap
[actions-url]: https://github.com/ljharb/side-channel-weakmap/actions
