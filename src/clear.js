import { data } from './memoize.js'

export let clear = func => {
	data.delete(func)
	data.delete(func.original)
}
