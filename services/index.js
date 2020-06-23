#!/usr/bin/env node

const db = require('../db/')
const jsonUtils = require('../util/jsonUtils')

/**
 * Service to call db.dataCreate to insert the given document into the database
 * configured in the project's config.json
 *
 * @param {Object} doc - the document to insert into the database
 */
async function createService (doc) {
  doc = jsonUtils.convertMongoQueryFields(doc)
  const result = await db.dataCreate(doc)
  return result
}

/**
 * Service to insert a new stock record into the database configured in
 * config.json. Fundamentally the same as above, but with extra logic to
 * prevent duplicate ticker symbols.
 *
 * @param {Object} doc - the document to insert into the database
 */
async function createStockService (doc) {
  doc = jsonUtils.convertMongoQueryFields(doc)
  const existingStock = await db.dataRead({ Ticker: doc.Ticker })
  console.log(existingStock)
  const result = true
  return result
}

/**
 * Service to call db.dataRead to read the given query from the database
 * configured in the project's config.json. Unlike the underlying dataAccess
 * layer, the spec only calls for a single return value. I don't really think
 * this is particularly useful, but that's what the spec calls for.
 *
 * @param {Object} query - the MongoDB query to match
 * @returns {Object} - a single matching search document
 */
async function readService (query) {
  const result = await db.dataRead(query)
  return result[0]
}

/**
 * Service to call db.dataUpdate to update a document in the database configured
 * in the project's config.json.
 *
 * @param {Object} query - the MongoDB query matching documents to update
 * @param {Array[]} updatePairs - an object containing key-value pairs to update
 */
async function updateService (query, update) {
  const result = await db.dataUpdate(query, { $set: update })
  return result.result
}

/**
 * Service to call db.dataDelete to remove a document from the database
 * configured in the project's config.json.
 *
 * @param {Object} query - the MongoDB matching documents to delete
 */
async function deleteService (query) {
  const result = await db.dataDelete(query)
  return result.result
}

module.exports = {
  createService: createService,
  createStockService: createStockService,
  readService: readService,
  updateService: updateService,
  deleteService: deleteService
}
