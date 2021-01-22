import { CancelTokenSource, CancelToken } from 'axios'
import { ITemplate } from './template'
import { IServiceSector } from './serviceSector'
import { IAttendant } from './attendant'
export interface ICancelSource {
  idToken: CancelToken | string
  source: CancelTokenSource
}

export interface MaxbotOptions {
  token: string
  timeout?: number
  baseURL?: string
}

export interface ApiResult {
  status: 0 | 1
  msg: 'Success' | 'Failure'
  contactId?: number
}
export interface FilterByDate {
  /** YYYY-MM-DD */
  dateStart?: string
  /** YYYY-MM-DD */
  dateStop?: string
}

export type PostType =
  | 'get_status'
  | 'get_segmentation'
  | 'get_template'
  | 'get_service_sector'
  | 'get_contact'
  | 'get_prot'
  | 'put_contact'
  | 'set_contact'
  | 'send_text'
  | 'send_image'
  | 'send_file'
  | 'send_sound'
export interface IRequestPayload {
  cmd?: PostType
  token?: string
}

// results

export interface ITemplateResult extends ApiResult {
  template: ITemplate[]
}

export interface IServiceSectorResult extends ApiResult {
  serviceSector: IServiceSector[]
}
export interface IAttendantResult extends ApiResult {
  attendant: IAttendant[]
}
