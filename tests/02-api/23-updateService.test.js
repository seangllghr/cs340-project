#!/usr/bin/env node

const assert = require('assert')
const services = require('../../services')
const { dataRead } = require('../../db')
const { testMessage } = require('../testMessage')
const createDoc = require('./create.json')

const queryArray = Object.entries(createDoc)[0]

;(async (testName, query, update) => {
  try {
    await services.updateService(query, update)
    const result = await dataRead({ [query[0]]: query[1] })
    assert.strictEqual(result[0].result, 'Violation Issued')
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
  'updateService: Updated record shows updated field value',
  queryArray,
  [['result', 'Violation Issued']]
)
