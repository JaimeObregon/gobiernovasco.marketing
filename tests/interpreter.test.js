import { Interpreter } from '../bin/modules/interpreter.js'

describe('Año 2021', () => {
  const interpreter = new Interpreter('2021', 'converted/2021.html')

  test('Número de páginas', () => {
    expect(interpreter.pages.length).toBe(182)
  })

  test('Departamentos', () => {
    const departments = interpreter.departments

    expect(departments.length).toBe(12)

    expect(departments[0]).toMatchObject({
      department: 'LEHENDAKARITZA',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'SEGURTASUNA',
      page: 22,
    })

    expect(departments[2]).toMatchObject({
      department: 'LANA ETA ENPLEGUA',
      page: 32,
    })

    expect(departments[3]).toMatchObject({
      department: 'GOBERNANTZA PUBLIKOA ETA AUTOGOBERNUA',
      page: 48,
    })

    expect(departments[4]).toMatchObject({
      department: 'EKONOMIAREN GARAPENA, JASANGARRITASUNA ETA INGURUMENA',
      page: 51,
    })

    expect(departments[5]).toMatchObject({
      department: 'EKONOMÍA ETA OGASUNA',
      page: 81,
    })

    expect(departments[6]).toMatchObject({
      department: 'HEZKUNTZA',
      page: 86,
    })

    expect(departments[7]).toMatchObject({
      department: 'LURRALDE PLANGINTZA, ETXEBIZITZA ETA GARRAIOAK',
      page: 101,
    })

    expect(departments[8]).toMatchObject({
      department: 'OSASUNA',
      page: 121,
    })

    expect(departments[9]).toMatchObject({
      department: 'BERDINTASUNA, JUSTIZIA ETA GIZARTE POLITIKAK',
      page: 133,
    })

    expect(departments[10]).toMatchObject({
      department: 'KULTURA ETA HIZKUNTZA POLITIKA',
      page: 156,
    })

    expect(departments[11]).toMatchObject({
      department: 'TURISMO, MERKATARITZA ETA KONTSUMOA',
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
      department: 'LEHENDAKARITZA',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'GOBERNANZA PÚBLICA Y AUTOGOBIERNO',
      page: 16,
    })

    expect(departments[2]).toMatchObject({
      department: 'DESARROLLO ECONÓMICO E INFRAESTRUCTURAS',
      page: 18,
    })

    expect(departments[3]).toMatchObject({
      department: 'EMPLEO Y POLÍTICAS SOCIALES',
      page: 38,
    })

    expect(departments[4]).toMatchObject({
      department: 'MEDIO AMBIENTE, PLANIFICACIÓN TERRITORIAL Y VIVIENDA',
      page: 58,
    })

    expect(departments[5]).toMatchObject({
      department: 'HACIENDA Y ECONOMÍA',
      page: 67,
    })

    expect(departments[6]).toMatchObject({
      department: 'EDUCACIÓN',
      page: 69,
    })

    expect(departments[7]).toMatchObject({
      department: 'SALUD',
      page: 80,
    })

    expect(departments[8]).toMatchObject({
      department: 'TURISMO, COMERCIO Y CONSUMO',
      page: 91,
    })

    expect(departments[9]).toMatchObject({
      department: 'CULTURA Y POLÍTICA LINGÜÍSTICA',
      page: 108,
    })

    expect(departments[10]).toMatchObject({
      department: 'SEGURIDAD',
      page: 114,
    })

    expect(departments[11]).toMatchObject({
      department: 'TRABAJO Y JUSTICIA',
      page: 124,
    })

    expect(departments[12]).toMatchObject({
      department: 'LEHENDAKARITZA',
      page: 127,
    })

    expect(departments[13]).toMatchObject({
      department: 'GOBERNANZA PÚBLICA Y AUTOGOBIERNO',
      page: 137,
    })

    expect(departments[14]).toMatchObject({
      department: 'DESARROLLO ECONÓMICO, SOSTENIBILIDAD Y MEDIO AMBIENTE',
      page: 139,
    })

    expect(departments[15]).toMatchObject({
      department: 'IGUALDAD, JUSTICIA Y POLÍTICAS SOCIALES',
      page: 149,
    })

    expect(departments[16]).toMatchObject({
      department: 'PLANIFICACIÓN TERRITORIAL, VIVIENDA Y TRANSPORTES',
      page: 157,
    })

    expect(departments[17]).toMatchObject({
      department: 'ECONOMÍA Y HACIENDA',
      page: 165,
    })

    expect(departments[18]).toMatchObject({
      department: 'EDUCACIÓN',
      page: 167,
    })

    expect(departments[19]).toMatchObject({
      department: 'SALUD',
      page: 174,
    })

    expect(departments[20]).toMatchObject({
      department: 'TURISMO, COMERCIO Y CONSUMO',
      page: 180,
    })

    expect(departments[21]).toMatchObject({
      department: 'CULTURA Y POLÍTICA LINGÜÍSTICA',
      page: 188,
    })

    expect(departments[22]).toMatchObject({
      department: 'SEGURIDAD',
      page: 195,
    })

    expect(departments[23]).toMatchObject({
      department: 'TRABAJO Y EMPLEO',
      page: 199,
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
      department: 'LEHENDAKARITZA',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'GOBERNANZA PÚBLICA Y AUTOGOBIERNO',
      page: 23,
    })

    expect(departments[2]).toMatchObject({
      department: 'DESARROLLO ECONÓMICO E INFRAESTRUCTURAS',
      page: 25,
    })

    expect(departments[3]).toMatchObject({
      department: 'EMPLEO Y POLÍTICAS SOCIALES',
      page: 61,
    })

    expect(departments[4]).toMatchObject({
      department: 'MEDIO AMBIENTE, PLANIFICACIÓN TERRITORIAL Y VIVIENDA',
      page: 83,
    })

    expect(departments[5]).toMatchObject({
      department: 'HACIENDA Y ECONOMÍA',
      page: 100,
    })

    expect(departments[6]).toMatchObject({
      department: 'EDUCACIÓN',
      page: 103,
    })

    expect(departments[7]).toMatchObject({
      department: 'SALUD',
      page: 118,
    })

    expect(departments[8]).toMatchObject({
      department: 'TURISMO, COMERCIO Y CONSUMO',
      page: 130,
    })

    expect(departments[9]).toMatchObject({
      department: 'CULTURA Y POLÍTICA LINGÜÍSTICA',
      page: 146,
    })

    expect(departments[10]).toMatchObject({
      department: 'SEGURIDAD',
      page: 157,
    })

    expect(departments[11]).toMatchObject({
      department: 'TRABAJO Y JUSTICIA',
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
      department: 'LEHENDAKARITZA',
      page: 4,
    })

    expect(departments[1]).toMatchObject({
      department: 'GOBERNANZA PÚBLICA Y AUTOGOBIERNO',
      page: 22,
    })

    expect(departments[2]).toMatchObject({
      department: 'DESARROLLO ECONÓMICO E INFRAESTRUCTURAS',
      page: 30,
    })

    expect(departments[3]).toMatchObject({
      department: 'EMPLEO Y POLÍTICAS SOCIALES',
      page: 63,
    })

    expect(departments[4]).toMatchObject({
      department: 'MEDIO AMBIENTE, PLANIFICACIÓN TERRITORIAL Y VIVIENDA',
      page: 84,
    })

    expect(departments[5]).toMatchObject({
      department: 'HACIENDA Y ECONOMÍA',
      page: 104,
    })

    expect(departments[6]).toMatchObject({
      department: 'EDUCACIÓN',
      page: 106,
    })

    expect(departments[7]).toMatchObject({
      department: 'SALUD',
      page: 130,
    })

    expect(departments[8]).toMatchObject({
      department: 'TURISMO, COMERCIO Y CONSUMO',
      page: 147,
    })

    expect(departments[9]).toMatchObject({
      department: 'CULTURA Y POLÍTICA LINGÜÍSTICA',
      page: 166,
    })

    expect(departments[10]).toMatchObject({
      department: 'SEGURIDAD',
      page: 174,
    })

    expect(departments[11]).toMatchObject({
      department: 'TRABAJO Y JUSTICIA',
      page: 196,
    })
  })
})
