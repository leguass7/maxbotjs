export function onResponseError(error: any): Promise<{
    status: number;
    msg: string;
    response: any;
}>;
/**
 * @function interceptorResponse
 * @param {AxiosResponse} response
 * @returns {AxiosResponse}
 */
export default function interceptorResponse(response: AxiosResponse): AxiosResponse;
export type AxiosResponse = import("axios").AxiosResponse<any>;
