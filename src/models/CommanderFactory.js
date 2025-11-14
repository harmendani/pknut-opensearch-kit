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
  }

  addMust (clause) {
    this.commands.push(new MustCommand(clause))
  }

  addShould (clause) {
    this.commands.push(new ShouldCommand(clause))
  }

  addSort (clause) {
    this.commands.push(new SortCommand(clause))
  }

  addCustom (clause) {
    return this.commands.push(new CustomQueryCommand(clause))
  }

  // Methods to configure query properties
  setSize (size) {
    this.queryBuilder.setSize(size)
  }

  setFrom (from) {
    this.queryBuilder.setFrom(from)
  }

  setIndex (index) {
    this.queryBuilder.setIndex(index)
  }

  setTrackScore (isTracked) {
    this.queryBuilder.setTrackScore(isTracked)
  }

  build () {
    this.commands.forEach(command => command.execute(this.queryBuilder))
    return this.queryBuilder.build()
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
