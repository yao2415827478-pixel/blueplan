---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30450221008951a56e6ccba240c6a0b461c95d34c8826a92fd1c50de38acdecb9c473bdb1e02202a6dffa014b6b8333586dd7526ff1d511dea24edf21bf5b81ee3e98c309e05fc
    ReservedCode2: 30460221009324f0a2605a7e6bd6655bdf35bc787c94a0dfa32f52b305c717c8591a592f6c02210092befb1e69dae8fcfa2bcafff749e59a73d2064321ade11925aa2e52170d1da6
---

1.8.1 / 2017-09-12
==================

  * perf: replace regular expression with substring

1.8.0 / 2017-02-18
==================

  * Use SHA1 instead of MD5 for ETag hashing
    - Improves performance for larger entities
    - Works with FIPS 140-2 OpenSSL configuration

1.7.0 / 2015-06-08
==================

  * Always include entity length in ETags for hash length extensions
  * Generate non-Stats ETags using MD5 only (no longer CRC32)
  * Improve stat performance by removing hashing
  * Remove base64 padding in ETags to shorten
  * Use MD5 instead of MD4 in weak ETags over 1KB

1.6.0 / 2015-05-10
==================

  * Improve support for JXcore
  * Remove requirement of `atime` in the stats object
  * Support "fake" stats objects in environments without `fs`

1.5.1 / 2014-11-19
==================

  * deps: crc@3.2.1
    - Minor fixes

1.5.0 / 2014-10-14
==================

  * Improve string performance
  * Slightly improve speed for weak ETags over 1KB

1.4.0 / 2014-09-21
==================

  * Support "fake" stats objects
  * Support Node.js 0.6

1.3.1 / 2014-09-14
==================

  * Use the (new and improved) `crc` for crc32

1.3.0 / 2014-08-29
==================

  * Default strings to strong ETags
  * Improve speed for weak ETags over 1KB

1.2.1 / 2014-08-29
==================

  * Use the (much faster) `buffer-crc32` for crc32

1.2.0 / 2014-08-24
==================

  * Add support for file stat objects

1.1.0 / 2014-08-24
==================

  * Add fast-path for empty entity
  * Add weak ETag generation
  * Shrink size of generated ETags

1.0.1 / 2014-08-24
==================

  * Fix behavior of string containing Unicode

1.0.0 / 2014-05-18
==================

  * Initial release
