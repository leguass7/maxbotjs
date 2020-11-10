/**
 * @typedef {import('./types/types').MaxbotOptions} MaxbotOptions
 * @typedef {import('./types/types').ApiResult} ApiResult
 * @typedef {import('./types/status').IGetStatusResult} IGetStatusResult
 * @typedef {import('./types/contact').IContactFilter} IContactFilter
 * @typedef {import('./types/contact').IContactData} IContactData
 *
 * @typedef {import('./types/contact').IGetContactResult} IGetContactResult
 * @typedef {import('./types/protocol').IProtFilter} IProtFilter
 * @typedef {import('./types/protocol').IGetProtResult} IGetProtResult
 *
 * @exports MaxbotOptions
 * @exports IGetStatusResult
 * @exports IContactFilter
 * @exports IGetContactResult
 * @exports IProtFilter
 * @exports IGetProtResult
 */

/**
 * @class
 * Class Maxbot
 * - setMe
 * - getMe
 */
class Maxbot {
  /**
   * @constructor
   * @param {MaxbotOptions} params
   */
  constructor(params) {
    /** @type {MaxbotOptions} */
    this.config = { token: '' }
    if (params) this.setMe(params)
    return this
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
   * @returns {IGetStatusResult}
   */
  getStatus() {}

  /**
   * Importar a ficha de cadastro do contato
   * @method getContact
   * @param {IContactFilter} filter
   * @returns {IGetContactResult}
   */
  getContact(filter) {}

  /**
   * Importar os protocolos concluídos em um determinado período
   * @method getProt
   * @param {IProtFilter} filter
   * @returns {IGetProtResult}
   */
  getProt(filter) {}

  /**
   * Criar um novo contato no Maxbot
   * @method putContact
   * @param {IContactData} contactData
   * @returns {ApiResult}
   */
  putContact(contactData) {}

  /**
   * Atualizar dados de um contato existente
   * @method setContact
   * @param {IContactData} contactData
   * @returns {ApiResult}
   */
  setContact(contactData) {}

  /**
   * Atualizar dados de um contato existente
   * @method sendText
   * @param {String} find
   * @param {String} text
   * @returns {ApiResult}
   */
  sendText(find, text) {}
}

export default Maxbot
