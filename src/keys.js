import { handlers, withDefaultHandler } from './handlers.js'
import { compareSymbols } from './compareSymbols.js'

let OBJECT_START = {}
let OBJECT_END = {}

let array = []
let push = array.push.bind(array)

let recurse = obj => {
	if (typeof obj === 'object' && obj !== null) {
		let prototype = Object.getPrototypeOf(obj)
		if (withDefaultHandler.has(prototype)) {
			push(OBJECT_START, prototype)
			for (let property of Object.getOwnPropertyNames(obj)
				.sort()
				.concat(Object.getOwnPropertySymbols(obj).sort(compareSymbols))) {
				push(property)
				recurse(obj[property])
			}
			push(OBJECT_END)
			return
		}
		let handler = handlers.get(prototype)
		if (handler) {
			handler(obj, push, recurse)
			return
		}
	}
	push(obj)
}

export let keys = args => {
	array.length = 0
	for (let arg of args) {
		recurse(arg)
	}
	return array
}
