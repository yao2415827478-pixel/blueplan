---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022036039fabb9a3a278c2ea7ddb49af065239a15f097271b6b89faa97f5dc3e9ca7022100bbed6faf4c17f0304b1586859fd32d519caa58c696d3be10ae4bd9af703d2264
    ReservedCode2: 3045022100bdec59da041945926a75360d85f5e59583a938033aee6e020d2cdbcbc7762e7502205d04163409b2e0f28a0912a3fc972def2506c06a06b9360d7c7be3dd5458df73
---


# escape-html

  Escape string for use in HTML

## Example

```js
var escape = require('escape-html');
var html = escape('foo & bar');
// -> foo &amp; bar
```

## Benchmark

```
$ npm run-script bench

> escape-html@1.0.3 bench nodejs-escape-html
> node benchmark/index.js


  http_parser@1.0
  node@0.10.33
  v8@3.14.5.9
  ares@1.9.0-DEV
  uv@0.10.29
  zlib@1.2.3
  modules@11
  openssl@1.0.1j

  1 test completed.
  2 tests completed.
  3 tests completed.

  no special characters    x 19,435,271 ops/sec ±0.85% (187 runs sampled)
  single special character x  6,132,421 ops/sec ±0.67% (194 runs sampled)
  many special characters  x  3,175,826 ops/sec ±0.65% (193 runs sampled)
```

## License

  MIT