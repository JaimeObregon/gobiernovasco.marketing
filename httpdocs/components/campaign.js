import { MyElement, html, css } from '../modules/element.js'
import { escape, toEuros } from '../modules/strings.js'
import { database } from '../modules/database.js'

const departmentToColor = (string) => {
  // Fuente de la paleta de colores: https://tailwindcss.com/docs/customizing-colors
  const colors = [
    '#ffe4e6',
    '#fce7f3',
    '#fae8ff',
    '#f3e8ff',
    '#ede9fe',
    '#e0e7ff',
    '#dbeafe',
    '#e0f2fe',
    '#ccfbf1',
    '#d1fae5',
    '#dcfce7',
    '#ecfccb',
    '#fef9c3',
    '#ffedd5',
    '#fee2e2',
    '#f5f5f5',
  ]

  const index =
    string
      .split('')
      .map((i) => i.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % colors.length

  return colors[index]
}

class Campaign extends MyElement {
  static styles = css`
    @keyframes grow {
      0% {
        transform: scaleX(0);
      }

      100% {
        transform: scaleX(100%);
      }
    }

    :host {
      display: block;
    }

    :host(.warning) {
      opacity: 0.7;
    }

    article {
      padding: var(--space-medium);
      line-height: var(--line-height-condensed);
      border: 1px solid var(--color-line);
      background: var(--color-highlight-inverted);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-small);
    }

    header h2 {
      margin: 0;
      display: inline-block;
      font-family: var(--font-display);
      font-size: var(--type-xx-small);
      font-weight: 200;
      border-radius: 99em;
      background: var(--color-background);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    header h2:hover {
      filter: saturate(350%);
    }

    header h2 a {
      padding: var(--space-x-small) var(--space-medium);
      color: inherit;
    }

    header a {
      display: flex;
      gap: var(--space-x-small);
      flex-shrink: 0;
      text-decoration: none;
      font-size: var(--type-small);
      color: var(--color-accent);
    }

    header > a:hover {
      text-decoration: 1px solid underline;
      text-underline-offset: 4px;
    }

    header a svg {
      fill: none;
      stroke-width: 1.5;
      stroke: currentColor;
      stroke-linecap: round;
      width: 1em;
    }

    h1 {
      font-family: var(--font-display);
      font-size: var(--type-medium);
      hyphens: auto;
      font-weight: 900;
      margin: var(--space-medium) 0 0 0;
    }

    p {
      font-size: var(--type-x-small);
      text-align: justify;
      hyphens: auto;
      margin: var(--space-x-small) 0 0 0;
    }

    h3 {
      font-size: var(--type-small);
      margin: 0 0 var(--space-xx-small) 0;
      font-weight: 400;
    }

    h3 strong {
      font-weight: 800;
      color: var(--color-accent);
    }

    time {
      display: block;
      color: var(--color-text-pale);
      font-size: var(--type-x-small);
      margin-bottom: 1em;
    }

    ul {
      max-width: 100%;
      list-style: none;
      padding: 0;
    }

    ul li {
      position: relative;
      height: 100%;
      padding: 0 var(--space-small);
      margin: var(--space-xx-small) 0;
      line-height: var(--line-height-normal);
      background: var(--color-background);
      color: black;
    }

    ul li a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-display);
      text-decoration: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: inherit;
      overflow: hidden;
    }

    ul li a:hover {
      color: var(--color-warning);
    }

    ul li > span {
      position: absolute;
      left: 0;
      width: var(--width);
      height: 100%;
      transition: width 1s;
      pointer-events: none;
    }

    ul li > span:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    ul li > span:before {
      background-color: #e1b042; /* Número mágico 🤨 */
      mix-blend-mode: difference;
      transform-origin: center left;
      animation: grow 1s var(--delay) backwards;
    }

    ul li cite {
      overflow: hidden;
      text-overflow: ellipsis;
      font-style: normal;
    }

    ul li small {
      font-variant-numeric: tabular-nums;
      pointer-events: none;
    }
  `

  static html = html`
    <article>
      <header>
        <h2></h2>
        <a target="_blank">
          <svg viewBox="0 0 24 24">
            <path
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </a>
      </header>
      <h1></h1>
      <p></p>
      <ul></ul>
      <h3></h3>
      <time></time>
    </article>
  `

  connectedCallback() {
    const h1 = this.shadowRoot.querySelector('h1')
    const h2 = this.shadowRoot.querySelector('h2')
    const h3 = this.shadowRoot.querySelector('h3')
    const time = this.shadowRoot.querySelector('time')
    const p = this.shadowRoot.querySelector('p')
    const a = this.shadowRoot.querySelector('a[target]')
    const ul = this.shadowRoot.querySelector('ul')

    const id = Number(this.dataset.id)

    const campaign = database.find(id)

    a.innerHTML += campaign.year
    const href =
      campaign.department === 'Diputación Foral de Gipuzkoa'
        ? `/documentos/gipuzkoa/${campaign.document}`
        : `/documentos/memorias/${campaign.year}.pdf#page=${campaign.page}`
    a.setAttribute('href', href)

    h1.innerText = campaign.name
    h2.innerHTML = html`<a href="/?q=${campaign.department}"
      >${campaign.department}</a
    >`

    h2.style.background = departmentToColor(campaign.department)

    if (campaign.euros) {
      h3.innerHTML = html`
        Inversión total: <strong>${toEuros(campaign.euros)}</strong>
      `
    }

    time.innerText = campaign.date ?? ''
    p.innerText = campaign.description ?? ''

    const total = campaign.outlets.reduce(
      (accumulator, current) => accumulator + current.euros,
      0
    )

    ul.innerHTML = campaign.outlets
      .map(({ name, canonical, euros }, i) => {
        const label = escape(canonical ?? name)
        const width = (100 * euros) / total
        const delay = i * 50 + 500
        const style = `--width: ${width}%; --delay: ${delay}ms`

        return html`
          <li data-query="${label}">
            <span style="${style}" data-euros="${euros}"></span>
            <a href="/?q=${label}">
              <cite>${label}</cite>
              <small>${toEuros(euros)}</small>
            </a>
          </li>
        `
      })
      .join('')

    ul.addEventListener('click', (event) => {
      const li = event.target.closest('li')
      if (!li) {
        return
      }

      const query = li.dataset.query

      const searchEvent = new CustomEvent('search', {
        detail: { query },
        bubbles: true,
        composed: true,
      })

      this.dispatchEvent(searchEvent)

      event.preventDefault()
    })
  }
}

export { Campaign }
