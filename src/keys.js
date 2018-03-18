let ARRAY = Symbol()
let HOLE = Symbol()
let OBJECT = Symbol()
let REGEXP = Symbol()
let DATE = Symbol()
let BUFFER = Symbol()

let array

let recurse = obj => {
	let temp
	switch (typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj)) {
		case Array.prototype:
			array.push(ARRAY, obj.length)
			for (let i = 0; i < obj.length; i++) i in obj ? recurse(obj[i]) : array.push(HOLE)
			break
		case Object.prototype:
			temp = [...Object.getOwnPropertyNames(obj).sort(), ...Object.getOwnPropertySymbols(obj)]
			array.push(OBJECT, temp.length, ...temp)
			temp.forEach(key => recurse(obj[key]))
			break
		case RegExp.prototype:
			array.push(REGEXP, obj.toString())
			break
		case Date.prototype:
			array.push(DATE, obj.getTime())
			break
		case Buffer.prototype:
			array.push(BUFFER, obj.toString('binary'))
			break
		default:
			array.push(obj)
	}
}

export default obj => {
	array = []
	recurse(obj)
	return array
}
