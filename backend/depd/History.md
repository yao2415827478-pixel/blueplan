---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022021b6087e4c1f11e99e43df7e4315a1a657c7b3dc65e66d95eb2b73db9fcd25ee022100f0ff2a6a603f903bfeb4d5d77f32d2c1f5dc704e0996f93d934efafea5001474
    ReservedCode2: 30460221009e3830dac3efd202bb8b098fe9f71b54173d800c9fa3f257db6ded4e6b84ebdc022100a4501d4adf1b18150fad167b728e9d54d56c3694d027a2fdf8f0d9f08c8a898d
---

2.0.0 / 2018-10-26
==================

  * Drop support for Node.js 0.6
  * Replace internal `eval` usage with `Function` constructor
  * Use instance methods on `process` to check for listeners

1.1.2 / 2018-01-11
==================

  * perf: remove argument reassignment
  * Support Node.js 0.6 to 9.x

1.1.1 / 2017-07-27
==================

  * Remove unnecessary `Buffer` loading
  * Support Node.js 0.6 to 8.x

1.1.0 / 2015-09-14
==================

  * Enable strict mode in more places
  * Support io.js 3.x
  * Support io.js 2.x
  * Support web browser loading
    - Requires bundler like Browserify or webpack

1.0.1 / 2015-04-07
==================

  * Fix `TypeError`s when under `'use strict'` code
  * Fix useless type name on auto-generated messages
  * Support io.js 1.x
  * Support Node.js 0.12

1.0.0 / 2014-09-17
==================

  * No changes

0.4.5 / 2014-09-09
==================

  * Improve call speed to functions using the function wrapper
  * Support Node.js 0.6

0.4.4 / 2014-07-27
==================

  * Work-around v8 generating empty stack traces

0.4.3 / 2014-07-26
==================

  * Fix exception when global `Error.stackTraceLimit` is too low

0.4.2 / 2014-07-19
==================

  * Correct call site for wrapped functions and properties

0.4.1 / 2014-07-19
==================

  * Improve automatic message generation for function properties

0.4.0 / 2014-07-19
==================

  * Add `TRACE_DEPRECATION` environment variable
  * Remove non-standard grey color from color output
  * Support `--no-deprecation` argument
  * Support `--trace-deprecation` argument
  * Support `deprecate.property(fn, prop, message)`

0.3.0 / 2014-06-16
==================

  * Add `NO_DEPRECATION` environment variable

0.2.0 / 2014-06-15
==================

  * Add `deprecate.property(obj, prop, message)`
  * Remove `supports-color` dependency for node.js 0.8

0.1.0 / 2014-06-15
==================

  * Add `deprecate.function(fn, message)`
  * Add `process.on('deprecation', fn)` emitter
  * Automatically generate message when omitted from `deprecate()`

0.0.1 / 2014-06-15
==================

  * Fix warning for dynamic calls at singe call site

0.0.0 / 2014-06-15
==================

  * Initial implementation
