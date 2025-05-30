#!/usr/bin/env node

import { Interpreter } from './modules/interpreter.js'

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018]

const results = []

let id = 0

years.forEach((year) => {
  const interpreter = new Interpreter(year, `converted/${year}.html`)

  interpreter.departments.forEach((department) => {
    const campaigns = interpreter.getCampaigns(department)

    campaigns.forEach((campaign) => {
      results.push({
        id: ++id,
        ...interpreter.parseCampaign(campaign),
      })
    })
  })
})

const json = results
  // Las que no tienen `type` no son campañas sino avisos de que no ha habido
  // campañas…
  .filter((campaign) => campaign.type)

const string = JSON.stringify(json)
process.stdout.write(string)
