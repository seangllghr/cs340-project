#!/usr/bin/env node

const parseArgs = require('minimist')
const { promptForString } = require('./cli-utils')
const db = require('../db')

async function deleteStockByTicker (argv) {
  let ticker
  try {
    ticker = await promptForString('Ticker: ')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  const query = { Ticker: ticker }

  try {
    const result = await db.dataDelete(query)
    if (result.result.n === 1) {
      console.log(`Deleted stock record for Ticker ${ticker}`)
    } else if (result.result.n > 1) {
      console.log(
        `Deleted more than one record for ${ticker}. You may want to check ` +
          'the database for inconsistencies.'
      )
    } else {
      console.log('No matching record found')
    }
  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  }
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  if (argv.help || argv.h) {
    console.log('Usage: delete-ticker.js [-t <ticker>]')
  }
  deleteStockByTicker(argv)
})()
