#!/user/bin/env node

const express = require('express')
const ctrl = require('../controllers')
const router = express.Router()

router.post('/createStock/:Ticker', ctrl.stocks.createController)

router.get('/readStock/:Ticker', ctrl.stocks.readController)

router.put('/updateStock/:Ticker', ctrl.stocks.updateController)

router.delete('/deleteStock/:Ticker', ctrl.stocks.deleteController)

router.post('/stockReport', ctrl.stocks.stockReportController)

router.get('/industryReport', ctrl.stocks.industryReportController)

module.exports = router
