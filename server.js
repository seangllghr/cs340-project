#!/usr/bin/env node

const express = require('express')
const router = require('./routes/router')
const basicApp = require('./routes/basicApp')

const server = express()
const port = 3000
const serverUrl = `http://localhost:${port}`

server.use(express.json())
server.use('/api', router)
server.use('/basic', basicApp)

server.listen(port, () => {
  console.log(`Server is listening on ${serverUrl}`)
  console.log('Press Ctrl+C to close')
})
