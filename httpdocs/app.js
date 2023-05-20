import { MyElement, html, css } from './modules/element.js'
import { Campaign } from './components/campaign.js'
import { database } from './modules/database.js'
import { Search } from './components/search.js'
import { Details } from './components/details.js'
import { normalize, escape } from './modules/strings.js'
import { Logo } from './components/logo.js'
import { Masonry } from './modules/masonry.js'

const app = {
  $search: document.querySelector('x-search'),
  $main: document.querySelector('main'),

  translations: {},

  debounceDelay: 200,

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
      this.$main.innerHTML = ''

      if (!this.query.length) {
        return
      }

      if (!this.results.length) {
        this.$main.innerHTML = `<div>No hay resultados.</div>`
        return
      }

      const query = normalize(this.query)
      const regexp = new RegExp(query, 'i')

      const campaigns = this.results
        .map((result) => `<x-campaign data-id="${result.id}"></x-campaign>`)
        .join('')

      const matches = this.results
        .flatMap(({ outlets }) => outlets)
        .filter(
          ({ name, canonical }) =>
            normalize(name).match(regexp) ||
            (canonical && normalize(canonical).match(regexp))
        )

      const outlets = [
        ...new Set(
          matches
            .map(({ name }) => escape(name))
            .sort((a, b) => a.localeCompare(b))
        ),
      ]

      if (outlets.length) {
        this.$main.innerHTML = html`
          <h1>
            La inversión en los ${outlets.length} medios que coinciden con
            <q>${escape(query)}</q>
          </h1>
          <section id="summary">
            <ol>
              ${outlets
                .map(
                  (outlet, i) => html`
                    <li>
                      <label>
                        <input checked type="checkbox" value="${i}" />
                        ${outlet}
                      </label>
                    </li>
                  `
                )
                .join('')}
            </ol>

            <figure>
              <table></table>
            </figure>
          </section>
        `
      }

      this.$main.innerHTML += html`
        <h1>Hay ${this.results.length} campañas con <q>${escape(query)}</q></h1>
        <section id="masonry">${campaigns}</section>
      `

      const recalculate = () => {
        const selected = [...document.querySelectorAll('input:checked')].map(
          (input) => input.parentNode.innerText.trim()
        )

        const euros = this.results.reduce(
          (accumulator, previous) => {
            const { year } = previous

            const matches = previous.outlets.filter(({ name, canonical }) =>
              selected.includes(name)
            )

            const euros = matches.reduce(
              (accumulator, previous) => accumulator + previous.euros,
              0
            )

            const count = matches.length ? 1 : 0

            accumulator[year].euros += euros
            accumulator[year].count += count

            return accumulator
          },
          {
            2018: { euros: 0, count: 0 },
            2019: { euros: 0, count: 0 },
            2020: { euros: 0, count: 0 },
            2021: { euros: 0, count: 0 },
            2022: { euros: 0, count: 0 },
          }
        )

        console.log(euros)

        const total =
          euros[2018].euros +
          euros[2019].euros +
          euros[2020].euros +
          euros[2021].euros +
          euros[2022].euros

        const total2 =
          euros[2018].count +
          euros[2019].count +
          euros[2020].count +
          euros[2021].count +
          euros[2022].count

        const table = document.querySelector('table')

        table.innerHTML = html`
        <thead>
          <tr>
            <th>Año</th>
            <th>Contrataciones</th>
            <th>Inversión</th>
          </tr>
        </thead>
        <tbody>
      <tr>
        <th>2018</th>
        <td>${euros[2018].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(euros[2018].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2019</th>
        <td>${euros[2019].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(euros[2019].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2020</th>
        <td>${euros[2020].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(euros[2020].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2021</th>
        <td>${euros[2021].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(euros[2021].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2022</th>
        <td>${euros[2022].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(euros[2022].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total quinquenio</td>
          <td>${total2}</td>
          <td>${Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          })
            .format(Math.round(total))
            .replaceAll(/\./g, '&#8239;')}</th>
        </td>
      </tfoot>
        `
      }

      recalculate()

      this.$main.addEventListener('click', ({ target }) => {
        const inputClicked =
          target.localName === 'input' && typeof target.checked !== 'undefined'

        if (!inputClicked) {
          return
        }

        recalculate()
      })
    }, this.debounceDelay)
  },
}

customElements.define('x-search', Search)
customElements.define('x-details', Details)
customElements.define('x-campaign', Campaign)

await database.load('/data/campaigns.json')

const counter = document.querySelector('#counter')
counter.innerText = database.count

const url = new URL(document.location.href)
const q = url.searchParams.get('q')
app.query = q

history.pushState(null, '', q ? `/?q=${q}` : '/')

app.search()

setTimeout(() => {
  const masonry = new Masonry({
    container: 'section#masonry',
    static: true,
    gutter: 16,
    maxColumns: 3,
    useMin: true,
  })

  masonry.listen()
}, 400)

export { app }
