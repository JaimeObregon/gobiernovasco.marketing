import { normalize } from './strings.js'

// Cuántas sugerencias de búsqueda mostrar al buscar.
const maxSuggestions = 100

const database = {
  records: [],

  // Carga en `this.records` el fichero JSON con los datos.
  load: async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    database.records = json.map((record) => ({
      ...record,
      index: normalize(
        [
          record.channels,
          record.date,
          record.department,
          record.description,
          record.name,
          record.target,
          record.type,
          record.outlets.map(({ name }) => name).join(),
        ].join(' ')
      ),
    }))
  },

  // Retorna el número de registros en la base de datos.
  get count() {
    return this.records.length
  },

  // Devuelve el registro de una imagen a partir de su `id`.
  find: (id) => {
    return database.records.find((record) => record.id === id)
  },

  // Cursa una búsqueda en la base de datos y devuelve los resultados de la misma
  // y las sugerencias de búsqueda para el término empleado.
  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      const results = database.records.sort(() => Math.random() - 0.5)
      const suggestions = []
      return { results, suggestions }
    }

    const regexp = new RegExp(query)
    const results = database.records.filter((record) =>
      record.index.match(regexp)
    )

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
