import { MyElement, html, css } from './modules/element.js'
import { Campaign } from './components/campaign.js'
import { database } from './modules/database.js'
import { Search } from './components/search.js'
import { Details } from './components/details.js'
import { Separator } from './components/separator.js'
import { normalize, escape } from './modules/strings.js'
import { Logo } from './components/logo.js'

const app = {
  $search: document.querySelector('x-search'),
  $main: document.querySelector('main'),

  maxCampaigns: 25,

  debounceDelay: 200,

  results: [],

  // Devuelve el término de búsqueda actual.
  get query() {
    return this.$search.query
  },

  // Consigna un término en el buscador.
  set query(query) {
    this.$search.query = query ?? ''
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

    if (results === null) {
      this.$main.innerHTML = ''
      return
    }

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (results.length && unchanged) {
      return
    }

    this.results = results
    this.$search.suggestions = suggestions

    setTimeout(
      () =>
        document.querySelector('main').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      0
    )

    if (!results.length) {
      this.$main.innerHTML = html`<img src="/assets/empty.svg" alt="" />`
    } else {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.$main.innerHTML = ''

        if (this.query.length < 3) {
          return
        }

        const query = normalize(this.query)
        const regexp = new RegExp(query, 'i')

        const campaigns = this.results
          .map(
            (result, i) => html`
              <x-campaign
                ${i >= this.maxCampaigns ? 'style="display: none"' : ''}
                ${result.warning ? 'class="warning"' : ''}
                data-id="${result.id}"
              ></x-campaign>
            `
          )
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
          const subject =
            outlets.length === 1
              ? 'el medio coincidente'
              : `los ${outlets.length} medios coincidentes`

          this.$main.innerHTML = html`
            <h1>
              La inversión en ${subject} con
              <q>${escape(query)}</q>
            </h1>
            <section id="summary">
              <figure>
                <table></table>
              </figure>

              <ol>
                ${outlets
                  .map(
                    (outlet, i) => html`
                      <li>
                        <label>
                          <input checked type="checkbox" value="${i}" />
                          <span>${outlet}</span>
                        </label>
                      </li>
                    `
                  )
                  .join('')}
              </ol>
            </section>
          `
        }

        const subject =
          this.results.length === 1
            ? 'una campaña'
            : `${this.results.length} campañas`

        this.$main.innerHTML += html`
          <h1>
            <span>Hay ${subject} con <q>${escape(query)}</q></span>
          </h1>
          <section id="results">
            ${campaigns}
            ${this.results.length > this.maxCampaigns
              ? html`<button>Mostrar todas</button>`
              : ''}
          </section>
        `

        const recalculate = () => {
          const selected = [...document.querySelectorAll('input:checked')].map(
            (input) => input.parentNode.innerText.trim()
          )

          const years = this.results.reduce(
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

          const euros =
            years[2018].euros +
            years[2019].euros +
            years[2020].euros +
            years[2021].euros +
            years[2022].euros

          const contracts =
            years[2018].count +
            years[2019].count +
            years[2020].count +
            years[2021].count +
            years[2022].count

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
        <td>${years[2018].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(years[2018].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2019</th>
        <td>${years[2019].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(years[2019].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2020</th>
        <td>${years[2020].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(years[2020].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2021</th>
        <td>${years[2021].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(years[2021].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      <tr>
        <th>2022</th>
        <td>${years[2022].count}</td>
        <td>
        ${Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })
          .format(Math.round(years[2022].euros))
          .replaceAll(/\./g, '&#8239;')}</td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total quinquenio</td>
          <th>${contracts}</th>
          <th>${Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          })
            .format(Math.round(euros))
            .replaceAll(/\./g, '&#8239;')}</th>
        </td>
      </tfoot>
        `
        }

        const button = this.$main.querySelector('button')

        if (button) {
          button.addEventListener('click', () => {
            this.$main
              .querySelectorAll('x-campaign')
              .forEach((i) => (i.style.display = 'block'))
            button.remove()
          })
        }

        if (outlets.length) {
          recalculate()

          this.$main.addEventListener('click', ({ target }) => {
            const inputClicked =
              target.localName === 'input' &&
              typeof target.checked !== 'undefined'

            if (!inputClicked) {
              return
            }

            recalculate()
          })
        }
      }, this.debounceDelay)

      setTimeout(() => {
        document
          .querySelector('main')
          .scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  },
}

customElements.define('x-logo', Logo)
customElements.define('x-search', Search)
customElements.define('x-details', Details)
customElements.define('x-campaign', Campaign)
customElements.define('x-separator', Separator)

await database.load('/datos/campañas.json')

const counter = document.querySelector('#counter')
counter.innerText = database.count

const url = new URL(document.location.href)
const q = url.searchParams.get('q')

app.query = q

// 🎉
app.search()

export { app }
