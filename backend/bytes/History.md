---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210095fee6fb06070bfc64ea03dbcf69e54fa5fe6062c2f19ba68e3c7434557b866502204ac2edf3d7700085299cc836a8714a7a1767f712cf64bd91eebc01ffd2750f11
    ReservedCode2: 30450221009e3352fa68aad8424819d73b2f2b9a498cdf1ee92d71896b34a944294302bc0b022073381afbbd9e72ec95df3276bbb7497b5fa7360994ad8610fa9e01830685673d
---

3.1.2 / 2022-01-27
==================

  * Fix return value for un-parsable strings

3.1.1 / 2021-11-15
==================

  * Fix "thousandsSeparator" incorrecting formatting fractional part

3.1.0 / 2019-01-22
==================

  * Add petabyte (`pb`) support

3.0.0 / 2017-08-31
==================

  * Change "kB" to "KB" in format output
  * Remove support for Node.js 0.6
  * Remove support for ComponentJS

2.5.0 / 2017-03-24
==================

  * Add option "unit"

2.4.0 / 2016-06-01
==================

  * Add option "unitSeparator"

2.3.0 / 2016-02-15
==================

  * Drop partial bytes on all parsed units
  * Fix non-finite numbers to `.format` to return `null`
  * Fix parsing byte string that looks like hex
  * perf: hoist regular expressions

2.2.0 / 2015-11-13
==================

  * add option "decimalPlaces"
  * add option "fixedDecimals"

2.1.0 / 2015-05-21
==================

  * add `.format` export
  * add `.parse` export

2.0.2 / 2015-05-20
==================

  * remove map recreation
  * remove unnecessary object construction

2.0.1 / 2015-05-07
==================

  * fix browserify require
  * remove node.extend dependency

2.0.0 / 2015-04-12
==================

  * add option "case"
  * add option "thousandsSeparator"
  * return "null" on invalid parse input
  * support proper round-trip: bytes(bytes(num)) === num
  * units no longer case sensitive when parsing

1.0.0 / 2014-05-05
==================

 * add negative support. fixes #6

0.3.0 / 2014-03-19
==================

 * added terabyte support

0.2.1 / 2013-04-01
==================

  * add .component

0.2.0 / 2012-10-28
==================

  * bytes(200).should.eql('200b')

0.1.0 / 2012-07-04
==================

  * add bytes to string conversion [yields]
