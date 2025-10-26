# is
Small utility package that provides a set of functions to check if a given argument is of a certain type

## Functions

### `detect`

Returns the type of given value.

```javascript
import { detect } from '@plq/is'

console.log(detect('')) // Output: 'string'
console.log(detect(1)) // Output: 'number'
console.log(detect(true)) // Output: 'boolean'
console.log(detect({})) // Output: 'object'
console.log(detect([])) // Output: 'array'
```

### `getTag`

Returns the tag of given value.

```javascript
import { getTag } from '@plq/is'

console.log(getTag('')) // Output: '[object String]'
console.log(getTag(1)) // Output: '[object Number]'
console.log(getTag(true)) // Output: '[object Boolean]'
console.log(getTag({})) // Output: '[object Object]'
console.log(getTag([])) // Output: '[object Array]'
```

### `isFunction`

Checks if a given value is a function.

```javascript
import { isFunction } from '@plq/is'

console.log(isFunction(() => {})) // Output: true
console.log(isFunction({})) // Output: false
console.log(isFunction(async () => {})) // Output: false
```

### `isAsyncFunction`

Checks if a given value is an asynchronous function.

```javascript
javascript
import { isAsyncFunction } from '@plq/is'

console.log(isAsyncFunction(async () => {})) // Output: true
console.log(isAsyncFunction(() => {})) // Output: false
```

### `isGeneratorFunction`

Checks if a given value is a generator function.

```javascript
import { isGeneratorFunction } from '@plq/is'

console.log(isGeneratorFunction(function* () {})) // Output: true
console.log(isGeneratorFunction(() => {})) // Output: false
```

### `isPromise`

Checks if a given value is a Promise.

```javascript
import { isPromise } from '@plq/is'

console.log(isPromise(Promise.resolve())) // Output: true
console.log(isPromise(async () => {})) // Output: false
```

### `isPromiseLike`

Checks if a given value is a Promise-like.

```javascript
import { isPromiseLike } from '@plq/is'

console.log(isPromiseLike(Promise.resolve())) // Output: true
console.log(isPromiseLike({ then: () => {} })) // Output: true
console.log(isPromiseLike(async () => {})) // Output: false
```

### `isArray`

Checks if a given value is an array.

```javascript
import { isArray } from '@plq/is'

console.log(isArray([])) // Output: true
console.log(isArray({})) // Output: false
```

### `isArrayOf`

Checks if a given value is an array of a given type.

```javascript
import { isArrayOf } from '@plq/is'

console.log(isArrayOf([], 'string')) // Output: false
console.log(isArrayOf(['a', 'b', 'c'], 'string')) // Output: true
console.log(isArrayOf(['a', 'b', 'c'], 'number')) // Output: false
console.log(isArrayOf(['a', 'b', 3], 'string')) // Output: false
```

### `isObject`

Checks if a given value is an object.

```javascript
import { isObject } from '@plq/is'

console.log(isObject({})) // Output: true
console.log(isObject(() => {})) // Output: false
```

### isObjectLike

Checks if a given value is an object-like.

```javascript
import { isObjectLike } from '@plq/is'

console.log(isObjectLike({})) // Output: true
console.log(isObjectLike([])) // Output: true
console.log(isObjectLike(() => {})) // Output: false
```

### `isPlainObject`

Checks if a given value is a plain object.

```javascript
import { isPlainObject } from '@plq/is'

console.log(isPlainObject({})) // Output: true
console.log(isPlainObject(Object.create(null))) // Output: true
console.log(isPlainObject(() => {})) // Output: false
```

### `isNull`

Checks if a given value is null.

```javascript
import { isNull } from '@plq/is'

console.log(isNull(null)) // Output: true
console.log(isNull(undefined)) // Output: false
```

### `isUndefined`

Checks if a given value is undefined.

```javascript
import { isUndefined } from '@plq/is'

console.log(isUndefined(undefined)) // Output: true
console.log(isUndefined(null)) // Output: false
```

### `isString`

Checks if a given value is a string.

```javascript
import { isString } from '@plq/is'

console.log(isString('')) // Output: true
console.log(isString(1)) // Output: false
```

### `isNumber`

Checks if a given value is a number.

```javascript
import { isNumber } from '@plq/is'

console.log(isNumber(1)) // Output: true
console.log(isNumber(NaN)) // Output: true
console.log(isNumber('')) // Output: false
```

### `isNaN`

Checks if a given value is NaN.

```javascript
import { isNaN } from '@plq/is'

console.log(isNaN(NaN)) // Output: true
console.log(isNaN(1)) // Output: false
```

### `isBigInt`

Checks if a given value is a BigInt.

```javascript
import { isBigInt } from '@plq/is'

console.log(isBigInt(BigInt(1))) // Output: true
console.log(isBigInt(1)) // Output: false
```

### `isBoolean`

Checks if a given value is a boolean.

```javascript
import { isBoolean } from '@plq/is'

console.log(isBoolean(true)) // Output: true
console.log(isBoolean(false)) // Output: true
console.log(isBoolean(1)) // Output: false
```

### `isSymbol`

Checks if a given value is a symbol.

```javascript
import { isSymbol } from '@plq/is'

console.log(isSymbol(Symbol())) // Output: true
console.log(isSymbol(1)) // Output: false
```

### `isDate`

Checks if a given value is a date.

```javascript
import { isDate } from '@plq/is'

console.log(isDate(new Date())) // Output: true
console.log(isDate('2021-01-01')) // Output: false
```

### `isRegExp`

Checks if a given value is a regular expression.

