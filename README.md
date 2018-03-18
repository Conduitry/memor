# Memor: More memoization.

[![npm version](https://img.shields.io/npm/v/memor.svg?style=flat-square)](https://www.npmjs.com/package/memor)

Memoization, but good. Works with functions of an arbitrary and/or variable number of arguments. For arrays, regexes, dates, buffers, and POJOs, caching is done according to the *value* (and not the *identity*) of the objects. Order of keys in POJOs does not matter. For other non-primitive values, memoization still works, but the caching is done by object identity.

## Requirements

- [Node.js](https://nodejs.org/) 6+

## Usage

### `memor.memoize`

```javascript
import { memoize } from 'memor'

const memoizedFunction = memoize(originalFunction)

memoizedFunction(/* ... */)
```

`originalFunction` can accept any number or a variable number of arguments. Re-memoizing the same function (i.e., calling `memoize(originalFunction)` elsewhere later) will share the cached values.

Keying of primitives, arrays, regexes, dates, and buffers works according to their values. Any additional custom properties added to the objects will *not* be considered as part of the key. (More specifically, arrays are keyed according to their length and their elements, regexes and buffers are keyed according to their `.toString()`s, and dates are keyed according to their `.getTime()`s.)

Keying of POJOs works according to their enumerable and non-enumerable property names and symbols and their values, without regard to the order they appear.

Other objects (those without a prototype of `Object.prototype`) are simply keyed according to their identity (i.e., `===`).

Take a look at the unit tests in [`test.js`](test.js) for some specific examples of what will and will not get keyed the same way.

### `memor.clear`

```javascript
import { memoize, clear } from 'memor'

const memoizedFunction = memoize(originalFunction)

memoizedFunction(/* ... */)

clear(originalFunction)
// or
clear(memoizedFunction)

memoizedFunction(/* ... */)
```

All memoized values for a function can be cleared by calling `clear` on the original function or on the memoized function. These do exactly the same thing: Since all memoized copies of the same function share the same cache, clearing one clears all of them.

### `memoizedFunction.original`

```javascript
import { memoize } from 'memor'

const memoizedFunction = memoize(originalFunction)

memoizedFunction.original === originalFunction // true
```

The original function is available as the `.original` property on the memoized function.
## Misc

- [changelog](CHANGELOG.md#readme)
- [homepage](https://cndtr.io/memor/)

## License

Copyright (c) 2018 Conduitry

- [MIT](LICENSE)
