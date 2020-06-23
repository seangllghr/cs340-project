#!/usr/bin/env node

const parseArgs = require('minimist')
const { promptForString, promptForNumber } = require('./cli-utils')
const db = require('../db')

async function updateStockVolume (argv) {
  if (argv.help) {
    console.log('Usage: update-volume.js [-t <ticker>] [-v <volume>]')
    process.exit(0)
  }
  let ticker
  try {
    ticker = argv.t || promptForString('Ticker:')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  let volume = -1
  try {
    while (volume < 0) {
      volume = promptForNumber('Volume:')
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  const query = { Ticker: ticker }
  const update = {
    $set: { Volume: volume }
  }

  try {
    const result = await db.dataUpdate(query, update)
    if (result.result.nModified > 0) {
      console.log(`Updated Ticker: ${ticker} Volume: ${volume}`)
    } else if (result.result.n > 0) {
      console.log('No results modified')
    } else {
      console.log('No matching results')
    }
  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  }
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  updateStockVolume(argv)
})()
