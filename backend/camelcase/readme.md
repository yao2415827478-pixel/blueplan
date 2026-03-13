---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022018413c86d8b2779b15c87788ad77557c83cdf8b8c6d7c05df7738885ea645b19022100d6363ee7fa5cf369b535127fa2f3c82543848db4855995f0cd419d638ad890a3
    ReservedCode2: 3046022100ea56ea16161617b3600f8fda664b2bf394131876e8da197081e5de752cf828b90221008f0e0a395080ec9a4872477d289a8e366d2954142dd6ff2625351fd6481a6778
---

# camelcase [![Build Status](https://travis-ci.org/sindresorhus/camelcase.svg?branch=master)](https://travis-ci.org/sindresorhus/camelcase)

> Convert a dash/dot/underscore/space separated string to camelCase: `foo-bar` → `fooBar`


## Install

```
$ npm install --save camelcase
```


## Usage

```js
const camelCase = require('camelcase');

camelCase('foo-bar');
//=> 'fooBar'

camelCase('foo_bar');
//=> 'fooBar'

camelCase('Foo-Bar');
//=> 'fooBar'

camelCase('--foo.bar');
//=> 'fooBar'

camelCase('__foo__bar__');
//=> 'fooBar'

camelCase('foo bar');
//=> 'fooBar'

console.log(process.argv[3]);
//=> '--foo-bar'
camelCase(process.argv[3]);
//=> 'fooBar'

camelCase('foo', 'bar');
//=> 'fooBar'

camelCase('__foo__', '--bar');
//=> 'fooBar'
```


## Related

- [decamelize](https://github.com/sindresorhus/decamelize) - The inverse of this module
- [uppercamelcase](https://github.com/SamVerschueren/uppercamelcase) - Like this module, but to PascalCase instead of camelCase


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
