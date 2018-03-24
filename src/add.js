import { handlers, defaultHandler } from './handlers.js'

export let add = (...classes) => addCustom(...classes, defaultHandler)

export let addCustom = (...classes) => {
	let handler = classes.pop()
	for (let Class of classes) {
		handlers.set(Class.prototype, handler)
	}
}
