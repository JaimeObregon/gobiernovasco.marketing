const years = {
  2020: {
    components: [
      {
        type: 'page',
        pattern:
          /<A name=(?<number>\d+)><\/a>MEMORIA DE PUBLICIDAD GOBIERNO VASCO<br>\sAño 2020<br>\sLEHENDAKARITZA<br>\s(?<name>\d+)<br>\s<hr>/,
      },
      {
        type: 'group',
        patterns: [
          'CAMPAÑAS',
          'COLABORACIONES PUBLICITARIAS',
          'ANUNCIOS OFICIALES',
        ],
      },
      {
        type: 'item',
        patterns: ['CAMPAÑA', 'COLABORACIÓN PUBLICITARIA', 'ANUNCIO OFICIAL'],
      },
      {
        type: 'key',
        patterns: [
          'Nombre',
          'Objetivo',
          ['Objeto', '(descripción)'],
          'Fecha / Periodo',
          ['Fecha /', 'Periodo'],
          ['Personas', 'destinatarias'],
          ['Inversión', 'TOTAL'],
          'INVERSIÓN TOTAL',
          'Destinado a:',
          'Soportes utilizados',
        ],
      },
    ],
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
}

export { years }
