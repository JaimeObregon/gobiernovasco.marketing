import fs from 'fs'
import util from 'util'
import { definitions } from './definitions.js'
import { parseEuros, splitArrayByKeywords } from './parsers.js'

class Interpreter {
  constructor(year, file) {
    this.definitions = definitions[year]
    this.html = fs.readFileSync(file, { encoding: 'utf8' })
    this.html = this.html.replaceAll(
      / <\/span><span class="ft(\d+)">/g,
      '<br>\n'
    )

    // Las páginas 19 del PDF de 2020 y 36 del PDF de 2019, tienen sendas
    // campañas con un nombre ambiguo que se confunde con una _keyword_.
    this.html = this.html.replaceAll(
      /(CAMPAÑA|ANUNCIO OFICIAL)<br>\nNombre<br>\nANUNCIOS OFICIALES<br>\n/g,
      '$1<br>\nNombre<br>\nANUNCIOS OFICIALES VARIOS<br>\n'
    )

    if (year === 2018) {
      this.html = this.html.replaceAll(
        /40(<br>\n4\.628,00€<br>\n)/g,
        '40 Principales$1'
      )
    }

    this.year = year
  }

  get pages() {
    const { pageSeparators, footer } = this.definitions

    let pages = []

    pages = this.html.split(pageSeparators[0])

    if (pageSeparators.length > 1) {
      pages = pages.flatMap((page) =>
        pageSeparators.slice(1).flatMap((separator) => page.split(separator))
      )
    }

    pages = pages
      .map((page) => page.replaceAll(footer, ''))
      .map((page) => page.replaceAll('<br>', ''))
      .map((page, i) => ({
        lines: page.split('\n').filter(Boolean),
        page: i + 1,
      }))

    return pages
  }

  get departments() {
    const pages = this.pages

    const departments = pages.filter((page) => page.lines.length === 1)

    return departments.map((page, i) => {
      const next = departments[i + 1]

      const start = page.page + 1
      let end = next ? next.page - 1 : pages.length

      // La página 126 del PDF de 2020, es un índice que sobra
      if (this.year === '2020' && next && next.page === 127) {
        end -= 1
      }

      return {
        department: page.lines[0],
        page: page.page,
        range: [start, end],
      }
    })
  }

  getCampaigns(department) {
    const { range } = department
    const [firstPage, lastPage] = range

    const lines = this.pages
      .slice(firstPage - 1, lastPage)
      .flatMap((page) => page.lines)

    const campaigns = splitArrayByKeywords(lines, this.definitions.campaigns)
      .filter((item) => item.length > 1)
      .map((items) => ({ items, department }))

    return campaigns
  }

  parseCampaign(campaign) {
    const { keywords, rules } = this.definitions

    const items = splitArrayByKeywords(campaign.items, keywords)

    const result = {
      ...campaign.department,
      year: this.year,
    }

    if (!items[0].length) {
      return result
    }

    if (/no ha llevado a cabo/.test(items[0][1])) {
      return result
    }

    rules.forEach((definition) => {
      const value = definition.rule(items)
      if (value) {
        result[definition.name] = value
      }
    })

    if (typeof result.outlets[0] === 'object') {
      const sum =
        Math.round(
          100 *
            result.outlets.reduce(
              (previous, current) => (previous += current.euros),
              0
            )
        ) / 100

      const difference = Math.round(Math.abs(result.euros - sum))
      if (difference > 1) {
        console.error(
          `La suma de importes (${sum}) no coincide con el total ${result.euros} por ${difference} €.`
        )
        console.error(util.inspect(result, { maxArrayLength: null }))
      }
    }

    return result
  }
}

export { Interpreter }
