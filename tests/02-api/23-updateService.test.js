#!/usr/bin/env node

const assert = require('assert')
const services = require('../../services')
const { dataRead } = require('../../db')
const { testMessage } = require('../testMessage')
const { id: targetId } = require('./create.json')

;(async (testName, query, update) => {
  try {
    await services.updateService(query, update)
    const results = await dataRead(query)
    results.forEach((result) => {
      assert.strictEqual(result.result, 'Violation Issued')
    })
    testMessage(testName, true)
  } catch (err) {
    const { expected, actual } = err
    if (err.constructor === assert.AssertionError) {
      testMessage(testName, false)
      console.log(`Expected: ${expected} Actual: ${actual}`)
    } else {
      console.log(err)
    }
  }
})(
  'updateService: Updated record shows updated field value',
  { id: targetId },
  { $set: { result: 'Violation Issued' } }
)
