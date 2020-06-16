#!/usr/bin/env node

const assert = require('assert').strict
const db = require('../../db')
const { testMessage } = require('../testMessage')

async function testDataDelete (testName, query, opts) {
  try {
    const initialSearchResult = await db.dataRead(query, opts)
    if (initialSearchResult.length > 0) {
      assert.strictEqual(query.test, initialSearchResult[0].test)
      await db.dataDelete(query, opts)
      const finalSearchResult = await db.dataRead(query, opts)
      assert.strictEqual(0, finalSearchResult.length)
    }
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    console.log(err)
  }
}

(async () => {
  await testDataDelete(
    'Delete query with a single match',
    { test: 'This is only a test.' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
  await testDataDelete(
    'Delete query with multiple matches',
    { test: 'This is one of 4 documents' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
  await testDataDelete(
    'Delete query with no matching documents',
    { test: 'No documents match the test' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
})()
