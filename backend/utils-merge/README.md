---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210089bb4cae52716034f18b3cf204c872e86ae0f58275ea56fff95874d6c0272fcd022069714b9391f2751477734a8f3ff03f5a440d5ad7919372eccdca468eda787f9a
    ReservedCode2: 3046022100e8bcfcbfbe2df55bfca9f223be912fe600eff33f4b9d850c95bd89e89f92d03c02210081b58656f4f26000988f77202e7403076fe54bd87872f56cf8d34d46745e2bec
---

# utils-merge

[![Version](https://img.shields.io/npm/v/utils-merge.svg?label=version)](https://www.npmjs.com/package/utils-merge)
[![Build](https://img.shields.io/travis/jaredhanson/utils-merge.svg)](https://travis-ci.org/jaredhanson/utils-merge)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/utils-merge.svg?label=quality)](https://codeclimate.com/github/jaredhanson/utils-merge)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/utils-merge.svg)](https://coveralls.io/r/jaredhanson/utils-merge)
[![Dependencies](https://img.shields.io/david/jaredhanson/utils-merge.svg)](https://david-dm.org/jaredhanson/utils-merge)


Merges the properties from a source object into a destination object.

## Install

```bash
$ npm install utils-merge
```

## Usage

```javascript
var a = { foo: 'bar' }
  , b = { bar: 'baz' };

merge(a, b);
// => { foo: 'bar', bar: 'baz' }
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013-2017 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/utils-merge'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/utils-merge.svg' /></a>
