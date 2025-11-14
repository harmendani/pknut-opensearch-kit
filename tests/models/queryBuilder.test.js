const QueryBuilder = require('../../src/models/QueryBuilder')

const dependencies = {
  clause: {
    match: {
      releaseYear: 2002
    }
  },
  objConstructor: {
    index: 'contents',
    query: { bool: {} },
    sort: [],
    track_scores: false,
    size: '100',
    from: 0
  }
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('test the scene: QueryBuilder Model', () => {
  test('starting a new instance passing index name', async () => {
    jest.spyOn(QueryBuilder.prototype, 'setIndex')
    const instance = new QueryBuilder(dependencies.objConstructor)
    expect(QueryBuilder.prototype.setIndex).toHaveBeenCalled()
    expect(instance).toEqual(dependencies.objConstructor)
  })
  test('adding a filter clause on the query', async () => {
    jest.spyOn(QueryBuilder.prototype, 'addFilter')
    const instance = new QueryBuilder(dependencies.objConstructor)
      .addFilter(dependencies.clause)
    expect(QueryBuilder.prototype.addFilter).toHaveBeenCalled()
    expect(instance).toEqual({
      ...dependencies.objConstructor,
      query: {
        bool: {
          filter: [dependencies.clause]
        }
      }
    })
  })
  test('adding a must clause on the query', async () => {
    jest.spyOn(QueryBuilder.prototype, 'addMust')
    const instance = new QueryBuilder(dependencies.objConstructor)
      .addMust(dependencies.clause)
    expect(QueryBuilder.prototype.addMust).toHaveBeenCalled()
    expect(instance).toEqual({
      ...dependencies.objConstructor,
      query: {
        bool: {
          must: [dependencies.clause]
        }
      }
    })
  })

  test('build method should return a query with index and body prop', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const built = instance.build()
    expect(built).toEqual({
      index: dependencies.objConstructor.index,
      body: {
        query: { bool: {} },
        sort: [],
        track_scores: false,
        size: '100',
        from: 0
      }
    })
  })

  test('adding a should clause on the query', async () => {
    jest.spyOn(QueryBuilder.prototype, 'addShould')
    const instance = new QueryBuilder(dependencies.objConstructor)
      .addShould(dependencies.clause)
    expect(QueryBuilder.prototype.addShould).toHaveBeenCalled()
    expect(instance).toEqual({
      ...dependencies.objConstructor,
      query: {
        bool: {
          should: [dependencies.clause]
        }
      }
    })
  })

  test('setCustomQuery with a primitive number type', () => {
    jest.spyOn(QueryBuilder.prototype, 'setCustomQuery')
    const instance = new QueryBuilder(dependencies.objConstructor)
      .setCustomQuery(2020)
    expect(QueryBuilder.prototype.setCustomQuery).toHaveBeenCalled()
    expect(instance).toEqual({
      ...dependencies.objConstructor
    })
  })

  test('should add sort criteria and return instance', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const sortCriteria = { field: 'title', order: 'desc' }

    instance.setSort(sortCriteria)

    expect(instance.sort).toContain(sortCriteria)
  })

  test('should set the size and return instance', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const size = '50'

    instance.setSize(size)

    expect(instance.size).toBe(size)
  })

  test('should set the from value and return instance', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const from = 10

    instance.setFrom(from)

    expect(instance.from).toBe(from)
  })

  test('should set the index and return instance', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const newIndex = 'new_index'

    instance.setIndex(newIndex)

    expect(instance.index).toBe(newIndex)
  })

  test('should set track_scores and return instance', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)
    const trackScores = true

    instance.setTrackScore(trackScores)

    expect(instance.track_scores).toBe(trackScores)
  })

  test('build a default query when not pass any command', () => {
    const instance = new QueryBuilder(dependencies.objConstructor)

    const result = instance.build()
    const bodyExpected = { ...dependencies.objConstructor }
    delete bodyExpected.index

    expect(result).toEqual({
      index: dependencies.objConstructor.index,
      body: bodyExpected
    })
  })
})
