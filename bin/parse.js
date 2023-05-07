#!/usr/bin/env node

import util from 'util'
import { Interpreter } from './modules/interpreter.js'

const years = [2022, 2021, 2020, 2019, 2018]

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

const json = JSON.stringify(results)
process.stdout.write(json)
