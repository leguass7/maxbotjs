export default Maxbot;
export type MaxbotOptions = import('./types/types').MaxbotOptions;
export type ApiResult = import('./types/types').ApiResult;
export type ITemplateResult = import('./types/types').ITemplateResult;
export type IServiceSectorResult = import('./types/types').IServiceSectorResult;
export type IAttendantResult = import('./types/types').IAttendantResult;
export type PostType = import('./types/types').PostType;
export type IRequestPayload = import('./types/types').IRequestPayload;
export type ICancelSource = import('./types/types').ICancelSource;
export type IGetStatusResult = import('./types/status').IGetStatusResult;
export type IStatusData = import('./types/status').IStatusData;
export type ISegmentationData = import('./types/segmentation').ISegmentationData;
export type IGetSegmentationResult = import('./types/segmentation').IGetSegmentationResult;
export type IContactFilter = import('./types/contact').IContactFilter;
export type IContactData = import('./types/contact').IContactData;
export type ISetContactData = import('./types/contact').ISetContactData;
export type IPutContactData = import('./types/contact').IPutContactData;
export type IGetContactResult = import('./types/contact').IGetContactResult;
export type IProtFilter = import('./types/protocol').IProtFilter;
export type IGetProtResult = import('./types/protocol').IGetProtResult;
export type IForWhoFilter = import('./types/sending').IForWhoFilter;
export type ISendTextResult = import('./types/sending').ISendTextResult;
export type IServiceSector = import('./types/serviceSector').IServiceSector;
export type CancelTokenSource = import('axios').CancelTokenSource;
export type CancelToken = import('axios').CancelToken;
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
declare class Maxbot {
    /**
     * @constructor
     * @param {MaxbotOptions} params
     */
    constructor(params: MaxbotOptions);
    /** @type {MaxbotOptions} */
    config: MaxbotOptions;
    ready: boolean;
    loggingPrefix: string;
    version: any;
    Api: import("axios").AxiosInstance;
    /** @type {ICancelSource[]} */
    cancelSources: ICancelSource[];
    /** @private */
    private allowedExt;
    log(...args: any[]): void;
    /**
     * @private
     * @method getCancelToken
     */
    private getCancelToken;
    /**
     * @private
     * @method configureAxios
     */
    private configureAxios;
    /**
     * @private
     * @method configureRequests
     */
    private configureRequests;
    /**
     * @private
     * @method configureRequests
     */
    private configureResponses;
    /**
     * @private
     * @method addError
     * @param {string} msg
     */
    private addError;
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
    isValidExt(extension: any, type?: 'file' | 'image' | 'sound'): boolean;
    /**
     * Verifica se bot esta pronto
     * @method isReady
     * @param {Boolean} force force api request status
     * @returns {Promise<Boolean>}
     */
    isReady(force?: boolean): Promise<boolean>;
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
     * Importar service sectors do Maxbot
     * @method getServiceSector
     * @returns {Promise<IServiceSectorResult>}
     */
    getServiceSector(): Promise<IServiceSectorResult>;
    /**
     * Importar atendentes do Maxbot
     * @method getAttendant
     * @returns {Promise<IAttendantResult>}
     */
    getAttendant(): Promise<IAttendantResult>;
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
     * @param {IPutContactData} contactData
     * @returns {Promise<ApiResult>}
     */
    putContact(contactData: IPutContactData): Promise<ApiResult>;
    /**
     * Atualizar dados de um contato existente
     * @method setContact
     * @param {ISetContactData} contactData
     * @returns {Promise<ApiResult>}
     */
    setContact(contactData: ISetContactData): Promise<ApiResult>;
    /**
     * Abrir um followup do Maxbot
     * @method openFollowup
     * @param {IFollowupData} followupData
     * @returns {Promise<ApiResult>}
     */
    openFollowup(followupData: any): Promise<ApiResult>;
    /**
     * Envia uma mensagem de texto para um contato existente
     * @method sendText
     * @param {IForWhoFilter} forWho
     * @param {String} text
     * @returns {Promise<ISendTextResult>}
     */
    sendText(forWho: IForWhoFilter, text: string): Promise<ISendTextResult>;
    /**
     * Envia uma imagem para um contato existente
     * @method sendImage
     * @param {IForWhoFilter} forWho
     * @param {String} urlImage
     * @returns {Promise<ApiResult>}
     */
    sendImage(forWho: IForWhoFilter, urlImage: string): Promise<ApiResult>;
    /**
     * Envia um arquivo para um contato existente
     * @method sendFile
     * @param {IForWhoFilter} forWho
     * @param {String} urlFile
     * @returns {Promise<ApiResult>}
     */
    sendFile(forWho: IForWhoFilter, urlFile: string): Promise<ApiResult>;
    /**
     * Envia um audio para um contato existente
     * @method sendSound
     * @param {IForWhoFilter} forWho
     * @param {String} urlSound
     * @returns {Promise<ApiResult>}
     */
    sendSound(forWho: IForWhoFilter, urlSound: string): Promise<ApiResult>;
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
