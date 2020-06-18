#!/usr/bin/env node

const express = require('express')
const ctrl = require('../controllers')
const router = express.Router()

router.post('/create', ctrl.createController)

router.get('/read', ctrl.readController)

router.get('/update', ctrl.updateController)

router.get('/delete', ctrl.deleteController)

module.exports = router
