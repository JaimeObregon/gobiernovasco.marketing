import { MyElement, html, css } from '../modules/element.js'
import { database } from '../modules/database.js'

class Campaign extends MyElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--color-line);
      width: calc(100% / 3 - 27px);
      background: var(--color-highlight-inverted);
    }

    article {
      margin: 1em;
      line-height: var(--line-height-condensed);
    }

    h1,
    h2 {
      margin: 0;
    }

    h1 {
      font-size: var(--type-medium);
      hyphens: auto;
      font-weight: 900;
    }

    h2 {
      display: inline-block;
      font-size: var(--type-xx-small);
      font-weight: 200;
      border: 1px solid var(--color-text-pale);
      border-radius: 99em;
      padding: var(--space-x-small) var(--space-medium);
      margin-bottom: 1em;
    }

    p {
      font-size: var(--type-small);
      text-align: justify;
      hyphens: auto;
    }

    h3 {
      font-weight: 400;
      font-size: var(--type-small);
    }

    h3 strong {
      font-weight: 800;
      color: var(--color-accent);
    }

    time {
      display: block;
      font-size: var(--type-small);
      margin-bottom: 1em;
    }

    ul {
      max-width: 100%;
      list-style: none;
      padding: 0;
    }

    ul li {
      position: relative;
      background: var(--color-background);
      margin: var(--space-xx-small) 0;
      line-height: var(--line-height-normal);
    }

    ul li > span {
      color: var(--color-highlight-inverted);
      position: absolute;
      background: var(--color-accent);
      width: 0;
      overflow: visible;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: width 1s;
    }

    ul li a {
      display: inline-block;
      margin-right: 1em;
      text-decoration: none;
      color: inherit;
      text-indent: var(--space-small);
      font-weight: 700;
    }

    ul li > a {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      max-width: 75%;
    }

    ul li small {
      float: right;
      color: var(--color-text);
      font-variant-numeric: tabular-nums;
      margin-right: var(--space-small);

      color: rgb(0, 255, 255);
      mix-blend-mode: difference;
      position: absolute;
      right: 0;
      top: 0;
    }
  `

  static html = html`
    <article>
      <h2></h2>
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
    const ul = this.shadowRoot.querySelector('ul')

    const id = Number(this.dataset.id)

    const campaign = database.find(id)

    h1.innerHTML = campaign.name
    h2.innerHTML = campaign.department

    h3.innerHTML = `Inversión total: <strong>${Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    })
      .format(Math.round(campaign.euros))
      .replace('.', '&#8239;')}</strong>`

    time.innerHTML = `${campaign.date} (${campaign.year})`
    p.innerHTML = campaign.description

    const total = campaign.outlets.reduce(
      (accumulator, current) => accumulator + current.euros,
      0
    )

    ul.innerHTML = campaign.outlets
      .map(({ name, euros }) => {
        return html`
          <li>
            <span data-euros="${euros}">
              <a href="/?q=${name}">${name}</a>
            </span>
            <a href="/?q=${name}">${name}</a>
            <small
              >${Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              })
                .format(Math.round(euros))
                .replace('.', '&#8239;')}</small
            >
          </li>
        `
      })
      .join('')

    setTimeout(() => {
      const max = ul.offsetWidth
      const spans = [...ul.querySelectorAll('li > span')]

      spans.forEach((span) => {
        const euros = span.dataset.euros
        const px = (euros * max) / total
        span.style.width = `${px}px`
      })
    }, 500)
  }
}

export { Campaign }
