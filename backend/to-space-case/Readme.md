---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100de276f3cd967e010bfee7209c8fb6cf3e6409c71f219990c24703aefd87d8c4b0221008c6350e9c8f511a53dbe098516a3e282e058f1d263cf008fe229cef63faa9856
    ReservedCode2: 3045022100f306589df8539686fc13815c4f8c383004ec824813286370d52760e30ba6b13902205ae68566b079f8b40b9f444db501a073aefd34caea0d952188827c722461d351
---

# to-space-case

  Convert a string to a space case.

## Installation

    $ component install ianstormtaylor/to-space-case
    $ npm install to-space-case

## Example

```js
var space = require('to-space-case');

space('camelCase');  // "camel case"
space('snake_case'); // "snake case"
space('dot.case');   // "dot case"
```

## API

### toSpaceCase(string)
  
  Returns the space-case variant of a `string`.

## License

  MIT
