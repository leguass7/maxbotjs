/**
 * @function replaceAll
 * @param {String} str
 * @param {String} needle
 * @param {String} replacement
 * @example
 * replaceAll('T*T', '*', '_') // return 'T_T'
 */
export function replaceAll(str: string, needle: string, replacement: string): string;
/**
 * @function extractExtension
 * @param {string} url
 * @returns {string}
 */
export function extractExtension(url: string): string;
/**
 * FIXME: refactor to performance
 * @function prepareSendFilter
 * @param {import('./types/sending').IForWhoFilter} forWhoFilter
 */
export function prepareSendFilter(forWhoFilter: import('./types/sending').IForWhoFilter): false | {
    ctExternalId: number;
    ctWhatsapp: string;
    ctBrCpf: string;
};
/**
 * @function isValidURL
 * @param {string} str
 * @returns {boolean}
 */
export function isValidURL(string: any): boolean;
