import { parseEuros } from './parsers.js'

const notOutlets = [
  'Inversión',
  'TOTAL',
  'Inversión TOTAL',
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
  'RADIO',
  'RADIOS',
  'TELEVISIÓN',
  'DIGITAL',
  'DIGITALES',
  'TOTAL TV',
  'TOTAL MARKETING ONLINE',
  'MARKETING ON LINE',
  'MARKETING ON LINE GUZTIRA',
  'MARKETING ONLINE',
  'TOTAL EXTERIORES',
  'TOTAL EXTERIOR',
  'EXTERIORES',
  'PUBLICIDAD EXTERIOR',
  'TOTAL REDES SOCIALES',
  'GUZTIRA',
  'PRENTSA GUZTIRA',
  'REDES SOCIALES',
  'IRRATIA GUZTIRA',
  'IRRATIAK GUZTIRA',
  'ALDIZKARIAK GUZTIRA',
  'DIGITALAK GUZTIRA',
  'TELEBISTA GUZTIRA',
  'MARKETING ONLINE GUZTIRA',
  'SARE SOZIALAK GUZTIRA',
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
  'IRAGARKIA',
  'IRAGARKIAK',
  'PATROCINIOS',
  'CAMPAÑA-COVID19',
]

const keywords = [
  'Nombre',
  'Izena',
  'Objetivo',
  'Objetivo (descripción)',
  'Objeto',
  'Helburua',
  'Fecha /',
  'Fecha / Periodo',
  'Periodo',
  'Aldia',
  'Personas',
  'Destinado a:',
  'Destinada a',
  'Hartzaileak',
  'Soportes',
  'Soportes utilizados',
  'Inversión',
  'Inversión TOTAL',
  'INVERSIÓN TOTAL',
  'TOTAL',
  'GUZTIRA',
  'DESGLOSE',
  'BANAKAPENA',
  '</BODY>',
]

const rules = [
  {
    name: 'type',
    rule: (items) => items[0][0],
  },
  {
    name: 'name',
    rule: (items) => {
      return [
        ...items[0].slice(1),
        ...items.find((item) => ['Nombre', 'Izena'].includes(item[0])).slice(1),
      ].join(' ')
    },
  },
  {
    name: 'description',
    rule: (items) => {
      return items
        .find((item) =>
          ['Objetivo', 'Objetivo (descripción)', 'Objeto', 'Helburua'].includes(
            item[0]
          )
        )
        .filter((item) => !['(descripción)', '(deskribapena)'].includes(item))
        .slice(1)
        .join(' ')
    },
  },
  {
    name: 'date',
    rule: (items) =>
      items.find((item) =>
        item[0].match(/(Fecha \/|(Fecha \/ )?Periodo|Aldia)/)
      )?.[1],
  },
  {
    name: 'target',
    rule: (items) =>
      items.find((item) => item[0].match(/(Personas|Destinado a:)/))?.[1],
  },
  {
    name: 'channels',
    rule: (items) =>
      items
        .find((item) => item[0].match(/Soportes( utilizados)?/))
        ?.filter((item) => !['utilizados'].includes(item))
        .slice(1)
        .join(' '),
  },
  {
    name: 'euros',
    rule: (items) => {
      const euros = items.find(
        (item) => /(Inversión|TOTAL|GUZTIRA)/.test(item) && item.length > 1
      )
      return parseEuros(euros[1])
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
          ].includes(item[0])
        )
        .flatMap((item) => [...item])

      if (details[1] === 'Medio' && details[0] === 'TOTAL') {
        const outlet = details[2]
        return [outlet]
      } else if (
        (details[2] === 'Medio' && details[0] === 'TOTAL') ||
        (details[2] === 'Medio' && details[0] === 'Inversión') ||
        (details[2] === 'Medio' && details[0] === 'Inversión TOTAL') ||
        (details[2] === 'Komunikabidea' && details[0] === 'GUZTIRA')
      ) {
        const outlet = details[3]
        return [outlet]
      } else if (
        details[3] === 'Medio' &&
        details[0] === 'Inversión' &&
        details[2] === 'TOTAL'
      ) {
        const outlet = details[4]
        return [outlet]
      }

      return details.flatMap((value, i) => {
        const outlet = details[i - 1]
        const euros = parseEuros(value)

        return isNaN(euros) || notOutlets.includes(outlet)
          ? []
          : { outlet, euros }
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
}

export { definitions }
