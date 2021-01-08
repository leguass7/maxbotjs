import { CancelTokenSource, CancelToken } from 'axios';
export interface ICancelSource {
    idToken: CancelToken | string;
    source: CancelTokenSource;
}
export interface MaxbotOptions {
    token: string;
    timeout?: number;
    baseURL?: string;
}
export interface ApiResult {
    status: 0 | 1;
    msg: 'Success' | 'Failure';
    contactId?: number;
}
export interface FilterByDate {
    /** YYYY-MM-DD */
    dateStart?: string;
    /** YYYY-MM-DD */
    dateStop?: string;
}
export declare type PostType = 'get_status' | 'get_segmentation' | 'get_contact' | 'get_prot' | 'put_contact' | 'set_contact' | 'send_text' | 'send_image' | 'send_file' | 'send_sound';
export interface IRequestPayload {
    cmd?: PostType;
    token?: string;
}
