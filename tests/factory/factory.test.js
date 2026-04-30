const factory = require('../../src/factory/factory.js')
const factoryIndex = require('../../src/factory/index.js')

describe('test the scene: factory module', () => {
  test('exports OpenSearch and CommanderFactory constructors', () => {
    const { CommanderFactory, OpenSearch } = factory({ queryFormat: 'flat' })
    expect(OpenSearch).toBeInstanceOf(Function)
    expect(CommanderFactory).toBeInstanceOf(Function)
  })

  test('CommanderFactory from factory uses the injected queryFormat', () => {
    const { CommanderFactory: FlatFactory } = factory({ queryFormat: 'flat' })
    const { CommanderFactory: BodyFactory } = factory({ queryFormat: 'body' })

    const flatQuery = new FlatFactory({ index: 'test' }).build()
    const bodyQuery = new BodyFactory({ index: 'test' }).build()

    expect(flatQuery).not.toHaveProperty('body')
    expect(flatQuery).toHaveProperty('query')
    expect(bodyQuery).toHaveProperty('body')
    expect(bodyQuery).not.toHaveProperty('query')
  })

  test('createClient is exported from factory index', () => {
    expect(factoryIndex).toHaveProperty('createClient')
    expect(factoryIndex.createClient).toBeInstanceOf(Function)
  })

  test('createClient with opensearch stack returns valid factory', () => {
    const result = factoryIndex.createClient({ stack: 'opensearch' })
    expect(result).toHaveProperty('OpenSearch')
    expect(result).toHaveProperty('CommanderFactory')
  })

  test('createClient with elasticsearch-v8 stack returns valid factory', () => {
    const result = factoryIndex.createClient({ stack: 'elasticsearch-v8' })
    expect(result).toHaveProperty('OpenSearch')
    expect(result).toHaveProperty('CommanderFactory')
  })

  test('build() on opensearch stack produces flat format automatically', () => {
    const { CommanderFactory } = factoryIndex.createClient({ stack: 'opensearch' })
    const query = new CommanderFactory({ index: 'test' }).build()
    expect(query).not.toHaveProperty('body')
    expect(query).toHaveProperty('query')
  })

  test('build() on elasticsearch-v8 stack produces flat format automatically', () => {
    const { CommanderFactory } = factoryIndex.createClient({ stack: 'elasticsearch-v8' })
    const query = new CommanderFactory({ index: 'test' }).build()
    expect(query).not.toHaveProperty('body')
    expect(query).toHaveProperty('query')
  })
})
