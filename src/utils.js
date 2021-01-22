/**
 * @function replaceAll
 * @param {String} str
 * @param {String} needle
 * @param {String} replacement
 * @example
 * replaceAll('T*T', '*', '_') // return 'T_T'
 */
export function replaceAll(str, needle, replacement) {
  if (!str) return ''
  if (Array.isArray(needle)) {
    let rtn = `${str}`
    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement)
    }
    return rtn
  }
  return str.split(needle).join(replacement)
}

/**
 * @function extractExtension
 * @param {string} url
 * @returns {string}
 */
export function extractExtension(url) {
  return replaceAll(
    (url = url.substr(1 + url.lastIndexOf('/')).split('?')[0])
      .split('#')[0]
      .substr(url.lastIndexOf('.')),
    '.',
    ''
  )
}

/**
 * FIXME: refactor to performance
 * @function prepareSendFilter
 * @param {import('./types/sending').IForWhoFilter} forWhoFilter
 */
export function prepareSendFilter(forWhoFilter) {
  const { externalId, whatsapp, brCpf } = forWhoFilter
  const result = {}
  if (externalId) {
    result.ctExternalId = externalId
  } else if (whatsapp) {
    result.ctWhatsapp = whatsapp
  } else if (brCpf) {
    result.ctBrCpf = brCpf
  } else {
    return false
  }
  return result
}

/**
 * @function isValidURL
 * @param {string} str
 * @returns {boolean}
 */
export function isValidURL(string) {
  try {
    const res = string.match(
      // eslint-disable-next-line no-useless-escape
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    if (res !== null) {
      const url = new URL(string)
      return url.protocol === 'http:' || url.protocol === 'https:'
    }
  } catch (_) {
    return false
  }
}
