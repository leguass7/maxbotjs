import { ApiResult, FilterByDate } from './types'

export interface IProtFilter extends FilterByDate {}
interface Note {
  id: number
  /** timestamp */
  date: string
  attendantName: string
  note: string
}
/** T-Texto, S-Audio, I-Imagem, F-Documento, L-Localização */
type DialogType = 'T' | 'S' | 'I' | 'F' | 'L'

interface Dialog {
  id: number
  /** YYYY-MM-DD */
  date: string
  internalCommunication: number
  flux: string // 'reply'
  type: DialogType
  sentBy: string
  receivedBy: string
  /** hash */
  msgId: string
  msgText: string
  msgSound: string
  msgImage: string
  msgFile: string
  msgLocationPreview: string
  msgLocationLat: string
  msgLocationLng: string
  quotedMsgId: string
  quotedMsgText: string
  quotedMsgSound: string
  quotedMsgImage: string
  quotedMsgFile: string
  quotedMsgLocationPreview: string
  quotedMsgLocationLat: string
  quotedMsgLocationLng: string
}

export interface ProtData {
  id: number
  protocolNumber: number
  serviceSector: string
  attendantName: string
  contactName: string
  contactWhatsapp: string
  contactEmail: string
  createdDate: string
  /** timestamp */
  startedDate: string
  /** timestamp */
  concludedDate: string
  /** time HH:mm:ss */
  duration: string
  obs: string
  notes: Note[]
  dialog: Dialog[]
}

export interface IGetProtResult extends ApiResult {
  data: ProtData[]
}
