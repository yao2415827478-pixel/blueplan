---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3044022100dca94fbb7dc40fffe706c25c7bf4fe023db18b2d9207e9aa860d379e246e3d10021f4454fd9055cac5ac9f9b23ae74dcca9ac61ef9b47d4a0f1f729979b6e10dae
    ReservedCode2: 304502203ff184d8bb1991f3c65ef71df14d2b0a7dd6d27acbd613b1c0cd7d6d0ead285c022100d6f96304bb997d45bd5673735ca0cc723a1c04acbe9452715697f957d80884f7
---

# formstream

[![NPM version][npm-image]][npm-url]
[![CI](https://github.com/node-modules/formstream/actions/workflows/ci.yml/badge.svg)](https://github.com/node-modules/formstream/actions/workflows/ci.yml)
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/formstream.svg?style=flat-square
[npm-url]: https://npmjs.org/package/formstream
[codecov-image]: https://codecov.io/github/node-modules/formstream/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/node-modules/formstream?branch=master
[download-image]: https://img.shields.io/npm/dm/formstream.svg?style=flat-square
[download-url]: https://npmjs.org/package/formstream

A [multipart/form-data](http://tools.ietf.org/html/rfc2388) encoded stream, helper for file upload.

## Install

```bash
npm install formstream
```

## Quick Start

```js
var formstream = require('formstream');
var http = require('http');

var form = formstream();

// form.file('file', filepath, filename);
form.file('file', './logo.png', 'upload-logo.png');

// other form fields
form.field('foo', 'fengmk2').field('love', 'aerdeng');

// even send file content buffer directly
// form.buffer(name, buffer, filename, mimeType)
form.buffer('file2', new Buffer('This is file2 content.'), 'foo.txt');

var options = {
  method: 'POST',
  host: 'upload.cnodejs.net',
  path: '/store',
  headers: form.headers()
};
var req = http.request(options, function (res) {
  console.log('Status: %s', res.statusCode);
  res.on('data', function (data) {
    console.log(data.toString());
  });
});

form.pipe(req);
```

### Chaining

```js
var fs = require('fs');
var formstream = require('formstream');

var filepath = './logo.png';
fs.stat(filepath, function (err, stat) {
  formstream()
    .field('status', 'share picture')
    .field('access_token', 'your access token')
    .file('pic', filepath, 'logo.png', stat.size)
    .pipe(process.stdout); // your request stream
});
```

### Set min chunk buffer size

Some web servers have a limit on the number of chunks, and you can set `minChunkSize` to ensure the size of chunk sent to the server.

```js
var fs = require('fs');
var FormStream = require('formstream');

var filepath = './big-file.zip';
fs.stat(filepath, function (err, stat) {
  new FormStream({
    // send >= 2MB chunk buffer size to the server
    minChunkSize: 1024 * 1024 * 2,
  }).field('status', 'share file')
    .field('access_token', 'your access token')
    .file('file', filepath, 'big-file.zip', stat.size)
    .pipe(process.stdout); // your request stream
});
```

## API Doc

### formstream([options])

Create a form instance.

#### Arguments

- **options.minChunkSize** Number - min chunk size to emit data event

#### Returns

Form - form instance

### FormStream#field(name, value)

Add a normal field to the form.

#### Arguments

- **name** String - Name of field
- **value** String - Value of field

#### Returns

Form - form instance

### FormStream#file(name, filepath[, filename][, filesize])

Add a local file to be uploaded to the form.

#### Arguments

- **name** String - Name of file field
- **filepath** String - Local path of the file to be uploaded
- ***filename*** String - Optional. Name of the file (will be the base name of `filepath` if empty)
- ***filesize*** Number - Optional. Size of the file (will not generate `Content-Length` header if not specified)

#### Returns

Form - form instance

### FormStream#buffer(name, buffer, filename[, contentType])

Add a buffer as a file to upload.

#### Arguments

- **name** String - Name of field
- **buffer** Buffer - The buffer to be uploaded
- **filename** String - The file name that tells the remote server
- ***contentType*** String - Optional. Content-Type (aka. MIME Type) of content (will be infered with `filename` if empty)

#### Returns

Form - form instance

### FormStream#stream(name, stream, filename[, contentType][, size])

Add a readable stream as a file to upload. Event 'error' will be emitted if an error occured.

#### Arguments

- **name** String - Name of field
- **stream** [stream.Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) - A readable stream to be piped
- **filename** String - The file name that tells the remote server
- ***contentType*** String - Optional. Content-Type (aka. MIME Type) of content (will be infered with `filename` if empty)
- ***size*** Number - Optional. Size of the stream (will not generate `Content-Length` header if not specified)

#### Returns

Form - form instance

### FormStream#headers([headers])

Get headers for the request.

#### Arguments

- **headers** Object - Additional headers

#### Example

```js
var headers = form.headers({
  'Authorization': 'Bearer kei2akc92jmznvnkeh09sknzdk',
  'Accept': 'application/vnd.github.v3.full+json'
});
```

#### Returns

Object - Headers to be sent.

### Event 'error'

Emitted if there was an error receiving data.

### Event 'data'

The 'data' event emits when a Buffer was used.

See [Node.js Documentation](http://nodejs.org/api/stream.html#stream_event_data) for more.

### Event 'end'

Emitted when the stream has received no more 'data' events will happen.

See [Node.js Documentation](http://nodejs.org/api/stream.html#stream_event_end) for more.

## License

[MIT](LICENSE)

## Contributors

[![Contributors](https://contrib.rocks/image?repo=node-modules/formstream)](https://github.com/node-modules/formstream/graphs/contributors)

Made with [contributors-img](https://contrib.rocks).
