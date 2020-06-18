#!/usr/bin/env node

const assert = require('assert')
const services = require('../../services')
const { countMatching } = require('../../db')
const { testMessage } = require('../testMessage')
const createDoc = require('./create.json')

;(async (testName) => {
  const query = { id: `${createDoc.id}` }
  const matchesBefore = await countMatching(query)
  try {
    await services.createService(createDoc)
    const matchesAfter = await countMatching(query)
    assert.strictEqual(matchesAfter, (matchesBefore + 1))
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    if (err.constructor === assert.AssertionError) {
      console.log(
        `Expected ${err.expected}` +
        ` ${err.expected === 1 ? 'match' : 'matches'},` +
        ` got ${err.actual}`)
    } else {
      console.log(err)
    }
  }
})('createService: Document successfully inserted')
