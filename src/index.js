/**
 * @typedef {import('./types/types').MaxbotOptions} MaxbotOptions
 * @typedef {import('./types/types').ApiResult} ApiResult
 * @typedef {import('./types/types').ITemplateResult} ITemplateResult
 * @typedef {import('./types/types').PostType} PostType
 * @typedef {import('./types/types').IRequestPayload} IRequestPayload
 * @typedef {import('./types/status').IGetStatusResult} IGetStatusResult
 * @typedef {import('./types/status').IStatusData} IStatusData
 * @typedef {import('./types/segmentation').ISegmentationData} ISegmentationData
 * @typedef {import('./types/segmentation').IGetSegmentationResult} IGetSegmentationResult
 * @typedef {import('./types/contact').IContactFilter} IContactFilter
 * @typedef {import('./types/contact').IContactData} IContactData
 * @typedef {import('./types/contact').IGetContactResult} IGetContactResult
 * @typedef {import('./types/protocol').IProtFilter} IProtFilter
 * @typedef {import('./types/protocol').IGetProtResult} IGetProtResult
 * @typedef {import('./types/types').ICancelSource} ICancelSource
 *
 * @typedef {import('axios').CancelTokenSource} CancelTokenSource
 * @typedef {import('axios').CancelToken} CancelToken
 *
 * @exports MaxbotOptions
 * @exports ApiResult
 * @exports PostType
 * @exports IRequestPayload
 * @exports IGetStatusResult
 * @exports IStatusData
 * @exports IGetSegmentationResult
 * @exports IContactFilter
 * @exports IContactData
 * @exports IGetContactResult
 * @exports IProtFilter
 * @exports IGetProtResult
 * @exports ICancelSource
 * @exports CancelTokenSource
 * @exports CancelToken
 */
import Api, { getCancelToken } from './Api'

const postType = {
  GETSTATUS: 'get_status',
  GETSEGMENTATION: 'get_segmentation',
  GETTEMPLATE: 'get_template',
  GETCONTACT: 'get_contact',
  GETPROT: 'get_prot',
  PUTCONTACT: 'put_contact',
  SETCONTACT: 'set_contact',
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
 * - getProt
 * - putContact
 * - setContact
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
    this.config = { token: '', timeout: 3000, baseURL }
    this.ready = false
    /** @type {ICancelSource[]} */
    this.cancelSources = []

    this.setMe(params)
    return this
  }

  /**
   * Verifica se bot esta pronto
   * @method isReady
   * @param {Boolean} force force api request status
   * @returns {Promise<Boolean>}
   */
  async isReady(force) {
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
   * @param {IContactData} contactData
   * @returns {Promise<ApiResult>}
   */
  async setContact(contactData) {
    const res = await this.requestApi(postType.SETCONTACT, contactData)
    return res
  }

  /**
   * Envia uma mensagem de texto para um contato existente
   * @method sendText
   * @param {String|IContactFilter} forWho
   * @param {String} text
   * @returns {Promise<ApiResult>}
   */
  async sendText(forWho, text) {}

  /**
   * Envia uma imagem para um contato existente
   * @method sendImage
   * @param {String|IContactFilter} forWho
   * @param {String} urlImage
   * @returns {Promise<ApiResult>}
   */
  async sendImage(forWho, urlImage) {}

  /**
   * Envia um arquivo para um contato existente
   * @method sendFile
   * @param {String|IContactFilter} forWho
   * @param {String} urlFile
   * @returns {Promise<ApiResult>}
   */
  async sendFile(forWho, urlFile) {}

  /**
   * Envia um audio para um contato existente
   * @method sendSound
   * @param {String|IContactFilter} forWho
   * @param {String} urlSound
   * @returns {Promise<ApiResult>}
   */
  async sendSound(forWho, urlSound) {}

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
