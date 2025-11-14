class MustCommand {
  constructor (clause) {
    this.mustQueries = clause
  }

  execute (queryBuilder) {
    this.mustQueries.forEach(query => queryBuilder.addMust(query))
  }
}

class FilterCommand {
  constructor (clause) {
    this.filterQueries = clause
  }

  execute (queryBuilder) {
    this.filterQueries.forEach(query => queryBuilder.addFilter(query))
  }
}

class ShouldCommand {
  constructor (clause) {
    this.shouldQueries = clause
  }

  execute (queryBuilder) {
    this.shouldQueries.forEach(query => queryBuilder.addShould(query))
  }
}

class SortCommand {
  constructor (clause) {
    this.sortCriteria = clause
  }

  execute (queryBuilder) {
    queryBuilder.setSort(this.sortCriteria)
  }
}

class CustomQueryCommand {
  constructor (clause) {
    this.customQuery = clause
  }

  execute (queryBuilder) {
    queryBuilder.setCustomQuery(this.customQuery)
  }
}

module.exports = {
  MustCommand,
  FilterCommand,
  ShouldCommand,
  SortCommand,
  CustomQueryCommand
}
