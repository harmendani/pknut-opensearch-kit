const factory = require('../../src/factory/factory.js')

describe('test the scene: factory module', () => {
  test('exports a type method', () => {
    const CommanderClass = factory({}).CommanderFactory
    const OpenSearchClass = factory({}).OpenSearch
    expect(OpenSearchClass).toBeInstanceOf(Function)
    expect(CommanderClass).toBeInstanceOf(Function)
  })
})
