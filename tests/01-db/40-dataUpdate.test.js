#!/usr/bin/env node

const assert = require('assert')
const da = require('../../db/dataAccess')
const { testMessage } = require('../testMessage')

async function testDataUpdate (testName, query, updates, opts) {
  // TODO: Test stuff
}

(async () => {
  await testDataUpdate(
    'Update one record',
    { test: 'This is a test' },
    { $set: { date: new Date() } }
  )
})()
