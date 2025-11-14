const OpenSearch = require('../../src/models/OpenSearch')

const dependencies = {
  OpenSearchService: class {
    get () {
      return {}
    }
  },
  options: {},
  host: ''
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('test the scene: OpenSearch Model', () => {
  test('search method: search return a array of results', async () => {
    const methodMocked = async () => []
    const mockedGetDependency = jest.spyOn(dependencies.OpenSearchService.prototype, 'get')
      .mockReturnValue({ search: methodMocked })
    const WrappedClass = OpenSearch(dependencies)
    const instance = new WrappedClass(dependencies)
    const results = await instance.search()
    expect(results).toEqual([])
    expect(mockedGetDependency).toHaveReturnedWith({ search: methodMocked })
  })
})
