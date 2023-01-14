// Convierte una cadena como 11.850,21€ en un número como 11850.21.
const parseEuros = (string) => {
  const pattern = /-?[\d\.]+(,\d{1,2})?(\s?€)?/g

  const number = string
    .replace(/<\/?(br|b)>/g, '')
    .replace(/[\.€]/g, '')
    .replace(',', '.')
    .trim()

  return Number(number)
}

// Como `Regexp.prototype.split()`, pero para *arrays*.
const splitArrayByKeywords = (items, keywords) => {
  let result = []

  const indices = items.flatMap((item, i) =>
    keywords.includes(item) ? [i] : []
  )
  const breaks = [0, ...indices, items.length]

  const results = breaks.reduce((results, value, index) => {
    if (!index) {
      return results
    }

    const chunk = items.slice(breaks[index - 1], value)
    results.push(chunk)

    return results
  }, [])

  return results
}

export { parseEuros, splitArrayByKeywords }
