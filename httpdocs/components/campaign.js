import { MyElement, html, css } from '../modules/element.js'
import { database } from '../modules/database.js'

class Campaign extends MyElement {
  static styles = css`
    article {
      padding: 1em;
      margin: 1em;
      background: white;
    }

    h1,
    h2 {
      font-size: 1em;
      margin: 0;
    }

    h2 {
      display: inline-block;
      font-size: 0.5em;
      border: 1px solid black;
      border-radius: 99em;
      padding: 0.25em 0.5em;
    }

    ul a {
      margin-right: 1em;
    }
  `

  static html = html`
    <article>
      <h2></h2>
      <time></time>
      <h1></h1>
      <p></p>
      <ul></ul>
    </article>
  `

  connectedCallback() {
    const h1 = this.shadowRoot.querySelector('h1')
    const h2 = this.shadowRoot.querySelector('h2')
    const time = this.shadowRoot.querySelector('time')
    const p = this.shadowRoot.querySelector('p')
    const ul = this.shadowRoot.querySelector('ul')

    const id = Number(this.dataset.id)

    const campaign = database.find(id)

    h1.innerHTML = campaign.name
    h2.innerHTML = campaign.department
    time.innerHTML = campaign.year
    p.innerHTML = campaign.description
    ul.innerHTML = campaign.outlets
      .map(({ name, euros }) => `<li><a href="">${name}</a> (${euros} €)</li>`)
      .join('')
  }
}

export { Campaign }
