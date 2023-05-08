import { MyElement, html, css } from './modules/element.js'
import { Campaign } from './components/campaign.js'
import { database } from './modules/database.js'
import { Search } from './components/search.js'
import { escape } from './modules/strings.js'
import { Logo } from './components/logo.js'

const app = {
  $search: document.querySelector('x-search'),
  $main: document.querySelector('main'),

  translations: {},

  debounceDelay: 350,

  results: [],

  // Devuelve el término de búsqueda actual.
  get query() {
    return this.$search.query ?? ''
  },

  // Consigna un término en el buscador.
  set query(query) {
    this.$search.query = query
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

    this.$search.suggestions = suggestions

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (results.length && unchanged) {
      return
    }

    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.results.length || this.query.length) {
        this.$main.innerHTML = this.results
          .map((result) => `<x-campaign data-id="${result.id}"></x-campaign>`)
          .join('')
      } else {
        const string = `No hay resultados sobre <q>${escape(this.query)}</q>.`
        this.$main.innerHTML = string
      }
    }, this.debounceDelay)
  },
}

customElements.define('x-search', Search)
customElements.define('x-campaign', Campaign)

await database.load('/data/campaigns.json')

export { app }
