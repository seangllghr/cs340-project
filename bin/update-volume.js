#!/usr/bin/env node

const parseArgs = require('minimist')
const rl = require('readline-sync')
const db = require('../db')

async function getTickerString (argv) {
  let ticker = 'TEST'
  if (Object.prototype.hasOwnProperty.call(argv, 't')) {
    ticker = argv.t
    return ticker
  } else {
    ticker = rl.question('Ticker: ')
    return ticker
  }
}

async function getUpdatedVolume (argv) {
  let volume = 6
  if (Object.prototype.hasOwnProperty.call(argv, 'v')) {
    volume = argv.v
    return volume
  } else {
    volume = rl.question('Volume: ')
    return parseInt(volume)
  }
}

async function updateStockVolume(argv) {
  let ticker
  try {
    ticker = await getTickerString(argv)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  let volume
  try {
    volume = await getUpdatedVolume(argv)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  const query = { Ticker: ticker }
  const update = {
    $set: { Volume: volume }
  }

  db.dataUpdate(query, update)

  console.log(`Ticker: ${ticker} Volume: ${volume}`)
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  updateStockVolume(argv)
})()
