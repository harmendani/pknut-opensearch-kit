const {
  CustomQueryCommand,
  FilterCommand,
  MustCommand,
  ShouldCommand,
  SortCommand
} = require('./commands/BaseQueryCommands')

const QueryBuilder = require('./QueryBuilder')

class CommanderFactory {
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

  build () {
    this.commands.forEach(command => command.execute(this.queryBuilder))
    return this.queryBuilder.build()
  }

  /**
   * Build and return the final query in flat format for modern clients (ES 8.x+ / OpenSearch 2.x+).
   * Unlike `build()`, params are at the top level — no `body` wrapper.
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

module.exports = CommanderFactory
