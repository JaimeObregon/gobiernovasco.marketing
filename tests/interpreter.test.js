import { Interpreter } from '../bin/modules/interpreter.js'

describe('Año 2022', () => {
  const interpreter = new Interpreter('2022', 'converted/2022.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(217)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(12)

    expect(departments[0]).toMatchObject({
      department: 'Presidencia',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'Seguridad',
      page: 22,
    })

    expect(departments[2]).toMatchObject({
      department: 'Trabajo y Empleo',
      page: 36,
    })

    expect(departments[3]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 57,
    })

    expect(departments[4]).toMatchObject({
      department: 'Desarrollo Económico, Sostenibilidad y Medio Ambiente',
      page: 59,
    })

    expect(departments[5]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 95,
    })

    expect(departments[6]).toMatchObject({
      department: 'Educación',
      page: 103,
    })

    expect(departments[7]).toMatchObject({
      department: 'Planificación Territorial, Vivienda y Transportes',
      page: 118,
    })

    expect(departments[8]).toMatchObject({
      department: 'Salud',
      page: 141,
    })

    expect(departments[9]).toMatchObject({
      department: 'Igualdad, Justicia y Políticas Sociales',
      page: 154,
    })

    expect(departments[10]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 182,
    })

    expect(departments[11]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 192,
    })
  })

  describe('Presidencia', () => {
    test('Número de campañas', () => {
      const department = interpreter.departments[0]
      const campaigns = interpreter.getCampaigns(department)
      expect(campaigns.length).toBe(41)
    })
  })

  describe('Desarrollo Económico, Sostenibilidad y Medio Ambiente', () => {
    test('Número de campañas', () => {
      const department = interpreter.departments[4]
      const campaigns = interpreter.getCampaigns(department)
      expect(campaigns.length).toBe(39)
    })

    test('Campaña de BRTA', () => {
      const department = interpreter.departments[4]
      const campaigns = interpreter.getCampaigns(department)
      const campaign = interpreter.parseCampaign(campaigns[38])

      expect(campaign).toMatchObject({
        department: 'Desarrollo Económico, Sostenibilidad y Medio Ambiente',
        page: 59,
        range: [60, 94],
        year: '2022',
        type: 'CAMPAÑA',
        name: 'Promoción del Consorcio Científico-Tecnológico Vasco',
        description:
          'Dar a conocer la existencia y actividad del Consorcio Científico- Tecnológico Vasco',
        date: 'Enero-diciembre',
        target: 'Sociedad e Industria Vasca',
        channels: 'Prensa y Radio',
        euros: 70800,
        outlets: [
          { name: 'Berria', euros: 4500 },
          { name: 'Noticias de Gipuzkoa', euros: 23900 },
          { name: 'El País', euros: 2760 },
          { name: 'El Diario Vasco', euros: 18210 },
          { name: 'El Correo', euros: 9250 },
          { name: 'Expansión', euros: 4000 },
          { name: 'Empresa XXI', euros: 1980 },
          { name: 'Estrategia Empresarial', euros: 2200 },
          { name: 'Cadena Ser', euros: 4000 },
        ],
      })
    })
  })

  describe('Planificación Territorial, Vivienda y Transportes', () => {
    test('Número de campañas', () => {
      const department = interpreter.departments[7]
      const campaigns = interpreter.getCampaigns(department)
      expect(campaigns.length).toBe(37)
    })
  })
})

describe('Año 2021', () => {
  const interpreter = new Interpreter('2021', 'converted/2021.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(182)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(12)

    expect(departments[0]).toMatchObject({
      department: 'Presidencia',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'Seguridad',
      page: 22,
    })

    expect(departments[2]).toMatchObject({
      department: 'Trabajo y Empleo',
      page: 32,
    })

    expect(departments[3]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 48,
    })

    expect(departments[4]).toMatchObject({
      department: 'Desarrollo Económico, Sostenibilidad y Medio Ambiente',
      page: 51,
    })

    expect(departments[5]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 81,
    })

    expect(departments[6]).toMatchObject({
      department: 'Educación',
      page: 86,
    })

    expect(departments[7]).toMatchObject({
      department: 'Planificación Territorial, Vivienda y Transportes',
      page: 101,
    })

    expect(departments[8]).toMatchObject({
      department: 'Salud',
      page: 121,
    })

    expect(departments[9]).toMatchObject({
      department: 'Igualdad, Justicia y Políticas Sociales',
      page: 133,
    })

    expect(departments[10]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 156,
    })

    expect(departments[11]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 160,
    })
  })
})

