import { ApiResult } from './types';
declare type LastOperation = string;
declare type Status = 'Active' | 'Disabled';
export interface IStatusData {
    /** date format YYYY-MM-DD */
    createdAt: string;
    status: Status;
    /** timestamps */
    lastExecutionAt: string;
    lastOperation: LastOperation;
}
export interface IGetStatusResult extends ApiResult {
    data?: IStatusData[];
}
export {};
