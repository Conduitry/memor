let ARRAY = Symbol()
let OBJECT = Symbol()
let REGEXP = Symbol()
let DATE = Symbol()
let BUFFER = Symbol()

let array

let recurse = obj => {
	if (typeof obj === 'object' && obj !== null) {
		switch (Object.getPrototypeOf(obj)) {
			case Array.prototype:
				array.push(ARRAY, obj.length), obj.forEach(recurse)
				return
			case Object.prototype:
				array.push(OBJECT, Object.keys(obj).length, ...Object.keys(obj))
				Object.values(obj).forEach(recurse)
				return
			case RegExp.prototype:
				array.push(REGEXP, obj.source, obj.flags)
				return
			case Date.prototype:
				array.push(DATE, obj.getTime())
				return
			case Buffer.prototype:
				array.push(BUFFER, obj.toString('base64'))
				return
		}
	}
	array.push(obj)
}

export default obj => {
	array = []
	recurse(obj)
	return array
}
