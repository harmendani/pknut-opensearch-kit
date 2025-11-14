const index = require('../src')

describe('test the scene: index as a public module', () => {
  test('exports the public interface obj', () => {
    expect(index).toHaveProperty('CommanderFactory')
    expect(index).toHaveProperty('OpenSearch')
  })
})
