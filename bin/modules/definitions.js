import { parseEuros } from './parsers.js'
import { catalog } from './catalog.js'

const notOutlets = [
  'Inversión',
  'TOTAL',
  'Inversión TOTAL',
  'Inversión Total',
  'TOTAL PRENSA',
  'PRENSA',
  'TOTAL RADIO',
  'TOTAL RADIOS',
  'TOTAL REVISTAS',
  'REVISTAS',
  'TOTAL DIGITALES',
  'TOTAL DIGITAL',
  'TOTAL MARKETING DIGITAL',
  'TOTAL MARKETING ON LINE',
  'TOTAL TELEVISIÓN',
  'TOTAL TELEVISION',
  'TOTAL TELEVISIONES',
  'TOTAL PRENSA DIGITAL',
  'TOTAL PRENSA ESCRITA',
  'TOTAL PRIMERA OLEADA',
  'TOTAL SEGUNDA OLEADA',
  'PRENTSA GUZTIRA/TOTAL PRENSA',
  'RADIO',
  'RADIOS',
  'IRRATIAK GUZTIRA/TOTAL RADIOS',
  'TELEVISIÓN',
  'TELEBISTA GUZTIRA/TOTAL TELEVISIÓN',
  'TELEBISTA GUZTIRA/TOTAL TELEVISIONES',
  'DIGITAL',
  'DIGITALES',
  'DIGITALAK GUZTIRA/TOTAL DIGITALES',
  'TOTAL TV',
  'TOTAL MARKETING ONLINE',
  'MARKETING ON LINE',
  'MARKETING ON LINE GUZTIRA',
  'MARKETING ONLINE',
  'TOTAL EXTERIORES',
  'TOTAL EXTERIOR',
  'EXTERIORES',
  'PUBLICIDAD EXTERIOR',
  'KANPOALDEAK GUZTIRA/TOTAL EXTERIORES',
  'TOTAL REDES SOCIALES',
  'SARE SOZIALAK GUZTIRA/TOTAL REDES SOCIALES',
  'GUZTIRA',
  'PRENTSA GUZTIRA',
  'REDES SOCIALES',
  'IRRATIA GUZTIRA',
  'IRRATIAK GUZTIRA',
  'ALDIZKARIAK GUZTIRA/TOTAL REVISTAS',
  'ALDIZKARIAK GUZTIRA',
  'ALDIZAKARIAK GUZTIRA',
  'DIGITALAK GUZTIRA',
  'TELEBISTA GUZTIRA',
  'MARKETING ONLINE GUZTIRA',
  'SARE SOZIALAK GUZTIRA',
  'SOZIAL ADS ETA PROGRAMATIKA/SOCIAL ADS y PROGRAMÁTICA',
  'KANPOALDE GUZTIRA',
  'BANAKAPENA (LEHEN FASEA)',
  'BANAKAPENA (BIGARREN FASEA) -',
  'BANAKAPENA (HIRUGARREN FASEA)',
  'BANAKAPENA IV.FASEA',
]

const campaigns = [
  'CAMPAÑA',
  'CAMPAÑAS',
  'OTROS',
  'KANPAINA',
  'KANPAINAK',
  'COLABORACIÓN PUBLICITARIA',
  'COLABORACIONES PUBLICITARIAS',
  'ANUNCIO',
  'ANUNCIOS',
  'ANUNCIO OFICIAL',
  'ANUNCIOS OFICIALES',
  'PUBLIZITATE-LANKIDETZA',
  'IRAGARKI OFIZIALA',
  'IRAGARKI OFICIALA', // 😱
  'IRAGARKI OFIZIALAK',
  'IRAGARKIA',
  'IRAGARKIAK',
  'PATROCINIOS',
  'PATROCINIO',
  'CAMPAÑA-COVID19',
  'KANPAINAK / CAMPAÑAS',
  'KANPAINAK/CAMPAÑAS',
  'KANPAINA/CAMPAÑA',
  'PUBLIZITATE-LANKIDETZAK/COLABORACIONES PUBLICITARIAS',
  'PUBLIZITATE-LANKIDETZAK / COLABORACIONES PUBLICITARIAS',
  'PUBLIZITATE-LANKIDETZA / COLABORACIÓN PUBLICITARIA',
  'IRAGARKIAK / ANUNCIOS',
  'IRAGARKIAK/ANUNCIOS',
  'COLABORACIÓN PUBLICITARIA',
]

