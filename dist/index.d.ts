export default Maxbot;
export type MaxbotOptions = import("./types/types").MaxbotOptions;
export type ApiResult = import("./types/types").ApiResult;
export type IGetStatusResult = import("./types/status").IGetStatusResult;
export type IContactFilter = import("./types/contact").IContactFilter;
export type IContactData = import("./types/contact").IContactData;
export type IGetContactResult = import("./types/contact").IGetContactResult;
export type IProtFilter = import("./types/protocol").IProtFilter;
export type IGetProtResult = import("./types/protocol").IGetProtResult;
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
declare class Maxbot {
    /**
     * @constructor
     * @param {MaxbotOptions} params
     */
    constructor(params: MaxbotOptions);
    /** @type {MaxbotOptions} */
    config: MaxbotOptions;
    /**
     * Configura
     * @method setMe
     * @param {MaxbotOptions|String} prop
     * @param {Number|String|Function} value
     * @returns {this}
     */
    setMe(prop: MaxbotOptions | string, value: number | string | Function): this;
    /**
     * Adquiri configurações
     * @method getMe
     * @returns {MaxbotOptions}
     */
    getMe(): MaxbotOptions;
    /**
     * Verificar a situação atual da API Maxbot
     * @method getStatus
     * @returns {IGetStatusResult}
     */
    getStatus(): IGetStatusResult;
    /**
     * Importar a ficha de cadastro do contato
     * @method getContact
     * @param {IContactFilter} filter
     * @returns {IGetContactResult}
     */
    getContact(filter: IContactFilter): IGetContactResult;
    /**
     * Importar os protocolos concluídos em um determinado período
     * @method getProt
     * @param {IProtFilter} filter
     * @returns {IGetProtResult}
     */
    getProt(filter: IProtFilter): IGetProtResult;
    /**
     * Criar um novo contato no Maxbot
     * @method putContact
     * @param {IContactData} contactData
     * @returns {ApiResult}
     */
    putContact(contactData: IContactData): ApiResult;
    /**
     * Atualizar dados de um contato existente
     * @method setContact
     * @param {IContactData} contactData
     * @returns {ApiResult}
     */
    setContact(contactData: IContactData): ApiResult;
    /**
     * Atualizar dados de um contato existente
     * @method sendText
     * @param {String} find
     * @param {String} text
     * @returns {ApiResult}
     */
    sendText(find: string, text: string): ApiResult;
}
