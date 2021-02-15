/**
 * @typedef {import('./types/types').MaxbotOptions} MaxbotOptions
 * @typedef {import('./types/types').ApiResult} ApiResult
 * @typedef {import('./types/types').ITemplateResult} ITemplateResult
 * @typedef {import('./types/types').IServiceSectorResult} IServiceSectorResult
 * @typedef {import('./types/types').IAttendantResult} IAttendantResult
 * @typedef {import('./types/types').PostType} PostType
 * @typedef {import('./types/types').IRequestPayload} IRequestPayload
 * @typedef {import('./types/types').ICancelSource} ICancelSource
 *
 * @exports MaxbotOptions
 * @exports ApiResult
 * @exports ITemplateResult
 * @exports IServiceSectorResult
 * @exports IAttendantResult
 * @exports PostType
 * @exports IRequestPayload
 * @exports ICancelSource
 *
 * @typedef {import('./types/status').IGetStatusResult} IGetStatusResult
 * @typedef {import('./types/status').IStatusData} IStatusData
 * @typedef {import('./types/segmentation').ISegmentationData} ISegmentationData
 * @typedef {import('./types/segmentation').IGetSegmentationResult} IGetSegmentationResult
 * @typedef {import('./types/contact').IContactFilter} IContactFilter
 * @typedef {import('./types/contact').IContactData} IContactData
 * @typedef {import('./types/contact').ISetContactData} ISetContactData
 * @typedef {import('./types/contact').IGetContactResult} IGetContactResult
 * @typedef {import('./types/protocol').IProtFilter} IProtFilter
 * @typedef {import('./types/protocol').IGetProtResult} IGetProtResult
 * @typedef {import('./types/sending').IForWhoFilter} IForWhoFilter
 * @typedef {import('./types/sending').ISendTextResult} ISendTextResult
 *
 *
 * @exports IGetStatusResult
 * @exports IStatusData
 * @exports ISegmentationData
 * @exports IGetSegmentationResult
 * @exports IContactFilter
 * @exports IContactData
 * @exports ISetContactData
 * @exports IGetContactResult
 * @exports IProtFilter
 * @exports IGetProtResult
 * @exports IForWhoFilter
 * @exports ISendTextResult
 *
 * @typedef {import('axios').CancelTokenSource} CancelTokenSource
 * @typedef {import('axios').CancelToken} CancelToken
 * @exports CancelTokenSource
 * @exports CancelToken
 *
 */
import camelcaseKeys from 'camelcase-keys'
import Api, { getCancelToken, setInterceptorRequest, setInterceptorResponse } from './Api'
import { prepareSendFilter, extractExtension, isValidURL, replaceAll } from './utils'
import decamelcase from './decamelcase'

const postType = {
  GETSTATUS: 'get_status',
  GETSEGMENTATION: 'get_segmentation',
  GETTEMPLATE: 'get_template',
  GETSERVICESECTOR: 'get_service_sector',
  GETATTENDANT: 'get_attendant',
  GETCONTACT: 'get_contact',
  GETPROT: 'get_prot',
  PUTCONTACT: 'put_contact',
  SETCONTACT: 'set_contact',
  OPENFOLLOWUP: 'open_followup',
  SENDTEXT: 'send_text',
  SENDIMAGE: 'send_image',
  SENDFILE: 'send_file',
  SENDSOUND: 'send_sound'
}

const baseURL = 'https://mbr.maxbot.com.br/api/v1.php'
// const baseURL = 'http://localhost1:3003/test/hookhttp1'
/**
 * @class
 * Class Maxbot methods:
 * - setMe
 * - getMe
 * - getStatus
 * - getSegmentation
 * - getTemplate
 * - getServiceSector
 * - getProt
 * - putContact
 * - setContact
 * - openFollowup
 * - sendText
 * - sendImage
 * - sendFile
 * - sendSound
 */
class Maxbot {
  /**
   * @constructor
   * @param {MaxbotOptions} params
   */
  constructor(params) {
    /** @type {MaxbotOptions} */
    this.config = { token: '', timeout: 3000, baseURL, debug: false }
    this.ready = false
    this.loggingPrefix = 'MaxbotJs'
    this.version = '0.1.0'

    /** @type {ICancelSource[]} */
    this.cancelSources = []

    /** @private */
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3']
    }

