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

function promptForNumber (prompt) {
  let num
  console.log(prompt)
  do {
    num = Number(rl.question('> '))
  } while (isNaN(num) || !num)
  return num
}

module.exports = {
  promptForString: promptForString,
  promptForNumber: promptForNumber
}
