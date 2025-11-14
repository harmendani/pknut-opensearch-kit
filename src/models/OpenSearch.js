module.exports = ({ OpenSearchService }) => {
  /**
 * @class OpenSearch
 * @summary Create a instance for execute operations through OpenSearch Service
 */
  return class OpenSearch {
    #connection
    /**
   * @constructor
   * @param {Object} prop
   * @param  {String} prop.host Uri to connect to the opensearch cluster
   * @param  {Object} [prop.options = {}] Override the default configuration
 */
    constructor ({ host, options }) {
      this.#connection = new OpenSearchService({ host, options })
        .get()
    }

    /**
 * @function search
 * @summary Run an async search operation
 * @param {Object} args Accept the params created before with QueryBuilder entity
 * @returns {Array<Object>} Result for search operation
*/
    async search (params) {
      const result = await this.#connection.search(params)
      return result
    }
  }
}
