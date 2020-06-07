#!/usr/bin/env node

const printf = require('printf')
const colors = require('colors/safe')

/**
 * Format a test result message
 *
 * @param {string} name - the test name
 * @param {bool} pass - did the test pass?
 */
function testMessage (name, pass) {
  const result = pass
    ? colors.green('***PASS***')
    : colors.red('***FAIL***')
  const message = printf(
    'TEST: %-55s RESULT: %s',
    name,
    result
  )
  console.log(message)
}

exports.testMessage = testMessage
