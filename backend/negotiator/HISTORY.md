---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210093ee1d507452dd748eb55bfb7f6fe4b843a07b51edf280d703e0a17950cfd3ae022012aa6a3bc70b3ffaee1a720b996a5990cace73ebcf9c7dc84f4a20ab2cf13b82
    ReservedCode2: 3045022100a682ce9e7ed7fa20cc81fa6aa6ac600d04be5cb203362c043790403ce478c480022011830f9d6bc641206e91cf500b0b896c90d25ef6dbf7dac6647ef68019a4d0b3
---

0.6.3 / 2022-01-22
==================

  * Revert "Lazy-load modules from main entry point"

0.6.2 / 2019-04-29
==================

  * Fix sorting charset, encoding, and language with extra parameters

0.6.1 / 2016-05-02
==================

  * perf: improve `Accept` parsing speed
  * perf: improve `Accept-Charset` parsing speed
  * perf: improve `Accept-Encoding` parsing speed
  * perf: improve `Accept-Language` parsing speed

0.6.0 / 2015-09-29
==================

  * Fix including type extensions in parameters in `Accept` parsing
  * Fix parsing `Accept` parameters with quoted equals
  * Fix parsing `Accept` parameters with quoted semicolons
  * Lazy-load modules from main entry point
  * perf: delay type concatenation until needed
  * perf: enable strict mode
  * perf: hoist regular expressions
  * perf: remove closures getting spec properties
  * perf: remove a closure from media type parsing
  * perf: remove property delete from media type parsing

0.5.3 / 2015-05-10
==================

  * Fix media type parameter matching to be case-insensitive

0.5.2 / 2015-05-06
==================

  * Fix comparing media types with quoted values
  * Fix splitting media types with quoted commas

0.5.1 / 2015-02-14
==================

  * Fix preference sorting to be stable for long acceptable lists

0.5.0 / 2014-12-18
==================

  * Fix list return order when large accepted list
  * Fix missing identity encoding when q=0 exists
  * Remove dynamic building of Negotiator class

0.4.9 / 2014-10-14
==================

  * Fix error when media type has invalid parameter

0.4.8 / 2014-09-28
==================

  * Fix all negotiations to be case-insensitive
  * Stable sort preferences of same quality according to client order
  * Support Node.js 0.6

0.4.7 / 2014-06-24
==================

  * Handle invalid provided languages
  * Handle invalid provided media types

0.4.6 / 2014-06-11
==================

  *  Order by specificity when quality is the same

0.4.5 / 2014-05-29
==================

  * Fix regression in empty header handling

0.4.4 / 2014-05-29
==================

  * Fix behaviors when headers are not present

0.4.3 / 2014-04-16
==================

  * Handle slashes on media params correctly

0.4.2 / 2014-02-28
==================

  * Fix media type sorting
  * Handle media types params strictly

0.4.1 / 2014-01-16
==================

  * Use most specific matches

0.4.0 / 2014-01-09
==================

  * Remove preferred prefix from methods
