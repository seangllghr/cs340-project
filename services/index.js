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
  await db.dataCreate(doc)
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
 * @param {Array[]} updatePairs - an array of 1--* 2-value arrays specifying
 *        fields to update and their new values
 */
async function updateService (queryPair, updatePairs) {
  const query = { [queryPair[0]]: queryPair[1] }
  const updateDoc = {}
  updatePairs.forEach((pair) => { updateDoc[pair[0]] = pair[1] })
  await db.dataUpdate(query, { $set: updateDoc })
}

/**
 * Service to call db.dataDelete to remove a document from the database
 * configured in the project's config.json.
 *
 * @param {Object} query - the MongoDB matching documents to delete
 */
async function deleteService (query) {
  await db.dataDelete(query)
}

module.exports = {
  createService: createService,
  readService: readService,
  updateService: updateService,
  deleteService: deleteService
}
