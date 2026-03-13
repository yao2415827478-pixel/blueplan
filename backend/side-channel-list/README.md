---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100b89ea5922a9fac710d323e9c261cca0292815587089d5c1855632499dc0fb4710221009c67f802635ab134bd791fbe24bd39350aa9190176a255454a1592a02b3e1afd
    ReservedCode2: 3046022100b3fd976d7d4be923be694b6d051bb9d433dd18ccb7f13ea934cf27717e0df95b02210095a4de2f5bc7655f19ac52fe8b72faa164b77f8938cd1993ad48e9a3ef70ddcf
---

# side-channel-list <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Store information about any JS value in a side channel, using a linked list.

Warning: this implementation will leak memory until you `delete` the `key`.
Use [`side-channel`](https://npmjs.com/side-channel) for the best available strategy.

## Getting started

```sh
npm install --save side-channel-list
```

## Usage/Examples

```js
const assert = require('assert');
const getSideChannelList = require('side-channel-list');

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

[package-url]: https://npmjs.org/package/side-channel-list
[npm-version-svg]: https://versionbadg.es/ljharb/side-channel-list.svg
[deps-svg]: https://david-dm.org/ljharb/side-channel-list.svg
[deps-url]: https://david-dm.org/ljharb/side-channel-list
[dev-deps-svg]: https://david-dm.org/ljharb/side-channel-list/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/side-channel-list#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/side-channel-list.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/side-channel-list.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/side-channel-list.svg
[downloads-url]: https://npm-stat.com/charts.html?package=side-channel-list
[codecov-image]: https://codecov.io/gh/ljharb/side-channel-list/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/side-channel-list/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/side-channel-list
[actions-url]: https://github.com/ljharb/side-channel-list/actions
