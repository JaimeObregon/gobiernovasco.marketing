import fs from 'fs'
import util from 'util'
import { definitions } from './definitions.js'
import { catalog } from './catalog.js'
import { parseEuros, splitArrayByKeywords } from './parsers.js'

class Interpreter {
  constructor(year, file) {
    this.definitions = definitions[year]
    this.html = fs.readFileSync(file, { encoding: 'utf8' })
    this.html = this.html.replaceAll(/ <\/span><span class="ft\d+">/g, '<br>\n')
    this.html = this.html.replaceAll(/(.)<\/span><span class="ft\d+">/g, '$1')

    this.html = this.html.replaceAll(/(&quot;|”|“)/g, '"')
    this.html = this.html.replaceAll(/&amp;/g, '&')

    this.html = this.html.replaceAll(/<A href="http.+">(.*)<\/a>/g, '$1')

    // Las páginas 19 del PDF de 2020 y 36 del PDF de 2019, tienen sendas
    // campañas con un nombre ambiguo que se confunde con una _keyword_.
    this.html = this.html.replaceAll(
      /(CAMPAÑA|ANUNCIO OFICIAL)<br>\nNombre<br>\nANUNCIOS OFICIALES<br>\n/g,
      '$1<br>\nNombre<br>\nANUNCIOS OFICIALES VARIOS<br>\n'
    )

    // Lo mismo sucede aquí, en el PDF de 2021:
    this.html = this.html.replaceAll(
      /\nIRAGARKI OFIZIALA<br>\nIzena<br>\nIRAGARKI OFIZIALAK<br>\nHelburua<br>/g,
      '\nIRAGARKI OFIZIALA<br>\nIzena<br>\nIragarki Ofizialak<br>\nHelburua<br>'
    )

    // A «Los 40» a veces los llaman simplemente «40». Lo arreglamos aquí,
    // para que el intérprete no lo confunda con cuarenta euros.
    this.html = this.html.replaceAll(
      /\n40(<br>\n[\d\.,]+€<br>\n)/g,
      '\nLos 40$1'
    )

    if (year === 2018) {
      // Corrige dos casos en los que en la memoria están intercambiados los
      // valores de los campos «Inversión total» y «Medio».
      this.html = this.html.replaceAll(
        /Inversión<br>\nRadio Popular-Herri Irratia<br>\nTOTAL<br>\nMedio<br>\n850,00 €<br>\n/g,
        'Inversión<br>\n850,00 €<br>\nTOTAL<br>\nMedio<br>\nRadio Popular-Herri Irratia<br>\n'
      )
      this.html = this.html.replaceAll(
        /Inversión<br>\nRadio Euskadi<br>\nTOTAL<br>\nMedio<br>\n4.367,00 €<br>\n/g,
        'Inversión<br>\n4.367,00 €<br>\nTOTAL<br>\nMedio<br>\nRadio Euskadi<br>\n'
      )
    } else if (year === 2019) {
      this.html = this.html.replaceAll(/137.013, 00€<br>/g, '137.013,00€<br>')

      // Corrige un caso en el que están intercambiados los valores de dos campos.
      this.html = this.html.replaceAll(
        /Soportes<br>\n41\.322,00€<br>\nInversión TOTAL<br>\nRadio y TV<br>\n/g,
        'Soportes<br>\nRadio y TV<br>\nInversión TOTAL<br>\n41.322,00 €<br>\n'
      )
    } else if (year === 2020) {
      this.html = this.html.replaceAll(
        /Propaga<br>\n3.000,00 € impresión carteles<br>\n2.000,00 € banners y gestión online<br>/g,
        'Propaga (impresión carteles)<br>\n3.000,00 €<br>\n<br>Propaga (banners y gestión online)<br>\n2.000,00 €<br>\n'
      )

      this.html = this.html.replaceAll(
        /\nTotal<br>\n157.182,15€<br>/g,
        '\nTOTAL<br>\n157.182,15€<br>'
      )
    } else if (year === 2021) {
      this.html = this.html.replaceAll(
        /\n100\.00,00 €<br>/g,
        '\n100.000,00 €<br>'
      )
    } else if (year === 2022) {
      // Ajustes para interpretar correctamente un par de campañas que en el PDF
      // tienen una alineación singular.
      this.html = this.html.replaceAll(
        /Programa Ur Handitan<br>\nUr Handitan es un programa que sirve de<br>(.+)\nObjeto<br>\nTodos los temas del programa están de<br>\n\(descripción\)<br>\n/gs,
        'Programa Ur Handitan<br>\nObjeto<br>\nUr Handitan es un programa que sirve de<br>\n(descripción)<br>\n$1\nTodos los temas del programa están de<br>\n'
      )
      this.html = this.html.replaceAll(
        /Colaboración Publicitaria y Producción de<br>\nNombre<br>\n‘Aquí Y Ahora’ en Etb2<br>\n"Aquí y Ahora". El programa de ETB2 es una<br>\n(.+)Objeto<br>\ntemporada de "Aquí y ahora" son:<br>\n\(descripción\)<br>\n/gs,
        'Colaboración Publicitaria y Producción de<br>\nNombre<br>\n‘Aquí Y Ahora’ en Etb2<br>\nObjeto<br>\n"Aquí y Ahora". El programa de ETB2 es una<br>\n(descripción)<br>\n$1temporada de “Aquí y ahora” son:<br>\n'
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

      const department = catalog.departments[page.lines[0]]

      return {
        department,
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

      if (Math.abs(result.euros - sum) >= 1) {
        const difference = Math.round(result.euros - sum)
        console.error(
          `En ${result.year}, la suma de importes (${sum}) no coincide con el total ${result.euros} por ${difference} €`
          // util.inspect(result, { maxArrayLength: null })
        )

        result.warning = true
      }
    }

    return result
  }
}

export { Interpreter }
