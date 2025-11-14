const { isValidObjectQuery } = require('../utils')

/**
 * @class QueryBuilder
 * @classdesc A builder to compound by addition methods for clauses such a must, should and others
 */
class QueryBuilder {
  /**
   * @constructor
   * @param {Object} prop
   * @param {String} prop.index The data index to be execute operations
   */
  constructor ({ index }) {
    this.setIndex(index)
    this.query = { bool: {} }
    this.sort = []
    this.track_scores = false
    this.size = '100'
    this.from = 0
  }

  addMust (mustQuery) {
    if (!this.query.bool.must) {
      this.query.bool.must = []
    }
    this.query.bool.must.push(this.#_buildQuery(mustQuery))
    return this
  }

  addFilter (filterQuery) {
    if (!this.query.bool.filter) {
      this.query.bool.filter = []
    }
    this.query.bool.filter.push(this.#_buildQuery(filterQuery))
    return this
  }

  addShould (shouldQuery) {
    if (!this.query.bool.should) {
      this.query.bool.should = []
    }
    this.query.bool.should.push(this.#_buildQuery(shouldQuery))
    return this
  }

  setCustomQuery (customQuery) {
    this.query = this.#_buildQuery(customQuery)
    return this
  }

  setSort (sortCriteria) {
    this.sort.push(sortCriteria)
    return this
  }

  setSize (size) {
    this.size = size
  }

  setFrom (from) {
    this.from = from
  }

  setIndex (index) {
    this.index = index
  }

  setTrackScore (isTracked) {
    this.track_scores = isTracked
  }

  #_buildQuery (query) {
    if (isValidObjectQuery(query)) {
      return query
    } else {
      return this.query
    }
  }

  /**
   * @summary Build the query T to be used as a params on the OpenSearch service
   * @example
    Object<T>
    index: <String>,
    body: {
    index = <null>
    query = { bool: Object }
    sort = <Array>
    track_scores = <<Boolean>
    size = <String>
    this.from = <Number> }
   */
  build () {
    const index = this.index
    const body = {
      query: this.query,
      track_scores: this.track_scores, // eslint-disable-line
      sort: this.sort,
      size: this.size,
      from: this.from
    }

    return { index, body }
  }
}

module.exports = QueryBuilder