describe('Año 2020', () => {
  const interpreter = new Interpreter('2020', 'converted/2020.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(204)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(24)

    expect(departments[0]).toMatchObject({
      department: 'Presidencia',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 16,
    })

    expect(departments[2]).toMatchObject({
      department: 'Desarrollo Económico e Infraestructuras',
      page: 18,
    })

    expect(departments[3]).toMatchObject({
      department: 'Empleo y Políticas Sociales',
      page: 38,
    })

    expect(departments[4]).toMatchObject({
      department: 'Medio Ambiente, Planificación Territorial y Vivienda',
      page: 58,
    })

    expect(departments[5]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 67,
    })

    expect(departments[6]).toMatchObject({
      department: 'Educación',
      page: 69,
    })

    expect(departments[7]).toMatchObject({
      department: 'Salud',
      page: 80,
    })

    expect(departments[8]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 91,
    })

    expect(departments[9]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 108,
    })

    expect(departments[10]).toMatchObject({
      department: 'Seguridad',
      page: 114,
    })

    expect(departments[11]).toMatchObject({
      department: 'Trabajo y Justicia',
      page: 124,
    })

    expect(departments[12]).toMatchObject({
      department: 'Presidencia',
      page: 127,
    })

    expect(departments[13]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 137,
    })

    expect(departments[14]).toMatchObject({
      department: 'Desarrollo Económico, Sostenibilidad y Medio Ambiente',
      page: 139,
    })

    expect(departments[15]).toMatchObject({
      department: 'Igualdad, Justicia y Políticas Sociales',
      page: 149,
    })

    expect(departments[16]).toMatchObject({
      department: 'Planificación Territorial, Vivienda y Transportes',
      page: 157,
    })

    expect(departments[17]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 165,
    })

    expect(departments[18]).toMatchObject({
      department: 'Educación',
      page: 167,
    })

    expect(departments[19]).toMatchObject({
      department: 'Salud',
      page: 174,
    })

    expect(departments[20]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 180,
    })

    expect(departments[21]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 188,
    })

    expect(departments[22]).toMatchObject({
      department: 'Seguridad',
      page: 195,
    })

    expect(departments[23]).toMatchObject({
      department: 'Trabajo y Empleo',
      page: 199,
    })
  })

  describe('Salud', () => {
    test('Número de campañas', () => {
      const department = interpreter.departments[7]
      const campaigns = interpreter.getCampaigns(department)
      expect(campaigns.length).toBe(8)
    })
  })
})

describe('Año 2019', () => {
  const interpreter = new Interpreter('2019', 'converted/2019.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(179)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(12)

    expect(departments[0]).toMatchObject({
      department: 'Presidencia',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 23,
    })

    expect(departments[2]).toMatchObject({
      department: 'Desarrollo Económico e Infraestructuras',
      page: 25,
    })

    expect(departments[3]).toMatchObject({
      department: 'Empleo y Políticas Sociales',
      page: 61,
    })

    expect(departments[4]).toMatchObject({
      department: 'Medio Ambiente, Planificación Territorial y Vivienda',
      page: 83,
    })

    expect(departments[5]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 100,
    })

    expect(departments[6]).toMatchObject({
      department: 'Educación',
      page: 103,
    })

    expect(departments[7]).toMatchObject({
      department: 'Salud',
      page: 118,
    })

    expect(departments[8]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 130,
    })

    expect(departments[9]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 146,
    })

    expect(departments[10]).toMatchObject({
      department: 'Seguridad',
      page: 157,
    })

    expect(departments[11]).toMatchObject({
      department: 'Trabajo y Justicia',
      page: 175,
    })
  })
})

describe('Año 2018', () => {
  const interpreter = new Interpreter('2018', 'converted/2018.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(199)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(12)

    expect(departments[0]).toMatchObject({
      department: 'Presidencia',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'Gobernanza Pública y Autogobierno',
      page: 22,
    })

    expect(departments[2]).toMatchObject({
      department: 'Desarrollo Económico e Infraestructuras',
      page: 30,
    })

    expect(departments[3]).toMatchObject({
      department: 'Empleo y Políticas Sociales',
      page: 63,
    })

    expect(departments[4]).toMatchObject({
      department: 'Medio Ambiente, Planificación Territorial y Vivienda',
      page: 84,
    })

    expect(departments[5]).toMatchObject({
      department: 'Economía y Hacienda',
      page: 104,
    })

    expect(departments[6]).toMatchObject({
      department: 'Educación',
      page: 106,
    })

    expect(departments[7]).toMatchObject({
      department: 'Salud',
      page: 130,
    })

    expect(departments[8]).toMatchObject({
      department: 'Turismo, Comercio y Consumo',
      page: 147,
    })

    expect(departments[9]).toMatchObject({
      department: 'Cultura y Política Lingüística',
      page: 166,
    })

    expect(departments[10]).toMatchObject({
      department: 'Seguridad',
      page: 174,
    })

    expect(departments[11]).toMatchObject({
      department: 'Trabajo y Justicia',
      page: 196,
    })
  })
})
