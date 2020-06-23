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

/**
 * Service to assemble a stock report query for a user-defined set of stock
 * ticker symbols, pass the query to the DAL, and return the result
 *
 * @param {string[]} tickerList - an array of stock ticker symbols
 * @returns {Object[]} - an array of stock records matching the listed tickers
 */
async function stockReportService (tickerList) {
  const query = { Ticker: { $in: tickerList } }
  const result = await db.dataRead(query)
  return result
}

module.exports = {
  createStockService: createStockService,
  stockReportService: stockReportService
}
