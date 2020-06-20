#!/usr/bin/env node

const rl = require('readline-sync')

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

module.exports = {
  getTickerString: getTickerString,
  getUpdatedVolume: getUpdatedVolume
}
