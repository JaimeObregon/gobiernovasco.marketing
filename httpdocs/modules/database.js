import { normalize } from './strings.js'

// Cuántas sugerencias de búsqueda mostrar al buscar.
const maxSuggestions = 25

const database = {
  records: [],

  // Carga en `this.records` el fichero JSON con los datos.
  load: async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    database.records = json.map((record) => ({
      ...record,
      outlets: record.outlets
        .reduce((accumulator, current) => {
          const found = accumulator.find(({ name, canonical }) => {
            if (current.canonical && canonical) {
              return canonical === current.canonical
            } else {
              return name === current.name
            }
          })

          if (found) {
            found.euros += current.euros
          } else {
            accumulator.push(current)
          }
          return accumulator
        }, [])
        .sort((a, b) => (a.euros < b.euros ? 1 : -1)),
      index: normalize(
        [
          // record.channels,
          record.date,
          record.department,
          record.description,
          record.name,
          // record.target,
          record.type,
          record.outlets
            .map(({ name, canonical }) => [name, canonical].join())
            .join(),
        ].join(' ')
      ),
    }))
  },

  // Retorna el número de registros en la base de datos.
  get count() {
    return this.records.length
  },

  // Devuelve un resultado a partir de su `id`.
  find: (id) => {
    return database.records.find((record) => record.id === id)
  },

  // Cursa una búsqueda en la base de datos y devuelve los resultados y las
  // sugerencias de búsqueda para el término empleado.
  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      const results = null
      const suggestions = []
      return { results, suggestions }
    }

    const regexp = new RegExp(query)

    const results = database.records
      .filter((record) => record.index.match(regexp))
      .sort((a, b) => (a.euros < b.euros ? +1 : -1))

    const suggestions = results
      .flatMap((item) =>
        item.index
          .split(' ')
          .filter((word) => word.match(new RegExp(`^${query}`)))
          .filter((word) => word.length)
      )
      .filter((value, index, word) => word.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b))
      .filter((word) => word !== query)
      .slice(0, maxSuggestions)

    return { results, suggestions }
  },
}

export { database }
