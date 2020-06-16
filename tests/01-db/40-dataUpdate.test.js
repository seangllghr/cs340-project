#!/usr/bin/env node

const assert = require('assert')
const db = require('../../db')
const { testMessage } = require('../testMessage')

async function testDataUpdate (testName, query, opts) {
  const updates = { $set: { date: new Date() } }
  try {
    await db.dataUpdate(query, updates, opts)
    const results = await db.dataRead(query, opts)
    if (results.length > 0) {
      results.forEach((result) => {
        assert.strictEqual(query.test, result.test)
        assert.ok(result.date)
      })
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
