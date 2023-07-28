import { MyElement, html, css } from '../modules/element.js'
import { normalize } from '../modules/strings.js'
import { app } from '../app.js'

const icon = html`
  <svg viewBox="0 0 16 16">
    <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
    />
  </svg>
`

class Search extends MyElement {
  static styles = css`
    label {
      position: relative;
      display: flex;
      font-size: var(--type-large);
      width: 30em;
      align-items: center;
      transition: width 350ms ease;
    }

    label svg {
      position: absolute;
      width: 0.75em;
      margin-top: 0.15em;
      left: var(--space-x-small);
      margin-left: var(--space-medium);
      fill: var(--color-text-pale);
      pointer-events: none;
    }

    label input {
      font-family: var(--font-sans);
      font-size: var(--type-medium);
      font-weight: 500;
      width: 100%;
      border: none;
      border-radius: 1rem;
      padding: 0 0.25em 0 var(--space-large);
      outline: none;
      background: var(--color-highlight-inverted);
      transition: background 350ms ease;
      border: 1px solid var(--color-line);
      box-shadow: 0 0 0 1px var(--color-neutral-50);
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      max-width: calc(100% - var(--space-medium));
      height: var(--space-large);
      margin: auto;
    }

    label input::placeholder {
      color: var(--color-text-pale);
      font-weight: 300;
    }

    label input:hover,
    label input:focus {
      background: white;
    }

    label.open input:focus {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    label ul {
      font-family: var(--font-sans);
      display: none;
      position: absolute;
      z-index: 1;
      top: calc(2.625em - 2px); /* Número mágico 🤨 */
      left: var(--space-small);
      width: calc(100% - 2 * var(--space-small));
      max-height: 50vh;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      background: white;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-weight: 500;
      color: var(--color-neutral-800);
      overflow: scroll;
      /*box-shadow: 0 1px 0 1px var(--color-backdrop);*/
      border: 1px solid var(--color-line);
      border-top: none;
    }

    label.open ul {
      display: block;
    }

    label ul li a {
      display: block;
      padding: 4px var(--space-small) 4px var(--space-large);
      text-decoration: none;
      color: inherit;
    }

    label ul li a.selected {
      background: var(--color-accent);
      color: var(--color-background);
    }

    label ul li a.selected mark {
      color: var(--color-highlight-inverted);
    }

    label ul li a svg {
      position: absolute;
      left: calc(-1 * var(--space-x-small));
      margin-top: 0.45em;
    }

    label ul li a.selected svg {
      fill: var(--color-background);
    }

    label ul li a mark {
      font-weight: 700;
      background: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
      color: var(--color-accent);
    }
  `

  static html = html`
    <label>
      ${icon}
      <input
        type="search"
        placeholder="Medio, departamento, campaña, anuncio…"
      />
      <ul></ul>
    </label>
  `

  selection
  results
  label
  input
  value
  ul

  connectedCallback() {
    this.label = this.shadowRoot.querySelector('label')
    this.input = this.shadowRoot.querySelector('input')
    this.ul = this.shadowRoot.querySelector('ul')

    this.input.focus({ preventScroll: true })

    document.addEventListener('keydown', (event) => {
      if (event.metaKey || event.ctrlKey) {
        return
      }

      if (event.key.length === 1 || event.key === 'Backspace') {
        this.input.focus()
        this.label.classList.add('open')
      }

      const actions = {
        Escape: () => this.label.classList.remove('open'),
        Enter: () => {
          const query = this.results[this.selected].innerText
          this.query = query
          app.search()
        },
        ArrowUp: () => --this.selected,
        ArrowDown: () =>
          this.selected === undefined ? (this.selected = 0) : ++this.selected,
      }

      if (!actions[event.key]) {
        return
      }

      actions[event.key]()

      this.results.forEach((result, index) => {
        this.selected === index &&
          result.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })

      event.preventDefault()
    })

    this.ul.addEventListener('mouseover', (event) => {
      const li = event.target.closest('li')
      if (!li) {
        return
      }

      this.selected = this.results
        .map((result) => result.innerText)
        .indexOf(li.innerText)
    })

    this.input.addEventListener('input', () => {
      this.query = this.input.value
      app.search()
    })

    this.input.addEventListener('focus', () => {
      const open = Boolean(this.results?.length)
      this.label.classList.toggle('open', open)

      const end = this.input.value.length
      this.input.setSelectionRange(end, end)
    })

    this.input.addEventListener('blur', (event) => {
      this.label.classList.remove('open')
    })

    // `mousedown` en vez de `click`, pues de lo contrario el evento `blur`
    // en `this.input` se dispara antes y cierra el desplegable de sugerencias.
    this.ul.addEventListener('mousedown', (event) => {
      const query = event.target.closest('a').innerText
      this.query = query
      app.search()
    })
  }

  get query() {
    return this.value ?? ''
  }

  set query(value) {
    this.value = this.input.value = value
  }

  get selected() {
    return this.selection
  }

  set selected(value) {
    const last = this.results.length - 1
    value = value < 0 ? 0 : Math.min(value, last)

    this.selection = value

    this.results.forEach((result, index) =>
      result.classList.toggle('selected', index === value)
    )
  }

  set suggestions(suggestions) {
    const query = normalize(this.query)
    this.ul.innerHTML = suggestions
      .map(
        (q) => html`
          <li>
            <a href="/?q=${q}">
              ${icon} ${q.replace(query, `<mark>${query}</mark>`)}
            </a>
          </li>
        `
      )
      .join('')

    this.results = [...this.ul.querySelectorAll('a')]

    delete this.selection
  }
}

export { Search }
