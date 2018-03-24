import { keys } from './keys.js'

export let data = new WeakMap()

export let memoize = func => {
	let memoized = (...args) => {
		let here = data.get(func)
		if (!here) {
			data.set(func, (here = {}))
		}
		for (let key of keys(args)) {
			let M = (typeof key === 'object' && key !== null) || typeof key === 'function' ? WeakMap : Map
			let m = here[M.name]
			if (!m) {
				here[M.name] = m = new M()
			}
			here = m.get(key)
			if (!here) {
				m.set(key, (here = {}))
			}
		}
		if ('value' in here) {
			return here.value
		} else {
			return (here.value = func(...args))
		}
	}
	memoized.original = func
	return memoized
}
