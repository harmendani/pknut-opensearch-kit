module.exports = ({ Client, openSearchDefault }) => (
  class OpenSearchService {
    /**
    * @constructor
    * @summary Create a connection to the opensearch service
    * @param { Object } prop
    * @param { String } prop.host The uri to connection
    * @param  { Object } [prop.options = {}] Options to override the default config
    */
    constructor ({ host, options = {} }) {
      this.connection = new Client({
        node: host,
        ...openSearchDefault,
        ...options
      })
    }

    /** @returns {Object} connection instance */
    get () {
      return this.connection
    }
  }
)
