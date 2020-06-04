#!/usr/bin/env node

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = (
  'mongodb://'
  + 'node:DVFD30RJ6ieMh92r3Ff9RmnJ3LSSifmP4WbHy1zN@'
  + 'localhost:27017/'
  + '?authSource=admin'
)

const dbName = 'test'

const client = new MongoClient(url, {useUnifiedTopology: true})

client.connect((err) => {
  assert.equal(null, err)
  console.log("Connected successfully to MongoDB server")

  const db = client.db(dbName)

  client.close()
})
