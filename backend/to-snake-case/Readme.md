---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100aabe84f3362df049fab9c882e6bd106eda30b2c4d95b28d3ed8cb8404f8f94f6022100a7d823401e29da0882f275e9fe1d9cb14b546654f78da435d0f769cd0424f395
    ReservedCode2: 3045022037e19609efc2e8bfae3ca7cc273b9977087d2baeb4569c9257a88b77c414e65d022100b0b1f98b3efe67a29dfbc1ac46a774e98615ec79509c00ebd771b7339e80c890
---

# to-snake-case

  Convert a string to a snake case.

## Installation

    $ component install ianstormtaylor/to-snake-case
    $ npm install to-snake-case

## Example

```js
var snake = require('to-snake-case');

snake('camelCase');  // "camel_case"
snake('space case'); // "snake_case"
snake('dot.case');   // "dot_case"
snake('weird[case'); // "weird_case"
```

## API

### toSnakeCase(string)
  
  Returns the snake-case variant of a `string`.

## License

  MIT
