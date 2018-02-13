import { nullifyIfIncludes } from '../src/helpers'

describe('Helpers', () => {
  test('array includes id', () => {
    const result = nullifyIfIncludes([1, 2], 2)

    expect(result).toEqual(null)
  })

  test('array not includes id', () => {
    const result = nullifyIfIncludes([1, 2], 3)

    expect(result).toEqual(3)
  })

  test('not array', () => {
    const result = nullifyIfIncludes(2, 2)

    expect(result).toEqual(2)
  })
})
