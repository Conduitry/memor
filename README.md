# Memor: More memoization.

[![npm version](https://img.shields.io/npm/v/memor.svg?style=flat-square)](https://www.npmjs.com/package/memor)

Memoization, but good. Works with functions of an arbitrary and/or variable number of arguments. For arrays, regexes, dates, buffers, and POJOs, caching is done according to the *value* (and not the *identity*) of the objects. Order of keys in POJOs does not matter. For other non-primitive values, memoization still works, but the caching is done by object identity.

## Requirements

- [Node.js](https://nodejs.org/) 6+

## Usage

```javascript
import { memoize } from 'memor'

const memoizedFunction = memoize(originalFunction)

memoizedFunction(/* ... */)
```

`originalFunction` can accept any number or a variable number of arguments. Re-memoizing the same function (i.e., calling `memoize(originalFunction)` elsewhere later) will share the cached values.

Keying of primitives, arrays, regexes, dates, and buffers works according to their values. Any additional custom properties added to the objects will *not* be considered as part of the key. (More specifically, arrays are keyed according to their length and their elements, regexes and buffers are keyed according to their `.toString()`s, and dates are keyed according to their `.getTime()`s.)

Keying of POJOs works according to their (own) enumerable and non-enumerable property names and values, without regard to order. Symbolic keys and their values are not considered, due to the lack of a canonical ordering on symbols.

Other objects (those without a prototype of `Object.prototype`) are simply keyed according to their identity (i.e., `===`).

## Misc

- [changelog](CHANGELOG.md#readme)
- [homepage](https://cndtr.io/memor/)

## License

Copyright (c) 2018 Conduitry

- [MIT](LICENSE)
