#!/usr/bin/env node

const fs = require('fs')
const parseArgs = require('minimist')
const { jsonStreamToMongoDoc } = require('../util/jsonUtils')
const db = require('../db')

async function insertNewStock (argv) {
  let newStock
  if (argv.f) {
    const fileStream = fs.createReadStream(argv.f)
    try {
      newStock = await jsonStreamToMongoDoc(fileStream)
    } catch (err) {
      console.log('Error in reading JSON file stream to object. Aborting')
      console.log(err)
      process.exit(1)
    }
  } else {
    try {
      newStock = await jsonStreamToMongoDoc(process.stdin)
    } catch (err) {
      console.log('Error in reading JSON user input stream to object. Aborting')
      console.log(err)
      process.exit(1)
    }
  }
  try {
    (await db.dataCreate(newStock))
    console.log(`Stock inserted into db with ticker ${newStock.Ticker}`)
  } catch (err) {
    console.log('Error inserting doc into db. Aborting')
    console.log(err)
    process.exit(1)
  }
}

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
  insertNewStock(argv)
})()
