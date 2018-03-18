let lookup = new Map()
let get = symbol =>
	lookup.has(symbol) ? lookup.get(symbol) : (lookup.set(symbol, lookup.size), lookup.size - 1)
export default symbols => symbols.sort((a, b) => get(a) - get(b))
