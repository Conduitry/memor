import { handlers } from './handlers.js'

let array = []
let push = array.push.bind(array)

let recurse = obj => {
	if (typeof obj === 'object' && obj !== null) {
		let handler = handlers.get(Object.getPrototypeOf(obj))
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
