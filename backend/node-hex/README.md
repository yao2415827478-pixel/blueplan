---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402201158840aa85e7eb01ae47ab8b4f1b98fece67fb6de6eeeae28a1230e4bff9c17022045bcb879ba2597ffb8c32eba0b0858cf4083e484a611961c17c687caaf9dbcef
    ReservedCode2: 30440220177d24b34e7274a710ec0968680c64980057529d2beda4b66a30eff57c289505022010b3d5473731e77b72930742f1c896dd951db313a096ea72ade9c5630b002ec4
---

node-hex
===

> forked from https://github.com/gagle/node-hex, return hex string instead of print to stdout

#### Pretty-prints a Buffer ####

[![npm][npm-image]][npm-url]

___module_(buffer) : undefined__  
Prints the Buffer. No configuration, just give it a Buffer.

```javascript
var hex = require('hex');

console.log(hex(buffer));
```

```
Offset   00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F

000000   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF   ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
000010   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF   ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
000020   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF   ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
000030   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF   ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
000040   54 41 47 42 72 65 61 6B 69 6E 67 20 54 68 65 20   TAGBreaking The
000050   4C 61 77 00 00 00 00 00 00 00 00 00 00 00 00 00   Law.............
000060   00 4A 75 64 61 73 20 50 72 69 65 73 74 00 00 00   .Judas Priest...
000070   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 42   ...............B
000080   72 69 74 69 73 68 20 53 74 65 65 6C 00 00 00 00   ritish Steel....
000090   00 00 00 00 00 00 00 00 00 00 00 00 00 31 39 38   .............198
0000A0   30 47 72 65 61 74 20 73 6F 6E 67 21 00 00 00 00   0Great song!....
0000B0   00 00 00 00 00 00 00 00 00 00 00 00 00 00 33 89   ..............3.
```

[npm-image]: http://img.shields.io/npm/v/node-hex.svg?style=flat
[npm-url]: https://npmjs.org/package/node-hex
