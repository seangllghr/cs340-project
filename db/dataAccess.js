#!/usr/bin/env node

const config = require('../config.json')

/**
 * Create one or more new records with the specified document(s)
 *
 * @param {(Object|Object[])} document - the document to insert into the db
 * @param {Object} [opts] - optional settings
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 *
 * @returns {}
 */
async function dataCreate (document, opts) {
  const dbName = (opts && opts.dbName) ? opts.dbName : config.databaseName
  const colName = (opts && opts.colName) ? opts.colName : config.collectionName

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = Array.isArray(document)
    ? await col.insertMany(document)
    : await col.insertOne(document)
  await client.close()

  return result
}

/**
 * Perform a read operation and return the results as an array
 *
 * @param {Object} client - an initialized MongoClient object
 * @param {Object} query - a MongoDB query document
 * @param {Object} opts - optional settings
 * @param {number} [opts.limit] - the number of results to return
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 *
 * @returns {Object[]} - an array of matching documents from the collection
 */
async function dataRead (query, opts) {
  const limit = (opts && opts.limit) ? opts.limit : config.defaultReadLimit
  const dbName = (opts && opts.dbName) ? opts.dbName : config.databaseName
  const colName = (opts && opts.colName) ? opts.colName : config.collectionName
  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = await col.find(query).limit(limit).toArray()
  await client.close()
  return result
}

/**
 * Initialize the MongoClient
 *
 * @param {Object} [conf] - a Config object with connection URI component info
 * @returns {MongoClient} - a MongoClient object initialized with the config
 */
function initClient (conf = config) {
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

module.exports = {
  initClient: initClient,
  dataCreate: dataCreate,
  dataRead: dataRead
}
