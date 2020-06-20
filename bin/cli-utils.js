#!/usr/bin/env node

const rl = require('readline-sync')

/**
 * Ask the user for a string until they actually provide one
 *
 * @param {string} question - the question to ask the user
 * @returns {string} - the string the user enters
 */
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

/**
 * Ask the user for a number until they actually provide one
 *
 * @param {string} question - the question to ask the user
 * @returns {number} - the number the user enters. Can be a float or an int
 */
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
