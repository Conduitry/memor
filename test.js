let memor = require('.')
let assert = require('assert')

let calledCount = 0
let func = () => ++calledCount
let call = memor.memoize(func)

assert.equal(call([]), call([]))

{
	let a = []
	let r = call(a)
	a.push(0)
	assert.notEqual(call(a), r)
	assert.equal(call(a), call([0]))
}

assert.equal(call({}), call({}))

{
	let a = {}
	let r = call(a)
	a.x = 0
	assert.notEqual(call(a), r)
	assert.equal(call(a), call({ x: 0 }))
}

assert.equal(call([{ a: 0 }]), call([{ a: 0 }]))

assert.notEqual(call({}), call({ a: undefined }))

assert.notEqual(call([[0, 0], [0]]), call([[0], [0, 0]]))

assert.equal(call({ a: 0, b: 1 }), call({ b: 1, a: 0 }))

{
	let s = Symbol()
	assert.notEqual(call({ a: 0, b: 1 }), call({ [s]: 2, b: 1, a: 0 }))
	assert.equal(call({ a: 0, b: 1, [s]: 2 }), call({ [s]: 2, b: 1, a: 0 }))
	assert.notEqual(call({ a: 0, b: 1, [s]: 2 }), call({ [s]: 3, b: 1, a: 0 }))
}

assert.equal(call(new Date(2000, 0, 1)), call(new Date(2000, 0, 1, 0, 0, 0)))

assert.equal(call([new Date(2000, 0, 1)]), call([new Date(2000, 0, 1, 0, 0, 0)]))

{
	let a = new Date(2000, 0, 1)
	let r = call(a)
	a.setFullYear(2001)
	assert.notEqual(call(a), r)
	assert.equal(call(a), call(new Date(2001, 0, 1)))
}

assert.equal(call(/a/), call(/a/))

assert.equal(call(/a/i), call(new RegExp('a', 'i')))

assert.notEqual(call(/a/), call(/a/i))

assert.equal(call(Buffer.from([])), call(Buffer.from([])))

assert.equal(call(Buffer.from([0])), call(Buffer.from([0])))

{
	let a = Buffer.from([0])
	let r = call(a)
	a[0] = 1
	assert.notEqual(call(a), r)
	assert.equal(call(a), call(Buffer.from([1])))
}

assert.equal(call(), call())

assert.equal(call(null), call(null))

assert.notEqual(call(null), call())

assert.notEqual(call(true), call(true, undefined))

assert.notEqual(call(), memor.memoize(() => ++calledCount)())

assert.equal(call(), memor.memoize(func)())

assert.notEqual(call(Object.create(null)), call(Object.create(null)))
