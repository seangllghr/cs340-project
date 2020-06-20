#!/usr/bin/env node

const parseArgs = require('minimist')
const { promptForNumber } = require('./cli-utils')

;(async () => {
  const argv = parseArgs(process.argv.slice(0))
  console.log(argv)
})()
