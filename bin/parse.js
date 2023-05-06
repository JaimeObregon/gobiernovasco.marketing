#!/usr/bin/env node

import util from 'util'
import { Interpreter } from './modules/interpreter.js'

// const years = [2022, 2021, 2020, 2019, 2018]
const years = [2018]

const results = []

years.forEach((year) => {
  const interpreter = new Interpreter(year, `converted/${year}.html`)

  interpreter.departments.forEach((department) => {
    const campaigns = interpreter.getCampaigns(department)
    campaigns.forEach((campaign) => {
      results.push(interpreter.parseCampaign(campaign))
    })
  })
})

const json = JSON.stringify(results, null, 2)

console.log(json)

// const interpreter = new Interpreter(2022, 'converted/2022.html')
// const department = interpreter.departments[2]
// const campaigns = interpreter.getCampaigns(department)
// const details = interpreter.parseCampaign(campaigns[0])

// campaigns.forEach((campaign) => {
//   console.log(interpreter.parseCampaign(campaign))
// })

// console.log(util.inspect(details, { maxArrayLength: null }))
