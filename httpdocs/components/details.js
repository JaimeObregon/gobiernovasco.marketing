import { MyElement, html, css } from '../modules/element.js'

class Details extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    details {
      position: relative;
    }

    details summary {
      display: inline-block;
      cursor: pointer;
    }

    details summary,
    details div {
      padding-left: var(--bleed);
    }

    details summary::marker,
    details summary::-webkit-details-marker {
      display: none;
    }

    details svg {
      position: absolute;
      top: 0.3em;
      left: 0;
      width: 1em;
      fill: none;
      stroke: currentColor;
      stroke-width: 0.1em;
      transform: rotate(0deg);
    }

    details[ready] :is(svg, div) {
      transition: var(--delay-medium);
    }

    details div {
      display: flex;
      opacity: 0;
    }

    :host([open]) details svg {
      transform: rotate(var(--rotation, 90deg));
    }

    :host([open]) details div {
      opacity: 1;
    }
  `

  static html = html`
    <details open>
      <summary>
        <svg viewBox="0 0 16 16">
          <path d="M5 14l6-6-6-6" />
        </svg>
        <slot name="summary"></slot>
      </summary>
      <div>
        <slot name="contents"></slot>
      </div>
    </details>
  `

  static get observedAttributes() {
    return ['open', 'hidden']
  }

  attributeChangedCallback(name, previous, value) {
    if (name === 'open') {
      if (!this.details || previous === value) {
        return
      }

      value === null ? this.close() : this.open()
    } else if (name === 'hidden') {
      const details = this.shadowRoot.querySelector('details')
      const hidden = value !== null
      details.toggleAttribute('hidden', hidden)
    }
  }

  open() {
    if (this.details.getAttribute('ready')) {
      this.sounds.open.play()
    }

    const backup = this.div.offsetHeight

    this.div.style.height = 'auto'
    const height = this.div.offsetHeight

    this.div.style.height = `${backup}px`

    // See https://stackoverflow.com/a/24195559
    const triggerBrowserReflow = this.div.offsetWidth

    this.div.style.height = backup === height ? 'auto' : `${height}px`

    this.div.addEventListener('transitionend', (transition) => {
      if (transition.propertyName !== 'height') {
        return
      }

      if (this.div.offsetHeight === height) {
        this.div.style.height = 'auto'
      }
    })
  }

  close() {
    if (this.details.getAttribute('ready')) {
      this.sounds.close.play()
    }

    const height = this.div.offsetHeight
    this.div.style.height = `${height}px`

    // See https://stackoverflow.com/a/24195559
    const triggerBrowserReflow = this.div.offsetWidth

    this.div.style.height = 0
  }

  connectedCallback() {
    this.details = this.shadowRoot.querySelector('details')
    this.summary = this.shadowRoot.querySelector('summary')
    this.div = this.shadowRoot.querySelector('div')

    this.sounds = {
      open: new Audio('/sounds/activate.mp3'),
      close: new Audio('/sounds/deactivate.mp3'),
    }

    if (this.getAttribute('open') === null) {
      this.close()
    }

    this.summary.addEventListener('click', (event) => {
      this.details.setAttribute('ready', true)
      this.toggleAttribute('open')
      event.preventDefault()
    })
  }
}

export { Details }
