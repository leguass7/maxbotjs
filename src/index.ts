import Maxbot from './Maxbot'

export default Maxbot

export type { IAttendant } from './Maxbot/types/attendant'
export type {
  IContactData,
  IContactFilter,
  IGetContactResult,
  IPutContactData,
  ISetContactData
} from './Maxbot/types/contact'

export type { IFollowupData } from './Maxbot/types/followup'
export type { IGetProtResult, IProtFilter, ProtData } from './Maxbot/types/protocol'
export type { IGetSegmentationResult, ISegmentationData } from './Maxbot/types/segmentation'
export type { IForWhoFilter, ISendTextResult } from './Maxbot/types/sending'
export type { IServiceSector } from './Maxbot/types/serviceSector'
export type { IGetStatusResult, IStatusData } from './Maxbot/types/status'
export type { ITemplate } from './Maxbot/types/template'

export type {
  ApiResult,
  FilterByDate,
  IAttendantResult,
  ICancelSource,
  IRequestPayload,
  IServiceSectorResult,
  ITemplateResult,
  // PostType
  MaxbotOptions
} from './Maxbot/types/types'
