import { parseEuros, splitArrayByKeywords } from '../bin/modules/parsers.js'

describe('Utilidades', () => {
  test('parseEuros()', () => {
    expect(parseEuros('11.850,21€')).toBe(11850.21)
    expect(parseEuros('11.850,21 €')).toBe(11850.21)
    expect(parseEuros('-12.345,67 €')).toBe(-12345.67)
    expect(parseEuros('0€')).toBe(0)
    expect(parseEuros('0,00 €')).toBe(0)
    expect(parseEuros('-0,00 €')).toBe(-0)
    expect(parseEuros('12.345,6 €')).toBe(12345.6)
    expect(parseEuros('1.234 €')).toBe(1234)
  })

  test('splitArrayByKeywords()', () => {
    const array = ['a', 'b', '_', 'c', 'd', '-', 'e', '_', '_']
    const keywords = ['_', '-']

    const results = splitArrayByKeywords(array, keywords)
    const expected = [['a', 'b'], ['_', 'c', 'd'], ['-', 'e'], ['_'], ['_']]

    expect(results).toEqual(expected)
  })
})
