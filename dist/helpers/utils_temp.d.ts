/**
 * FIXME: refactor to performance
 * @function prepareSendFilter
 * @param {import('../Maxbot/types/sending').IForWhoFilter} forWhoFilter
 */
export function prepareSendFilter(forWhoFilter: import('../Maxbot/types/sending').IForWhoFilter): false | {
    ctExternalId: number;
    ctWhatsapp: string;
    ctBrCpf: string;
};
/**
 * Temporário até padronizar o endpoint
 * @function normalizeContactSegmentation
 * @param {string|string[]} segmentation
 * @returns {string}
 */
export function normalizeContactSegmentation(segmentation: string | string[]): string;
