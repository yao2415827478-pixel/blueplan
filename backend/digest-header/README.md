---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100d3e43dbd07fe9e60fa9b8312e68f93532515ac6fb032a916ac64589ec2277e1b022100a3b5a278c8758b63e8ab49e0d806e48cff7a80284d82dfe352265bfb2ff6a6b7
    ReservedCode2: 30460221008f1382f35fb8ba9077a0dd078e0203ed153b81dac4c147ef153377711d7746ab022100994f5190271661e6c032bf13252b826a635d6147a446fb92a7517312af38b881
---

digest-header
=======

[![Node.js CI](https://github.com/node-modules/digest-header/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/digest-header/actions/workflows/nodejs.yml)

Digest access authentication header helper.

## Install

```bash
npm install digest-header
```

## Usage

```js
var digest = require('digest-header');

var method = 'GET';
var uri = '/admin';
var wwwAuthenticate = res.headers['WWW-Authenticate'];
var userpass = 'user:pass';
var auth = digest(method, uri, wwwAuthenticate, userpass);
```

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
