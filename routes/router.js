#!/usr/bin/env node

const express = require('express')
const ctrl = require('../controllers')
const v1router = require('./v1router')
const router = express.Router()

router.use('/v1.0', v1router)

router.post('/create', ctrl.createController)

router.get('/read', ctrl.readController)

router.get('/update', ctrl.updateController)

router.get('/delete', ctrl.deleteController)

module.exports = router
