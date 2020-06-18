#!/usr/bin/env node

const services = require('../services')

async function createController (req, res, next) {
  const doc = req.body
  try {
    await services.createService(doc)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

async function readController (req, res, next) {
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

async function updateController (req, res, next) {
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

async function deleteController (req, res, next) {
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
