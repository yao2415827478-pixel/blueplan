---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e3a11e36921bbdfd2be73862c3e33480cf5477df33d70c4aeea245e501f1e123022059f5fa1709cdb58f76db252855e54fee3ab3a85a82191cd13fb4b3c1d1d5477c
    ReservedCode2: 304502202fde42279d61ff9dcc8d64bed88f1bc9a08d4b1816c631c57644f3040da1ecea022100a5adf5f9d0d06a9c87615cc343f47adec948fd238fdc3d5f99092f87992546c8
---

1.1.2 / 2017-09-23
==================

  * perf: improve header token parsing speed

1.1.1 / 2017-03-20
==================

  * perf: hoist regular expression

1.1.0 / 2015-09-29
==================

  * Only accept valid field names in the `field` argument
    - Ensures the resulting string is a valid HTTP header value

1.0.1 / 2015-07-08
==================

  * Fix setting empty header from empty `field`
  * perf: enable strict mode
  * perf: remove argument reassignments

1.0.0 / 2014-08-10
==================

  * Accept valid `Vary` header string as `field`
  * Add `vary.append` for low-level string manipulation
  * Move to `jshttp` orgainzation

0.1.0 / 2014-06-05
==================

  * Support array of fields to set

0.0.0 / 2014-06-04
==================

  * Initial release
