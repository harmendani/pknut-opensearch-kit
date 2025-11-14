const { parseSortValue } = require('../../src/utils')

describe('test the scenes: util parseSortValue', () => {
  test('passing a desc value in lower case', () => {
    const result = parseSortValue('desc')
    expect(result).toBe('desc')
  })
  test('passing a desc value in uppercase case', () => {
    const result = parseSortValue('DESC')
    expect(result).toBe('desc')
  })
  test('passing a empty string for the sorting', () => {
    const result = parseSortValue('')
    expect(result).toBe('asc')
  })
})
