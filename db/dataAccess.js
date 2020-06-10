#!/usr/bin/env node

const config = require('../config.json')
const MongoClient = require('mongodb').MongoClient

/**
 * Create one or more new records with the specified document(s)
 *
 * @param {(Object|Object[])} document - the document to insert into the db
 * @param {Object} [opts] - optional settings
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 *
 * @returns {Object} - the insert op result object returned from MongoDB
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
 * Delete records matching a specified query
 *
 * @param {Object} query - a MongoDB query document
 * @param {Object} [opts] - optional settings
 * @param {number} [opts.limit] - maximum number of matching results to delete
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 *
 * @returns {Object} - the delete op result object returned from MongoDB
 */
async function dataDelete (query, opts) {
  // set db and collection from opts if passed, else set from config
  const dbName = (opts && opts.dbName) ? opts.dbName : config.databaseName
  const colName = (opts && opts.colName) ? opts.colName : config.collectionName

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = (dataRead(query).length > 1)
    ? await col.deleteOne(query)
    : await col.deleteMany(query)
  await client.close()
  return result
}

/**
 * Perform a read operation and return the results as an array
 *
 * @param {Object} query - a MongoDB query document
 * @param {Object} [opts] - optional settings
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
 * Perform an update operation on documents found within the database
 *
 * @param {Object} query - a MongoDB query document
 * @param {Object} updates - a MongoDB update document
 * @param {Object} [opts] - optional settings
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 */
async function dataUpdate (query, updates, opts) {
  // TODO: Update stuff
}

/**
 * Initialize the MongoClient
 *
 * @param {Object} [conf] - a Config object with connection URI component info
 * @returns {MongoClient} - a MongoClient object initialized with the config
 */
function initClient (conf = config) {
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
  dataCreate: dataCreate,
  dataDelete: dataDelete,
  dataRead: dataRead,
  dataUpdate: dataUpdate,
  initClient: initClient
}
