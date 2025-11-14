const config = require('../../src/config')

describe('test the scene: global config', () => {
  test('object must be a frozen', () => {
    expect(Object.isFrozen(config)).toBeTruthy()
  })
})
