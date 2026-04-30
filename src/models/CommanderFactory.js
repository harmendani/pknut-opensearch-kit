const {
  CustomQueryCommand,
  FilterCommand,
  MustCommand,
  ShouldCommand,
  SortCommand
} = require('./commands/BaseQueryCommands')

const QueryBuilder = require('./QueryBuilder')

/**
 * @param {Object} [dependencies={}]
 * @param {'flat'|'body'} [dependencies.queryFormat='flat'] Controls the output of `build()`.
 *   - 'flat' : returns { index, query, sort, ... }  — for ES 8.x+ / OpenSearch 2.x+ clients
 *   - 'body' : returns { index, body: { query, ... } } — for legacy ES 7.x clients
 * @returns {typeof CommanderFactory}
 */
module.exports = function createCommanderFactory ({ queryFormat = 'flat' } = {}) {
  /**
   * @class CommanderFactory
   * @classdesc Builds and manages complex search queries using the Command Pattern.
   * The output format of `build()` is controlled by the `queryFormat` passed to the factory
   * (automatically set by `createClient()`), so callers never need to choose between
   * `build()` and `buildFlat()` manually.
   */
  return class CommanderFactory {
    constructor ({ index }) {
      this.queryBuilder = new QueryBuilder({ index })
      this.commands = []
    }

    addFilter (clause) {
      this.commands.push(new FilterCommand(clause))
      return this
    }

    addMust (clause) {
      this.commands.push(new MustCommand(clause))
      return this
    }

    addShould (clause) {
      this.commands.push(new ShouldCommand(clause))
      return this
    }

    addSort (clause) {
      this.commands.push(new SortCommand(clause))
      return this
    }

    addCustom (clause) {
      this.commands.push(new CustomQueryCommand(clause))
      return this
    }

    // Methods to configure query properties
    setSize (size) {
      this.queryBuilder.setSize(size)
      return this
    }

    setFrom (from) {
      this.queryBuilder.setFrom(from)
      return this
    }

    setIndex (index) {
      this.queryBuilder.setIndex(index)
      return this
    }

    setTrackScore (isTracked) {
      this.queryBuilder.setTrackScore(isTracked)
      return this
    }

    /**
     * Build and return the final query.
     * The output format is automatically determined by the stack configured in `createClient()`:
     *  - Modern stacks (opensearch, elasticsearch-v8): flat format `{ index, query, sort, ... }`
     *  - Legacy format (body): `{ index, body: { query, ... } }`
     */
    build () {
      this.commands.forEach(command => command.execute(this.queryBuilder))
      return queryFormat === 'flat'
        ? this.queryBuilder.buildFlat()
        : this.queryBuilder.build()
    }

    /**
     * Explicitly build in flat format regardless of configured stack.
     * Returns `{ index, query, sort, ... }` — no `body` wrapper.
     * Useful when you need to override the format for a specific query.
     */
    buildFlat () {
      this.commands.forEach(command => command.execute(this.queryBuilder))
      return this.queryBuilder.buildFlat()
    }

    /**
     * Adds a specific built-in query to the list of executors.
     *
     * @param {Class} BuiltInQuery - addBuiltInQueries This should be a class reference to a built-in query.
     * @param {Array} values - pass a Array of values
     *
     * @example
     * // Importing the built-in class ReleaseYear
     * const { builtInQueries: {ReleaseYear} } = require('./src');
     * // The `addBuiltInQueries` method instantiates the `ReleaseYear` class with the current
     * // Finally, you can use the build() to generate a query
     */
    addBuiltInQueries (BuiltInQuery, values) {
      const builtIn = new BuiltInQuery(values)
      this.commands.push(builtIn)
    }
  }
}
