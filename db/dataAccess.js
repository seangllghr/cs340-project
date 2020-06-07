#!/usr/bin/env node

const config = require('../config.json')

/**
 * Perform a read operation and return the results as an array
 *
 * @param {object} client - an initialized MongoClient object
 * @param {object} query - a MongoDB query document
 * @param {number} limit - the number of results to return
 * @param {string} dbName - the name of the target database
 * @param {string} colName - the name of the target collection
 *
 * @returns {array} - an array of with matching documents from the collection
 */
exports.dataRead = async function (
  client,
  query,
  limit = 20,
  dbName = config.databaseName,
  colName = config.collectionName
) {
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = col.find(query).limit(limit).toArray()
  return result
}

/**
 * Initialize the MongoClient
 *
 * @param {object} conf - a Config object with connection URI component info
 * @returns {MongoClient} - a MongoClient object initialized with the config
 */
exports.initClient = function (conf = config) {
  const MongoClient = require('mongodb').MongoClient
  const url = (
    'mongodb://' +
    `${conf.connectURI.user}:${conf.connectURI.pass}` + // Authentication creds
    `@${conf.connectURI.host}:${conf.connectURI.port}` + // Host name and port
    `/?authSource=${conf.connectURI.auth}` // Authentication db
  )

  const client = new MongoClient(url, { useUnifiedTopology: true })

  return client
}
