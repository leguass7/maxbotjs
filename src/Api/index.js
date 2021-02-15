/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */
import axios from 'axios'
import { onResponseError } from './interceptorResponse'

/** @type {import('axios').AxiosRequestConfig} */
const axiosConfig = {
  // baseURL: 'https://mbr.maxbot.com.br/api/v1.php'
  // baseURL: 'http://localhost:3003/test/hookhttp1'
}

const axiosInstance = axios.create(axiosConfig)

export default axiosInstance

export function getCancelToken() {
  return axios.CancelToken
}

/**
 * @callback RequestCallback
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */

/**
 * @function setInterceptorRequest
 * @param {RequestCallback} callback
 */
export function setInterceptorRequest(callback) {
  axiosInstance.interceptors.request.use(callback)
}

/**
 * @callback ResponseCallback
 * @param {AxiosResponse} config
 * @returns {AxiosResponse}
 */

/**
 * @function setInterceptorResponse
 * @param {ResponseCallback} callback
 */
export function setInterceptorResponse(callback) {
  axiosInstance.interceptors.response.use(callback, onResponseError)
}
