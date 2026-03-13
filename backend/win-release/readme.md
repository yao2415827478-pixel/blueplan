---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502202fe0cc6b4b6c569259c56e42ae634e57dfbe56498642d340421039edacad0ac70221009aa1e5c372a97e85b628ed38b43fbfc3579787c02133057f23c867400fba386c
    ReservedCode2: 304502204daa8e31ca2950e92a3de8972a8327559faa3ba035fa82a2c70452a2752d5c21022100b643d7cc7a00f5065cde6f57e50fb205326cf95b4be7b00ee071689b27e237fb
---

# win-release [![Build Status](https://travis-ci.org/sindresorhus/win-release.svg?branch=master)](https://travis-ci.org/sindresorhus/win-release)

> Get the name of a Windows version from the release number: `5.1.2600` → `XP`


## Install

```
$ npm install --save win-release
```


## Usage

```js
var os = require('os');
var winRelease = require('win-release');

// on a Windows XP system

winRelease();
//=> 'XP'

os.release();
//=> '5.1.2600'

winRelease(os.release());
//=> 'XP'

winRelease('4.9.3000');
//=> 'ME'
```


## API

### winRelease([release])

#### release

Type: `string`

By default the current OS is used, but you can supply a custom release number, which is the output of [`os.release()`](http://nodejs.org/api/os.html#os_os_release).


## Related

- [os-name](https://github.com/sindresorhus/os-name) - Get the name of the current operating system
- [osx-release](https://github.com/sindresorhus/osx-release) - Get the name and version of a OS X release from the Darwin version


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
