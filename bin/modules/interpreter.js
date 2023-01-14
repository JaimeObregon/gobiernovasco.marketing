import fs from 'fs'
import { definitions } from './definitions.js'
import { parseEuros, splitArrayByKeywords } from './parsers.js'

class Interpreter {
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
    const pages = this.pages

    const { range } = department
    const [firstPage, lastPage] = range

    const lines = pages
      .slice(firstPage - 1, lastPage)
      .flatMap((page) => page.lines)

    const { campaigns } = this.definitions

    const items = splitArrayByKeywords(lines, campaigns).filter(
      (item) => item.length > 1 // TODO Mejorable
    )

    return items
  }

  parseCampaign(campaign) {
    const { keywords, rules } = this.definitions

    const items = splitArrayByKeywords(campaign, keywords)

    const result = {
      type: items[0][0],
    }

    console.log(items)

    rules.forEach((definition) => {
      result[definition.name] = definition.rule(items)
    })

    result.debug = items

    return result
  }

  constructor(year, file) {
    this.definitions = definitions[year]
    this.html = fs.readFileSync(file, { encoding: 'utf8' })
    this.year = year
  }
}

export { Interpreter }
