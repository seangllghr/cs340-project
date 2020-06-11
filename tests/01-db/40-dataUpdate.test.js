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
    { test: 'This is only a test.' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
  await testDataUpdate(
    'Update many records',
    { test: 'This is one of 4 documents' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
  await testDataUpdate(
    'Update against query with no results',
    { test: 'No documents match the test' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
})()
