#!/usr/bin/env node

const services = require('../services')

/**
 * Receives a POST API request for document insertion, extracts the document to
 * insert from the request body, and passes it to createService
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function createController (req, res) {
  const doc = req.body
  try {
    await services.createService(doc)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

/**
 * Receives a GET API request searching for a document in the database, extracts
 * the search query from the request query, passes it to readService, and sends
 * the returned document to the client
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function readController (req, res) {
  const query = req.query
  try {
    const result = await services.readService(query)
    if (typeof result !== 'undefined') {
      res.send(JSON.stringify(result, null, 2))
    } else {
      res.send('Search returned no results.')
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

/**
 * Receives a GET API request to update a document in the database, extracts the
 * search query and one to many update fields from the request query, and passes
 * them on to updateService
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function updateController (req, res) {
  if (Object.entries(req.query).length >= 2) {
    const queryPair = Object.entries(req.query)[0]
    const updatePairs = Object.entries(req.query).slice(1)
    try {
      await services.updateService(queryPair, updatePairs)
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(400)
  }
}

/**
 * Receives a GET API request to delete a document from the database, extracts
 * the search query from the request query, and passes it to deleteService
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function deleteController (req, res) {
  const query = req.query
  console.log(query)
  try {
    await services.deleteService(query)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

module.exports = {
  createController: createController,
  readController: readController,
  updateController: updateController,
  deleteController: deleteController
}
