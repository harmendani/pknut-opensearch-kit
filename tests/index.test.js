const index = require('../src')

describe('test the scene: index as a public module', () => {
  test('exports the public interface obj', () => {
    expect(index).toHaveProperty('CommanderFactory')
    expect(index).toHaveProperty('OpenSearch')
    expect(index).toHaveProperty('createClient')
  })

  test('createClient returns OpenSearch and CommanderFactory for opensearch stack', () => {
    const client = index.createClient({ stack: 'opensearch' })
    expect(client).toHaveProperty('OpenSearch')
    expect(client).toHaveProperty('CommanderFactory')
    expect(client.OpenSearch).toBeInstanceOf(Function)
    expect(client.CommanderFactory).toBeInstanceOf(Function)
  })

  test('createClient returns OpenSearch and CommanderFactory for elasticsearch-v8 stack', () => {
    const client = index.createClient({ stack: 'elasticsearch-v8' })
    expect(client).toHaveProperty('OpenSearch')
    expect(client).toHaveProperty('CommanderFactory')
    expect(client.OpenSearch).toBeInstanceOf(Function)
    expect(client.CommanderFactory).toBeInstanceOf(Function)
  })

  test('createClient defaults to opensearch stack when no options given', () => {
    const client = index.createClient()
    expect(client).toHaveProperty('OpenSearch')
    expect(client).toHaveProperty('CommanderFactory')
  })
})
