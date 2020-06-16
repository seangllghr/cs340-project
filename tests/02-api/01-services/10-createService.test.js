#!/usr/bin/env node

const assert = require('assert')
const services = require('../../../services')
const { dataRead } = require('../../../db')
const { testMessage } = require('../../testMessage')
const createDoc = require('../create.json')

async function testCreateService (testName, document) {
  try {
    assert.strictEqual(1, 1)
    console.log(services.createService)
    console.log(dataRead)
    console.log(createDoc)
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
  }
}

testCreateService('This is a test', { a: 'b' })
