# API

This document describes the public interface of the `oak-barrel` package.

## Table of Contents

* [API](#api)
    * [Table of Contents](#table-of-contents)
    * [`Barrel`](#barrel)
        * [`Barrel.fromBuffer(buffer)`](#barrelfrombufferbuffer)
        * [`Barrel.toBuffer(barrel)`](#barreltobufferbarrel)
        * [`Barrel.fromText(text)`](#barrelfromtexttext)
        * [`Barrel.toText(barrel)`](#barreltotextbuffer)
        * [`Barrel.fromTexts(texts)`](#barrelfromtextstexts)
        * [`Barrel.toTexts(buffer)`](#barreltotextsbuffer)
        * [`Barrel.getFirstBarrel(buffer)`](#barrelgetfirstbarrelbuffer)
        * [`Barrel.getFirstBarrels(buffer, count)`](#barrelgetfirstbarrelsbuffer-count)

## `Barrel`

The `Barrel` is the only module offered by `oak-barrel`. It is the default export of the package.

```javascript
import Barrel from 'oak-barrel'; // ES6
var Barrel = require('oak-barrel'); // ES5
```

### `Barrel.fromBuffer(buffer)`

Converts a buffer into a barrel.

Example:

```javascript
const buf = Buffer.from('feff', 'hex');

// Prints: <Buffer fe fe fe ff ff>
console.log(Barrel.fromBarrel(buf));
```

### `Barrel.toBuffer(barrel)`

Converts a barrel into a buffer.

Example:

```javascript
const barrel = Buffer.from('fefefeffff', 'hex');

// Prints: <Buffer fe ff>
console.log(Barrel.toBuffer(barrel));
```

### `Barrel.fromText(text)`

Converts a text string into a barrel.

Example:

```javascript
// Prints: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 ff>
console.log(Barrel.fromText('Hello, World!'));
```

### `Barrel.toText(buffer)`

Converts a barrel into a text string.

Example:

```javascript
const buf = Buffer.from('48656c6c6f2c20576f726c6421ff', 'hex');

// Prints: Hello, World!
console.log(Barrel.toText(buf));
```

### `Barrel.fromTexts(texts)`

Converts an array of text strings into a buffer of barrels.

Example:

```javascript
// Prints: <Buffer 61 ff 62 ff 63 ff>
console.log(Barrel.fromText(['a', 'b', 'c']));
```

### `Barrel.toTexts(buffer)`

Converts a buffer of barrels into an array of text strings.

Example:

```javascript
const buf = Buffer.from('61ff62ff63ff', 'hex');

let texts = Barrel.toTexts(buf);

// Prints: a
console.log(texts[0]);

// Prints: b
console.log(texts[1]);

// Prints: c
console.log(texts[2]);
```

### `Barrel.getFirstBarrel(buffer)`

Reads the first barrel from any buffer. An object is returned with properties `barrel` and `buffer`. The
`barrel` property is the first barrel found, and the `buffer` property is the remaining buffer after removing
the first barrel. If no barrel was found, the `barrel` property will have a value of `null`.

Example:

```javascript
const buf = Buffer.from('61707269636f74ff62616e616e61ff636865727279ff', 'hex');

const result = Barrel.getFirstBarrel(buf);

// Prints: <Buffer 61 70 72 69 63 6f 74 ff>
console.log(result.barrel);

// Prints: <Buffer 62 61 6e 61 6e 61 ff 63 68 65 72 72 79 ff>
console.log(result.buffer);
```

### `Barrel.getFirstBarrels(buffer, count)`

Reads the first "count" barrels from any buffer. An object is returned with properties `barrels` and `buffer`. The
`barrels` property is an array of the first "count" barrels found, and the `buffer` property is the remaining buffer
after removing the first "count" barrels. If the specified number of barrels were not found, the array will contain
`null` values for the missing barrels. If `count` was not specified, all barrels in the buffer will be read.

Example:

```javascript
const buf = Buffer.from('61707269636f74ff62616e616e61ff636865727279ff', 'hex');

const result = Barrel.getFirstBarrels(buf, 2);

// Prints: <Buffer 61 70 72 69 63 6f 74 ff>
console.log(result.barrels[0]);

// Prints: <Buffer 62 61 6e 61 6e 61 ff>
console.log(result.barrels[1]);

// Prints: <Buffer 63 68 65 72 72 79 ff>
console.log(result.buffer);
```
