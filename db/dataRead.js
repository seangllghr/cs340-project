#!/usr/bin/env node

const conf = require('../config.json')

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
async function dataRead (
  client,
  query,
  limit = 20,
  dbName = conf.databaseName,
  colName = conf.collectionName
) {
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = col.find(query).limit(limit).toArray()
  return result
}

exports.dataRead = dataRead
