const { openSearchService: OpenSearchService } = require('../../src/services')

const dependencies = {
  Client: class {
    constructor (
      params
    ) {
      this.node = params.host
    }
  },
  openSearchDefault: {}
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('test the OpenSearchService:', () => {
  test('smoke class', () => {
    const Model = OpenSearchService(dependencies)
    const instance = new Model({ host: '', options: {} })
    expect(instance).toBeInstanceOf(Model)
    expect(instance).toHaveProperty('connection')
  })
  test('get connection prop', () => {
    const Model = OpenSearchService(dependencies)
    jest.spyOn(Model.prototype, 'get')
    const instance = new Model({ host: '', options: {} }).get()
    expect(instance).toBeInstanceOf(dependencies.Client)
    expect(Model.prototype.get).toHaveBeenCalled()
  })
  test('get connection prop when options is undefined', () => {
    const Model = OpenSearchService(dependencies)
    jest.spyOn(Model.prototype, 'get')
    const instance = new Model({ host: '' }).get()
    expect(instance).toBeInstanceOf(dependencies.Client)
    expect(Model.prototype.get).toHaveBeenCalled()
  })
})
