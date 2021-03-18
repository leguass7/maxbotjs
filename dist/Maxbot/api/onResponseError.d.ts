interface ResultError {
    status: number;
    msg: string;
    response?: any;
}
export declare function onResponseError(error: any): Promise<ResultError>;
export {};
