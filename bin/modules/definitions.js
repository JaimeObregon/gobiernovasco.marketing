import { parseEuros } from './parsers.js'

const outlets = [
  {
    name: 'Radio Popular de Bilbao – Bilbo Herri Irratia',
    synonyms: [
      'Bilbo Herri Irratia – Radio Popular de Bilbao',
      'Bilbo Herri Irratia- Radio Popular de Bilbao',
      'Bilbo herri irratia-Radio Popular de Bilbao',
      'Bilbo Herri Irratia-Radio Popular de Bilbao',
      'Herri Irratia- Radio Popular',
      'Herri irratia-Radio Popular de Bilbao',
      'Herri Irratia-Radio Popular',
      'Herri Irratia/Radio Popular',
      'Radio Popular - Bilbao',
      'Radio Popular - Donostia',
      'Radio Popular – Herri Irratia',
      'Radio Popular (Bilbao)',
      'Radio Popular Bilabo',
      'Radio Popular Bilbao /Herri Irratia',
      'Radio Popular Bilbao',
      'Radio popular de Bilbao',
      'Radio Popular de Bilbao',
      'Radio Popular De Bilbao',
      'Radio Popular-Herri Irratia',
      'Radio popular',
      'Radio Popular',
      'Radio popular/Herri irratia Bilbao',
      'Radio popular/Herri irratia',
    ],
  },
  {
    name: 'eldiario.es',
    synonyms: [
      '<A href="http://www.eldiario.es/euskadi">eldiario.es</a>',
      'El Diario Norte',
      'el diario.es',
      'el diario.es/norte',
      'eldiario.es (eldiarionorte.es)',
      'eldiario.es',
      'Eldiario.es',
      'eldiario.es/norte',
      'eldiarionorte.es (blog AGOST Basque Industry 4.0)',
      'eldiarionorte.es (blog JULIO Basque Industry 4.0)',
      'eldiarionorte.es (blog JUNIO Basque Industry 4.0)',
      'eldiarionorte.es (blog MAYO Basque Industry 4.0)',
      'eldiarionorte.es (diciembre)',
      'eldiarionorte.es (febrero)',
      'eldiarionorte.es (julio)',
      'eldiarionorte.es (junio)',
      'eldiarionorte.es (noviembre)',
      'eldiarionorte.es (octubre)',
      'eldiarionorte.es (septiembre)',
      'eldiarionorte.es',
    ],
  },
  {
    name: 'El Mundo',
    synonyms: [
      '<A href="http://www.elmundo.es/">elmundo.es</a>',
      'El Mundo (Apertura Milán)',
      'El Mundo (Supl. Innovación y Tecnología)',
      'El Mundo (Tokio)',
      'El Mundo (Zona Norte)',
      'El Mundo de los Pirineos (mayo y junio)',
      'El Mundo de los Pirineos',
      'El Mundo del País Vasco',
      'El Mundo Pv',
      'El Mundo PV',
      'El Mundo Viajes',
      'el mundo.com',
      'el mundo.es',
      'El mundo.es',
      'el mundo',
      'El mundo',
      'El Mundo',
      'elmundo.com',
      'Elmundo.com',
      'elmundo.es (Apertura Milán)',
      'elmundo.es (Brexit) / (USA)',
      'elmundo.es',
      'Elmundo.es',
      'elmundo',
    ],
  },
  {
    name: 'la ría del ocio',
    synonyms: [
      'La Ria del Ocio',
      'La ría del Ocio',
      'La Ría del ocio',
      'La Ría del Ocio',
      'lariadelocio.es',
      'lariadelocio',
      'Ría del ocio',
      'Ría del Ocio',
    ],
  },
  {
    name: 'Crónica Vasca',
    synonyms: [
      '<A href="http://www.cronicavasca.com/">cronicavasca.com</a>',
      'Cronica vasca-branded content',
      'cronica vasca',
      'crónica vasca',
      'Crónica Vasca',
      'cronicavasca.com',
      'Cronicavasca.com',
      'cronicavasca.eus',
      'cronicavasca',
    ],
  },
  {
    name: 'Hamaika Telebista',
    synonyms: [
      '11 TB',
      '11 telebista',
      'Haimaika Telebista',
      'HaimakaTb',
      'hamaika',
      'Hamaika',
      'hamaika tb',
      'Hamaika tb',
      'Hamaika Tb',
      'Hamaika TB',
      'HAMAIKA TB',
      'Hamaika Tb.',
      'Hamaika telebista',
      'HAMAIKA Telebista',
      'Hamaika Telebista (Topo)',
      'Hamaika Telebista.',
      'Hamaika Tv',
      'Hamaika TV',
      'Hamaika.es',
      'hamaika.eus',
      'Hamaika.eus (Topo)',
      'HamaikaTB',
    ],
  },
  {
    name: 'Los 40',
    synonyms: [
      '40 principales',
      '40 Principales',
      '40 principales Bilbao',
      '40 principales BIlbao',
      '40 Principales Bilbao',
      '40 principales digital',
      '40 principales Donostia-San Sebastián',
      '40 Principales Donostia-San Sebastián',
      '40 principales Eibar',
      '40 Principales Eibar',
      '40 principales Euskadi',
      '40 principales San Sebastian',
      '40 principales San Sebastián',
      '40 Principales San Sebastián',
      '40 principales Vitoria',
      '40 Principales Vitoria',
      '40 principales Vitoria-Gasteiz',
      '40 Principales Vitoria-Gasteiz',
      'Cadena 40 Principales',
      'Los 40 principales',
    ],
  },
  {
    name: 'Onda Cero',
    synonyms: [
      'Onda Cero (Pre-Roll)',
      'onda cero app digital',
      'Onda Cero App Digital',
      'Onda Cero APP digital',
      'onda cero app',
      'Onda Cero Bilbao',
      'onda cero digital',
      'Onda Cero digital',
      'Onda cero Euskadi',
      'Onda Cero Euskadi',
      'Onda cero país vasco',
      'Onda cero País Vasco',
      'Onda Cero País Vasco',
      'Onda Cero. Acción Barakaldo.',
      'Onda Cero. Acción Hernani.',
      'Onda cero',
      'Onda Cero',
      'ONDA CERO',
      'ondacero.es',
    ],
  },
  {
    name: 'Oizmendi Telebista',
    synonyms: ['Oizmendi Tb.', 'Oizmendi TB', 'Oizmendi Telebista', 'Oizmendi'],
  },
  {
    name: 'Tele 7',
    synonyms: [
      'Tele 7 Barakaldo',
      'Tele 7 Tb.',
      'Tele 7',
      'TELE 7',
      'Tele7 Barakaldo',
      'Tele7',
    ],
  },
  {
    name: 'Deia',
    synonyms: [
      '<A href="http://www.deia.eus/">deia.eus</a>',
      'Deia (Apertura Milán)',
      'Deia (Brexit) / (USA)',
      'Deia (Ed. General)',
      'Deia (Junio)',
      'Deia (puertos)',
      'Deia (suplemento sector primario)',
      'Deia (Tokio)',
      'Deia (último lunes de Gernika)',
      'Deia digital',
      'Deia General',
      'Deia. Acción Barakaldo.',
      'deia.com (Apertura Milán)',
      'deia.com',
      'Deia.com',
      'deia.eus (Brexit) / (USA)',
      'deia.eus, banner',
      'deia.eus',
      'Deia.eus',
      'deia',
      'Deia',
      'DEIA',
    ],
  },
  {
    name: 'Elhuyar',
    synonyms: [
      'Elhuyar aldizkaria',
      'elhuyar.eus',
      'Elhuyar',
      'Revista Elhuyar',
    ],
  },
  {
    name: 'Argia',
    synonyms: [
      'Anuario ARGIA',
      'argia internet',
      'Argia internet',
      'Argia Internet',
      'Argia Sariak',
      'Argia- (Gakoak)',
      'Argia. Sagardo gehigarria',
      'Argia. Sagardoa boteilan.',
      'Argia. Vive la huerta.',
      'argia.eus',
      'argia',
      'Argia',
      'Argiak (Gakoak)',
    ],
  },
  {
    name: 'Twitter',
    synonyms: ['Twitter', 'twiter', 'Twiter', 'Twitter Ads'],
  },
  {
    name: 'Facebook',
    synonyms: ['Faceboock', 'Facebook ads', 'Facebook+Instagram', 'Facebook'],
  },
  {
    name: 'Instagram',
    synonyms: [
      'FB/ instagram',
      'instagram',
      'Instagram',
      'Instagran',
      'Instragram',
    ],
  },
  {
    name: 'YouTube',
    synonyms: [
      'Campaña Youtube (display)',
      'Compra Programática Youtube',
      'Google Sites (YouTube)',
      'Google Youtube',
      'You Tube',
      'Youtube',
      'YouTube',
    ],
  },
  {
    name: 'Google',
    synonyms: [
      'Display Google',
      'DV360',
      'Google (display)',
      'Google Ads Dv360',
      'google ads',
      'Google Ads',
      'Google Adwards',
      'Google adwords',
      'Google Adwords',
      'Google Awards',
      'Google display + RRSS',
      'Google Display Network',
      'Google display',
      'Google Display',
      'Google Marketing Platform',
      'Google SEM',
      'Google sites',
      'Google',
      'GOOGLE',
      'Google+',
      'Programatika/Display Google',
      'Servicios digitales google',
      'Servicios Digitales Google',
    ],
  },
  {
    name: 'Gara',
    synonyms: [
      'Anuario de Gara',
      'Anuario Gara 2021',
      'Euskal Herriko Gida (Gara)',
      'Euskal Herriko Gida Gara',
      'Gara -EH Gida',
      'Gara –Especial Infraestructuras-',
      'Gara (Apertura Milán)',
      'Gara (Brexit) / (USA)',
      'Gara (Ed. General)',
      'Gara (Eh Gida)',
      'Gara (Ehko Gida)',
      'gara (naiz.eus)',
      'Gara (Naiz.eus)',
      'Gara (puertos)',
      'Gara (Supl. Innovación)',
      'Gara (Suplemento 7K)',
      'Gara (Tokio)',
      'Gara 7K',
      'Gara Anuario',
      'Gara digital',
      'Gara General',
      'gara naiz',
      'Gara naiz',
      'Gara Naiz',
      'Gara- Bandera de la Concha',
      'gara-nahiz.info',
      'gara-naiz',
      'Gara. Acción Donosti.',
      'Gara. Gastronomía gehigarria.',
      'Gara. Sagardoa Boteilan.',
      'Gara. Sukaldaritza gehigarria.',
      'gara.eus',
      'gara',
      'Gara',
      'gara/naiz',
      'Gara/Naiz',
      'Supl. Gara (mayo)',
    ],
  },
  {
    name: 'Berria',
    synonyms: [
      '<A href="http://www.berria.eus/">berria.eus</a>',
      'Anuario Berria 2021',
      'Anuario de Berria',
      'Berria (Apertura Milán)',
      'Berria (Brexit) / (USA)',
      'Berria (puertos)',
      'Berria (revista oficial de la Azoka de Durango)',
      'Berria (Supl. 15 Aniversario)',
      'Berria (Suplemento especial)',
      'Berria (Suplemento Irutxuloko Hitza)',
      'Berria (Tokio)',
      'Berria Anuario',
      'Berria Brand day',
      'Berria digital',
      'Berria General',
      'Berria Oporrak',
      'Berria: Euskal Herriko Plaza',
      'Berria. Acción Barakaldo.',
      'Berria. LGTBI gehigarria',
      'Berria. Sagardoa Boteilan.',
      'berria.com',
      'berria.eus (Apertura Milán)',
      'berria.eus (Brexit) / (USA)',
      'berria.eus',
      'Berria.eus',
      'berria.info banner',
      'berria.info',
      'berria',
      'Berria',
    ],
  },
  {
    name: 'El Diario Vasco',
    synonyms: [
      '<A href="http://www.diariovasco.com/">diariovasco.com</a>',
      'Diario Vasco – Cm Gipuzkoa',
      'Diario Vasco – Sud Ouest',
      'Diario Vasco (Apertura Milán)',
      'Diario Vasco (Brexit) / (USA)',
      'Diario Vasco (Julio)',
      'Diario Vasco (Junio)',
      'Diario Vasco (Noviembre)',
      'Diario Vasco (Octubre)',
      'Diario Vasco (puertos)',
      'Diario Vasco (Sud Ouest)',
      'Diario Vasco (Supl. “Empresas Nº 1”)',
      'Diario Vasco (suplemento de Innovación)',
      'Diario Vasco (Tokio)',
      'diario vasco digital',
      'Diario vasco digital',
      'Diario Vasco digital',
      'Diario Vasco Digital',
      'Diario Vasco. Acción Astigarraga.',
      'Diario Vasco. Acción Donosti.',
      'Diario Vasco. Acción Hernani.',
      'Diario Vasco. Sagardoa boteilan.',
      'Diario Vasco.',
      'diario vasco.com',
      'Diario vasco.com',
      'Diario Vasco.com',
      'diario vasco',
      'Diario vasco',
      'Diario Vasco',
      'diariovasco digital',
      'diariovasco.com (Apertura Milán)',
      'diariovasco.com (Brexit) / (USA)',
      'diariovasco.com',
      'Diariovasco.com',
      'diariovasco.eus',
      'diariovasco',
      'DiarioVasco',
      'diarovasco.com',
      'El Diario Vasco General',
      'El Diario Vasco. Bicibizi 2018 (mayo)',
      'el diario vasco',
      'El Diario Vasco',
      'eldiariovasco.com',
      'Eldiariovasco.com',
      'Supl. Diario Vasco (junio)',
    ],
  },
  {
    name: 'Onda Vasca',
    synonyms: [
      'Onda Vasca (10 cuñas)',
      'Onda Vasca (4 cuñas)',
      'Onda Vasca (Grupo Noticias)',
      'Onda Vasca (julio)',
      'Onda Vasca (junio)',
      'Onda Vasca Bizkaia',
      'Onda vasca Euskadi',
      'Onda Vasca Euskadi',
      'Onda Vasca Gipuzkoa',
      'Onda vasca- Información mareas',
      'Onda vasca',
      'Onda Vasca',
    ],
  },
  {
    name: 'COPE',
    synonyms: [
      'Cadena Cope',
      'Cope Bilbao',
      'Cope Euskadi',
      'COPE Euskadi',
      'Cope País Vasco',
      'Cope Vitoria',
      'Cope',
      'COPE',
    ],
  },
  {
    name: 'TikTok',
    synonyms: ['Tik Tok', 'TikTok'],
  },
  {
    name: 'Gaztea',
    synonyms: [
      'Euskadi gaztea',
      'Euskadi Gaztea',
      'Gaztea Irratia',
      'Gaztea. Acción Astigarraga.',
      'Gaztea. Acción Barakaldo.',
      'Gaztea. Acción Hernani.',
      'Gaztea',
      'GAZTEA',
      'Irratia Gaztea',
      'Radio Gaztea',
    ],
  },
]

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
  'ALDIZAKARIAK GUZTIRA',
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

      const euros = rules.find(({ name, rule }) => name === 'euros').rule(items)

      if (details[1] === 'Medio' && details[0] === 'TOTAL') {
        const outlet = details[2]
        return [{ outlet, euros }]
      } else if (
        (details[2] === 'Medio' && details[0] === 'TOTAL') ||
        (details[2] === 'Medio' && details[0] === 'Inversión') ||
        (details[2] === 'Medio' && details[0] === 'Inversión TOTAL') ||
        (details[2] === 'Komunikabidea' && details[0] === 'GUZTIRA')
      ) {
        const outlet = details[3]
        return [{ outlet, euros }]
      } else if (
        details[3] === 'Medio' &&
        details[0] === 'Inversión' &&
        details[2] === 'TOTAL'
      ) {
        const outlet = details[4]
        return [{ outlet, euros }]
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
