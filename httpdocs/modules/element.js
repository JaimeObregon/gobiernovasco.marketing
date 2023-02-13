// Véase https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
const identity = (strings, ...values) => {
  return String.raw({ raw: strings }, ...values)
}

const html = identity

const css = identity

class MyElement extends HTMLElement {
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })

    try {
      const stylesheet = new CSSStyleSheet()
      stylesheet.replace(this.constructor.styles)
      shadowRoot.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        stylesheet,
      ]
      shadowRoot.innerHTML = this.constructor.html
    } catch (error) {
      // Fallback for Safari
      const styles = document.head.querySelector('style')?.innerHTML
      shadowRoot.innerHTML = html`
        <style>
          ${styles}
          ${this.constructor.styles}
        </style>
        ${this.constructor.html}
      `
    }
  }
}

export { MyElement, html, css }
