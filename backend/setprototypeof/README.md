---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100c688544cd6e5d22b92ee6f9f5b7d24ca33e675ca718bac1a2ffb4f5556b228d70220085f1b4980e5c4462c249f01dae0d3ed91d4d7c6498d2dcb28fe51c7bc5ce31b
    ReservedCode2: 3046022100a5125c21c673b7812b99340eecdc69a2d2cddee5dadfd5f57c1ce0ec82059c6b022100e536b8556c7d0787ded282591fdf6892fc899653e921353f461b4e78d4d48986
---

# Polyfill for `Object.setPrototypeOf`

[![NPM Version](https://img.shields.io/npm/v/setprototypeof.svg)](https://npmjs.org/package/setprototypeof)
[![NPM Downloads](https://img.shields.io/npm/dm/setprototypeof.svg)](https://npmjs.org/package/setprototypeof)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

A simple cross platform implementation to set the prototype of an instianted object.  Supports all modern browsers and at least back to IE8.

## Usage:

```
$ npm install --save setprototypeof
```

```javascript
var setPrototypeOf = require('setprototypeof')

var obj = {}
setPrototypeOf(obj, {
  foo: function () {
    return 'bar'
  }
})
obj.foo() // bar
```

TypeScript is also supported:

```typescript
import setPrototypeOf from 'setprototypeof'
```
