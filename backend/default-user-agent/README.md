---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502205f2c6e50c946a8377e6248557d348716b68a72937d511b28cfd3b5440374a841022100befe792b0befede7623efd8ba3e3cb49f41040a08c9c7be8b202b2203d26061d
    ReservedCode2: 304602210082a9268b59724c805aa046ea75c4662e753f09b749902687328e922346562035022100ef1628e9af13c9fa1144290d93ecb4d5a986b18848a25e38ad69ec2c44162202
---

default-user-agent
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/default-user-agent.svg?style=flat-square
[npm-url]: https://npmjs.org/package/default-user-agent
[travis-image]: https://img.shields.io/travis/node-modules/default-user-agent.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/default-user-agent
[coveralls-image]: https://img.shields.io/coveralls/node-modules/default-user-agent.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/node-modules/default-user-agent?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat-square
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/node-modules/default-user-agent.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/default-user-agent
[download-image]: https://img.shields.io/npm/dm/default-user-agent.svg?style=flat-square
[download-url]: https://npmjs.org/package/default-user-agent

Default user agent string for Node.js http request

## Install

```bash
$ npm install default-user-agent
```

## Usage

```js
var ua = require('default-user-agent');

// darwin
console.log(ua()); // 'Node.js/0.11.15 (OS X Yosemite; x64)'
console.log(ua('urllib', '0.0.1')); // 'urllib/0.0.1 Node.js/0.11.15 (OS X Yosemite; x64)'

// linux
// 'Node.js/0.11.15 (Linux 3.13; x64)'
```

## License

[MIT](LICENSE.txt)
