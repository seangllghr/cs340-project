#!/usr/bin/env node

const parseArgs = require('minimist')
const printf = require('printf')
const { promptForString } = require('./cli-utils')
const db = require('../db')

async function aggregateSharesByIndustry (argv) {
  const sector = argv.s || promptForString('Sector:')
  const pipeline = [
    { $match: { Sector: sector } },
    {
      $group: {
        _id: '$Industry',
        totalShares: { $sum: '$Shares Outstanding' }
      }
    },
    { $sort: { totalShares: -1 } }
  ]
  const results = await db.dataAggregate(pipeline)
  results.forEach(result => {
    // Use an extra printf step because float formatting is apparently broken?
    // Also, two sig. figs. seems reasonable here. Correct me if I'm wrong.
    const resultSOstring = printf('%.2f', result.totalShares)
    printf(
      process.stdout,
      '%-40s % 10s % 28s\n',
      result._id,
      resultSOstring,
      'Total Shares Outstanding'
    )
  })
}

(async () => {
  const argv = parseArgs(process.argv.slice(2))
  if (argv.help) {
    console.log('Usage: agg-shares.js [-s <sector>]')
  }
  try {
    aggregateSharesByIndustry(argv)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
