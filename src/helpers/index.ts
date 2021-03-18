// export function stringLimit(str: string, limit: number): string {
//   return str && str.length > limit ? str.substring(0, limit) : str
// }

export function isObject(value: any): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date) &&
    !Array.isArray(value)
  )
}

export function replaceAll(str: string, needle?: string | string[], replacement?: string): string {
  if (!str) return ''
  if (Array.isArray(needle)) {
    let rtn = `${str}`
    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement)
    }
    return rtn
  }
  return str.split(`${needle}`).join(replacement)
}

export function extractExtension(url: string): string {
  return replaceAll(
    (url = url.substr(1 + url.lastIndexOf('/')).split('?')[0])
      .split('#')[0]
      .substr(url.lastIndexOf('.')),
    '.',
    ''
  )
}

export function isValidURL(str: string): boolean {
  try {
    const res = str.match(
      // eslint-disable-next-line no-useless-escape
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    if (res !== null) {
      const url = new URL(str)
      return !!(url.protocol === 'http:' || url.protocol === 'https:')
    }
    return false
  } catch {
    return false
  }
}
