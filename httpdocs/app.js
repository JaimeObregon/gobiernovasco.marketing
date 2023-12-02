import { MyElement, html, css } from './modules/element.js'
import { normalize, escape, toEuros } from './modules/strings.js'
import { database } from './modules/database.js'
import { Separator } from './components/separator.js'
import { Campaign } from './components/campaign.js'
import { Details } from './components/details.js'
import { Search } from './components/search.js'
import { Logo } from './components/logo.js'

const app = {
  $search: document.querySelector('x-search'),
  $main: document.querySelector('main'),

  maxCampaigns: 20,

  debounceDelay: 300,

  scrollDelay: 200,

  results: [],

  // Devuelve el término de búsqueda actual.
  get query() {
    return this.$search.query
  },

  // Consigna un término en el buscador.
  set query(query) {
    this.$search.query = query ?? ''
  },

  //
  recalculate() {
    const selected = [...document.querySelectorAll('input:checked')].map(
      (input) => input.parentNode.innerText.trim()
    )

    let totalEuros = 0
    let totalCount = 0

    const years = this.results.reduce(
      (previous, current) => {
        const { year } = current

        const matches = current.outlets.filter(({ name, canonical }) =>
          selected.includes(name)
        )

        const euros = matches.reduce(
          (previous, current) => previous + current.euros,
          0
        )

        const count = matches.length

        previous[year].euros += euros
        previous[year].count += count

        totalEuros += euros
        totalCount += count

        return previous
      },
      {
        2018: { euros: 0, count: 0 },
        2019: { euros: 0, count: 0 },
        2020: { euros: 0, count: 0 },
        2021: { euros: 0, count: 0 },
        2022: { euros: 0, count: 0 },
      }
    )

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
        ${[2018, 2019, 2020, 2021, 2022]
          .map(
            (year) => html`
              <tr>
                <th>${year}</th>
                <td>${years[year].count}</td>
                <td>${toEuros(years[year].euros)}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
      <tfoot>
        <tr>
          <th>Total quinquenio</td>
          <th>${totalCount}</th>
          <th>${toEuros(Math.round(totalEuros))}</th>
        </td>
      </tfoot>
    `
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

    if (results === null) {
      this.$main.innerHTML = ''
      this.$search.suggestions = []
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

    clearTimeout(this.timeout)

    if (!results.length) {
      this.$main.innerHTML = html`<img src="/assets/empty.svg" alt="" />`
    } else {
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
                ${i >= this.maxCampaigns ? 'class="hidden"' : ''}
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

        const canonicals = [
          ...new Set(
            matches
              .filter((match) => match.canonical)
              .filter((match) => normalize(match.canonical) !== query)
              .map((match) => match.canonical)
          ),
        ]

        if (outlets.length) {
          const subject =
            outlets.length === 1
              ? 'el medio coincidente'
              : `los ${outlets.length} medios coincidentes`

          this.$main.innerHTML = html`
            ${canonicals.length
              ? html`
                  <p>
                    Quizá te interese buscar:
                    ${canonicals
                      .map(
                        (name) =>
                          html`
                            <a href="/?q=${encodeURIComponent(name)}">
                              ${name}
                            </a>
                          `
                      )
                      .join(', ')}.
                  </p>
                `
              : ''}
            <h1>
              La inversión en ${subject} con
              <q>${escape(this.query)}</q>
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
            <span>Hay ${subject} con <q>${escape(this.query)}</q></span>
          </h1>
          <section id="results">
            ${campaigns}
            ${this.results.length > this.maxCampaigns
              ? html`<button>Mostrar todas</button>`
              : ''}
          </section>
        `

        const button = this.$main.querySelector('button')

        if (button) {
          button.addEventListener('click', () => {
            this.$main
              .querySelectorAll('x-campaign')
              .forEach((i) => i.classList.remove('hidden'))
            button.remove()
          })
        }

        if (outlets.length) {
          this.recalculate()
        }
      }, this.debounceDelay)

      setTimeout(() => {
        document
          .querySelector('main')
          .scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, this.scrollDelay)
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

document.addEventListener('search', (event) => {
  if (event.detail?.query) {
    app.query = event.detail.query
  }

  const q = encodeURIComponent(app.query)
  history.replaceState(null, '', q ? `/?q=${q}` : '/')

  app.search()
})

const main = document.querySelector('main')

main.addEventListener('click', ({ target }) => {
  const inputClicked =
    target.localName === 'input' && typeof target.checked !== 'undefined'

  if (!inputClicked) {
    return
  }

  const file = target.checked ? 'activate.mp3' : 'deactivate.mp3'
  const sound = new Audio(`/sounds/${file}`)
  sound.play()

  app.recalculate()
})
