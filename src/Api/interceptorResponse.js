/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */
import camelcaseKeys from 'camelcase-keys'

export async function onResponseError(error) {
  const response = error && error.response
  const statusHttp = response && parseInt(response.status, 10)

  const result = { status: 0, msg: 'Timeout', response: (response && response.data) || false }
  if (!response) return Promise.resolve(result)

  result.msg = `httpError ${statusHttp}`
  return Promise.resolve(result)
}

/**
 * @function interceptorResponse
 * @param {AxiosResponse} response
 * @returns {AxiosResponse}
 */
export default function interceptorResponse(response) {
  return camelcaseKeys(response.data, { deep: true })
}
