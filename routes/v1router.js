#!/user/bin/env node

const express = require('express')
const ctrl = require('../controllers')
const router = express.Router()

router.post('/createStock', ctrl.stocks.createController)

router.get('/readStock/:Ticker', ctrl.stocks.readController)

module.exports = router