```javascript
import { isRegExp } from '@plq/is'

console.log(isRegExp(/test/)) // Output: true
console.log(isRegExp('test')) // Output: false
```

### `isSet`

Checks if a given value is a Set.

```javascript
import { isSet } from '@plq/is'

console.log(isSet(new Set())) // Output: true
console.log(isSet([])) // Output: false
```

### `isMap`

Checks if a given value is a Map.

```javascript
import { isMap } from '@plq/is'

console.log(isMap(new Map())) // Output: true
console.log(isMap([])) // Output: false
```

### `isWeakSet`

Checks if a given value is a WeakSet.

```javascript
import { isWeakSet } from '@plq/is'

console.log(isWeakSet(new WeakSet())) // Output: true
console.log(isWeakSet([])) // Output: false
```

### `isWeakMap`

Checks if a given value is a WeakMap.

```javascript
import { isWeakMap } from '@plq/is'

console.log(isWeakMap(new WeakMap())) // Output: true
console.log(isWeakMap([])) // Output: false
```

### `isError`

Checks if a given value is an error.

```javascript
import { isError } from '@plq/is'

console.log(isError(new Error())) // Output: true
console.log(isError('Error')) // Output: false
```

### `isDataView`

Checks if a given value is a DataView.

```javascript
import { isDataView } from '@plq/is'

console.log(isDataView(new DataView(new ArrayBuffer(1)))) // Output: true
console.log(isDataView([])) // Output: false
```

### `isIterable`

Checks if a given value is iterable.

```javascript
import { isIterable } from '@plq/is'

console.log(isIterable([])) // Output: true
console.log(isIterable({})) // Output: false
```

### `isAsyncIterable`

Checks if a given value is an async iterable.

```javascript
import { isAsyncIterable } from '@plq/is'

console.log(isAsyncIterable(async function* () {})) // Output: true
console.log(isAsyncIterable([])) // Output: false
```

### `isPrimitive`

Checks if a given value is a primitive.

```javascript
import { isPrimitive } from '@plq/is'

console.log(isPrimitive('')) // Output: true
console.log(isPrimitive(1)) // Output: true
console.log(isPrimitive(true)) // Output: true
console.log(isPrimitive(Symbol())) // Output: true
console.log(isPrimitive(null)) // Output: true
console.log(isPrimitive(undefined)) // Output: true
console.log(isPrimitive({})) // Output: false
console.log(isPrimitive([])) // Output: false
```

### `isEmpty`

Checks if a given value is empty.

```javascript
import { isEmpty } from '@plq/is'

console.log(isEmpty('')) // Output: true
console.log(isEmpty(0)) // Output: false
console.log(isEmpty(NaN)) // Output: true
console.log(isEmpty([])) // Output: true
console.log(isEmpty({})) // Output: true
console.log(isEmpty(new Set())) // Output: true
console.log(isEmpty(new Map())) // Output: true
console.log(isEmpty(() => {})) // Output: false
```

### `isEmptyString`

Checks if a given value is an empty string.

```javascript
import { isEmptyString } from '@plq/is'

console.log(isEmptyString('')) // Output: true
console.log(isEmptyString(' ')) // Output: false
console.log(isEmptyString('test')) // Output: false
```

### `isEmptyArray`

Checks if a given value is an empty array.

```javascript
import { isEmptyArray } from '@plq/is'

console.log(isEmptyArray([])) // Output: true
console.log(isEmptyArray([1])) // Output: false
```

### `isEmptyObject`

Checks if a given value is an empty object.

```javascript
import { isEmptyObject } from '@plq/is'

console.log(isEmptyObject({})) // Output: true
console.log(isEmptyObject({ a: 1 })) // Output: false
```

### `isEmptySet`

Checks if a given value is an empty Set.

```javascript
import { isEmptySet } from '@plq/is'

console.log(isEmptySet(new Set())) // Output: true
console.log(isEmptySet(new Set([1]))) // Output: false
```

### `isEmptyMap`

Checks if a given value is an empty Map.

```javascript
import { isEmptyMap } from '@plq/is'

console.log(isEmptyMap(new Map())) // Output: true
console.log(isEmptyMap(new Map([['a', 1]]))) // Output: false
```

### `isClass`

Checks if a given value is a class.

```javascript
import { isClass } from '@plq/is'

class Test {}

console.log(isClass(Test)) // Output: true
console.log(isClass(new Test())) // Output: false
console.log(isClass(() => {})) // Output: false
```

### `isArguments`

Checks if a given value is an arguments object.

```javascript
import { isArguments } from '@plq/is'

const args = (function() {
	return arguments
})()

console.log(isArguments(args)) // Output: true
console.log(isArguments([])) // Output: false
```

## Development

### Install dependencies

```bash
npm install
```

### Lint

We use [ESLint](https://eslint.org/) and [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) to lint our code.
</br>
Check out [.eslintrc.json](https://github.com/Akurganow/is/blob/main/.eslintrc.json)

```bash
npm run lint
```

### Run tests

We use [Jest](https://jestjs.io/) to test our code.

```bash
npm test
```

### Build

We use [TypeScript](https://www.typescriptlang.org/) to build our code.

```bash
npm run build
```

### Dev check list

- [ ] Add new file to `src/ulils` folder like `is-object.ts`
- [ ] Write a function `isObject` in `is-object.ts`
- [ ] Add new function to `src/index.ts` like `export { default as isObject } from './utils/is-object'`
- [ ] Add new test to `__tests__/tests.ts` file like `describe('isObject', () => { tests('object', isObject) })`
- [ ] Run `npm run lint`
- [ ] Run `npm run test`
- [ ] Commit and push your changes
- [ ] Create a pull request
