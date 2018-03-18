let lookup = new Map()
let get = symbol => lookup.get(symbol) || (lookup.set(symbol, lookup.size + 1), lookup.size)
export default symbols => symbols.sort((a, b) => get(a) - get(b))
