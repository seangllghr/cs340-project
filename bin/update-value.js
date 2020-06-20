#!/usr/bin/env node

const parseArgs = require('minimist')
const readline = require('readline')
const { jsonStreamToObj } = require('../util/jsonUtils')
const db = require('../db')

;(async () => {
  const argv = parseArgs(process.argv.slice(2))
})()
