#!/usr/bin/env node

const assert = require('assert')
const db = require('../../db')
const { testMessage } = require('../testMessage')

async function testDataCreate (testName, document, opts) {
  try {
    const queryDocument = Array.isArray(document)
      ? { test: document[0].test }
      : { test: document.test }
    const insertOk = await db.dataCreate(document, opts)
    assert.ok(insertOk)
    const results = await db.dataRead(queryDocument, opts)
    if (Array.isArray(document)) {
      assert.strictEqual(document.length, results.length)
    } else {
      assert.strictEqual(1, results.length)
    }
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
