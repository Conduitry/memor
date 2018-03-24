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

Keying of primitives, regexes, dates, and buffers works according to their values. Any additional custom properties added to the objects will *not* be considered as part of the key. More specifically, regexes and buffers are keyed according to their `.toString()`, and dates are keyed according to their `.getTime()`.

Keying of arrays (prototype `Array.prototype`), POJOs (prototype `Object.prototype`), and prototype-less objects (prototype `null`) works according to their enumerable and non-enumerable property names and symbols and their values, without regard to the order they appear.

Other objects are by default simply keyed according to their identity (i.e., `===`), although this can be extended (see `memor.add`, below).

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

### `memor.add`

```javascript
import { add } from 'memor'

add(Class1, Class2, ...)
```

This makes keying of instances of `Class1`, `Class2`, etc. work the same as arrays, POJOs, and prototype-less objects. That is, keyed according to their prototype and their enumerable and non-enumerable property names and symbols and their values, without regard to the order they appear. Note that this only sets up handling for _direct_ instances of `Class1`, etc. (i.e., those objects whose prototype is `Class1.prototype`, etc.).

### `memor.addCustom`

```javascript
import { addCustom } from 'memor'

addCustom(Class1, Class2, ..., (obj, push, recurse) => { /* ... */ })
```

This allows more customization of how instances of `Class1`, `Class2`, etc. are keyed. In general, keying objects involves converting them into a linear array of primitives and objects to use as `Map`/`WeakMap` keys. Two objects will be keyed together if and only if they are converted to arrays of the same (`===`) primitives and objects.

A custom handler is implemented by writing a function that accepts three arguments: `obj` (the object to compute the representation for), `push` (a function to be called with one or more primitives or objects to append to the representation for this object), and `recurse` (a function to be called to insert the representation for another object). Take a look at the implementations of the existing handlers in [`handlers.js`](src/handlers.js) for more details on how these could work.

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
