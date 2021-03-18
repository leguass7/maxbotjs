import { ApiResult } from './types';
export interface IForWhoFilter {
    whatsapp?: string;
    externalId?: number;
    brCpf?: string;
}
export interface ISendTextResult extends ApiResult {
    msgId: string;
}
