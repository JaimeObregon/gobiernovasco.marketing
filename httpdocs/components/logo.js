import { MyElement, html, css } from '../modules/element.js'

class Logo extends MyElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: flex-end;
      aspect-ratio: 1 / 1;
      box-sizing: border-box;
      padding: var(--space-x-large) var(--space-medium) var(--space-medium)
        var(--space-medium);
      text-align: right;
      text-transform: uppercase;
      line-height: var(--line-height-condensed);
      font-weight: bold;
      font-family: var(--font-sans);
      transform: rotate(-2deg);
      background: var(--color-heading);
      color: var(--color-highlight-inverted);
      user-select: none;
    }
  `

  static html = html` <div>GOBIERNO<br />VASCO<br />.MARKETING</div> `
}

customElements.define('x-logo', Logo)

export { Logo }
