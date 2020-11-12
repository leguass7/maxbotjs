export default Maxbot;
export type MaxbotOptions = import("./types/types").MaxbotOptions;
export type ApiResult = import("./types/types").ApiResult;
export type PostType = "get_status" | "get_contact" | "get_prot" | "put_contact" | "set_contact" | "send_text" | "send_image" | "send_file" | "send_sound";
export type IRequestPayload = import("./types/types").IRequestPayload;
export type IGetStatusResult = import("./types/status").IGetStatusResult;
export type IStatusData = any;
export type IContactFilter = import("./types/contact").IContactFilter;
export type IContactData = import("./types/contact").IContactData;
export type IGetContactResult = import("./types/contact").IGetContactResult;
export type IProtFilter = import("./types/protocol").IProtFilter;
export type IGetProtResult = import("./types/protocol").IGetProtResult;
/**
 * @class
 * Class Maxbot methods:
 * - setMe
 * - getMe
 * - getStatus
 * - getProt
 * - putContact
 * - setContact
 * - sendText
 * - sendImage
 * - sendFile
 * - sendSound
 */
declare class Maxbot {
    /**
     * @constructor
     * @param {MaxbotOptions} params
     */
    constructor(params: MaxbotOptions);
    /** @type {MaxbotOptions} */
    config: MaxbotOptions;
    ready: boolean;
    /**
     * Verifica se bot esta pronto
     * @method isReady
     * @param {Boolean} force force api request status
     * @returns {Promise<Boolean>}
     */
    isReady(force: boolean): Promise<boolean>;
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
     * @returns {Promise<IGetStatusResult>}
     */
    getStatus(): Promise<IGetStatusResult>;
    /**
     * Importar a ficha de cadastro do contato
     * @method getContact
     * @param {IContactFilter} filter
     * @returns {Promise<IGetContactResult>}
     */
    getContact(filter: IContactFilter): Promise<IGetContactResult>;
    /**
     * Importar os protocolos concluídos em um determinado período
     * @method getProt
     * @param {IProtFilter} filter
     * @returns {Promise<IGetProtResult>}
     */
    getProt(filter: IProtFilter): Promise<IGetProtResult>;
    /**
     * Criar um novo contato no Maxbot
     * @method putContact
     * @param {IContactData} contactData
     * @returns {Promise<ApiResult>}
     */
    putContact(contactData: IContactData): Promise<ApiResult>;
    /**
     * Atualizar dados de um contato existente
     * @method setContact
     * @param {IContactData} contactData
     * @returns {Promise<ApiResult>}
     */
    setContact(contactData: IContactData): Promise<ApiResult>;
    /**
     * Envia uma mensagem de texto para um contato existente
     * @method sendText
     * @param {String|IContactFilter} forWho
     * @param {String} text
     * @returns {Promise<ApiResult>}
     */
    sendText(forWho: string | IContactFilter, text: string): Promise<ApiResult>;
    /**
     * Envia uma imagem para um contato existente
     * @method sendImage
     * @param {String|IContactFilter} forWho
     * @param {String} urlImage
     * @returns {Promise<ApiResult>}
     */
    sendImage(forWho: string | IContactFilter, urlImage: string): Promise<ApiResult>;
    /**
     * Envia um arquivo para um contato existente
     * @method sendFile
     * @param {String|IContactFilter} forWho
     * @param {String} urlFile
     * @returns {Promise<ApiResult>}
     */
    sendFile(forWho: string | IContactFilter, urlFile: string): Promise<ApiResult>;
    /**
     * Envia um audio para um contato existente
     * @method sendSound
     * @param {String|IContactFilter} forWho
     * @param {String} urlSound
     * @returns {Promise<ApiResult>}
     */
    sendSound(forWho: string | IContactFilter, urlSound: string): Promise<ApiResult>;
    /**
     * @private
     * @method requestApi
     * @param {PostType} type
     * @param {IRequestPayload} payload
     * @returns {Promise<ApiResult>}
     */
    private requestApi;
}
