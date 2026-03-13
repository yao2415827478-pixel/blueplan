---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30460221009e24ee9663e1badd98d3f9a8d0bae1aedf573bc75d0b914a52f0752b17b9f3f7022100dd9ff558b0c4eae7d75ad6f937fdb35a8b11c45cadcc305af85243e66633b00f
    ReservedCode2: 3045022071342f534ee719cf5ef3fd2b9576d957b375ed2a2823df865022a1e3237d452c0221009cbe0c7ef9be7d79cc48257e407ff87e300e4330321ba427c83786eee8650c00
---

# os-name [![Build Status](https://travis-ci.org/sindresorhus/os-name.svg?branch=master)](https://travis-ci.org/sindresorhus/os-name)

> Get the name of the current operating system. Example: `OS X Mavericks`

Useful for analytics and debugging.


## Install

```sh
$ npm install --save os-name
```


## Usage

```js
var os = require('os');
var osName = require('os-name');

// on an OS X Mavericks system

osName();
//=> OS X Mavericks

osName(os.platform(), os.release());
//=> OS X Mavericks

osName(os.platform());
//=> OS X

osName('linux', '3.13.0-24-generic');
//=> Linux 3.13

osName('win32', '6.3.9600');
//=> Windows 8.1

osName('win32');
// Windows
```


## API

### osName([platform, release])

By default the name of the current operating system is returned.

You can optionally supply a custom [`os.platform()`](http://nodejs.org/api/os.html#os_os_platform) and [`os.release()`](http://nodejs.org/api/os.html#os_os_release).

Check out [getos](https://github.com/wblankenship/getos) if you need the Linux distribution name.


## CLI

```sh
$ npm install --global os-name
```

```sh
$ os-name --help

  Example
    os-name
    OS X Mavericks
```


## Contributing

Production systems depend on this package for logging / tracking. Please be careful when introducing new output, and adhere to existing output format (whitespace, capitalization, etc.).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
