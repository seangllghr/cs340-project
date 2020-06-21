#!/usr/bin/env node

const parseArgs = require('minimist')
const { promptForNumber } = require('./cli-utils')
const { countMatching } = require('../db')

async function findSMASpread (argv) {
  const lo = Number(argv.l) || promptForNumber('Low:')
  const hi = Number(argv.h) || promptForNumber('High:')

  const query = {
    '50-Day Simple Moving Average': {
      $gt: lo,
      $lt: hi
    }
  }
  const result = await countMatching(query)
  console.log(`Found ${result} matching records`)
}

;(async () => {
  const argv = parseArgs(process.argv.slice(0))
  if (argv.help) {
    console.log('Usage: sma-spread.js [-l <low value>] [-h <high value>]')
    process.exit(0)
  }
  try {
    await findSMASpread(argv)
  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  }
})()
