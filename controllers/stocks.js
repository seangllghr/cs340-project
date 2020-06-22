const services = require('../services')

async function createController (req, res) {
  res.send(req.params)
}

async function readController (req, res) {
  const query = req.params
  try {
    const result = await services.readService(query)
    if (Object.keys(result).length !== 0) {
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
