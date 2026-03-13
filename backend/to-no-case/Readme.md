---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100a6e20bbb1b454a1f248637d0209c8aa1405c4deeead3798ac2c081d0ea068ed302204ec9c1a960203b6ea0712efb52ee771db4b36ada7aa426eea9f29e16724efada
    ReservedCode2: 30450220640e5c07038c2ad858149287c277e49eb3ee942379e539e69647579ba51801a202210092f31df758e50a79d494fb8bb765363a09caf09863b9c4b1c5f7e25706a8b854
---

# to-no-case

  Remove an existing case from a string.

## Installation

    $ component install ianstormtaylor/to-no-case
    $ npm install to-no-case

## Example

```js
var clean = require('to-no-case');

clean('camelCase');       // "camel case"
clean('snake_case');      // "snake case"
clean('slug-case');       // "slug case"
clean('Title of Case');   // "title of case"
clean('Sentence case.');  // "sentence case."
```

## API

### toNoCase(string)
  
  Returns the `string` with an existing case removed.

## License

  MIT
