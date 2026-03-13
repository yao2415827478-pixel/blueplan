---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e61f513ec24d4253db47dff2c018cac6b0dc65eb6e0c54b24e975ac1a10cd620022071fc90c76fca474b08ce33587398ae369928756d88c3e8dcc1095b0a1eade474
    ReservedCode2: 30440220344b7e98599927be23b724719a0d7a5a549db0f5f0a7e7fdba8605fc1023bc44022026de373c6312a5106ffa383a38978280f63d0ed2aad95f035fecd9f0c4f5276b
---

# PauseStream

This is a `Stream` that will strictly buffer when paused.
Connect it to anything you need buffered.

``` js
  var ps = require('pause-stream')();

  badlyBehavedStream.pipe(ps.pause())

  aLittleLater(function (err, data) {
    ps.pipe(createAnotherStream(data))
    ps.resume()
  })
```

`PauseStream` will buffer whenever paused.
it will buffer when yau have called `pause` manually.
but also when it's downstream `dest.write()===false`.
it will attempt to drain the buffer when you call resume
or the downstream emits `'drain'`

`PauseStream` is tested using [stream-spec](https://github.com/dominictarr/stream-spec)
and [stream-tester](https://github.com/dominictarr/stream-tester)

This is now the default case of 
[through](https://github.com/dominictarr/through)

https://github.com/dominictarr/pause-stream/commit/4a6fe3dc2c11091b1efbfde912e0473719ed9cc0
