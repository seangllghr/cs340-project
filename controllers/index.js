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
    services.readService(query)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

async function updateController (req, res, next) {
  // TODO: Update logic
}

async function deleteController (req, res, next) {
  // TODO: Delete logic
}

module.exports = {
  createController: createController,
  readController: readController,
  updateController: updateController,
  deleteController: deleteController
}
