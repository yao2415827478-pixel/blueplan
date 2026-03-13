---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100b4e1e4b1f24ad09fe01b9e0b809cf6b1fcdca86bc42598a597211b21cfaec658022100ae3254d8da25dc847e83e337617a49a24a89df3c796bd5b308d4c0575035ef2d
    ReservedCode2: 304402203f99a161651d02edf0cc6cc02e8b2edad42c40833567e461be35ac29b4d94269022016e1183cf165531186e922194e6f1d1e741421bb90d6a8fa0cc49a6ccd209906
---


# cookie-signature

  Sign and unsign cookies.

## Example

```js
var cookie = require('cookie-signature');

var val = cookie.sign('hello', 'tobiiscool');
val.should.equal('hello.DGDUkGlIkCzPz+C0B064FNgHdEjox7ch8tOBGslZ5QI');

var val = cookie.sign('hello', 'tobiiscool');
cookie.unsign(val, 'tobiiscool').should.equal('hello');
cookie.unsign(val, 'luna').should.be.false;
```

## License 

(The MIT License)

Copyright (c) 2012 LearnBoost &lt;tj@learnboost.com&gt;

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