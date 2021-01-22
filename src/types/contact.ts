import { ApiResult, FilterByDate } from './types'

type Profession = ['']
type Gender = 'M' | 'F'
type PersonType = 'J' | 'F'

export interface IContactFilter extends FilterByDate {
  whatsapp?: string
  mobilePhone?: string
  email?: string
  externalId?: number
}

export interface IContactData {
  id: number
  /** timestamp */
  cadDate: string
  segmentation: string[]
  tag: string
  name: string
  surname: string
  gender: Gender
  /** data YYYY-MM-DD */
  birth: string
  age: number
  brPersonType: PersonType // fisica ou juridica
  brCpf: string
  brCnpj: string
  company: string
  email: string
  whatsapp: string
  mobilePhone: string
  phone: string
  country: string
  state: string
  city: string
  profession: Profession
  externalId: number
  avatarUrl: string
  obs: string
  inAttendance: string
  currentProtocol: string
  currentAttendant: string
}

export interface ISetContactData {
  forContactId: number
  segmentation?: string[]
  tag?: string
  name?: string
  surname?: string
  gender?: Gender
  /** data YYYY-MM-DD */
  birth?: string
  brPersonType?: PersonType // fisica ou juridica
  brCpf?: string
  brCnpj?: string
  company?: string
  email?: string
  whatsapp?: string
  mobilePhone?: string
  phone?: string
  country: string
  state?: string
  city?: string
  profession?: Profession
  externalId?: number
  avatarUrl?: string
  obs?: string
}

export interface IGetContactResult extends ApiResult {
  data: IContactData[]
}
