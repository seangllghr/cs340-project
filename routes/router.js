#!/usr/bin/env node

const express = require('express')
const {
  createController,
  readController,
  updateController,
  deleteController
} = require('../controllers')
const router = express.Router()

router.post('/create', createController)

router.get('/read', readController)

router.get('/update', updateController)

router.get('/delete', deleteController)

module.exports = router
