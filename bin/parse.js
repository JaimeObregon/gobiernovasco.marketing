#!/usr/bin/env node

import util from 'util'
import { Interpreter } from './modules/interpreter.js'

// const interpreter = new Interpreter('2021', 'converted/2021.html')
const interpreter = new Interpreter('2020', 'converted/2020.html')
// const interpreter = new Interpreter('2019', 'converted/2019.html')
// const interpreter = new Interpreter('2018', 'converted/2018.html')

const department = interpreter.departments[0]
const campaigns = interpreter.getCampaigns(department)

const campaign = campaigns[0]
const details = interpreter.parseCampaign(campaign)

campaigns.forEach((campaign) => {
  console.log(interpreter.parseCampaign(campaign))
})

// console.log(util.inspect(details, { maxArrayLength: null }))
