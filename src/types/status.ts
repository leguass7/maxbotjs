import { ApiResult } from './types'
type LastOperation = string
type Status = 'Active' | 'Disabled'

interface IStatusData {
  /** date format YYYY-MM-DD */
  createdAt: string
  status: Status
  /** timestamps */
  lastExecutionAt: string
  lastOperation: LastOperation
}
export interface IGetStatusResult extends ApiResult {
  data?: IStatusData[]
}
