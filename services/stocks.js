/**
 * This file contains specialized controllers for the stocks API
 */

const db = require('../db')
const jsonUtils = require('../util/jsonUtils')

/**
 * Service to insert a new stock record into the database configured in
 * config.json. Fundamentally the same as createService, but with extra logic to
 * prevent duplicate ticker symbols.
 *
 * @param {Object} doc - the document to insert into the database
 */
async function createStockService (doc) {
  doc = jsonUtils.convertMongoQueryFields(doc)
  const existingStock = await db.dataRead({ Ticker: doc.Ticker })
  let result
  if (existingStock.length === 0) {
    result = await db.dataCreate(doc)
  } else {
    result = false
  }
  return result
}

module.exports = {
  createStockService: createStockService
}
