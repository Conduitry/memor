export let handlers = new Map()
export let withDefaultHandler = new Set([Array.prototype, Object.prototype, null])

let REGEXP = {}
let DATE = {}
let BUFFER = {}

handlers.set(RegExp.prototype, (obj, push) => push(REGEXP, obj.toString()))

handlers.set(Date.prototype, (obj, push) => push(DATE, obj.getTime()))

if (typeof Buffer === 'function') {
	handlers.set(Buffer.prototype, (obj, push) => push(BUFFER, obj.toString('binary')))
}
