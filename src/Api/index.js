import axios from 'axios'
import interceptorRequest from './interceptorRequest'
import interceptorResponse, { onResponseError } from './interceptorResponse'

/** @type {import('axios').AxiosRequestConfig} */
const axiosConfig = {
  // baseURL: 'https://mbr.maxbot.com.br/api/v1.php'
  // baseURL: 'http://localhost:3003/test/hookhttp1'
}

const axiosInstance = axios.create(axiosConfig)
axiosInstance.interceptors.request.use(interceptorRequest)
axiosInstance.interceptors.response.use(interceptorResponse, onResponseError)

export default axiosInstance

export function getCancelToken() {
  return axios.CancelToken
}
