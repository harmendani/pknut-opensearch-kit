const factory = require('../../src/factory/factory.js')
const factoryIndex = require('../../src/factory/index.js')

describe('test the scene: factory module', () => {
  test('exports a type method', () => {
    const CommanderClass = factory({}).CommanderFactory
    const OpenSearchClass = factory({}).OpenSearch
    expect(OpenSearchClass).toBeInstanceOf(Function)
    expect(CommanderClass).toBeInstanceOf(Function)
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

  test('createClient with legacy stack returns valid factory', () => {
    const result = factoryIndex.createClient({ stack: 'legacy' })
    expect(result).toHaveProperty('OpenSearch')
    expect(result).toHaveProperty('CommanderFactory')
  })
})
