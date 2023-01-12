import { parseEuros } from '../bin/modules/parsers.js'

describe('parseEuros()', () => {
  test('parseEuros', () => {
    expect(parseEuros('11.850,21€')).toBe(11850.21)
    expect(parseEuros('11.850,21 €')).toBe(11850.21)
    expect(parseEuros('-12.345,67 €')).toBe(-12345.67)
    expect(parseEuros('0€')).toBe(0)
    expect(parseEuros('0,00 €')).toBe(0)
    expect(parseEuros('-0,00 €')).toBe(-0)
    expect(parseEuros('12.345,6 €')).toBe(12345.6)
    expect(parseEuros('1.234 €')).toBe(1234)
  })
})
