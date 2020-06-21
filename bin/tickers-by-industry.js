#!/usr/bin/env node

const parseArgs = require('minimist')
const { promptForString } = require('./cli-utils')
const db = require('../db')

async function getTickersByIndustry (argv) {
  const industry = argv.i || promptForString('Industry:')
  const query = { Industry: industry }
  const numResults = await db.countMatching(query)
  const opts = { limit: numResults }

  const results = await db.dataRead(query, opts)
  results.forEach((result) => {
    console.log(`${result.Ticker} `)
  })
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  if (argv.help) {
    console.log('Usage: tickers-by-industry.js [-i <industry>]')
    process.exit(0)
  }
  getTickersByIndustry(argv)
})()
