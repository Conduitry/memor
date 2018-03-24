import { compareSymbols } from './compareSymbols.js'

export let handlers = new Map()

let OBJECT_START = {}
let OBJECT_END = {}
let REGEXP = {}
let DATE = {}
let BUFFER = {}

export let defaultHandler = (obj, push, recurse) => {
	push(OBJECT_START, Object.getPrototypeOf(obj))
	for (let property of Object.getOwnPropertyNames(obj)
		.sort()
		.concat(Object.getOwnPropertySymbols(obj).sort(compareSymbols))) {
		push(property)
		recurse(obj[property])
	}
	push(OBJECT_END)
}

handlers.set(Array.prototype, defaultHandler)

handlers.set(Object.prototype, defaultHandler)

handlers.set(null, defaultHandler)

handlers.set(RegExp.prototype, (obj, push) => push(REGEXP, obj.toString()))

handlers.set(Date.prototype, (obj, push) => push(DATE, obj.getTime()))

if (typeof Buffer === 'function') {
	handlers.set(Buffer.prototype, (obj, push) => push(BUFFER, obj.toString('binary')))
}
