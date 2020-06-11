#!/usr/bin/env node

const assert = require('assert')
const da = require('../../db/dataAccess')
const { testMessage } = require('../testMessage')

async function testDataUpdate (testName, query, opts) {
  const updates = { $set: { date: new Date() } }
  try {
    const initialResults = await da.dataRead(query, opts)
    if (initialResults.length > 0) {
      for (const result of initialResults) {
        assert.strictEqual(query.test, result.test)
      }
    }
    await da.dataUpdate(query, updates, opts)
    const finalResults = await da.dataRead(query, opts)
    if (finalResults.length > 0) {
      for (const result of finalResults) {
        assert.ok(result.date)
      }
    }
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    console.log(err)
  }
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