const keywords = [
  'Nombre',
  'NOMBRE',
  'Izena',
  'Izena/Nombre',
  'Izena / Nombre',
  'Objetivo',
  'Objetivo (descripción)',
  'Objeto',
  'Objeto (descripción)',
  'Helburua',
  'Helburua/objetivo',
  'Helburua /',
  'Helburua / Objeto',
  'Fecha',
  'Fecha /',
  'Fecha / Periodo',
  'Periodo',
  'Aldia',
  'Aldia/Fecha',
  'Personas',
  'Destinado a:',
  'Destinada a',
  'Hartzaileak',
  'Hartzaileak / Personas',
  'Hartzaileak /',
  'Destinatarias/os',
  'Soportes',
  'Soportes utilizados',
  'Erabilitako euskarriak /',
  'Inversión',
  'Inversión TOTAL',
  'Inversión Total',
  'INVERSIÓN TOTAL',
  'TOTAL',
  'GUZTIRA',
  'GUZTIRA /',
  'GUZTIRA/Inversión',
  'GUZTIRA / Inversión TOTAL',
  'DESGLOSE',
  'BANAKAPENA',
  '</BODY>',
  'BANAKAPENA/DESGLOSE',
  'GUZTIRA / Inversión',
]

const valuesForKeyword = (items, pattern) => {
  const chunk = items.find((item) => pattern.test(item[0]))

  if (!chunk) {
    return []
  }

  const label = chunk[0].match(pattern)[0]
  const first = chunk[0] === label ? [] : [chunk[0].slice(label.length).trim()]

  return [...first, ...chunk.slice(1)]
}

const rules = [
  {
    name: 'type',
    rule: (items) => items[0][0],
  },
  {
    name: 'name',
    rule: (items) => {
      const pattern =
        /^(Izena \/ Nombre|Izena\/Nombre|Nombre|NOMBRE|Izena)(?= |$)/
      const initialValues = items[0].slice(1)
      const inlineIndex = initialValues.findIndex((value) =>
        pattern.test(value),
      )
      const typedName =
        inlineIndex === -1
          ? initialValues
          : [
              ...initialValues.slice(0, inlineIndex),
              ...valuesForKeyword([initialValues.slice(inlineIndex)], pattern),
            ]

      return [...typedName, ...valuesForKeyword(items, pattern)].join(' ')
    },
  },
  {
    name: 'description',
    rule: (items) => {
      return valuesForKeyword(
        items,
        /^(Objetivo \(descripción\)|Objeto \(descripción\)|Helburua \/ Objeto|Helburua\/objetivo|Helburua \/|Objetivo|Objeto|Helburua)(?= |$)/,
      )
        .filter(
          (item) =>
            !['(descripción)', '(Descripción)', '(deskribapena)'].includes(
              item,
            ),
        )
        .join(' ')
    },
  },
  {
    name: 'date',
    rule: (items) =>
      valuesForKeyword(
        items,
        /^(Fecha \/ Periodo|Aldia\/Fecha|Fecha \/|Fecha|Periodo|Aldia)(?= |$)/,
      )[0],
  },
  {
    name: 'target',
    rule: (items) =>
      valuesForKeyword(
        items,
        /^(Hartzaileak \/ Personas|Hartzaileak \/|Destinado a:|Destinada a|Hartzaileak|Personas)(?= |$)/,
      )[0],
  },
  {
    name: 'channels',
    rule: (items) =>
      items
        .flatMap((item) =>
          valuesForKeyword(
            [item],
            /^(Soportes utilizados|Erabilitako euskarriak \/|Soportes)(?= |$)/,
          ),
        )
        .filter((item) => !['utilizados'].includes(item))
        .join(' '),
  },
  {
    name: 'euros',
    rule: (items) => {
      const euros = items
        .flatMap((item) =>
          valuesForKeyword(
            [item],
            /^(Inversión TOTAL|Inversión Total|INVERSIÓN TOTAL|GUZTIRA \/ Inversión TOTAL|GUZTIRA \/ Inversión|GUZTIRA\/Inversión|GUZTIRA \/|Inversión|GUZTIRA|TOTAL)(?= |$)/,
          ),
        )
        .find((value) => !isNaN(parseEuros(value)))

      return euros && parseEuros(euros)
    },
  },
  {
    name: 'outlets',
    rule: (items) => {
      const details = items
        .filter((item) =>
          [
            'DESGLOSE',
            'BANAKAPENA',
            'Inversión',
            'Inversión TOTAL',
            'TOTAL',
            'GUZTIRA',
            'BANAKAPENA/DESGLOSE',
          ].includes(item[0]),
        )
        .flatMap((item) => [...item])

      const euros = rules.find(({ name, rule }) => name === 'euros').rule(items)

      let name
      if (details[1] === 'Medio' && details[0] === 'TOTAL') {
        name = details[2]
      } else if (
        (details[2] === 'Medio' && details[0] === 'TOTAL') ||
        (details[2] === 'Medio' && details[0] === 'Inversión') ||
        (details[2] === 'Medio' && details[0] === 'Inversión TOTAL') ||
        (details[2] === 'Komunikabidea' && details[0] === 'GUZTIRA') ||
        (details[2] === 'Hedabidea' && details[0] === 'GUZTIRA')
      ) {
        name = details[3]
      } else if (
        details[3] === 'Medio' &&
        details[0] === 'Inversión' &&
        details[2] === 'TOTAL'
      ) {
        name = details[4]
      }

      if (name) {
        const canonical = catalog.outlets.find(({ synonyms }) =>
          synonyms.includes(name),
        )?.name

        return [
          {
            name,
            euros,
            ...(canonical && { canonical }),
          },
        ]
      }

      return details.flatMap((value, i) => {
        const name = details[i - 1]
        const euros = parseEuros(value)

        const canonical = catalog.outlets.find(({ synonyms }) =>
          synonyms.includes(name),
        )?.name

        return isNaN(euros) || notOutlets.includes(name)
          ? []
          : { name, euros, ...(canonical && { canonical }) }
      })
    },
  },
  // {
  //   name: 'debug',
  //   rule: (items) => items,
  // },
]

