const services = require('../services')

async function createController (req, res) {
  res.send(req.params)
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
