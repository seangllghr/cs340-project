#!/usr/bin/env node

const fs = require('fs')
const parseArgs = require('minimist')
const { jsonStreamToObj } = require('../util/jsonUtils')
const db = require('../db')

async function readUserInput (argv) {
  if (Object.prototype.hasOwnProperty.call(argv, 'f')) {
    console.log(`Loading file: ${argv.f}`)
    const fileStream = fs.createReadStream(argv.f)
    const obj = await jsonStreamToObj(fileStream)
    return obj
  } else {
    console.log(
      'Processing input from stdin. ' +
        '(Enter Ctrl+d to end if running interactively)'
    )
    const obj = await jsonStreamToObj(process.stdin)
    return obj
  }
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  try {
    const result = await readUserInput(argv)
    console.log(result)
    db.dataCreate(result)
  } catch (err) {
    (err.constructor === SyntaxError)
      ? console.log('Invalid JSON. Aborting.')
      : console.log(err)
  }
})()
