#!/usr/bin/env node

const rl = require('readline-sync')

function promptForString (prompt) {
  let str = ''
  console.log(prompt)
  do {
    str = rl.question('> ')
  } while (str === '')
  return str
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
  promptForString: promptForString,
  getUpdatedVolume: getUpdatedVolume
}
