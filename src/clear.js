import { data } from './memoize.js'

export default func => data.WeakMap && data.WeakMap.delete(func)
