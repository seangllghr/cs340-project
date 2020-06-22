#!/user/bin/env node

const express = require('express')
const ctrl = require('../controllers')
const router = express.Router()

router.post('/createStock/:Ticker', ctrl.stocks.createController)

router.get('/readStock/:Ticker', ctrl.stocks.readController)

router.put('/updateStock/:Ticker', ctrl.stocks.updateController)

module.exports = router
