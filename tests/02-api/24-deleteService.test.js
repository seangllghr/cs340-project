#!/usr/bin/env node

const assert = require('assert')
const services = require('../../services')
const { dataRead } = require('../../db')
const { testMessage } = require('../testMessage')
const { id: targetId } = require('./create.json')

;(async (testName, query) => {
  try {
    await services.deleteService(query)
    const results = await dataRead(query)
    assert.strictEqual(results.length, 0)
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    const { expected, actual } = err
    if (err.constructor === assert.AssertionError) {
      console.log(`Expected: ${expected} Actual: ${actual}`)
    } else {
      console.log(err)
    }
  }
})(
  'deleteService: Target records successfully deleted',
  { id: targetId }
)
