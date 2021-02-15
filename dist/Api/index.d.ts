export function getCancelToken(): import("axios").CancelTokenStatic;
/**
 * @callback RequestCallback
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
/**
 * @function setInterceptorRequest
 * @param {RequestCallback} callback
 */
export function setInterceptorRequest(callback: RequestCallback): void;
/**
 * @callback ResponseCallback
 * @param {AxiosResponse} config
 * @returns {AxiosResponse}
 */
/**
 * @function setInterceptorResponse
 * @param {ResponseCallback} callback
 */
export function setInterceptorResponse(callback: ResponseCallback): void;
export default axiosInstance;
export type RequestCallback = (config: AxiosRequestConfig) => AxiosRequestConfig;
export type ResponseCallback = (config: AxiosResponse) => AxiosResponse;
export type AxiosRequestConfig = import("axios").AxiosRequestConfig;
export type AxiosResponse = import("axios").AxiosResponse<any>;
declare const axiosInstance: import("axios").AxiosInstance;
