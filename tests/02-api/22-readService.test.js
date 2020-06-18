#!/usr/bin/env node

const assert = require('assert')
const services = require('../../services')
const { dataRead } = require('../../db')
const { testMessage } = require('../testMessage')
const { id: targetId } = require('./create.json')

;(async (testName, query) => {
  try {
    const expectedResult = await dataRead(query)
    const result = await services.readService(query)
    assert.deepStrictEqual(result, expectedResult[0])
    testMessage(testName, true)
  } catch (err) {
    const { expected, actual } = err
    testMessage(testName, false)
    if (err.constructor === assert.AssertionError) {
      console.log(`Expected: ${expected} Actual: ${actual}`)
    } else {
      console.log(err)
    }
  }
})(
  'readService: Length of result matches expected',
  { id: `${targetId}` }
)
