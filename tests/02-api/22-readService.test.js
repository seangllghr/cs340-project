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
    assert.strictEqual(result.length, expectedResult.length)
    testMessage(testName, true)
  } catch (err) {
    const { expected, actual } = err
    if (err.constructor === assert.AssertionError) {
      console.log(`Expected: ${expected} Actual: ${actual}`)
      testMessage(testName, false)
    }
  }
})(
  'readService: Something something something dark side',
  { id: `${targetId}` }
)