const definitions = {
  2018: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>MEMORIA PUBLICIDAD GOBIERNO VASCO AÑO 2018<br>/,
      /<A name=15><\/a>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2019: {
    // ¡La página 15ª tiene un encabezado diferente a las demás!
    pageSeparators: [
      /<A name=\d{1,3}><\/a>MEMORIA PUBLICIDAD GOBIERNO VASCO<br>\nAño 2019<br>/,
      /<A name=15><\/a>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2020: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>MEMORIA DE PUBLICIDAD GOBIERNO VASCO<br>\nAño 2020<br>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,

    details: [
      {
        type: 'type',
        patterns: [
          'Creatividad',
          'Producción',
          'Contratación de espacios en medios de comunicación',
          'Sormena/Creatividad',
        ],
      },
      {
        type: 'heading',
        patterns: ['Empresa', 'Coste'],
      },
      {
        type: 'sum',
        patterns: [
          'TOTAL PRENSA',
          'TOTAL REVISTAS',
          'TOTAL DIGITALES',
          'TOTAL RADIOS',
          'TOTAL TELEVISIÓN',
          'TOTAL REDES SOCIALES',
          'TOTAL MARKETING ONLINE',
          'TOTAL EXTERIORES',
        ],
      },
    ],
  },
  2021: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>Eusko Jaurlaritzaren Publizitate eta Komunikazio Instituzionalari buruzko Memoria<br>\n2021eko urtea<br>/,
    ],
    footer: /\d{1,3}\. or\. 181etik<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2022: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>Memoria de Publicidad y Comunicación Institucional del Gobierno Vasco<br>\nAño 2022<br>/,
    ],
    footer: /Pág\. \d{1,3} de 216<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2023: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>Memoria de Publicidad y Comunicación Institucional del Gobierno Vasco<br>\nAño 2023<br>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2024: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>MEMORIA DE PUBLICIDAD GOBIERNO VASCO<br>\nAño 2024<br>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns,
    keywords,
    rules,
  },
  2025: {
    pageSeparators: [
      /<A name=\d{1,3}><\/a>Eusko Jaurlaritzaren Publizitate eta Komunikazio Instituzionalari buruzko Memoria \/ Memoria de Publicidad y Comunicación Institucional del Gobierno Vasco<br>\n2025eko urtea \/ Año 2025<br>/,
    ],
    footer: /\d{1,3}<br>\n<hr>/g,
    campaigns: campaigns.filter(
      (campaign) =>
        ![
          'CAMPAÑA',
          'CAMPAÑAS',
          'KANPAINA',
          'KANPAINAK',
          'PATROCINIO',
          'PATROCINIOS',
        ].includes(campaign),
    ),
    keywords,
    rules,
  },
}

export { definitions }
