const services = require('../services')

/**
 * Receives a POST API request for stock insertion with a given ticker, checks
 * that the ticker does not already exist in the system, extracts the document
 * to insert from the request body, and passes it to createService
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function createController (req, res) {
  try {
    const existingRecord = await services.readService(req.params)
    if (existingRecord) {
      res.send(
        'Ticker symbol already exists in database.\nUse ' +
          '/api/v1.0/updateStock to update existing stocks.'
      )
    } else {
      await services.createService(req.body)
      res.status(201)
      res.send('Record created successfully')
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

/**
 * Receives a GET API request searching for a stock in the database, extracts
 * the search query from the request params, passes it to readService, and sends
 * the returned document to the client, or HTTP 404 if not found
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function readController (req, res) {
  const query = req.params
  try {
    const result = await services.readService(query)
    if (result) {
      res.send(JSON.stringify(result, null, 2))
    } else {
      res.status(404)
      res.send('Ticker symbol not found.')
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

module.exports = {
  createController: createController,
  readController: readController
}
