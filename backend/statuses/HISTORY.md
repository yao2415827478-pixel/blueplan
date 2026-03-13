---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402206a67b76c108908fff5ec76a81f53c65c1d3b161eafa01d4852c0ea1d613e96880220784db8f2675eb37181ba82079f8de6e05cd6b905a60233234439c541ed2aa2c7
    ReservedCode2: 3046022100d885c600e8af7b7beb6f5a4d5423d81d3acbd88eeac1e5fb87f1f5e668745d2b022100eaa4c5339c9ac21503bd2c94d1d2402bbc31219d07557b389a259904b1e32875
---

2.0.2 / 2025-06-06
==================

  * Migrate to `String.prototype.slice()`

2.0.1 / 2021-01-03
==================

  * Fix returning values from `Object.prototype`

2.0.0 / 2020-04-19
==================

  * Drop support for Node.js 0.6
  * Fix messaging casing of `418 I'm a Teapot`
  * Remove code 306
  * Remove `status[code]` exports; use `status.message[code]`
  * Remove `status[msg]` exports; use `status.code[msg]`
  * Rename `425 Unordered Collection` to standard `425 Too Early`
  * Rename `STATUS_CODES` export to `message`
  * Return status message for `statuses(code)` when given code

1.5.0 / 2018-03-27
==================

  * Add `103 Early Hints`

1.4.0 / 2017-10-20
==================

  * Add `STATUS_CODES` export

1.3.1 / 2016-11-11
==================

  * Fix return type in JSDoc

1.3.0 / 2016-05-17
==================

  * Add `421 Misdirected Request`
  * perf: enable strict mode

1.2.1 / 2015-02-01
==================

  * Fix message for status 451
    - `451 Unavailable For Legal Reasons`

1.2.0 / 2014-09-28
==================

  * Add `208 Already Repored`
  * Add `226 IM Used`
  * Add `306 (Unused)`
  * Add `415 Unable For Legal Reasons`
  * Add `508 Loop Detected`

1.1.1 / 2014-09-24
==================

  * Add missing 308 to `codes.json`

1.1.0 / 2014-09-21
==================

  * Add `codes.json` for universal support

1.0.4 / 2014-08-20
==================

  * Package cleanup

1.0.3 / 2014-06-08
==================

  * Add 308 to `.redirect` category

1.0.2 / 2014-03-13
==================

  * Add `.retry` category

1.0.1 / 2014-03-12
==================

  * Initial release
