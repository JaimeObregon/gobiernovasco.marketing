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

export { parseEuros }
