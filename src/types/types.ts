export interface MaxbotOptions {
  token: string
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
