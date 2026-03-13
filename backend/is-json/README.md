---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022050c8174798f79b645cba541fa060f7d8cf045d71218394098824d27aa775f302022100c994b0817cf9208a4b2c8bc26afce2a2e39b89082d1b55e26e329d6c08d907f2
    ReservedCode2: 3044022042ffdd7b6c267b3f570a16c266d22e7d6460e90938d3dfdc4ead28b5e54762bc02201359df5bff2f54512bd8fd3e2d482c8729c1f095f3bfbb55f2a905548bb3fb63
---

# is-json

<a href="https://nodei.co/npm/is-json/"><img src="https://nodei.co/npm/is-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/is-json.png?branch=master)](https://travis-ci.org/joaquimserafim/is-json)


check if a string is a valid JSON string without using Try/Catch and is a JSON object



**V1.2**


isJSON(str*, [passObjects=bool])

*with `passObjects = true` can pass a JSON object in `str`, default to `false`


	  var isJSON = require('is-json');

	  var good_json = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
	  var bad_json = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
	  var str_number = '121212';


	  console.log(isJSON(good_json)); // true
      console.log(isJSON(bad_json)); // false
	  console.log(isJSON(str_number)); // false



	  // check is an object

	  var object = {a: 12, b: [1,2,3]};

	  console.log(isJSON(object, true)); // true

    // can use isJSON.strict (uses try/catch) if wants something more robust

    console.log(isJSON.strict('{\n "config": 123,\n "test": "abcde" \n}')); // true
