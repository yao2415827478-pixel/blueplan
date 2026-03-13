---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304602210095103f06fff953c5e50f78fd1e0cbfacb563d236481976acfb71eaa5a3844ace022100d3db774a8f12ac2436cf3e65a6bbe2f02622ade7f88efa5175f967f4174d3e15
    ReservedCode2: 3045022100930109bc61821ec45996996e68036e7957d232daeb554b886a73bba8672b6ae40220509cde4aeb4a24c70c9c5bd5754821a6f793e1f541fc86fc22bc746c4ce2a830
---

copy-to
=======

[![Build Status](https://travis-ci.org/node-modules/copy-to.svg?branch=master)](https://travis-ci.org/node-modules/copy-to)

copy an object's properties to another one, include propertiy, getter and setter.

## Install

```
npm install copy-to
```

## Usage

```js
copy(src).to(des);
copy(src).toCover(des);
copy(src).override(des);

copy(src).pick('proName1', 'proName2').to(des);
copy(src).pick('proName1', 'proName2').toCover(des);
copy(src).pick('proName1', 'proName2').override(des);

copy(src).and(other).to(des);
copy(src).and(other).toCover(des);
copy(src).and(second).and(third).to(des);

copy(src).and(other).pick('proName1', 'proName2').to(des);
copy(src).and(other).pick('proName1', 'proName2').toCover(des);
copy(src).and(second).and(third).pick('proName1', 'proName2').to(des);
```

It won't copy access(getter / setter) by default, if you want to copy them, please use:

```js
copy(src).withAccess().and(other).to(des);
```

## Example

```js
var copy = require('copy-to');

var src = {
  _name: 'foo',
  set name(val) {
    this._name = val;
  },
  get name() {
    return this._name;
  },
  show: function () {
    console.log(this._name);
  }
};

var des = {
  _name: 'bar'
};

copy(src).to(des);
copy(src).toCover(des);
copy(src).pick('_name', 'name').to(des);
copy(src).pick('_name', 'name').toCover(des);
```

## License
MIT
