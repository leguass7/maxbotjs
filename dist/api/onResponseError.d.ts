export function onResponseError(error: any): Promise<{
    status: number;
    msg: string;
    response: any;
}>;
