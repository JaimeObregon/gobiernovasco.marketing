import { MyElement, html, css } from '../modules/element.js'
import { database } from '../modules/database.js'

class Campaign extends MyElement {
  static styles = css`
    article {
      background: white;
    }
  `

  static html = html`
    <article>
      <h1></h1>
      <p></p>
      <h2></h2>
    </article>
  `

  connectedCallback() {
    const h1 = this.shadowRoot.querySelector('h1')
    const h2 = this.shadowRoot.querySelector('h2')
    const p = this.shadowRoot.querySelector('p')

    const id = Number(this.dataset.id)

    const campaign = database.find(id)

    h1.innerHTML = campaign.name
    h2.innerHTML = campaign.department
    p.innerHTML = campaign.description
  }
}

export { Campaign }
