This is the helper for function arguments parsing.

## Install

`npm install arg-schema`

## Usage example

```
function foo(){
    var args = new argSchema(arguments);
    if (args.checkin('string a', 'number b', 'opt bool c', 'object d', 'array e', 'opt function f')) {
		// Put code here
    }
    else if (args.checkin('bool a', 'opt array b', 'opt bool c', 'opt function d')) {
		// Put code here
    }
    else{
		// No schema matched
		// This the place for error returning
    }
}
```
