import { handlers, withDefaultHandler } from './handlers.js'

export let add = (...classes) => {
	for (let Class of classes) {
		withDefaultHandler.add(Class.prototype)
	}
}

export let addCustom = (...classes) => {
	let handler = classes.pop()
	for (let Class of classes) {
		handlers.set(Class.prototype, handler)
	}
}
