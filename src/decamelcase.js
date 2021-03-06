export function decamelcaseStr(text, separator = '_') {
  if (typeof text !== 'string') return text

  return text
    .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1${separator}$2`)
    .replace(
      /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
      `$1${separator}$2`
    )
    .toLowerCase()
}

export function isObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date)
  )
}

function mapObject(obj) {
  const ret = {}
  // eslint-disable-next-line array-callback-return
  Object.keys(obj).map(key => {
    const k = decamelcaseStr(key)
    ret[k] = isObject(obj[key]) ? mapObject(obj[key]) : obj[key]
  })
  return ret
}

export default function decamelcase(input, options = {}) {
  if (Array.isArray(input)) return input.map(obj => decamelcase(obj))
  if (!isObject(input)) return decamelcaseStr(input)
  return mapObject(input)
}
