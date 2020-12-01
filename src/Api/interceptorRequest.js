/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */
import decamelcase from '../decamelcase'
/**
 * @function interceptorRequest
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
export default function interceptorRequest(config) {
  config.headers['user-agent'] = 'maxbotjs/0.1.0 (+https://github.com/leguass7/maxbotjs.git)'
  config.data = decamelcase(config.data)
  // console.log('config.data', config.data)
  return config
}
