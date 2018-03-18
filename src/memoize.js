import keys from './keys.js'

export let data = {}

export default func => {
	let memoized = (...args) => {
		let here = data
		for (let key of [func, ...keys(args)]) {
			let M = (typeof key === 'object' && key !== null) || typeof key === 'function' ? WeakMap : Map
			if (!here[M.name]) here[M.name] = new M()
			if (!here[M.name].has(key)) here[M.name].set(key, {})
			here = here[M.name].get(key)
		}
		return 'value' in here ? here.value : (here.value = func(...args))
	}
	memoized.original = func
	return memoized
}
