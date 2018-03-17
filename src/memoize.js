let ARRAY = Symbol()
let POJO = Symbol()
let REGEXP = Symbol()
let DATE = Symbol()
let BUFFER = Symbol()

let array
let lookup

let recurse = obj => {
	if (typeof obj === 'object' && obj !== null) {
		let handler = lookup.get(Object.getPrototypeOf(obj))
		if (handler) {
			handler(obj)
			return
		}
	}
	array.push(obj)
}

lookup = new Map([
	[Array.prototype, obj => (array.push(ARRAY, obj.length), obj.forEach(recurse))],
	[
		Object.prototype,
		obj => (
			array.push(POJO, Object.keys(obj).length, ...Object.keys(obj)),
			Object.values(obj).forEach(recurse)
		),
	],
	[RegExp.prototype, obj => array.push(REGEXP, obj.source, obj.flags)],
	[Date.prototype, obj => array.push(DATE, obj.getTime())],
	[Buffer.prototype, obj => array.push(BUFFER, obj.toString('base64'))],
])

let data = {}

export default func => (...args) => {
	let here = data
	array = []
	recurse([func, ...args])
	for (let key of array) {
		let M = (typeof key === 'object' && key !== null) || typeof key === 'function' ? WeakMap : Map
		if (!here[M.name]) here[M.name] = new M()
		if (!here[M.name].has(key)) here[M.name].set(key, {})
		here = here[M.name].get(key)
	}
	return 'value' in here ? here.value : (here.value = func(...args))
}
