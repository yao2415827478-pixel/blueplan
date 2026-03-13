---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100d00b531146d4d34242089f843d5008771e80e49e91e7a69bf403d3c618e3713d022100bf24b5d9172f47aeb137bac6259e63aadca1501682b58c42e2f065404dba3845
    ReservedCode2: 304602210086fa24fc659f5327a3013ed7286984c7ff296a94e33286a022d1b3b6cdf3a16b022100d47d5d783cf5c99ee150555dc32481e1ccd32befd773dbe474c058a3992f1713
---

humanize-ms
---------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/humanize-ms.svg?style=flat
[npm-url]: https://npmjs.org/package/humanize-ms
[travis-image]: https://img.shields.io/travis/node-modules/humanize-ms.svg?style=flat
[travis-url]: https://travis-ci.org/node-modules/humanize-ms
[coveralls-image]: https://img.shields.io/coveralls/node-modules/humanize-ms.svg?style=flat
[coveralls-url]: https://coveralls.io/r/node-modules/humanize-ms?branch=master
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat
[gittip-url]: https://www.gittip.com/dead-horse/
[david-image]: https://img.shields.io/david/node-modules/humanize-ms.svg?style=flat
[david-url]: https://david-dm.org/node-modules/humanize-ms

transform humanize time to ms

## Installation

```bash
$ npm install humanize-ms
```

## Examples

```js
var ms = require('humanize-ms');

ms('1s') // 1000
ms(1000) // 1000
```

### License

MIT
