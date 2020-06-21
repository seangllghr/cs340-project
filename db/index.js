#!/usr/bin/env node

const config = require('../config.json')
const MongoClient = require('mongodb').MongoClient

/**
 * Count the number of documents matching the query
 *
 * @param {Object} query - a MongoDB query document
 * @param {Object} [opts] - optional settings
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 *
 * @returns {number} - the number of matching docs
 */
async function countMatching (query, opts = config) {
  const {
    dbName = config.dbName,
    colName = config.colName
  } = opts

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)

  const numResults = await col.countDocuments(query)
  client.close()
  return numResults
}

/**
 * Run an aggregation pipeline operation using the given aggregation pipeline
 *
 * @param {Object[]} pipeline - the MongoDB aggregation pipeline array to run
 * @param {Object} [opts] - optional settings
 * @param {string} [opts.dbName] - the name of the target database
 * @param {string} [opts.colName] - the name of the target collection
 * @param {number} [opts.limit] - the limit of results to return
 */
async function dataAggregate (pipeline, opts) {
  const dbName = (opts && opts.dbName) ? opts.dbName : config.dbName
  const colName = (opts && opts.colName) ? opts.colName : config.colName
  const limit = (opts && opts.limit) ? opts.limit : config.limit

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = await col.aggregate(pipeline).limit(limit).toArray()
  client.close()
  return result
}

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
async function dataCreate (document, opts = config) {
  const {
    dbName = config.dbName,
    colName = config.colName
  } = opts

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)
  const result = Array.isArray(document)
    ? await col.insertMany(document)
    : await col.insertOne(document)
  await client.close()
  const resultOk = result.result.ok === 1

  return resultOk
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
async function dataDelete (query, opts = config) {
  const {
    dbName = config.dbName,
    colName = config.colName
  } = opts

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
async function dataRead (query, opts = config) {
  const {
    limit = config.limit,
    dbName = config.dbName,
    colName = config.colName
  } = opts

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
async function dataUpdate (query, updates, opts = config) {
  const {
    dbName = config.dbName,
    colName = config.colName
  } = opts

  const client = initClient()
  await client.connect()
  const col = client.db(dbName).collection(colName)

  const numMatches = await countMatching(query, opts)

  const result = (numMatches > 1)
    ? await col.updateMany(query, updates)
    : await col.updateOne(query, updates)

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
  countMatching: countMatching,
  dataAggregate: dataAggregate,
  dataCreate: dataCreate,
  dataDelete: dataDelete,
  dataRead: dataRead,
  dataUpdate: dataUpdate,
  initClient: initClient
}
