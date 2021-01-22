export default Maxbot;
export type MaxbotOptions = import("./types/types").MaxbotOptions;
export type ApiResult = import("./types/types").ApiResult;
export type ITemplateResult = import("./types/types").ITemplateResult;
export type PostType = "get_status" | "get_segmentation" | "get_contact" | "get_prot" | "put_contact" | "set_contact" | "send_text" | "send_image" | "send_file" | "send_sound";
export type IRequestPayload = import("./types/types").IRequestPayload;
export type IGetStatusResult = import("./types/status").IGetStatusResult;
export type IStatusData = import("./types/status").IStatusData;
export type ISegmentationData = import("./types/segmentation").ISegmentationData;
export type IGetSegmentationResult = import("./types/segmentation").IGetSegmentationResult;
export type IContactFilter = import("./types/contact").IContactFilter;
export type IContactData = import("./types/contact").IContactData;
export type IGetContactResult = import("./types/contact").IGetContactResult;
export type IProtFilter = import("./types/protocol").IProtFilter;
export type IGetProtResult = import("./types/protocol").IGetProtResult;
export type ICancelSource = import("./types/types").ICancelSource;
export type IForWhoFilter = import("./types/sending").IForWhoFilter;
export type CancelTokenSource = import("axios").CancelTokenSource;
export type CancelToken = import("axios").CancelToken;
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
declare class Maxbot {
    /**
     * @constructor
     * @param {MaxbotOptions} params
     */
    constructor(params: MaxbotOptions);
    /** @type {MaxbotOptions} */
    config: MaxbotOptions;
    ready: boolean;
    /** @type {ICancelSource[]} */
    cancelSources: ICancelSource[];
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
     * Importar seguimentações do Maxbot
     * @method getSegmentation
     * @returns {Promise<IGetSegmentationResult>}
     */
    getSegmentation(): Promise<IGetSegmentationResult>;
    /**
     * Importar templates do Maxbot
     * @method getTemplate
     * @returns {Promise<ITemplateResult>}
     */
    getTemplate(): Promise<ITemplateResult>;
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
     * @param {IForWhoFilter} forWho
     * @param {String} text
     * @returns {Promise<ApiResult>}
     */
    sendText(forWho: IForWhoFilter, text: string): Promise<ApiResult>;
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
    /**
     * @private
     * @method addCancelSource
     * @param {CancelTokenSource} source
     * @returns {this}
     */
    private addCancelSource;
    /**
     * @private
     * @method removeCancelSource
     * @param {CancelToken|string} idTokenSource
     * @returns {this}
     */
    private removeCancelSource;
    /**
     * @method cancel
     * @returns {this}
     */
    cancel(): this;
}
