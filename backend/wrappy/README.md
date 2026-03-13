---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502202936f6ce6f607fe08ce27d06a0231c02e776e730dc9f828b0147de1fc890b21a022100eeb0518de64c486ecb3de535225afc9eb6977bfe45a96f5491118022278703d4
    ReservedCode2: 3046022100e29c6d25a55ab4f7ccf21bffaded8ec6d6ebf4b3ca2c0959487e84cce86d3607022100af3c8af8ceb15a8b6777e1479d662674c98b84e8b95ebef08e26870f8be08d8d
---

# wrappy

Callback wrapping utility

## USAGE

```javascript
var wrappy = require("wrappy")

// var wrapper = wrappy(wrapperFunction)

// make sure a cb is called only once
// See also: http://npm.im/once for this specific use case
var once = wrappy(function (cb) {
  var called = false
  return function () {
    if (called) return
    called = true
    return cb.apply(this, arguments)
  }
})

function printBoo () {
  console.log('boo')
}
// has some rando property
printBoo.iAmBooPrinter = true

var onlyPrintOnce = once(printBoo)

onlyPrintOnce() // prints 'boo'
onlyPrintOnce() // does nothing

// random property is retained!
assert.equal(onlyPrintOnce.iAmBooPrinter, true)
```