    this.setMe(params).configureRequests().configureResponses()
    return this
  }

  log(...args) {
    if (this.config.debug) {
      // eslint-disable-next-line no-console
      console.log(this.loggingPrefix, ...args, '\n')
    }
  }

  /**
   * @private
   * @method configureRequests
   */
  configureRequests() {
    setInterceptorRequest(config => {
      config.headers[
        'user-agent'
      ] = `maxbotjs/${this.version} (+https://github.com/leguass7/maxbotjs.git)`

      config.data = decamelcase(config.data)
      this.log('REQUEST:', config.data)
      return config
    })
    return this
  }

  /**
   * @private
   * @method configureRequests
   */
  configureResponses() {
    setInterceptorResponse(response => {
      this.log('RESPONSE:', response.data || response)
      return camelcaseKeys(response.data, { deep: true })
    })
    return this
  }

  /**
   * @private
   * @method addError
   * @param {string} msg
   */
  addError(msg) {
    return { status: 0, msg }
  }

  /**
   * @method isValidExt
   * @param {'file'|'image'|'sound'} type
   * @param {string} ext
   * @returns {boolean}
   * @example
   * maxbot.isValidExt('.exe', 'file') // false
   * maxbot.isValidExt('.pdf', 'file') // true
   * maxbot.isValidExt('pdf') // true
   * maxbot.isValidExt('.png', 'image') // true
   */
  isValidExt(extension, type = '') {
    const ext = replaceAll(extension, '.', '')
    if (!type) {
      const testAll = Object.keys(this.allowedExt).reduce((all, key) => {
        this.allowedExt[key].forEach(e => all.push(e))
        return all
      }, [])
      return testAll.includes(replaceAll(ext, '.', ''))
    }
    return !!this.allowedExt[type].includes(replaceAll(ext, '.', ''))
  }

  /**
   * Verifica se bot esta pronto
   * @method isReady
   * @param {Boolean} force force api request status
   * @returns {Promise<Boolean>}
   */
  async isReady(force = false) {
    if (!this.config.token) return false
    const check = async () => {
      const result = await this.getStatus()
      return !!parseInt(result.status, 10)
    }
    if (force || !this.ready) this.ready = await check()
    return !!this.ready
  }

  /**
   * Configura
   * @method setMe
   * @param {MaxbotOptions|String} prop
   * @param {Number|String|Function} value
   * @returns {this}
   */
  setMe(prop, value) {
    const { config } = this
    if (typeof prop === 'object') {
      const keys = Object.keys(prop)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] in config) config[keys[i]] = prop[keys[i]]
      }
    } else if (typeof prop === 'string') {
      if (prop in config) config[prop] = typeof value === 'function' ? value() : value
    }
    return this
  }

  /**
   * Adquiri configurações
   * @method getMe
   * @returns {MaxbotOptions}
   */
  getMe() {
    return this.config
  }

  /**
   * Verificar a situação atual da API Maxbot
   * @method getStatus
   * @returns {Promise<IGetStatusResult>}
   */
  async getStatus() {
    const res = await this.requestApi(postType.GETSTATUS)
    return res
  }

  /**
   * Importar seguimentações do Maxbot
   * @method getSegmentation
   * @returns {Promise<IGetSegmentationResult>}
   */
  async getSegmentation() {
    const res = await this.requestApi(postType.GETSEGMENTATION)
    return res
  }

  /**
   * Importar templates do Maxbot
   * @method getTemplate
   * @returns {Promise<ITemplateResult>}
   */
  async getTemplate() {
    const res = await this.requestApi(postType.GETTEMPLATE)
    return res
  }

  /**
   * Importar service sectors do Maxbot
   * @method getServiceSector
   * @returns {Promise<IServiceSectorResult>}
   */
  async getServiceSector() {
    const res = await this.requestApi(postType.GETSERVICESECTOR)
    return res
  }

  /**
   * Importar atendentes do Maxbot
   * @method getAttendant
   * @returns {Promise<IAttendantResult>}
   */
  async getAttendant() {
    const res = await this.requestApi(postType.GETATTENDANT)
    return res
  }

  /**
   * Importar a ficha de cadastro do contato
   * @method getContact
   * @param {IContactFilter} filter
   * @returns {Promise<IGetContactResult>}
   */
  async getContact(filter) {
    const res = await this.requestApi(postType.GETCONTACT, filter)
    return res
  }

  /**
   * Importar os protocolos concluídos em um determinado período
   * @method getProt
   * @param {IProtFilter} filter
   * @returns {Promise<IGetProtResult>}
   */
  async getProt(filter) {
    const res = await this.requestApi(postType.GETPROT, filter)
    return res
  }

  /**
   * Criar um novo contato no Maxbot
   * @method putContact
   * @param {IContactData} contactData
   * @returns {Promise<ApiResult>}
   */
  async putContact(contactData) {
    const res = await this.requestApi(postType.PUTCONTACT, contactData)
    return res
  }

  /**
   * Atualizar dados de um contato existente
   * @method setContact
   * @param {ISetContactData} contactData
   * @returns {Promise<ApiResult>}
   */
  async setContact(contactData) {
    const res = await this.requestApi(postType.SETCONTACT, contactData)
    return res
  }

  /**
   * Abrir um followup do Maxbot
   * @method openFollowup
   * @param {IFollowupData} followupData
   * @returns {Promise<ApiResult>}
   */
  async openFollowup(followupData) {
    const res = await this.requestApi(postType.OPENFOLLOWUP, followupData)
    return res
  }

  /**
   * Envia uma mensagem de texto para um contato existente
   * @method sendText
   * @param {IForWhoFilter} forWho
   * @param {String} text
   * @returns {Promise<ISendTextResult>}
   */
  async sendText(forWho, text) {
    const filter = prepareSendFilter(forWho)
    if (!filter) return false
    const payload = { ...filter, msg: text }
    const res = await this.requestApi(postType.SENDTEXT, payload)
    return res
  }

  /**
   * Envia uma imagem para um contato existente
   * @method sendImage
   * @param {IForWhoFilter} forWho
   * @param {String} urlImage
   * @returns {Promise<ApiResult>}
   */
  async sendImage(forWho, urlImage) {
    const filter = prepareSendFilter(forWho)
    if (!filter) return this.addError('internal: no contact')
    if (!isValidURL(urlImage)) return this.addError('internal: invalid url')

    const imageExtension = extractExtension(urlImage)
    if (!this.isValidExt(imageExtension, 'image')) {
      return this.addError(`internal: invalid extension ${imageExtension}`)
    }

    const payload = { ...filter, imageUrl: urlImage, imageExtension }
    const res = await this.requestApi(postType.SENDIMAGE, payload)
    return res
  }

  /**
   * Envia um arquivo para um contato existente
   * @method sendFile
   * @param {IForWhoFilter} forWho
   * @param {String} urlFile
   * @returns {Promise<ApiResult>}
   */
  async sendFile(forWho, urlFile) {
    const filter = prepareSendFilter(forWho)
    if (!filter) return this.addError('internal: no contact')
    if (!isValidURL(urlFile)) return this.addError('internal: invalid url')

    const fileExtension = extractExtension(urlFile)
    if (!this.isValidExt(fileExtension, 'file')) {
      return this.addError(`internal: invalid extension ${fileExtension}`)
    }

    const payload = { ...filter, fileUrl: urlFile, fileExtension }
    const res = await this.requestApi(postType.SENDFILE, payload)
    return res
  }

  /**
   * Envia um audio para um contato existente
   * @method sendSound
   * @param {IForWhoFilter} forWho
   * @param {String} urlSound
   * @returns {Promise<ApiResult>}
   */
  async sendSound(forWho, urlSound) {
    const filter = prepareSendFilter(forWho)
    if (!filter) return this.addError('internal: no contact')
    if (!isValidURL(urlSound)) return this.addError('internal: invalid url')

    const soundExtension = extractExtension(urlSound)
    if (!this.isValidExt(soundExtension, 'sound')) {
      return this.addError(`internal: invalid extension ${soundExtension}`)
    }

    const payload = { ...filter, soundUrl: urlSound, soundExtension }
    const res = await this.requestApi(postType.SENDSOUND, payload)
    return res
  }

  /**
   * @private
   * @method requestApi
   * @param {PostType} type
   * @param {IRequestPayload} payload
   * @returns {Promise<ApiResult>}
   */

  async requestApi(type, payload = {}) {
    const self = this

    const source = getCancelToken().source()
    const cancelToken = source.token
    this.addCancelSource(source)

    const result = await Api.post(
      null,
      {
        cmd: type,
        token: self.config.token,
        ...payload
      },
      {
        timeout: self.config.timeout,
        baseURL: self.config.baseURL,
        cancelToken
      }
    )

    if (result && result.status) this.ready = true

    this.removeCancelSource(cancelToken)
    return result
  }

  /**
   * @private
   * @method addCancelSource
   * @param {CancelTokenSource} source
   * @returns {this}
   */
  addCancelSource(source) {
    this.cancelSources.push({
      idToken: source.token,
      source
    })
    return this
  }

  /**
   * @private
   * @method removeCancelSource
   * @param {CancelToken|string} idTokenSource
   * @returns {this}
   */
  removeCancelSource(idTokenSource) {
    if (idTokenSource) {
      const newList = this.cancelSources.filter(({ idToken }) => idToken !== idTokenSource)
      this.cancelSources = newList || []
      return this
    }
    this.cancelSources = []
    return this
  }

  /**
   * @method cancel
   * @returns {this}
   */
  cancel() {
    this.cancelSources.forEach(({ source }) => source && source.cancel())
    this.removeCancelSource()
    return this
  }
}

export default Maxbot
