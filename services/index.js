#!/usr/bin/env node

const db = require('../db/')

/**
 * Service to call db.dataCreate to insert the given document into the database
 * configured in the project's config.json
 *
 * @param {Object} doc - the document to insert into the database
 * @returns {bool} - true if insert succeeds, else throws err from Mongo driver
 */
async function createService (doc) {
  await db.dataCreate(doc)
}

/**
 * Service to call db.dataRead to read the given query from the database
 * configured in the project's config.json. Unlike the underlying dataAccess
 * layer, the spec only calls for a single return value. I don't really think
 * this is particularly useful, but that's what the spec calls for.
 *
 * @param {Object} query - the MongoDB query to match
 * @returns {Object[]} - an array containing the search results
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
 * @param {Object} update - MongoDB document specifying the update to perform
 * @returns {bool} - true if update was successful, else returns an error.
 */
async function updateService (query, update) {
  await db.dataUpdate(query, update)
}

/**
 * Service to call db.dataDelete to remove a document from the database
 * configured in the project's config.json.
 *
 * @param {Object} query - the MongoDB matching documents to delete
 * @returns {bool} - true if delete was successful, else returns an error
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
