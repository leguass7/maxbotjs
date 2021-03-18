import { ApiResult, FilterByDate } from './types';
declare type Profession = string[];
declare type Gender = 'M' | 'F';
declare type PersonType = 'J' | 'F';
export interface IContactFilter extends FilterByDate {
    whatsapp?: string;
    mobilePhone?: string;
    email?: string;
    externalId?: number;
}
export interface IContactData {
    id: number | string;
    /** timestamp */
    cadDate: string;
    segmentation: string[];
    tag?: string;
    name: string;
    surname: string;
    gender: Gender;
    /** data YYYY-MM-DD */
    birth?: string;
    age?: number;
    brPersonType?: PersonType;
    brCpf?: string;
    brCnpj?: string;
    company?: string;
    email?: string;
    whatsapp: string;
    mobilePhone?: string;
    phone?: string;
    country: string;
    state?: string;
    city?: string;
    profession?: Profession;
    externalId?: number;
    avatarUrl?: string;
    obs?: string;
    inAttendance: string;
    currentProtocol: string;
    currentAttendant: string;
}
export interface IPutContactData extends Omit<IContactData, 'id' | 'cadDate' | 'inAttendance' | 'currentProtocol' | 'currentAttendant' | 'segmentation'> {
    segmentation?: string[];
}
export interface ISetContactData extends Omit<IContactData, 'id' | 'cadDate' | 'inAttendance' | 'currentProtocol' | 'currentAttendant' | 'segmentation' | 'gender' | 'name' | 'surname' | 'whatsapp'> {
    forContactId: number;
    whatsapp?: string;
    gender?: Gender;
    name?: string;
    surname?: string;
}
export interface IGetContactResult extends ApiResult {
    data: IContactData[];
}
export {};
