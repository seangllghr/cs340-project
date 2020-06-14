#!/usr/bin/env node

const da = require('../../db/dataAccess')

const testDoc = {
  id: '12345-6789-TEST',
  certificate_number: 123456789,
  business_name: "Test Testington's Testing Supply Warehouse and Emporium",
  date: new Date(),
  result: 'Overstocked On All Testing Supplies',
  sector: 'Testing and Evaluation - 123',
  address: {
    number: 1234,
    street: 'Testsylvania Avenue',
    city: 'Testerton',
    zip: 12345
  }
}

const { id: testId } = testDoc
const searchQuery = { id: testId }
const updateDocument = { $set: { 'address.state': 'NY' } }

;(async () => {
  const insertResult = await da.dataCreate(testDoc)
  console.log(insertResult)
  const readResult = await da.dataRead(searchQuery)
  console.log(readResult)
  const updateResult = await da.dataUpdate(searchQuery, updateDocument)
  console.log(updateResult)
  const deleteResult = await da.dataDelete(searchQuery)
  console.log(deleteResult)
})()
