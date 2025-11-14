const CommanderFactory = require('../../src/models/CommanderFactory')
const QueryBuilder = require('../../src/models/QueryBuilder')
const {
  MustCommand,
  FilterCommand,
  ShouldCommand,
  SortCommand,
  CustomQueryCommand
} = require('../../src/models/commands/BaseQueryCommands')

describe('CommanderFactory Tests', () => {
  let factory

  beforeEach(() => {
    factory = new CommanderFactory({ index: 'test_index' })
  })

  test('should add filter command', () => {
    const clause = [{ term: { status: 'active' } }]
    factory.addFilter(clause)

    expect(factory.commands[0]).toBeInstanceOf(FilterCommand)
    expect(factory.commands[0].filterQueries).toEqual(clause)
  })

  test('should add must command', () => {
    const clause = [{ match: { title: 'test' } }]
    factory.addMust(clause)

    expect(factory.commands[0]).toBeInstanceOf(MustCommand)
    expect(factory.commands[0].mustQueries).toEqual(clause)
  })

  test('should add should command', () => {
    const clause = [{ match: { description: 'test description' } }]
    factory.addShould(clause)

    expect(factory.commands[0]).toBeInstanceOf(ShouldCommand)
    expect(factory.commands[0].shouldQueries).toEqual(clause)
  })

  test('should add sort command', () => {
    const clause = { field: 'createdAt', order: 'desc' }
    factory.addSort(clause)

    expect(factory.commands[0]).toBeInstanceOf(SortCommand)
    expect(factory.commands[0].sortCriteria).toEqual(clause)
  })

  test('should add custom command', () => {
    const clause = { query: { bool: { must: [{ match: { title: 'test' } }] } } }
    factory.addCustom(clause)

    expect(factory.commands[0]).toBeInstanceOf(CustomQueryCommand)
    expect(factory.commands[0].customQuery).toEqual(clause)
  })

  test('should set size command', () => {
    jest.spyOn(QueryBuilder.prototype, 'setSize')
    const size = 50
    factory.setSize(size)

    expect(QueryBuilder.prototype.setSize).toHaveBeenCalledWith(size)
    expect(factory.queryBuilder.size).toBe(size)
  })

  test('should set from command', () => {
    jest.spyOn(QueryBuilder.prototype, 'setFrom')
    const from = 0
    factory.setFrom(from)

    expect(QueryBuilder.prototype.setFrom).toHaveBeenCalledWith(from)
    expect(factory.queryBuilder.from).toBe(from)
  })

  test('should set index command', () => {
    jest.spyOn(QueryBuilder.prototype, 'setIndex')
    const index = 'new_index'
    factory.setIndex(index)

    expect(QueryBuilder.prototype.setIndex).toHaveBeenCalledWith(index)
    expect(factory.queryBuilder.index).toBe(index)
  })

  test('should set trackScore command', () => {
    jest.spyOn(QueryBuilder.prototype, 'setTrackScore')
    const isTracked = true
    factory.setTrackScore(isTracked)

    expect(QueryBuilder.prototype.setTrackScore).toHaveBeenCalledWith(isTracked)
    expect(factory.queryBuilder.track_scores).toBe(isTracked)
  })

  test('run build query with isValidObjectQuery is not true', () => {
    jest.spyOn(QueryBuilder.prototype, 'build')
    const commanderInstance = new CommanderFactory({ index: 'contents' })
    const customCommand = new CustomQueryCommand(null)

    commanderInstance.commands.push(customCommand)
    const query = commanderInstance.build()

    expect(QueryBuilder.prototype.build).toHaveBeenCalled()
    expect(query).toEqual({
      index: 'contents',
      body: {
        query: { bool: {} },
        sort: [],
        track_scores: false,
        size: '100',
        from: 0
      }
    })
  })

  test('run build query with isValidObjectQuery is true', () => {
    jest.spyOn(QueryBuilder.prototype, 'build')
    const commanderInstance = new CommanderFactory({ index: 'contents' })
    const customCommand = new FilterCommand([{ term: 'test' }])

    commanderInstance.commands.push(customCommand)
    const query = commanderInstance.build()

    expect(QueryBuilder.prototype.build).toHaveBeenCalled()
    expect(query).toEqual({
      index: 'contents',
      body: {
        query: { bool: { filter: [{ term: 'test' }] } },
        sort: [],
        track_scores: false,
        size: '100',
        from: 0
      }
    })
  })

  test('should run build command', () => {
    jest.spyOn(QueryBuilder.prototype, 'build')
    const mockCommand = { execute: jest.fn() }
    factory.commands.push(mockCommand)
    factory.build()

    expect(mockCommand.execute).toHaveBeenCalledWith(factory.queryBuilder)
    expect(QueryBuilder.prototype.build).toHaveBeenCalled()
  })

  test('should add builtIn queries command', () => {
    class BuiltInQueryMock {
      constructor (values) {
        this.values = values
      }

      execute (queryBuilder) {
        queryBuilder.addMust({ match: { field: this.values } })
      }
    }
    const values = []

    factory.addBuiltInQueries(BuiltInQueryMock, values)
    expect(factory.commands[0]).toBeInstanceOf(BuiltInQueryMock)
  })
})
