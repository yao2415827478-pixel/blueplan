---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100872a3cc1e4b8edcd5913eea97ab4edcb1919cf278443eaad0c84d81e4745bcae02201399ac4a1afdf9f34756e3f4e758ffbab18398e9121cb753d0be140084523298
    ReservedCode2: 304602210087ef077703f07a4256d5e97691addeefaaa1e966f2a4dead6624a0d8972e0c0b022100b5d036a522758b6718bbcae7b026f1f14542a744c7decd1f2f2d96be400eec63
---


2.7.0 / 2017-09-13
==================

  * feat: support fs.copyFile (#58)

2.6.0 / 2016-11-22
==================

  * Added fdatasync to fs api (#46)

2.5.0 / 2016-11-04
==================

  * feat: support fs.mkdtemp

2.4.0 / 2016-03-23
==================

  * add `fs.truncate()` [#34](https://github.com/normalize/mz/pull/34)

2.3.1 / 2016-02-01
==================

  * update `any-promise@v1`

2.3.0 / 2016-01-30
==================

  * feat(package): switch to `any-promise` to support more promise engines

2.2.0 / 2016-01-24
==================

  * feat(package): add index.js to files

2.1.0 / 2015-10-15
==================

 * support for readline library

2.0.0 / 2015-05-24
==================

 * support callbacks as well

1.2.0 / 2014-12-16
==================

 * refactor promisification to `thenify` and `thenify-all`

1.1.0 / 2014-11-14
==================

 * use `graceful-fs` if available

1.0.1 / 2014-08-18
==================

 * don't use `bluebird.promisify()` - unnecessarily wraps runtime errors, causing issues

1.0.0 / 2014-06-18
==================

 * use `bluebird` by default if found
 * support node 0.8
