---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402202bb7acc2ebc38e5489fd81c960b01f78235cdd028438a76ca4193c4e8d5f05f602202afadf9c37ca978097e1943cbca2de62b51aa22d7cfdbaa30e3ef8cc19adf378
    ReservedCode2: 3044022016dc7a6a76249e58bc682454ef63ad108b5740c298565b3902719bce34399df602200bff36ad47dfd42b7f93d3da846427eec5ddfddace58026e73c9ac196ef91e35
---

# ms

[![Build Status](https://travis-ci.org/zeit/ms.svg?branch=master)](https://travis-ci.org/zeit/ms)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/)

Use this package to easily convert various time formats to milliseconds.

## Examples

```js
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
```

### Convert from milliseconds

```js
ms(60000)             // "1m"
ms(2 * 60000)         // "2m"
ms(ms('10 hours'))    // "10h"
```

### Time format written-out

```js
ms(60000, { long: true })             // "1 minute"
ms(2 * 60000, { long: true })         // "2 minutes"
ms(ms('10 hours'), { long: true })    // "10 hours"
```

## Features

- Works both in [node](https://nodejs.org) and in the browser.
- If a number is supplied to `ms`, a string with a unit is returned.
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`).
- If you pass a string with a number and a valid unit, the number of equivalent ms is returned.

## Caught a bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of ms, just link it to the dependencies: `npm link ms`. Instead of the default one from npm, node will now use your clone of ms!

As always, you can run the tests using: `npm test`
