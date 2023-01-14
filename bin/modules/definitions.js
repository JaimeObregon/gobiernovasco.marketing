import { parseEuros } from './parsers.js'

const campaigns = ['CAMPAÑA', 'COLABORACIÓN PUBLICITARIA', 'ANUNCIO OFICIAL']

const keywords = [
  'Nombre',
  'Objetivo',
  'Fecha / Periodo',
  'Periodo',
  'Personas',
  'Soportes',
  'Inversión',
  'TOTAL',
  'DESGLOSE',
]

const rules = [
  {
    name: 'name',
    rule: (items) => items.find((item) => item[0] === 'Nombre')[1],
  },
  {
    name: 'description',
    rule: (items) =>
      items
        .find((item) => item[0] === 'Objetivo')
        .filter((item) => item !== '(descripción)')
        .slice(1)
        .join(' '),
  },
  {
    name: 'date',
    rule: (items) =>
      items.find((item) => item[0].match(/(Fecha \/ )?Periodo/))[1],
  },
  {
    name: 'target',
    rule: (items) => items.find((item) => item[0] === 'Personas')[1],
  },
  {
    name: 'channels',
    rule: (items) => items.find((item) => item[0] === 'Soportes')[1],
  },
  {
    name: 'euros',
    rule: (items) => {
      const euros = items.find((item) =>
        ['Inversión', 'TOTAL'].includes(item[0])
      )[1]

      return parseEuros(euros)
    },
  },
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
  },
}

export { definitions }
