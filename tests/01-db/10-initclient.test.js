#!/usr/bin/env node

const { initClient } = require('../../db')
const { testMessage } = require('../testMessage')

async function testInitClient () {
  const client = initClient()
  try {
    await client.connect()
    testMessage('Client connection', true)
  } catch (err) {
    testMessage('Client connection', false)
    console.log(err)
  }
  try {
    await client.close()
    testMessage('Close connection', true)
  } catch (err) {
    testMessage('Close connection', false)
    console.log(err)
  }
}

testInitClient()
