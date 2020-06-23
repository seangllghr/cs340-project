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
  const requestOK = { ok: true }
  if (!req.body.Ticker) {
    requestOK.ok = false
    requestOK.reason = 'Document missing ticker symbol.'
  } else {
    if (req.body.Ticker !== req.params.Ticker) {
      requestOK.ok = false
      requestOK.reason = 'Document ticker symbol does not match URI'
    }
  }
  if (!requestOK.ok) {
    res.status(400)
    res.send(requestOK.reason)
    return
  }
  try {
    await services.createStockService(req.body)
    res.status(201)
    res.send('Record created successfully')
  } catch (err) {
    res.sendStatus(500)
  }
}

/**
 * Delete stuff
 */
async function deleteController (req, res) {
  res.send('Delete stuff')
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
      res.status(200)
      res.send(JSON.stringify(result, null, 2))
    } else {
      res.status(404)
      res.send('Ticker symbol not found.')
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

/**
 * Receives a PUT API request to update a document in the database, checks that
 * the update document matches the ticker symbol the user is trying to access,
 * and passes the update document on to updateService
 *
 * @param {Object} req - an Express request object
 * @param {Object} res - an Express response object
 */
async function updateController (req, res) {
  const query = req.params
  const update = req.body
  try {
    const existingRecord = await services.readService(query)
    if (existingRecord) {
      const updateResult = await services.updateService(query, update)
      if (updateResult.nModified === updateResult.n) {
        res.status(200)
        res.send('Record modified')
      } else {
        res.status(200)
        res.send('Record not updated, value already set')
      }
    } else {
      res.status(404)
      res.send('Record not found')
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

module.exports = {
  createController: createController,
  deleteController: deleteController,
  readController: readController,
  updateController: updateController
}
