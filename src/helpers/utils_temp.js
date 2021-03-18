/**
 * FIXME: refactor to performance
 * @function prepareSendFilter
 * @param {import('../Maxbot/types/sending').IForWhoFilter} forWhoFilter
 */
export function prepareSendFilter(forWhoFilter) {
  const { externalId, whatsapp, brCpf } = forWhoFilter
  const result = {}
  if (externalId) {
    result.ctExternalId = externalId
  } else if (whatsapp) {
    result.ctWhatsapp = whatsapp
  } else if (brCpf) {
    result.ctBrCpf = brCpf
  } else {
    return false
  }
  return result
}

/**
 * Temporário até padronizar o endpoint
 * @function normalizeContactSegmentation
 * @param {string|string[]} segmentation
 * @returns {string}
 */
export function normalizeContactSegmentation(segmentation) {
  if (segmentation && Array.isArray(segmentation)) {
    return segmentation.filter(f => !!f).join(',')
  }
  return segmentation
}
