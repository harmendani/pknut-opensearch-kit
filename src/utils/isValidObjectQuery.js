/**
 * Verifica se o valor é um objeto JavaScript válido.
 * Um objeto válido é um valor que:
 * - Não é nulo
 * - É do tipo "object"
 * - Não é um array
 *
 * @param {*} value - O valor a ser verificado.
 * @returns {boolean} - Retorna true se o valor for um objeto válido de query, caso contrário, false.
 */
function isValidObjectQuery (value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length
}

module.exports = isValidObjectQuery
