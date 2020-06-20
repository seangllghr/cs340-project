#!/usr/bin/env node

const rl = require('readline-sync')

function promptForString (question) {
  let str = ''
  if (question) {
    console.log(question)
  }
  do {
    str = rl.prompt()
  } while (str === '')
  return str
}

function promptForNumber (question) {
  let num
  if (question) {
    console.log(question)
  }
  do {
    num = Number(rl.prompt())
  } while (isNaN(num) || !num)
  return num
}

module.exports = {
  promptForString: promptForString,
  promptForNumber: promptForNumber
}
