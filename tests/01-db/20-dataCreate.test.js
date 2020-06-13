#!/usr/bin/env node

const assert = require('assert')
const da = require('../../db/dataAccess')
const { testMessage } = require('../testMessage')

async function testDataCreate (testName, document, opts) {
  try {
    const queryDocument = Array.isArray(document)
      ? { test: document[0].test }
      : { test: document.test }
    const insertOk = await da.dataCreate(document, opts)
    assert.ok(insertOk)
    const results = await da.dataRead(queryDocument, opts)
    for (const result of results) {
      assert.strictEqual(queryDocument.test, result.test)
    }
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    console.log(err)
  }
}

(async () => {
  testDataCreate(
    'Insert one document',
    { test: 'This is only a test.' },
    {
      dbName: 'test',
      colName: 'test'
    }
  )
  testDataCreate(
    'Insert many documents',
    [
      { test: 'This is one of 4 documents' },
      { test: 'This is one of 4 documents' },
      { test: 'This is one of 4 documents' },
      { test: 'This is one of 4 documents' }
    ],
    {
      dbName: 'test',
      colName: 'test'
    }
  )
})()
