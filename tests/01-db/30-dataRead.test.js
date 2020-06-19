#!/usr/bin/env node

const assert = require('assert')
const db = require('../../db')
const { testMessage } = require('../testMessage')

async function testDataRead (testName, query, expectedResults) {
  try {
    const actualResults = await db.dataRead(query)
    assert.strictEqual(expectedResults.length, actualResults.length)
    actualResults.forEach((result, i) => {
      assert.deepStrictEqual(
        expectedResults[i].address,
        actualResults[i].address
      )
    })
    testMessage(testName, true)
  } catch (err) {
    testMessage(testName, false)
    console.log(err)
  }
}

const query = { id: '20032-2017-ACME' }
const expectedResult = [{
  _id: '5ec326afba76330b20ff25f1',
  id: '20032-2017-ACME',
  certificate_number: 9998888,
  business_name: 'New ACME Explosives',
  date: '2020-05-27T01:19:33.335Z',
  result: 'Business Re-opened',
  sector: 'Explosive Retail - 999',
  address: {
    number: 1721,
    street: 'Boom Road',
    city: 'BRONX',
    zip: 10463
  },
  Comments: 'Under new management'
}]

const longQuery = { 'address.zip': 10463 }
const longExpectedResult = [
  { address: { number: 1721, street: 'Boom Road', city: 'BRONX', zip: 10463 } },
  { address: { city: 'BRONX', zip: 10463, street: 'RIVER RD', number: 99 } },
  { address: { city: 'BRONX', zip: 10463, street: 'ALBANY CRES', number: 3044 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BAILEY AVE', number: 2880 } },
  { address: { city: 'Bronx', zip: 10463, street: 'Broadway', number: 5680 } },
  { address: { city: 'BRONX', zip: 10463, street: 'CORLEAR AVE', number: 3239 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5782 } },
  { address: { city: 'BRONX', zip: 10463, street: 'W 238TH ST', number: 135 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5520 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5532 } },
  { address: { city: 'BRONX', zip: 10463, street: 'W KINGSBRIDGE RD', number: 150 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5561 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5716 } },
  { address: { city: 'BRONX', zip: 10463, street: 'W 231ST ST', number: 227 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5582 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5536 } },
  { address: { city: 'BRONX', zip: 10463, street: 'W 231ST ST', number: 251 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BAILEY AVE', number: 2590 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5665 } },
  { address: { city: 'BRONX', zip: 10463, street: 'BROADWAY', number: 5625 } }
]

;(async () => {
  await testDataRead(
    'Read query with match == 1',
    query,
    expectedResult
  )
  await testDataRead(
    'Read query with match > 1',
    longQuery,
    longExpectedResult
  )
})()
