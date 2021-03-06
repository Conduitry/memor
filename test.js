let memor = require('.')
let assert = require('assert')

let func = () => ({})
let call = memor.memoize(func)

assert.equal(call([]), call([]))

{
	let a = []
	let r = call(a)
	a.push(0)
	assert.notEqual(call(a), r)
	assert.equal(call(a), call([0]))
}

assert.equal(call([1, , 2]), call([1, , 2])) // eslint-disable-line no-sparse-arrays

assert.notEqual(call([1, , 2]), call([1, 2, ,])) // eslint-disable-line no-sparse-arrays

assert.notEqual(call([1, , 2]), call([1, undefined, 2])) // eslint-disable-line no-sparse-arrays

{
	let a = []
	let b = []
	assert.equal(call(a), call(b))
	b.x = 0
	assert.notEqual(call(a), call(b))
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

assert.notEqual(call([[0, 0], [0]]), call([[0, 0, [0]]]))

assert.equal(call({ a: 0, b: 1 }), call({ b: 1, a: 0 }))

{
	let s = Symbol()
	assert.notEqual(call({ a: 0, b: 1 }), call({ [s]: 2, b: 1, a: 0 }))
	assert.equal(call({ a: 0, b: 1, [s]: 2 }), call({ [s]: 2, b: 1, a: 0 }))
	assert.notEqual(call({ a: 0, b: 1, [s]: 2 }), call({ [s]: 3, b: 1, a: 0 }))
}

{
	let s1 = Symbol()
	let s2 = Symbol()
	assert.equal(call({ a: 0, [s1]: 1, [s2]: 2 }), call({ [s2]: 2, [s1]: 1, a: 0 }))
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

assert.equal(call(), memor.memoize(func)())

assert.equal(call(Object.create(null)), call(Object.create(null)))

assert.notEqual(call(Object.create(null)), call({}))

{
	class Foo {}
	memor.add(Foo)
	let foo = new Foo()
	let r1 = call(foo)
	assert.notEqual(call({}), r1)
	foo.bar = 0
	let r2 = call(foo)
	assert.notEqual(r1, r2)
	foo = new Foo()
	assert.equal(call(foo), r1)
	foo.bar = 0
	assert.equal(call(foo), r2)
}

{
	class Bar {}
	let sigil = {}
	memor.addCustom(Bar, (obj, push, recurse) => {
		push(sigil)
		recurse(obj.baz)
	})
	let bar = new Bar()
	let r1 = call(bar)
	bar.quuz = 0
	assert.equal(call(bar), r1)
	bar.baz = 0
	let r2 = call(bar)
	assert.notEqual(r1, r2)
	bar = new Bar()
	assert.equal(call(bar), r1)
	bar.baz = 0
	assert.equal(call(bar), r2)
}

{
	class Foo {}
	class Bar {}
	memor.add(Foo, Bar)
	assert.equal(call(new Foo()), call(new Foo()))
	assert.equal(call(new Bar()), call(new Bar()))
	assert.notEqual(call(new Foo()), call(new Bar()))
}

assert.equal(call.original, func)

{
	let r = call()
	memor.clear(func)
	assert.notEqual(call(), r)
}

{
	let r = call()
	memor.clear(call)
	assert.notEqual(call(), r)
}
